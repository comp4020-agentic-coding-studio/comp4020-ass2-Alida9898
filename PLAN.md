# Open decisions, paused 2026-09-17

Written because the author paused the review to think. This file holds what is
**decided and built**, what is **open**, and what must not drift while the open
questions are settled. It is not the process account: `PROCESS.md` records what
happened, and nothing here has happened yet.

## Where it stands

| | |
|---|---|
| `pnpm check` | green: 39 pages, 18 tests, 0 type errors, no broken links |
| `pnpm check:evidence` | passes |
| axe in Chrome, 1920x1080 and 390x844 | 0 violations on 7 sampled pages, no overflow at 390 |
| commits | 11, local only |
| repo visibility | **private**. Not pushed, Pages not enabled, no live URL |

Deploying is held deliberately. It flips the repo permanently public, the author
has not finished reviewing, and nothing about it is reversible.

## Decided, and built

The twelve week topics and the three phases are the author's, transcribed from
their brief and unchanged: 12 of 12 phases match, 11 of 12 titles are word for
word theirs. The one changed title is week 7, `The god/beast boundary` rendered
as `The 神 and the 獸`, because the harness keeps the text's own words in
Chinese.

Per the author's second instruction, "one specimen per week" is gone. Each week
now states exactly one rule and names at least three creatures, creatures recur
across weeks, and the rule lives in frontmatter with `src/lib/weeks.ts` as the
canonical copy.

**The twelve rules are mine, not the author's.** They gave the pattern and one
worked example, week 2. That layer has not been reviewed, and it is the layer
the author could not follow when reading the site, which is the honest
explanation for "I could not tell what the twelve weeks were about".

## Open 1: the missing world

The author's diagnosis, and it is correct: the site never says what the 山海经
**is** before asking a student to extract characters from it. The book reads as
a survey, filed along routes with stated bearings and distances. A student
arriving has nowhere to learn the shape of the territory.

The data for it already exists and is already cited:

| | |
|---|---|
| loci with a named mountain | 17, every one in the 五藏山經 |
| loci with no locus at all | 13, every one in the 海經 or 大荒經 |

That split *is* week 4's argument, sitting in the citation data. One half can be
walked as a line; the other half is four directions with no interior.

**Proposal.** A standing reference page outside the twelve weeks, in the nav,
generated from `citations.ts` so it cannot drift from the content. It carries the
eighteen 卷 in the edition's order split into the two groups, the twenty-six 次
routes under the five 山經, where each of the twenty-five creatures sits, and the
one structural fact that `habitat` holds two different kinds of thing. Week 1
gets a short orientation paragraph pointing at it, which is inside the author's
own week 1 topic rather than a change to it.

**The open question is how far the drawing goes.**

1. **Structure only.** The two groups, the twenty-six routes, the creatures
   placed. No spatial claim. Buildable now, entirely from committed data.
2. **Route chains.** Extract each route's full mountain sequence with its stated
   bearings and distances from the edition, and draw the five 山經 as polylines
   with creature-bearing mountains marked, against the 海經 drawn as what it
   actually is. Makes "this half is mappable and that half is not" visible at a
   glance, which is the course's own week 4 claim. Costs a fresh extraction pass,
   and anything not found stays blank rather than invented.
3. **No drawing.** Structure page as prose only.

Recommended: 2, because it is the only version where the argument is visible
rather than asserted. Not started, because the cost is the author's call.

## Open 2: the method is never taught

Separate gap, same root. Weeks 5 to 8 each eliminate one proposed character, and
each elimination silently uses a criterion from taxonomic practice that the
course never states:

| week | eliminates | criterion used but not taught |
|---|---|---|
| 5 | the omen | a character varies with the thing, not with the description |
| 6 | use | a character is intrinsic, not relational |
| 7 | the kind-words 神 / 獸 | a classifier word is not a rank unless it partitions |
| 8 | the name | what a type specimen is for: fixing a name to a thing |
| 9 | the whole system | a monothetic class cannot hold one name over many things |

So the course does teach classification design, but only by implication. A
student who never sees the ruler reads twelve weeks as twelve anecdotes.

**Proposal.** Week 2 already owns "the entry as specimen"; it also states the
criteria before any character is extracted, and weeks 5 to 8 each name the
criterion they are applying. No change to the fixed topics or phases.

Not started. It interacts with Open 1, and the author may want one page to carry
both the world and the method.

## Open 3: two specimens I moved without saying so

The author assigned one specimen per week in their first brief. Ten are still in
the week they put them in. Two are not, and both moves were mine:

- **陆吾** left week 4 and is now in weeks 3 and 7. Week 4 asks whether the
  mountain chapters can be mapped, and I wanted a set of loci with decreasing
  positional precision; 陆吾 guards 昆侖 and is a post rather than a precision
  case. Week 4 now carries 夫诸, 陵鱼, 讙头, 驺吾.
- **蛊雕** left week 10 and is now in weeks 2 and 12. Week 10 now carries 驺吾,
  烛阴, 九尾狐, 夔.

Both are defensible and neither was agreed. Put back, or keep, is the author's
call. If Open 1 lands, week 4's creature set may want revisiting anyway.

## Open 4: two consequences to settle with the above

- **The nav reaches six links** if the reference page lands. The harness already
  requires collapsing past two or three on a phone, so the nav work arrives with
  it. Two traps are recorded in `CLAUDE.md`: ship the button `hidden` and let
  the script remove it, and restore the list unconditionally above the
  breakpoint.
- **`PROCESS.md` is 631 words** against a 400 to 600 band. Whatever is decided
  here needs room in it, so something in it has to go. The two moved specimens
  above belong in it as a declared divergence from the brief, and currently are
  not in it.

## Must not drift while this is open

- The twelve week topics and the three phases are fixed by the author.
- Quoted lines only ever come from `src/lib/citations.ts`, which is generated.
  Nothing else may hold a line of 山海经, and an unfindable line is
  `verified: false` with nothing claimed around it.
- `CLAUDE.md`'s "one week at a time" rule stays marked **suspended** rather than
  deleted until the next content pass restores it.
- No push, no visibility flip, no Pages, until the author says so.
