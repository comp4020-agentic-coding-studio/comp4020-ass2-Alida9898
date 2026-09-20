# Your harness

Carried forward from C5 (`comp4020-crit5-Alida9898`), minus everything that
belonged to that brief. The template arrives with no rules in it on purpose, so
every rule below is one that cost something to learn. The platform under this
repo is documented in `README.md` and is not restated here.

So as you learn what this course needs --- a convention the work has to hold to,
a sensor that keeps catching you out, a fact about the stack that is easy to get
wrong --- write it down here and wire it into `check`. Growing this file is the
work.

---

# The course this repo builds

**SLOP6608 --- Cryptotaxonomy: A Linnaean System for the Shanhaijing.** One
question held for twelve weeks: can a rigorous classification system be built
for the creatures of the 山海经? The answer the course argues toward is *partly,
and the failures are more interesting than the successes*.

The 608 was allocated to this repo and does not move. The leading 6 is the
level, chosen because the course assumes a reader who already knows what a type
specimen is.

## One rule per week, at least three creatures

This is the shape of the whole course, so it is the first rule in the file.

- **Every week states exactly one rule**, its 定式, in the session's
  frontmatter. One string, never a list. A week with two rules is two weeks
  pretending to be one, and the content schema in `src/content.config.ts`
  refuses the second.
- **Every week illustrates its rule with at least three creatures** from the
  bestiary, named in frontmatter. Three is where a rule has to survive a case it
  was not written for; two can always be chosen to agree.
- **Creatures recur, deliberately.** 九尾狐 carries five weeks and 狌狌 carries
  two. The same record read under a different rule is *supposed* to look
  different, and weeks 1 and 7 on 狌狌 are the test of whether that is true. If
  a recurring creature reads the same in two weeks, the second week has no rule
  of its own --- that is the defect to look for, not the recurrence.
- There is no such thing as a week's "primary specimen". An earlier version of
  this course had one per week and it quietly turned the syllabus into a list of
  animals, which is a bestiary and not a course.

`src/lib/weeks.ts` is the canonical contract: twelve rows, each with a phase, a
title, a topic, a rule and a creature list. The session page restates its own
rule and creatures, because a week has to be able to say its rule on its own
page, and `spec/course.test.ts` checks the page and the contract agree.

## The twelve weeks are fixed

Do not reorder them, do not merge two into one, and do not add a thirteenth.
The phases are fixed too. This list and `src/lib/weeks.ts` are checked against
each other, so changing one tells you about the other.

1. **What a classification system is** · build
   Rule: The text is already a classification: it files every creature by where you would meet it, which is a claim about the world and not the absence of one.
2. **Reading the source text** · build
   Rule: 其状如X，Y首，见则Z is a template the text reaches for and often leaves incomplete, so the first character a taxonomy has to handle is an absent one.
3. **Morphological classification** · build
   Rule: A composite body is assembled from a small closed set of parts, so the parts and not the whole are what a taxonomy can count.
4. **Geographic classification** · build
   Rule: The 山经 routes can be mapped and the 海经 cannot, so a habitat field that accepts both is recording two different kinds of fact under one name.
5. **Omens and uses** · stress
   Rule: Neither an omen nor a use is a character of the creature: 见则天下大旱 attaches word for word to at least six unrelated creatures, and a use states what a person gets rather than what the creature is.
6. **The god and the beast** · stress
   Rule: The text's own words 神, 獸, 鳥 and 人 do not sort by body: 陆吾 and 开明兽 guard one mountain with nearly one body and are filed apart, and several records name no kind at all.
7. **Drift** · stress
   Rule: A name outlives its record: 九尾狐 is never named in the text, so everything the name now carries was added after the record closed.
8. **One name, many creatures** · stress
   Rule: One name takes many creatures and one creature takes many names, and no field in the entry can hold either fact.
9. **Other systems** · rebuild
   Rule: Other bestiaries sort by what a creature is for the reader, so their top division is a fact about the reader rather than about the creatures.
10. **Cross-system comparison** · rebuild
   Rule: Putting one creature through two systems shows which of its features each system had to ignore, and the ignored features are where the two systems actually disagree.
11. **Beyond the 山海经** · rebuild
   Rule: A system transfers only as far as its characters do, so the test of one is naming which of its characters the next material will not supply.
12. **The taxonomic congress** · rebuild
   Rule: A new entry is admissible only if it cites a line and declares which of its own fields that line does not supply.

The deck belongs to **week 3**. It is the one week whose argument is visual, so
it is the one week a deck earns.

**Weeks 5 and 6 carried the wrong lines** until the edition was actually read.
Week 5 had 見則天下大旱, which is a real formula but attaches to 顒, 肥遺 and
four others rather than to 畢方, whose omen is fire. Week 6 had 食之不饑 and
佩之不迷, which belong to 祝餘 and 迷穀, the herb and the tree on week 1's
mountain, not to 旋龜. Both were corrected against the text, and that correction
is now week 5's rule rather than an erratum.

## Never invent the source

This is the rule the course is about, so it is the rule the harness enforces
hardest. It applies to the agent exactly as it applies to a student.

- **Quoted lines live in `src/lib/citations.ts`, which is generated, not
  written.** Every string in it was sliced out of the Wikisource 四庫全書 text
  with 郭璞's interlinear notes and the editorial `<ref>` apparatus stripped.
  Do not hand-edit it. To add a line, slice it from the same edition.
- **Nothing else may hold a line of 山海经.** `src/lib/bestiary.ts` references
  citations by key and has no field that accepts source text, so a
  plausible-looking quotation cannot be written into it at all. That is the
  point: the rule is enforced by the shape of the code rather than by anyone
  remembering it. Keep it that way when you add fields.
- **Never invent a chapter.** The received text has eighteen 卷, and the five
  山经 among them carry twenty-six 次 sections. Both lists are transcribed in
  `src/lib/shanhaijing.ts` from the edition's own headings, including the one
  inconsistency: 中山經's first section is headed 中山經 and not 中山經之首.
- **If you cannot find the line, set `verified: false` and stop.** Do not supply
  a plausible one, do not reconstruct it from a translation, and do not
  paraphrase into quotation marks. An unverified entry claims nothing --- no
  omen, no use --- and `spec/course.test.ts` enforces that.
- **A quotation keeps its script.** The edition prints traditional characters,
  so quoted lines are traditional. The course's own prose uses simplified.
  Transliterating a quotation is still altering it, which is why every creature
  carries both `name` and `nameTrad`.
- **Every quoted line carries an English gloss, and so does every fragment you
  reason from.** Translations live in `src/lib/glosses.ts`, keyed by citation
  key, hand written and never in `citations.ts`. Thirty of forty-six citations
  had none until 2026-09-21, so thirty specimen cards printed Chinese and
  nothing else. Three checks pin it now: every citation has a gloss, every gloss
  has a citation, and no gloss is the Chinese over again.

  The same applies to fragments quoted inline in a week's prose. Chapter,
  section and place names are objects of study and stay bare — 海內南經 is a
  name, not a sentence. Anything you argue *from* gets its English beside it:
  見則天下大旱 ran through weeks 5 and 12 as the load-bearing
  evidence of both, untranslated, in a course whose prose is English.
- **吹 and 呼 are both outward breath.** 燭陰's 吹為冬，呼為夏 is a sharp blow
  against a warm one, not an out-breath against an in-breath. Weeks 6 and 9 and
  `bestiary.ts` all rendered it "breath out is winter and in is summer" until a
  translation pass caught it. A gloss written next to the line is what found it,
  which is an argument for writing them.
- `verified: true` is a claim, not a mood: a verified entry's cited line has to
  contain the creature's own name. The one exception is 九尾狐, which the text
  describes and never names, declared as `unnamedInSource` rather than smoothed
  over, because it is the whole argument of week 8.

Holding this rule produced the course's real findings rather than getting in
their way. Each is recorded in its entry's `note`: 狌狌 has three records with
three bodies, 旋龜 has two tails and one use between two records, 肥遺 is one
name over a snake, a bird and a third thing with 郭璞 writing 疑是同名, 窫窳 has
two records that cannot describe one body, and 陵魚's line stands in 海內北經
only inside 袁珂's note arguing that nine passages were misfiled.

## The bestiary

Twenty-five creatures in `src/lib/bestiary.ts`, with at least one record in
every one of the eighteen 卷. A check enforces the coverage, because reading
only 南山經 makes the system look far more regular than it is.

Every entry carries `name` and `nameTrad`, `pinyin`, an invented `binomial`,
`form`, `habitat`, an optional `omen` and `use`, one or more `cites`, and
`verified`. `kind` is **optional and often absent**, because several records
never say what kind of thing they are describing, and that absence is week 6's
material rather than a gap to fill.

The binomial is genus from the source name, species from the diagnostic trait in
the 其状 clause. It is invented, and every page that prints one says so. A
taxonomy that hides which parts it made up is the thing this course is against.

## Voice

Deadpan taxonomist. Write as a scholar who takes the project completely
seriously and never winks at the reader.

- English prose. Creature names and quoted source text stay in Chinese, with
  pinyin on first use in a page.
- Short declarative sentences. No exclamation marks.
- Banned: *dive into*, *explore*, *unpack*, *delve*, *journey*, *whether you are
  a X or a Y*, and any sentence that tells the reader how to feel about the
  material.
- Rhetorical questions are allowed, used the way
  [Calling Bullshit](https://callingbullshit.org/syllabus.html) uses them: to
  open a topic, then answer it in the next sentence. Not for atmosphere.

### Say the thing. Do not be coy.

**This is the rule the author has had to give twice, so it is written down.**
Plain speech, every time. The model this course copies is Calling Bullshit:
second person, short sentences, named things, no performance.

Concretely banned, with the actual sentences that earned the ban:

- **Withholding a name the sentence is about.** "the invented encyclopedia that
  gets all three wrong" --- say *Borges' fake Chinese encyclopedia*. If a reader
  has to work out which thing you mean, you are charging admission.
- **A flourish carrying no information.** "before anyone offered to improve on
  it", "One session spent finding the sentence where the map stops". Delete the
  clause; the sentence is better.
- **An epigram at the end of every paragraph.** One or two in a page is voice.
  One per paragraph is a tic, and it is the single clearest sign an agent wrote
  the page.
- **Teasing the finding instead of stating it.** "the finding that the grid does
  not track the animal at all" --- state what the week covers. A description
  exists so a reader can decide whether to read the page.
- **"The week the system breaks"-style openers.** Four session descriptions
  began "The week the ...". It is coy and it is repetitive.

A page description says what is on the page. A heading says what the section
contains. Neither is a place to be clever.

### Every week has the same spine

A reader picks up any week cold, so the slots do not move:

1. **`## What this week does`** --- the only heading that is identical in all
   twelve weeks. One sentence connecting to the previous week, one stating this
   week's job, then a list of what is coming, each item naming its own creature
   and what that creature is there to do. Write it first. It used to read `## Why
   this week exists`, which invited a paragraph of justification where a reader
   wanted a contents list.
2. **Two to four working sections**, headings of their own, each carrying part
   of the argument with the week's creatures in it. Number them `Example N:` or
   `Step N:` only where the sections really are parallel cases or real sequence;
   a week whose sections are exposition takes plain headings, because numbering
   them claims an order that is not there.

   Five is allowed **only** where the sections are numbered steps in one method.
   Week 2 is the only one, and it earns it: its five are the steps of getting
   from raw material to columns, and merging any two would hide a step. Eleven
   weeks run three or four. `spec/course.test.ts` pins the range at two to five
   and pins the close, so a week cannot quietly grow a sixth slot.
3. **`## What you leave with`** --- the artefact, and what carries forward.

Warnings, caveats and "do not misread this" go in a `<Caution>` box, never in a
heading: the outline is the argument, and a caveat is not a section. Vary the
working-section headings between weeks --- the spine is what repeats, not the
body. Timetables ("Two hours", "Forty minutes on ...") are not curriculum and do
not appear.

**Introduce a thing before you use it.** Week 1 taught how to classify before it
said what the 山海经 is, which is backwards. A page that assumes the reader
already has the context is a page written for its author.

**A specimen card appears where its example is first discussed**, not collected
at the foot of the page. The record is this course's unit of study, so the
reader meets one before being asked to reason about one.

## One week at a time --- suspended by the author, 2026-09-17

This file used to require generating one week, stopping, and waiting for review,
because a pass that writes twelve weeks writes twelve versions of the same week.
The author suspended it to build the whole site in one pass and review
afterwards, so it is recorded here as suspended rather than deleted: the risk it
names is real and the review list in `PROCESS.md` is what pays for it. Restore
it before the next content pass.

---

# How to work in here

- Keep the dev server running (`pnpm dev`) so you see changes as you make them.
- Run `pnpm check` before you claim anything is done, and before you push.
- Open the page in a browser and look at it. The rendered page is the truth;
  your mental model of it isn't.
- When a check fails, read its output before you change anything.
- Never commit a red state --- with one exception, and only one: a spec test
  written before the thing it tests, which is red *because the work hasn't
  happened yet*. Those are the contract, they land in the first commit, and
  turning each one green is the process evidence `PROCESS.md` cites. A test that
  went red because something broke is never in this category. If you can't say in
  one sentence why a red test is the planned starting state, it isn't.

## What a spec check is for

`spec/` is read as the record of what this course decided had to stay true about
itself, so **every check states the promise it protects, in one sentence, above
the `it`.** Not what it asserts --- that is in the code --- but which promise of
the course breaks if it goes red. A check whose purpose isn't written down is a
check nobody can decide to delete.

Test the contract, not the implementation. `spec/data-integrity.test.ts` ships
with the template and keeps dated material inside the teaching period;
`spec/course.test.ts` is this course's own and covers one rule per week, three
creatures per rule, no orphan creatures, real chapters, the assessment total,
the harness-to-data agreement, and the stylesheet every page needs.

`spec/course.test.ts` grew five checks on 2026-09-21, each written because
something had already shipped past every existing one:

- **a creature a week names appears on that week's page** — weeks 5 and 11
  named six creatures between them that their prose never mentioned.
- **every week opens on `## What this week does`** — eight of twelve opened on
  an untitled lead paragraph.
- **every week names the week before it in that opener** — week references ran
  one number low from week 8 on.
- **no Chinese in prose that the edition does not supply** — `bestiary.ts` has
  no field that can hold a line, but a week page is free prose and weeks 3 and 8
  quote fragments inline. This applies the same rule where it was not enforced.
  A run built only from 卷, 次 and locus names is a reference, not a quotation,
  and passes.
- **opener, close, and two to five sections between** — the spine, pinned.

**Prove a check fails before believing it passes.** Every check in
`spec/course.test.ts` was mutation-tested: an invented chapter, a 次 section
moved to the wrong 卷, a quoted line with the creature's name deleted, a phase
changed in this file. Each produced the error it should. A check that has only
ever been green is a check you have not tested.

## Word counts, checked against the course site rather than remembered

**An assignment's `PROCESS.md` runs 400 to 600 words.** Verified 2026-09-21 at
<https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts>,
which also gives 900–1100 for the final project's, 400–600 for its `README.md`,
150–300 per reflection entry, 600–800 for the COMP8020 research note, and
150–300 for a crit week's `PROCESS.md`.

There is **no word-limit penalty**, but the page says scope is itself part of
the response to the brief, so overshooting badly loses marks there rather than
in a separate deduction. Images do not count toward any of these.

This band lived in `PLAN.md` for days as an unverified note, and the cost of
that was not knowing whether a trim was worth doing. The site is the authority
and `curl` reaches it; `WebFetch` failed on a certificate error, so use `curl`.

## Which language goes where

The author and I talk in Chinese. **Everything that leaves the conversation is
English**: commit messages, `PROCESS.md`, this file, and the deployed page's
prose. Those all have a reader who is not the author --- a marker, a tutor,
whoever opens the public repo --- and a commit log they cannot read is evidence
they cannot mark.

This was got wrong for a whole week: the conversation was Chinese, so the commit
messages came out Chinese too, and by the time it was noticed the repo was public
and the history could not be rewritten. So it is written here rather than
remembered.

Three things that are **not** exceptions:

- **Quoting the author is quoting.** Their words stay in their language, with a
  short English gloss beside them.
- **Quoting the 山海经 is quoting**, and it stays in traditional characters.
  Creature names, 卷 names and section names stay Chinese in body text too ---
  they are the objects of study, not decoration.
- **Code comments follow the code's audience**, which in this repo is the author,
  so they stay Chinese. If that ever changes, it changes as one deliberate pass,
  not drifting file by file.

The page is bilingual by design, so: inline Chinese inside English prose needs
`lang="zh-Hans"` on its own element, or `lang="zh-Hant"` for a quotation, or a
screen reader pronounces it with English phonemes. Any letter-spacing or
font-feature tuned for Latin has to be turned off for those spans ---
`Specimen.astro` does this and is the pattern to copy.

## Plan before building, when the ask is more than one thing

Phase 1 of the A1 hunt was built as a complete, working mechanic, reviewed, and
then thrown away whole. The scoping plan existed and was good. What was missing
was a plan for the *interaction*, so the first design that got imagined was the
first design that got built, and the question underneath it never got asked
until there was working code to argue with.

So: when a request is more than one task, or when the shape of the thing is not
obvious yet, write the plan first and get it agreed before building. `PLAN.md`
for anything that outlives the session; a short numbered list in the
conversation for anything smaller. A plan is cheap to disagree with. A finished
mechanic is expensive, because disagreeing with it means someone has to accept
the work was wasted --- which is pressure to keep a bad design rather than admit
it.

This course's own design went through that loop once on paper and it paid:
"one specimen per week" was a complete, coherent plan that would have produced a
list of animals, and it was replaced by "one rule per week" before any week
content existed.

## Commit as each piece of work finishes, not at the end of a session

Crit 1 nearly shipped with nothing real behind it: a whole Windows 98 re-skin
was built, checked with `pnpm check`, and confirmed in the browser across many
turns of back-and-forth --- but never once committed. Because the last real
commit predated all of it, `git status -sb` showed the local branch level with
`origin/main`, which reads as "everything's pushed" even though what was pushed
was a bare stub. A tutor's automated nudge is what caught it, not a local check.

So: after any turn that leaves the working tree passing `pnpm check` with a
real, reviewed change in it, commit before moving to the next request --- don't
wait for a natural stopping point, because "the session's about to end" isn't a
signal available until the deadline is already close. Before treating a session
as wrapped, run `git status -sb` and `git log --oneline @{upstream}..HEAD` and
confirm there's nothing sitting uncommitted, not just that the working tree is
clean.

**This assignment is marked 45% on process**, so a commit message says which
promise of the course that commit protects, not which files moved.

---

# Looking at the page: agent-browser

The rendered page is the ground truth, and this project has no browser on the
PATH. `agent-browser` is not installed globally --- run it through pnpm:

```sh
ab() { pnpm dlx agent-browser@0.34.0 "$@"; }   # zsh: a function, NOT a variable
ab open http://localhost:4321/comp4020-ass2-Alida9898/
                              # 4321, and the base path is NOT optional: bare
                              # http://localhost:4321 is the 404 Astro prints
ab set viewport 1920 1080     # `viewport` lives under `set`, not at top level
ab reload && ab screenshot /tmp/desktop.png
ab set viewport 390 844 && ab reload && ab screenshot /tmp/phone.png
ab a11y                       # axe-core in real Chrome
ab a11y --json                # the measured contrast ratio, which plain a11y hides
ab errors                     # page errors
ab close --all
```

Things that cost time:

- **zsh does not word-split unquoted parameters**, and this bites twice.
  `AB="pnpm dlx ..."` then `$AB open` fails with `command not found`, because
  the whole string is one command name — so use a shell function. It bites
  again on *arguments*: `for vp in "1920 1080" ...; ab set viewport $vp` answers
  `Missing arguments for: set viewport` and the viewport silently does not
  change, so you then audit the old layout twice and read it as a pass. Pass
  width and height as separate arguments.
- **`viewport` is a subcommand of `set`**, so bare `agent-browser viewport ...`
  answers `Unknown command`. Same for `device` and `media`.
- **`set viewport` needs a `reload`** before the screenshot, or you photograph
  the old layout.
- **`ab errors` keeps a buffer across navigations**, and a stale entry is
  indistinguishable from a live bug. `ab errors --json` shows the `?t=`
  timestamp, and an old one is stale; `ab close --all` before reopening clears it
  for real, where `--clear` alone did not.
- **`ab click <selector>` has silently done nothing** where
  `ab eval "document.querySelector('…').click()"` worked. Prefer `eval` when a
  click is load-bearing evidence.
- **Don't audit CSS against the dev server.** Astro serves component styles
  through the module graph in dev, so they are not in the page's HTML and
  `curl` finds nothing; worse, the browser can hold a stale copy whose
  `data-astro-cid-*` hash no longer matches the one on disk, which reads exactly
  like a specificity bug. Both times this looked like "my CSS isn't applying" it
  was the dev server. **Build, then `pnpm preview --port 4331`, and audit that.**
  Per `README.md` the site is judged on `pnpm build` output anyway.

### Screenshotting a deck slide, which took five attempts to work out

The deck is Reveal-shaped: `.slides > section`, one carrying `.present` and the
rest held at `opacity: 0` by `.past` / `.future`. Three things that do **not**
work: synthetic `KeyboardEvent`s (nothing listens for them), `scrollIntoView`
(the page is exactly one viewport tall), and `window.Reveal` (undefined).

Stripping the classes stacks all sixteen slides on top of each other, and
setting `.present` by hand gives a blank frame, because the entrance animation
leaves the inner elements at zero opacity and `prefers-reduced-motion` does not
undo it. What works is injecting a stylesheet:

```js
.slides > section { display: none !important; opacity: 1 !important;
                    transform: none !important; position: static !important }
.slides > section.solo { display: grid !important }
.slides > section.solo * { opacity: 1 !important; transform: none !important }
```

then adding `.solo` to one section at a time. A slide's `scrollHeight` is 720 on
a slide that fits, because that is the design height; anything larger overflows
its own frame. Measuring all sixteen that way is the cheap check. Looking at
four or five of them is still the real one.

## Contrast is a hand-check, and this repo has already failed it twice

`pnpm build` runs axe over every rendered page, but on a build's DOM rather than
a laid-out one, so the geometric rules are skipped and contrast is among them.
**A green build is not a contrast result.** `ab a11y` runs the same axe in
Chrome and does evaluate it, but only for what it can resolve: SVG `<text>` and
text over a gradient come back *incomplete*, and a `<canvas>` is invisible to it
entirely. **Incomplete is not a pass.**

Two failures found this way, both invisible to the build:

- **`opacity` on text multiplies against a token that already carries alpha.**
  The theme's `--at-text-secondary` is the body colour at 78%; an extra
  `opacity: 0.75` on top of it gives 0.585 effective alpha and fails. Use the
  theme's own `--at-text-secondary` or `--at-text` and **never `opacity` on
  text.** For a lighter rule or stroke use `color-mix(in srgb, currentColor 30%,
  transparent)`, which is a colour and not a multiplier.
- **The brand accent only clears contrast as large text.** Amber `#b97d1c` on
  the page background `#fffdfa` measures **3.43:1** (axe-core 4.12.1, Chrome,
  2026-09-17), which passes the 3:1 large-text threshold and fails the 4.5:1
  normal-text one. So a heading's *size* and its *colour* cannot be chosen
  independently, and the theme does this to itself twice: `RelatedContent` sets
  its "Related" h2 to 1rem, and `.at-card-title` drops to 20.25px at the phone
  breakpoint. **The card one passes at 1920 and fails at 390**, which is why
  auditing one viewport is not auditing. Both overrides are in
  `src/styles/site.css` with the measured ratios beside them.

Write the measured ratio next to the value, never in a commit message, because
that is where it goes stale silently.

## Site-wide CSS has no single hook in this repo

MDX pages render through `src/layouts/PageLayout.astro`, but the detail routes
import the theme's `ContentLayout` directly, so there is no one layout to put a
global stylesheet in. `src/styles/site.css` is imported by `PageLayout.astro`
and by every page under `src/pages/`, and `spec/course.test.ts` fails any built
page that does not carry it. That check caught two missed pages the moment it was
written, which is the only reason it exists.

**Astro extracts component CSS into a linked bundle**, so a check that greps the
page's HTML for a selector finds nothing and passes vacuously. The check follows
the `<link rel=stylesheet>` hrefs. A first version of it did not, and was green
for the wrong reason.

## Every page needs its own h1, and the MDX layout does not supply one

`MdxPageLayout` sets the document `<title>` and renders the description as a
lead paragraph. It does **not** emit an `<h1>`, so an `.mdx` page has a
level-one heading only if its own body starts with `# `. Three index pages
shipped with none.

Worse, the starter's `heroTitle:` frontmatter looks like it supplies one and
does not: `BaseLayout` renders the hero only when there is *also* a hero image,
so on an image-free page `heroTitle` renders nothing at all and the page has no
visible title. The build's axe pass rates `page-has-heading-one` "moderate" and
let all three through. Pinned in `spec/course.test.ts` as exactly one `<h1>` per
built page.

## Both marking viewports, and the deck

1920x1080 and 390x844 each count in full. For this assignment the marker reads
the home page, a few non-adjacent weeks, an assessment, the deck and the
policies page at both. Read those pages yourself, at both, before calling the
site done.

**A deck is only checked for syntax.** The build compiles every deck and catches
invalid MDX, and nothing checks whether a slide fits or stays legible. Week 3's
deck has to be opened at both viewports and looked at.

## Navigation: collapse it on a phone, and make the collapse survive no JS

This site ships a five-link nav, which is past the two or three that fit a phone
row. Check what the theme already does before building anything; if it handles
it, write down that it does. Two traps, both of which look completely finished
while broken:

- **Ship the button with `hidden` and let the script remove it.** A hamburger
  that assumes its script ran leaves a button that opens nothing when it did not,
  and that failure is invisible, because a dead button looks like a live one. The
  plain list is the correct no-script state.
- **Restore the list unconditionally above the breakpoint.** A phone left closed
  and then rotated past the breakpoint otherwise has no nav at all: the collapsed
  state is stale and nothing on screen says so. This is found by users, not by
  you, because you never rotate your own test device mid-session.

# Facts about this stack that have each cost a run

- **`[hidden]` loses to any class that sets `display`.** The UA rule is
  `display: none` at specificity (0,1,0), so `.steps { display: flex }` beats it
  and the attribute does nothing at all. Pair every attribute-driven hide with
  its own `.thing[hidden] { display: none }`.
- **Raster, when a week uses it:** `filter: invert()` only works on line art (a
  tonal drawing inverted is a photographic negative), and never back a lossy
  image with a rect in a "matching" colour, because the paper survives
  compression a few levels off and seams against it at a hard edge. Bake the
  margin into the image so there is only one surface. For line art prefer
  `stroke="currentColor"` and no fill, which inverts correctly with no second
  palette and no filter.

- **A plain YAML scalar cannot contain `: `.** A session's `description:` is an
  unquoted multi-line scalar, so one `things by it: a mountain` in it fails the
  whole build with `bad indentation of a mapping entry` pointing at the line
  after the colon. Use an em dash, or quote the string.
- **`𧔥` in 肥𧔥 is U+27505, outside the BMP,** and renders as a tofu box in the
  site's font stack. It is in the generated `citations.ts` and is correct; it is
  the rendering that fails. Week 8's argument is that the name is spelled with a
  different second character, so the one place it matters is the one place a
  reader sees a box. Not fixed: covering CJK Extension B needs a font nobody
  ships.

Astro and this repo:

- **A root-absolute link in an `.astro` file skips Astro's base handling.**
  `href="/sessions/"` works on `localhost` and 404s on the deployed site, because
  everything lives under `/comp4020-ass2-Alida9898/`. Markdown links and the
  theme's components are rewritten for you; hand-written ones in `.astro` are
  not. The build's link checker catches it --- so a *green build is the
  evidence*, and a link added without one is not yet checked.
- **A collection key is four things at once.** `sessions/01-why-classify-monsters`
  is the file, the page URL, the JSON endpoint and the ref other pages link by.
  Renaming it means renaming all four in the same commit; renaming one leaves a
  dangling ref, and the build fails on that by design.
- **`published: false` hides an entry from the production build but not from
  `pnpm dev`.** So the dev server can look complete while the deployed site is
  missing pages. Anything judged on "the site" is judged on `pnpm build` output,
  never on what the dev server shows.
- **`pnpm check:evidence` fails on leftovers, not just on absences.** It greps
  `src/` for `STARTER_CONTENT` and hashes four starter images. The repo shipped
  13 markers across 12 files, and `src/pages/index.astro` carries two, so a file
  is not clear until `git grep -F STARTER_CONTENT -- src` says so. Deleting the
  file also passes, and dropping a starter portrait along with the person it
  belonged to is a legitimate way to clear one. It also requires `PROCESS.md`
  with its template comment gone and at least one citation whose SHA resolves.
- **`spec/` imports from `src/` fine.** Vitest resolves `astro/zod` through the
  normal dependency, which is how `bestiary.ts` validates itself at import and is
  asserted over in `spec/`. Tests that need built output read `dist/`, and
  `pnpm test` builds first, so there is only ever the one ordering.
