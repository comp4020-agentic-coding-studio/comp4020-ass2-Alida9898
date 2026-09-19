// 我们自己的译文。跟 citations.ts 分开放，因为那个文件是从底本机器切出来的，
// 一个字都不许改；译文是这门课加上去的东西，必须看得出是加上去的。
//
// This course's own translations, keyed by citation key.
//
// They live apart from `citations.ts` on purpose. That file is machine-sliced
// from the edition and may not be hand-edited; this one is entirely hand-written
// and is the course speaking, not the text. Keeping them in separate modules is
// the same distinction the course teaches: what the source says, and what we
// added. A page that prints a gloss says whose it is.
//
// 没有译文就不显示译文。不写"暂缺"，也不用机翻凑数。
// A key with no gloss renders no gloss. Not a placeholder, not a machine
// translation: the same rule as an unfound citation, which claims nothing.
// `spec/course.test.ts` checks a gloss never exists for a key that does not.

export const glosses: Record<string, string> = {
  "xingxing.a":
    "There is a beast there, shaped like an ape but with white ears. It goes on all fours and it runs like a person. It is called 狌狌. Eat it and you will run well.",
  "xingxing.b":
    "狌狌 knows people's names. As a beast it is like a pig with a human face. It lives west of Shun's burial place.",
  "xingxing.c": "There is a green beast with a human face, called 猩猩.",
  lushu:
    "There is a beast there, shaped like a horse with a white head, marked like a tiger, with a red tail, and its cry is like singing. It is called 鹿蜀. Wear it and your descendants will prosper.",
  boshi:
    "There is a beast there, shaped like a sheep, with nine tails and four ears, and its eyes on its back. It is called 猼訑. Wear it and you will not be afraid.",
  jiuweihu:
    "There is a beast there, shaped like a fox but with nine tails, and its cry is like an infant's. It can eat people. Eat it and you will not be harmed by 蠱, poisoning by witchcraft.",
  fuzhu:
    "There is a beast there, shaped like a white deer with four horns. It is called 夫諸. Where it appears, that town floods.",
  lingling:
    "There is a beast there, shaped like an ox with tiger markings, its cry like a groan. It is called 軨軨, it calls its own name, and where it appears, there are floods.",
  gudiao:
    "In the water there is a beast called 蠱雕, shaped like an eagle but with horns, its cry like an infant's. It eats people.",
  luwu:
    "The god 陸吾 administers it. This god is shaped with a tiger's body and nine tails, a human face and a tiger's claws. This god administers the nine regions of heaven and the seasons of the god's park.",
  kaiming:
    "開明獸's body is largely a tiger's, with nine heads, every one of them human-faced. It stands facing east on top of 昆侖.",
  "tianwu.a":
    "As a beast it has eight heads with human faces, eight feet and eight tails, and a blue-yellow back.",
  "tianwu.b":
    "There is a god-person with eight heads and human faces, a tiger's body and ten tails. It is called 天吳.",
  dijiang:
    "There is a god there, shaped like a yellow sack, red as cinnabar fire, with six feet and four wings, a shapeless blur with no face. It knows song and dance. This is 帝江.",
};

/** The course's translation of a cited line, or undefined if we have not made one. */
export function glossFor(key: string): string | undefined {
  return glosses[key];
}
