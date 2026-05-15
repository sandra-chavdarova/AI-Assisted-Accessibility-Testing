# AI Accessibility Audit — Before (Inaccessible)
**Date:** 15 May 2026
**Model:** GPT-4o (web_search_preview enabled)
**Method:** URL-only — no context, no WCAG checklist provided to the AI
**URL analysed:** https://www.w3.org/WAI/demos/bad/before/survey.html

---

## Overall Score

3 / 10

---

## Summary

The survey page exhibits multiple accessibility issues that hinder users with disabilities from effectively interacting with the content. Key problems include missing alternative text for images, insufficient color contrast, unlabeled form elements, and inaccessible navigation menus. Addressing these issues is crucial to enhance the page's accessibility.

---

## Issue Breakdown

| Severity | Count |
|---|---|
| Critical | 3 |
| Serious  | 4 |
| Moderate | 3 |
| Minor    | 0 |
| **Total** | **10** |

---

## Strengths

- The page provides a survey form, indicating an intent to engage users.

---

## Top 3 Priority Fixes

1. Add descriptive alternative text to all informative images.
2. Ensure sufficient color contrast between text and background elements.
3. Provide clear and descriptive labels for all form inputs.

---

## All Issues Found

| ID | Severity | WCAG Criterion | Level | Category | Element | Problem | Recommended Fix |
|---|---|---|---|---|---|---|---|
| 1 | Critical | 1.1.1 Non-text Content | A | Perceivable | Images throughout the page | Informative images lack alternative text, making them inaccessible to screen reader users. | Add descriptive alternative text to all informative images to convey their purpose and content. |
| 2 | Serious | 1.4.3 Contrast (Minimum) | AA | Perceivable | Text elements on colored backgrounds | Text does not have sufficient contrast against its background, affecting readability for users with low vision or color blindness. | Ensure a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text between text and background colors. |
| 3 | Critical | 3.3.2 Labels or Instructions | A | Understandable | Form input fields | Form inputs lack associated labels, making it difficult for screen reader users to understand the purpose of each field. | Provide clear and descriptive labels for all form inputs, ensuring they are programmatically associated with their respective fields. |
| 4 | Serious | 2.4.4 Link Purpose (In Context) | A | Operable | Navigation links | Links are not descriptive, making it unclear to users what the destination or purpose of each link is. | Use descriptive link text that clearly indicates the purpose or destination of the link. |
| 5 | Critical | 2.1.1 Keyboard | A | Operable | Navigation menu | The navigation menu is not accessible via keyboard, preventing users who rely on keyboard navigation from accessing menu items. | Ensure all interactive elements, including navigation menus, are operable through keyboard inputs. |
| 6 | Moderate | 2.4.2 Page Titled | A | Perceivable | Page title | The page lacks a descriptive title, making it difficult for users to understand the purpose of the page. | Provide a clear and descriptive title for the page that reflects its content and purpose. |
| 7 | Serious | 1.3.1 Info and Relationships | A | Perceivable | Form structure | The form lacks proper structural elements, making it difficult for assistive technologies to interpret the relationships between form controls. | Use appropriate HTML elements and attributes to define the structure and relationships of form controls. |
| 8 | Serious | 2.4.7 Focus Visible | AA | Operable | Interactive elements | Interactive elements do not have a visible focus indicator, making it difficult for keyboard users to determine which element has focus. | Ensure all interactive elements have a visible focus indicator to assist keyboard navigation. |
| 9 | Moderate | 3.1.1 Language of Page | A | Understandable | HTML element | The page does not specify the default language, which can affect screen reader pronunciation and translation tools. | Specify the default language of the page using the 'lang' attribute in the HTML element. |
| 10 | Moderate | 2.2.2 Pause, Stop, Hide | A | Operable | Scrolling news ticker | The scrolling news ticker cannot be paused, stopped, or hidden, which can be distracting for users. | Provide controls to pause, stop, or hide moving content that starts automatically and lasts more than five seconds. |
