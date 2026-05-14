import * as dotenv from 'dotenv';
dotenv.config();
import { sendPrompt } from './ai-client.js';
import * as fs from 'fs';
import * as path from 'path';

const traps = [
  // REAL traps (genuine issues from the inaccessible page)

  {
    id: 'radio-no-label',
    type: 'REAL',
    groundTruth:
      'Radio button has no <label> element and is not associated with its ' +
      'visible text "None". Fails WCAG 3.3.2 (Labels or Instructions) and 1.3.1.',
    snippet:
      `<input class="lign" type="radio" name="res" value="1">`,
  },

  {
    id: 'select-no-label',
    type: 'REAL',
    groundTruth:
      'Select box has no <label> element and no title attribute.',
    snippet:
    `<select name="cc">
      <option value="">select a city -----&gt;</option>
      <option value="af">Afghanistan, Kabul</option>
      <option value="al">Albania, Tirana</option>
      <option value="dz">Algeria, Algiers</option>
    </select>`,
  },

  // MULTI traps (multiple issues in one snippet)

  {
    id: 'multi-radio-group',
    type: 'MULTI',
    groundTruth:
      'Three problems: ' +
      '1. radio inputs have no <label> elements, ' +
      '2. the group has no <fieldset>/<legend> to convey the question "Which is your favorite city park?", ' +
      '3. values "1–6" give screen readers no context about the option text.',
    snippet:
    `Which is your favorite city park?
    <input class="lign" type="radio" name="res" value="1"> None
    <input class="lign" type="radio" name="res" value="2"> Central Park
    <input class="lign" type="radio" name="res" value="3"> Grand Park
    <input class="lign" type="radio" name="res" value="4"> Jurassic Park
    <input class="lign" type="radio" name="res" value="5"> South Park
    <input class="lign" type="radio" name="res" value="6"> Other`,
  },

  {
    id: 'multi-newsletter-fields',
    type: 'MULTI',
    groundTruth:
      'Three problems: ' +
      '1. text inputs have no <label> elements — "eMail Address", "Name", and "Retype eMail" are plain text nodes not programmatically linked, ' +
      '2. the DOM/tab order does not match the visual layout, ' +
      '3. the radio buttons (Mr./Mrs.) are also unlabelled.',
    snippet:
    `<table>
      <tr>
        <td>Name: <input type="radio" name="title" value="mr"> Mr. <input type="radio" name="title" value="mrs"> Mrs.</td>
        <td><input type="text" name="email" size="20"></td>
        <td>eMail Address</td>
        <td><input type="text" name="name" size="20"></td>
        <td>Retype eMail</td>
        <td><input type="text" name="remail" size="20"></td>
      </tr>
    </table>`,
  },

  {
    id: 'multi-results-table',
    type: 'MULTI',
    groundTruth:
      'Two problems: ' +
      '1. row headers ("love it" / "hate it") are marked up with <p> and <strong> inside a <td>, not with <th> elements, ' +
      '2. the header cell spans multiple rows via rowspan but still lacks scope or id/headers wiring. ' +
      'Fails WCAG 1.3.1 (Info and Relationships).',
    snippet:
    `<table>
      <tr>
        <td rowspan="4" style="border-right: 1px dashed silver;">
          <p style="background:#DBDBDB;"><br></p>
          <p style="margin-bottom:0px;" align="right"><strong>love it</strong></p>
          <p style="margin-top:5px;background:#DBDBDB;" align="right"><strong>hate it</strong></p>
        </td>
        <td><strong>Lung</strong></td>
        <td><strong>Pancreas</strong></td>
        <td><strong>Spleen</strong></td>
        <td><strong>Liver</strong></td>
        <td><strong>Skin</strong></td>
        <td><strong>Brain</strong></td>
      </tr>
      <tr>
        <td>5</td><td>6</td><td>0</td><td>14</td><td>1</td><td>0</td>
      </tr>
      <tr>
        <td>4</td><td>10</td><td>4</td><td>0</td><td>1</td><td>0</td>
      </tr>
    </table>`,
  },

  // FALSE POSITIVE traps (valid HTML from the accessible "after" page)
  {
    id: 'false-positive-fieldset-legend',
    type: 'FALSE+',
    groundTruth:
      'Fully valid. Radio buttons are correctly grouped with <fieldset> and described ' +
      'by a <legend>. Each input is associated with a <label>. No issue here.',
    snippet:
    `<fieldset>
      <legend>Favorite Park</legend>
      <p>Which is your favorite city park?</p>
      <label><input type="radio" name="park" value="none"> None</label>
      <label><input type="radio" name="park" value="central"> Central Park</label>
      <label><input type="radio" name="park" value="grand"> Grand Park</label>
      <label><input type="radio" name="park" value="jurassic"> Jurassic Park</label>
      <label><input type="radio" name="park" value="south"> South Park</label>
      <label><input type="radio" name="park" value="other"> Other</label>
    </fieldset>`,
  },

  {
    id: 'false-positive-select-labelled',
    type: 'FALSE+',
    groundTruth:
      'Fully valid. The select is correctly associated with a <label> via for/id. ' +
      'Options are grouped with <optgroup> for keyboard usability. No issue here.',
    snippet:
    `<label for="cc">Which city do you find is the greenest?</label>
    <select name="cc" id="cc">
      <option value="">select a city from this list</option>
      <optgroup label="A">
        <option value="ae-ad">Abu Dhabi, United Arab Emirates</option>
        <option value="ng-ab">Abuja, Nigeria</option>
      </optgroup>
      <optgroup label="B">
        <option value="ir-bg">Baghdad, Iraq</option>
        <option value="az-ba">Baku, Azerbaijan</option>
      </optgroup>
    </select>`,
  },

  // CALIBRATION traps (issue present, but severity must be assessed correctly)
  {
    id: 'calibrate-form-no-instructions',
    type: 'CALIBRATE',
    groundTruth:
      'Moderate. The form has no instructions telling users which fields are required or ' +
      'how to complete it. This is a real WCAG 3.3.2 violation but should be rated ' +
      'moderate, not critical — users can still attempt submission and receive errors.',
    snippet:
    `<form action="/survey" method="post">
      <h2>This Week's Survey: More city parks - a pain or a gain?</h2>
      <input type="radio" name="res" value="1"> None
      <input type="radio" name="res" value="2"> Central Park
      <input type="submit" value="Submit">
    </form>`,
  },

  {
    id: 'calibrate-select-sort-order',
    type: 'CALIBRATE',
    groundTruth:
      'Minor only. The list is sorted by country name rather than by city name, ' +
      'making it harder to find a city. This is a usability concern and a minor ' +
      'WCAG 2.1.1 issue (keyboard navigation of a long ungrouped list). ' +
      'Should NOT be rated critical or serious.',
    snippet:
    `<select name="cc">
      <option value="">select a city -----&gt;</option>
      <option value="af">Afghanistan, Kabul</option>
      <option value="al">Albania, Tirana</option>
      <option value="dz">Algeria, Algiers</option>
      <option value="ad">Andorra, Andorra la Vella</option>
    </select>`,
  },
];

async function runTrap(trap: typeof traps[0]): Promise<string> {
  const prompt =
    `Examine this HTML snippet and identify every accessibility problem present.\n\n` +
    `\`\`\`html\n${trap.snippet}\n\`\`\`\n\n` +
    `If you find no issues, say so explicitly and explain why the code is valid.\n\n` +
    `For each issue provide:\n` +
    `- Issue name\n` +
    `- Severity: critical | serious | moderate | minor\n` +
    `- WCAG criterion violated\n` +
    `- Why it is a problem\n` +
    `- How to fix it`;
  return sendPrompt(prompt);
}

function scoreTrap(trap: typeof traps[0], response: string): string {
  const r = response.toLowerCase();

  if (trap.type === 'FALSE+') {
    const passedCorrectly =
      r.includes('no issue') ||
      r.includes('valid') ||
      r.includes('no accessibility') ||
      r.includes('no problem') ||
      r.includes('correctly') ||
      r.includes('accessible');
    return passedCorrectly
      ? 'Correct – did not false-positive'
      : 'False positive – flagged valid code';
  }

  if (trap.type === 'CALIBRATE') {
    const overReported = r.includes('critical') || r.includes('serious');
    if (trap.id === 'calibrate-form-no-instructions') {
      return overReported ? 'Over-reported severity' : 'Severity calibrated correctly';
    }
    if (trap.id === 'calibrate-select-sort-order') {
      return overReported ? 'Over-reported severity' : 'Severity calibrated correctly';
    }
  }

  if (trap.type === 'MULTI') {
    const checks: Record<string, string[]> = {
      'multi-radio-group':       ['label', 'fieldset', 'legend'],
      'multi-newsletter-fields': ['label', 'order', 'sequence'],
      'multi-results-table':     ['th', 'header', 'scope'],
    };
    const keywords = checks[trap.id] ?? [];
    const found = keywords.filter((kw) => r.includes(kw));
    return `Found ${found.length}/${keywords.length} problems: ${found.join(', ') || 'none'}`;
  }

  // REAL traps
  const caught =
    r.includes('label') ||
    r.includes('wcag') ||
    r.includes('accessible') ||
    r.includes('title');
  return caught ? 'Issue identified' : 'Missed';
}

async function main() {
  console.log('Starting W3C BAD demo experiment...\n');

  let report = `# Accessibility Trap Analysis – W3C BAD Demo Survey Pages\n\n`;
  report += `> Snippets are taken from the W3C "Before and After" demonstration:\n`;
  report += `> - Inaccessible: https://www.w3.org/WAI/demos/bad/before/survey.html\n`;
  report += `> - Accessible:   https://www.w3.org/WAI/demos/bad/after/survey.html\n`;
  report += `> - Annotations:  https://www.w3.org/WAI/demos/bad/before/annotated/survey.html\n\n`;
  report += `> Comments that hint at issues were stripped from all snippets.\n\n`;
  report += `---\n\n`;

  let scoreTable = `## Score Summary\n\n`;
  scoreTable += `| ID | Type | Result |\n`;
  scoreTable += `|----|------|--------|\n`;

  for (const trap of traps) {
    console.log(`Running trap: ${trap.id} (${trap.type})...`);
    const response = await runTrap(trap);
    const score = scoreTrap(trap, response);

    scoreTable += `| ${trap.id} | ${trap.type} | ${score} |\n`;

    report += `## ${trap.id} — ${trap.type}\n\n`;
    report += `**Ground truth:** ${trap.groundTruth}\n\n`;
    report += `**Snippet:**\n\`\`\`html\n${trap.snippet}\n\`\`\`\n\n`;
    report += `**AI Response:**\n\n${response}\n\n`;
    report += `**Score:** ${score}\n\n`;
    report += `---\n\n`;

    console.log(`  ${score}\n`);
  }

  const finalReport = report + scoreTable;
  const outputPath = path.join(process.cwd(), 'basic-experiment-gpt-5.5.md');
  fs.writeFileSync(outputPath, finalReport);
  console.log(`\nReport saved to ${outputPath}`);
}

main();