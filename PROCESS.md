# Process overview

## What I built

**SLOP6608 — Cryptotaxonomy: A Linnaean System for the Shanhaijing.** Twelve
weeks that teach building a classification system for material nobody has handed
you one for, with the 山海经 as the training set. Its answer to its own question
is *partly, and the failures are more interesting than the successes*.

## What I decided a good course is

**One rule per week, tested against cases the rule was not written for.** My
first design was one *specimen* per week. I threw it out before writing any week
content, because twelve weeks of one animal each is a bestiary and not a course.
Every week states one rule and names at least three creatures, and creatures
recur on the wager that the same record under a different rule looks different.

Then I threw out something larger. The course had been *about the 山海经*, with a
lecture page and a session page every week — twenty-four pages that had to agree
with each other, which is a maintenance problem pretending to be curriculum. The
subject became the transferable skill and the text became the training set
([`4a34ffc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/4a34ffc),
[`4a11953`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/4a11953)).
Twelve pages, one spine each. The third phase was renamed from `break` to
`rebuild`, because a course that ends in demolition has not taught anything.

## Never invent the source, enforced by shape

My first version of this was an instruction in `CLAUDE.md`, which is the kind of
rule an agent keeps until it is inconvenient. So I made it structural: quoted
lines live in a **generated** module sliced from the 四庫全書 text, and
`bestiary.ts` references them by key. No field accepts a line of 山海经, so a
plausible quotation cannot be written into the repo at all.

That produced the content rather than restricting it. Reading the edition rather
than my memory of it found 九尾狐 **is never named in the text**, now week 7's
rule, and caught week 5 quoting a line belonging to other creatures: 見則天下大旱
attaches to 顒 and five others, not to 畢方, whose omen is fire. The correction
became that week's rule, and because it rested on records a reader could not
check, I sliced them and made a check count them
([`2cc2eaa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/2cc2eaa)).

## How I knew the checks were right

A check that has only ever been green is one I have not tested. I mutation-tested
each — an invented chapter, a 次 section moved to the wrong 卷, a quoted line with
the creature's name deleted — and caught one that was green for the wrong reason,
having grepped HTML for a selector Astro had extracted into a bundle. Contrast is
where a green build lies: `pnpm build` runs axe on an unlaid-out DOM and skips
it, and in Chrome the brand amber measures **3.43:1**, which passes as large text
and fails as normal
([`2556c62`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/2556c62)).

## What the checks do not cover

The last night was spent attacking the course's premise rather than extending it,
and the harness's own rule — measure, do not assert — decided it. Asked whether a
system that fails on most records is a system, I counted: 其狀如 appears in 21 of
45 cited lines, and text-supplied fields run 20% to 76% complete. I then claimed
`form` and `habitat` were complete only because the course wrote them, which would
make the course guilty of what it accuses others of. Reading the values disproved
me. They render the record, and 陵鱼's is `在海中 — in the sea, and the record says
no more`: the field declares its own gap, which is what week 12 asks of students.
The invented field is `binomial`, and every page printing one says so.

Reading the nine unrevised weeks then found defects no check sees: a week quoting
no source line at all, frontmatter naming creatures its prose never mentions, week
references running one number low from week 8 onward. `spec/course.test.ts`
verifies a week names three creatures the bestiary holds, never that its prose
mentions them. The missing checks are specified in `PLAN.md` and deliberately not
added
([`29c0e6b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/29c0e6b)):
they would go red on arrival, and a red check is not a contract until the thing it
protects is true.
