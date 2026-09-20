# slop-ext-b.woff2

肥𧔥 里的 𧔥 是 U+27525，在 BMP 之外，本机扫过的系统字体没有一个有它，
所以页面上是个豆腐块。第 8 周的论证恰恰是"这个名字第二个字写法不同"，
方框正好出现在唯一要紧的地方。

One glyph: U+27525, the 𧔥 of 肥𧔥. It is outside the Basic Multilingual
Plane, no font on a stock macOS install carries it, and it rendered as a tofu
box — in week 8, whose argument is precisely that the second character of the
name is written differently. The box appeared at the only place it mattered.

Covering CJK Extension B needs a 19 MB font. Covering *this character* needs
4.9 KB, so the file here is a one-glyph subset, built with:

    fontTools.subset --unicodes=U+27525 --flavor=woff2

from **Plangothic P1 v2.9.5795**, © 2024 Fitzgerald P. Köeingsegg, licensed
under the SIL Open Font License 1.1 (`OFL.txt` beside this file).
<https://github.com/Fitzgerald-Porthmouth-Koenigsegg/Plangothic_Project>

The subset is a Modified Version under the OFL. Plangothic is the author's
trademark, so the family is renamed to `SLOP Ext B` rather than shipped under
a name the upstream author is responsible for.

`src/styles/site.css` loads it with `unicode-range: U+27525`, so a browser
fetches these 4.9 KB only on a page that actually prints the character.
