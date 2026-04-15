# Accessibility Evaluation Report

## 1. Introduction

This report presents the results of an accessibility evaluation conducted on the “News Page” using automated testing tools (axe-core via Playwright). The goal of the analysis is to identify accessibility issues that may affect users with disabilities, particularly those relying on assistive technologies.

The evaluation is based on the Web Content Accessibility Guidelines (WCAG) and focuses on identifying violations that impact usability, perception, and navigation.

---

## 2. Methodology

The accessibility analysis was performed using automated testing with axe-core integrated into Playwright. The tool scans the DOM structure and identifies violations based on WCAG success criteria.

Each detected issue is categorized according to:
- Severity (impact): critical, serious, moderate
- WCAG compliance level: A, AA
- Affected elements (nodes)

For each issue, a human-readable explanation, impact analysis, and recommended fix are provided.

---

## 3. Identified Issues

### 3.1 Missing Language Attribute

- **Issue ID:** html-has-lang
- **Impact:** Serious
- **WCAG Criterion:** 3.1.1 – Language of Page

**Description:**  
The `<html>` element does not contain a `lang` attribute.

**Why this is a problem:**  
Screen readers rely on the language attribute to correctly pronounce text. Without it, content may be read incorrectly.

**Affected Element:**

```html
<html>
```

**Recommendation:**
```html
<html lang="en">
```

---

### 3.2 Images Without Alternative Text

- **Issue ID:** image-alt
- **Impact:** Critical
- **WCAG Criterion:** 1.1.1 – Non-text Content

**Description:**  
Multiple `<img>` elements do not contain alternative text (`alt` attribute) or any accessible name.

**Why this is a problem:**  
Screen readers cannot interpret images without text alternatives.

**Affected Elements (examples):**
```html
<img src="nav_home.gif">
<img src="border_top.gif">
```

**Recommendation:**

Informative images:
```html
<img src="nav_home.gif" alt="Home">
```

Decorative images:
```html
<img src="border_top.gif" alt="" role="presentation">
```

---

### 3.3 Links Without Discernible Text

- **Issue ID:** link-name
- **Impact:** Serious
- **WCAG Criteria:** 2.4.4, 4.1.2

**Description:**  
Links contain only images without accessible text.

**Why this is a problem:**  
Users cannot understand the purpose of the link.

**Affected Elements:**
```html
<a href="home.html">
  <img src="nav_home.gif">
</a>
```

**Recommendation:**

Option 1:
```html
<a href="home.html">
  <img src="nav_home.gif" alt="Home">
</a>
```

Option 2:
```html
<a href="home.html" aria-label="Home">
  <img src="nav_home.gif" alt="">
</a>
```

---

### 3.4 Content Not Contained Within Landmarks

- **Issue ID:** region
- **Impact:** Moderate

**Description:**  
Some content is not placed within semantic landmark elements.

**Why this is a problem:**  
Assistive technologies rely on landmarks for navigation.

**Affected Elements:**
- headings
- navigation containers
- footer
- page wrapper
```html
<h1>...</h1>
<div id="mnav">...</div>
<div id="page">...</div>
```

**Recommendation:**
```html
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>
```

---

### 3.5 Select Element Without Accessible Name

- **Issue ID:** select-name
- **Impact:** Critical
- **WCAG Criterion:** 4.1.2

**Description:**  
The `<select>` element does not have an associated label.

**Why this is a problem:**  
Users cannot understand the purpose of the dropdown.

**Affected Element:**
```html
<select onchange="location.href = this.value;">
```

**Recommendation:**

Option 1:
```html
<label for="menu">Choose page:</label>
<select id="menu">
```

Option 2:
```html
<select aria-label="Choose page">
```

---

## 4. Conclusion

The accessibility evaluation revealed several critical and serious issues that significantly impact usability for users with disabilities.

Key problems include:
- Missing alternative text for images
- Links without accessible names
- Form elements without labels
  Impact:

### These issues significantly affect:

- screen reader usability
- keyboard navigation
- voice control usability

Addressing these issues will improve WCAG compliance and overall accessibility of the web page.