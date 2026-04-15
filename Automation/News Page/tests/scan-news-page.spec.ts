import { test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import * as fs from 'fs';

test('Scan NEWS - BEFORE', async ({ page }) => {
    await page.goto('https://www.w3.org/WAI/demos/bad/before/news.html');

    const results = await new AxeBuilder({ page }).analyze();

    fs.writeFileSync(
        'news-before.json',
        JSON.stringify(results.violations, null, 2)
    );
});

test('Scan NEWS - AFTER', async ({ page }) => {
    await page.goto('https://www.w3.org/WAI/demos/bad/after/news.html');

    const results = await new AxeBuilder({ page }).analyze();

    fs.writeFileSync(
        'news-after.json',
        JSON.stringify(results.violations, null, 2)
    );
});