---
title: Where classification fails
description:
  The week the system breaks. One name over three animals, one animal under two
  names, and an entry form with a single slot for either.
week: 8
date: 2027-04-26
teachers:
  - idris-fenn
rule: "One name takes many creatures and one creature takes many names, and no field in the entry can hold either fact."
creatures:
  - 肥遗
  - 讙
  - 窫窳
  - 并封
  - 相柳
  - 旋龟
  - 天吴
spec:
  - you can state the two failures separately, and say which of your own fields
    each one attacks
  - you have located all three 肥遗 records and can say which chapter each sits in
  - you can say why adding a synonyms field does not solve the second failure
related:
  - lectures/week-08
---

Every week since week 2 has assumed that a record's name identifies a creature.
Seven records break the assumption, and they break it in two directions at
once. A name can take more creatures than one. A creature can take more names
than one. The entry form has a single `name` field, and it cannot hold either
fact.

## 肥遗, three times

肥遗 (féiyí) is the worst case in the book. In 北山經 it is a snake:

> 有蛇一首兩身，名曰肥遺，見則其國大旱。

In 西山經 it is a bird, quail-shaped, yellow-bodied with a red bill, and it
cures pestilence and kills vermin. Also in 西山經, at 太華之山, it is a snake
again, but a different one, and the name is written with a different second
character:

> 有蛇焉，名曰肥𧔥，六足四翼，見則天下大旱。

Lay the three side by side. One snake has two bodies and no legs; the other has
six legs and four wings. One omen is national, 其國大旱, and the other is
total, 天下大旱. The bird has neither omen and is the only one of the three
with a use.

郭璞 (Guō Pú) saw this and wrote 疑是同名 — a suspicion that the name is merely
shared. Not a ruling. The oldest commentator on the text reached for the same
escape hatch we are about to reach for, and declined to close it.

## 窫窳, two bodies

窫窳 (yàyǔ) fails more quietly. 海內南經 puts it in the 弱水 with a dragon's
head, shaped like a 貙, eating people. 海內西經 makes it snake-bodied and
human-faced and already dead, killed by the servant of 貳負. Neither record is
defective. They simply cannot be the same body.

A taxonomy has to pick one, and nothing in either record supplies a reason to
prefer it. 旋龟 (xuánguī) does the same on a smaller scale — viper-tailed at
杻陽之山, turtle-tailed at 密山 — and 天吴 (tiānwú) does it across the boundary
week 7 spent two hours on: a 獸 with eight tails in 海外東經, a 神人 with ten in
大荒東經. Eight heads is the only character that survives both.

## Names that multiply

The second direction is cheaper to see and harder to fix. 并封 (bìngfēng) is a
black pig with a head at each end in 海外西經; in 大荒西經 the same symmetry is
named 屏蓬 and the pig is gone. 相柳 (xiāngliǔ) is nine human-faced heads on a
green snake's body in 海外北經 and 相繇, minister to 共工, in 大荒北經.

讙 (huān) shows why this is not a spelling problem. The character names a
one-eyed, three-tailed wildcat at 翼望之山, and it also names two mountains and
a country elsewhere in the text, with a namesake mountain in 中次十一經. Four
referents. The text notices no collision because the text is not indexing by
name.

## What actually breaks

Adding a `synonyms` field looks like the fix and is not. A synonym list asserts
that two names denote one thing, which is the conclusion under dispute, and it
records it as data. The same goes for splitting 肥遗 into three species: that
asserts the names are unrelated, which 郭璞 would not assert.

Two hours. The first hour tables the seven records and sorts them into the two
failures, which is harder than it sounds because 旋龟 can be argued into
either. The second hour is spent trying to design a field that holds a
suspicion. Nobody has succeeded in this session yet.

## What leaves the room

You leave with the field you could not design, written down as a paragraph
naming what it would have to do. Week 10 looks at two other bestiaries that
never had this problem, because they never claimed a name picked out a kind.
