# Comparison of Manual vs Automated Accessibility Testing – Tickets Page

## 1. Introduction

This document compares the findings from manual accessibility testing and automated testing performed using Playwright and axe-core on the Tickets page. The goal is to evaluate the capabilities and limitations of each approach and to understand how they complement each other.

---

## 2. Results of Automated Testing

Automated testing identified several accessibility issues in the "Before" version of the page. These findings are based on rule-based analysis aligned with WCAG 2.1 standards.

### Detected Issues

- **Missing alternative text (`image-alt`)**  
  Images without `alt` attributes or accessible names were detected. This is a critical issue affecting screen reader users.

- **Insufficient color contrast (`color-contrast`)**  
  Text elements did not meet the required contrast ratio of 4.5:1, reducing readability.

- **Links without accessible names (`link-name`)**  
  Some links lacked descriptive text, making navigation unclear for assistive technologies.

- **Structural issues (`landmark-one-main`, `region`)**  
  Missing or incorrect use of semantic landmarks affected page structure and navigation.

### Validation of Improvements

Automated testing confirmed that:

- The number of violations decreased significantly in the "After" version  
- Critical issues such as missing alternative text were resolved  
- Improvements were consistent across tested scenarios  

---

## 3. Results of Manual Testing

Manual testing identified additional issues related to usability and interaction, which were not detected by automated tools.

### Detected Issues

- **Keyboard focus trapping**  
  Focus was restricted to certain sections, preventing full navigation through the page.

- **Non-logical focus order**  
  The sequence of navigation did not follow an intuitive order.

- **Readability issues**  
  Excessive use of uppercase text reduced readability and scanning efficiency.

- **Screen reader behavior issues**  
  Screen readers announced entire sections instead of focused elements, leading to confusing feedback.

---

## 4. Limitations of Automated Testing

Automated tools such as axe-core are effective for detecting rule-based violations, but they do not evaluate user experience.

### Not Detected by Automation

- Keyboard navigation problems (e.g. focus trapping)  
- Readability and visual clarity  
- Screen reader interaction behavior  
- Logical flow of navigation  

These aspects require manual testing and cannot be reliably assessed through automation alone.

---

## 5. False Positives

No significant false positives were identified. The issues reported by automated testing correspond to actual accessibility problems and align with manual findings.

---

## 6. Comparative Summary

| Aspect                     | Manual Testing | Automated Testing |
|--------------------------|---------------|------------------|
| Technical compliance     | Yes           | Yes              |
| Usability evaluation     | Yes           | No               |
| Interaction behavior     | Yes           | No               |
| Speed                    | No            | Yes              |
| Consistency              | No            | Yes              |

---

## 7. Conclusion

Automated testing is effective for identifying technical accessibility issues and verifying improvements between versions. However, it does not capture usability and interaction-related problems.

Manual testing is essential for evaluating real user experience and identifying issues that cannot be detected automatically.

A combination of both approaches provides a complete and reliable accessibility evaluation.