# Process overview

## What I built

**SLOP6608 — Cryptotaxonomy: A Linnaean System for the Shanhaijing.** Twelve
weeks on one question: can the creatures of the 山海经 be classified? The site's
answer is *partly, and the failures are more interesting than the successes*.
Twenty-five creatures across all eighteen chapters, five assessments, one deck.

## What I decided a good course is

**One rule per week, tested against cases the rule was not written for.** My
first design was one *specimen* per week. I threw it out before writing any week
content, because twelve weeks of one animal each is a bestiary and not a course.
Every week now states one rule and names at least three creatures. Creatures
recur: 九尾狐 carries five weeks, on the wager that the same record under a
different rule looks different.

I encoded three of those calls rather than describing them
([`58df262`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/58df262),
[`b16ab86`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/b16ab86)):
`rule` is one string in the schema, because a week with two rules is two weeks;
three creatures minimum, because two can always be chosen to agree; and no orphan
creatures. I left out any check on whether a week is *interesting*: that is the
marker's call, and a test claiming it would be lying.

## Never invent the source, enforced by shape

My first version of this was an instruction in `CLAUDE.md`, which is the kind of
rule an agent keeps until it is inconvenient. So I made it structural: quoted
lines live in a **generated** module sliced out of the 四庫全書 text, and
`bestiary.ts` references them by key. No field anywhere accepts a line of
山海经, so a plausible quotation cannot be written into the repo at all.

> Never invent a quoted line and never invent a chapter. If you cannot find the
> line, set `verified: false` and stop.

That produced the content rather than restricting it. Reading the edition rather
than my memory of it found that 九尾狐 **is never named in the text**, now week
8's rule, and that 肥遺 is one name over a snake, a bird and a third thing. It
also caught two week titles quoting lines belonging to other creatures: 見則天下
大旱 attaches to 顒 and five others, not to 畢方, whose omen is fire. That became
week 5's rule, and because the claim rested on four records a reader could not
check, I sliced those four from the edition and made a check count them
([`2cc2eaa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/2cc2eaa)).

## How I knew the checks were right

A check that has only ever been green is one I have not tested. I mutation-tested
each: an invented chapter, a 次 section moved to the wrong 卷, a quoted line with
the creature's name deleted, a phase changed in `CLAUDE.md`. Each failed as it
should. The same habit caught a check that was green for the wrong reason, having
grepped HTML for a selector Astro had extracted into a linked bundle; fixed, it
immediately failed two pages I had missed.

Contrast is where a green build lies: `pnpm build` runs axe on an unlaid-out DOM
and skips it. In Chrome I found `opacity` on text multiplying against a token
that already carries alpha, and the brand amber at **3.43:1** on the page
background, which passes as large text and fails as normal, so the theme's own
shrunken "Related" heading fails on every content page. Both ratios are written
beside the values, never in a commit message
([`2556c62`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/2556c62)).

## What I suspended

`CLAUDE.md` required writing one week, stopping, and waiting for review, because
a pass that writes twelve weeks writes twelve versions of the same week. The
author suspended it to build in one pass. It is marked **suspended** rather than
deleted, because the risk is real and the review list is what pays for it. Full
run:
[`aa2ba15...2556c62`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/compare/aa2ba15...2556c62).
