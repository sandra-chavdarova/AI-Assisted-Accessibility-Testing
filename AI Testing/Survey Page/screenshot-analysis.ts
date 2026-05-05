import * as dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeScreenshot(imagePath: string, label: string): Promise<string> {
  const imageData = fs.readFileSync(imagePath);
  const base64 = imageData.toString('base64');

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: {
              url: `data:image/png;base64,${base64}`,
            },
          },
          {
            type: 'text',
            text: `This is a screenshot of a web page (${label}).
Please analyze it for accessibility issues. Look for:
1. Missing or unclear labels on form elements
2. Poor color contrast
3. Missing alt text indicators
4. Unclear focus indicators
5. Any other visual accessibility concerns

Provide a structured report with issue name, severity (critical/serious/moderate/minor), and description.`,
          },
        ],
      },
    ],
  });

  return response.choices[0].message.content ?? '';
}

async function main() {
  const screenshotsDir = path.join(process.cwd(), 'screenshots');

  const pages = [
    { file: 'survey-before.png', label: 'Before (inaccessible version)' },
    { file: 'survey-after.png', label: 'After (accessible version)' },
  ];

  let fullReport = `# AI Screenshot Analysis Report\n\n`;

  for (const p of pages) {
    console.log(`Analyzing ${p.file}...`);
    const result = await analyzeScreenshot(
      path.join(screenshotsDir, p.file),
      p.label
    );

    fullReport += `## ${p.label}\n\n${result}\n\n---\n\n`;
    console.log(`Done: ${p.file}`);
  }

  fs.writeFileSync('screenshot-analysis-report.md', fullReport);
  console.log('Report saved to screenshot-analysis-report.md');
}

main();