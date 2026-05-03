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

    test(`(${v.name}) News - heading structure is logical`, async ({page}) => {
        await page.goto(v.url);
        const main = page.locator('#page');

        const h1Count = await main.locator('h1').count();
        expect(h1Count).toBe(1); // Must have exactly one h1

        const h2Count = await main.locator('h2').count(); // since this is a news page with multiple articles, h2s are expected
        expect(h2Count).toBeGreaterThan(0);

        const h3Count = await main.locator('h3').count();
        if (h3Count > 0) {
            expect(h2Count).toBeGreaterThan(0);
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

    test(`(${v.name}) News - inner skip link moves focus into news content`, async ({page, browserName}) => {
        await page.goto(v.url);

        const outerSkipLink = page.getByRole('link', {name: /skip to/i}).first();
        await outerSkipLink.focus();
        await expect(outerSkipLink).toBeFocused();

        // WebKit behaves differently with Enter on links
        if (browserName === 'webkit') {
            await outerSkipLink.click();
        } else {
            await outerSkipLink.press('Enter');
        }

        const innerSkipLink = page
            .locator('#page')
            .getByRole('link', {name: /skip to content/i})
            .first();

        await expect(innerSkipLink).toBeVisible();
        await innerSkipLink.focus();
        await expect(innerSkipLink).toBeFocused();

        if (browserName === 'webkit') {
            await innerSkipLink.click();
        } else {
            await innerSkipLink.press('Enter');
        }

        const stillOnSkip = await innerSkipLink.evaluate(
            el => el === document.activeElement
        );

        expect(
            stillOnSkip,
            'Focus did not move — skip link activated but had no effect'
        ).toBe(false);
    });

    test(`(${v.name}) News - keyboard nav, no unlabeled elements in tab order`, async ({page, browserName}) => {
        await page.goto(v.url);

        const skipLink = page.getByRole('link', {name: /skip to/i}).first(); //skip link to get into the inner page
        await skipLink.focus();
        await expect(skipLink).toBeFocused();
        await page.keyboard.press('Enter');

        const tabOrder: { tag: string; label: string }[] = [];

        for (let i = 0; i < 20; i++) {
            await page.keyboard.press('Tab');

            const el = await page.evaluate(() => {
                const active = document.activeElement as HTMLElement;

                if (!active?.closest('#page')) return null; // Stop if we've tabbed into the outer shell

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
                };
            });
            if (!el) break;
            tabOrder.push(el);

            expect(
                el.label.length,
                `<${el.tag}> at tab position ${i + 1} inside #main has no accessible label`
            ).toBeGreaterThan(0);
        }
        expect(
            tabOrder.length,
            'No focusable elements were discovered inside #main'
        ).toBeGreaterThan(0);

        console.log('Tab order:');
        tabOrder.forEach((el, i) =>
            console.log(`  ${i + 1}. <${el.tag}>: "${el.label.slice(0, 60)}"`)
        );
    });
}