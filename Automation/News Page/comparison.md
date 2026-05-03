# Manual vs Automated Accessibility Comparison

## Pages Tested
- Before: https://www.w3.org/WAI/demos/bad/before/news.html
- After: https://www.w3.org/WAI/demos/bad/after/news.html

## What Automation (axe-core) Found

### Before page — 6 violations
- [CRITICAL] image-alt: 39 images missing alternative text (WCAG 1.1.1)
- [CRITICAL] select-name: 1 select element missing accessible name (WCAG 4.1.2)
- [SERIOUS] html-has-lang: missing lang attribute on `<html>` (WCAG 3.1.1)
- [SERIOUS] link-name: 4 links with no discernible text (WCAG 2.4.4)
- [MODERATE] landmark-one-main: no main landmark defined
- [MODERATE] region: 6 elements outside landmark regions

### After page — 2 violations
- [MODERATE] landmark-one-main: no main landmark defined
- [MODERATE] region: 14 elements outside landmark regions

## What Automation Likely Missed
- **Tab order:** whether the sequence of focusable elements is logical for keyboard users
- **Keyboard traps:** whether focus can become stuck inside a component
- **Screen reader output:** how content is actually read aloud by assistive technology
- **Label clarity:** whether labels are present in code but still confusing in practice
- **Meaningful use of color:** axe validates contrast ratios but not color-as-only-indicator
- **Non-functional links:** links that exist in the DOM but lead nowhere or do nothing
- **Voice control:** whether interactive elements can be reliably targeted by voice commands
- **Scripted navigation:** whether JavaScript-driven interactions hold up without a mouse
## False Positives
- The `region` and `landmark-one-main` violations appear on both before and after pages
  and may be acceptable depending on the page's intended structure.

## Limitations of Automated Testing

Automated tools like axe-core can only evaluate what is measurable in the DOM.
They cannot simulate the actual experience of a user with a disability.
Studies suggest automated tools catch only **30-40% of real accessibility issues**.

Gaps that remain regardless of tool sophistication:
- Whether the focus sequence feels intuitive during real navigation
- Whether a screen reader's announcements are helpful or confusing
- Whether a page remains usable under cognitive load or time pressure
- Whether visible focus indicators are clear enough in practice
- Whether voice commands reliably reach the right targets
- Whether scripted interactions degrade gracefully without a pointer device
## Summary

| Issue Type                  | Found by axe | Found manually | Why axe misses it         |
|-----------------------------|:------------:|:--------------:|---------------------------|
| Missing image alt text      | YES          | YES            | Detectable in DOM         |
| Missing lang attribute      | YES          | YES            | Detectable in DOM         |
| Empty links                 | YES          | YES            | Detectable in DOM         |
| Missing select label        | YES          | YES            | Detectable in DOM         |
| Missing landmarks           | YES          | YES            | Detectable in DOM         |
| Focus/tab order issues      | NO           | YES            | Requires human judgment   |
| Keyboard traps              | NO           | YES            | Requires interaction      |
| Screen reader announcements | NO           | YES            | Requires assistive tech   |
| Voice control usability     | NO           | YES            | Requires interaction      |
| Confusing language/labels   | NO           | YES            | Requires human judgment   |
| Cognitive clarity           | NO           | YES            | Requires human judgment   |
| Non-functional links        | NO           | YES            | Requires human judgment   |

## Conclusion

Axe-core reliably surfaces structural and markup-level problems — all 6 violations on
the before page were caught automatically. The after page clears nearly every automated
check, reducing violations from 6 to just 2.

That said, a passing automated score does not mean the page is fully accessible.
Real users navigating by keyboard, screen reader, or voice may still encounter broken
focus flows, unhelpful announcements, or commands that simply do not work — none of
which any automated tool can evaluate.

Automated testing surfaces what the code gets wrong.
Manual testing surfaces what the experience gets wrong.
A complete accessibility evaluation requires both.