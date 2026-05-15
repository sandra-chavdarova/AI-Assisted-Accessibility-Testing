# AI Accessibility Audit — After (Accessible)
**Date:** 15 May 2026
**Model:** GPT-4o (web_search_preview enabled)
**Method:** URL-only — no context, no WCAG checklist provided to the AI
**URL analysed:** https://www.w3.org/WAI/demos/bad/after/survey.html

---

## Overall Score

9.5 / 10

---

## Summary

The accessible survey page demonstrates a high level of compliance with WCAG 2.1 guidelines, effectively addressing common accessibility barriers. Minor issues remain that, if corrected, would further enhance accessibility.

---

## Issue Breakdown

| Severity | Count |
|---|---|
| Critical | 0 |
| Serious  | 0 |
| Moderate | 0 |
| Minor    | 3 |
| **Total** | **3** |

---

## Strengths

- Proper association of form labels with inputs
- Logical and intuitive tab order
- Clear instructions and error messages

---

## Top 3 Priority Fixes

1. Ensure all form elements have appropriate labels
2. Provide text alternatives for all non-text content
3. Verify sufficient color contrast for all text elements

---

## All Issues Found

| ID | Severity | WCAG Criterion | Level | Category | Element | Problem | Recommended Fix |
|---|---|---|---|---|---|---|---|
| issue1 | Minor | 1.1.1 Non-text Content | A | Non-text Content | Image of 'Sunny Spells' | The image lacks a descriptive text alternative, which is essential for users relying on screen readers. | Add a descriptive alt attribute to the image, such as 'Weather forecast: Sunny Spells'. |
| issue2 | Minor | 1.4.3 Contrast (Minimum) | AA | Visual Contrast | Navigation menu text | The color contrast between the navigation menu text and background may not meet the minimum contrast ratio of 4.5:1, potentially making it difficult for users with low vision to read. | Adjust the text color or background color to achieve a contrast ratio of at least 4.5:1. |
| issue3 | Minor | 3.3.2 Labels or Instructions | A | Form Labels | Dropdown for 'Greenest City' | The dropdown lacks a visible label, which can cause confusion for users, especially those using assistive technologies. | Ensure the dropdown has a visible and descriptive label, such as 'Select the greenest city'. |
