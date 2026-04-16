import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const pages = [
  {
    name: 'tickets-before',
    url: 'https://www.w3.org/WAI/demos/bad/before/tickets.html',
  },
  {
    name: 'tickets-after',
    url: 'https://www.w3.org/WAI/demos/bad/after/tickets.html',
  },
];

const resultsDir = path.join(process.cwd(), 'test-results');
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);

for (const p of pages) {
  test(`Tickets accessibility: ${p.name}`, async ({ page }) => {
    await page.goto(p.url);

    const results = await new AxeBuilder({ page }).analyze();

    const filePath = path.join(resultsDir, `${p.name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

    console.log(`${p.name} violations: ${results.violations.length}`);
  });
}