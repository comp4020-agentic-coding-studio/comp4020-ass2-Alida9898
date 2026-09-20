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
// 每一条引文都要有译文。不写"暂缺"，也不用机翻凑数——要么真翻，要么这条引文
// 就不该引。
//
// Every citation carries a gloss. Thirty of forty-six did not until
// 2026-09-21, which meant thirty specimen cards printed a line of Chinese and
// nothing else and asked the reader to take the argument on trust.
//
// This is not a licence to fill the gap with a placeholder or a machine
// translation. A line nobody can translate is a line nobody should be quoting,
// so the rule bites on the citation rather than on the gloss.
//
// `spec/course.test.ts` checks all three halves of that: every citation has a
// gloss, every gloss has a citation, and no gloss is the Chinese over again.

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
    "There is a beast there, shaped like an ox with tiger markings, its cry like a groan. It is called 軨軨, it calls its own name, and where it appears, the world floods.",
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
  kui:
    "On it there is a beast, shaped like an ox, grey-bodied and hornless, with one foot. Going in and out of the water it always brings wind and rain. Its light is like the sun and the moon, its voice like thunder. It is called 夔.",
  zouwu:
    "In 林氏國 there is a treasure-beast, as big as a tiger, bearing all five colours, its tail longer than its body. It is called 騶吾. Ride it a thousand 里 in a day.",

  // 下面这批是一次补齐的，按 citations.ts 的字母序排，方便对照哪条还缺。
  // 上面那十六条是按用到的先后加的，不动它们的顺序。
  //
  // Added in one pass, in `citations.ts`'s alphabetical key order so the two
  // files can be read side by side and a gap is visible. The sixteen above were
  // added as each week needed them and keep the order they were written in.
  bibi:
    "There is a beast there, shaped like a fox but with wings, and its cry is like a wild goose's. It is called 獙獙. Where it appears, the world goes dry.",
  bifang:
    "There is a bird there, shaped like a crane, with one foot, red markings on a green ground and a white bill. It is called 畢方, it calls its own name, and where it appears, that town has uncanny fires.",
  "bingfeng.a":
    "并封 is east of 巫咸. It is shaped like a pig, with a head at the front and a head at the back, and it is black.",
  "bingfeng.b": "There is a beast with a head on the left and a head on the right. It is called 屏蓬.",
  boyu:
    "In it there are many 薄魚, shaped like a 鱣魚, a sturgeon, but with one eye, and their cry is like retching. Where they appear, the world goes dry.",
  "feiyi.bird":
    "There is a bird there, shaped like a quail, yellow-bodied with a red bill. It is called 肥遺. Eat it and it cures pestilence, and it can kill 蟲, vermin.",
  "feiyi.feiwei":
    "There is a snake there. It is called 肥𧔥, and it has six feet and four wings. Where it appears, the world goes dry.",
  "feiyi.guopu":
    "In 湯's time this snake appeared below 陽山. There is also a 肥遺 snake; I suspect the name is merely shared.",
  "feiyi.snake":
    "There is a snake with one head and two bodies. It is called 肥遺. Where it appears, that state goes dry.",
  huan:
    "There is a beast there, shaped like a wildcat, with one eye and three tails. It is called 讙, and its cry is like a hundred voices at once. It wards off ill, and taken as medicine it cures 癉, fever.",
  "huantou.a":
    "讙頭國 is to the south of it. Its people have human faces, wings and birds' bills, and they are catching fish.",
  "huantou.b":
    "驩頭 has a human face and a bird's bill, and it has wings. It eats fish from the sea, and it walks propped on its wings.",
  huayu:
    "In it there are many 䱻魚, shaped like a fish but with birds' wings. Going in and out of the water they give off light, and their cry is like a mandarin duck's. Where they appear, the world goes dry.",
  jingwei:
    "There is a bird there, shaped like a crow, with a patterned head, a white bill and red feet. It is called 精衛, and it calls its own name. It is the youngest daughter of 炎帝, named 女娃. 女娃 went swimming in the eastern sea, drowned and did not return, and so became 精衛. It carries wood and stones from the western mountains in its bill, to fill in the eastern sea.",
  jiufeng:
    "There is a god, nine heads with human faces on a bird's body. It is called 九鳳.",
  "lingyu.b":
    "陵魚 has a human face, hands and feet, and a fish's body. It is in the sea.",
  mingshe:
    "In it there are many 鳴蛇, shaped like a snake but with four wings, and their sound is like a 磬, a chiming stone. Where they appear, that town goes dry.",
  "shebi.a":
    "奢比之尸 is to the north of it. It has a beast's body, a human face and large ears, and it wears two green snakes as earrings.",
  "shebi.b":
    "There is a god with a human face, a dog's ears and a beast's body, wearing two green snakes as earrings. It is called 奢比尸.",
  shuangshuang: "There are three green beasts joined side by side. They are called 雙雙.",
  "xiangliu.a":
    "相柳 has nine heads with human faces. Its body is a snake's, and green.",
  "xiangliu.b":
    "共工's minister is called 相繇. It has nine heads on a snake's body, coiled round on itself, and it feeds on the nine lands.",
  xiwangmu:
    "There is a person wearing a 勝, a headdress, with tiger's teeth and a leopard's tail, living in a cave. It is called 西王母.",
  "xuangui.a":
    "In it there are many 玄龜, shaped like a turtle but with a bird's head and a viper's tail. They are called 旋龜, and their sound is like wood splitting. Wear one and you will not go deaf, and it can be used against 底, calluses.",
  "xuangui.b":
    "In it there are many 旋龜, shaped with a bird's head and the tail of a 鼈, a soft-shelled turtle. Their sound is like wood splitting.",
  "yayu.a":
    "窫窳 has a dragon's head. It lives in the 弱水, west of 狌狌. It is shaped like a 貙, a lynx-like beast, with a dragon's head, and it eats people.",
  "yayu.b": "窫窳 has a snake's body and a human face. It was killed by 貳負's servant.",
  yu:
    "There is a bird there, shaped like an owl, with a human face, four eyes and ears. It is called 顒, it calls its own name, and where it appears, the world goes dry.",
  zhuanyu:
    "In it there are 鱄魚, shaped like a 鮒, a crucian carp, but with pig's bristles, and their cry is like a piglet's. Where they appear, the world goes dry.",
  zhuyin:
    "The god of 鍾山 is called 燭陰. When it looks, it is day; when it closes its eyes, it is night; when it blows, it is winter; when it breathes, it is summer. It does not drink, does not eat, does not breathe, for its breath would be wind. Its body is a thousand 里 long.",
};

/** The course's translation of a cited line, or undefined if we have not made one. */
export function glossFor(key: string): string | undefined {
  return glosses[key];
}
