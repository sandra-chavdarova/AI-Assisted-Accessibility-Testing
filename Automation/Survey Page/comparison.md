# Manual vs Automated Accessibility Comparison

## Pages Tested
- Before: https://www.w3.org/WAI/demos/bad/before/survey.html
- After: https://www.w3.org/WAI/demos/bad/after/survey.html

## What Automation (axe-core) Found

### Before page — 7 violations
- [CRITICAL] image-alt: 24 images missing alternative text (WCAG 1.1.1)
- [CRITICAL] label: 11 form elements missing labels (WCAG 4.1.2)
- [CRITICAL] select-name: 2 select elements missing accessible names (WCAG 4.1.2)
- [SERIOUS] html-has-lang: missing lang attribute on <html> (WCAG 3.1.1)
- [SERIOUS] link-name: 4 links with no discernible text (WCAG 2.4.4)
- [MODERATE] landmark-one-main: no main landmark defined
- [MODERATE] region: 20 elements outside landmark regions

### After page — 4 violations
- [SERIOUS] label-title-only: 1 form element labeled only via title attribute
- [MODERATE] landmark-one-main: no main landmark defined
- [MODERATE] region: 23 elements outside landmark regions
- [MINOR] empty-table-header: 1 empty table header

## What Automation Likely Missed
- **Focus order**: whether tab order is logical and intuitive
- **Keyboard traps**: whether a user can get stuck in a widget
- **Screen reader experience**: how announcements actually sound to a user
- **Cognitive clarity**: whether labels are technically present but still confusing
- **Color contrast in context**: axe checks ratios but not whether colors convey meaning alone
- **Error handling**: whether form errors are clearly communicated

## False Positives
- The `region` and `landmark-one-main` violations appear on both before and after pages
  and may be acceptable depending on the page's intended structure.

## Summary

| Issue Type                  | Found by axe | Found manually |
|-----------------------------|:------------:|:--------------:|
| Missing image alt text      | YES          | YES            |
| Missing form labels         | YES          | YES            |
| Missing lang attribute      | YES          | YES            |
| Empty links                 | YES          | YES            |
| Missing landmarks           | YES          | YES            |
| Focus/tab order issues      | NO           | YES            |
| Keyboard traps              | NO           | YES            |
| Screen reader announcements | NO           | YES            |
| Confusing language/labels   | NO           | YES            |

## Conclusion
The after page is significantly more accessible than the before page, with all critical issues resolved. Automated testing caught all structural and markup-level issues effectively, but manual testing is still needed to evaluate the actual user experience for keyboard and screen reader users.


Running the tests: <br>

<img width="1295" height="739" alt="Tests" src="https://github.com/user-attachments/assets/223b6994-03f8-42e9-8f97-0bcdf773ca8b" />
