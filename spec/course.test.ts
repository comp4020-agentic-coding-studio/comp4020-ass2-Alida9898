// 这门课对自己许下的承诺，写成检查。每个 it 上面先说它保护哪一条承诺。
//
// The promises this course makes about itself, as checks. Every `it` below is
// preceded by the promise it protects — not by what it asserts, which is in the
// code, but by which promise of the course breaks when it goes red. A check
// whose purpose is not written down is a check nobody can decide to delete.
//
// These read the built site (`dist/api/index.json` and `dist/**/index.html`) as
// well as the source modules, because the contract is what shipped.

import { globSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { bestiary, citationProblems, citedChapters, recordsOf } from "../src/lib/bestiary";
import { DROUGHT_OMEN, citations } from "../src/lib/citations";
import { glosses } from "../src/lib/glosses";
import { ALL_SECTIONS, CHAPTERS } from "../src/lib/shanhaijing";
import { orphanCreatures, unknownCreatures, weeks } from "../src/lib/weeks";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as {
  nodes: ApiNode[];
};
const sessions = api.nodes.filter((node) => node.type === "sessions");
const assessments = api.nodes.filter((node) => node.type === "assessments");
const ALL_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

describe("the twelve weeks", () => {
  // Promise: twelve dated teaching weeks, one session each. A missing week is a
  // hole in the semester; two sessions in one week is a week that has quietly
  // become two.
  it("ships one session per week, for all twelve weeks", () => {
    const byWeek = sessions.map((node) => Number(node.meta?.week)).sort((a, b) => a - b);
    expect(byWeek).toEqual(ALL_WEEKS);
  });

  // Promise: a week states exactly ONE rule. The whole shape of the course is
  // one idea per week; a page with two rules is two weeks pretending to be one,
  // and a page with none is a week with nothing to test.
  it("gives every week exactly one rule, in its own frontmatter", () => {
    for (const node of sessions) {
      const rule = node.meta?.rule;
      expect(typeof rule, `${node.id}: rule must be a single string, not ${typeof rule}`).toBe(
        "string",
      );
      expect((rule as string).trim().length, `${node.id}: rule is empty`).toBeGreaterThan(19);
    }
  });

  // Promise: the page and the syllabus say the same thing. `src/lib/weeks.ts`
  // is the canonical contract and the page restates it; if the two drift, the
  // site and the harness stop being evidence for each other.
  it("matches the rule and creature list in src/lib/weeks.ts", () => {
    for (const node of sessions) {
      const week = weeks.find((entry) => entry.week === Number(node.meta?.week));
      expect(week, `${node.id}: no such week in weeks.ts`).toBeDefined();
      expect(node.meta?.rule, `${node.id}: rule differs from weeks.ts`).toBe(week?.rule);
      expect(node.meta?.creatures, `${node.id}: creatures differ from weeks.ts`).toEqual(
        week?.creatures,
      );
    }
  });

  // Promise: a rule is illustrated, not asserted. Three creatures is the point
  // at which a rule has to survive a case it was not written for.
  it("tests every rule against at least three creatures", () => {
    for (const week of weeks) {
      expect(
        week.creatures.length,
        `week ${week.week} lists ${week.creatures.length} creature(s)`,
      ).toBeGreaterThanOrEqual(3);
      expect(new Set(week.creatures).size, `week ${week.week} repeats a creature`).toBe(
        week.creatures.length,
      );
    }
    for (const node of sessions) {
      const named = (node.meta?.creatures ?? []) as string[];
      expect(named.length, `${node.id} names ${named.length} creature(s)`).toBeGreaterThanOrEqual(3);
    }
  });

  // Promise: every creature a week names is one the bestiary can produce a
  // cited record for. A name with no entry behind it is the exact failure this
  // course is about.
  it("names only creatures the bestiary holds", () => {
    expect(unknownCreatures()).toEqual([]);
  });

  // Promise: the bestiary is the course's working set, not a display case.
  // An entry no week uses is research nobody is asked to do anything with.
  it("uses every bestiary creature in at least one week", () => {
    expect(orphanCreatures()).toEqual([]);
  });

  // Promise: a week's creature list is a claim about that week's page, not
  // decoration in its frontmatter. Week 11 shipped naming four creatures its
  // prose never mentioned and week 5 named two, and every check above passed:
  // they are in the bestiary, there are at least three, none is an orphan. The
  // page does not print its own frontmatter list, so a match here is a match in
  // the rendered prose or on a specimen card.
  it("discusses every creature its own week names", () => {
    expect(sessions.length, "no session pages in the built API").toBe(12);

    const silent: string[] = [];
    for (const node of sessions) {
      const html = readFileSync(resolve("dist", node.id, "index.html"), "utf8");
      const body = html.slice(html.indexOf("<main"), html.lastIndexOf("</main>"));
      for (const creature of (node.meta?.creatures ?? []) as string[]) {
        if (!body.includes(creature)) silent.push(`${node.id} names ${creature}`);
      }
    }
    expect(silent, `named in frontmatter, absent from the page: ${silent.join("; ")}`).toEqual([]);
  });

  // Promise: the opener connects to the week before it, and connects to the
  // right one. Week references ran one number low from week 8 onward — week 8
  // called week 9 "week 10", week 9 called week 8 "week 9" — and the drift
  // started exactly where the late-written material started. Nothing could see
  // it, because a wrong week number is still a valid page.
  it("opens each week by naming the week before it", () => {
    const wrong: string[] = [];
    for (const node of sessions) {
      const week = (node.meta?.week ?? 0) as number;
      if (week < 2) continue;
      const html = readFileSync(resolve("dist", node.id, "index.html"), "utf8");
      const body = html.slice(html.indexOf("<main"), html.lastIndexOf("</main>"));
      // From the opener heading to the next heading of any level.
      const from = body.indexOf('id="what-this-week-does"');
      const opener = body.slice(from, body.indexOf("<h2", from + 1));
      if (!new RegExp(`[Ww]eek ${week - 1}\\b`).test(opener.replace(/<[^>]*>/g, " "))) {
        wrong.push(`week ${week} does not name week ${week - 1} in its opener`);
      }
    }
    expect(wrong, wrong.join("; ")).toEqual([]);
  });

  // Promise: "never invent the source" holds in the prose too, not only in the
  // data layer. `bestiary.ts` has no field that accepts source text, so the
  // rule is enforced by the shape of the code there — but a week page is free
  // prose and can type anything, and weeks 3 and 8 do quote fragments inline.
  // This is the same rule applied to the place it was not being enforced: any
  // run of Chinese long enough to be a line has to be one the edition supplies.
  // Chapter, section and locus names are how a page says *where* a line sits,
  // so a run built only out of those is a reference and not a quotation.
  it("quotes no Chinese the edition does not supply", () => {
    const supplied = Object.values(citations)
      .map((record) => record.line)
      .join("")
      .replace(/[，。；、：？！]/g, "");
    // CHAPTERS is a list of 卷 names; ALL_SECTIONS the 次 sections under them.
    const places = new Set<string>([...CHAPTERS, ...ALL_SECTIONS]);
    for (const record of Object.values(citations)) {
      if (record.section) places.add(record.section);
      if (record.locus) places.add(record.locus);
    }

    const CJK = /[\u3400-\u9fff\uf900-\ufaff][\u3400-\u9fff\uf900-\ufaff，。；、：？！]*/gu;
    const invented: string[] = [];
    for (const file of globSync("src/content/**/*.md*").concat(globSync("src/decks/**/*.mdx"))) {
      for (const [run] of readFileSync(file, "utf8").matchAll(CJK)) {
        const core = run.replace(/[，。；、：？！]/g, "");
        if (core.length < 8) continue;
        if (supplied.includes(core)) continue;
        // A locus reference: every comma-separated part names a real place.
        if (run.split(/[，、]/).every((part) => places.has(part.trim()))) continue;
        invented.push(`${file}: ${run}`);
      }
    }
    expect(invented, `Chinese in prose that no cited line supplies:\n${invented.join("\n")}`)
      .toEqual([]);
  });

  // Promise: the spine does not grow a slot. CLAUDE.md fixes three, and the
  // middle is where a week turns into a list of animals if nobody counts.
  it("gives every week an opener, a close, and two to five sections between", () => {
    const wrong: string[] = [];
    for (const node of sessions) {
      const html = readFileSync(resolve("dist", node.id, "index.html"), "utf8");
      const body = html.slice(html.indexOf("<main"), html.lastIndexOf("</main>"));
      // The theme brackets the week with its own h2s — a rule box before and a
      // teaching-team block after — so the week's own spine is the slice from
      // the opener to the close, and anything outside it belongs to the layout.
      const all = [...body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(([, inner]) =>
        inner.replace(/<[^>]*>/g, "").replace(/#$/, "").trim(),
      );
      const from = all.indexOf("What this week does");
      const to = all.indexOf("What you leave with");
      if (from < 0 || to < from) {
        wrong.push(`${node.id} has no opener-to-close span`);
        continue;
      }
      const working = to - from - 1;
      if (working < 2 || working > 5) wrong.push(`${node.id} has ${working} working sections`);
    }
    expect(wrong, wrong.join("; ")).toEqual([]);
  });

  // Promise: a reader picks up any week cold and finds the same first slot.
  // CLAUDE.md fixes the spine, and its one identical heading is the opener.
  // Eight pages shipped with no opener heading at all — they began on an
  // untitled lead paragraph — which no check could see, because every other
  // page check counts h1s rather than reading h2s.
  it("opens every week with the same heading", () => {
    const wrong: string[] = [];
    for (const node of sessions) {
      const html = readFileSync(resolve("dist", node.id, "index.html"), "utf8");
      const body = html.slice(html.indexOf("<main"), html.lastIndexOf("</main>"));
      // The layout's own rule box is an h2 too, and it carries a scoped
      // `data-astro-cid-*`. The page's own headings come from MDX and do not,
      // so that attribute is what separates the layout's chrome from the week.
      const first = [...body.matchAll(/<h2([^>]*)>([\s\S]*?)<\/h2>/g)].find(
        ([, attrs]) => !attrs.includes("data-astro-cid"),
      );
      // The theme appends an anchor link inside the heading, which survives
      // tag-stripping as a trailing "#".
      const text = first?.[2]
        .replace(/<[^>]*>/g, "")
        .replace(/#$/, "")
        .trim();
      if (text !== "What this week does") wrong.push(`${node.id} opens on ${text ?? "no h2"}`);
    }
    expect(wrong, `weeks not opening on "What this week does": ${wrong.join("; ")}`).toEqual([]);
  });
});

describe("the bestiary", () => {
  // Promise: the course cites the received text and not a plausible version of
  // it. Every chapter is one of the eighteen 卷 and every 次 section belongs to
  // the 卷 it is filed under.
  it("cites only chapters and sections that exist in the received text", () => {
    expect(citationProblems()).toEqual([]);
  });

  // Promise: the bestiary spans the whole text rather than the famous opening.
  // Reading only 南山經 would make the system look far more regular than it is.
  it("reaches all eighteen chapters", () => {
    const covered = citedChapters();
    const missing = CHAPTERS.filter((chapter) => !covered.includes(chapter));
    expect(missing, `chapters with no creature: ${missing.join(", ")}`).toEqual([]);
  });

  // Promise: `verified: true` is a claim about the edition, not a mood. A
  // verified record quotes a line that actually names the creature, unless the
  // text never names it, which is a finding and has to be declared rather than
  // smoothed over.
  it("backs every verified entry with a line that names it", () => {
    for (const entry of bestiary.filter((c) => c.verified && !c.unnamedInSource)) {
      const named = recordsOf(entry).some((record) => record.line.includes(entry.nameTrad));
      expect(named, `${entry.name}: no cited line contains ${entry.nameTrad}`).toBe(true);
    }
  });

  // Promise: an unverified entry is a hole in the course, not a licence to
  // write around it. Nothing unverified carries an omen or a use.
  it("lets an unverified entry claim nothing", () => {
    for (const entry of bestiary.filter((c) => !c.verified)) {
      expect(entry.omen, `${entry.name} is unverified but carries an omen`).toBeUndefined();
      expect(entry.use, `${entry.name} is unverified but carries a use`).toBeUndefined();
    }
  });

  // Promise: week 5's rule claims an omen formula attaches word for word to at
  // least six unrelated creatures. A course that asserts a count it cannot show
  // is doing the thing it accuses the reconstructions of, so the repo carries
  // the six records and this check counts them.
  it("can show the six records behind week 5's omen rule", () => {
    const carrying = Object.entries(citations).filter(
      ([, record]) => !record.commentary && record.line.includes(DROUGHT_OMEN),
    );
    const loci = new Set(carrying.map(([, record]) => `${record.chapter}/${record.locus}`));
    expect(
      loci.size,
      `only ${loci.size} cited record(s) carry ${DROUGHT_OMEN}: ${[...loci].join(", ")}`,
    ).toBeGreaterThanOrEqual(6);
    const chapters = new Set(carrying.map(([, record]) => record.chapter));
    expect(chapters.size, "the formula should span more than one 卷").toBeGreaterThanOrEqual(3);
  });

  // Promise: week 2 prints four counts off the citation data and tells students
  // the formula is incomplete. If the data changes and the page does not, the
  // week is asserting a number it can no longer show, which is the exact thing
  // the course fails a student for.
  it("still supports the slot counts week 2 prints", () => {
    const base = Object.values(citations).filter((record) => !record.commentary);
    const carrying = (slot: string) => base.filter((r) => r.line.includes(slot)).length;
    expect(base.length, "total base-text lines").toBe(45);
    expect(carrying("其狀如"), "records with the comparison slot").toBe(21);
    expect(carrying("名曰"), "records with the name slot").toBe(26);
    expect(carrying("見則"), "records with the omen slot").toBe(11);
    expect(
      base.filter((r) => r.line.includes("其狀如") && r.line.includes("名曰")).length,
      "records with both comparison and name",
    ).toBe(13);
    expect(carrying("其狀如"), "the formula must stay incomplete in our own data")
      .toBeLessThan(base.length / 2);
  });

  // Promise: a quotation from 郭璞's note is never printed as though the base
  // text said it. The apparatus is flagged in the data, not in prose.
  it("marks commentary as commentary", () => {
    const note = citations["feiyi.guopu"];
    expect(note.commentary, "郭璞's note must be flagged").toBe(true);
  });

  // Promise: the eighteen-chapter list is what every citation check rests on,
  // so it is pinned rather than trusted.
  it("knows the received text has eighteen chapters", () => {
    expect(CHAPTERS).toHaveLength(18);
    expect(new Set(CHAPTERS).size).toBe(18);
  });
});

describe("translations", () => {
  // Promise: a reader who does not read Chinese can still follow the evidence.
  // Every specimen card prints its cited line; a card with no gloss prints that
  // line and nothing else, which asks the reader to take the argument on trust.
  // 30 of 46 citations were in that state until 2026-09-21.
  it("gives every cited line an English gloss", () => {
    const missing = Object.keys(citations).filter((key) => !glosses[key]);
    expect(missing, `cited lines with no translation: ${missing.join(", ")}`).toEqual([]);
  });

  // Promise: a gloss is a translation of something, not free-standing prose.
  // `glosses.ts` has always claimed this check exists in its header comment and
  // it did not, so a gloss could outlive the citation it was written for and
  // nothing would say so.
  it("has no gloss for a line the edition does not carry", () => {
    const orphans = Object.keys(glosses).filter((key) => !(key in citations));
    expect(orphans, `glosses with no citation: ${orphans.join(", ")}`).toEqual([]);
  });

  // Promise: the translation is the course speaking and the line is the text
  // speaking, and the two never merge. A gloss that is only the Chinese back
  // again has translated nothing.
  it("writes every gloss in English", () => {
    const untranslated = Object.entries(glosses)
      .filter(([, gloss]) => !/[a-z]{4}/i.test(gloss))
      .map(([key]) => key);
    expect(untranslated, `glosses with no English in them: ${untranslated.join(", ")}`).toEqual([]);
  });
});

describe("assessment", () => {
  // Promise: a student can add the semester up. The schema already forces each
  // assessment's own criteria to total 100; nothing but this stops the
  // assessments themselves from totalling 90 or 130.
  it("has weights that sum to 100 across the whole course", () => {
    expect(assessments.length, "no assessments in the built API").toBeGreaterThan(0);
    const total = assessments.reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    const breakdown = assessments.map((node) => `${node.id}=${node.meta?.weight}`).join(", ");
    expect(total, `weights sum to ${total}: ${breakdown}`).toBe(100);
  });
});

describe("the harness", () => {
  // Promise: CLAUDE.md's week list and the syllabus data say the same thing,
  // down to the wording of every rule. The harness is what a marker reads the
  // site against; if it drifts, it stops being evidence and becomes a claim.
  it("matches the twelve-week list in CLAUDE.md, rule for rule", () => {
    const harness = readFileSync(resolve("CLAUDE.md"), "utf8");
    const rows = [
      ...harness.matchAll(
        /^\s*(\d{1,2})\.\s+\*\*(.+?)\*\*\s+·\s+(build|stress|rebuild)\s*\n\s*Rule:\s*(.+?)\s*$/gm,
      ),
    ].map(([, week, title, phase, rule]) => ({ week: Number(week), title, phase, rule }));

    expect(
      rows.map((row) => row.week),
      "CLAUDE.md has no twelve-week list in the expected shape",
    ).toEqual(ALL_WEEKS);

    for (const row of rows) {
      const week = weeks.find((entry) => entry.week === row.week);
      expect(week?.phase, `CLAUDE.md week ${row.week}: phase`).toBe(row.phase);
      expect(week?.title, `CLAUDE.md week ${row.week}: title`).toBe(row.title);
      expect(week?.rule, `CLAUDE.md week ${row.week}: rule wording`).toBe(row.rule);
    }
  });
});

describe("every page", () => {
  // Promise: a reader arriving on any page is told what page they are on.
  // Three index pages shipped with no level-one heading at all, because the
  // starter's `heroTitle:` frontmatter only renders alongside a hero image and
  // suppresses the layout's own h1 when there isn't one. The build's axe pass
  // rates that rule "moderate" and let it through, so it is pinned here.
  it("carries exactly one level-one heading", () => {
    const pages = globSync("dist/**/index.html").filter((file) => !file.includes("/decks/"));
    expect(pages.length, "no built pages found").toBeGreaterThan(5);

    const bad = pages
      .map((file) => ({ file, count: (readFileSync(file, "utf8").match(/<h1[\s>]/g) ?? []).length }))
      .filter(({ count }) => count !== 1);
    expect(bad, `pages without exactly one h1: ${bad.map((b) => `${b.file}=${b.count}`).join(", ")}`)
      .toEqual([]);
  });
});

describe("nothing the reader was not meant to see", () => {
  const BASE = "/comp4020-ass2-Alida9898/";
  const builtPages = () =>
    globSync("dist/**/index.html")
      .map((file) => file.replace(/\\/g, "/"))
      .filter((file) => !file.includes("/decks/"));

  // Promise: a page talks to the reader, never to whoever is building the site.
  // The sessions index shipped a starter paragraph telling the developer to set
  // the collection's display names in `src/site-config.ts`, and it reached the
  // deployed site because `check:evidence` greps for the literal
  // STARTER_CONTENT marker and the starter's prose does not carry one.
  it("names no repo source path on any page", () => {
    const leaks: string[] = [];
    for (const file of builtPages()) {
      const html = readFileSync(file, "utf8");
      const body = html.slice(html.indexOf("<main"), html.lastIndexOf("</main>")) || html;
      for (const [path] of body.matchAll(/src\/[a-z0-9._/-]+\.(?:ts|astro|mdx|md|css)/g)) {
        leaks.push(`${file}: ${path}`);
      }
    }
    expect(leaks, `pages naming a repo file: ${leaks.join(", ")}`).toEqual([]);
  });

  // Promise: every page that ships is a page somebody can arrive at. /lectures/
  // outlived the collection it listed: the content was deleted in the pivot,
  // nav stopped linking it, and the route kept building a page whose entire
  // body was instructions for filling the collection in. The link checker
  // cannot see this, because an orphan has no broken link — it has no link.
  it("leaves no page unreachable from the home page", () => {
    const pages = new Set(builtPages());
    const toFile = (href: string) => {
      const rest = href.slice(BASE.length).replace(/^\/+|\/+$/g, "");
      return rest.endsWith(".html") ? `dist/${rest}` : `dist/${rest ? rest + "/" : ""}index.html`;
    };

    const seen = new Set<string>();
    const queue = ["dist/index.html"];
    while (queue.length) {
      const current = queue.pop() as string;
      if (seen.has(current) || !pages.has(current)) continue;
      seen.add(current);
      const html = readFileSync(current, "utf8");
      for (const [, href] of html.matchAll(/href="([^"#?]+)"/g)) {
        if (href.startsWith(BASE)) queue.push(toFile(href));
      }
    }

    const orphans = [...pages].filter((page) => !seen.has(page)).sort();
    expect(orphans, `built but unreachable: ${orphans.join(", ")}`).toEqual([]);
  });
});

describe("characters the reader's machine may not have", () => {
  // Promise: no character the course quotes renders as a tofu box. 肥𧔥's 𧔥 is
  // U+27525, outside the Basic Multilingual Plane; no stock system font carries
  // it, so it showed as an empty box on the one page whose argument is that the
  // character is written differently. `site.css` now loads a 4.9 KB one-glyph
  // subset for it. A second astral character added to a citation would come
  // back as a box and nothing would say so, which is what this catches.
  it("covers every astral character it quotes with the bundled subset", () => {
    const declared = new Set<number>();
    const css = readFileSync("src/styles/site.css", "utf8");
    for (const [, range] of css.matchAll(/unicode-range:\s*([^;]+);/g)) {
      for (const part of range.split(",")) {
        const span = part.trim().replace(/^U\+/i, "").split("-");
        const from = parseInt(span[0], 16);
        const to = parseInt(span[1] ?? span[0], 16);
        for (let cp = from; cp <= to; cp++) declared.add(cp);
      }
    }
    expect(declared.size, "no unicode-range declared in site.css").toBeGreaterThan(0);

    const uncovered = new Set<string>();
    const files = globSync("src/content/**/*.md*")
      .concat(globSync("src/lib/*.ts"))
      .concat(globSync("src/decks/**/*.mdx"));
    for (const file of files) {
      for (const char of readFileSync(file, "utf8")) {
        const cp = char.codePointAt(0) as number;
        // Astral CJK only. The planes to watch are the SIP and TIP, U+20000
        // upward; emoji sit *below* them at U+1F000, so a `cp < 0x1f000` guard
        // excludes the whole of CJK Extension B — including U+27525 itself.
        // The first version of this check did exactly that and was green for
        // the wrong reason until it was mutation-tested.
        if (cp >= 0x20000 && cp <= 0x3ffff && !declared.has(cp)) {
          uncovered.add(`U+${cp.toString(16).toUpperCase()} (${char}) in ${file}`);
        }
      }
    }
    expect([...uncovered], `astral characters with no bundled glyph: ${[...uncovered].join(", ")}`)
      .toEqual([]);
  });
});

describe("site-wide styling", () => {
  // Promise: no page ships the theme's "Related" heading at 3.43:1 against the
  // page background. That fix lives in src/styles/site.css, which this repo has
  // no single hook for, so every layout path imports it and this check notices
  // when a new route forgets. The build's own axe pass cannot see contrast.
  it("carries the site stylesheet on every built page", () => {
    const pages = globSync("dist/**/index.html").filter((file) => !file.includes("/decks/"));
    expect(pages.length, "no built pages found").toBeGreaterThan(5);

    const missing = pages.filter((file) => {
      const html = readFileSync(file, "utf8");
      if (html.includes(".related-content h2")) return false;
      // Astro extracts component CSS to a linked bundle, so follow the links.
      const hrefs = [...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map(([, href]) => href);
      return !hrefs.some((href) => {
        const onDisk = resolve("dist", href.replace(/^.*?\/_astro\//, "_astro/"));
        try {
          return readFileSync(onDisk, "utf8").includes(".related-content h2");
        } catch {
          try {
            return readFileSync(resolve(dirname(file), href), "utf8").includes(
              ".related-content h2",
            );
          } catch {
            return false;
          }
        }
      });
    });
    expect(missing, `pages without src/styles/site.css: ${missing.join(", ")}`).toEqual([]);
  });
});
