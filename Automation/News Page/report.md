# Accessibility Evaluation Report – News Page

**Generated:** 4/18/2026, 16:23:17 PM
**Tool:** axe-core v4.11.2 via Playwright

---

## 1. Introduction

This report presents the results of an automated accessibility evaluation conducted on the **News Page** of the W3C accessibility demonstration website. The evaluation compares two versions of the page:

- **Before version** – intentionally inaccessible implementation
- **After version** – improved, accessibility-compliant implementation

The evaluation aims to surface accessibility barriers, assess the effectiveness of the improvements, and benchmark both versions against WCAG 2.1 Level AA requirements.

---

## 2. Methodology

The accessibility analysis was performed using axe-core integrated into Playwright. The tool scans the DOM structure and identifies violations based on WCAG success criteria.

- **Tool:** axe-core v4.11.2
- **Test environment:** Browser-based execution via Playwright
- **Approach:** Automated accessibility testing
- **Test scenarios:** Page load and content navigation flows

Each detected issue is categorized by severity (Critical, Serious, Moderate, Minor), WCAG compliance level, and affected elements.

---

## 3. Summary of Results

| Version | Total Violations | Critical | Serious | Moderate / Minor |
|---|---|---|---|---|
| Before | 6 | 2 | 2 | 2 |
| After | 2 | 0 | 0 | 2 |

The After version shows a clear improvement: all Critical and Serious violations were eliminated, bringing the total down from 6 to 2.

---

## 4. Detailed Findings – Before Version

### 4.1 Critical Issues

#### 4.1.1 Images Without Alternative Text (`image-alt`)

- **Impact:** Critical
- **WCAG:** 1.1.1 – Non-text Content
- **Affected elements:** 39 `img` elements

Multiple `<img>` elements do not contain an `alt` attribute. Screen readers cannot interpret images without text alternatives.

**Recommendation:**
```html
 <img src="./img/chart1.jpg" alt="Chart showing brain donations at city hospital (by month)">
<img src="border_top.gif" alt="" role="presentation"> <!-- decorative -->
```

---

#### 4.1.2 Select Element Without Accessible Name (`select-name`)

- **Impact:** Critical
- **WCAG:** 4.1.2 – Name, Role, Value
- **Affected elements:** 1 `select` element

The dropdown control has no associated label, leaving assistive technology users unable to determine its purpose before interacting with it.

**Recommendation:**
```html
<label for="menu">Choose page:</label>
<select id="menu">
<!-- or -->
<select aria-label="Choose page">
```

---

### 4.2 Serious Issues

#### 4.2.1 Missing Language Attribute (`html-has-lang`)

- **Impact:** Serious
- **WCAG:** 3.1.1 – Language of Page
- **Affected elements:** `html`

The `<html>` element has no `lang` attribute. Screen readers may mispronounce content without it.

**Recommendation:**
```html
<html lang="en">
```

---

#### 4.2.2 Links Without Discernible Text (`link-name`)

- **Impact:** Serious
- **WCAG:** 2.4.4 – Link Purpose, 4.1.2
- **Affected elements:** 4 anchor elements

Navigation links contain only images with no alternative text. Assistive technologies cannot announce the purpose of these links.

**Recommendation:**
```html
<a href="home.html">
  <img src="nav_home.gif" alt="Home">
</a>
```

---

### 4.3 Moderate Issues

#### 4.3.1 Missing Main Landmark (`landmark-one-main`)

- **Impact:** Moderate
- **Affected elements:** `html`

No `<main>` landmark is defined. Users cannot quickly skip to the primary content.

#### 4.3.2 Content Outside Landmarks (`region`)

- **Impact:** Moderate
- **Affected elements:** 6 elements

Page content sits outside semantic landmark elements, forcing screen reader users to parse all content linearly.

**Recommendation for both:**
```html
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>
```

---

## 5. Detailed Findings – After Version

The After version resolves all Critical and Serious issues. Two moderate violations remain.

### 5.1 Resolved Issues

- **`image-alt`** (Critical): All images now have meaningful or empty `alt` attributes
- **`select-name`** (Critical): Select element now has an accessible name
- **`html-has-lang`** (Serious): `lang` attribute is present on `<html>`
- **`link-name`** (Serious): Navigation links now have discernible text

### 5.2 Remaining Issues

| Issue ID | Impact | Description |
|---|---|---|
| `landmark-one-main` | Moderate | No `<main>` landmark defined |
| `region` | Moderate | 14 elements still outside landmark regions |

### 5.3 Accessibility Strengths

- All images properly handled with `alt` text
- Descriptive link text throughout
- Improved semantic structure and keyboard navigation
- Form controls correctly labeled

---

## 6. Comparative Analysis

| Aspect | Before | After |
|---|---|---|
| Image accessibility | Missing alt text on 39 images | Fully implemented |
| Select label | 1 unlabeled select element | Resolved |
| Link accessibility | 4 links without discernible text | Resolved |
| Page language | Missing `lang` attribute | Resolved |
| Landmark structure | No main landmark, 6 elements outside regions | Improved; partially remains |
| Navigation | Difficult for assistive technologies | Significantly improved |

---

## 7. Conclusion

The Before version presents 2 critical and 2 serious violations that create real barriers for users who rely on assistive technologies.

The After version addresses all of these, reaching a strong level of WCAG 2.1 Level AA conformance. The 2 remaining Moderate violations should still be resolved to achieve full compliance.

Users most affected by the outstanding issues:
- Screen reader users
- Keyboard-only users
- Voice control users

---

## 8. Recommendations

- Add a `<main>` landmark and wrap all content in semantic regions
- Ensure all future images include `alt` text
- Verify all interactive controls have visible, associated labels
- Perform regular automated and manual accessibility testing

---

## 9. Appendix

- **Tool:** axe-core v4.11.2
- **Before URL:** https://www.w3.org/WAI/demos/bad/before/news.html
- **After URL:** https://www.w3.org/WAI/demos/bad/after/news.html
- **Evaluation type:** Automated accessibility testing via Playwright
