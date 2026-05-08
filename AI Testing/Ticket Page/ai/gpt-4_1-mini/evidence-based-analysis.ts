import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const resultsDir = 'reports/axe-results';

const analysisDir =
    'reports/ai-analysis/gpt-4_1-mini/evidence-based-analysis';

if (!fs.existsSync(analysisDir)) {
    fs.mkdirSync(analysisDir, { recursive: true });
}

async function analyzeFile(fileName: string) {

    const filePath = path.join(resultsDir, fileName);

    const axeResults = fs.readFileSync(filePath, 'utf-8');

    const prompt = `
You are analyzing axe-core accessibility scan results.

IMPORTANT RULES:
- Use ONLY information explicitly present in the provided JSON results.
- Do NOT assume or infer accessibility issues that are not present.
- Do NOT invent WCAG problems.
- Reference violation IDs whenever possible.
- If something is not explicitly present in the scan results, state:
  "Not explicitly present in the scan results."
- Separate confirmed findings from interpretations.

Provide the following sections:

1. Summary of accessibility issues
2. Severity grouping
3. Most critical accessibility problems
4. Accessibility insights based only on scan evidence
5. Recommendations based only on detected violations

axe-core results:
${axeResults}
`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
    });

    const analysis = response.choices[0].message.content;

    const outputFileName = fileName.replace('.json', '-analysis.md');

    fs.writeFileSync(
        path.join(analysisDir, outputFileName),
        analysis || ''
    );

    console.log(`Evidence-based analysis completed for ${fileName}`);
}

async function runAnalysis() {

    const files = fs.readdirSync(resultsDir);

    for (const file of files) {

        if (file.endsWith('.json')) {
            await analyzeFile(file);
        }
    }
}

runAnalysis();