import { test } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const screenshotsDir = path.join(process.cwd(), 'screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

test('Capture before survey screenshot', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/demos/bad/before/survey.html');
  await page.screenshot({
    path: path.join(screenshotsDir, 'survey-before.png'),
    fullPage: true,
  });
});

test('Capture after survey screenshot', async ({ page }) => {
  await page.goto('https://www.w3.org/WAI/demos/bad/after/survey.html');
  await page.screenshot({
    path: path.join(screenshotsDir, 'survey-after.png'),
    fullPage: true,
  });
});