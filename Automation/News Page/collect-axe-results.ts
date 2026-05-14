import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import * as fs from 'fs';
import * as path from 'path';

const pages = [
    { name: 'news-before', url: 'https://www.w3.org/WAI/demos/bad/before/news.html' },
    { name: 'news-after',  url: 'https://www.w3.org/WAI/demos/bad/after/news.html' },
];

const resultsDir = path.join(process.cwd(), 'test-results');
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);

async function collectAxeResults() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const p of pages) {
        await page.goto(p.url);
        const results = await new AxeBuilder({ page }).analyze();

        const outputPath = path.join(resultsDir, `${p.name}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        console.log(`Results saved to ${outputPath}`);
    }

    await browser.close();
}

collectAxeResults();