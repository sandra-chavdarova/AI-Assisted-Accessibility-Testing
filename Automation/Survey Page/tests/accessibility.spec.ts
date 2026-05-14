import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { name: 'survey-before', url: 'https://www.w3.org/WAI/demos/bad/before/survey.html' },
  { name: 'survey-after',  url: 'https://www.w3.org/WAI/demos/bad/after/survey.html' },
];

for (const p of pages) {
  test(`Accessibility scan: ${p.name}`, async ({ page }) => {
    await page.goto(p.url);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .include('#page')
      .analyze();

    // Print violations
    results.violations.forEach(v => {
      console.log(`[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}`);
      v.nodes.forEach(n => console.log(`  → ${n.html}`));
    });

    // Real assertion
    expect(results.violations).toHaveLength(0);
  });
}