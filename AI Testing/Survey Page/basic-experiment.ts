console.log('Script started');
import * as dotenv from 'dotenv';
dotenv.config();
import { sendPrompt } from './ai-client.ts';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const result = await sendPrompt(`Analyze this accessibility issue and explain why it matters:

Issue: Form elements must have labels (WCAG 4.1.2)
Affected elements: input[value="1"], input[value="2"], input[value="3"]
Page: https://www.w3.org/WAI/demos/bad/before/survey.html

Please explain: what the issue is, who it affects and how to fix it`);

  console.log(result);

  const outputPath = path.join(process.cwd(), 'basic-experiment-output.md');
  fs.writeFileSync(outputPath, `# Basic AI Experiment Output\n\n${result}\n`);
  console.log(`Saved to ${outputPath}`);
}

main();