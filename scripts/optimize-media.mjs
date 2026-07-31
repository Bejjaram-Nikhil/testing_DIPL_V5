import { spawnSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const cacheDirectory = path.join(projectRoot, ".media-cache");
const imageOutputRoot = path.join(projectRoot, "public", "assets", "images", "optimized");
const videoOutputRoot = path.join(projectRoot, "public", "assets", "videos");
const storageRoot = "https://ovqxuakoekllsxzvnmvx.supabase.co/storage/v1/object/public/DIPL-tech-Galllery";

const imageJobs = [
  ["brand/wordmark", "public/assets/images/brand/drith-infra-wordmark.png", [384, 768, 1024], 86],
  ["brand/logo", "public/assets/images/brand/drith-logo.png", [128, 256, 512], 86],
  ["hero/home", "public/assets/images/projects/tatrakshak-coast.jpg", [480, 720, 960, 1280], 72],
  ["projects/coast", `${storageRoot}/Project/tatrakshak.webp`, [480, 720, 960, 1024], 75],
  ["projects/chaitanya", `${storageRoot}/Project/tatc.png`, [600, 720, 960, 1200], 75],
  ["projects/sagarmitra", `${storageRoot}/Project/tats.png`, [600, 720, 960, 1200], 75],
  ["recognition/dpiit", `${storageRoot}/awards/dpiit.png`, [480, 960, 1600], 78],
  ["recognition/sppu", `${storageRoot}/awards/sppu.jpeg`, [480, 695], 78],
  ["recognition/jspm", `${storageRoot}/awards/JSPM%20REcognition.jpeg`, [480, 960, 1600], 78],
  ["recognition/dainik-bhaskar", "public/assets/images/recognition/dainik-bhaskar.jpeg", [640, 960, 1280], 78],
  ["recognition/iit-kanpur", "public/assets/images/recognition/iit-kanpur.jpeg", [480, 960, 1599], 78],
  ["team/abhishek", `${storageRoot}/pfp/abpfp.png`, [300, 500], 82],
  ["team/abhilasha", `${storageRoot}/pfp/agpfp.png`, [300, 500], 82],
  ["team/lalit", `${storageRoot}/pfp/lb.webp`, [300], 82],
  ["team/nikhil", `${storageRoot}/pfp/nb.webp`, [300], 82],
  ["articles/engineer", `${storageRoot}/blog/measanengineer.jpg`, [480, 960], 76],
  ["articles/ceo", `${storageRoot}/blog/measaceo.jpg`, [640, 1280], 76],
  ["about/video-preview", "https://i.ytimg.com/vi/CwxaaeHy6Iw/hqdefault.jpg", [480], 78],
];

const partnerNames = ["be", "cr", "es", "js", "mt", "susdg", "tc", "tr", "tsr"];

async function sourcePath(source, cacheName) {
  if (!source.startsWith("http")) return path.join(projectRoot, source);
  const response = await fetch(source);
  if (!response.ok) throw new Error(`Unable to download ${source}: ${response.status}`);
  const destination = path.join(cacheDirectory, cacheName);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  return destination;
}

async function createImageVariants(outputName, source, widths, quality) {
  const sourceUrl = new URL(source, "file:///");
  const input = await sourcePath(source, `${outputName.replaceAll("/", "-")}${path.extname(sourceUrl.pathname) || ".img"}`);
  const metadata = await sharp(input).metadata();
  if (!metadata.width) throw new Error(`No width metadata found for ${source}`);

  for (const requestedWidth of widths) {
    const width = Math.min(requestedWidth, metadata.width);
    const outputBase = path.join(imageOutputRoot, `${outputName}-${width}`);
    await mkdir(path.dirname(outputBase), { recursive: true });
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(`${outputBase}.webp`);
    await sharp(input).resize({ width, withoutEnlargement: true }).avif({ quality: Math.max(45, quality - 18), effort: 6 }).toFile(`${outputBase}.avif`);
  }
}

async function optimizeImages() {
  for (const [outputName, source, widths, quality] of imageJobs) {
    await createImageVariants(outputName, source, widths, quality);
    console.log(`optimized ${outputName}`);
  }
  for (let index = 1; index <= 18; index += 1) {
    await createImageVariants(`kpis/kpi${index}`, `public/assets/images/kpis/kpi${index}.png`, [128], 82);
  }
  for (const name of partnerNames) {
    await createImageVariants(`partners/${name}`, `${storageRoot}/kp/${name}.png`, [512], 82);
  }

  await sharp(path.join(projectRoot, "public", "assets", "images", "brand", "drith-logo.png"))
    .resize({ width: 64, height: 64, fit: "contain" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(projectRoot, "public", "assets", "images", "brand", "favicon-64.png"));
}

function encodeVideo(input, output, width, crf) {
  if (!ffmpegPath) throw new Error("ffmpeg-static did not provide an executable");
  const result = spawnSync(ffmpegPath, [
    "-y", "-i", input,
    "-vf", `scale=${width}:-2:flags=lanczos,fps=24`,
    "-an", "-c:v", "libx264", "-preset", "slow", "-crf", String(crf),
    "-movflags", "+faststart", output,
  ], { cwd: projectRoot, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`FFmpeg failed for ${output}`);
}

async function optimizeVideos() {
  const home = await sourcePath(`${storageRoot}/videos/Drith%20Infra%20Final.mp4`, "home-hero.mp4");
  const tatrakshak = await sourcePath(`${storageRoot}/videos/V1.mp4`, "tatrakshak-hero.mp4");
  await mkdir(videoOutputRoot, { recursive: true });
  encodeVideo(home, path.join(videoOutputRoot, "home-hero-mobile-v1.mp4"), 720, 30);
  encodeVideo(home, path.join(videoOutputRoot, "home-hero-desktop-v1.mp4"), 1280, 28);
  encodeVideo(tatrakshak, path.join(videoOutputRoot, "tatrakshak-hero-mobile-v1.mp4"), 720, 30);
  encodeVideo(tatrakshak, path.join(videoOutputRoot, "tatrakshak-hero-desktop-v1.mp4"), 1280, 28);
}

await rm(cacheDirectory, { recursive: true, force: true });
try {
  await optimizeImages();
  await optimizeVideos();
  console.log("Media optimization complete.");
} finally {
  await rm(cacheDirectory, { recursive: true, force: true });
}
