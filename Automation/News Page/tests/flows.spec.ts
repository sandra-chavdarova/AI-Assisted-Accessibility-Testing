import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const URL = 'https://www.w3.org/WAI/demos/bad/after/news.html';
const versions = [
    {
        name: 'before',
        url: 'https://www.w3.org/WAI/demos/bad/before/news.html',
    },
    {
        name: 'after',
        url: 'https://www.w3.org/WAI/demos/bad/after/news.html',
    },
];

for (const v of versions) {

    test(`(${v.name}) News - heading structure is logical`, async ({ page }) => {
        await page.goto(v.url);
        const main = page.locator('#page');

        const h1Count = await main.locator('h1').count();
        expect(h1Count).toBe(1);

        const h2Count = await main.locator('h2').count();
        expect(h2Count).toBeGreaterThan(0);

        // Collect all headings in DOM order with their level
        const headings = await main.locator('h1, h2, h3, h4, h5, h6').evaluateAll(
            els => els.map(el => parseInt(el.tagName.replace('H', '')))
        );

        for (let i = 1; i < headings.length; i++) {
            const current = headings[i];
            const previous = headings[i - 1];

            if (current > previous) {
                expect(current - previous).toBeLessThanOrEqual(1);
            }
        }
    });

    test(`(${v.name})News - all images have alt attribute`, async ({page}) => {
        await page.goto(v.url);
        const images = page.locator('#page img');
        const imgCount = await images.count();
        expect(imgCount).toBeGreaterThan(0);

        for (let i = 0; i < imgCount; i++) {
            const alt = await images.nth(i).getAttribute('alt');
            const src = await images.nth(i).getAttribute('src') ?? `index ${i}`;

            expect(alt, `Image "${src}" is missing the alt attribute entirely`).not.toBeNull(); // empty string ("") is valid for decorative images, only null fails here
        }
    });

    test(`(${v.name}) News - inner skip link moves focus into news content`, async ({ page, browserName }) => {
        await page.goto(v.url);

        const outerSkipLink = page.getByRole('link', { name: /skip to/i }).first();
        await outerSkipLink.focus();
        await expect(outerSkipLink).toBeFocused();

        if (browserName === 'webkit') {
            await outerSkipLink.click();
        } else {
            await outerSkipLink.press('Enter');
        }

        const innerSkipLink = page
            .locator('#page')
            .getByRole('link', { name: /skip to content/i })
            .first();

        const innerSkipExists = await innerSkipLink.count() > 0;

        if (!innerSkipExists) {
            test.fail(true, 'Inner skip link not found — before page is missing skip navigation');
            return;
        }

        await expect(innerSkipLink).toBeVisible();
        await innerSkipLink.focus();
        await expect(innerSkipLink).toBeFocused();

        if (browserName === 'webkit') {
            await innerSkipLink.click();
        } else {
            await innerSkipLink.press('Enter');
        }

        const focusedElementId = await page.evaluate(() => document.activeElement?.id ?? '');
        const focusedTagName = await page.evaluate(() => document.activeElement?.tagName.toLowerCase() ?? '');

        const landedOnTarget = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el) return false;

            const id = el.id ?? '';
            const tag = el.tagName.toLowerCase();

            if (['main', 'content', 'page', 'maincontent'].includes(id)) return true;
            if (['h1', 'h2', 'h3'].includes(tag)) return true;
            if (el.closest('#content') || el.closest('#main')) return true;

            return false;
        });

        expect(
            landedOnTarget,
            'Skip link target #content exists but is not focusable — add tabindex="-1" to the target element'
        ).toBe(true);
    });

    test(`(${v.name}) News - keyboard nav, no unlabeled elements in tab order`, async ({ page, browserName }) => {
        await page.goto(v.url);

        const skipLink = page.getByRole('link', { name: /skip to/i }).first();
        await skipLink.focus();
        await expect(skipLink).toBeFocused();
        await page.keyboard.press('Enter');

        const tabOrder: { tag: string; label: string }[] = [];
        let firstElementKey: string | null = null;

        while (true) {
            await page.keyboard.press('Tab');

            const el = await page.evaluate(() => {
                const active = document.activeElement as HTMLElement;

                if (!active?.closest('#page')) return null;

                return {
                    tag: active?.tagName?.toLowerCase() ?? '',
                    label:
                        active?.getAttribute('aria-label') ||
                        active?.getAttribute('title') ||
                        active?.textContent?.trim() ||
                        active?.querySelector('img')?.getAttribute('alt') ||
                        active?.getAttribute('value') ||
                        active?.getAttribute('placeholder') ||
                        '',
                    key: `${active?.tagName}-${active?.getAttribute('href') ?? ''}-${active?.textContent?.trim().slice(0, 30)}`,
                };
            });

            if (!el) break;

            if (firstElementKey === null) {
                firstElementKey = el.key;
            } else if (el.key === firstElementKey) {
                break;
            }

            tabOrder.push(el);

            expect(
                el.label.length,
                `<${el.tag}> at tab position ${tabOrder.length} inside #page has no accessible label`
            ).toBeGreaterThan(0);
        }

        expect(
            tabOrder.length,
            'No focusable elements were discovered inside #page'
        ).toBeGreaterThan(0);

        console.log('Tab order:');
        tabOrder.forEach((el, i) =>
            console.log(`  ${i + 1}. <${el.tag}>: "${el.label.slice(0, 60)}"`)
        );
    });
}