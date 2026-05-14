export function buildPrompt(issue: any): string {
    return `You are an accessibility expert.

Analyze the following HTML snippet for accessibility issues and suggest a fix.

HTML:
${issue.snippet}

Requirements:
1. Identify and explain the accessibility problem (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works`;
}