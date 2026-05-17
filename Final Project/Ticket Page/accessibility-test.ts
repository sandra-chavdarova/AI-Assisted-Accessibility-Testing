import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface ExperimentConfig {
    model: string;
    promptFile: string;
    inputFile?: string;
    inputContent?: string;
    outputFile: string;
    inputType: 'url' | 'html';
}

const experiments: ExperimentConfig[] = [

    // GPT-4.1-mini URL
    {
        model: 'gpt-4.1-mini',
        promptFile: 'url-prompt.txt',
        inputContent: 'https://www.w3.org/WAI/demos/bad/before/tickets.html',
        outputFile: 'gpt4-url-before.md',
        inputType: 'url',
    },

    {
        model: 'gpt-4.1-mini',
        promptFile: 'url-prompt.txt',
        inputContent: 'https://www.w3.org/WAI/demos/bad/after/tickets.html',
        outputFile: 'gpt4-url-after.md',
        inputType: 'url',
    },

    // GPT-4.1-mini HTML
    {
        model: 'gpt-4.1-mini',
        promptFile: 'html-prompt.txt',
        inputFile: 'tickets-before.txt',
        outputFile: 'gpt4-html-before.md',
        inputType: 'html',
    },

    {
        model: 'gpt-4.1-mini',
        promptFile: 'html-prompt.txt',
        inputFile: 'tickets-after.txt',
        outputFile: 'gpt4-html-after.md',
        inputType: 'html',
    },

    // GPT-5.5 URL
    {
        model: 'gpt-5.5',
        promptFile: 'url-prompt.txt',
        inputContent: 'https://www.w3.org/WAI/demos/bad/before/tickets.html',
        outputFile: 'gpt5-url-before.md',
        inputType: 'url',
    },

    {
        model: 'gpt-5.5',
        promptFile: 'url-prompt.txt',
        inputContent: 'https://www.w3.org/WAI/demos/bad/after/tickets.html',
        outputFile: 'gpt5-url-after.md',
        inputType: 'url',
    },

    // GPT-5.5 HTML
    {
        model: 'gpt-5.5',
        promptFile: 'html-prompt.txt',
        inputFile: 'tickets-before.txt',
        outputFile: 'gpt5-html-before.md',
        inputType: 'html',
    },

    {
        model: 'gpt-5.5',
        promptFile: 'html-prompt.txt',
        inputFile: 'tickets-after.txt',
        outputFile: 'gpt5-html-after.md',
        inputType: 'html',
    },

];

async function runExperiments() {

    const responsesDir = path.join(process.cwd(), 'ai_responses');

    if (!fs.existsSync(responsesDir)) {
        fs.mkdirSync(responsesDir);
    }

    for (const exp of experiments) {

        const prompt = fs.readFileSync(
            path.join(process.cwd(), 'prompts', exp.promptFile),
            'utf-8'
        );

        const inputContent =
            exp.inputType === 'url'
                ? exp.inputContent!
                : fs.readFileSync(
                    path.join(process.cwd(), 'html', exp.inputFile!),
                    'utf-8'
                );

        const finalInput =
            exp.inputType === 'url'
                ? `Analyze this webpage URL:\n${inputContent}`
                : `Analyze this HTML snippet:\n${inputContent}`;

        const response = await client.chat.completions.create({
            model: exp.model,
            messages: [
                {
                    role: 'system',
                    content: prompt,
                },
                {
                    role: 'user',
                    content: finalInput,
                },
            ],
        });

        const result = response.choices[0]?.message?.content || '';

        fs.writeFileSync(
            path.join(responsesDir, exp.outputFile),
            result
        );

        console.log(`Generated: ${exp.outputFile}`);
    }
}

runExperiments();