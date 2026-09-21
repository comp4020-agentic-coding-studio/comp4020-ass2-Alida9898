# Process overview

## What I built

**SLOP6608 — Cryptotaxonomy: A Linnaean System for the Shanhaijing.** Twelve
weeks on building a classification system for material nobody has handed you one
for, with the 山海经 as the training set.

## What I decided a good course is

**One rule per week, tested against cases the rule was not written for.** My
first design was one *specimen* per week, thrown out before any content existed —
twelve weeks of one animal each is a bestiary. Creatures recur instead, so the
same record under a different rule has to look different.

The subject kept moving too. Introducing the 山海经 is a tour: interesting for
twelve weeks and gone by the thirteenth. So I pushed it into a classification
system for the creatures, then further, into a method for classifying anything
([`4a34ffc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/4a34ffc),
[`4a11953`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/4a11953)).

The system does not survive: the records are too incomplete, and four of nine
fields work. I could have hidden that by picking kinder records. Instead the
failure became the shape — build, strain, rebuild, three phases of four weeks —
because a system coming apart against real material teaches more than a tidy one
standing up.

## Never invent the source, enforced by shape

My first version was an instruction in `CLAUDE.md` — the kind of rule an agent
keeps until it is inconvenient. So I made it structural: quoted lines live in a
**generated** module sliced from the 四庫全書 text and referenced by key. No
field accepts a line of 山海经, so a plausible quotation cannot be written.

That produced content rather than restricting it. Reading the edition rather
than my memory found 九尾狐 **is never named in the text**, which became week
7's rule, and caught week 5 quoting a line belonging to five other creatures —
now week 5's rule, with the six records sliced so a check can count them
([`2cc2eaa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/2cc2eaa)).

## How I knew the checks were right

A check that has only ever been green is one I have not tested, so I
mutation-tested each. Two were green for the wrong reason: one grepped HTML for
a selector Astro had extracted into a bundle, and one meant to skip emoji used
`cp < 0x1f000`, which excludes all of CJK Extension B
([`2556c62`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/2556c62)).

Reading the weeks then found defects no check saw: a week quoting no source line
at all, frontmatter naming creatures its prose never mentions, week references
one number low from week 8 on. I specified the missing checks
([`29c0e6b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/29c0e6b)),
wrote the weeks
([`493817b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/493817b),
[`2ccf47c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/2ccf47c)),
then added them, because a red check is not a contract until the thing it
protects is true. One went red on arrival anyway, on a week I had just written;
I reworded the page, not the check.

## What I left out on purpose

Two things I could have encoded and did not.

**Creature names stay in Chinese.** Everything else quoted got English — all 46
cited lines and the book's title, pinned by a check
([`049101c`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/049101c)).
The names did not, because weeks 7 and 8 argue *about the names*. Translating
them would settle in the typography a question the course spends two weeks
refusing to settle.

**Voice stayed a rule, not a check.** It cannot be mechanised. The plan recorded
my own pitch for the course under an agent's note that it needed toning down to a
deadpan register; I let that stand, and the page came out accurate and
unreadable. Both corrections are in `CLAUDE.md`
([`2ec3e52`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Alida9898/commit/2ec3e52)),
because the midpoint is what neither swing found alone.
