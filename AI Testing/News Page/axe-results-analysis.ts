import * as dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeIssue(issueDescription: string, codeSnippet: string): Promise<string> {
    const response = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: `You are an accessibility expert.

Analyze the following accessibility issue and suggest a fix.

Issue:
${issueDescription}

HTML:
${codeSnippet}

Requirements:
1. Confirm what the accessibility problem is and explain why this is an accessibility problem (reference the relevant WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works`,
            },
        ],
    });

    return response.choices[0].message.content ?? '';
}

async function main() {
    const jsonPath = path.join(process.cwd(), 'selected-issues.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    const issues = JSON.parse(raw);

    let fullReport = `# AI Fix Suggestions Report\n\n`;
    fullReport += `**Source:** selected-issues.json  \n`;
    fullReport += `**Date:** ${new Date().toISOString().split('T')[0]}  \n\n---\n\n`;

    for (const issue of issues) {
        console.log(`Analyzing ${issue.id}...`);
        const result = await analyzeIssue(issue.description, issue.snippet); // snippet not nodes[0].html

        fullReport += `## ${issue.id} (${issue.impact})\n\n`;
        fullReport += `**Description:** ${issue.description}  \n\n`;
        fullReport += `**Original code:**\n\`\`\`html\n${issue.snippet}\n\`\`\`\n\n`;
        fullReport += `**AI Analysis:**\n\n${result}\n\n---\n\n`;

        console.log(`Done: ${issue.id}`);
    }

    fs.writeFileSync('ai-fix-suggestions-report.md', fullReport);
    console.log('Report saved to ai-fix-suggestions-report.md');
    console.log(fullReport);
}

main();