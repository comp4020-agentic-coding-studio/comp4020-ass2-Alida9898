// 十二周的教学契约。每周恰好一条规则，至少三个生物。周次和三个阶段都是固定的。
//
// The syllabus contract. One rule per week, stated as a thesis, and at least
// three creatures that put it under pressure. A creature may recur: the same
// record read under a different rule is meant to look different, and weeks 1
// and 7 on 狌狌 are the test of whether that is true.
//
// Each week's session page restates its own rule and creature list in
// frontmatter. `spec/course.test.ts` checks that the page and this file agree,
// so a rule cannot be edited in one place and left standing in the other.

import { bestiary } from "./bestiary";

export type Phase = "build" | "stress" | "rebuild";

export interface Week {
  week: number;
  phase: Phase;
  title: string;
  topic: string;
  /** Exactly one rule, written as a one-sentence thesis. */
  rule: string;
  /** At least three creatures from the bestiary, by printed name. */
  creatures: string[];
  /**
   * An abstract pattern with placeholder letters. Not a quotation, kept in its
   * own field so nothing checks it against the text or prints it as though the
   * text said it.
   */
  formula?: string;
}

export const weeks: Week[] = [
  {
    week: 1,
    phase: "build",
    title: "What a classification system is",
    topic: "Linnaeus, Borges on Wilkins, and the ordering the text already has.",
    rule: "The text is already a classification: it files every creature by where you would meet it, which is a claim about the world and not the absence of one.",
    creatures: ["狌狌", "鹿蜀", "猼訑", "九尾狐"],
  },
  {
    week: 2,
    phase: "build",
    title: "Reading the source text",
    topic: "The fixed formula, and pulling characters out of a single record.",
    rule: "其状如X，Y首，见则Z is a template the text reaches for and often leaves incomplete, so the first character a taxonomy has to handle is an absent one.",
    creatures: ["鹿蜀", "夫诸", "軨軨", "蛊雕"],
    formula: "其狀如X，Y首，見則Z",
  },
  {
    week: 3,
    phase: "build",
    title: "Morphological classification",
    topic: "Composite bodies, and a first taxonomy built from the clean cases.",
    rule: "A composite body is assembled from a small closed set of parts, so the parts and not the whole are what a taxonomy can count.",
    creatures: ["帝江", "陆吾", "天吴", "开明兽"],
  },
  {
    week: 4,
    phase: "build",
    title: "Geographic classification",
    topic: "The book's own ordering, set against the one we are building.",
    rule: "The 山经 routes can be mapped and the 海经 cannot, so a habitat field that accepts both is recording two different kinds of fact under one name.",
    creatures: ["夫诸", "陵鱼", "讙头", "驺吾"],
  },
  {
    week: 5,
    phase: "stress",
    title: "Omens and uses",
    topic: "Two candidate characters Linnaeus has no rank for.",
    rule: "Neither an omen nor a use is a character of the creature: 见则天下大旱 attaches word for word to at least six unrelated creatures, and a use states what a person gets rather than what the creature is.",
    creatures: ["顒", "肥遗", "毕方", "軨軨", "旋龟", "猼訑"],
  },
  {
    week: 6,
    phase: "stress",
    title: "The god and the beast",
    topic: "What counts as a god and what as a beast. Midterm taxonomic dispute.",
    rule: "The text's own words 神, 獸, 鳥 and 人 do not sort by body: 陆吾 and 开明兽 guard one mountain with nearly one body and are filed apart, and several records name no kind at all.",
    creatures: ["陆吾", "开明兽", "帝江", "烛阴", "精卫"],
  },
  {
    week: 7,
    phase: "stress",
    title: "Drift",
    topic: "What a name picks up after the record that named it has closed.",
    rule: "A name outlives its record: 九尾狐 is never named in the text, so everything the name now carries was added after the record closed.",
    creatures: ["九尾狐", "狌狌", "精卫", "讙头"],
  },
  {
    week: 8,
    phase: "stress",
    title: "One name, many creatures",
    topic: "The failure the entry has no field for.",
    rule: "One name takes many creatures and one creature takes many names, and no field in the entry can hold either fact.",
    creatures: ["肥遗", "讙", "窫窳", "并封", "相柳", "旋龟", "天吴"],
  },
  {
    week: 9,
    phase: "rebuild",
    title: "Other systems",
    topic: "Two bestiaries that sort by what a creature is for the reader.",
    rule: "Other bestiaries sort by what a creature is for the reader, so their top division is a fact about the reader rather than about the creatures.",
    creatures: ["驺吾", "烛阴", "夔", "九尾狐"],
  },
  {
    week: 10,
    phase: "rebuild",
    title: "Cross-system comparison",
    topic: "One creature, filed twice, and what each filing had to discard.",
    rule: "Putting one creature through two systems shows which of its features each system had to ignore, and the ignored features are where the two systems actually disagree.",
    creatures: ["九尾狐", "帝江", "夔", "驺吾"],
  },
  {
    week: 11,
    phase: "rebuild",
    title: "Beyond the Classic of Mountains and Seas",
    topic: "Classification as a general skill: new material, no system supplied.",
    rule: "A system transfers only as far as its characters do, so the test of one is naming which of its characters the next material will not supply.",
    creatures: ["夫诸", "夔", "帝江", "九尾狐"],
  },
  {
    week: 12,
    phase: "rebuild",
    title: "The taxonomic congress",
    topic: "Students present the classification systems they designed.",
    rule: "A new entry is admissible only if it cites a line and declares which of its own fields that line does not supply.",
    creatures: ["猼訑", "蛊雕", "顒", "窫窳"],
  },
];

export const PHASE_LABELS: Record<Phase, string> = {
  build: "Build a system that works",
  stress: "Push it until it strains",
  rebuild: "Take it apart and rebuild",
};

export function weekOf(week: number): Week | undefined {
  return weeks.find((entry) => entry.week === week);
}

/** A week's creatures, resolved against the bestiary. Unknown names come back as undefined. */
export function creaturesOf(week: Week) {
  return week.creatures.map((name) => bestiary.find((entry) => entry.name === name));
}

/** Creature names a week lists that the bestiary does not have. */
export function unknownCreatures(): string[] {
  const known = new Set(bestiary.map((entry) => entry.name));
  const bad: string[] = [];
  for (const week of weeks) {
    for (const name of week.creatures) {
      if (!known.has(name)) bad.push(`week ${week.week}: ${name}`);
    }
  }
  return bad;
}

/** Bestiary entries no week uses. */
export function orphanCreatures(): string[] {
  const used = new Set(weeks.flatMap((week) => week.creatures));
  return bestiary.filter((entry) => !used.has(entry.name)).map((entry) => entry.name);
}
