# Accessibility Evaluation Report – Tickets Page

## 1. Introduction

This report presents the results of an automated accessibility evaluation conducted on the *Tickets Page* of the W3C accessibility demonstration website. The evaluation compares two versions of the page:

- **Before version** – intentionally inaccessible implementation  
- **After version** – improved, accessibility-compliant implementation  

The purpose of this assessment is to identify accessibility barriers, evaluate improvements, and measure compliance with **WCAG 2.1 Level AA** standards.

---

## 2. Methodology

The evaluation was conducted using:

- **Tool:** axe-core (v4.11.2)  
- **Test environment:** Browser-based execution (Playwright scenario)  
- **Approach:** Automated accessibility testing  
- **Test scenario:** Keyboard navigation flow across the Tickets page  

The analysis includes:
- Detection of accessibility violations  
- Classification by severity (Critical, Serious, Moderate)  
- Comparison between Before and After implementations  

---

## 3. Summary of Results

| Version | Total Violations | Critical | Serious | Moderate |
|----------|------------------|-----------|----------|-----------|
| Before   | 4                | 0         | 3        | 1         |
| After    | 1                | 0         | 1        | 0         |


---

## 4. Detailed Findings – Before Version

The Before version contains several accessibility violations that significantly impact usability, particularly for users relying on assistive technologies.

---

### 4.1 Serious Issues

#### 4.1.1 Incorrect List Structure (`listitem`)

- List items are not properly contained within semantic list containers (`<ul>` or `<ol>`)

**Impact:**
- Screen readers may interpret navigation structure incorrectly
- Content hierarchy becomes less clear for assistive technologies


#### 4.1.2 Insufficient Color Contrast (`color-contrast`)

- Example:  
  - Foreground: `#41545d`  
  - Background: `#a9b8bf`  
  - Contrast ratio: **3.88:1** (below required 4.5:1)

**Impact:**
- Poor readability for users with low vision  
- Fails WCAG AA requirements  


#### 4.1.3 Links Without Accessible Names (`link-name`)

- Links rely on images or unclear text  
- Missing descriptive labels  

**Impact:**
- Screen readers cannot announce link purpose  
- Navigation becomes confusing and inefficient  

**WCAG Reference:** 2.4.4 Link Purpose  

---

### 4.2 Moderate Issues

#### 4.2.1 Missing Semantic Regions (`region`)

- Page content is not properly grouped within semantic landmark regions

**Impact:**
- Reduced structural clarity for assistive technologies
- More difficult navigation for screen reader users

---

## 5. Detailed Findings – After Version

The After version (accessible implementation) shows **significant improvements**, confirmed by the automated report.

---

### 5.1 Resolved Issues

#### Improved Color Contrast
- Contrast ratios significantly exceed WCAG thresholds  
- Example:
  - Contrast ratio up to **21:1** (excellent compliance)

---

#### Accessible Links
- Links now contain descriptive text  
- Screen readers can correctly interpret navigation elements  

---

#### Improved Page Structure
- Proper use of semantic landmarks:
  - `<main>`
  - `<nav>`
  - Logical heading hierarchy  

---

### 5.2 Accessibility Strengths

The After version demonstrates:

- Clear heading structure  
- Presence of skip navigation mechanisms  
- Proper semantic HTML usage  
- High contrast readability across elements  
- Improved keyboard navigation support  

---

## 6. Comparative Analysis

| Aspect | Before | After |
|------|--------|-------|
| List structure | Incorrect semantic lists | Properly structured lists |
| Color contrast | Fails WCAG | Meets/exceeds standards |
| Link accessibility | Unclear links | Descriptive links |
| Page structure | Poor semantics | Proper landmarks |
| Navigation | Difficult | Improved |

---

## 7. Conclusion

The accessibility evaluation clearly demonstrates that the **Before version** contains multiple serious and moderate accessibility issues.

The **After version successfully resolves the majority of these issues**, achieving strong compliance with WCAG 2.1 Level AA guidelines.

Key improvements include:
- Proper handling of non-text content  
- Enhanced visual accessibility  
- Improved semantic structure  
- Better support for assistive technologies  

Overall, the After implementation represents a **well-designed, accessible web page**, suitable for inclusive use.

---

## 8. Recommendations

Although the After version is significantly improved, the following best practices should be continuously maintained:

- Ensure semantic HTML structures are consistently maintained
- Maintain sufficient color contrast across all UI elements  
- Use semantic HTML and ARIA roles appropriately  
- Regularly perform automated and manual accessibility testing  

---

## 9. Appendix

- Tool used: axe-core (v4.11.2)  

- Test URLs:  
  - Before: https://www.w3.org/WAI/demos/bad/before/tickets.html  
  - After: https://www.w3.org/WAI/demos/bad/after/tickets.html  

- Evaluation type: Automated accessibility testing  

- Test scenario: Keyboard navigation flow executed using Playwright

---
