import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const pages = [
  {
    name: 'tickets-before-flow',
    url: 'https://www.w3.org/WAI/demos/bad/before/tickets.html',
  },
  {
    name: 'tickets-after-flow',
    url: 'https://www.w3.org/WAI/demos/bad/after/tickets.html',
  },
];

const resultsDir = path.join(process.cwd(), 'test-results');

if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
}

for (const p of pages) {

  test(`Keyboard navigation flow: ${p.name}`, async ({ page }) => {

    await page.goto(p.url);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });

    expect(focusedElement).not.toBeNull();

    const scan = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a'])
        .include('#page')
        .analyze();

    fs.writeFileSync(
        path.join(resultsDir, `${p.name}.json`),
        JSON.stringify(scan, null, 2)
    );

    console.log(`${p.name} violations: ${scan.violations.length}`);

    expect(scan.violations).toBeDefined();
    expect(scan.passes).toBeDefined();

    if (p.name === 'tickets-after-flow') {
      expect(scan.violations).toHaveLength(0);
    }

  });
}