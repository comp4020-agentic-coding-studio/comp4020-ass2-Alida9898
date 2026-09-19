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

