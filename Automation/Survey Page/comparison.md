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

## Limitations of Automated Testing

Automated tools like axe-core can only evaluate what is measurable in the DOM.
They cannot simulate the actual experience of a user with a disability.
Studies suggest automated tools catch only **30-40% of real accessibility issues**.

Specific things axe-core cannot detect:
- Whether the tab order makes sense to a real user
- Whether a screen reader announces things in a useful way
- Whether error messages are understandable, not just present
- Whether the page is usable under time pressure or cognitive load
- Whether focus indicators are visible enough in practice

## Summary

| Issue Type                  | Found by axe | Found manually | Why axe misses it         |
|-----------------------------|:------------:|:--------------:|---------------------------|
| Missing image alt text      | YES          | YES            | Detectable in DOM         |
| Missing form labels         | YES          | YES            | Detectable in DOM         |
| Missing lang attribute      | YES          | YES            | Detectable in DOM         |
| Empty links                 | YES          | YES            | Detectable in DOM         |
| Missing landmarks           | YES          | YES            | Detectable in DOM         |
| Focus/tab order issues      | NO           | YES            | Requires human judgment   |
| Keyboard traps              | NO           | YES            | Requires interaction      |
| Screen reader announcements | NO           | YES            | Requires assistive tech   |
| Confusing language/labels   | NO           | YES            | Requires human judgment   |
| Cognitive clarity           | NO           | YES            | Requires human judgment   |

## Conclusion

Automated testing with axe-core is a valuable first step — it reliably catches
structural and markup-level issues, and found all 7 violations on the before page.
However, it is not a replacement for manual testing.

The after page passes most automated checks, but a real keyboard or screen reader
user may still struggle with focus order, confusing announcements, or unclear error
messages — none of which axe-core can detect.

**Automated testing tells you what is broken in the code.
Manual testing tells you what is broken for the user.**
Both are necessary for a truly accessible page.


Running the tests: <br>