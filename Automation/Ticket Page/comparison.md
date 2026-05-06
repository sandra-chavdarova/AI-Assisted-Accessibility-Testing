# Manual vs Automated Accessibility Comparison

## Pages Tested
- Before: https://www.w3.org/WAI/demos/bad/before/tickets.html
- After: https://www.w3.org/WAI/demos/bad/after/tickets.html

## What Automation (axe-core) Found

Automated testing identified several accessibility issues in the "Before" version of the page. These findings are based on rule-based analysis aligned with WCAG 2.1 standards.

### Before page — 4 violations

- **Missing alternative text (`image-alt`)**  
  Images without `alt` attributes or accessible names were detected. This is a critical issue affecting screen reader users.

- **Insufficient color contrast (`color-contrast`)**  
  Text elements did not meet the required contrast ratio of 4.5:1, reducing readability.

- **Links without accessible names (`link-name`)**  
  Some links lacked descriptive text, making navigation unclear for assistive technologies.

- **Structural issues (`landmark-one-main`, `region`)**  
  Missing or incorrect use of semantic landmarks affected page structure and navigation.

### After page — significantly fewer violations
- Color contrast issues resolved
- Alternative text issues resolved
- Improved semantic structure and navigation


## What Automation Likely Missed

- **Keyboard focus trapping**: whether keyboard users can navigate through the entire page without getting stuck

- **Focus order**: whether interactive elements follow a logical and intuitive navigation sequence

- **Screen reader behavior**: whether screen readers announce focused elements clearly and correctly

- **Readability issues**: whether excessive uppercase text reduces readability and scanning efficiency

- **Navigation clarity**: whether links and menus are understandable and usable for assistive technology users

## False Positives

No significant false positives were identified during testing.

The issues reported by axe-core corresponded to actual accessibility problems confirmed through manual testing, particularly related to alternative text, color contrast, and page structure.


## Limitations of Automated Testing

Automated tools such as axe-core are effective for detecting rule-based accessibility violations, but they cannot evaluate real user experience or interaction behavior.

Automated testing cannot reliably detect:
- Keyboard navigation issues
- Focus trapping
- Logical focus order
- Screen reader interaction quality
- Readability and visual clarity
- Whether content structure is intuitive for users

## Summary

| Issue Type                    | Found by axe | Found manually | Why axe misses it         |
|--------------------------------|:------------:|:--------------:|---------------------------|
| Missing alternative text       | YES          | YES            | Detectable in DOM         |
| Color contrast issues          | YES          | YES            | Detectable in DOM         |
| Missing landmark structure     | YES          | YES            | Detectable in DOM         |
| Links without accessible names | YES          | YES            | Detectable in DOM         |
| Keyboard focus trapping        | NO           | YES            | Requires interaction      |
| Non-logical focus order        | NO           | YES            | Requires human judgment   |
| Screen reader behavior issues  | NO           | YES            | Requires assistive tech   |
| Readability issues             | NO           | YES            | Requires human judgment   |
| Navigation clarity issues      | NO           | YES            | Requires user interaction |



## Conclusion

Automated testing is effective for identifying technical accessibility issues and verifying improvements between versions. However, it does not capture usability and interaction-related problems.

Manual testing is essential for evaluating real user experience and identifying issues that cannot be detected automatically.

A combination of both approaches provides a complete and reliable accessibility evaluation.
