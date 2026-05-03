# Accessibility Evaluation Report – Survey Page

**Generated:** 4/13/2026, 12:36:47 PM
**Tool:** axe-core v4.11.2 via Playwright

---

## 1. Introduction

This report presents the results of an automated accessibility evaluation conducted on the **Survey Page** of the W3C accessibility demonstration website. The evaluation compares two versions of the page:

- **Before version** – intentionally inaccessible implementation
- **After version** – improved, accessibility-compliant implementation

The goal is to identify accessibility barriers, evaluate improvements, and measure compliance with **WCAG 2.1 Level AA** standards.

---

## 2. Methodology

The accessibility analysis was performed using axe-core integrated into Playwright. The tool scans the DOM structure and identifies violations based on WCAG success criteria.

- **Tool:** axe-core v4.11.2
- **Test environment:** Browser-based execution via Playwright
- **Approach:** Automated accessibility testing
- **Test scenarios:** Page load, form fill, and form submission flows

Each detected issue is categorized by severity (Critical, Serious, Moderate, Minor), WCAG compliance level, and affected elements.

---

## 3. Summary of Results

| Version | Total Violations | Critical | Serious | Moderate / Minor |
|---|---|---|---|---|
| Before | 7 | 3 | 2 | 2 |
| After | 4 | 0 | 1 | 3 |

The After version demonstrates a substantial improvement, with all Critical issues resolved and the total violation count reduced from **7 to 4**.

---

## 4. Detailed Findings – Before Version

### 4.1 Critical Issues

#### 4.1.1 Images Without Alternative Text (`image-alt`)

- **Impact:** Critical
- **WCAG:** 1.1.1 – Non-text Content
- **Affected elements:** 24 `img` elements

Multiple `<img>` elements do not contain an `alt` attribute. Screen readers cannot interpret images without text alternatives.

**Recommendation:**
```html
<img src="nav_home.gif" alt="Home">
<img src="border_top.gif" alt="" role="presentation"> <!-- decorative -->
```

---

#### 4.1.2 Form Elements Without Labels (`label`)

- **Impact:** Critical
- **WCAG:** 4.1.2 – Name, Role, Value
- **Affected elements:** 11 `input` elements

Form inputs (including radio buttons) do not have associated `<label>` elements. Users of assistive technologies cannot determine the purpose of these inputs.

**Recommendation:**
```html
<label for="q1">Question 1</label>
<input id="q1" type="radio" name="q1" value="1">
```

---

#### 4.1.3 Select Element Without Accessible Name (`select-name`)

- **Impact:** Critical
- **WCAG:** 4.1.2 – Name, Role, Value
- **Affected elements:** 2 `select` elements

Two `<select>` elements have no associated label. Users cannot understand the purpose of the dropdowns.

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
- **Affected elements:** 20+ elements

Large portions of page content sit outside semantic landmark elements, forcing screen reader users to parse all content linearly.

**Recommendation for both:**
```html
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>
```

---

## 5. Detailed Findings – After Version

The After version resolves all Critical issues. Four lower-severity violations remain.

### 5.1 Resolved Issues

- **`image-alt`** (Critical): All images now have meaningful or empty `alt` attributes
- **`label`** (Critical): Form inputs now have associated visible labels
- **`select-name`** (Critical): Select elements now have accessible names
- **`html-has-lang`** (Serious): `lang` attribute is present on `<html>`
- **`link-name`** (Serious): Navigation links now have discernible text

### 5.2 Remaining Issues

| Issue ID | Impact | Description |
|---|---|---|
| `label-title-only` | Serious | `#cc` is labeled via `title` only, not a visible label |
| `landmark-one-main` | Moderate | No `<main>` landmark defined |
| `region` | Moderate | 23 elements still outside landmark regions |
| `empty-table-header` | Minor | First `<th>` in table has no discernible text |

### 5.3 Accessibility Strengths

- All images properly handled with `alt` text
- Descriptive link text throughout
- Improved semantic structure and keyboard navigation

---

## 6. Comparative Analysis

| Aspect | Before | After |
|---|---|---|
| Image accessibility | Missing alt text on 24+ images | Fully implemented |
| Form labels | 11 unlabeled inputs, 2 unlabeled selects | Resolved; one title-only issue remains |
| Link accessibility | 4 links without discernible text | Resolved |
| Page language | Missing `lang` attribute | Resolved |
| Landmark structure | No main landmark, 20+ elements outside regions | Improved; partially remains |
| Navigation | Difficult for assistive technologies | Significantly improved |

---

## 7. Conclusion

The Before version contains **3 critical** and **2 serious** violations that significantly limit usability for people with disabilities.

The After version resolves all critical issues and achieves strong compliance with WCAG 2.1 Level AA. However, 4 issues remain and should be addressed for full compliance.

**These issues affect:**
- Screen reader usability
- Keyboard navigation
- Voice control usability

---

## 8. Recommendations

- Add a `<main>` landmark and wrap all content in semantic regions
- Replace title-only labeling on `#cc` with a visible `<label>`
- Add descriptive text to the empty table header
- Ensure all future images include `alt` text
- Perform regular automated and manual accessibility testing

---

## 9. Appendix

- **Tool:** axe-core v4.11.2
- **Before URL:** https://www.w3.org/WAI/demos/bad/before/survey.html
- **After URL:** https://www.w3.org/WAI/demos/bad/after/survey.html
- **Evaluation type:** Automated accessibility testing via Playwright