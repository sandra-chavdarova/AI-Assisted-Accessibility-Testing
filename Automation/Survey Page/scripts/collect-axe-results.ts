import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const pages = [
  { name: 'survey-before', url: 'https://www.w3.org/WAI/demos/bad/before/survey.html' },
  { name: 'survey-after',  url: 'https://www.w3.org/WAI/demos/bad/after/survey.html' },
];

async function collectAxeResults() {
  const browser = await chromium.launch();
  const context = await browser.newContext(); // ← add this
  const page = await context.newPage();       // ← change this

  for (const p of pages) {
    await page.goto(p.url);
    const results = await new AxeBuilder({ page }).analyze();
    const outputPath = path.join('test-results', `${p.name}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`Results saved to ${outputPath}`);
  }

  await browser.close();
}

collectAxeResults();