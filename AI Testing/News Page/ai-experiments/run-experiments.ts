import * as dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

import { buildPrompt as axeDescriptionPrompt } from './prompts/axe-description-prompt';
import { buildPrompt as noDescriptionPrompt } from './prompts/no-description-prompt';
import { buildPrompt as thoroughDescriptionPrompt } from './prompts/thorough-description-prompt';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const models = ['gpt-4o', "gpt-4.o-mini", "gpt-5.5"];

const promptStrategies = [
    { name: 'axe-description',   builder: axeDescriptionPrompt },
    { name: 'no-description',    builder: noDescriptionPrompt },
    { name: 'thorough-description', builder: thoroughDescriptionPrompt },
];

async function analyzeIssue(model: string, prompt: string): Promise<string> {
    const response = await client.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content ?? '';
}

function buildReport(
    model: string,
    promptName: string,
    issues: any[],
    results: { issueId: string; prompt: string; response: string }[]
): string {
    let report = `# AI Fix Suggestions Report\n\n`;
    report += `**Model:** ${model}  \n`;
    report += `**Prompt strategy:** ${promptName}  \n`;
    report += `**Date:** ${new Date().toISOString().split('T')[0]}  \n\n---\n\n`;

    for (const issue of issues) {
        const result = results.find((r) => r.issueId === issue.id);
        report += `## ${issue.id} (${issue.impact})\n\n`;
        report += `**Original code:**\n\`\`\`html\n${issue.snippet}\n\`\`\`\n\n`;
        report += `**Prompt sent:**\n\`\`\`\n${result?.prompt ?? ''}\n\`\`\`\n\n`;
        report += `**AI Response:**\n\n${result?.response ?? ''}\n\n---\n\n`;
    }

    return report;
}

async function main() {
    // Load issues
    const jsonPath = path.join(process.cwd(), 'selected-issues.json');
    const issues = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    // Ensure ai-reports directory exists
    const reportsDir = path.join(process.cwd(), 'ai-reports');
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

    // Loop models × prompt strategies
    for (const model of models) {
        for (const strategy of promptStrategies) {
            console.log(`\nRunning: ${model} × ${strategy.name}`);

            const results: { issueId: string; prompt: string; response: string }[] = [];

            for (const issue of issues) {
                console.log(`  Analyzing ${issue.id}...`);
                const prompt = strategy.builder(issue);
                const response = await analyzeIssue(model, prompt);
                results.push({ issueId: issue.id, prompt, response });
                console.log(`  Done: ${issue.id}`);
            }

            // Save report
            const filename = `${model}-${strategy.name}.md`;
            const report = buildReport(model, strategy.name, issues, results);
            fs.writeFileSync(path.join(reportsDir, filename), report);
            console.log(`  Saved: ai-reports/${filename}`);
        }
    }

    console.log('\n All experiments complete. Reports saved to /ai-reports');
}

main();