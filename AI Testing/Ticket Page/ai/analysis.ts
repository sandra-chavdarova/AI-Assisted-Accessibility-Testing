import * as dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface AnalysisConfig {
    model: string;
    promptType: 'general' | 'evidence-based';
}

export async function runAnalysis({
                                      model,
                                      promptType,
                                  }: AnalysisConfig) {

    const axeResultsDir = path.join(process.cwd(), '..', 'reports', 'axe-results');

    const outputDir = path.join(
        process.cwd(),
        '..',
        'reports',
        'ai-analysis',
        model.replace('.', '_'),
        `${promptType}-analysis`
    );

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const promptPath = path.join(
        process.cwd(),
        'prompts',
        `${promptType}-prompt.txt`
    );

    const basePrompt = fs.readFileSync(promptPath, 'utf-8');

    const files = fs.readdirSync(axeResultsDir);

    for (const file of files) {

        const rawResults = JSON.parse(
            fs.readFileSync(path.join(axeResultsDir, file), 'utf-8')
        );

        const violations = JSON.stringify(
            rawResults.violations,
            null,
            2
        );

        const response = await client.chat.completions.create({
            model,
            messages: [
                {
                    role: 'system',
                    content: basePrompt,
                },
                {
                    role: 'user',
                    content: violations,
                },
            ],
        });

        const analysis = response.choices[0].message.content;

        const outputFile = file.replace('.json', '-analysis.md');

        fs.writeFileSync(
            path.join(outputDir, outputFile),
            analysis || ''
        );

        console.log(`Generated analysis for ${file}`);
    }
}