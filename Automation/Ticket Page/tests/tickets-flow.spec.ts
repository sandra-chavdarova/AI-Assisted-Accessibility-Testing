import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const resultsDir = path.join(process.cwd(), 'test-results');
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);

test('Tickets BEFORE - Keyboard navigation flow', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/demos/bad/before/tickets.html');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  const scan = await new AxeBuilder({ page }).analyze();

  fs.writeFileSync(
    path.join(resultsDir, 'tickets-before-flow.json'),
    JSON.stringify(scan, null, 2)
  );

  console.log(`Before flow violations: ${scan.violations.length}`);
});

test('Tickets AFTER - Keyboard navigation flow', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/demos/bad/after/tickets.html');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  const scan = await new AxeBuilder({ page }).analyze();

  fs.writeFileSync(
    path.join(resultsDir, 'tickets-after-flow.json'),
    JSON.stringify(scan, null, 2)
  );

  console.log(`After flow violations: ${scan.violations.length}`);
});