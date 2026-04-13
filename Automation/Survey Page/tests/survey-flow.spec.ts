import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const resultsDir = path.join(process.cwd(), 'test-results');
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);

// Flow 1 - Before version of Survey
test('Flow 1: Fill and submit BEFORE survey + axe scan', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/demos/bad/before/survey.html');

  // scan when page loads
  const loadScan = await new AxeBuilder({ page }).analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-before-flow-load.json'),
    JSON.stringify(loadScan, null, 2)
  );

  // filling in the form
  const radios = page.locator('input[type="radio"]');
  const radioCount = await radios.count();
  if (radioCount > 0) await radios.first().check({ force: true });

  const checkboxes = page.locator('input[type="checkbox"]');
  const checkboxCount = await checkboxes.count();
  if (checkboxCount > 0) await checkboxes.first().check({ force: true });

  const textareas = page.locator('textarea');
  const textareaCount = await textareas.count();
  if (textareaCount > 0) await textareas.first().fill('Test comment for accessibility audit');

  // scan after interaction
  const afterScan = await new AxeBuilder({ page }).analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-before-flow-filled.json'),
    JSON.stringify(afterScan, null, 2)
  );

  console.log(`Before flow violations (load): ${loadScan.violations.length}`);
  console.log(`Before flow violations (filled): ${afterScan.violations.length}`);
});

// Flow 2 - After version of Survey
test('Flow 2: Fill and submit AFTER survey + axe scan', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/demos/bad/after/survey.html');

  // scan when page loads
  const loadScan = await new AxeBuilder({ page }).analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-after-flow-load.json'),
    JSON.stringify(loadScan, null, 2)
  );

  // filling in the form
  const radios = page.locator('input[type="radio"]');
  const radioCount = await radios.count();
  if (radioCount > 0) await radios.first().check();

  const checkboxes = page.locator('input[type="checkbox"]');
  const checkboxCount = await checkboxes.count();
  if (checkboxCount > 0) await checkboxes.first().check();

  const textareas = page.locator('textarea');
  const textareaCount = await textareas.count();
  if (textareaCount > 0) await textareas.first().fill('Test comment for accessibility audit');

  // submitting
  const submitBtn = page.locator('input[type="submit"], button[type="submit"]');
  if (await submitBtn.count() > 0) await submitBtn.first().click();

  // scan after submission
  const afterScan = await new AxeBuilder({ page }).analyze();
  fs.writeFileSync(
    path.join(resultsDir, 'survey-after-flow-submitted.json'),
    JSON.stringify(afterScan, null, 2)
  );

  console.log(`After flow violations (load): ${loadScan.violations.length}`);
  console.log(`After flow violations (submitted): ${afterScan.violations.length}`);
});