import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const resultsDir = path.join(process.cwd(), 'test-results');
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);

// Flow 1 - Before version of Survey
test('Flow 1: Keyboard navigation + fill BEFORE survey + axe scan', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/demos/bad/before/survey.html');

  const loadScan = await new AxeBuilder({ page }).analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-before-flow-load.json'),
    JSON.stringify(loadScan, null, 2)
  );

  const radios = page.locator('input[type="radio"]');
  if (await radios.count() > 0) {
    await radios.first().focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
  }

  const checkboxes = page.locator('input[type="checkbox"]');
  if (await checkboxes.count() > 0) {
    await checkboxes.first().focus();
    await page.keyboard.press('Space');
  }

  const textareas = page.locator('textarea');
  if (await textareas.count() > 0) {
    await textareas.first().focus();
    await page.keyboard.type('Test comment');
  }

  const afterScan = await new AxeBuilder({ page }).analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-before-flow-filled.json'),
    JSON.stringify(afterScan, null, 2)
  );

  console.log(`Before flow violations (load): ${loadScan.violations.length}`);
  console.log(`Before flow violations (filled): ${afterScan.violations.length}`);
});

// Flow 2 - After version of Survey
test('Flow 2: Keyboard navigation + fill AFTER survey + axe scan', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/demos/bad/after/survey.html');

  const loadScan = await new AxeBuilder({ page }).analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-after-flow-load.json'),
    JSON.stringify(loadScan, null, 2)
  );

  const radios = page.locator('input[type="radio"]');
  if (await radios.count() > 0) {
    await radios.first().focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
  }

  const checkboxes = page.locator('input[type="checkbox"]');
  if (await checkboxes.count() > 0) {
    await checkboxes.first().focus();
    await page.keyboard.press('Space');
  }

  const textareas = page.locator('textarea');
  if (await textareas.count() > 0) {
    await textareas.first().focus();
    await page.keyboard.type('Test comment');
  }

  // submit with keyboard and wait for DOM changes to settle
  const submitBtn = page.locator('input[type="submit"], button[type="submit"]');
  if (await submitBtn.count() > 0) {
    await submitBtn.first().focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
  }

  const afterScan = await new AxeBuilder({ page }).analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-after-flow-submitted.json'),
    JSON.stringify(afterScan, null, 2)
  );

  console.log(`After flow violations (load): ${loadScan.violations.length}`);
  console.log(`After flow violations (submitted): ${afterScan.violations.length}`);
});