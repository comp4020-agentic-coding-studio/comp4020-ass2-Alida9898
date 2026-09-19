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

# The pivot

The course stops being an argument about whether the 山海经 can be classified and
becomes training in building classification systems. The 山海经 is the dataset you
learn on, not the subject. The exit skill: given unfamiliar material, pick
traits, build a hierarchy, and state where it fails — so that meeting something
new means reaching for the nearest tag rather than starting from nothing.

**This resolves what the pause note filed as Open 2.** That note had already
found that weeks 5 to 8 each eliminate a proposed character using a criterion
from taxonomic practice that the course never states aloud, and concluded that a
student who never sees the ruler reads twelve weeks as twelve anecdotes. The
pivot is that diagnosis acted on: the ruler becomes the subject and the book
becomes the whetstone.

Phase boundaries do not move — 1–4, 5–8, 9–12. The third phase changes name and
purpose, from BREAK to REBUILD.

## The twelve weeks, before and after

| # | now | after | change |
|---|-----|-------|--------|
| 1 | Why classify monsters | What is a classification system | keep, reframe |
| 2 | The entry as specimen | Reading the source text | keep |
| 3 | Morphology | Morphological classification | keep — **deck stays here** |
| 4 | Geography and habitat | Geographic classification | keep |
| 5 | Omens | Omens and uses | **merge 5+6** |
| 6 | Use | The god/beast boundary | was 7 |
| 7 | The 神 and the 獸 | Drift across texts | was 8 — **see Blocker A** |
| 8 | Drift | One name many creatures | was 9 |
| 9 | Where classification fails | Other systems | was 10, **split** |
| 10 | Comparative systems | Cross-system comparison | was 10, **split** |
| 11 | Modern reconstruction | Beyond the 山海经 | **replaced** |
| 12 | The taxonomic congress | Taxonomic congress | keep, reweighted |

Week 11 is the load-bearing new week: it is where the skill stops being about
this book. Without it the pivot is a rename.

Week 2 also picks up the job the pause note proposed for it — stating the
criteria before any character is extracted — and weeks 5 to 8 each name the
criterion they are applying. Under the pivot that is no longer an addition to
the course; it is the course.

## What the pivot does not touch

Enforced by schema and tests, and nothing in the brief asks to drop them, so
every rewritten week still has to satisfy:

- one rule per week, one string, its 定式
- at least three creatures per week
- all 25 bestiary creatures used at least once — no orphans
- never invent the source; quoted lines only from `citations.ts`
- the deck belongs to week 3 only

## Assessment

Current weights total 100: specimen cards 20, bestiary entry 30, peer review 10,
reclassification essay 15, system proposal 25.

| assessment | now | after | why |
|---|---|---|---|
| Specimen cards | 20 | 20 | unchanged |
| Bestiary entry | 30 | 25 | makes room for the new final |
| Peer review | 10 | 10 | unchanged |
| Reclassification essay | 15 | 15 | unchanged |
| **System proposal** → **Classification design** | 25 | **30** | becomes the final |

The final becomes: design a classification system for material you have not
seen, justify the traits you chose, build the hierarchy, and name at least one
limitation of your own system. It moves to the end of semester so that it can be
the final, and week 12's congress is where it is presented.

---

# Blockers — each needs one word

**A. Week 7 "drift across texts" has no sources.** `citations.ts` holds only the
四庫全書 山海經. Zero 搜神記, zero 聊齋 in the repo, and the rule says an
unfindable line claims nothing. Raised twice before and still unanswered.

- **A1 (recommended):** keep drift inside the 山海经. 九尾狐 is described and
  never named in the received text, so everything the name now carries was
  attached after the record closed. That is drift, it is citable today, and it
  is already the strongest case in the bestiary.
- **A2:** build a multi-source citation apparatus first — a `source` field,
  slices of 搜神記 and 聊齋 from Wikisource, checks taught about three editions.
  Separate work that has to land before week 7 can be written.

Weeks 9 and 10 are not blocked: naming a Japanese yokai catalogue or a European
bestiary in prose is not quoting one, and the current week 10 already does this.

**B. The prose register is not settled.** `src/content/lectures/week-01.md` is
rewritten as a sample in the Calling Bullshit register — second person, learning
objectives, topic fragments, no epigram at the end of every paragraph. Look at it
before I write twenty-three more. If it is wrong, it is one page thrown away
instead of twenty-four.

**C. Rhetorical questions.** Calling Bullshit opens topics with them. CLAUDE.md
bans them in body text. Keep the ban, or lift it.

**D. One week at a time.** CLAUDE.md says to restore this rule before the next
content pass, and this is that pass. Restoring it literally means twelve review
rounds. Suspending it again means one pass and one review, which is what
produced the pages the author could not read. Recommend: restore it per phase —
four reviews rather than twelve or one.

---

# Still open from the pause

## Open 1: the missing world

The site never says what the 山海经 **is** before asking a student to extract
characters from it. The data for a reference page already exists and is cited:

| | |
|---|---|
| loci with a named mountain | 17, every one in the 五藏山經 |
| loci with no locus at all | 13, every one in the 海經 or 大荒經 |

That split *is* week 4's argument, sitting in the citation data. One half can be
walked as a line; the other half is four directions with no interior.

**Proposal.** A standing reference page outside the twelve weeks, in the nav,
generated from `citations.ts` so it cannot drift. Eighteen 卷 in the edition's
order split into the two groups, the twenty-six 次 routes under the five 山經,
where each of the twenty-five creatures sits, and the fact that `habitat` holds
two different kinds of thing.

How far the drawing goes:

1. **Structure only.** Groups, routes, creatures placed. No spatial claim.
   Buildable now from committed data.
2. **Route chains.** Extract each route's mountain sequence with its stated
   bearings and distances and draw the five 山經 as polylines, against the 海經
   drawn as what it actually is. Costs a fresh extraction pass; anything not
   found stays blank rather than invented.
3. **No drawing.** Prose only.

Recommended: 2. Under the pivot this gets *more* valuable, not less — it is a
worked example of the exit skill, a classification of the source material itself
built from cited data.

## Open 2 — closed

Absorbed by the pivot. See the top of this file.

## Open 3: two specimens moved without saying so

From the author's first brief, ten specimens are still in the week they were put
in. Two are not, and both moves were the agent's:

- **陆吾** left week 4 for weeks 3 and 7. Week 4 now carries 夫诸, 陵鱼, 讙头,
  驺吾.
- **蛊雕** left week 10 for weeks 2 and 12. Week 10 now carries 驺吾, 烛阴,
  九尾狐, 夔.

The pivot re-themes weeks 6 to 11 and merges 5 with 6, so every creature list
has to be rebuilt anyway. The question that survives: does each week get one
named lead specimen, on top of the three that stress the rule, or not. The ≥3
rule is assumed to hold; say if it should not.

## Open 4: two consequences

- **The nav reaches six links** if the reference page lands. Collapsing it on a
  phone arrives with it. Two traps are in `CLAUDE.md`: ship the button `hidden`
  and let the script remove it, and restore the list unconditionally above the
  breakpoint.
- **`PROCESS.md` is 631 words** against a 400 to 600 band. The pivot needs room
  in it, so something has to go. The two moved specimens belong in it as a
  declared divergence and currently are not.

## Also unresolved, from the review conversation

- The home page still renders **four** specimen cards under prose that promises
  one, and the phrase "primary specimen" survives in two places that the harness
  retired.
- The syllabus the author pasted on 2026-09-18 carried pre-correction lines:
  畢方's omen is 見則其邑有譌火, not 見則天下大旱, and 旋龜's use is
  佩之不聾，可以為底, not 食之不饑 / 佩之不迷. The corrected lines are what the
  merged week 5 will use.

---

# Order of work, once A–D are answered

1. `CLAUDE.md` and `src/lib/weeks.ts` in one commit — `spec/course.test.ts:184`
   parses the week list out of CLAUDE.md and checks it against `weeks.ts`, so
   they cannot move separately without a red state.
2. `spec/course.test.ts` — `:140` hard-codes week 5 as the omens week; the new
   week 5 is omens *and* uses. Update the check, prove it fails first.
3. Redistribute creatures so nothing is orphaned once 5 and 6 merge.
4. Twelve session pages and twelve lecture pages, phase by phase.
5. Assessments: rename and reweight, confirm the sum is still 100.
6. Home page: reframe to the skill; remove the four cards and the two leftover
   "primary specimen" phrases.
7. Week 3 deck: still morphology, so it survives. Open it at both viewports.
8. `pnpm check`, both viewports, then commit.

# Must not drift

- Quoted lines only ever come from `src/lib/citations.ts`, which is generated.
  Nothing else may hold a line of 山海经, and an unfindable line is
  `verified: false` with nothing claimed around it.
- The deck belongs to week 3.
- No push, no visibility flip, no Pages, until the author says so.
