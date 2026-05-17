# AI-Assisted Accessibility Testing Comparison Report

## 1. Introduction

The purpose of this project was to explore how Artificial Intelligence can assist accessibility testing of web pages. Traditional accessibility testing usually combines manual testing and automated tools such as axe-core or WAVE. In this experiment, AI models were evaluated as an additional accessibility testing assistant.

The project compares how different AI models analyze accessibility issues when given either:
- a webpage URL
- an HTML code snippet

The experiment also compares the analysis quality between:
- GPT-4.1-mini
- GPT-5.5

Two versions of the same webpage were tested:
- BEFORE page (intentionally inaccessible)
- AFTER page (improved accessible version)

---

# 2. Objective

The main objective of this project was to investigate:
- whether AI can identify accessibility issues
- whether AI can provide meaningful fixes
- how accurate AI-generated accessibility reports are
- whether HTML input or URL input produces better results
- differences between smaller and more advanced AI models

---

# 3. Methodology

## Tested Models

- GPT-4.1-mini
- GPT-5.5

## Input Types

Two different prompt strategies were used.

### URL Analysis

The AI model received only the webpage URL.

Example:

```text
Analyze this webpage URL:
https://www.w3.org/WAI/demos/bad/before/tickets.html

```

### HTML Analysis

The AI model received extracted HTML snippets from the webpage.

Example:

```html
<nav>
  ...
</nav>
```

---

# 4. Test Pages

The following W3C demo pages were used.

## BEFORE Page

https://www.w3.org/WAI/demos/bad/before/tickets.html

Contains intentional accessibility problems such as:
- missing labels
- improper navigation
- table accessibility issues
- deprecated HTML
- keyboard accessibility problems

## AFTER Page

https://www.w3.org/WAI/demos/bad/after/tickets.html

Improved version of the same page with better accessibility implementation.

---

# 5. Results Overview

| Model | Input Type | Accuracy | Detail Level | False Positives | Quality of Fixes |
|---|---|---|---|---|---|
| GPT-4.1-mini | URL | Medium | Medium | High | Medium |
| GPT-4.1-mini | HTML | Good | Medium | Medium | Good |
| GPT-5.5 | URL | Good | High | Medium | High |
| GPT-5.5 | HTML | Excellent | Excellent | Low | Excellent |

---

# 6. Findings

## 6.1 GPT-5.5 produced the best overall results

GPT-5.5 generated:
- more detailed accessibility explanations
- more accurate WCAG-related observations
- better semantic HTML understanding
- more realistic accessibility fixes
- fewer hallucinated issues

The model was especially effective when analyzing raw HTML snippets.

---

## 6.2 HTML analysis was more accurate than URL analysis

The experiment showed that AI models performed significantly better when provided with HTML code instead of only a webpage URL.

### HTML analysis advantages

- direct access to semantic structure
- better detection of missing labels and attributes
- more precise fixes
- more accurate WCAG explanations
- fewer assumptions

### URL analysis limitations

- models relied more on assumptions
- generated more generic recommendations
- produced more false positives
- lacked access to complete page structure

---

## 6.3 GPT-4.1-mini generated more generic reports

GPT-4.1-mini successfully identified many common accessibility issues, including:
- missing labels
- semantic problems
- navigation issues
- table accessibility issues

However, the responses were:
- less detailed
- more repetitive
- more template-based
- less context-aware compared to GPT-5.5

---

## 6.4 AI produced false positives on the AFTER page

An important observation was that both models still suggested accessibility improvements on the already improved AFTER page.

Examples included:
- unnecessary recommendations
- issues that were already fixed
- generic accessibility advice presented as actual problems

This demonstrates that AI models:
- may confuse improvements with real accessibility violations
- may over-report accessibility problems
- should not be considered fully reliable accessibility validators

---

# 7. Comparison With Traditional Accessibility Testing

| Testing Method | Advantages | Limitations |
|---|---|---|
| Manual Testing | Human judgment, usability understanding, real interaction testing | Slow and time-consuming |
| Automated Testing (axe-core) | Fast, consistent, accurate rule-based detection | Cannot understand usability context |
| AI-Assisted Testing | Provides explanations and fix suggestions, understands semantics | Can hallucinate issues and produce false positives |

---

# 8. Lessons Learned

During this project, several important lessons were learned:
- AI can assist accessibility testing by generating explanations and suggested fixes.
- More advanced models provide better accessibility reasoning.
- HTML input is more effective than URL-only analysis.
- AI models are useful for educational and support purposes.
- AI should not replace manual accessibility testing or automated accessibility tools.
- Combining AI, automation, and manual testing produces the best results.

---

# 9. Conclusion

This experiment demonstrated that AI can be a useful assistant for accessibility testing. GPT-5.5 showed strong performance in detecting accessibility issues and generating meaningful fixes, especially when analyzing HTML directly.

However, the results also showed important limitations:
- AI may generate false positives
- AI can provide generic recommendations
- AI cannot fully replace automated tools or human evaluation

The most effective approach is combining:
- manual accessibility testing
- automated accessibility tools
- AI-assisted analysis

This hybrid approach provides both technical accuracy and intelligent accessibility insights.
