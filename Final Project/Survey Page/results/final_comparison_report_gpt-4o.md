# Final Accessibility Testing Report
**Date:** 15 May 2026
**Project:** W3C BAD Demo — Survey Page (Before vs After)
**Testing Methods:** Manual Exploration | Axe-core v4.11.2 via Playwright | AI (GPT-4o, URL-only)

---

## 1. Executive Summary

This report compares three accessibility testing approaches applied to the W3C "Before and After Demonstration" survey pages — one intentionally inaccessible, one remediated. Each method reveals a different layer of accessibility problems, demonstrating that no single approach is sufficient on its own.

| Metric | Before Page | After Page | Improvement |
|---|---|---|---|
| Manual Issues Found | 10 | 3 | −7 |
| Axe-core Violations | 7 | 4 | −3 |
| AI Issues Found | 10 | 3 | −7 |
| AI Score (/ 10) | 3 | 9.5 | +6.5 |

---

## 2. Manual Testing Results

> **Method:** Direct browser exploration, keyboard-only navigation, visual inspection, and form interaction testing

### First Impressions

At first glance, the two versions of the survey page appear visually similar. However, after closer inspection, the After version provides a noticeably better user experience and improved accessibility.

In the After version, content is easier to read due to better spacing and clearer visual structure. Labels for input fields are positioned **above** the fields, making the form more intuitive. In the Before version, labels appear **below** inputs, which is confusing for users.

Interactive elements such as buttons are more clearly highlighted in the After version. The table at the bottom is more structured and readable. A significant improvement is in **form behaviour and error handling**: the Before version loses all user input on invalid submission, while the After version preserves input and displays clear, descriptive error messages.

### Before Page — Manual Findings

| # | Issue | WCAG | Severity |
|---|---|---|---|
| 1 | Labels positioned below inputs — confusing reading order | 1.3.2 Meaningful Sequence | Serious |
| 2 | No visible error messages on form submission | 3.3.1 Error Identification | Critical |
| 3 | All form data lost after failed submission | 3.3.1 Error Identification | Critical |
| 4 | Buttons not clearly distinguishable as interactive | 1.3.3 Sensory Characteristics | Moderate |
| 5 | Tab order unclear / non-logical through the form | 2.4.3 Focus Order | Serious |
| 6 | No skip navigation link | 2.4.1 Bypass Blocks | Serious |
| 7 | Images used as navigation links with no text alternative | 1.1.1 Non-text Content | Critical |
| 8 | Table at bottom lacks clear headers or structure | 1.3.1 Info and Relationships | Moderate |
| 9 | Colour alone used to distinguish some interface elements | 1.4.1 Use of Colour | Moderate |
| 10 | No page language — screen reader may mispronounce | 3.1.1 Language of Page | Serious |

**Summary:** The Before page fails on multiple fundamental accessibility criteria. The most impactful issues are the complete loss of form data on submission error, absent error messages, and navigation images without alt text. Keyboard users and screen reader users would find this page very difficult or impossible to use effectively.

### After Page — Manual Findings

| # | Issue | WCAG | Severity |
|---|---|---|---|
| 1 | One form field (#cc) labeled via title attribute only — not a visible label | 1.3.1 Info and Relationships | Moderate |
| 2 | No `<main>` landmark defined | 4.1.2 Name, Role, Value | Moderate |
| 3 | Some content still outside semantic landmark regions | 1.3.1 Info and Relationships | Minor |

**Summary:** The After version resolves all critical usability issues. Form validation is clear, input is preserved on error, labels are correctly positioned, and navigation is logical. Three lower-severity structural issues remain but do not significantly impede usability.

---

## 3. Axe-core Automation Results

> **Tool:** axe-core v4.11.2 via Playwright
> **Scan types:** Full page static scan + interactive flow scan scoped to `#page`

### Before Page — Axe-core Findings

| Rule ID | Impact | WCAG | Description | Elements Affected |
|---|---|---|---|---|
| `image-alt` | Critical | 1.1.1 | 24 `<img>` elements missing `alt` attribute | 24 |
| `label` | Critical | 4.1.2 | Form inputs have no associated `<label>` | 11 |
| `select-name` | Critical | 4.1.2 | `<select>` elements have no accessible name | 2 |
| `html-has-lang` | Serious | 3.1.1 | `<html>` element missing `lang` attribute | 1 |
| `link-name` | Serious | 2.4.4 | Navigation links contain no discernible text | 4 |
| `landmark-one-main` | Moderate | — | No `<main>` landmark defined | 1 |
| `region` | Moderate | — | 20+ elements outside landmark regions | 20+ |

**Total violations: 7** (3 Critical, 2 Serious, 2 Moderate)

**Flow scan:** 4 violations on initial load; 5 after keyboard interaction.

### After Page — Axe-core Findings

| Rule ID | Impact | WCAG | Description | Elements Affected |
|---|---|---|---|---|
| `label-title-only` | Serious | 1.3.1 | `#cc` field labeled via `title` only | 1 |
| `landmark-one-main` | Moderate | — | No `<main>` landmark defined | 1 |
| `region` | Moderate | — | 23 elements outside landmark regions | 23 |
| `empty-table-header` | Minor | 1.3.1 | First `<th>` in table has no discernible text | 1 |

**Total violations: 4** (0 Critical, 1 Serious, 2 Moderate, 1 Minor)

**Flow scan:** 0 violations on load; 0 after form submission.

---

## 4. AI Testing Results (GPT-4o — URL Only)

> **Model:** GPT-4o with web_search_preview
> **Method:** AI was given only the URL — no description, no WCAG checklist, no context
> **Date:** 15 May 2026

### Before Page

**Score:** 3 / 10

**AI Summary:**
The survey page exhibits multiple accessibility issues that hinder users with disabilities from effectively interacting with the content. Key problems include missing alternative text for images, insufficient color contrast, unlabeled form elements, and inaccessible navigation menus. Addressing these issues is crucial to enhance the page's accessibility.

**Strengths identified by AI:**
- The page provides a survey form, indicating an intent to engage users.

**Top 3 priority fixes (AI recommendation):**
1. Add descriptive alternative text to all informative images.
2. Ensure sufficient color contrast between text and background elements.
3. Provide clear and descriptive labels for all form inputs.

#### All Issues Found by AI (Before)

| ID | Severity | WCAG Criterion | Level | Category | Element | Problem | Fix |
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


---

### After Page

**Score:** 9.5 / 10

**AI Summary:**
The accessible survey page demonstrates a high level of compliance with WCAG 2.1 guidelines, effectively addressing common accessibility barriers. Minor issues remain that, if corrected, would further enhance accessibility.

**Strengths identified by AI:**
- Proper association of form labels with inputs
- Logical and intuitive tab order
- Clear instructions and error messages

**Remaining issues noted by AI:**
1. Ensure all form elements have appropriate labels
2. Provide text alternatives for all non-text content
3. Verify sufficient color contrast for all text elements

#### All Issues Found by AI (After)

| ID | Severity | WCAG Criterion | Level | Category | Element | Problem | Fix |
|---|---|---|---|---|---|---|---|
| issue1 | Minor | 1.1.1 Non-text Content | A | Non-text Content | Image of 'Sunny Spells' | The image lacks a descriptive text alternative, which is essential for users relying on screen readers. | Add a descriptive alt attribute to the image, such as 'Weather forecast: Sunny Spells'. |
| issue2 | Minor | 1.4.3 Contrast (Minimum) | AA | Visual Contrast | Navigation menu text | The color contrast between the navigation menu text and background may not meet the minimum contrast ratio of 4.5:1, potentially making it difficult for users with low vision to read. | Adjust the text color or background color to achieve a contrast ratio of at least 4.5:1. |
| issue3 | Minor | 3.3.2 Labels or Instructions | A | Form Labels | Dropdown for 'Greenest City' | The dropdown lacks a visible label, which can cause confusion for users, especially those using assistive technologies. | Ensure the dropdown has a visible and descriptive label, such as 'Select the greenest city'. |


---

## 5. Comparative Analysis — All Three Methods

### Issue Detection Coverage

| Issue Type | Manual | Axe-core | AI |
|---|---|---|---|
| Missing image alt text | YES | YES | YES |
| Missing / incorrect form labels | YES | YES | YES |
| Missing lang attribute | YES | YES | YES |
| Empty / unclear links | YES | YES | YES |
| Missing landmark structure | YES | YES | YES |
| Labels below inputs (reading order) | YES | NO | Partial |
| Form data lost on error | YES | NO | NO |
| No error messages shown | YES | NO | Partial |
| Focus / tab order issues | YES | NO | NO |
| No skip navigation link | YES | NO | NO |
| Cognitive clarity of labels | YES | NO | Partial |
| Empty table header | YES | YES | YES |

### Issue Counts Side by Side

| Severity | Manual (Before) | Axe-core (Before) | AI (Before) |
|---|---|---|---|
| Critical | 3 | 3 | 3 |
| Serious | 4 | 2 | 4 |
| Moderate | 3 | 2 | 3 |
| Minor | 0 | 0 | 0 |
| **Total** | **10** | **7** | **10** |

| Severity | Manual (After) | Axe-core (After) | AI (After) |
|---|---|---|---|
| Critical | 0 | 0 | 0 |
| Serious | 0 | 1 | 0 |
| Moderate | 2 | 2 | 0 |
| Minor | 1 | 1 | 3 |
| **Total** | **3** | **4** | **3** |

### Method Strengths & Limitations

| Method | Strengths | Limitations |
|---|---|---|
| **Manual** | Catches UX, cognitive, and interaction issues; tests real form behaviour | Slow, resource-intensive, subjective |
| **Axe-core** | Fast, consistent, CI/CD-friendly, precise WCAG rule IDs | Catches only ~30–40% of real issues; no interaction testing |
| **AI (URL-only)** | No setup required; plain-language explanations; useful first-pass | Cannot execute JS; cannot emulate screen readers |

### What Each Method Uniquely Detected

**Manual only:** Form data loss on failed submission, absence of error messages, non-logical tab order, no skip navigation link, colour-as-only-differentiator.

**Axe-core only:** Exact node counts with DOM paths, precise WCAG rule IDs for CI integration, flow scan detection of issues that only appear after keyboard interaction.

**AI only:** Plain-language narrative explanations useful for non-technical stakeholders, holistic first-pass audit with no tooling setup required.

---

## 6. Lessons Learned

1. **No single method is sufficient.** Each approach catches a distinct category of issues.
2. **Axe-core is strongest for structural DOM issues** — reliable, exact, and CI-friendly.
3. **Manual testing is irreplaceable for real user experience** — form data loss was found only manually.
4. **AI works well as a fast, zero-setup first pass** — useful for early-stage audits or non-technical stakeholders.
5. **The After page is not fully accessible** — all three methods still found remaining issues after remediation.
6. **Automated tools can produce false positives** — human judgement is still required to interpret results.

---

## 7. Conclusion

The Before page fails significantly across all three testing methods, with critical barriers for screen reader users, keyboard users, and anyone relying on clear error feedback. The After page resolves all critical issues and achieves strong WCAG 2.1 Level AA compliance, but minor issues remain across all methods.

**Automated testing tells you what is broken in the code. Manual testing tells you what is broken for the user. AI testing provides a fast, explainable bridge between the two.** A mature accessibility testing strategy should combine all three.

---

## 8. Appendix

| Item | Detail |
|---|---|
| Before URL | https://www.w3.org/WAI/demos/bad/before/survey.html |
| After URL | https://www.w3.org/WAI/demos/bad/after/survey.html |
| Axe-core version | v4.11.2 via Playwright |
| AI model | GPT-4o (web_search_preview enabled) |
| AI method | URL-only — no context or WCAG checklist provided |
| Manual method | Browser exploration, keyboard navigation, form interaction |
| Report generated | 15 May 2026 |

*AI section generated automatically. Manual and Axe-core sections completed by the project team.*
