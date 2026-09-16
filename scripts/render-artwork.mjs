// 生成两张烘焙位图：社交卡片 card.png 和首页大图 hero-home.avif。
// 跑法：node scripts/render-artwork.mjs
//
// Re-renders the two raster images the site ships. It writes its own SVG
// sources to `src/assets/artwork/` first, then rasterises them with sharp:
//
//   src/assets/artwork/card.svg       -> src/assets/images/card.png   1200x630
//   src/assets/artwork/hero-home.svg  -> src/assets/images/hero-home.avif 2560x1086
//
// Both sizes and both formats are fixed: `src/site-config.ts` points
// `socialImage` at that PNG path, and the AVIF keeps the dimensions the file
// it replaces had.
//
// The creatures in both compositions come from `src/components/creatures/cuts.ts`
// — the same fragments the pages render — so a creature is drawn once. What the
// compositions do here is substitute concrete colours for the two theme tokens
// the cuts use (`currentColor` and `var(--at-primary)`), because a baked raster
// has no theme to inherit from.
//
// 颜色不是手挑的。--at-primary 是 astro-theme-slop 给的 #b97d1c，背景和正文色按
// astro-theme-university 的 tokens.css 那两条 oklch 公式从同一个色相算出来，所以
// 图里的米白和墨色跟浅色模式下的页面是同一组值，不是"看着差不多"。对比度在下面
// 当场量，量不过就不出图。
//
// A baked image is invisible to axe — `pnpm build` and `ab a11y` will both
// report nothing about it, in either direction. So the contrast is measured
// here, at render time, and the script refuses to write a file that fails.
// The measured numbers are printed on every run; see CONTRAST_FLOOR below.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { CUTS } from "../src/components/creatures/cuts.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// --- palette ---------------------------------------------------------------

/** The brand accent, from `astro-theme-slop`. The one hand-written colour here. */
const PRIMARY = "#b97d1c";

const srgbToLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const linearToSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const clamp01 = (n) => Math.min(1, Math.max(0, n));

function hexToRgb(hex) {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => c / 255);
}

function rgbToHex([r, g, b]) {
  const hex = (c) =>
    Math.round(clamp01(c) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/** sRGB hex to OKLCh, so the surfaces can be derived from the accent's hue. */
function hexToOklch(hex) {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(a, bb), h: (Math.atan2(bb, a) * 180) / Math.PI };
}

/** OKLCh back to an sRGB hex. L is 0–1, h in degrees. */
function oklchToHex(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return rgbToHex(
    [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ].map(linearToSrgb),
  );
}

const HUE = hexToOklch(PRIMARY).h;

// The same two formulas `astro-theme-university/styles/tokens.css` uses for the
// light side of `--at-bg` and `--at-text`. Change the accent and these follow.
const BG = oklchToHex(0.994, 0.004, HUE);
const INK = oklchToHex(0.2, 0.01, HUE);

function contrast(hexA, hexB) {
  const lum = (hex) => {
    const [r, g, b] = hexToRgb(hex).map(srgbToLinear);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [a, b] = [lum(hexA), lum(hexB)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

// 正文色要过 4.5:1，琥珀色只用在大字和图形上，过 3:1 就够。
const CONTRAST_FLOOR = { ink: 4.5, primary: 3 };

// --- type -------------------------------------------------------------------

const SERIF = "Georgia, 'Times New Roman', Times, serif";
const HAN = "'Songti SC', 'Songti TC', 'STSong', 'Noto Serif CJK SC', serif";

function text(
  content,
  { x, y, size, fill = INK, family = SERIF, weight = 400, spacing = 0, anchor = "start" },
) {
  return (
    `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}"` +
    ` font-weight="${weight}" letter-spacing="${spacing}" text-anchor="${anchor}"` +
    ` fill="${fill}">${content}</text>`
  );
}

// --- the cuts ---------------------------------------------------------------

/**
 * One creature, placed. The cut is authored against a 200x200 viewBox with its
 * ground line at y=176, so two cuts placed at the same `y` and `scale` stand on
 * one continuous ground — which is what lines the rows up below.
 */
function cut(name, x, y, scale) {
  const entry = CUTS[name];
  if (!entry) throw new Error(`no cut for ${name}`);
  const body = entry.body.replaceAll("var(--at-primary)", PRIMARY);
  return (
    `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${INK}"` +
    ` stroke-linecap="round" stroke-linejoin="round">${body}</g>`
  );
}

/** The plate frame: a heavy rule inside a light one, as a printed plate carries. */
function frame(w, h, inset) {
  return (
    `<rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}"` +
    ` fill="none" stroke="${INK}" stroke-width="3"/>` +
    `<rect x="${inset + 9}" y="${inset + 9}" width="${w - (inset + 9) * 2}" height="${h - (inset + 9) * 2}"` +
    ` fill="none" stroke="${PRIMARY}" stroke-width="1.5"/>`
  );
}

// --- card: 1200x630 ---------------------------------------------------------

function cardSvg() {
  const W = 1200;
  const H = 630;
  // 四只并排，同一条地平线。缩略图里认的是剪影，所以宁可少画几只、画大些。
  const row = ["帝江", "陆吾", "九尾狐", "毕方"];
  const scale = 1.25;
  const step = 252;
  const x0 = 90;
  const y0 = 336;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<rect width="${W}" height="${H}" fill="${BG}"/>` +
    frame(W, H, 26) +
    // 每行只排一种文字。没有字体度量就不要在同一行里混排中西文，位置只能靠猜。
    text("SLOP6608", { x: 96, y: 138, size: 38, fill: PRIMARY, weight: 700, spacing: 12 }) +
    text("山海經", { x: 1104, y: 140, size: 46, family: HAN, anchor: "end" }) +
    text("Cryptotaxonomy", { x: 92, y: 236, size: 92, weight: 700 }) +
    text("A Linnaean System for the Shanhaijing", { x: 96, y: 296, size: 40 }) +
    row.map((name, i) => cut(name, x0 + i * step, y0, scale)).join("") +
    `</svg>`
  );
}

// --- hero: 2560x1086 --------------------------------------------------------

function heroSvg() {
  const W = 2560;
  const H = 1086;
  const row = ["九尾狐", "夫诸", "帝江", "陆吾", "并封", "毕方"];
  const scale = 1.95;
  const size = 200 * scale;
  const gap = 18;
  const span = row.length * size + (row.length - 1) * gap;
  const x0 = (W - span) / 2;
  const y0 = 470;
  const groundY = y0 + 176 * scale;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<rect width="${W}" height="${H}" fill="${BG}"/>` +
    frame(W, H, 40) +
    text("SLOP6608", { x: 140, y: 176, size: 46, fill: PRIMARY, weight: 700, spacing: 14 }) +
    text("Cryptotaxonomy", { x: 136, y: 272, size: 104, weight: 700 }) +
    text("Six of the twenty-five entries, drawn only from what the record gives", {
      x: 2420,
      y: 176,
      size: 40,
      anchor: "end",
    }) +
    row.map((name, i) => cut(name, x0 + i * (size + gap), y0, scale)).join("") +
    // 名字排在各自那格的正中，跟地平线隔开一行。
    row
      .map((name) =>
        `<text x="${x0 + row.indexOf(name) * (size + gap) + size / 2}" y="${groundY + 82}"` +
        ` font-family="${HAN}" font-size="46" text-anchor="middle" fill="${INK}">${name}</text>`,
      )
      .join("") +
    `</svg>`
  );
}

// --- render -----------------------------------------------------------------

function report(label, ratio, floor) {
  const ok = ratio >= floor;
  console.log(`${ok ? "✓" : "✗"} ${label}: ${ratio.toFixed(2)}:1 (floor ${floor}:1)`);
  return ok;
}

async function main() {
  console.log(`palette: primary ${PRIMARY}, background ${BG}, ink ${INK}`);
  const inkOk = report("ink on background", contrast(INK, BG), CONTRAST_FLOOR.ink);
  const accentOk = report(
    "accent on background (large text and graphics only)",
    contrast(PRIMARY, BG),
    CONTRAST_FLOOR.primary,
  );
  if (!inkOk || !accentOk) {
    console.error("palette fails its own floor — nothing written");
    process.exit(1);
  }

  mkdirSync(resolve(ROOT, "src/assets/artwork"), { recursive: true });

  const jobs = [
    {
      svg: cardSvg(),
      source: "src/assets/artwork/card.svg",
      out: "src/assets/images/card.png",
      width: 1200,
      height: 630,
      encode: (pipe) => pipe.png({ compressionLevel: 9 }),
    },
    {
      svg: heroSvg(),
      source: "src/assets/artwork/hero-home.svg",
      out: "src/assets/images/hero-home.avif",
      width: 2560,
      height: 1086,
      encode: (pipe) => pipe.avif({ quality: 62, effort: 6 }),
    },
  ];

  for (const job of jobs) {
    writeFileSync(resolve(ROOT, job.source), `${job.svg}\n`);
    // density 之外再 resize 一次：librsvg 按 96dpi 算尺寸，只有这样才敢说出来的就是
    // 1200x630。Rasterise at 2x and resize down, so the line art stays crisp and
    // the output dimensions are exact rather than whatever the renderer rounded to.
    await job
      .encode(
        sharp(Buffer.from(job.svg), { density: 192 })
          .resize(job.width, job.height, { fit: "fill" })
          // 背景是实心的，就不要留 alpha 通道：烘焙图不靠页面背景垫底。
          .flatten({ background: BG }),
      )
      .toFile(resolve(ROOT, job.out));
    const meta = await sharp(resolve(ROOT, job.out)).metadata();
    console.log(`${job.out}: ${meta.format} ${meta.width}x${meta.height}`);
  }
}

await main();
