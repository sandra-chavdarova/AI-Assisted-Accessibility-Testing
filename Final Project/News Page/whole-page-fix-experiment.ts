import * as dotenv from 'dotenv';
dotenv.config();
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import OpenAI from 'openai';
import { JSDOM } from 'jsdom';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const URL = 'https://www.w3.org/WAI/demos/bad/before/news.html';
const MODELS     = ['gpt-4o', 'gpt-5.5'] as const;

type Model = typeof MODELS[number];

// Fetch HTML
function fetchHTML(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? https : http;
        lib.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => resolve(data));
            res.on('error', reject);
        });
    });
}

// Extract #page content only
function extractPageContent(html: string): string {
    const dom = new JSDOM(html);
    const pageEl = dom.window.document.getElementById('page');
    if (!pageEl) {
        console.warn('Warning: #page element not found — sending full HTML');
        return html;
    }
    return pageEl.outerHTML;
}

// Prompt
function buildFixPrompt(html: string): string {
    return `Below is the HTML of a news page that contains multiple accessibility violations.

Your task:
1. Identify every accessibility issue in this HTML
2. Fix ALL of them directly in the code
3. Return the fully corrected HTML
4. After the HTML, provide a structured report listing every fix you made

Format your response EXACTLY like this — no deviation:

===FIXED_HTML_START===
[corrected HTML here]
===FIXED_HTML_END===

===REPORT_START===
[
  {
    "issue_id": "1",
    "wcag_criterion": "e.g. 1.1.1 Non-text Content",
    "wcag_level": "A",
    "severity": "Critical | Serious | Moderate | Minor",
    "element": "the element that was fixed",
    "problem": "what was wrong",
    "fix_applied": "what you changed and why"
  }
]
===REPORT_END===

HTML to fix:
${html}`;
}

// Types
interface FixEntry {
    issue_id: string;
    wcag_criterion: string;
    wcag_level: string;
    severity: string;
    element: string;
    problem: string;
    fix_applied: string;
}

interface SeverityCounts {
    Critical: number;
    Serious: number;
    Moderate: number;
    Minor: number;
}

// Parse AI response
function parseResponse(raw: string): { fixedHTML: string; fixes: FixEntry[] } {
    const htmlMatch   = raw.match(/===FIXED_HTML_START===([\s\S]*?)===FIXED_HTML_END===/);
    const reportMatch = raw.match(/===REPORT_START===([\s\S]*?)===REPORT_END===/);

    if (!htmlMatch)   throw new Error('Could not find fixed HTML in response');
    if (!reportMatch) throw new Error('Could not find fix report in response');

    const fixedHTML = htmlMatch[1]
        .trim()
        .replace(/^```[a-z]*\n?/, '')
        .replace(/\n?```$/, '')
        .trim();
    const cleaned   = reportMatch[1].trim().replace(/```json\n?|```\n?/g, '');

    let fixes: FixEntry[];
    try {
        fixes = JSON.parse(cleaned);
    } catch {
        console.error('Raw report section:\n', reportMatch[1]);
        throw new Error('Failed to parse fix report JSON');
    }

    return { fixedHTML, fixes };
}

// Count by severity
function countBySeverity(fixes: FixEntry[]): SeverityCounts {
    return {
        Critical: fixes.filter(f => f.severity === 'Critical').length,
        Serious:  fixes.filter(f => f.severity === 'Serious').length,
        Moderate: fixes.filter(f => f.severity === 'Moderate').length,
        Minor:    fixes.filter(f => f.severity === 'Minor').length,
    };
}

// Generate per-model report
function generateModelReport(model: Model, fixes: FixEntry[]): string {
    const date   = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    const counts = countBySeverity(fixes);

    const fixRows = fixes.map(f =>
        `| ${f.issue_id} | ${f.severity} | ${f.wcag_criterion} | ${f.wcag_level} | ${f.element} | ${f.problem} | ${f.fix_applied} |`
    ).join('\n');

    return `# AI Whole-Page Fix Report — News Page

**Date:** ${date}
**Model:** ${model}
**Method:** Raw HTML extracted from #page — AI asked to identify and fix all issues
**Source URL:** ${URL}

---

## Fix Summary

| Severity | Count |
|---|---|
| Critical | ${counts.Critical} |
| Serious  | ${counts.Serious} |
| Moderate | ${counts.Moderate} |
| Minor    | ${counts.Minor} |
| **Total** | **${fixes.length}** |

---

## All Fixes Applied

| # | Severity | WCAG Criterion | Level | Element | Problem | Fix Applied |
|---|---|---|---|---|---|---|
${fixRows}
`;
}

// Generate comparison report
function generateComparisonReport(
    results: Record<Model, { fixes: FixEntry[] }>
): string {
    const date   = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    const counts = Object.fromEntries(
        MODELS.map(m => [m, countBySeverity(results[m].fixes)])
    ) as Record<Model, SeverityCounts>;

    const severities = ['Critical', 'Serious', 'Moderate', 'Minor'] as const;

    const countRows = severities.map(s =>
        `| ${s} | ${counts['gpt-4o'][s]} | ${counts['gpt-5.5'][s]} |`
    ).join('\n');

    // Issues caught by one model but not the other
    const gpt4Criteria  = new Set(results['gpt-4o'].fixes.map(f => f.wcag_criterion));
    const gpt55Criteria = new Set(results['gpt-5.5'].fixes.map(f => f.wcag_criterion));

    const onlyIn4o = results['gpt-4o'].fixes.filter(f => !gpt55Criteria.has(f.wcag_criterion));
    const onlyIn55 = results['gpt-5.5'].fixes.filter(f => !gpt4Criteria.has(f.wcag_criterion));

    const onlyIn4oRows = onlyIn4o.length
        ? onlyIn4o.map(f => `| ${f.wcag_criterion} | ${f.severity} | ${f.element} | ${f.problem} |`).join('\n')
        : '| — | — | — | No unique fixes |';

    const onlyIn55Rows = onlyIn55.length
        ? onlyIn55.map(f => `| ${f.wcag_criterion} | ${f.severity} | ${f.element} | ${f.problem} |`).join('\n')
        : '| — | — | — | No unique fixes |';

    return `# Model Comparison Report — Whole-Page Fix (News Page)

**Date:** ${date}
**Models compared:** gpt-4o vs gpt-5.5
**Method:** Same HTML sent to both models — same prompt, same system role
**Source URL:** ${URL}

---

## Approach

The \`#page\` HTML from the Before news page was extracted and sent identically to both models.
No descriptions, no axe-core results, and no WCAG checklist were provided.
This tests whether the model itself — not the prompt — determines fix quality.

---

## Fix Count Comparison

| Severity | gpt-4o | gpt-5.5 |
|---|---|---|
${countRows}
| **Total** | **${results['gpt-4o'].fixes.length}** | **${results['gpt-5.5'].fixes.length}** |

---

## Issues Fixed Only by gpt-4o

| WCAG Criterion | Severity | Element | Problem |
|---|---|---|---|
${onlyIn4oRows}

---

## Issues Fixed Only by gpt-5.5

| WCAG Criterion | Severity | Element | Problem |
|---|---|---|---|
${onlyIn55Rows}

---

## Key Observations

- gpt-4o applied **${results['gpt-4o'].fixes.length}** fixes
- gpt-5.5 applied **${results['gpt-5.5'].fixes.length}** fixes
- gpt-4o found **${onlyIn4o.length}** issues that gpt-5.5 did not
- gpt-5.5 found **${onlyIn55.length}** issues that gpt-4o did not

---

## Notes

- Each model's corrected HTML is saved separately for independent axe-core validation
- Cross-reference with axe-core and manual findings to evaluate completeness
- Compare corrected HTML files against the real W3C after page as ground truth
`;
}

// Run one model
async function runModel(model: Model, pageHTML: string, outDir: string): Promise<FixEntry[]> {
    console.log(`\nRunning: ${model}`);

    const response = await client.chat.completions.create({
        model,
        messages: [
            {
                role: 'system',
                content: 'You are a web accessibility engineer. You identify and fix accessibility violations directly in HTML code.',
            },
            {
                role: 'user',
                content: buildFixPrompt(pageHTML),
            },
        ],
    });

    const raw = response.choices[0].message.content ?? '';

    fs.writeFileSync(path.join(outDir, `${model}-raw-response.txt`), raw, 'utf8');

    const { fixedHTML, fixes } = parseResponse(raw);

    console.log(`  ${model} applied ${fixes.length} fixes`);

    fs.writeFileSync(path.join(outDir, `news-fixed-${model}.html`), fixedHTML, 'utf8');
    fs.writeFileSync(path.join(outDir, `report-${model}.md`), generateModelReport(model, fixes), 'utf8');
    fs.writeFileSync(path.join(outDir, `fixes-${model}.json`), JSON.stringify(fixes, null, 2), 'utf8');

    console.log(`  Saved: news-fixed-${model}.html`);
    console.log(`  Saved: report-${model}.md`);
    console.log(`  Saved: fixes-${model}.json`);

    return fixes;
}

// Main
async function main(): Promise<void> {
    const outDir = path.join(process.cwd(), 'ai-responses')
    fs.mkdirSync(outDir, { recursive: true });

    console.log('Fetching  page HTML...');
    const rawHTML  = await fetchHTML(URL);
    const pageHTML = extractPageContent(rawHTML);

    fs.writeFileSync(path.join(outDir, 'news-extracted.html'), pageHTML, 'utf8');
    console.log(`Extracted #page content (${pageHTML.length} chars)`);

    const results = {} as Record<Model, { fixes: FixEntry[] }>;

    for (const model of MODELS) {
        const fixes    = await runModel(model, pageHTML, outDir);
        results[model] = { fixes };
    }

    // Save comparison report
    const comparison = generateComparisonReport(results);
    fs.writeFileSync(path.join(outDir, 'comparison-report.md'), comparison, 'utf8');

    console.log('\n Done. Output in ai-responses/');
    for (const m of MODELS) {
        console.log(`  news-fixed-${m}.html`);
        console.log(`  report-${m}.md`);
        console.log(`  fixes-${m}.json`);
    }
    console.log('  comparison-report.md         — side by side model comparison');
}

main().catch((err: Error) => {
    console.error('Fatal error:', err.message);
    process.exit(1);
});