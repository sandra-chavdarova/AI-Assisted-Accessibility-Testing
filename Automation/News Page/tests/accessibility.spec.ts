import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
    { name: 'news-before', url: 'https://www.w3.org/WAI/demos/bad/before/news.html' },
    { name: 'news-after',  url: 'https://www.w3.org/WAI/demos/bad/after/news.html' },
];

for (const p of pages) {
    test(`Accessibility scan: ${p.name}`, async ({ page }) => {
        await page.goto(p.url);

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .include('#page')
            .analyze();

        results.violations.forEach(v => {
            console.log(`[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}`);
            v.nodes.forEach(n => console.log(`  → ${n.html}`));
        });

        expect(results.violations).toHaveLength(0);
    });
}