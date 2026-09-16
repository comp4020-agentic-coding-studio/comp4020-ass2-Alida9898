// 六张木刻式生物图的唯一来源。CreatureCut.astro 和 scripts/render-artwork.mjs
// 都从这里取图形，所以形状只有一份，不会两边走样。
//
// The single source for the creature line cuts. `CreatureCut.astro` renders
// them into pages; `scripts/render-artwork.mjs` composes the same fragments
// into the two baked raster images, so a creature is drawn once and only once.
//
// Three rules hold across every cut in this file, and they are what make the
// set read as one printer's hand:
//
//   1. One `viewBox`, `0 0 200 200`, with the ground line at y=176 and the
//      subject inside x 20–180. `GROUND` is a constant, not re-drawn per
//      creature.
//   2. One hatching angle — 45° up to the right, every stroke — and one stroke
//      scale (`STROKE`). Shadow is hatching, never a fill and never a gradient.
//   3. One eye: a solid dot under a cut brow. `eye()` is the only way an eye
//      gets drawn here.
//
// Colour. Everything is `stroke="currentColor"` with `fill="none"`, set once on
// the root `<svg>` in CreatureCut.astro, so the line art inverts with the theme
// and there is no second palette for dark mode. The two creatures whose record
// names a colour the page can carry — 帝江's cinnabar and 畢方's red markings —
// use `var(--at-primary)`, never a literal hex. Amber #b97d1c measures 3.45:1
// on the light background #fffdfa and 5.36:1 on the dark #121212 (computed
// against WCAG relative luminance, 2026-09-17), so it clears the 3:1 that
// non-text graphics need in both modes. It is also never load-bearing: the
// black cut line carries the whole form, and the accent only marks it.
//
// `opacity` appears nowhere in this file. Lighter strokes are thinner strokes.
//
// 形只画记录里有的东西。每条 body 上面的注释就是 bestiary.ts 里那条 form。

export const CUT_VIEWBOX = "0 0 200 200";

/** One stroke scale for the whole set: cut line, limb, detail, hatch. */
export const STROKE = {
  cut: 3.2,
  limb: 2.4,
  detail: 1.4,
  hatch: 1,
} as const;

export interface Cut {
  /** The creature's printed name, as `bestiary.ts` prints it. */
  name: string;
  /** English description, used as the SVG's accessible name. */
  alt: string;
  /** SVG fragment, drawn against `CUT_VIEWBOX`. No root element. */
  body: string;
}

const r = (n: number): string => String(Math.round(n * 10) / 10);

/**
 * 45° hatching, up to the right. Every shadow in the set is made of these and
 * nothing else. `[x, y, length]` per stroke.
 */
function hatch(runs: Array<[number, number, number]>, width: number = STROKE.hatch): string {
  const lines = runs.map(([x, y, len]) => `<path d="M${r(x)} ${r(y)}l${r(len)} ${r(-len)}"/>`);
  return `<g stroke-width="${width}">${lines.join("")}</g>`;
}

/** 一只眼睛：实心点加一道眉刀。全套只有这一种眼。 */
function eye(x: number, y: number): string {
  return (
    `<circle cx="${r(x)}" cy="${r(y)}" r="2.3" fill="currentColor" stroke="none"/>` +
    `<path d="M${r(x - 6)} ${r(y - 5)}q6 -4.5 12 -0.5" stroke-width="${STROKE.detail}"/>`
  );
}

/**
 * Nine tails, fanned. 陸吾 and 九尾狐 both have them and both call this, so the
 * two nine-tailed creatures in the set are nine-tailed in the same hand.
 */
function tailFan(x0: number, y0: number, from: number, to: number, len: number): string {
  const parts: string[] = [];
  for (let i = 0; i < 9; i += 1) {
    const t = i / 8;
    const a = ((from + (to - from) * t) * Math.PI) / 180;
    const dx = Math.cos(a);
    const dy = Math.sin(a);
    const ex = x0 + dx * len;
    const ey = y0 + dy * len;
    // 控制点沿法线推开，出木刻刀锋那种单弧。
    const mx = x0 + dx * len * 0.55 + dy * 15;
    const my = y0 + dy * len * 0.55 - dx * 15;
    const width = i % 2 === 0 ? STROKE.limb : STROKE.detail;
    parts.push(
      `<path d="M${r(x0)} ${r(y0)}Q${r(mx)} ${r(my)} ${r(ex)} ${r(ey)}" stroke-width="${width}"/>`,
    );
  }
  return parts.join("");
}

/** The ground: one broken cut line with hatch ticks under it. Identical everywhere. */
const GROUND =
  `<g stroke-width="${STROKE.limb}"><path d="M22 176H110"/><path d="M122 176H178"/></g>` +
  hatch([
    [32, 186, 9],
    [54, 186, 9],
    [90, 186, 9],
    [130, 186, 9],
    [156, 186, 9],
  ]);

/** A paw, toes cut in. 虎和狐用这个。 */
function paw(x: number, w: number = 7): string {
  return (
    `<path d="M${r(x - w)} 176C${r(x - w - 1)} 169 ${r(x - w + 2)} 165 ${r(x)} 165` +
    `C${r(x + w - 2)} 165 ${r(x + w + 1)} 169 ${r(x + w)} 176" stroke-width="${STROKE.limb}"/>` +
    `<path d="M${r(x - 2.5)} 176v-6" stroke-width="${STROKE.detail}"/>` +
    `<path d="M${r(x + 2.5)} 176v-6" stroke-width="${STROKE.detail}"/>`
  );
}

/** A cloven hoof. 鹿和猪用这个。 */
function hoof(x: number): string {
  return (
    `<path d="M${r(x - 4)} 176L${r(x - 3)} 167H${r(x + 3)}L${r(x + 4)} 176" stroke-width="${STROKE.limb}"/>` +
    `<path d="M${r(x)} 176v-5" stroke-width="${STROKE.detail}"/>`
  );
}

/** 一只耳朵：三角。狐、鹿、并封共用这一只耳，全套才是一把刀。 */
function ear(x: number, y: number, s: number, h: number = 15): string {
  return (
    `<path d="M${r(x)} ${r(y)}L${r(x + 3 * s)} ${r(y - h)}L${r(x + 11 * s)} ${r(y - 4)}Z"` +
    ` stroke-width="${STROKE.limb}"/>`
  );
}

// ---------------------------------------------------------------------------
// 帝江 — like a yellow sack, red as cinnabar fire, six feet and four wings,
//        a blur with no face.
// 脸上一刀不落，因为记录说没有面目。朱砂做第二道虚轮廓（糊的边）和腹下的火纹。
// ---------------------------------------------------------------------------
const SACK =
  "M100 46C116 46 126 54 129 68C144 78 154 94 154 112C154 136 130 152 100 152" +
  "C70 152 46 136 46 112C46 94 56 78 71 68C74 54 84 46 100 46Z";

// 一片翅膀，画在局部坐标里（翼根在原点），四片全靠镜像摆出来，
// 所以四翼是同一片翅膀，不是四次手画。后缘是扇贝形的，那是羽尖。
const WING =
  "M0 0C-10 -20 -26 -36 -48 -42C-41 -31 -43 -28 -37 -22C-43 -19 -39 -15 -33 -11" +
  "C-39 -7 -33 -3 -27 1C-31 5 -25 9 -19 11C-21 15 -14 17 -6 16C-1 14 2 8 0 0Z";
const WING_QUILLS = "M-5 5C-15 -3 -25 -11 -36 -19M-9 11C-19 5 -27 -1 -34 -9";

function wing(x: number, y: number, sx: number, sy: number): string {
  const at = `translate(${r(x)} ${r(y)}) scale(${sx} ${sy})`;
  return (
    `<g transform="${at}">` +
    `<path d="${WING}" stroke-width="${STROKE.limb}"/>` +
    `<path d="${WING_QUILLS}" stroke-width="${STROKE.detail}"/>` +
    `</g>`
  );
}

/** 一只袋足：短腿加三趾。 */
function sackFoot(x: number, y: number, toX: number): string {
  return (
    `<path d="M${r(x)} ${r(y)}C${r(x + (toX - x) * 0.5)} ${r(y + 16)} ${r(toX)} ${r(y + 22)} ${r(toX)} 176" stroke-width="${STROKE.limb}"/>` +
    `<path d="M${r(toX - 6)} 176h12" stroke-width="${STROKE.limb}"/>` +
    `<path d="M${r(toX - 3)} 176v-5" stroke-width="${STROKE.detail}"/>` +
    `<path d="M${r(toX + 3)} 176v-5" stroke-width="${STROKE.detail}"/>`
  );
}

const dijiang =
  GROUND +
  // 四翼：一片翅膀，四次镜像。
  wing(54, 86, 1, 1) +
  wing(50, 124, 0.9, -0.9) +
  wing(146, 86, -1, 1) +
  wing(150, 124, -0.9, -0.9) +
  // 六足。
  sackFoot(64, 141, 52) +
  sackFoot(80, 149, 74) +
  sackFoot(94, 152, 92) +
  sackFoot(106, 152, 108) +
  sackFoot(120, 149, 126) +
  sackFoot(136, 141, 148) +
  // 袋身。
  `<path d="${SACK}" stroke-width="${STROKE.cut}"/>` +
  // 丹火。虚线的第二道轮廓：这东西是团糊的，边不是一条。
  `<path d="${SACK}" transform="translate(100 99) scale(1.07) translate(-100 -99)"` +
  ` stroke="var(--at-primary)" stroke-width="${STROKE.limb}" stroke-dasharray="15 13"/>` +
  `<g stroke="var(--at-primary)">` +
  hatch(
    [
      [76, 126, 14],
      [88, 132, 16],
      [100, 134, 16],
      [112, 132, 14],
      [122, 124, 12],
    ],
    STROKE.limb,
  ) +
  `</g>`;

// ---------------------------------------------------------------------------
// 陆吾 — tiger's body with nine tails, human face, tiger's claws.
// 人面就是人面：不画兽耳。九尾跟九尾狐同一个 tailFan。
// ---------------------------------------------------------------------------
const luwu =
  GROUND +
  tailFan(140, 102, -100, -22, 52) +
  // 虎身：肩脊和后胯各一个鼓包，不是一个椭圆。
  `<path d="M74 110C78 97 88 90 100 89C114 88 126 90 134 94C146 99 152 108 150 120` +
  `C148 131 140 138 130 138C112 142 96 142 86 138C77 134 72 122 74 110Z" stroke-width="${STROKE.cut}"/>` +
  // 四腿：近腿粗，远腿细，全套都这样分。
  `<path d="M88 138C86 148 88 155 86 163C85 169 86 172 86 176" stroke-width="${STROKE.limb}"/>` +
  `<path d="M132 137C136 147 132 155 128 161C125 167 126 172 126 176" stroke-width="${STROKE.limb}"/>` +
  `<path d="M100 141C99 151 98 162 99 176" stroke-width="${STROKE.detail}"/>` +
  `<path d="M118 140C120 150 116 158 114 166C113 170 113 173 113 176" stroke-width="${STROKE.detail}"/>` +
  paw(86) +
  paw(99, 5) +
  paw(113, 5) +
  paw(127) +
  // 虎纹。
  hatch([
    [94, 104, 12],
    [106, 100, 13],
    [118, 100, 13],
    [130, 104, 11],
    [96, 128, 9],
    [110, 130, 9],
    [124, 128, 9],
  ]) +
  // 颈：两道短刀，人头压在肩上。
  `<path d="M78 104C77 100 77 97 78 94" stroke-width="${STROKE.cut}"/>` +
  `<path d="M90 120C85 114 82 107 82 100" stroke-width="${STROKE.limb}"/>` +
  // 人面。
  `<circle cx="64" cy="82" r="18" stroke-width="${STROKE.cut}"/>` +
  eye(57, 78) +
  eye(71, 78) +
  `<path d="M64 82v7" stroke-width="${STROKE.detail}"/>` +
  `<path d="M57 94q7 5 14 0" stroke-width="${STROKE.detail}"/>` +
  `<path d="M48 76C52 60 76 58 81 73" stroke-width="${STROKE.limb}"/>`;

// ---------------------------------------------------------------------------
// 夫诸 — like a white deer with four horns.
// 白：全套里唯一一只身上不落刀纹的。白是空出来的，不是填出来的。
// ---------------------------------------------------------------------------
const fuzhu =
  GROUND +
  // 鹿身。
  `<path d="M82 110C86 100 96 96 108 96C120 95 130 97 137 101C145 105 149 112 147 121` +
  `C145 129 139 134 131 134C114 138 98 138 88 134C80 130 78 118 82 110Z" stroke-width="${STROKE.cut}"/>` +
  // 短尾。
  `<path d="M146 112C151 109 153 105 152 100" stroke-width="${STROKE.limb}"/>` +
  // 四腿。
  `<path d="M90 134C88 146 90 153 88 162C87 168 88 172 88 176" stroke-width="${STROKE.limb}"/>` +
  `<path d="M130 133C133 145 130 153 128 162C127 168 128 172 128 176" stroke-width="${STROKE.limb}"/>` +
  `<path d="M100 137C99 149 98 162 99 176" stroke-width="${STROKE.detail}"/>` +
  `<path d="M118 136C120 148 117 158 116 166C115 170 115 173 116 176" stroke-width="${STROKE.detail}"/>` +
  hoof(88) +
  hoof(99) +
  hoof(116) +
  hoof(128) +
  // 长颈。
  `<path d="M82 110C76 98 71 84 70 70" stroke-width="${STROKE.cut}"/>` +
  `<path d="M94 118C86 108 80 94 76 78" stroke-width="${STROKE.limb}"/>` +
  // 头。
  `<path d="M40 66L62 55C70 52 77 57 75 66C73 77 62 83 50 81C42 80 37 72 40 66Z" stroke-width="${STROKE.cut}"/>` +
  eye(62, 64) +
  `<circle cx="43" cy="69" r="1.8" fill="currentColor" stroke="none"/>` +
  `<path d="M45 76C50 79 56 79 60 77" stroke-width="${STROKE.detail}"/>` +
  ear(74, 66, 1, 13) +
  // 四角。根粗梢细：同一条角画两遍，下半截落粗刀，这是全套唯一的收锋做法。
  `<g stroke-width="${STROKE.detail}">` +
  `<path d="M62 56C58 46 57 38 60 30"/>` +
  `<path d="M67 53C66 43 68 35 73 28"/>` +
  `<path d="M72 55C76 46 83 40 91 37"/>` +
  `<path d="M76 61C83 56 92 55 100 57"/>` +
  `</g>` +
  `<g stroke-width="${STROKE.cut}">` +
  `<path d="M62 56C59.5 51 58.5 47 58.4 43"/>` +
  `<path d="M67 53C66.4 48 66.6 44 67.4 41"/>` +
  `<path d="M72 55C74 50.5 77 47.5 80.4 45"/>` +
  `<path d="M76 61C80 58.5 84.4 57 88.6 56.4"/>` +
  `</g>`;

// ---------------------------------------------------------------------------
// 毕方 — like a crane, one-footed, red-marked on a blue ground, white-billed.
// 蓝地：这套配色里没有蓝，所以“地”是刀纹；赤纹是 --at-primary；白喙一刀不落。
// 一足就是一足：这张图上找不到第二条腿。
// ---------------------------------------------------------------------------
const bifang =
  GROUND +
  // 尾羽：三片，跟翅膀一样是有厚度的片，不是三条线。
  `<g stroke-width="${STROKE.limb}">` +
  `<path d="M148 112C162 103 176 99 190 99C181 110 167 117 151 120Z"/>` +
  `<path d="M152 124C166 121 180 122 191 127C179 132 163 133 150 131Z"/>` +
  `<path d="M151 136C163 138 175 143 184 151C172 153 158 148 148 142Z"/>` +
  `</g>` +
  // 身：斜着的卵形，不是个圆。
  `<path d="M84 126C84 110 96 96 114 94C132 92 148 100 152 114C156 128 148 142 132 150` +
  `C116 158 98 154 90 142C86 136 84 132 84 126Z" stroke-width="${STROKE.cut}"/>` +
  // 地：身上的刀纹。
  hatch([
    [90, 132, 10],
    [96, 142, 14],
    [106, 149, 15],
    [118, 152, 14],
    [130, 149, 11],
    [142, 141, 9],
  ]) +
  // 翅。
  `<path d="M98 112C112 104 132 108 142 120C134 134 112 136 100 128C92 124 92 116 98 112Z" stroke-width="${STROKE.limb}"/>` +
  `<g stroke-width="${STROKE.detail}">` +
  `<path d="M102 118C112 114 126 117 134 123"/>` +
  `<path d="M100 125C110 122 124 126 132 131"/>` +
  `</g>` +
  // 颈与头。
  `<path d="M94 104C88 92 82 80 76 70" stroke-width="${STROKE.cut}"/>` +
  `<path d="M108 100C102 90 96 80 90 70" stroke-width="${STROKE.limb}"/>` +
  `<path d="M76 70C70 58 60 53 53 56C51 63 58 72 68 76C74 78 79 76 76 70Z" stroke-width="${STROKE.cut}"/>` +
  eye(68, 65) +
  // 白喙：只有轮廓，里面空着。跟身上的刀纹对着看才是白的。
  `<path d="M55 57L20 50L53 68" stroke-width="${STROKE.limb}"/>` +
  // 一足。
  `<path d="M118 152C118 161 115 168 115 176" stroke-width="${STROKE.cut}"/>` +
  `<g stroke-width="${STROKE.limb}">` +
  `<path d="M115 176L102 172"/><path d="M115 176L128 172"/><path d="M115 176l2 -7"/>` +
  `</g>` +
  // 赤纹：翅上两道，身上一道，头上一道。形是黑线扛的，颜色只是标记。
  `<g stroke="var(--at-primary)" stroke-width="${STROKE.limb}">` +
  `<path d="M104 116C113 113 123 117 129 123"/>` +
  `<path d="M101 123C111 121 121 125 127 131"/>` +
  `<path d="M143 128C148 131 152 136 153 141"/>` +
  `<path d="M74 56C78 48 84 44 92 44"/>` +
  `</g>`;

// ---------------------------------------------------------------------------
// 九尾狐 — like a fox with nine tails.
// ---------------------------------------------------------------------------
const jiuweihu =
  GROUND +
  tailFan(136, 108, -96, -14, 52) +
  // 身。
  `<path d="M74 108C78 99 88 94 100 93C114 92 128 95 134 101C142 108 144 118 138 126` +
  `C132 133 120 136 106 136C94 136 84 134 78 128C72 122 70 114 74 108Z" stroke-width="${STROKE.cut}"/>` +
  // 四腿。
  `<path d="M84 134C82 146 84 154 83 162C82 168 83 172 83 176" stroke-width="${STROKE.limb}"/>` +
  `<path d="M126 132C129 144 126 152 124 161C123 167 124 172 124 176" stroke-width="${STROKE.limb}"/>` +
  `<path d="M96 136C95 148 94 162 95 176" stroke-width="${STROKE.detail}"/>` +
  `<path d="M114 135C116 147 113 157 112 166C111 170 111 173 112 176" stroke-width="${STROKE.detail}"/>` +
  paw(83, 5) +
  paw(95, 5) +
  paw(112, 5) +
  paw(124, 5) +
  // 头：闭合的楔子，跟夫诸同一个头法，只是短而钝。颈是两道刀。
  `<path d="M34 100L56 88C64 84 72 90 70 99C68 108 58 114 46 112C38 111 32 106 34 100Z" stroke-width="${STROKE.cut}"/>` +
  `<path d="M70 99C75 102 79 105 81 110" stroke-width="${STROKE.cut}"/>` +
  `<path d="M62 113C68 117 74 121 78 126" stroke-width="${STROKE.limb}"/>` +
  `<path d="M38 105C44 107 50 108 56 107" stroke-width="${STROKE.detail}"/>` +
  `<circle cx="36" cy="99" r="2.2" fill="currentColor" stroke="none"/>` +
  eye(58, 97) +
  ear(50, 90, 1, 16) +
  ear(61, 92, 1, 16) +
  hatch([
    [90, 106, 11],
    [102, 102, 12],
    [114, 102, 12],
    [126, 106, 10],
    [96, 128, 8],
    [110, 128, 8],
  ]);

// ---------------------------------------------------------------------------
// 并封 — like a pig, black, with a head at each end.
// 两头对称，所以没有尾，也没有前后。黑是密刀纹。腿短，身子压低。
// ---------------------------------------------------------------------------
function bingfengHead(x: number, s: number): string {
  const snout = x + 27 * s;
  return (
    `<path d="M${r(x)} 94C${r(x + 12 * s)} 92 ${r(x + 22 * s)} 96 ${r(snout)} 104` +
    `C${r(snout + 3 * s)} 110 ${r(snout + 2 * s)} 116 ${r(snout - 1 * s)} 120` +
    `C${r(x + 20 * s)} 126 ${r(x + 10 * s)} 127 ${r(x)} 125" stroke-width="${STROKE.cut}"/>` +
    `<path d="M${r(snout)} 103C${r(snout + 6 * s)} 107 ${r(snout + 6 * s)} 117 ${r(snout - 1 * s)} 121" stroke-width="${STROKE.limb}"/>` +
    `<circle cx="${r(snout + 3 * s)}" cy="112" r="1.8" fill="currentColor" stroke="none"/>` +
    ear(x + 4 * s, 93, s, 14) +
    eye(x + 14 * s, 102)
  );
}

const bingfeng =
  GROUND +
  // 身子和两个头一起压低 14，猪腿是短的。
  `<g transform="translate(0 14)">` +
  `<path d="M74 94C88 86 112 86 126 94" stroke-width="${STROKE.cut}"/>` +
  `<path d="M74 125C88 134 112 134 126 125" stroke-width="${STROKE.cut}"/>` +
  bingfengHead(126, 1) +
  bingfengHead(74, -1) +
  // 黑：密刀纹。
  hatch([
    [78, 108, 10],
    [84, 116, 12],
    [90, 122, 14],
    [96, 124, 14],
    [102, 124, 14],
    [108, 124, 14],
    [114, 122, 13],
    [120, 116, 11],
    [124, 108, 9],
    [86, 100, 8],
    [96, 100, 9],
    [106, 100, 9],
    [114, 100, 8],
  ]) +
  `</g>` +
  // 四腿，两端各一对。
  `<path d="M84 144C82 154 84 164 84 176" stroke-width="${STROKE.limb}"/>` +
  `<path d="M116 144C118 154 116 164 116 176" stroke-width="${STROKE.limb}"/>` +
  `<path d="M95 147C94 157 93 166 94 176" stroke-width="${STROKE.detail}"/>` +
  `<path d="M105 147C106 157 107 166 106 176" stroke-width="${STROKE.detail}"/>` +
  hoof(84) +
  hoof(94) +
  hoof(106) +
  hoof(116);


export const CUTS: Record<string, Cut> = {
  帝江: {
    name: "帝江",
    alt: "帝江, a woodblock line cut: a sack-shaped body with no face, four wings and six feet, its second contour cut in cinnabar.",
    body: dijiang,
  },
  陆吾: {
    name: "陆吾",
    alt: "陆吾, a woodblock line cut: a tiger's body with clawed paws and nine fanned tails, carrying a human face.",
    body: luwu,
  },
  夫诸: {
    name: "夫诸",
    alt: "夫诸, a woodblock line cut: a deer with four horns, left unhatched so it reads white.",
    body: fuzhu,
  },
  毕方: {
    name: "毕方",
    alt: "毕方, a woodblock line cut: a crane standing on its single foot, hatched dark, its bill left white and its wing marked in cinnabar.",
    body: bifang,
  },
  九尾狐: {
    name: "九尾狐",
    alt: "九尾狐, a woodblock line cut: a fox with nine fanned tails.",
    body: jiuweihu,
  },
  并封: {
    name: "并封",
    alt: "并封, a woodblock line cut: a pig hatched solid black, with a head at each end of one body.",
    body: bingfeng,
  },
};

/** The cut for a printed name, or `undefined` when nothing has been drawn for it. */
export function cutFor(name: string): Cut | undefined {
  return Object.prototype.hasOwnProperty.call(CUTS, name) ? CUTS[name] : undefined;
}

/** Every name this file has a drawing for. */
export function drawnNames(): string[] {
  return Object.keys(CUTS);
}
