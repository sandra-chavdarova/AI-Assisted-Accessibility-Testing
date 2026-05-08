import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const resultsDir = 'reports/axe-results';
const analysisDir = 'reports/ai-analysis/gpt-4_1-mini/general-analysis';

if (!fs.existsSync(analysisDir)) {
    fs.mkdirSync(analysisDir, { recursive: true });
}

async function analyzeFile(fileName: string) {

    const filePath = path.join(resultsDir, fileName);

    const axeResults = fs.readFileSync(filePath, 'utf-8');

    const prompt = `
Analyze the following axe-core accessibility scan results.

Provide:
1. Summary of accessibility issues
2. Severity grouping
3. Most critical accessibility problems
4. Accessibility insights
5. Recommendations for improvement

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

    console.log(`Analysis completed for ${fileName}`);
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