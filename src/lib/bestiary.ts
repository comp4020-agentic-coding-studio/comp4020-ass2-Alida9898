// 二十五个条目，覆盖全部十八卷。引文一律引 citations.ts 的 key，这个文件里不许出现原文字符串。
//
// The bestiary. Twenty-five creatures, with at least one record in every one of
// the eighteen 卷.
//
// Prose in this file is the course's own. The quoted text is not: every record
// is a `CitationKey` into `citations.ts`, which is machine-sliced from the
// edition. There is deliberately no field here that accepts a line of 山海經,
// so a plausible-looking quotation cannot be written into this file at all.
//
// `verified: false` means the record has not been found in the edition. Nothing
// may be claimed around such an entry, and `spec/bestiary.test.ts` enforces it.

import { z } from "astro/zod";
import { citations, type CitationKey } from "./citations";
import { isChapter, sectionsOf, type Chapter } from "./shanhaijing";

const citationKeys = Object.keys(citations) as [CitationKey, ...CitationKey[]];

export const creatureSchema = z.strictObject({
  /** The name as the course prints it, in simplified characters. */
  name: z.string().trim().min(1),
  /** The same name as the edition prints it. Equal to `name` where they agree. */
  nameTrad: z.string().trim().min(1),
  pinyin: z.string().trim().min(1),

  /** Genus from the source name, species from the diagnostic trait. Invented. */
  binomial: z.string().regex(/^[A-Z][a-z]+ [a-z]+$/, "genus then species, Latin-style"),

  /**
   * The word the record itself uses. Absent where the text supplies none,
   * which is not an oversight in this file: several records never say what
   * kind of thing they are describing, and week 7 is about that.
   */
  kind: z.enum(["獸", "鳥", "神", "龜", "魚", "蟲", "蛇", "人"]).optional(),

  /** The 其狀如 clause, in the course's own words. */
  form: z.string().trim().min(1),
  /** Where the record files it. */
  habitat: z.string().trim().min(1),

  /** 見則… — what its appearance portends. */
  omen: z.string().trim().min(1).optional(),
  /** 食之…／佩之…／服之…／乘之… — what a person gets from it. */
  use: z.string().trim().min(1).optional(),

  /** Keys into `citations.ts`. Never a line of text. */
  cites: z.array(z.enum(citationKeys)).min(1),

  /** True when the edition describes the creature but never gives it this name. */
  unnamedInSource: z.boolean().default(false),

  /** False means: not found in the edition. Then nothing may be claimed. */
  verified: z.boolean(),

  /** What this record costs the system. One or two sentences. */
  note: z.string().trim().min(1).optional(),
});

export type Creature = z.infer<typeof creatureSchema>;

export const bestiary: Creature[] = [
  {
    name: "狌狌",
    nameTrad: "狌狌",
    pinyin: "xīngxīng",
    binomial: "Xingxing albiauritum",
    kind: "獸",
    form: "like a 禺 with white ears, going on all fours and running upright; and, in a second record, like a pig with a human face",
    habitat: "招搖之山, the first mountain of the first route; and west of 舜's burial",
    use: "食之善走 — eat it and you run well",
    cites: ["xingxing.a", "xingxing.b", "xingxing.c"],
    verified: true,
    note: "Three records, three bodies, two spellings. The first beast in the book is also the first proof that a name does not fix a creature.",
  },
  {
    name: "鹿蜀",
    nameTrad: "鹿蜀",
    pinyin: "lùshǔ",
    binomial: "Lushu albicapitum",
    kind: "獸",
    form: "like a horse with a white head, tiger-striped, red-tailed, its cry a song",
    habitat: "杻陽之山, on the first route",
    use: "佩之宜子孫 — wear it and your descendants prosper",
    cites: ["lushu"],
    verified: true,
    note: "The cleanest instance of the formula in the book: comparison, parts, sound, name, use, in that order and nothing else.",
  },
  {
    name: "旋龟",
    nameTrad: "旋龜",
    pinyin: "xuánguī",
    binomial: "Xuangui avicapitum",
    kind: "龜",
    form: "bird-headed, viper-tailed in one record and turtle-tailed in the other; sounds like wood splitting",
    habitat: "怪水 below 杻陽之山, and 豪水 below 密山",
    use: "佩之不聾，可以為底 — wear it against deafness, and against calluses",
    cites: ["xuangui.a", "xuangui.b"],
    verified: true,
    note: "Two records, one name, two tails, and only one of them carries a use. Either the species is wrong or the tail is not a character.",
  },
  {
    name: "猼訑",
    nameTrad: "猼訑",
    pinyin: "bóshī",
    binomial: "Boshi dorsoculatum",
    kind: "獸",
    form: "like a sheep, nine tails, four ears, eyes set in its back",
    habitat: "基山, on the first route",
    use: "佩之不畏 — wear it and you are not afraid",
    cites: ["boshi"],
    verified: true,
    note: "Nine tails on a sheep, with no relation to 九尾狐 or 陸吾 that the text admits. Whether nine tails is a character or a coincidence is week 12's problem.",
  },
  {
    name: "九尾狐",
    nameTrad: "九尾狐",
    pinyin: "jiǔwěihú",
    binomial: "Jiuweihu anthropophagum",
    kind: "獸",
    form: "like a fox with nine tails, its voice an infant's",
    habitat: "青丘之山, on the first route",
    use: "食者不蠱 — eat it and you cannot be bewitched. It also eats people",
    cites: ["jiuweihu"],
    unnamedInSource: true,
    verified: true,
    note: "The edition never calls it 九尾狐. It is an unnamed beast, fox-shaped and nine-tailed, and everything the name now carries was attached to it later.",
  },
  {
    name: "蛊雕",
    nameTrad: "蠱雕",
    pinyin: "gǔdiāo",
    binomial: "Gudiao cornutum",
    kind: "獸",
    form: "like an eagle but horned, its voice an infant's",
    habitat: "澤更之水, below 鹿吳之山",
    cites: ["gudiao"],
    verified: true,
    note: "Named before it is described, which reverses the formula. Shares its infant's cry with 九尾狐, which is either a shared character or a shared cliché.",
  },
  {
    name: "顒",
    nameTrad: "顒",
    pinyin: "yú",
    binomial: "Yu quadrioculatum",
    kind: "鳥",
    form: "like an owl with a human face, four eyes, and ears; it calls its own name",
    habitat: "令丘之山, on the third southern route",
    omen: "見則天下大旱 — where it appears, the world goes dry",
    cites: ["yu"],
    verified: true,
    note: "Its omen is shared word for word with at least five unrelated creatures, so the omen cannot be a property of this bird.",
  },
  {
    name: "帝江",
    nameTrad: "帝江",
    pinyin: "dìjiāng",
    binomial: "Dijiang anommatum",
    kind: "神",
    form: "like a yellow sack, red as cinnabar fire, six feet and four wings, a blur with no face",
    habitat: "天山, on the third western route",
    cites: ["dijiang"],
    verified: true,
    note: "The limit case for a grammar of parts. Every other composite is built from recognisable animals; this one is built from none, and it still knows how to dance.",
  },
  {
    name: "陆吾",
    nameTrad: "陸吾",
    pinyin: "lùwú",
    binomial: "Luwu novemcaudatum",
    kind: "神",
    form: "tiger's body with nine tails, human face, tiger's claws",
    habitat: "昆侖之丘, the god's lower capital",
    cites: ["luwu"],
    verified: true,
    note: "Filed by office rather than by body: it is what it administers. 開明獸 stands on the same mountain with nearly the same body and is filed as a beast.",
  },
  {
    name: "毕方",
    nameTrad: "畢方",
    pinyin: "bìfāng",
    binomial: "Bifang unipedatum",
    kind: "鳥",
    form: "like a crane, one-footed, red-marked on a blue ground, white-billed",
    habitat: "章莪之山, on the third western route",
    omen: "見則其邑有譌火 — where it appears, that town has uncanny fires",
    cites: ["bifang"],
    verified: true,
    note: "The omen is fire, and it is local. The drought it is popularly credited with belongs to other creatures entirely.",
  },
  {
    name: "讙",
    nameTrad: "讙",
    pinyin: "huān",
    binomial: "Huan monoculatum",
    kind: "獸",
    form: "like a wildcat, one eye, three tails, its cry holding a hundred voices",
    habitat: "翼望之山, on the third western route",
    use: "可以禦凶，服之已癉 — it wards off ill, and taken as medicine it cures fever",
    cites: ["huan"],
    verified: true,
    note: "The same character names two mountains and a country elsewhere in the text, and its own mountain has a namesake in 中次十一經. Four referents, no collision the text notices.",
  },
  {
    name: "肥遗",
    nameTrad: "肥遺",
    pinyin: "féiyí",
    binomial: "Feiyi bicorporeum",
    kind: "蛇",
    form: "a snake with one head and two bodies; also a quail-like yellow bird with a red bill; also a six-legged, four-winged snake written 肥𧔥",
    habitat: "渾夕之山 in the north, 英山 and 太華之山 in the west",
    omen: "見則其國大旱 and 見則天下大旱 — the nation goes dry, or the world does",
    use: "食之已癘，可以殺蟲 — the bird cures pestilence and kills vermin",
    cites: ["feiyi.snake", "feiyi.bird", "feiyi.feiwei"],
    verified: true,
    note: "One name over a snake, a bird and a third thing, with contradictory omens and a use belonging to only one of them. 郭璞 notices and writes 疑是同名, a suspicion rather than a ruling. The worst case in the book, and the anchor of week 9.",
  },
  {
    name: "精卫",
    nameTrad: "精衛",
    pinyin: "jīngwèi",
    binomial: "Jingwei lithophorum",
    kind: "鳥",
    form: "like a crow, patterned head, white bill, red feet",
    habitat: "發鳩之山, on the third northern route",
    cites: ["jingwei"],
    verified: true,
    note: "Described as a bird and explained as a drowned girl. The record holds a diagnosis and a biography, and the entry form has a slot for only one of them.",
  },
  {
    name: "夫诸",
    nameTrad: "夫諸",
    pinyin: "fūzhū",
    binomial: "Fuzhu quadricornutum",
    kind: "獸",
    form: "like a white deer with four horns",
    habitat: "敖岸之山, first mountain of the 萯山 route",
    omen: "見則其邑大水 — where it appears, that town floods",
    cites: ["fuzhu"],
    verified: true,
    note: "Three clauses and nothing else. The shortest complete record here, which is why a reconstruction of it is so visibly a reconstruction.",
  },
  {
    name: "軨軨",
    nameTrad: "軨軨",
    pinyin: "línglíng",
    binomial: "Lingling tigrinotatum",
    kind: "獸",
    form: "like an ox with tiger markings, its voice a groan; it calls its own name",
    habitat: "空桑之山, on the second eastern route",
    omen: "見則天下大水 — where it appears, the world floods",
    cites: ["lingling"],
    verified: true,
    note: "Its omen is the flood counterpart of 顒's drought, in the same words. The formula has two settings and neither depends on the animal.",
  },
  {
    name: "讙头",
    nameTrad: "讙頭",
    pinyin: "huāntóu",
    binomial: "Huantou rostratum",
    form: "human-faced, winged and beaked; it fishes, and it walks leaning on its wings",
    habitat: "讙頭國 in the outer south; and the great wilds of the south, spelled 驩頭",
    cites: ["huantou.a", "huantou.b"],
    verified: true,
    note: "A country in one record and a creature in the other, under two spellings of one name. No field in the entry can hold a thing which is also a people.",
  },
  {
    name: "并封",
    nameTrad: "并封",
    pinyin: "bìngfēng",
    binomial: "Bingfeng bicipitum",
    form: "like a pig, black, with a head at each end",
    habitat: "east of 巫咸 in the outer west; and the great wilds of the west, named 屏蓬",
    cites: ["bingfeng.a", "bingfeng.b"],
    verified: true,
    note: "The second record gives the same symmetry a different name and drops the pig. Two names for one animal, or two animals sharing a trick.",
  },
  {
    name: "烛阴",
    nameTrad: "燭陰",
    pinyin: "zhúyīn",
    binomial: "Zhuyin diurnale",
    kind: "神",
    form: "human-faced, snake-bodied, red, a thousand 里 long; its eyes open are day and closed are night, its breath out is winter and in is summer",
    habitat: "below 鍾山, in the outer north",
    cites: ["zhuyin"],
    verified: true,
    note: "Its form field would have to hold the seasons. Nothing in the record is a measurement, and it is still the most precisely specified creature in the book.",
  },
  {
    name: "相柳",
    nameTrad: "相柳",
    pinyin: "xiāngliǔ",
    binomial: "Xiangliu novemcipitum",
    form: "nine heads with human faces, a snake's body, green; it eats from nine lands",
    habitat: "the outer north; and the great wilds of the north, named 相繇, minister to 共工",
    cites: ["xiangliu.a", "xiangliu.b"],
    verified: true,
    note: "Neither record says what kind of thing it is. The two differ by one character in the name and by everything in the framing.",
  },
  {
    name: "窫窳",
    nameTrad: "窫窳",
    pinyin: "yàyǔ",
    binomial: "Yayu dracocephalum",
    form: "dragon-headed and like a 貙 in one record; snake-bodied with a human face in the other",
    habitat: "in the 弱水, west of 狌狌; and the inner west, where it is a thing that was killed",
    cites: ["yayu.a", "yayu.b"],
    verified: true,
    note: "Two records that cannot both describe one body. A taxonomy has to pick one, and neither record supplies a reason to prefer it.",
  },
  {
    name: "开明兽",
    nameTrad: "開明獸",
    pinyin: "kāimíngshòu",
    binomial: "Kaiming vigilans",
    form: "body largely a tiger's, with nine heads, every one of them human-faced",
    habitat: "standing east-facing on 昆侖, in the inner west",
    cites: ["kaiming"],
    verified: true,
    note: "Shares a mountain and most of a body with 陸吾, and is a 獸 by its own name where 陸吾 is a 神. The difference is the job, not the anatomy.",
  },
  {
    name: "驺吾",
    nameTrad: "騶吾",
    pinyin: "zōuwú",
    binomial: "Zouwu quinquecolorum",
    kind: "獸",
    form: "the size of a tiger, bearing all five colours, its tail longer than its body",
    habitat: "林氏國, in the inner north",
    use: "乘之日行千里 — ride it a thousand 里 in a day",
    cites: ["zouwu"],
    verified: true,
    note: "Called a 珍獸, a treasure-beast, which is a value and not a kind. The only entry whose most specific classification is a price.",
  },
  {
    name: "陵鱼",
    nameTrad: "陵魚",
    pinyin: "língyú",
    binomial: "Lingyu manipedatum",
    form: "human-faced, with hands and feet, and a fish's body",
    habitat: "在海中 — in the sea, and the record says no more",
    cites: ["lingyu.b"],
    verified: true,
    note: "A habitat that cannot be mapped. The same line stands in 海內北經 only inside 袁珂's note arguing nine passages were misfiled, so even the chapter is contested.",
  },
  {
    name: "夔",
    nameTrad: "夔",
    pinyin: "kuí",
    binomial: "Kui unipedatum",
    kind: "獸",
    form: "like an ox, grey-bodied, hornless, one-footed; its light is the sun and moon, its voice is thunder, and going in and out of water it brings wind and rain",
    habitat: "a mountain in the great wilds of the east",
    cites: ["kui"],
    verified: true,
    note: "One foot, as 畢方 has one foot, with nothing else in common. The epithet repeats across genera, which is ordinary Linnaean practice and worth saying out loud once.",
  },
  {
    name: "天吴",
    nameTrad: "天吳",
    pinyin: "tiānwú",
    binomial: "Tianwu octocipitum",
    kind: "神",
    form: "eight heads with human faces; eight feet and eight tails on a blue-yellow back in one record, a tiger's body and ten tails in the other",
    habitat: "the outer east, and the great wilds of the east",
    cites: ["tianwu.a", "tianwu.b"],
    verified: true,
    note: "A 獸 in the first record and a 神人 in the second, with the tail count changing between them. Eight heads is the only character that survives both.",
  },
].map((entry) => creatureSchema.parse(entry));

/** Look a creature up by the name the course prints. */
export function creature(name: string): Creature | undefined {
  return bestiary.find((entry) => entry.name === name);
}

/** The records behind a creature, resolved from `citations.ts`. */
export function recordsOf(entry: Creature) {
  return entry.cites.map((key) => citations[key]);
}

/** Every 卷 the bestiary cites. */
export function citedChapters(): string[] {
  const seen = new Set<string>();
  for (const entry of bestiary) {
    for (const record of recordsOf(entry)) seen.add(record.chapter);
  }
  return [...seen];
}

/** Any citation whose chapter or 次 section does not exist in the received text. */
export function citationProblems(): string[] {
  const problems: string[] = [];
  for (const entry of bestiary) {
    for (const record of recordsOf(entry)) {
      if (!isChapter(record.chapter)) {
        problems.push(`${entry.name}: ${record.chapter} is not one of the eighteen 卷`);
        continue;
      }
      const sections = sectionsOf(record.chapter as Chapter);
      if (sections.length > 0 && !sections.includes(record.section ?? "")) {
        problems.push(
          `${entry.name}: ${record.section ?? "(none)"} is not a section of ${record.chapter}`,
        );
      }
      if (sections.length === 0 && record.section) {
        problems.push(`${entry.name}: ${record.chapter} carries no 次 sections`);
      }
    }
  }
  return problems;
}
