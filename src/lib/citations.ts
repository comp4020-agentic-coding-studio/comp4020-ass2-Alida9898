// 本文件由脚本从底本切出，**不要手改**。要加引文就回底本里切，别自己敲。
//
// GENERATED, NOT WRITTEN. Every string below was sliced out of the Wikisource
// 四庫全書 text of 山海經 (郭璞注), with the interlinear notes and the editorial
// <ref> apparatus stripped and nothing else altered. It is a separate module on
// purpose: prose in `bestiary.ts` references a citation by key and has no way to
// type a line of its own, so "never invent a quoted line" is enforced by the
// shape of the code rather than by anyone remembering it.
//
// Source: https://zh.wikisource.org/wiki/山海經
// Retrieved: 2026-09-17
// Do not edit by hand. To add a line, slice it from the same edition.

export interface Citation {
  /** One of the eighteen 卷. */
  chapter: string;
  /** The 次 section. Only the five 山經 chapters are subdivided. */
  section?: string;
  /** The mountain or water the record is filed under. 山經 only. */
  locus?: string;
  /** The line, verbatim, in the edition's traditional characters. */
  line: string;
}

export const citations = {
  "bifang": { chapter: "西山經", section: "西次三經", locus: "章莪之山", line: "有鳥焉，其狀如鶴，一足，赤文青質而白喙，名曰畢方，其鳴自叫也，見則其邑有譌火。" },
  "bingfeng.a": { chapter: "海外西經", line: "并封在巫咸東，其狀如彘，前後皆有首，黑。" },
  "bingfeng.b": { chapter: "大荒西經", line: "有獸，左右有首，名曰屏蓬。" },
  "boshi": { chapter: "南山經", section: "南山經之首", locus: "基山", line: "有獸焉，其狀如羊，九尾四耳，其目在背，其名曰猼訑，佩之不畏。" },
  "dijiang": { chapter: "西山經", section: "西次三經", locus: "天山", line: "有神焉，其狀如黃囊，赤如丹火，六足四翼，渾敦無面目，是識歌舞，實為帝江也。" },
  "feiyi.bird": { chapter: "西山經", section: "西山經之首", locus: "英山", line: "有鳥焉，其狀如鶉，黃身而赤喙，其名曰肥遺，食之已癘，可以殺蟲。" },
  "feiyi.feiwei": { chapter: "西山經", section: "西山經之首", locus: "太華之山", line: "有蛇焉，名曰肥𧔥，六足四翼，見則天下大旱。" },
  "feiyi.snake": { chapter: "北山經", section: "北山經之首", locus: "渾夕之山", line: "有蛇一首兩身，名曰肥遺，見則其國大旱。" },
  "fuzhu": { chapter: "中山經", section: "中次三經", locus: "敖岸之山", line: "有獸焉，其狀如白鹿而四角，名曰夫諸，見則其邑大水。" },
  "gudiao": { chapter: "南山經", section: "南次二經", locus: "鹿吳之山", line: "水有獸焉，名曰蠱雕，其狀如雕而有角，其音如嬰兒之音，是食人。" },
  "huan": { chapter: "西山經", section: "西次三經", locus: "翼望之山", line: "有獸焉，其狀如狸，一目而三尾，名曰讙，其音如奪百聲，是可以禦凶，服之已癉。" },
  "huantou.a": { chapter: "海外南經", line: "讙頭國在其南，其為人人面有翼，鳥喙，方捕魚。" },
  "huantou.b": { chapter: "大荒南經", line: "驩頭人面鳥喙，有翼，食海中魚，杖翼而行。" },
  "jingwei": { chapter: "北山經", section: "北次三經", locus: "發鳩之山", line: "有鳥焉，其狀如烏，文首、白喙、赤足，名曰精衛，其鳴自詨。是炎帝之少女，名曰女娃，女娃游于東海，溺而不返，故為精衛，常銜西山之木石，以堙于東海。" },
  "jiufeng": { chapter: "大荒北經", line: "有神，九首人面鳥身，名曰九鳳。" },
  "jiuweihu": { chapter: "南山經", section: "南山經之首", locus: "青丘之山", line: "有獸焉，其狀如狐而九尾，其音如嬰兒，能食人；食者不蠱。" },
  "kaiming": { chapter: "海內西經", line: "開明獸身大類虎而九首，皆人面，東嚮立昆侖上。" },
  "kui": { chapter: "大荒東經", line: "其上有獸，狀如牛，蒼身而無角，一足，出入水則必風雨，其光如日月，其聲如雷，其名曰夔。" },
  "lingling": { chapter: "東山經", section: "東次二經", locus: "空桑之山", line: "有獸焉，其狀如牛而虎文，其音如欽。其名曰軨軨，其鳴自訆，見則天下大水。" },
  "lingyu.b": { chapter: "海內東經", line: "陵魚人面，手足，魚身，在海中。" },
  "lushu": { chapter: "南山經", section: "南山經之首", locus: "杻陽之山", line: "有獸焉，其狀如馬而白首，其文如虎而赤尾，其音如謠，其名曰鹿蜀，佩之宜子孫。" },
  "luwu": { chapter: "西山經", section: "西次三經", locus: "昆侖之丘", line: "神陸吾司之。其神狀虎身而九尾，人面而虎爪；是神也，司天之九部及帝之囿時。" },
  "mingshe": { chapter: "中山經", section: "中次二經", locus: "鮮山", line: "其中多鳴蛇，其狀如蛇而四翼，其音如磬，見則其邑大旱。" },
  "shebi.a": { chapter: "海外東經", line: "奢比之尸在其北，獸身、人面、大耳，珥兩青蛇。" },
  "shebi.b": { chapter: "大荒東經", line: "有神，人面、犬耳、獸身，珥兩青蛇，名曰奢比尸。" },
  "shuangshuang": { chapter: "大荒南經", line: "有三青獸相並，名曰雙雙。" },
  "tianwu.a": { chapter: "海外東經", line: "其為獸也，八首人面，八足八尾，背青黃。" },
  "tianwu.b": { chapter: "大荒東經", line: "有神人，八首人面，虎身十尾，名曰天吳。" },
  "xiangliu.a": { chapter: "海外北經", line: "相柳者，九首人面，蛇身而青。" },
  "xiangliu.b": { chapter: "大荒北經", line: "共工臣名曰相繇，九首蛇身，自環，食于九土。" },
  "xingxing.a": { chapter: "南山經", section: "南山經之首", locus: "招搖之山", line: "有獸焉，其狀如禺而白耳，伏行人走，其名曰狌狌，食之善走。" },
  "xingxing.b": { chapter: "海內南經", line: "狌狌知人名，其為獸如豕而人面，在舜葬西。" },
  "xingxing.c": { chapter: "海內經", line: "有青獸，人面，名曰猩猩。" },
  "xiwangmu": { chapter: "大荒西經", line: "有人，戴勝，虎齒，有豹尾，穴處，名曰西王母。" },
  "xuangui.a": { chapter: "南山經", section: "南山經之首", locus: "杻陽之山", line: "其中多玄龜，其狀如龜而鳥首虺尾，其名曰旋龜，其音如判木，佩之不聾，可以為底。" },
  "xuangui.b": { chapter: "中山經", section: "中次六經", locus: "密山", line: "其中多旋龜，其狀鳥首而鼈尾，其音如判木。" },
  "yayu.a": { chapter: "海內南經", line: "窫窳龍首，居弱水中，在狌狌之西，其狀如貙，龍首，食人。" },
  "yayu.b": { chapter: "海內西經", line: "窫窳者，蛇身人面，貳負臣所殺也。" },
  "yu": { chapter: "南山經", section: "南次三經", locus: "令丘之山", line: "有鳥焉，其狀如梟，人面四目而有耳，其名曰顒，其鳴自號也，見則天下大旱。" },
  "zhuyin": { chapter: "海外北經", line: "鍾山之神名曰燭陰，視為晝，瞑為夜，吹為冬，呼為夏，不飲，不食，不息，息為風，身長千里。" },
  "zouwu": { chapter: "海內北經", line: "林氏國有珍獸，大若虎，五采畢具，尾長于身，名曰騶吾，乘之日行千里。" },
} as const satisfies Record<string, Citation>;

export type CitationKey = keyof typeof citations;
