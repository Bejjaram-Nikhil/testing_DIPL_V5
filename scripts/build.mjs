import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";
import { build as viteBuild } from "vite";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const distDirectory = path.join(projectRoot, "dist");
const serverDirectory = path.join(projectRoot, ".prerender-server");
const sitemapPath = path.join(projectRoot, "public", "sitemap.xml");
const criticalHomeCssPath = path.join(projectRoot, "src", "styles", "critical-home.css");

function runTypeScriptBuild() {
  const typescriptCli = path.join(
    projectRoot,
    "node_modules",
    "typescript",
    "bin",
    "tsc",
  );
  const result = spawnSync(process.execPath, [typescriptCli, "-b"], {
    cwd: projectRoot,
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value)
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildRouteHead(metadata) {
  const fullTitle = escapeHtml(metadata.documentTitle);
  const title = escapeAttribute(metadata.title);
  const description = escapeAttribute(metadata.description);
  const canonicalUrl = escapeAttribute(metadata.canonicalUrl);
  const imageUrl = escapeAttribute(metadata.imageUrl);
  const robots = escapeAttribute(metadata.robots);
  const type = escapeAttribute(metadata.type);

  return [
    `    <title>${fullTitle}</title>`,
    `    <meta name="description" content="${description}" />`,
    `    <meta name="robots" content="${robots}" />`,
    `    <link rel="canonical" href="${canonicalUrl}" />`,
    `    <meta property="og:title" content="${title}" />`,
    `    <meta property="og:description" content="${description}" />`,
    `    <meta property="og:type" content="${type}" />`,
    `    <meta property="og:url" content="${canonicalUrl}" />`,
    `    <meta property="og:image" content="${imageUrl}" />`,
    `    <meta property="og:site_name" content="Drith Infra" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${title}" />`,
    `    <meta name="twitter:description" content="${description}" />`,
    `    <meta name="twitter:image" content="${imageUrl}" />`,
  ].join("\n");
}

function extractRouteMetadata(markup, routePath) {
  const markerPattern =
    /<script[^>]*data-drith-route-seo="true"[^>]*>([\s\S]*?)<\/script>/i;
  const match = markup.match(markerPattern);

  if (!match?.[1]) {
    throw new Error(`No route SEO metadata was rendered for ${routePath}`);
  }

  return {
    markup: markup.replace(markerPattern, ""),
    metadata: JSON.parse(match[1]),
  };
}

function deferStylesheets(html) {
  return html.replace(
    /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
    (tag, href) => `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'"><noscript>${tag}</noscript>`,
  );
}

function applyRouteToTemplate(template, routePath, markup, metadata, criticalHomeCss) {
  const withoutDefaultHead = template
    .replace(/\s*<meta\s+name=["']description["'][^>]*>/i, "")
    .replace(/\s*<title>[\s\S]*?<\/title>/i, "");
  const routeHead = buildRouteHead(metadata);
  const withHead = withoutDefaultHead.replace(
    "  </head>",
    `${routeHead}\n  </head>`,
  );
  const withMarkup = withHead.replace(
    '<div id="root"></div>',
    `<div id="root">${markup}</div>`,
  );

  if (withMarkup === withHead) {
    throw new Error(`Application root placeholder was not found for ${routePath}`);
  }

  let routeHtml = withMarkup.replace(
    "<html lang=\"en\">",
    `<html lang="en" data-prerendered-route="${escapeAttribute(routePath)}">`,
  );

  if (routePath === "/") {
    const safeCriticalCss = criticalHomeCss
      .replaceAll("/assets/fonts/dm-sans-latin-400-700.woff2", "/assets/fonts/dm-sans-latin-400-700.woff2?v=20260731")
      .replaceAll("/assets/fonts/manrope-latin-600-800.woff2", "/assets/fonts/manrope-latin-600-800.woff2?v=20260731")
      .replaceAll("</style", "<\\/style");
    routeHtml = routeHtml
      .replace("data-home-preload ", "")
      .replace("  </head>", `    <style data-critical-home>${safeCriticalCss}</style>\n  </head>`);
    return deferStylesheets(routeHtml);
  }

  return routeHtml.replace(/\s*<link data-home-preload[^>]*>/, "");
}

function getPublicRoutes(sitemap, siteOrigin) {
  const locations = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(
    (match) => match[1],
  );

  if (locations.length === 0) {
    throw new Error("No public routes were found in public/sitemap.xml");
  }

  return locations.map((location) => {
    const url = new URL(location);
    if (url.origin !== siteOrigin) {
      throw new Error(`Sitemap URL is outside ${siteOrigin}: ${location}`);
    }
    if (url.search || url.hash) {
      throw new Error(`Sitemap routes cannot contain search or hash values: ${location}`);
    }
    return url.pathname.replace(/\/+$/, "") || "/";
  });
}

async function writePrerenderedPage(routePath, html) {
  if (routePath === "/") {
    await writeFile(path.join(distDirectory, "index.html"), html, "utf8");
    return;
  }

  const relativeRoute = routePath.slice(1);
  const destination = path.join(
    distDirectory,
    "_prerender",
    `${relativeRoute}.html`,
  );
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
}

async function verifyPerformanceBudgets() {
  const budgets = [
    ["wordmark", path.join(distDirectory, "assets", "images", "optimized", "brand", "wordmark-768.webp"), 50_000],
  ];

  for (const [label, filePath, maximumBytes] of budgets) {
    const size = (await stat(filePath)).size;
    if (size > maximumBytes) {
      throw new Error(`${label} exceeds its performance budget: ${size} > ${maximumBytes} bytes`);
    }
  }

  const homeHtmlPath = path.join(distDirectory, "index.html");
  const homeHtml = await readFile(homeHtmlPath, "utf8");
  const head = homeHtml.split("</head>", 1)[0] ?? homeHtml;
  const localHeadAssets = new Set(
    [...head.matchAll(/(?:href|src)="(\/[^" ]+)"/g)].map((match) => match[1]),
  );
  let initialBytes = gzipSync(Buffer.from(homeHtml)).byteLength;

  for (const assetUrl of localHeadAssets) {
    const assetPath = assetUrl.split("?", 1)[0];
    const filePath = path.join(distDirectory, assetPath.slice(1));
    try {
      const data = readFileSync(filePath);
      initialBytes += /\.(?:js|css)$/.test(filePath) ? gzipSync(data).byteLength : data.byteLength;
    } catch {
      // Canonical route links and other non-file URLs are ignored.
    }
  }

  const initialBudget = 250_000;
  console.log(`estimated initial home transfer: ${(initialBytes / 1024).toFixed(1)} KiB`);
  if (initialBytes > initialBudget) {
    throw new Error(`Initial home transfer exceeds ${initialBudget} bytes: ${initialBytes}`);
  }
}

async function build() {
  runTypeScriptBuild();
  await viteBuild();

  await rm(serverDirectory, { recursive: true, force: true });
  await viteBuild({
    build: {
      emptyOutDir: true,
      outDir: serverDirectory,
      sourcemap: false,
      ssr: path.join(projectRoot, "src", "entry-server.tsx"),
      target: "es2022",
    },
    logLevel: "warn",
  });

  try {
    const sitemap = await readFile(sitemapPath, "utf8");
    const firstLocation = sitemap.match(/<loc>\s*([^<]+?)\s*<\/loc>/)?.[1];
    if (!firstLocation) throw new Error("Sitemap has no canonical site URL");

    const siteOrigin = new URL(firstLocation).origin;
    const publicRoutes = getPublicRoutes(sitemap, siteOrigin);
    const template = await readFile(path.join(distDirectory, "index.html"), "utf8");
    const criticalHomeCss = await readFile(criticalHomeCssPath, "utf8");
    const serverEntryUrl = pathToFileURL(
      path.join(serverDirectory, "entry-server.js"),
    );
    const { render } = await import(`${serverEntryUrl.href}?v=${Date.now()}`);

    for (const routePath of publicRoutes) {
      const rendered = await render(routePath);
      const { markup, metadata } = extractRouteMetadata(rendered, routePath);
      const html = applyRouteToTemplate(template, routePath, markup, metadata, criticalHomeCss);
      await writePrerenderedPage(routePath, html);
      console.log(`pre-rendered ${routePath}`);
    }
    await verifyPerformanceBudgets();
  } finally {
    await rm(serverDirectory, { recursive: true, force: true });
  }
}

await build();
