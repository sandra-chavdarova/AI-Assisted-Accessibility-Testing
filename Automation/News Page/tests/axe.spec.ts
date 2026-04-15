import { test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('Accessibility scan', async ({ page }) => {
    await page.goto('https://www.chatgpt.com');

    const results = await new AxeBuilder({ page }).analyze();

    console.log(results.violations);
});