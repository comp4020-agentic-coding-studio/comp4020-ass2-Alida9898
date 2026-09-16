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
