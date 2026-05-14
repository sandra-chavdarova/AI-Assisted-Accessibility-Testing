# AI Evaluation Report — W3C BAD Survey Pages

## Method

Two complementary evaluation methods were run against the W3C "Before and After" survey demo:

- **axe-core v4.11.2** — automated DOM scanning via Playwright, full-page static scan and interactive flow scan scoped to `#page`
- **GPT-4o screenshot analysis** — visual analysis of full-page screenshots and targeted cropped regions ("traps")

The screenshot analysis used two modes:

1. **Full-page** — the complete before/after page sent to GPT-4o without any hints
2. **Trap experiment** — seven cropped regions sent individually; some contained real issues (REAL), some were correctly implemented controls (FALSE+). The AI was not told which was which.

Pages tested:
- Before: https://www.w3.org/WAI/demos/bad/before/survey.html
- After: https://www.w3.org/WAI/demos/bad/after/survey.html

---

## Trap Experiment Results

Each cropped image was sent to GPT-4o with a neutral prompt asking it to identify any accessibility issues or explain why the UI was accessible. The AI received no labels or ground truth.

| Trap ID | Type | Image shows | Score |
|---|---|---|---|
| `false-positive-fieldset` | FALSE+ | Fieldset + legend + labelled radio buttons | Correct — did not false-positive |
| `false-positive-table` | FALSE+ | Table with correct `<th scope>` markup | Incorrect — flagged valid markup as having issues |
| `full-page-after` | FULL_PAGE | Complete accessible "after" page | Correct — did not false-positive |
| `table-missing-th` | REAL | "love it"/"hate it" as `<td>` not `<th>` | Correct — issue identified |
| `select-no-label` | REAL | QUICKMENU `<select>` with no label | Correct — issue identified |
| `newsletter-unlabelled-inputs` | REAL | Unlabelled name/email/radio inputs | Correct — issue identified |
| `full-page-before` | FULL_PAGE | Complete inaccessible "before" page | Correct — issue identified |

6/7 traps scored correctly. The one failure was the hardest trap: the accessible version of the organ table looks visually identical to the inaccessible version — only the underlying `<th>` vs `<td>` markup differs, which cannot be seen in a screenshot.

---

## Comparison: axe-core vs GPT-4o

### Before page

| Issue | axe-core | GPT-4o full page | GPT-4o trap |
|---|---|---|---|
| Missing form labels on 11 inputs | Critical (label) | Identified | Identified |
| Missing `<label>` on 2 select elements | Critical (select-name) | Identified | Identified (select-no-label trap) |
| Missing alt text on 24 images | Critical (image-alt) | Identified | Not covered by a trap |
| Missing `lang` attribute on `<html>` | Serious (html-has-lang) | Missed | Not covered by a trap |
| 4 links with no discernible text | Serious (link-name) | Missed | Not covered by a trap |
| No `<main>` landmark | Moderate (landmark-one-main) | Missed | Not covered by a trap |
| 20+ elements outside landmark regions | Moderate (region) | Missed | Not covered by a trap |
| Table row headers as `<td>` not `<th>` | Not found | Identified | Identified (table-missing-th trap) |
| Color contrast | Not found | Flagged — unverified | Flagged — unverified |
| Focus indicators | Not found | Flagged — unverified | Not covered by a trap |

### After page

| Issue | axe-core | GPT-4o full page | GPT-4o trap |
|---|---|---|---|
| `#cc` labeled via `title` only, no visible label | Serious (label-title-only) | Partial — flagged label concerns without precision | Not covered by a trap |
| No `<main>` landmark | Moderate (landmark-one-main) | Missed | Not covered by a trap |
| 23 elements outside landmark regions | Moderate (region) | Missed | Not covered by a trap |
| Empty first `<th>` in table | Minor (empty-table-header) | Missed | Not covered by a trap |
| False positive — fieldset/legend radio group | No violation | Correctly cleared | Correctly cleared |
| False positive — table with correct `<th scope>` | No violation | Not tested in isolation | Incorrectly flagged as having issues |
| Color contrast | Not found | Flagged — unverified | Not covered by a trap |

---

## Accuracy Analysis

### What the AI got right

**Visually obvious label issues** were caught reliably in both the full-page and trap conditions. Missing labels on form inputs, radio buttons, and the QUICKMENU select were identified consistently, matching axe-core's critical findings.

**The table row-header problem** (`<td>` used instead of `<th>` for "love it"/"hate it") was caught by GPT-4o but not by axe-core. This is a case where visual and semantic analysis surfaces something automated DOM scanning missed.

**False positive avoidance on clear cases** — the fieldset/legend/label radio group was correctly cleared as accessible. The AI recognised the correct pattern even without access to the HTML.

### Where the AI fell short

**Code-level issues are invisible to screenshot analysis.** The missing `lang` attribute, empty links, and landmark structure problems — three of axe-core's findings on the before page — cannot be seen in a screenshot and were missed entirely. This is a hard ceiling for any visual analysis approach.

**The closest false-positive trap failed.** The accessible version of the organ table was incorrectly flagged with serious and moderate issues despite being correctly implemented. Visually, the before and after tables are indistinguishable; only the `<th scope>` markup differs. The AI generated plausible-sounding issues (missing headers, insufficient contrast, no caption) rather than acknowledging uncertainty.

**Unverified contrast and focus findings appeared on both pages.** axe-core found no contrast or focus violations on either version, yet GPT-4o flagged both repeatedly. Since the AI is making visual judgments from a static image rather than measuring contrast ratios or testing keyboard navigation, these are likely false positives generated when the model is uncertain.

**The after-page full-page analysis was hedged throughout**, with phrases like "should be verified" and "cannot be confirmed from screenshot alone" appearing across multiple findings. While appropriately cautious, this limits the practical value of the output.

---

## Summary of Violations

### Before page — axe-core

| Issue | Impact | WCAG |
|---|---|---|
| Missing alt text on 24 images | Critical | 1.1.1 |
| 11 form inputs without labels | Critical | 4.1.2 |
| 2 select elements without accessible name | Critical | 4.1.2 |
| Missing `lang` attribute | Serious | 3.1.1 |
| 4 links without discernible text | Serious | 2.4.4, 4.1.2 |
| No `<main>` landmark | Moderate | — |
| 20+ elements outside landmarks | Moderate | — |

### After page — axe-core (remaining issues)

| Issue | Impact | WCAG |
|---|---|---|
| `#cc` labeled via `title` only | Serious | — |
| No `<main>` landmark | Moderate | — |
| 23 elements outside landmarks | Moderate | — |
| Empty first table header | Minor | — |

The after version resolved all 3 critical and both serious issues present in the before version, reducing total violations from 7 to 4.

---

## Conclusion

axe-core and GPT-4o screenshot analysis are complementary tools with distinct and largely non-overlapping strengths.
 
**axe-core** is precise and verifiable. It provides exact WCAG references, affected element selectors, and violation counts. It reliably detects code-level issues — missing attributes, landmark structure, link text — that are invisible to any visual tool. Its limitation is that it only finds what it can measure programmatically. axe-core's WCAG-scoped scan did not cover table row-header structure, as the relevant rules fall under best-practice rather than a WCAG tag. GPT-4o identified the issue visually.
 
**GPT-4o screenshot analysis** was able to identify the most visually obvious accessibility issues, particularly missing labels and alt text. It adds value for visually apparent problems — unlabelled inputs, missing group context, and semantic table issues that manifest in the rendered UI — and produces readable, plain-language explanations useful for communicating findings to non-technical stakeholders. However, it struggled with structural and code-level issues not visible in a screenshot, such as missing lang attributes, empty links, and landmark structure. It also produced likely false positives for color contrast and focus indicators by guessing from appearance rather than measuring, and performed unreliably on cases where the before and after versions look visually identical.
 
**Neither tool replaces manual testing.** Cognitive clarity, logical reading flow, actual screen reader behaviour, and keyboard usability require a human tester to evaluate. No automated tool, visual or DOM-based, can fully substitute for this.