const LOCAL_ROOT = "/assets";
const MEDIA_VERSION = "20260731";
const STORAGE_ROOT = "https://ovqxuakoekllsxzvnmvx.supabase.co/storage/v1/object/public/DIPL-tech-Galllery";
const KPI_CDN_ROOT = `${STORAGE_ROOT}/kpis`;
const PARTNER_CDN_ROOT = `${STORAGE_ROOT}/kp`;

export type ResponsiveImageAsset = {
  src: string;
  avifSrcSet?: string;
  webpSrcSet?: string;
  width: number;
  height: number;
};

export type ResponsiveVideoSource = {
  src: string;
  type: "video/mp4" | "video/webm";
  media?: string;
};

function versioned(path: string) {
  return `${path}?v=${MEDIA_VERSION}`;
}

function localResponsiveImage(
  path: string,
  widths: readonly number[],
  width: number,
  height: number,
): ResponsiveImageAsset {
  const root = `${LOCAL_ROOT}/images/optimized`;
  const variants = (extension: "avif" | "webp") =>
    widths.map((variantWidth) => `${versioned(`${root}/${path}-${variantWidth}.${extension}`)} ${variantWidth}w`).join(", ");
  const largestWidth = widths.at(-1) ?? width;

  return {
    src: versioned(`${root}/${path}-${largestWidth}.webp`),
    avifSrcSet: variants("avif"),
    webpSrcSet: variants("webp"),
    width,
    height,
  };
}

function singleImage(src: string, width: number, height: number): ResponsiveImageAsset {
  return { src: versioned(src), width, height };
}

export const responsiveAssets = {
  brand: {
    logo: localResponsiveImage("brand/logo", [128, 256, 512], 512, 512),
    wordmark: localResponsiveImage("brand/wordmark", [384, 768, 1024], 1024, 351),
  },
  hero: {
    home: singleImage(`${STORAGE_ROOT}/Project/tatrakshak.webp`, 1024, 1024),
  },
  projects: {
    coast: singleImage(`${STORAGE_ROOT}/Project/tatrakshak.webp`, 1024, 1024),
    chaitanya: singleImage(`${STORAGE_ROOT}/Project/tatc.png`, 1200, 896),
    sagarMitra: singleImage(`${STORAGE_ROOT}/Project/tats.png`, 1200, 896),
  },
  recognition: {
    iitKanpur: singleImage(`${LOCAL_ROOT}/images/recognition/iit-kanpur.jpeg`, 1599, 1066),
    dpiit: singleImage(`${STORAGE_ROOT}/awards/dpiit.png`, 1600, 1131),
    sppu: singleImage(`${STORAGE_ROOT}/awards/sppu.jpeg`, 695, 546),
    dainikBhaskar: singleImage(`${LOCAL_ROOT}/images/recognition/dainik-bhaskar.jpeg`, 1280, 559),
    jspm: singleImage(`${STORAGE_ROOT}/awards/JSPM%20REcognition.jpeg`, 1600, 1223),
  },
  team: {
    abhishekGiri: singleImage(`${STORAGE_ROOT}/pfp/abpfp.png`, 500, 500),
    abhilashaGiri: singleImage(`${STORAGE_ROOT}/pfp/agpfp.png`, 500, 500),
    lalitBadgujar: singleImage(`${STORAGE_ROOT}/pfp/lb.webp`, 300, 300),
    nikhilBejjaram: singleImage(`${STORAGE_ROOT}/pfp/nb.webp`, 300, 300),
  },
  articles: {
    engineer: singleImage(`${STORAGE_ROOT}/blog/measanengineer.jpg`, 960, 1280),
    ceo: singleImage(`${STORAGE_ROOT}/blog/measaceo.jpg`, 1280, 960),
  },
  about: {
    videoPreview: singleImage("https://i.ytimg.com/vi/CwxaaeHy6Iw/hqdefault.jpg", 480, 360),
  },
  partners: {
    be: singleImage(`${PARTNER_CDN_ROOT}/be.png`, 512, 497),
    cr: singleImage(`${PARTNER_CDN_ROOT}/cr.png`, 512, 268),
    es: singleImage(`${PARTNER_CDN_ROOT}/es.png`, 512, 148),
    js: singleImage(`${PARTNER_CDN_ROOT}/js.png`, 512, 243),
    mt: singleImage(`${PARTNER_CDN_ROOT}/mt.png`, 512, 251),
    susdg: singleImage(`${PARTNER_CDN_ROOT}/susdg.png`, 512, 439),
    tc: singleImage(`${PARTNER_CDN_ROOT}/tc.png`, 512, 512),
    tr: singleImage(`${PARTNER_CDN_ROOT}/tr.png`, 512, 483),
    tsr: singleImage(`${PARTNER_CDN_ROOT}/tsr.png`, 512, 512),
  },
} as const;

export const assets = {
  brand: {
    logo: responsiveAssets.brand.logo.src,
    wordmark: responsiveAssets.brand.wordmark.src,
  },
  projects: {
    coast: responsiveAssets.projects.coast.src,
    chaitanya: responsiveAssets.projects.chaitanya.src,
    sagarMitra: responsiveAssets.projects.sagarMitra.src,
    tatrakshakCoast: responsiveAssets.hero.home.src,
  },
  comparisons: {
    coastBefore: versioned(`${LOCAL_ROOT}/images/comparisons/coast-before.webp`),
    coastAfter: versioned(`${LOCAL_ROOT}/images/comparisons/coast-after.webp`),
    natureAfter: versioned(`${LOCAL_ROOT}/images/comparisons/nature-after.webp`),
  },
  recognition: {
    iitKanpur: responsiveAssets.recognition.iitKanpur.src,
    dpiit: responsiveAssets.recognition.dpiit.src,
    sppu: responsiveAssets.recognition.sppu.src,
    dainikBhaskar: responsiveAssets.recognition.dainikBhaskar.src,
    jspm: responsiveAssets.recognition.jspm.src,
  },
  team: {
    abhishekGiri: responsiveAssets.team.abhishekGiri.src,
    abhilashaGiri: responsiveAssets.team.abhilashaGiri.src,
    lalitBadgujar: responsiveAssets.team.lalitBadgujar.src,
    nikhilBejjaram: responsiveAssets.team.nikhilBejjaram.src,
  },
  partners: {
    be: responsiveAssets.partners.be.src,
    cr: responsiveAssets.partners.cr.src,
    es: responsiveAssets.partners.es.src,
    js: responsiveAssets.partners.js.src,
    mt: responsiveAssets.partners.mt.src,
    susdg: responsiveAssets.partners.susdg.src,
    tc: responsiveAssets.partners.tc.src,
    tr: responsiveAssets.partners.tr.src,
    tsr: responsiveAssets.partners.tsr.src,
  },
  sdgs: {
    industry: versioned(`${LOCAL_ROOT}/images/sdgs/sdg-09-industry.webp`),
    cities: versioned(`${LOCAL_ROOT}/images/sdgs/sdg-11-cities.webp`),
    climate: versioned(`${LOCAL_ROOT}/images/sdgs/sdg-13-climate.webp`),
    water: versioned(`${LOCAL_ROOT}/images/sdgs/sdg-14-water.webp`),
  },
  testing: {
    ansysVelocitySection: versioned(`${LOCAL_ROOT}/images/testing/ansys-velocity-section.jpeg`),
    ansysVelocityVolume: versioned(`${LOCAL_ROOT}/images/testing/ansys-velocity-volume.jpeg`),
    breakwaterModel: versioned(`${LOCAL_ROOT}/images/testing/breakwater-scale-model.jpeg`),
    modelUnits: versioned(`${LOCAL_ROOT}/images/testing/coastal-model-units.jpeg`),
    modelSeries: versioned(`${LOCAL_ROOT}/images/testing/testing-model-series.jpeg`),
  },
  articles: {
    engineer: responsiveAssets.articles.engineer.src,
    ceo: responsiveAssets.articles.ceo.src,
  },
  about: {
    videoPreview: responsiveAssets.about.videoPreview.src,
  },
  videos: {
    homeHero: [
      { src: `${STORAGE_ROOT}/videos/Drith%20Infra%20Final.mp4`, type: "video/mp4" },
    ] satisfies readonly ResponsiveVideoSource[],
    tatrakshakHero: [
      { src: `${STORAGE_ROOT}/videos/V1.mp4`, type: "video/mp4" },
    ] satisfies readonly ResponsiveVideoSource[],
    coastalErosion: [
      "https://videos.pexels.com/video-files/28905669/12511826_1080_1920_25fps.mp4",
      "https://videos.pexels.com/video-files/33307539/14185814_2160_3840_30fps.mp4",
      "https://www.pexels.com/download/video/3725883/",
      "https://www.pexels.com/download/video/19460174/",
    ],
  },
} as const;

const responsiveImageLookup = new Map<string, ResponsiveImageAsset>();

function registerResponsiveImages(value: unknown) {
  if (!value || typeof value !== "object") return;
  if ("src" in value && typeof value.src === "string" && "width" in value && "height" in value) {
    responsiveImageLookup.set(value.src, value as ResponsiveImageAsset);
    return;
  }
  Object.values(value).forEach(registerResponsiveImages);
}

registerResponsiveImages(responsiveAssets);

export function getResponsiveImage(src: string) {
  return responsiveImageLookup.get(src);
}

export function getKpiImage(index: number) {
  return versioned(`${KPI_CDN_ROOT}/kpi${index + 1}.png`);
}

export function getKpiResponsiveImage(index: number): ResponsiveImageAsset {
  return singleImage(`${KPI_CDN_ROOT}/kpi${index + 1}.png`, 128, 128);
}
