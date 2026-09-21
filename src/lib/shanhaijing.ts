// 受容本《山海經》的篇卷結構。这里的每一个名字都抄自底本，不是我们编的。
//
// The chapter structure of the received text, transcribed from the 四庫全書
// edition at https://zh.wikisource.org/wiki/山海經 (fetched 2026-09-17).
// Nothing in this file is invented: it is the index of the edition this course
// cites, and `spec/bestiary.test.ts` uses it to reject any citation that
// points somewhere the text does not go.
//
// Names are traditional characters, as the edition prints them. The course's
// own prose uses simplified; a quoted line does not, because changing the
// script of a quotation is still changing the quotation.

/** The eighteen 卷, in the order the edition lists them. */
export const CHAPTERS = [
  "南山經",
  "西山經",
  "北山經",
  "東山經",
  "中山經",
  "海外南經",
  "海外西經",
  "海外北經",
  "海外東經",
  "海內南經",
  "海內西經",
  "海內北經",
  "海內東經",
  "大荒東經",
  "大荒南經",
  "大荒西經",
  "大荒北經",
  "海內經",
] as const;

export type Chapter = (typeof CHAPTERS)[number];

/**
 * The twenty-six route-sections of the 五藏山經, keyed by the 卷 that holds
 * them. The five 山經 chapters are the only ones subdivided this way; the
 * thirteen 海經 and 大荒經 chapters are cited by 卷 alone.
 *
 * Section names are the edition's own section headings. Note that 中山經's
 * first section is headed 中山經 and not 中山經之首 — the inconsistency is the
 * edition's, and it is kept rather than tidied away.
 */
export const SECTIONS = {
  南山經: ["南山經之首", "南次二經", "南次三經"],
  西山經: ["西山經之首", "西次二經", "西次三經", "西次四經"],
  北山經: ["北山經之首", "北次二經", "北次三經"],
  東山經: ["東山經之首", "東次二經", "東次三經", "東次四經"],
  中山經: [
    "中山經",
    "中次二經",
    "中次三經",
    "中次四經",
    "中次五經",
    "中次六經",
    "中次七經",
    "中次八經",
    "中次九經",
    "中次十經",
    "中次十一經",
    "中次十二經",
  ],
} as const satisfies Partial<Record<Chapter, readonly string[]>>;

/** The 卷 that carry 次 sections. A citation into one of these needs both. */
export const MOUNTAIN_CHAPTERS = Object.keys(SECTIONS) as (keyof typeof SECTIONS)[];

export const ALL_SECTIONS: readonly string[] = Object.values(SECTIONS).flat();


// 十八卷的英文名。卷名是全站出现最多的中文——每张标本卡的出处行都有它——
// 而它一直是纯中文。译名是课程自己给的，所以放在这里而不是 citations.ts。
//
// English names for the eighteen 卷. The chapter line is the most repeated
// Chinese on the site, once per specimen card, and it carried no English at
// all. These renderings are the course's own, which is why they live here and
// not in the generated citations module.
export const CHAPTER_NAMES: Record<string, string> = {
  南山經: "Southern Mountains",
  西山經: "Western Mountains",
  北山經: "Northern Mountains",
  東山經: "Eastern Mountains",
  中山經: "Central Mountains",
  海外南經: "Beyond the Seas, South",
  海外西經: "Beyond the Seas, West",
  海外北經: "Beyond the Seas, North",
  海外東經: "Beyond the Seas, East",
  海內南經: "Within the Seas, South",
  海內西經: "Within the Seas, West",
  海內北經: "Within the Seas, North",
  海內東經: "Within the Seas, East",
  大荒東經: "Great Wilds, East",
  大荒南經: "Great Wilds, South",
  大荒西經: "Great Wilds, West",
  大荒北經: "Great Wilds, North",
  海內經: "Within the Seas",
};


// 次 分节和山川名的英文。分节名是可推的（之首＝第一节，次N＝第N节），
// 山川名不是，所以一条条给。译名是课程自己的，跟卷名一样放这里。
//
// English for the 次 sections and for the mountains and waters a record is
// filed under. A reader who cannot read the characters otherwise gets a
// reference they cannot use. Section names derive; place names do not, so they
// are listed. Both are the course's own renderings, like the chapter names.
const DIRECTION: Record<string, string> = {
  南: "southern",
  西: "western",
  北: "northern",
  東: "eastern",
  中: "central",
};

const ORDINAL = ["", "first", "second", "third", "fourth", "fifth", "sixth",
  "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"];

const NUMERAL: Record<string, number> = {
  一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 十一: 11, 十二: 12,
};

/** `西次三經` → "third western section"; `南山經之首` → "first southern section". */
export function sectionName(section: string): string | undefined {
  const where = DIRECTION[section[0]];
  if (!where) return undefined;
  if (section.endsWith("之首")) return `first ${where} section`;
  const digits = section.replace(/^.次/, "").replace(/經$/, "");
  const n = NUMERAL[digits];
  return n ? `${ORDINAL[n]} ${where} section` : undefined;
}

export const PLACE_NAMES: Record<string, string> = {
  令丘之山: "Mount Lingqiu",
  基山: "Mount Ji",
  天山: "the Heaven Mountain",
  太華之山: "Mount Taihua",
  女烝之山: "Mount Nüzheng",
  姑逢之山: "Mount Gufeng",
  子桐之山: "Mount Zitong",
  密山: "Mount Mi",
  招搖之山: "Mount Zhaoyao",
  敖岸之山: "Mount Aoan",
  昆侖之丘: "the Hill of Kunlun",
  杻陽之山: "Mount Niuyang",
  渾夕之山: "Mount Hunxi",
  發鳩之山: "Mount Fajiu",
  空桑之山: "Mount Kongsang",
  章莪之山: "Mount Zhang'e",
  翼望之山: "Mount Yiwang",
  英山: "Mount Ying",
  雞山: "Mount Ji (雞)",
  青丘之山: "the Green Hill",
  鮮山: "Mount Xian",
  鹿吳之山: "Mount Luwu",
};

/** The whole reference in English: chapter, section and place. */
export function referenceInEnglish(
  chapter: string,
  section?: string,
  locus?: string,
): string {
  const parts = [CHAPTER_NAMES[chapter] ?? chapter];
  if (section) parts.push(sectionName(section) ?? section);
  if (locus) parts.push(PLACE_NAMES[locus] ?? locus);
  return parts.join(" · ");
}

export function isChapter(value: string): value is Chapter {
  return (CHAPTERS as readonly string[]).includes(value);
}

/** Sections belonging to a 卷, or an empty list if it carries none. */
export function sectionsOf(chapter: Chapter): readonly string[] {
  return chapter in SECTIONS ? SECTIONS[chapter as keyof typeof SECTIONS] : [];
}

/** The edition every quoted line in this course is checked against. */
export const EDITION = {
  title: "山海經",
  edition: "四庫全書本，郭璞注",
  source: "https://zh.wikisource.org/wiki/山海經",
  retrieved: "2026-09-17",
  note: "郭璞's interlinear notes are stripped from quoted lines; the base text is not otherwise altered.",
} as const;
