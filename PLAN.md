# Where this stands, 2026-09-19 evening

Assignment 2 is due **noon Monday 21 September 2026**. The author deploys on
Sunday with the course's `/ship` skill; the agent does not touch deployment.

| | |
|---|---|
| `pnpm check` | green: 27 pages, 19 tests, 0 type errors, 0 axe violations, 0 broken links |
| commits | 22, local only, none pushed |
| repo | **private**, Pages not enabled, no live URL |
| marking | process 45%, deployed artefact 20%, response to brief 35% |

## Done

**The curriculum pivoted.** The course now teaches building a classification
system for any material, with the 山海经 as the training set. Twelve weeks
regenerated from `src/lib/weeks.ts`; CLAUDE.md's week list is generated from it,
never retyped, because `spec/course.test.ts` parses that list and compares every
rule word for word. Third phase renamed `break` to `rebuild`.

**One page per week.** The lecture pages are gone: the brief never asked for
them, and twenty-four pages that had to agree became twelve. Nav and home page
updated, `lectures` dropped from `graphCollections`.

**Every week has the same spine**, recorded in CLAUDE.md: `## Why this week
exists` (identical in all twelve), two to four working sections, `## What you
leave with`. Warnings go in `<Caution>` boxes, never in headings. No timetables.

**Weeks 1 and 2 are written to that shape.** Week 1 introduces the book before
teaching the method. Specimen cards appear where their examples are introduced,
not collected at the foot of the page; the route used to print all of a week's
creatures at the bottom and no longer does.

**Week 2's rule was wrong and the data said so.** It claimed every record follows
其状如X，Y首，见则Z. Counting: 21 of 45 base-text lines carry the comparison, 11
the omen, 13 two of three. The rule now says the formula is a template the text
often leaves incomplete. Four counts pinned by a check, mutation-tested.

**Translations** live in `src/lib/glosses.ts`, keyed by citation key, hand
written and separate from the generated `citations.ts`. A key with no gloss
renders none.

**A contents rail** on week pages: fixed in the left margin from 1024px, a row of
links at the top below that. Week pages run a 34rem column. Verified for overlap
at five widths.

**Home page** rewritten to the skill, four stray specimen cards removed, the
retired phrase "primary specimen" gone.

**CLAUDE.md gained a plain-speech rule** with the author's actual complaints
quoted as the banned examples, pointing at Calling Bullshit as the register.

## Left, in the order it is worth doing

1. **`PROCESS.md`.** 632 words against a 400 to 600 band, and it does not mention
   the pivot at all. This is the single biggest hole: process is 45%, the brief
   requires this narrative to have a spine (what you decided a good course looks
   like, what you encoded in the harness, what you left out), and every claim
   needs a commit citation. `pnpm check:evidence` fails without citations.
2. **Weeks 3 to 12.** Frontmatter, rules, creature lists and file names are all
   correct. The prose is still written for the old curriculum. Weeks 6 to 9 read
   correctly because their files were moved rather than rewritten; weeks 10 and
   11 are new and thin; weeks 3, 4, 5 and 12 need the new spine.
3. **Week 3's deck.** Survives the pivot, still morphology. Never opened at
   either viewport, and the build only checks its syntax.
4. **Assessments.** Still five, summing to 100, but the final has not been
   rewritten as "design a classification system for unseen material". Proposed
   weights are in the table below and are not yet applied.
5. **The visual pass.** Deliberately last. Not a marking criterion.

## Assessment, proposed and not yet applied

Specimen cards 20, Bestiary entry 30 → 25, Peer review 10, Reclassification essay
15, System proposal 25 → 30 renamed to Classification design.

## Decisions already taken, do not reopen

- Drift stays inside the 山海经. There is no apparatus for 搜神記 or 聊齋 and the
  rule is that an unfindable line claims nothing. 九尾狐 is described and never
  named, which is drift and is citable today.
- Rhetorical questions are allowed, Calling Bullshit style.
- Review runs one week at a time.
- At least three creatures per week, all 25 used, no orphans.
- The deck belongs to week 3 only.

## Must not drift

- Quoted lines come only from `src/lib/citations.ts`, which is generated.
  Translations go in `glosses.ts`. An unfound line claims nothing.
- No push, no visibility flip, no Pages, until the author does it.

# Open decisions — curriculum pivot, 2026-09-19

Supersedes the 2026-09-17 pause note, which is folded in below rather than
dropped: three of its four open questions are still open, and the fourth turned
out to be the reason for this pivot.

This file holds what is **decided**, what is **open**, and what must not drift
while the open questions are settled. `PROCESS.md` records what happened; this
records what has not happened yet.

## Where it stands

| | |
|---|---|
| `pnpm check` | green: 39 pages, 18 tests, 0 type errors, no broken links |
| `pnpm check:evidence` | passes |
| axe in Chrome, 1920x1080 and 390x844 | 0 violations on 7 sampled pages, no overflow at 390 |
| commits | 16, local only |
| repo visibility | **private**. Not pushed, Pages not enabled, no live URL |

Deploying is still held. It flips the repo permanently public, the author has not
finished reviewing, and nothing about it is reversible.


---

# The week-page skeleton, all twelve — 2026-09-20

Week 3 was rewritten to this shape and reviewed. Weeks 1 and 2 are written to
the old opener. Weeks 4 to 12 are still the pre-pivot prose. This section is the
agreed target so the remaining eleven can be done without re-deciding the shape
each time.

## What repeats, and what does not

**`## What this week does`** opens every week, and is the only heading all
twelve share. It replaces `## Why this week exists`. One sentence connecting to
the previous week, one stating this week's job, then a list of what is coming,
each item naming its own creature and what that creature is there to do. A
closing line says which section is not an example.

**`## What you leave with`** closes every week. Unchanged.

**The middle varies, because the arguments do.** Three shapes are in use:

| shape | numbering | weeks |
|---|---|---|
| worked examples | `Example N: <plain claim>` | 3, 4, 5, 8, 12 |
| sequential method | `Step N: <plain claim>` | 2, 11 |
| exposition or comparison | no numbering, plain headings | 1, 6, 7, 9 |

Forcing one shape on all twelve would make the numbering lie about weeks whose
sections are not parallel cases. Week 1's four sections are material, method,
counter-example and the text's own system — numbering those implies a sequence
that is not there.

**One section works one creature**, except where the argument *is* the
comparison: week 3's 陆吾/开明兽 and week 5's 顒/肥遗 each need their pair in one
section, because the finding is that the two records agree. The frontmatter
still names at least three creatures per week, which CLAUDE.md requires and
`spec/course.test.ts` enforces.

**No heading is a riddle.** A heading says what its section contains. This is
already CLAUDE.md's rule and week 3 was written against it, which is why the
rule now has a worked example attached to it.

## Per week

**1 · What a classification system is** — exposition, no numbering.
`What this week does` / `What the 山海经 is` / `How Linnaeus classified` /
`Borges' fake Chinese encyclopedia` / `What the book already sorts by` /
`What you leave with`. Headings already plain; only the opener changes.

**2 · Reading the source text** — method.
`What this week does` / `Step 1: candidates come from repetition` /
`Step 2: three tests a candidate has to survive` /
`Step 3: ruling a record into the columns` / `Count before you trust it` /
`Missing is not zero` / `What you leave with`. The last two are not steps —
they are the week checking its own candidate — so they are not numbered.

**3 · Morphological classification** — done, 2026-09-20.

**4 · Geographic classification** — examples. Three kinds of locus claim.
`Example 1: a mountain you can draw` 夫诸 /
`Example 2: a sea that locates nothing` 陵鱼 /
`Example 3: a neighbour rather than a place` 讙头 /
`What the habitat field is holding` (驺吾 lands here) / `What you leave with`.

**5 · Omens and uses** — examples.
`Example 1: one sentence on two unrelated creatures` 顒 and 肥遗, the pair the
finding needs / `Example 2: the grid the omens do fill` (scope × event) /
`Example 3: the omen no other record carries` 毕方 /
`Why a use is not a character either` / `What you leave with`.

**6 · The god and the beast** — comparison, no numbering.
`陆吾 and 开明兽: one mountain, two files` /
`神 is an office, not a rank` 烛阴, 帝江 /
`The records that name no kind` 窫窳 / `What you leave with`.

**7 · Drift** — one dominant case, no numbering.
`The record that names no beast` 九尾狐 /
`What the name picked up after the record closed` /
`The same drift inside the edition` 狌狌 /
`Drift that reuses what the record held` 精卫 / `What you leave with`.

**8 · One name, many creatures** — examples, two failure classes.
`Example 1: one name, three creatures` 肥遗 /
`Example 2: one creature, two bodies` 窫窳 /
`Example 3: names that multiply` 并封, 相柳 /
`Why both obvious fixes beg the question` / `What you leave with`.

**9 · Other systems** — comparison, no numbering.
`Two systems that never needed a species concept` /
`珍獸 is a price, not a kind` / `What 其状如 was always doing` /
`What you leave with`.

**10 · Cross-system comparison** — **not a reframing job. See the defects
below.**

**11 · Beyond the 山海经** — method.
`Step 1: three clauses, six undetermined decisions` 夫诸 /
`Step 2: where comparison runs out` 夔 /
`Step 3: drawing an absence` 帝江 /
`When the audit stops working` 九尾狐 / `What you leave with`.

**12 · The taxonomic congress** — examples.
`Example 1: nine tails on three unrelated creatures` /
`Example 2: two records that will not resolve` 窫窳 /
`Example 3: an entry form in the wrong order` 蛊雕 /
`The rule the congress runs on` / `What you leave with`.

## Logistics headings to delete, with their lines

CLAUDE.md: timetables are not curriculum and do not appear. Twenty-one lines
across nine files, in eight different naming conventions, which is itself the
evidence they were never a designed part of the page:

`04:75 In the room` · `04:84 Out of the room` · `05:82 Shape of the session` ·
`05:91 After` · `06:82 The midterm dispute` · `07:73 Two hours, worked
backwards` · `07:82 Afterwards` · `09:87 The essay` · `10:59 In the room` ·
`10:69 Hand in` · `11:74 The workshop` · `11:86 The card this week` ·
`12:75 How the congress runs` · `12:88 Marks`

Weeks 8 and 9 have no logistics heading: the timing is buried in the tail of a
teaching section (`08:87`, `09:82`) and comes out with it.

**Assessment weights are stated inside several of these sections** (25 per cent
in week 6, 15 in week 9, 20 in week 11, 30 and 10 in week 12). They belong on
the assessment pages. Check each against `src/content/assessments/` before
deleting, and do not let a weight exist in two places.

## Defects found reading weeks 4 to 12, 2026-09-20

Verified, not reported. Ordered by what a reader sees.

1. ~~Weeks 6 and 9 printed a stranded frontmatter list item as the first line of
   the body.~~ Fixed, commit `23628d2`.

2. **Week 10 is not written.** 530 words against a 640 to 780 band for the rest.
   It is the only one of the nine that quotes **no** line of 山海經 — every other
   week carries one or two. Its examples are one-sentence bullets that restate
   findings sourced to other weeks. Reframing its headings would make an empty
   page look finished, which is worse than leaving it obviously unfinished.
   It needs writing, not a spine.

3. **Week 11's frontmatter names four creatures the body never mentions.**
   Listed: 狌狌, 旋龟, 窫窳, 陵鱼 — zero occurrences each. Discussed: 夫诸, 夔,
   帝江, 九尾狐 — none listed. `weeks.ts` and CLAUDE.md's week list carry the
   wrong four, so fixing this touches the contract, not just the page.

4. **Week 5 has the same fault, smaller.** 旋龟 and 猼訑 are listed and absent;
   夫诸 is discussed and unlisted.

5. **Week 10 contradicts week 9 in print.** `10:25` says last week looked at
   three systems including "the modern database". Week 9 presents two and never
   mentions a database.

6. **Week references run one low from week 8 onward.** `08` calls week 9 "week
   10"; `09` calls week 8 "week 9" and week 7 "week 8"; `11` calls week 7 "week
   8"; `12` calls week 8 "week 9". Weeks 4 to 7 and 10 are correct. The drift
   starts exactly where the late-written material starts.

**`spec/course.test.ts` catches none of 3 to 6.** It checks that a week names at
least three creatures, that they are not repeated, that the bestiary holds them,
and that no bestiary creature is unused. It never checks that a creature a week
names appears in that week's prose, and it never checks that a week's reference
to another week points at the right one. Both are cheap to add and both would
have gone red today.
