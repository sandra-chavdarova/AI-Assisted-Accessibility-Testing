# AI Evaluation Report

## Method
Screenshots of the before and after survey pages were captured using Playwright
and sent to GPT-4o for visual accessibility analysis. The AI was asked to detect
accessibility issues by looking at the screenshots and categorize them by severity.

Pages tested:
- Before: https://www.w3.org/WAI/demos/bad/before/survey.html
- After: https://www.w3.org/WAI/demos/bad/after/survey.html


## What Automation (AI) Found

### Before page
1. Missing or unclear labels on form elements (Critical)
2. Poor color contrast (Serious)
3. Missing alt text on images (Critical)
4. Unclear focus indicators (Moderate)
5. Inconsistent form field alignment (Minor)
6. Inappropriate use of table for layout (Moderate)
7. Ambiguous button label (Minor)

### After page
1. Form elements may lack programmatic label association (Serious)
2. Color contrast should be verified (Minor)
3. Alt text cannot be confirmed from screenshot alone (Moderate)
4. Unclear focus indicators (Moderate)
5. Navigation structure should be verified (Minor)
6. Content complexity for cognitive accessibility (Moderate)

---

## Was AI Accurate?

Partially accurate. The AI correctly identified the two most critical issues on
the before page — missing form labels and missing image alt text — which were
also confirmed by axe-core as critical violations. However, it missed several
structural issues that axe-core detected, such as the missing lang attribute,
empty links, and missing landmark regions.

On the after page, the AI was less confident overall, frequently hedging with
phrases like "should be verified" and "cannot be determined from screenshot alone",
which limits the usefulness of its findings.


## Did It Hallucinate?

Possibly. The AI flagged color contrast and focus indicators as issues on both
pages, but axe-core did not confirm these as violations. Since the AI is making
visual judgments from a screenshot rather than measuring actual contrast ratios
or testing keyboard navigation, these findings may be false positives. They
cannot be confirmed without additional testing.

---

## Was It Useful?

Yes, to a limit. The AI provided a readable, structured report that
would be useful for a non-technical audience. It correctly prioritized the most
visually obvious issues and explained them clearly. However, it is not a
substitute for automated scanning tools like axe-core, which provide precise
WCAG references, affected element selectors, and verified violation counts.

---

## Comparison: AI vs axe-core

### Before page

| Issue                        | Found by axe-core | Found by AI |
|------------------------------|:-----------------:|:-----------:|
| Missing form labels          | YES (critical)    | YES         |
| Missing image alt text       | YES (critical)    | YES         |
| Missing lang attribute       | YES (serious)     | NO          |
| Empty links                  | YES (serious)     | NO          |
| Missing landmark regions     | YES (moderate)    | NO          |
| Color contrast               | NO                | YES (possible false positive) |
| Focus indicators             | NO                | YES (possible false positive) |
| Table layout misuse          | NO                | YES         |

### After page

| Issue                        | Found by axe-core | Found by AI |
|------------------------------|:-----------------:|:-----------:|
| label-title-only             | YES (serious)     | YES (partial) |
| Missing landmark regions     | YES (moderate)    | NO          |
| Empty table header           | YES (minor)       | NO          |
| Color contrast               | NO                | Flagged (unverified) |
| Focus indicators             | NO                | Flagged (unverified) |
| Content complexity           | NO                | YES         |

---

## Conclusion

AI-assisted screenshot analysis using GPT-4o was able to identify the most
visually obvious accessibility issues, particularly missing labels and alt text.
However, it struggled with structural and code-level issues that are not visible
in a screenshot, such as missing lang attributes, empty links, and landmark
structure. It also produced likely false positives for color contrast and focus
indicators by guessing from appearance rather than measuring.

axe-core remains the more reliable tool for precise, WCAG-referenced accessibility
testing. AI analysis is best used as a complementary tool — useful for quick
visual overviews or for communicating issues to non-technical stakeholders, but
not as a replacement for automated scanning.

A combined approach — running axe-core for precise violation detection and using
AI for explanation and reporting — provides the best results. Manual testing
remains equally essential, as some accessibility barriers cannot be detected by
any automated tool — issues like cognitive clarity, logical reading flow, actual
screen reader experience, and keyboard usability require a human tester to
evaluate properly.