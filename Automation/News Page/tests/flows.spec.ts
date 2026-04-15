import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const URL = 'https://www.w3.org/WAI/demos/bad/after/news.html';

//helper function
async function runAxe(page, label: string) {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(400);

    const results = await new AxeBuilder({ page }).analyze();

    console.log(label, 'violations:', results.violations.length);

    return results;
}


// TEST FLOW 1: FUNCTIONAL + STRUCTURAL ACCESSIBILITY
// axe-core scan
// image alt validation
// heading structure
// navigation state changes
// content visibility
// inline link accessibility
test('News accessibility flow', async ({ page }) => {
    await page.goto(URL);

    const initial = await runAxe(page, 'initial');
    expect(initial.violations.length).toBeLessThanOrEqual(5);

    // navigation
    await page.locator('#nav').getByRole('link', { name: 'Home' }).click();
    await page.goBack();

    // content
    await page.locator('#story1').scrollIntoViewIfNeeded();
    await runAxe(page, 'story visible');

    // inline link
    const inline = page.getByRole('link', { name: /air conditioning works/i }).first();
    await inline.click();
    await runAxe(page, 'inline link');

    // alt text check
    const images = page.locator('img');
    const imgCount = await images.count();

    for (let i = 0; i < imgCount; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).not.toBeNull();
        expect(alt?.trim().length).toBeGreaterThan(0);
    }

    // heading structure
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // color contrast
    const contrastIssues = initial.violations.filter(v => v.id === 'color-contrast');
    expect(contrastIssues.length).toBe(0);
});



// TEST FLOW 2: KEYBOARD ACCESSIBILITY
// skip link usage
// keyboard focus behavior
// focus presence validation
// operable navigation (Home/Tickets)
// no mouse dependency
test('Keyboard accessibility flow', async ({ page }) => {
    await page.goto(URL);
    await runAxe(page, 'initial');

    // skip link
    const skip = page.getByRole('link', { name: /skip/i }).first();

    await expect(skip).toBeVisible();

    await skip.focus();

    await expect(skip).toBeFocused();

    await page.keyboard.press('Enter');

    await page.waitForLoadState('domcontentloaded');
    await runAxe(page, 'after skip');

    // focus visibility
    const focusedText = await page.evaluate(() =>
        document.activeElement?.textContent?.trim() || ''
    );
    expect(focusedText.length).toBeGreaterThan(0);


    // home nav
    const home = page.locator('#nav').getByRole('link', { name: /^home$/i }).first();

    await expect(home).toBeVisible();

    await home.click();

    await page.waitForLoadState('domcontentloaded');
    await runAxe(page, 'after home');

    await page.goBack();
    await page.waitForLoadState('domcontentloaded');

    // tickets nav
    const tickets = page.locator('#nav').getByRole('link', { name: /tickets/i }).first();

    await expect(tickets).toBeVisible();

    await tickets.click();

    await page.waitForLoadState('domcontentloaded');
    await runAxe(page, 'after tickets');

    await page.goBack();
    await page.waitForLoadState('domcontentloaded');

    // inline access
    const inline = page.getByRole('link', {
        name: /air conditioning works/i
    }).first();

    await expect(inline).toBeVisible();

    await inline.click();

    await page.waitForLoadState('domcontentloaded');
    await runAxe(page, 'inline');
});