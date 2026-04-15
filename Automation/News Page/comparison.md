# Accessibility Evaluation Report
## News Page – Manual vs Automated Testing

---

## 1. Introduction

This report presents a comprehensive accessibility evaluation of the “News Page” using both manual and automated testing approaches. The objective is to identify accessibility issues affecting users with disabilities and to compare the effectiveness of manual testing methods versus automated tools.

The evaluation is based on the Web Content Accessibility Guidelines (WCAG) principles:
- Perceivable
- Operable
- Understandable
- Robust

Two main approaches were used:
- Manual testing (keyboard, screen reader, voice control, visual inspection)
- Automated testing using axe-core integrated with Playwright

---

## 2. Methodology

### 2.1 Manual Testing

Manual testing was conducted to simulate real user interactions, focusing on:

- Keyboard navigation (Tab, Enter, focus behavior)
- Screen reader compatibility (structure, semantics, navigation clarity)
- Voice control interaction (command-based navigation)
- Visual inspection (color contrast and readability)

This approach evaluates usability and real-world accessibility behavior.

---

### 2.2 Automated Testing

Automated testing was performed using:

- axe-core accessibility engine
- Playwright for end-to-end interaction flows

The automated analysis focuses on:

- Semantic HTML validation
- ARIA and accessibility attributes
- WCAG rule violations
- Structural issues (landmarks, labels, alt text)

---

## 3. Findings

---

### 3.1 Keyboard Navigation (Operable)

#### Manual Findings
- Keyboard focus is lost due to `onfocus="blur()"`, preventing navigation
- Navigation relies on JavaScript instead of semantic links
- Focus indicator is not visible
- Focus order is illogical due to table-based layout
- Dropdown menu is difficult to operate using keyboard
- Skip links are missing

#### Automated Findings
- `link-name`: Links do not have accessible names
- `select-name`: `<select>` element missing label
- `html-has-lang`: Missing language attribute
- `region`: Missing or incomplete landmarks

#### Analysis
Manual testing reveals critical interaction failures (focus loss, unusable navigation), while automated tools detect missing structural and semantic properties. Automated tools cannot reliably detect dynamic focus issues.

---

### 3.2 Screen Reader and Semantic Structure (Perceivable, Understandable)

#### Manual Findings
- Missing heading hierarchy (`<h1>`–`<h6>`)
- Navigation unclear due to image-based and JavaScript links
- Poor content structure caused by table layout
- Links are not descriptive
- Missing semantic landmarks (`<nav>`, `<main>`, `<header>`)
- Non-functional link (“News”)

#### Automated Findings
- `image-alt`: Missing or empty alternative text
- `link-name`: Links lack accessible text
- `landmark-one-main`: Missing `<main>` landmark
- `region`: Content not contained within landmarks

#### Analysis
Automated tools effectively detect missing semantics and attributes, while manual testing identifies issues related to meaning, clarity, and usability from a screen reader perspective.

---

### 3.3 Voice Control (Operable)

#### Manual Findings
- Some links cannot be activated using voice commands
- `<select>` elements require prior focus or interaction
- Voice navigation is inconsistent

#### Automated Findings
- `select-name`: Indicates missing accessible label
- No direct support for voice interaction testing

#### Analysis
Voice accessibility issues can only be reliably identified through manual testing, as automated tools do not simulate voice input behavior.

---

### 3.4 Color Contrast (Perceivable)

#### Manual Findings
- Insufficient contrast between text and background
- Link colors are not easily distinguishable
- Reduced readability in multiple sections

#### Automated Findings
- `color-contrast`: Detects insufficient contrast (when triggered)

#### Analysis
Automated tools can identify contrast violations programmatically, but manual inspection provides better insight into real-world readability and visual clarity.

---

### 3.5 Structural Landmarks (Robust)

#### Manual Findings
- Missing semantic landmarks
- Table-based layout reduces clarity and accessibility

#### Automated Findings
- `landmark-one-main`: Missing `<main>`
- `region`: Content outside landmarks

#### Analysis
Both methods consistently identify structural issues. Automated testing is highly reliable for detecting missing landmark elements.

---

### 3.6 Links and Navigation (Operable, Understandable)

#### Manual Findings
- Navigation unclear due to JavaScript and image-based links
- Links are not descriptive
- Some links are non-functional

#### Automated Findings
- `link-name`: Links lack accessible names
- JavaScript-based navigation detected
- Images inside links missing alternative text

#### Analysis
Automation identifies technical failures, while manual testing evaluates usability and clarity of navigation.

---

### 3.7 Images and Media (Perceivable)

#### Manual Findings
- Missing alternative text
- Empty or non-descriptive alt attributes
- Inconsistent quality of image descriptions

#### Automated Findings
- `image-alt`: Missing or empty alt attributes

#### Analysis
There is strong alignment between manual and automated findings. Automated tools are highly effective for detecting missing alt attributes.

---

## 4. Comparison Summary

| Area | Manual Testing | Automated Testing |
|------|--------------|------------------|
| Keyboard navigation | Very effective | Limited |
| Screen reader support | Very effective | Effective |
| Voice control | Essential | Not supported |
| Color contrast | Effective | Moderate |
| Semantic structure | Moderate | Very effective |
| Link accessibility | Effective | Effective |
| Image accessibility | Effective | Very effective |

---

## 5. Conclusion

The evaluation demonstrates that both manual and automated testing approaches are necessary for a complete accessibility assessment.

Automated tools such as axe-core are highly effective in identifying structural and code-level issues, including missing attributes, improper semantics, and WCAG violations. They are particularly useful for scalability and regression testing.

However, manual testing is essential for detecting real-world usability issues, including keyboard navigation problems, focus management, voice interaction, and overall user experience.

A combined approach provides the most accurate and comprehensive evaluation:
- Automated testing ensures compliance with technical standards
- Manual testing ensures usability and accessibility in practice

---

## 6. Key Insight

Automated testing identifies what is structurally incorrect in the code, while manual testing identifies what is functionally unusable for real users.