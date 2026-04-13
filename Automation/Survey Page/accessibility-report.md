#Accessibility Audit Report

Generated: 4/13/2026, 12:36:47 PM

---

## .last-run

**URL:** undefined

**Total violations:** 0

No violations found.

---

## survey-after-flow-load

**URL:** https://www.w3.org/WAI/demos/bad/after/survey.html

**Total violations:** 4

### [SERIOUS] SERIOUS (1)

#### label-title-only: Form elements should have a visible label
- **Description:** Ensure that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes
- **WCAG:** 
- **Affected elements (1):**
  - `#cc`
    - Fix all of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright

### [MODERATE] MODERATE (2)

#### landmark-one-main: Document should have one main landmark
- **Description:** Ensure the document has a main landmark
- **WCAG:** 
- **Affected elements (1):**
  - `html`
    - Fix all of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright

#### region: All page content should be contained by landmarks
- **Description:** Ensure all page content is contained by landmarks
- **WCAG:** 
- **Affected elements (23):**
  - `#logos`
    - Fix any of the following:
  - `#meta-header > h1`
    - Fix any of the following:
  - `.subline`
    - Fix any of the following:
  - ...and 20 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/region?application=playwright

### [MINOR] MINOR (1)

#### empty-table-header: Table header text should not be empty
- **Description:** Ensure table headers have discernible text
- **WCAG:** 
- **Affected elements (1):**
  - `thead > tr > th:nth-child(1)`
    - Fix any of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright

---

## survey-after-flow-submitted

**URL:** https://www.w3.org/WAI/demos/bad/after/survey.html

**Total violations:** 4

### [SERIOUS] SERIOUS (1)

#### label-title-only: Form elements should have a visible label
- **Description:** Ensure that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes
- **WCAG:** 
- **Affected elements (1):**
  - `#cc`
    - Fix all of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright

### [MODERATE] MODERATE (2)

#### landmark-one-main: Document should have one main landmark
- **Description:** Ensure the document has a main landmark
- **WCAG:** 
- **Affected elements (1):**
  - `html`
    - Fix all of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright

#### region: All page content should be contained by landmarks
- **Description:** Ensure all page content is contained by landmarks
- **WCAG:** 
- **Affected elements (23):**
  - `#logos`
    - Fix any of the following:
  - `#meta-header > h1`
    - Fix any of the following:
  - `.subline`
    - Fix any of the following:
  - ...and 20 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/region?application=playwright

### [MINOR] MINOR (1)

#### empty-table-header: Table header text should not be empty
- **Description:** Ensure table headers have discernible text
- **WCAG:** 
- **Affected elements (1):**
  - `thead > tr > th:nth-child(1)`
    - Fix any of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright

---

## survey-after

**URL:** https://www.w3.org/WAI/demos/bad/after/survey.html

**Total violations:** 4

### [SERIOUS] SERIOUS (1)

#### label-title-only: Form elements should have a visible label
- **Description:** Ensure that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes
- **WCAG:** 
- **Affected elements (1):**
  - `#cc`
    - Fix all of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/label-title-only?application=playwright

### [MODERATE] MODERATE (2)

#### landmark-one-main: Document should have one main landmark
- **Description:** Ensure the document has a main landmark
- **WCAG:** 
- **Affected elements (1):**
  - `html`
    - Fix all of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright

#### region: All page content should be contained by landmarks
- **Description:** Ensure all page content is contained by landmarks
- **WCAG:** 
- **Affected elements (23):**
  - `#logos`
    - Fix any of the following:
  - `#meta-header > h1`
    - Fix any of the following:
  - `.subline`
    - Fix any of the following:
  - ...and 20 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/region?application=playwright

### [MINOR] MINOR (1)

#### empty-table-header: Table header text should not be empty
- **Description:** Ensure table headers have discernible text
- **WCAG:** 
- **Affected elements (1):**
  - `thead > tr > th:nth-child(1)`
    - Fix any of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/empty-table-header?application=playwright

---

## survey-before-flow-filled

**URL:** https://www.w3.org/WAI/demos/bad/before/survey.html

**Total violations:** 7

### [CRITICAL] CRITICAL (3)

#### image-alt: Images must have alternative text
- **Description:** Ensure <img> elements have alternative text or a role of none or presentation
- **WCAG:** wcag2a, wcag111
- **Affected elements (24):**
  - `img[src$="border_left_top.gif"]`
    - Fix any of the following:
  - `img[src$="border_top.gif"]`
    - Fix any of the following:
  - `img[src$="border_right_top.gif"]`
    - Fix any of the following:
  - ...and 21 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/image-alt?application=playwright

#### label: Form elements must have labels
- **Description:** Ensure every form element has a label
- **WCAG:** wcag2a, wcag412
- **Affected elements (11):**
  - `input[value="1"]`
    - Fix any of the following:
  - `input[value="2"]`
    - Fix any of the following:
  - `input[value="3"]`
    - Fix any of the following:
  - ...and 8 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/label?application=playwright

#### select-name: Select element must have an accessible name
- **Description:** Ensure select element has an accessible name
- **WCAG:** wcag2a, wcag412
- **Affected elements (2):**
  - `select[onchange="location.href = this.value;"]`
    - Fix any of the following:
  - `select[name="cc"]`
    - Fix any of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/select-name?application=playwright

### [SERIOUS] SERIOUS (2)

#### html-has-lang: <html> element must have a lang attribute
- **Description:** Ensure every HTML document has a lang attribute
- **WCAG:** wcag2a, wcag311
- **Affected elements (1):**
  - `html`
    - Fix any of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/html-has-lang?application=playwright

#### link-name: Links must have discernible text
- **Description:** Ensure links have discernible text
- **WCAG:** wcag2a, wcag244, wcag412
- **Affected elements (4):**
  - `#home > a[onfocus="blur();"]`
    - Fix all of the following:
  - `#news > a[onfocus="blur();"]`
    - Fix all of the following:
  - `#tickets > a[onfocus="blur();"]`
    - Fix all of the following:
  - ...and 1 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/link-name?application=playwright

### [MODERATE] MODERATE (2)

#### landmark-one-main: Document should have one main landmark
- **Description:** Ensure the document has a main landmark
- **WCAG:** 
- **Affected elements (1):**
  - `html`
    - Fix all of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright

#### region: All page content should be contained by landmarks
- **Description:** Ensure all page content is contained by landmarks
- **WCAG:** 
- **Affected elements (20):**
  - `#logos`
    - Fix any of the following:
  - `h1`
    - Fix any of the following:
  - `.subline`
    - Fix any of the following:
  - ...and 17 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/region?application=playwright

---

## survey-before-flow-load

**URL:** https://www.w3.org/WAI/demos/bad/before/survey.html

**Total violations:** 7

### [CRITICAL] CRITICAL (3)

#### image-alt: Images must have alternative text
- **Description:** Ensure <img> elements have alternative text or a role of none or presentation
- **WCAG:** wcag2a, wcag111
- **Affected elements (24):**
  - `img[src$="border_left_top.gif"]`
    - Fix any of the following:
  - `img[src$="border_top.gif"]`
    - Fix any of the following:
  - `img[src$="border_right_top.gif"]`
    - Fix any of the following:
  - ...and 21 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/image-alt?application=playwright

#### label: Form elements must have labels
- **Description:** Ensure every form element has a label
- **WCAG:** wcag2a, wcag412
- **Affected elements (11):**
  - `input[value="1"]`
    - Fix any of the following:
  - `input[value="2"]`
    - Fix any of the following:
  - `input[value="3"]`
    - Fix any of the following:
  - ...and 8 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/label?application=playwright

#### select-name: Select element must have an accessible name
- **Description:** Ensure select element has an accessible name
- **WCAG:** wcag2a, wcag412
- **Affected elements (2):**
  - `select[onchange="location.href = this.value;"]`
    - Fix any of the following:
  - `select[name="cc"]`
    - Fix any of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/select-name?application=playwright

### [SERIOUS] SERIOUS (2)

#### html-has-lang: <html> element must have a lang attribute
- **Description:** Ensure every HTML document has a lang attribute
- **WCAG:** wcag2a, wcag311
- **Affected elements (1):**
  - `html`
    - Fix any of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/html-has-lang?application=playwright

#### link-name: Links must have discernible text
- **Description:** Ensure links have discernible text
- **WCAG:** wcag2a, wcag244, wcag412
- **Affected elements (4):**
  - `#home > a[onfocus="blur();"]`
    - Fix all of the following:
  - `#news > a[onfocus="blur();"]`
    - Fix all of the following:
  - `#tickets > a[onfocus="blur();"]`
    - Fix all of the following:
  - ...and 1 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/link-name?application=playwright

### [MODERATE] MODERATE (2)

#### landmark-one-main: Document should have one main landmark
- **Description:** Ensure the document has a main landmark
- **WCAG:** 
- **Affected elements (1):**
  - `html`
    - Fix all of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright

#### region: All page content should be contained by landmarks
- **Description:** Ensure all page content is contained by landmarks
- **WCAG:** 
- **Affected elements (20):**
  - `#logos`
    - Fix any of the following:
  - `h1`
    - Fix any of the following:
  - `.subline`
    - Fix any of the following:
  - ...and 17 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/region?application=playwright

---

## survey-before

**URL:** https://www.w3.org/WAI/demos/bad/before/survey.html

**Total violations:** 7

### [CRITICAL] CRITICAL (3)

#### image-alt: Images must have alternative text
- **Description:** Ensure <img> elements have alternative text or a role of none or presentation
- **WCAG:** wcag2a, wcag111
- **Affected elements (24):**
  - `img[src$="border_left_top.gif"]`
    - Fix any of the following:
  - `img[src$="border_top.gif"]`
    - Fix any of the following:
  - `img[src$="border_right_top.gif"]`
    - Fix any of the following:
  - ...and 21 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/image-alt?application=playwright

#### label: Form elements must have labels
- **Description:** Ensure every form element has a label
- **WCAG:** wcag2a, wcag412
- **Affected elements (11):**
  - `input[value="1"]`
    - Fix any of the following:
  - `input[value="2"]`
    - Fix any of the following:
  - `input[value="3"]`
    - Fix any of the following:
  - ...and 8 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/label?application=playwright

#### select-name: Select element must have an accessible name
- **Description:** Ensure select element has an accessible name
- **WCAG:** wcag2a, wcag412
- **Affected elements (2):**
  - `select[onchange="location.href = this.value;"]`
    - Fix any of the following:
  - `select[name="cc"]`
    - Fix any of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/select-name?application=playwright

### [SERIOUS] SERIOUS (2)

#### html-has-lang: <html> element must have a lang attribute
- **Description:** Ensure every HTML document has a lang attribute
- **WCAG:** wcag2a, wcag311
- **Affected elements (1):**
  - `html`
    - Fix any of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/html-has-lang?application=playwright

#### link-name: Links must have discernible text
- **Description:** Ensure links have discernible text
- **WCAG:** wcag2a, wcag244, wcag412
- **Affected elements (4):**
  - `#home > a[onfocus="blur();"]`
    - Fix all of the following:
  - `#news > a[onfocus="blur();"]`
    - Fix all of the following:
  - `#tickets > a[onfocus="blur();"]`
    - Fix all of the following:
  - ...and 1 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/link-name?application=playwright

### [MODERATE] MODERATE (2)

#### landmark-one-main: Document should have one main landmark
- **Description:** Ensure the document has a main landmark
- **WCAG:** 
- **Affected elements (1):**
  - `html`
    - Fix all of the following:
- **More info:** https://dequeuniversity.com/rules/axe/4.11/landmark-one-main?application=playwright

#### region: All page content should be contained by landmarks
- **Description:** Ensure all page content is contained by landmarks
- **WCAG:** 
- **Affected elements (20):**
  - `#logos`
    - Fix any of the following:
  - `h1`
    - Fix any of the following:
  - `.subline`
    - Fix any of the following:
  - ...and 17 more
- **More info:** https://dequeuniversity.com/rules/axe/4.11/region?application=playwright

---

