# AI Evaluation Report

## Method

Accessibility testing was performed on the W3C WAI Ticket page using automated axe-core scans executed through Playwright. Both the **before** and **after** versions of the page were tested, including additional keyboard navigation flow scans.

Pages tested:
- Before: https://www.w3.org/WAI/demos/bad/before/tickets.html
- After: https://www.w3.org/WAI/demos/bad/after/tickets.html

The generated axe-core JSON results were then analyzed using multiple AI configurations:
- GPT-4.1-mini with a general analysis prompt
- GPT-4.1-mini with an evidence-based prompt
- GPT-5.5 with a general analysis prompt
- GPT-5.5 with an evidence-based prompt

The goal was to evaluate:
- how accurately AI interprets accessibility scan results,
- whether prompting strategy affects hallucination reduction,
- whether advanced models provide more reliable accessibility analysis,
- and how useful AI-generated reports are compared to raw axe-core findings and manual interpretation.

The evidence-based prompts explicitly instructed the models to:
- use only information present in the JSON results,
- avoid unsupported assumptions,
- reference violation IDs,
- and separate confirmed findings from interpretations.

---

## What Automation (AI) Found

### Before page

Across all AI analyses, the following major accessibility issues were consistently identified:

1. Missing alternative text on images (`image-alt`) — Critical
2. Select element without accessible name (`select-name`) — Critical
3. Links without discernible text (`link-name`) — Serious
4. Insufficient color contrast (`color-contrast`) — Serious
5. Missing document language attribute (`html-has-lang`) — Serious
6. Missing main landmark (`landmark-one-main`) — Moderate
7. Content outside landmark regions (`region`) — Moderate
8. Empty table header (`empty-table-header`) — Minor

The AI models also identified relationships between violations. For example:
- missing alt text on navigation images contributed to both `image-alt` and `link-name` violations,
- and weak landmark structure contributed to navigation and structural accessibility issues.

GPT-5.5 generated more detailed explanations and remediation suggestions than GPT-4.1-mini, especially when discussing semantic HTML improvements, landmark usage, and navigation structure.

The evidence-based prompts produced more controlled outputs and reduced unsupported claims.

---

### After page

The after page contained significantly fewer accessibility violations.

The AI analyses consistently identified:
1. Remaining form labeling issues
2. Minor structural landmark issues
3. Some remaining table accessibility concerns
4. Reduced overall accessibility severity compared to the before page

All models correctly recognized that the after page represented an accessibility improvement over the before page.

GPT-5.5 produced more nuanced explanations of remaining issues and better distinguished between confirmed violations and assumptions.

The evidence-based versions explicitly stated when an issue was:
- confirmed by the scan results,
- incomplete and requiring manual review,
- or not explicitly present in the provided evidence.

---

## Was AI Accurate?

Yes, mostly accurate.

The AI-generated analyses correctly identified nearly all major accessibility violations reported by axe-core, including:
- missing image alternative text,
- unnamed form controls,
- missing language attributes,
- contrast failures,
- empty links,
- and missing landmark structure.

The analyses generated using GPT-5.5 were significantly more detailed and technically precise than GPT-4.1-mini.

GPT-5.5:
- referenced specific violation IDs more consistently,
- connected related accessibility issues together,
- explained accessibility impact more clearly,
- and provided more realistic remediation suggestions.

The evidence-based prompting strategy also improved accuracy by reducing unsupported assumptions and forcing the model to stay closer to the actual axe-core evidence.

The keyboard flow scan analyses were generally consistent with the standard scan analyses, although the flow scans provided additional context about interactive navigation elements and focusable components.

---

## Did It Hallucinate?

Yes, but the amount varied significantly depending on the model and prompting strategy.

The general analysis prompts occasionally produced unsupported assumptions, especially with GPT-4.1-mini. Examples included:
- assuming broader usability problems not directly confirmed by the scan,
- implying that some accessibility barriers fully prevented usability,
- or making generalized statements about screen reader behavior without explicit evidence.

GPT-5.5 hallucinated less frequently and produced more grounded accessibility reasoning.

The evidence-based prompts substantially reduced hallucinations by instructing the AI to:
- use only information explicitly present in the JSON,
- distinguish confirmed findings from interpretations,
- and acknowledge uncertainty when evidence was incomplete.

The GPT-5.5 evidence-based analysis produced the most reliable outputs overall. It frequently used phrases such as:
- “confirmed findings from violations,”
- “interpretations based only on scan evidence,”
- and “not explicitly present in the scan results.”

This significantly improved transparency and reliability.

However, even the strongest configurations still occasionally produced mild interpretive statements that extended beyond the raw axe-core output. These were generally reasonable accessibility inferences rather than fabricated violations.

---

## Was It Useful?

Yes.

The AI-generated analyses were highly useful for:
- summarizing large axe-core JSON outputs,
- organizing violations by severity,
- explaining accessibility impact,
- and generating understandable remediation suggestions.

Compared to raw axe-core JSON data, the AI reports were:
- easier to read,
- more structured,
- and more understandable for non-technical audiences.

GPT-5.5 was especially useful because it:
- generated professional-quality accessibility explanations,
- connected related issues together,
- and provided stronger remediation guidance.

The evidence-based prompting strategy further improved usefulness by increasing trustworthiness and reducing misleading claims.

However, AI analysis still depended entirely on the quality of the original automated scan results. The AI could not independently verify:
- real screen reader usability,
- cognitive accessibility,
- keyboard interaction quality,
- or actual user experience.

Therefore, AI analysis should be considered a complementary layer on top of automated testing rather than a replacement for manual accessibility evaluation.

---

## Comparison: AI vs axe-core

### Before page

| Issue | Found by axe-core | Found by AI |
|---|:---:|:---:|
| Missing image alt text | YES (critical) | YES |
| Select element without label | YES (critical) | YES |
| Links without discernible text | YES (serious) | YES |
| Missing lang attribute | YES (serious) | YES |
| Color contrast failures | YES (serious) | YES |
| Missing main landmark | YES (moderate) | YES |
| Content outside landmarks | YES (moderate) | YES |
| Empty table header | YES (minor) | YES |
| Relationship between violations | Partial | YES |
| WCAG interpretation and explanation | Limited | YES |

### After page

| Issue | Found by axe-core | Found by AI |
|---|:---:|:---:|
| Remaining form labeling issues | YES | YES |
| Landmark structure issues | YES | YES |
| Table accessibility issues | YES | YES |
| Reduced severity compared to before page | Partial | YES |
| Incomplete/manual review findings | YES | YES |
| Accessibility improvement recognition | Partial | YES |

---

## Conclusion

AI-assisted analysis of axe-core accessibility results proved highly useful for interpreting automated accessibility scans and generating readable accessibility reports.

The experiments demonstrated clear differences between:
- smaller and more advanced language models,
- and between general prompting and evidence-based prompting strategies.

GPT-4.1-mini generated useful summaries but occasionally produced unsupported assumptions and more generalized accessibility explanations.

GPT-5.5 produced substantially stronger results:
- better structured reports,
- more grounded reasoning,
- clearer accessibility explanations,
- and higher-quality remediation suggestions.

The evidence-based prompting strategy significantly improved reliability across both models by reducing hallucinations and forcing the AI to stay closer to the actual scan evidence.

The GPT-5.5 evidence-based configuration produced the most reliable and professional analysis overall.

Despite these improvements, AI analysis still depends on the limitations of automated accessibility testing itself. Neither axe-core nor AI analysis can fully replace manual accessibility testing, especially for:
- cognitive accessibility,
- screen reader experience,
- logical reading flow,
- keyboard usability,
- and real user interaction quality.

The best results were achieved by combining:
- automated accessibility scanning with axe-core,
- AI-assisted interpretation and reporting,
- and manual accessibility evaluation.

This combined approach provided the most complete understanding of the accessibility state of the tested pages.