import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const resultsDir = path.join(process.cwd(), 'test-results');
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

// Flow 1 - Before version of Survey
test('Flow 1: Keyboard navigation + fill BEFORE survey + axe scan', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/demos/bad/before/survey.html');

  // Scan on load
  const loadScan = await new AxeBuilder({ page }).withTags(WCAG_TAGS).include('#page').analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-before-flow-load.json'),
    JSON.stringify(loadScan, null, 2)
  );

  // Continuous Tab navigation
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Test comment');

  // Scan after interaction
  const filledScan = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-before-flow-filled.json'),
    JSON.stringify(filledScan, null, 2)
  );

  console.log(`Before flow violations (load): ${loadScan.violations.length}`);
  console.log(`Before flow violations (filled): ${filledScan.violations.length}`);

  // Assert the scan completed and returned a valid result
  expect(loadScan.violations).toBeDefined();
  expect(loadScan.passes).toBeDefined();
});




// Flow 2 - After version of Survey
test('Flow 2: Keyboard navigation + fill AFTER survey + axe scan', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/demos/bad/after/survey.html');

  // Scan on load
  const loadScan = await new AxeBuilder({ page }).withTags(WCAG_TAGS).include('#page').analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-after-flow-load.json'),
    JSON.stringify(loadScan, null, 2)
  );

  // Continuous Tab navigation
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space'); // select a radio
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Test comment');

  // Tab to submit and press Enter
  const submitBtn = page.locator('input[type="submit"], button[type="submit"]');
  if (await submitBtn.count() > 0) {
    await submitBtn.first().focus();
    await page.keyboard.press('Enter');

    // Wait for navigation/DOM to settle
    await page.waitForLoadState('networkidle');
  }

  // Verify the browser is still on the survey page
  const currentUrl = page.url();
  console.log(`URL after submission: ${currentUrl}`);
  expect(currentUrl).toContain('survey');

  // Scan the post-submission state
  const submittedScan = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-after-flow-submitted.json'),
    JSON.stringify(submittedScan, null, 2)
  );

  console.log(`After flow violations (load): ${loadScan.violations.length}`);
  console.log(`After flow violations (submitted): ${submittedScan.violations.length}`);

  // After page should have no critical violations
  const criticalViolations = submittedScan.violations.filter(v => v.impact === 'critical');
  expect(criticalViolations).toHaveLength(0);
});