import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

import * as fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = "gpt-5.5";

// Types

interface AIIssue {
  id: string;
  wcag_criterion: string;
  wcag_level: "A" | "AA" | "AAA";
  severity: "Critical" | "Serious" | "Moderate" | "Minor";
  category: string;
  element: string;
  description: string;
  recommendation: string;
}

interface AIReport {
  url: string;
  overall_score: number;
  summary: string;
  strengths: string[];
  top_priority_fixes: string[];
  issues: AIIssue[];
}

interface SeverityCounts {
  Critical: number;
  Serious: number;
  Moderate: number;
  Minor: number;
}

// Configuration

const PAGES = [
  {
    id: "before",
    label: "Before (Inaccessible)",
    url: "https://www.w3.org/WAI/demos/bad/before/survey.html",
  },
  {
    id: "after",
    label: "After (Accessible)",
    url: "https://www.w3.org/WAI/demos/bad/after/survey.html",
  },
] as const;

// Prompt

function buildPrompt(url: string): string {
  return `You are an expert web accessibility tester with deep knowledge of WCAG 2.1 and 2.2 guidelines.

I am giving you only this URL: ${url}

Your task:
1. Fetch and analyse the page at this URL using your browsing ability.
2. Identify ALL accessibility issues you can find.
3. For each issue, provide:
   - WCAG criterion violated (e.g. 1.1.1 Non-text Content)
   - Severity: Critical | Serious | Moderate | Minor
   - Element or area affected (be specific)
   - Clear description of the problem
   - Recommended fix
4. Give an overall accessibility score out of 10 (where 10 = fully accessible).
5. Summarise key strengths (if any) and the top 3 priority fixes.

Format your response as structured JSON matching this schema exactly:
{
  "url": string,
  "overall_score": number,
  "summary": string,
  "strengths": string[],
  "top_priority_fixes": string[],
  "issues": [
    {
      "id": string,
      "wcag_criterion": string,
      "wcag_level": "A" | "AA" | "AAA",
      "severity": "Critical" | "Serious" | "Moderate" | "Minor",
      "category": string,
      "element": string,
      "description": string,
      "recommendation": string
    }
  ]
}

Return ONLY valid JSON — no markdown fences, no preamble.`;
}

// AI Response Markdown

function generateResponseMarkdown(report: AIReport, label: string): string {
  const date = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const counts = countBySeverity(report.issues);

  const issueRows = report.issues
    .map(
      (i) =>
        `| ${i.id} | ${i.severity} | ${i.wcag_criterion} | ${i.wcag_level} | ${i.category} | ${i.element} | ${i.description} | ${i.recommendation} |`
    )
    .join("\n");

  const issueTable =
    report.issues.length === 0
      ? "_No issues found._"
      : `| ID | Severity | WCAG Criterion | Level | Category | Element | Problem | Recommended Fix |\n` +
        `|---|---|---|---|---|---|---|---|\n` +
        issueRows;

  return `# AI Accessibility Audit — ${label}
**Date:** ${date}
**Model:** GPT-5.5 (web_search_preview enabled)
**Method:** URL-only — no context, no WCAG checklist provided to the AI
**URL analysed:** ${report.url}

---

## Overall Score

${report.overall_score} / 10

---

## Summary

${report.summary}

---

## Issue Breakdown

| Severity | Count |
|---|---|
| Critical | ${counts.Critical} |
| Serious  | ${counts.Serious} |
| Moderate | ${counts.Moderate} |
| Minor    | ${counts.Minor} |
| **Total** | **${report.issues.length}** |

---

## Strengths

${report.strengths.length > 0 ? report.strengths.map((s) => `- ${s}`).join("\n") : "_None identified._"}

---

## Top 3 Priority Fixes

${report.top_priority_fixes.map((f, i) => `${i + 1}. ${f}`).join("\n")}

---

## All Issues Found

${issueTable}
`;
}

// API call

async function testPage(page: (typeof PAGES)[number]): Promise<AIReport> {
  console.log(`\nAuditing: ${page.label}`);
  console.log(`URL:      ${page.url}`);

  const response = await (client as any).responses.create({
    model: "gpt-5.5",
    tools: [{ type: "web_search_preview" }],
    input: buildPrompt(page.url),
  });

  const textOutput: string = (response.output as any[])
    .filter((block: any) => block.type === "message")
    .flatMap((block: any) => block.content as any[])
    .filter((c: any) => c.type === "output_text")
    .map((c: any) => c.text as string)
    .join("\n");

  if (!textOutput) throw new Error(`No text response for ${page.label}`);

  const cleaned = textOutput.replace(/```json\n?|```\n?/g, "").trim();

  let parsed: AIReport;
  try {
    parsed = JSON.parse(cleaned) as AIReport;
  } catch {
    console.error("Raw response:\n", textOutput);
    throw new Error(`Failed to parse JSON for ${page.label}`);
  }

  const outDir = path.join(__dirname, "ai_responses");
  fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, `${page.id}_response_${MODEL}.json`);
  fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2), "utf8");

  // Save human-readable markdown version of the AI response
  const mdPath = path.join(outDir, `${page.id}_response_${MODEL}.md`);
  fs.writeFileSync(mdPath, generateResponseMarkdown(parsed, page.label), "utf8");

  console.log(`Saved:    ${outPath}`);
  console.log(`Saved:    ${mdPath}`);
  console.log(`Score:    ${parsed.overall_score}/10 | Issues: ${parsed.issues.length}`);

  return parsed;
}

// Helpers

function countBySeverity(issues: AIIssue[]): SeverityCounts {
  return {
    Critical: issues.filter((i) => i.severity === "Critical").length,
    Serious:  issues.filter((i) => i.severity === "Serious").length,
    Moderate: issues.filter((i) => i.severity === "Moderate").length,
    Minor:    issues.filter((i) => i.severity === "Minor").length,
  };
}

function renderIssueTable(issues: AIIssue[]): string {
  if (!issues.length) return "_No issues found._\n";
  const header =
    "| ID | Severity | WCAG Criterion | Level | Category | Element | Problem | Fix |\n" +
    "|---|---|---|---|---|---|---|---|\n";
  const rows = issues
    .map(
      (i) =>
        `| ${i.id} | ${i.severity} | ${i.wcag_criterion} | ${i.wcag_level} | ${i.category} | ${i.element} | ${i.description} | ${i.recommendation} |`
    )
    .join("\n");
  return header + rows + "\n";
}

// Report generator

function generateFullReport(beforeReport: AIReport, afterReport: AIReport): string {
  const date = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const bc = countBySeverity(beforeReport.issues);
  const ac = countBySeverity(afterReport.issues);

  return `# Final Accessibility Testing Report
**Date:** ${date}
**Project:** W3C BAD Demo — Survey Page (Before vs After)
**Testing Methods:** Manual Exploration | Axe-core v4.11.2 via Playwright | AI (GPT-5.5, URL-only)

---

## 1. Executive Summary

This report compares three accessibility testing approaches applied to the W3C "Before and After Demonstration" survey pages — one intentionally inaccessible, one remediated. Each method reveals a different layer of accessibility problems, demonstrating that no single approach is sufficient on its own.

| Metric | Before Page | After Page | Improvement |
|---|---|---|---|
| Manual Issues Found | 10 | 3 | −7 |
| Axe-core Violations | 7 | 4 | −3 |
| AI Issues Found | ${beforeReport.issues.length} | ${afterReport.issues.length} | −${beforeReport.issues.length - afterReport.issues.length} |
| AI Score (/ 10) | ${beforeReport.overall_score} | ${afterReport.overall_score} | +${(afterReport.overall_score - beforeReport.overall_score).toFixed(1)} |

---

## 2. Manual Testing Results

> **Method:** Direct browser exploration, keyboard-only navigation, visual inspection, and form interaction testing

### First Impressions

At first glance, the two versions of the survey page appear visually similar. However, after closer inspection, the After version provides a noticeably better user experience and improved accessibility.

In the After version, content is easier to read due to better spacing and clearer visual structure. Labels for input fields are positioned **above** the fields, making the form more intuitive. In the Before version, labels appear **below** inputs, which is confusing for users.

Interactive elements such as buttons are more clearly highlighted in the After version. The table at the bottom is more structured and readable. A significant improvement is in **form behaviour and error handling**: the Before version loses all user input on invalid submission, while the After version preserves input and displays clear, descriptive error messages.

### Before Page — Manual Findings

| # | Issue | WCAG | Severity |
|---|---|---|---|
| 1 | Labels positioned below inputs — confusing reading order | 1.3.2 Meaningful Sequence | Serious |
| 2 | No visible error messages on form submission | 3.3.1 Error Identification | Critical |
| 3 | All form data lost after failed submission | 3.3.1 Error Identification | Critical |
| 4 | Buttons not clearly distinguishable as interactive | 1.3.3 Sensory Characteristics | Moderate |
| 5 | Tab order unclear / non-logical through the form | 2.4.3 Focus Order | Serious |
| 6 | No skip navigation link | 2.4.1 Bypass Blocks | Serious |
| 7 | Images used as navigation links with no text alternative | 1.1.1 Non-text Content | Critical |
| 8 | Table at bottom lacks clear headers or structure | 1.3.1 Info and Relationships | Moderate |
| 9 | Colour alone used to distinguish some interface elements | 1.4.1 Use of Colour | Moderate |
| 10 | No page language — screen reader may mispronounce | 3.1.1 Language of Page | Serious |

**Summary:** The Before page fails on multiple fundamental accessibility criteria. The most impactful issues are the complete loss of form data on submission error, absent error messages, and navigation images without alt text. Keyboard users and screen reader users would find this page very difficult or impossible to use effectively.

### After Page — Manual Findings

| # | Issue | WCAG | Severity |
|---|---|---|---|
| 1 | One form field (#cc) labeled via title attribute only — not a visible label | 1.3.1 Info and Relationships | Moderate |
| 2 | No \`<main>\` landmark defined | 4.1.2 Name, Role, Value | Moderate |
| 3 | Some content still outside semantic landmark regions | 1.3.1 Info and Relationships | Minor |

**Summary:** The After version resolves all critical usability issues. Form validation is clear, input is preserved on error, labels are correctly positioned, and navigation is logical. Three lower-severity structural issues remain but do not significantly impede usability.

---

## 3. Axe-core Automation Results

> **Tool:** axe-core v4.11.2 via Playwright
> **Scan types:** Full page static scan + interactive flow scan scoped to \`#page\`

### Before Page — Axe-core Findings

| Rule ID | Impact | WCAG | Description | Elements Affected |
|---|---|---|---|---|
| \`image-alt\` | Critical | 1.1.1 | 24 \`<img>\` elements missing \`alt\` attribute | 24 |
| \`label\` | Critical | 4.1.2 | Form inputs have no associated \`<label>\` | 11 |
| \`select-name\` | Critical | 4.1.2 | \`<select>\` elements have no accessible name | 2 |
| \`html-has-lang\` | Serious | 3.1.1 | \`<html>\` element missing \`lang\` attribute | 1 |
| \`link-name\` | Serious | 2.4.4 | Navigation links contain no discernible text | 4 |
| \`landmark-one-main\` | Moderate | — | No \`<main>\` landmark defined | 1 |
| \`region\` | Moderate | — | 20+ elements outside landmark regions | 20+ |

**Total violations: 7** (3 Critical, 2 Serious, 2 Moderate)

**Flow scan:** 4 violations on initial load; 5 after keyboard interaction.

### After Page — Axe-core Findings

| Rule ID | Impact | WCAG | Description | Elements Affected |
|---|---|---|---|---|
| \`label-title-only\` | Serious | 1.3.1 | \`#cc\` field labeled via \`title\` only | 1 |
| \`landmark-one-main\` | Moderate | — | No \`<main>\` landmark defined | 1 |
| \`region\` | Moderate | — | 23 elements outside landmark regions | 23 |
| \`empty-table-header\` | Minor | 1.3.1 | First \`<th>\` in table has no discernible text | 1 |

**Total violations: 4** (0 Critical, 1 Serious, 2 Moderate, 1 Minor)

**Flow scan:** 0 violations on load; 0 after form submission.

---

## 4. AI Testing Results (GPT-5.5 — URL Only)

> **Model:** GPT-5.5 with web_search_preview
> **Method:** AI was given only the URL — no description, no WCAG checklist, no context
> **Date:** ${date}

### Before Page

**Score:** ${beforeReport.overall_score} / 10

**AI Summary:**
${beforeReport.summary}

**Strengths identified by AI:**
${beforeReport.strengths.map((s) => `- ${s}`).join("\n")}

**Top 3 priority fixes (AI recommendation):**
${beforeReport.top_priority_fixes.map((f, i) => `${i + 1}. ${f}`).join("\n")}

#### All Issues Found by AI (Before)

${renderIssueTable(beforeReport.issues)}

---

### After Page

**Score:** ${afterReport.overall_score} / 10

**AI Summary:**
${afterReport.summary}

**Strengths identified by AI:**
${afterReport.strengths.map((s) => `- ${s}`).join("\n")}

**Remaining issues noted by AI:**
${afterReport.top_priority_fixes.map((f, i) => `${i + 1}. ${f}`).join("\n")}

#### All Issues Found by AI (After)

${renderIssueTable(afterReport.issues)}

---

## 5. Comparative Analysis — All Three Methods

### Issue Detection Coverage

| Issue Type | Manual | Axe-core | AI |
|---|---|---|---|
| Missing image alt text | YES | YES | YES |
| Missing / incorrect form labels | YES | YES | YES |
| Missing lang attribute | YES | YES | YES |
| Empty / unclear links | YES | YES | YES |
| Missing landmark structure | YES | YES | YES |
| Labels below inputs (reading order) | YES | NO | Partial |
| Form data lost on error | YES | NO | NO |
| No error messages shown | YES | NO | Partial |
| Focus / tab order issues | YES | NO | NO |
| No skip navigation link | YES | NO | NO |
| Cognitive clarity of labels | YES | NO | Partial |
| Empty table header | YES | YES | YES |

### Issue Counts Side by Side

| Severity | Manual (Before) | Axe-core (Before) | AI (Before) |
|---|---|---|---|
| Critical | 3 | 3 | ${bc.Critical} |
| Serious | 4 | 2 | ${bc.Serious} |
| Moderate | 3 | 2 | ${bc.Moderate} |
| Minor | 0 | 0 | ${bc.Minor} |
| **Total** | **10** | **7** | **${beforeReport.issues.length}** |

| Severity | Manual (After) | Axe-core (After) | AI (After) |
|---|---|---|---|
| Critical | 0 | 0 | ${ac.Critical} |
| Serious | 0 | 1 | ${ac.Serious} |
| Moderate | 2 | 2 | ${ac.Moderate} |
| Minor | 1 | 1 | ${ac.Minor} |
| **Total** | **3** | **4** | **${afterReport.issues.length}** |

### Method Strengths & Limitations

| Method | Strengths | Limitations |
|---|---|---|
| **Manual** | Catches UX, cognitive, and interaction issues; tests real form behaviour | Slow, resource-intensive, subjective |
| **Axe-core** | Fast, consistent, CI/CD-friendly, precise WCAG rule IDs | Catches only ~30–40% of real issues; no interaction testing |
| **AI (URL-only)** | No setup required; plain-language explanations; useful first-pass | Cannot execute JS; cannot emulate screen readers |

### What Each Method Uniquely Detected

**Manual only:** Form data loss on failed submission, absence of error messages, non-logical tab order, no skip navigation link, colour-as-only-differentiator.

**Axe-core only:** Exact node counts with DOM paths, precise WCAG rule IDs for CI integration, flow scan detection of issues that only appear after keyboard interaction.

**AI only:** Plain-language narrative explanations useful for non-technical stakeholders, holistic first-pass audit with no tooling setup required.

---

## 6. Lessons Learned

1. **No single method is sufficient.** Each approach catches a distinct category of issues.
2. **Axe-core is strongest for structural DOM issues** — reliable, exact, and CI-friendly.
3. **Manual testing is irreplaceable for real user experience** — form data loss was found only manually.
4. **AI works well as a fast, zero-setup first pass** — useful for early-stage audits or non-technical stakeholders.
5. **The After page is not fully accessible** — all three methods still found remaining issues after remediation.
6. **Automated tools can produce false positives** — human judgement is still required to interpret results.

---

## 7. Conclusion

The Before page fails significantly across all three testing methods, with critical barriers for screen reader users, keyboard users, and anyone relying on clear error feedback. The After page resolves all critical issues and achieves strong WCAG 2.1 Level AA compliance, but minor issues remain across all methods.

**Automated testing tells you what is broken in the code. Manual testing tells you what is broken for the user. AI testing provides a fast, explainable bridge between the two.** A mature accessibility testing strategy should combine all three.

---

## 8. Appendix

| Item | Detail |
|---|---|
| Before URL | https://www.w3.org/WAI/demos/bad/before/survey.html |
| After URL | https://www.w3.org/WAI/demos/bad/after/survey.html |
| Axe-core version | v4.11.2 via Playwright |
| AI model | GPT-5.5 (web_search_preview enabled) |
| AI method | URL-only — no context or WCAG checklist provided |
| Manual method | Browser exploration, keyboard navigation, form interaction |
| Report generated | ${date} |

*AI section generated automatically. Manual and Axe-core sections completed by the project team.*
`;
}

// Main

async function main(): Promise<void> {
  const resultsDir = path.join(__dirname, "results");
  fs.mkdirSync(resultsDir, { recursive: true });

  const beforeReport = await testPage(PAGES[0]);
  const afterReport  = await testPage(PAGES[1]);

  fs.writeFileSync(
    path.join(resultsDir, "before_ai_report_gpt-5.5.json"),
    JSON.stringify(beforeReport, null, 2),
    "utf8"
  );
  fs.writeFileSync(
    path.join(resultsDir, "after_ai_report_gpt-5.5.json"),
    JSON.stringify(afterReport, null, 2),
    "utf8"
  );

  const md = generateFullReport(beforeReport, afterReport);
  const mdPath = path.join(resultsDir, "final_comparison_report_gpt-5.5.md");
  fs.writeFileSync(mdPath, md, "utf8");
  console.log("\nDone!");
  console.log(`AI responses : ai_responses/`);
  console.log(`JSON reports : results/before_ai_report_gpt-5.5.json`);
  console.log(`               results/after_ai_report_gpt-5.5.json`);
  console.log(`Final report : results/final_comparison_report.md`);
}

main().catch((err: Error) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});