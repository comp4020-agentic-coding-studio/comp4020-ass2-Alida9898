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
import { CHAPTERS } from "../src/lib/shanhaijing";
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
        /^\s*(\d{1,2})\.\s+\*\*(.+?)\*\*\s+·\s+(build|stress|break)\s*\n\s*Rule:\s*(.+?)\s*$/gm,
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
