export function buildPrompt(issue: any): string {
    return `You are an accessibility expert.

Analyze the following accessibility issue and suggest a fix.

Issue:
${issue.description}

HTML:
${issue.snippet}

Requirements:
1. Confirm what the accessibility problem is and explain why (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works`;
}