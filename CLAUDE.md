# Your harness

Carried forward from C5 (`comp4020-crit5-Alida9898`), minus everything that
belonged to that brief. The template arrives with no rules in it on purpose, so
every rule below is one that cost something to learn. The platform under this
repo is documented in `README.md` and is not restated here.

So as you learn what your prototype needs --- a convention the work has to hold
to, a sensor that keeps catching you out (a linter, say), a fact about the stack
that is easy to get wrong --- write it down here and wire it into `check`.
Growing this file is the work.

## How to work in here

- Keep the dev server running (`pnpm dev`) so you see changes as you make them.
- Run `pnpm check` before you push.
- Open the page in a browser and look at it. The rendered page is the truth;
  your mental model of it isn't.
- When a check fails, read its output before you change anything.
- Never commit a red state --- with one exception, and only one: a spec test
  written before the thing it tests, which is red *because the work hasn't
  happened yet*. Those are the week's contract, they land in the first commit,
  and turning each one green is the process evidence `PROCESS.md` cites. A test
  that went red because something broke is never in this category. If you can't
  say in one sentence why a red test is the planned starting state, it isn't.

## Which language goes where

The author and I talk in Chinese. **Everything that leaves the conversation is
English**: commit messages, `PROCESS.md`, `reflections/*.md`, this file, and any
text the deployed page shows. Those all have a reader who is not the author —
a marker, a tutor, whoever opens the public repo — and a commit log they cannot
read is evidence they cannot mark.

This was got wrong for a whole week: the conversation was Chinese, so the commit
messages came out Chinese too, and by the time it was noticed the repo was public
and the history could not be rewritten. So it is written here rather than
remembered.

Two things that are **not** exceptions:

- **Quoting the author is quoting.** Their words stay in their language, with a
  short English gloss beside them. `PROCESS.md` does this for the two
  redirections that changed the brief.
- **Code comments follow the code's audience**, which in this repo is the author,
  so they stay Chinese. If that ever changes, it changes as one deliberate pass,
  not drifting file by file.

And when the page's own language changes, `lang`, the aria-labels and any
letter-spacing tuned for one script have to change with it — see the title going
English and back.

## Plan before building, when the ask is more than one thing

Phase 1 of the hunt was built as a complete, working mechanic --- you moved your
aim until two readings cancelled out --- reviewed, and then thrown away whole.
The scoping plan existed and was good (`PLAN.md`, cut the explainer down to ear
asymmetry alone). What was missing was a plan for the *interaction*, so the first
design that got imagined was the first design that got built, and the question
underneath it --- how does the page show that the owl works the height out in
advance? --- never got asked until there was working code to argue with.

So: when a request is more than one task, or when the shape of the thing is not
obvious yet, write the plan first and get it agreed before building. `PLAN.md`
for anything that outlives the session; a short numbered list in the conversation
for anything smaller. A plan is cheap to disagree with. A finished mechanic is
expensive, because disagreeing with it means someone has to accept the work was
wasted --- which is pressure to keep a bad design rather than admit it.

## Commit as each piece of work finishes, not at the end of a session

Crit 1 nearly shipped with nothing real behind it: a whole Windows 98 re-skin
was built, checked with `pnpm check`, and confirmed in the browser across many
turns of back-and-forth --- but never once committed. Because the last real
commit predated all of it, `git status -sb` showed the local branch level with
`origin/main`, which reads as "everything's pushed" even though what was
pushed was a bare stub. A tutor's automated nudge is what caught it, not a
local check.

So: after any turn that leaves the working tree passing `pnpm check` with a
real, reviewed change in it, commit before moving to the next request --- don't
wait for a natural stopping point, because "the session's about to end" isn't
a signal available until the deadline is already close. Before treating a
session as wrapped, run `git status -sb` and `git log --oneline @{upstream}..HEAD`
and confirm there's nothing sitting uncommitted, not just that the working
tree is clean.

## Looking at the page: agent-browser

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
ab errors                     # page errors
ab close --all
```

Three things that cost time the first run:

- **zsh does not word-split unquoted parameters.** `AB="pnpm dlx ..."` then
  `$AB open` fails with `command not found` because the whole string is treated
  as one command name. Use a shell function.
- **`viewport` is a subcommand of `set`**, so bare `agent-browser viewport ...`
  answers `Unknown command`. Same for `device` and `media`.
- **`set viewport` needs a `reload`** before the screenshot, or you photograph
  the old layout.
- **`ab errors` keeps a buffer across navigations, and a stale entry is
  indistinguishable from a live bug.** An error thrown by the module you saved
  thirty seconds ago is still listed after `ab open` on a fresh URL, with the
  old `?t=` timestamp still in the stack trace --- so it reads as "the page is
  broken right now". Two ways to tell: `ab errors --json` shows the `?t=`
  timestamp (an old one is stale), and `ab close --all` before reopening
  clears it for real. `--clear` alone did not. Check what the page actually
  *does* before believing the buffer.
- **`ab click <selector>` has silently done nothing** where
  `ab eval "document.querySelector('…').click()"` worked. A no-op click looks
  exactly like a page that ignored the click, so it is worth reaching for `eval`
  before concluding the page is broken --- prefer it when a click is load-bearing
  evidence.

Two checks only a real browser can do, so they do not belong in `pnpm check`:

- **Colour contrast, and the widening list of things axe cannot see.**
  `pnpm build` runs axe over every rendered page, but on a build's DOM rather
  than a laid-out one, so the geometric rules are skipped --- contrast included.
  A green build is therefore not a contrast result. `ab a11y` runs the same axe
  in Chrome and does evaluate it, but only for what it can resolve, and three
  things in a row have fallen outside that:
  - **SVG `<text>`** axe cannot measure at all, reporting *incomplete*. A
    hand-check goes stale the moment the background moves, which is how amber
    labels ended up on a cream plate at 1.77:1 after being measured at 8.6:1 on
    the dark. Where the geometry allows it, make the rule positional instead ---
    in A1, `spec/pages.test.ts` forbade a label inside a plate's rect.
  - **A gradient background** returns *incomplete* for every text node over it,
    because axe cannot resolve one background colour behind them. Measure by
    hand against the *lightest* point (worst case for pale text) and write the
    ratio into the CSS beside the value.
  - **A `<canvas>` is opaque to axe** --- there are no nodes inside it, so a
    WebGL or 2D scene is not partially covered, it is entirely uncovered. Nothing
    automatic says anything about it, in the build's axe pass or in Chrome. If the prototype's
    whole point lives on a canvas, then *all* of its contrast is a hand-check,
    and the only durable version of that is to drive the palette from named
    constants in one module and measure those once. Colours picked inline at
    each call site cannot be audited at all.

  Every one of these expires silently when the palette moves, so write the
  measured ratio next to the constant, not in a commit message.
- **Both marking viewports.** 1920x1080 and 390x844 each count in full. Check
  that the core interaction is reachable without a scroll at 1080 --- a page
  whose interaction is below the fold has buried its own point.

## Navigation: collapse it on a phone, and make the collapse survive no JS

More than two or three destinations in a horizontal nav, collapse them behind a
button below the phone breakpoint. In A1 a three-link nav fitted on one line at
390px --- 358px of 390 --- so nothing *looked* broken; it was still spending a
whole row of vertical space on the viewport with the least of it, directly above
the fold, on the page whose interaction has to be reachable without scrolling.
Two traps, both of which look completely finished while broken:

- **Ship the button with `hidden` and let the script remove it.** A hamburger
  that assumes its script ran leaves a button that opens nothing when it did
  not --- and that failure is invisible, because a dead button looks like a live
  one. The plain list is the correct no-script state.
- **Restore the list unconditionally above the breakpoint.** A phone left closed
  and then rotated past the breakpoint otherwise has no nav at all: the collapsed
  state is stale and nothing on screen says so. This is found by users, not by
  you, because you never rotate your own test device mid-session.

In A1 both were pinned in `spec/nav.test.ts` and `spec/pages.test.ts`.
`spec/invariants.test.ts` requires a `<nav>` landmark on every page, so even a
single-screen prototype carries one --- while it stays a single link this
section costs nothing, and the moment it grows past that, pin them again rather
than trusting the memory.

## A gesture's direction is untestable where it usually lives

C4's pour gesture sent the water *up* when the hand went *down*. Both directions
animate smoothly, neither errors, and the suite was green through the whole
thing --- it was found by a person dragging a glass and saying "why does this go
the wrong way". The sum was one line inside a `pointermove` handler, which is a
place a unit test cannot reach: importing the module needs a DOM, an
`AudioContext` and synthetic `PointerEvent`s before it can assert anything.

So: when a gesture maps input to state, put the arithmetic in a pure function
and call it from the handler. `pouredLevel(startLevel, dy, travel)` in
`tuning.ts` exists for no reason except that its direction can then be two lines
in `spec/tuning.test.ts`. Applies to anything with a sign in it --- scroll,
drag, zoom, scrub.

## Facts about this stack that have each cost a run

Four came from C5's template and only two survived the move: this repo's
`tsconfig.include` is `**/*`, and nothing in `spec/` touches jsdom, so the
whitelist trap and the three jsdom facts retired with that stack. The rest are
CSS and images, which do not care what builds them.

- **`[hidden]` loses to any class that sets `display`.** The UA rule is
  `display: none` at specificity (0,1,0), so `.steps { display: flex }` beats it
  and the attribute does nothing at all. Pair every attribute-driven hide with
  its own `.thing[hidden] { display: none }`.
- **Raster, when a week uses it:** `filter: invert()` only works on line art (a
  tonal drawing inverted is a photographic negative --- eye sockets come out
  brightest), and never back a lossy image with a rect in a "matching" colour,
  because the paper survives compression a few levels off and seams against it
  at a hard edge. Bake the margin into the image so there is only one surface.

Astro, this repo, not yet paid for --- written down before rather than after:

- **A root-absolute link in an `.astro` file skips Astro's base handling.**
  `href="/sessions/"` works on `localhost` and 404s on the deployed site,
  because everything lives under `/comp4020-ass2-Alida9898/`. Markdown links and
  the theme's components are rewritten for you; hand-written ones in `.astro`
  are not. The build's link checker catches it --- so a *green build is the
  evidence*, and a link added without one is not yet checked.
- **A collection key is four things at once.** `sessions/getting-started` is the
  file, the page URL, the JSON endpoint and the ref other pages link by.
  Renaming it means renaming all four in the same commit; renaming one leaves a
  dangling ref, and the build fails on that by design.
- **`published: false` hides an entry from the production build but not from
  `pnpm dev`.** So the dev server can look complete while the deployed site is
  missing pages. Anything judged on "the site" is judged on `pnpm build`
  output, never on what the dev server shows.
- **`pnpm check:evidence` fails on leftovers, not just on absences.** For A2 it
  tracks every `STARTER_CONTENT` marker and the unchanged key imagery; the repo
  ships 18 markers. Remove a marker when --- and only when --- that fragment is
  actually replaced.
