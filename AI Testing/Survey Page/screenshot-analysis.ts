import * as dotenv from 'dotenv';
dotenv.config();
import { sendPromptWithImage } from './ai-client.js';
import * as fs from 'fs';
import * as path from 'path';

const traps = [

  // Full-page screenshots
  {
    id: 'full-page-before',
    type: 'FULL_PAGE' as const,
    image: 'survey-before.png',
    groundTruth:
      'Inaccessible version. Known issues: radio buttons and select dropdown ' +
      'have no <label> elements, radio group lacks <fieldset>/<legend>, ' +
      'table row headers ("love it"/"hate it") use <td>+<strong> instead of ' +
      '<th>, newsletter inputs are unlabelled, no form instructions. ' +
      'AI should surface multiple serious/critical issues.',
  },

  {
    id: 'full-page-after',
    type: 'FULL_PAGE' as const,
    image: 'survey-after.png',
    groundTruth:
      'Accessible version. All inputs labelled, radio groups use ' +
      '<fieldset>/<legend>, table uses proper <th> elements, instructions ' +
      'present. AI should report no significant issues.',
  },

  // Cropped FALSE POSITIVE traps (valid UI — should not be flagged)
  {
    id: 'false-positive-fieldset',
    type: 'FALSE+' as const,
    image: 'survey-after-false-positive.png',
    groundTruth:
      'Correctly implemented radio group: <fieldset> with <legend> "Favorite ' +
      'Park" provides the group label, and each radio input is wrapped in a ' +
      '<label>. No accessibility issue. AI should not flag this.',
  },

  {
    id: 'false-positive-table',
    type: 'FALSE+' as const,
    image: 'survey-after-false-positive-2.png',
    groundTruth:
      'Correctly implemented data table: row headers "hate it"/"love it" use ' +
      '<th scope="row"> and column headers (Lung, Pancreas, etc.) use ' +
      '<th scope="col">. No accessibility issue. AI should not flag this.',
  },

  // Cropped REAL traps (genuine issues)
  {
    id: 'table-missing-th',
    type: 'REAL' as const,
    image: 'survey-before-issue-present.png',
    groundTruth:
      'Row headers "love it" and "hate it" are marked up with <p>+<strong> ' +
      'inside a <td>, not with <th scope="row"> elements. Screen readers ' +
      'cannot associate data cells with their row context. ' +
      'Fails WCAG 1.3.1 (Info and Relationships).',
  },

  {
    id: 'select-no-label',
    type: 'REAL' as const,
    image: 'survey-before-issue-present-2.png',
    groundTruth:
      'The <select> dropdown (QUICKMENU) has no <label> element, no title ' +
      'attribute, and no aria-label. Screen readers announce it without any ' +
      'meaningful name. Fails WCAG 1.3.1 and 4.1.2 (Name, Role, Value).',
  },

  {
    id: 'newsletter-unlabelled-inputs',
    type: 'REAL' as const,
    image: 'survey-before-issue-present-3.png',
    groundTruth:
      'Multiple issues: (1) "Name:", "eMail Address", and "Retype eMail" are ' +
      'plain text nodes, not <label> elements linked to their inputs. ' +
      '(2) Mr./Mrs. radio buttons also lack <label> elements. ' +
      '(3) Tab/DOM order does not match visual layout. ' +
      'Fails WCAG 1.3.1 and 3.3.2.',
  },

] as const;

type Trap = (typeof traps)[number];

// Prompt — identical for every trap, the image is the only variable
const AUDIT_PROMPT =
  `Examine this screenshot of a web page (or web-page section) and identify ` +
  `every accessibility problem that is visible.\n\n` +
  `If you find NO issues, say so explicitly and explain why the UI appears ` +
  `accessible.\n\n` +
  `For each issue you DO find, provide:\n` +
  `- Issue name\n` +
  `- Severity: critical | serious | moderate | minor\n` +
  `- WCAG 2.1 criterion violated\n` +
  `- Why it is a problem for users\n` +
  `- How to fix it`;

// Run a single trap
async function runTrap(trap: Trap): Promise<string> {
  const imagePath = path.join(process.cwd(), 'screenshots', trap.image);

  if (!fs.existsSync(imagePath)) {
    return `[ERROR] Image not found: ${imagePath}`;
  }

  const base64 = fs.readFileSync(imagePath).toString('base64');
  return sendPromptWithImage(AUDIT_PROMPT, base64, 'image/png');
}

// Scoring
function scoreTrap(trap: Trap, response: string): string {
  const r = response.toLowerCase();

  const looksClean =
    r.includes('no issue') ||
    r.includes('no significant') ||
    r.includes('no accessibility') ||
    r.includes('no problem') ||
    r.includes('appears accessible') ||
    r.includes('correctly') ||
    r.includes('valid');

  const foundIssue =
    r.includes('label') ||
    r.includes('wcag') ||
    r.includes('fieldset') ||
    r.includes('legend') ||
    r.includes('association') ||
    r.includes('unlabelled') ||
    r.includes('unlabeled') ||
    r.includes('missing') ||
    r.includes('no label') ||
    r.includes('th') ||
    r.includes('header') ||
    r.includes('scope');

  // FALSE+ and accessible full-page
  if (
    trap.type === 'FALSE+' ||
    (trap.type === 'FULL_PAGE' && trap.id === 'full-page-after')
  ) {
    return looksClean
      ? 'Correct – did not false-positive'
      : 'False positive – flagged valid UI';
  }

  // REAL and inaccessible full-page
  return foundIssue ? 'Issue identified' : 'Missed';
}

// Main
async function main() {
  console.log('Starting visual screenshot trap experiment…\n');

  let report = `# Visual Screenshot Accessibility Trap Analysis\n\n`;
  report += `> Screenshots are taken from the W3C "Before and After" demo:\n`;
  report += `> - Inaccessible: https://www.w3.org/WAI/demos/bad/before/survey.html\n`;
  report += `> - Accessible:   https://www.w3.org/WAI/demos/bad/after/survey.html\n\n`;
  report += `> The AI receives **only the image** — no type label, no ground truth.\n\n`;
  report += `---\n\n`;

  let scoreTable = `## Score Summary\n\n`;
  scoreTable += `| ID | Type | Result |\n`;
  scoreTable += `|----|------|--------|\n`;

  for (const trap of traps) {
    console.log(`Running trap: ${trap.id} (${trap.type})…`);
    const response = await runTrap(trap);
    const score = scoreTrap(trap, response);

    scoreTable += `| ${trap.id} | ${trap.type} | ${score} |\n`;

    report += `## ${trap.id} — ${trap.type}\n\n`;
    report += `**Image:** \`${trap.image}\`\n\n`;
    report += `**Ground truth:** ${trap.groundTruth}\n\n`;
    report += `**AI Response:**\n\n${response}\n\n`;
    report += `**Score:** ${score}\n\n`;
    report += `---\n\n`;

    console.log(`${score}\n`);
  }

  const finalReport = report + scoreTable;
  const outputPath = path.join(process.cwd(), 'visual-trap-experiment-report.md');
  fs.writeFileSync(outputPath, finalReport);
  console.log(`\nReport saved to ${outputPath}`);
}

main();