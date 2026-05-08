## 1. Summary of accessibility issues

### Confirmed findings from `violations`

The axe-core scan reports **8 violation IDs**:

1. **`image-alt` — Critical**
   - **Issue:** Images must have alternative text.
   - **Confirmed affected nodes:** 26 `<img>` elements.
   - **Evidence:** Multiple images do not have an `alt` attribute, do not have `aria-label`, do not have `aria-labelledby`, do not have a `title`, and are not marked with `role="none"` or `role="presentation"`.
   - **Examples from scan:**
     - `<img src="./img/border_left_top.gif" width="10px" height="10px">`
     - `<img src="./img/nav_home.gif" ...>`
     - `<img src="./img/headline_ticket_prices.gif" border="0">`

2. **`select-name` — Critical**
   - **Issue:** Select element must have an accessible name.
   - **Confirmed affected nodes:** 1 `<select>` element.
   - **Evidence:** The `<select onchange="location.href = this.value;">` has no implicit label, explicit label, `aria-label`, `aria-labelledby`, or `title`.

3. **`color-contrast` — Serious**
   - **Issue:** Some text does not meet minimum color contrast ratio thresholds.
   - **Confirmed affected nodes:** 8 text elements.
   - **Evidence:** Foreground `#41545d` on background `#a9b8bf` has a contrast ratio of **3.88**, below the expected **4.5:1**.
   - **Examples from scan:**
     - `Les Garçons`
     - `The Obelisks`
     - `ADULT`
     - `FS`
     - `RS`
     - `DC`
     - `ST`
     - `Group (5 or more)`

4. **`html-has-lang` — Serious**
   - **Issue:** The HTML document does not have a `lang` attribute.
   - **Confirmed affected nodes:** 1 `<html>` element.
   - **Evidence:** The scan states: “The `<html>` element does not have a lang attribute.”

5. **`link-name` — Serious**
   - **Issue:** Some links do not have discernible accessible text.
   - **Confirmed affected nodes:** 4 links.
   - **Evidence:** The affected links are in the tab order and do not have accessible text.
   - **Examples from scan:**
     - `<a href="javascript:location.href='home.html';" onfocus="blur();"><img name="nav_home" ...></a>`
     - `<a href="javascript:location.href='news.html';" onfocus="blur();"><img src="./img/nav_news.gif" ...></a>`
     - `<a href="javascript:location.href='tickets.html';" onfocus="blur();"><img name="nav_facts" ...></a>`
     - `<a href="javascript:location.href='survey.html';" onfocus="blur();"><img src="./img/nav_survey.gif" ...></a>`

6. **`landmark-one-main` — Moderate**
   - **Issue:** The document does not have a main landmark.
   - **Confirmed affected nodes:** 1 `<html>` element.
   - **Evidence:** The scan states: “Document does not have a main landmark.”

7. **`region` — Moderate**
   - **Issue:** Some page content is not contained by landmarks.
   - **Confirmed affected nodes:** 6 regions/content containers.
   - **Examples from scan:**
     - `#logos`
     - `h1`
     - `.subline`
     - `#mnav`
     - `#page`
     - `#meta-footer`

8. **`empty-table-header` — Minor**
   - **Issue:** Table header text should not be empty.
   - **Confirmed affected nodes:** 1 `<th>` element.
   - **Evidence:** The affected `<th>` contains an image but does not have text visible to screen readers:
     - `<th style="padding-bottom:10px;"><img src="./img/headline_ticket_prices.gif" border="0"></th>`

### Incomplete findings, not confirmed violations

The scan also includes **`color-contrast` in `incomplete`**, with 3 nodes where contrast could not be determined because of a background image or partial obscuring.

These are **not confirmed violations** in the provided results.

- `.page.current`
- `.annotoggle`
- `<font face="verdana">Concession</font>`

Interpretation beyond this is: **Not explicitly present in the scan results.**

---

## 2. Severity grouping

### Critical

| Violation ID | Impact | Confirmed affected nodes |
|---|---:|---:|
| `image-alt` | Critical | 26 |
| `select-name` | Critical | 1 |

### Serious

| Violation ID | Impact | Confirmed affected nodes |
|---|---:|---:|
| `color-contrast` | Serious | 8 |
| `html-has-lang` | Serious | 1 |
| `link-name` | Serious | 4 |

### Moderate

| Violation ID | Impact | Confirmed affected nodes |
|---|---:|---:|
| `landmark-one-main` | Moderate | 1 |
| `region` | Moderate | 6 |

### Minor

| Violation ID | Impact | Confirmed affected nodes |
|---|---:|---:|
| `empty-table-header` | Minor | 1 |

---

## 3. Most critical accessibility problems

### Confirmed findings

1. **Missing alternative text on images — `image-alt`**
   - Impact: **Critical**
   - The scan identifies 26 images without accessible text alternatives or presentational roles.
   - Several affected images appear inside navigation or layout structures, including:
     - `nav_home.gif`
     - `nav_news.gif`
     - `nav_facts.gif`
     - `nav_survey.gif`
     - `headline_ticket_offers.gif`
     - `headline_ticket_prices.gif`

2. **Select element without accessible name — `select-name`**
   - Impact: **Critical**
   - The `<select>` element has no accessible name by label, ARIA, or title.
   - Confirmed target:
     - `select`

3. **Links without discernible text — `link-name`**
   - Impact: **Serious**
   - Four links are in the tab order and do not have accessible text.
   - These links contain images that also appear in the `image-alt` violations.

4. **Missing document language — `html-has-lang`**
   - Impact: **Serious**
   - The `<html>` element lacks a `lang` attribute.

5. **Insufficient color contrast — `color-contrast`**
   - Impact: **Serious**
   - Eight text elements have contrast ratio **3.88**, below the expected **4.5:1**.

### Interpretations based only on scan evidence

- The `image-alt` and `link-name` findings overlap for image-based links: the scan confirms both missing image alternatives and links without accessible text for some navigation links.
- The `select-name` issue affects form/control identification because the detected `<select>` has no accessible name.
- The `landmark-one-main` and `region` violations indicate landmark/region structure issues, but any further statement about navigation difficulty or screen reader impact is **Not explicitly present in the scan results.**

---

## 4. Accessibility insights based only on scan evidence

### Confirmed scan evidence

- The page has **critical text alternative issues**:
  - `image-alt` reports 26 images without required accessible text or presentational roles.
- The page has a **critical form naming issue**:
  - `select-name` reports a `<select>` without an accessible name.
- The page has **serious link naming issues**:
  - `link-name` reports 4 focusable links without accessible text.
- The page has **serious color contrast failures**:
  - `color-contrast` reports 8 elements with contrast ratio **3.88**, below the required **4.5:1**.
- The page has a **language declaration issue**:
  - `html-has-lang` reports the `<html>` element has no `lang` attribute.
- The page has **landmark structure issues**:
  - `landmark-one-main` reports no main landmark.
  - `region` reports some page content is not contained by landmarks.
- The page has a **minor table header naming issue**:
  - `empty-table-header` reports a `<th>` without text visible to screen readers.

### Confirmed positive evidence from `passes`

The scan also includes passing checks. Examples:

- `document-title`: Document has a non-empty `<title>` element.
- `bypass`: Page has a bypass mechanism; the scan notes a valid skip link and a heading.
- `skip-link`: Skip link target exists.
- `heading-order`: Heading order valid.
- `page-has-heading-one`: Page has at least one level-one heading.
- `list` and `listitem`: Lists and list items are structured correctly for the checked nodes.
- Many `color-contrast` nodes passed; however, this does **not** negate the confirmed `color-contrast` violations.

### Not explicitly present in the scan results

- Whether users are actually blocked from completing a ticket purchase flow: **Not explicitly present in the scan results.**
- Whether JavaScript behavior causes keyboard traps: **Not explicitly present in the scan results.**
- Whether the page is fully unusable by screen readers: **Not explicitly present in the scan results.**
- Any issues with buttons: **Not explicitly present in the scan results.**
- Any video caption issues: **Not explicitly present in the scan results.**

---

## 5. Recommendations based only on detected violations

### For `image-alt` — Critical

- Add appropriate `alt` text to images that convey information.
- For images that are decorative, mark them with `role="none"` or `role="presentation"` as allowed by the rule evidence.
- Ensure image-based navigation graphics provide accessible text, especially:
  - `nav_home.gif`
  - `nav_news.gif`
  - `nav_facts.gif`
  - `nav_survey.gif`
- Fix the image inside the empty table header:
  - `headline_ticket_prices.gif`

### For `select-name` — Critical

- Give the `<select>` an accessible name using one of the mechanisms referenced by the scan:
  - an implicit wrapped `<label>`,
  - an explicit `<label>`,
  - `aria-label`,
  - `aria-labelledby`,
  - or a non-empty `title`.

### For `link-name` — Serious

- Provide accessible text for the four affected links.
- Because the affected links contain images, fixing the associated image alternatives may also provide accessible link text, if the image alternative is exposed as the link’s accessible name.
- Confirmed affected targets include:
  - `#home > a[onfocus="blur();"]`
  - `#news > a[onfocus="blur();"]`
  - `#tickets > a[onfocus="blur();"]`
  - `#survey > a[onfocus="blur();"]`

### For `color-contrast` — Serious

- Adjust foreground and/or background colors so the affected text reaches at least the expected contrast ratio of **4.5:1**.
- The confirmed failing combination is:
  - Foreground: `#41545d`
  - Background: `#a9b8bf`
  - Contrast ratio: `3.88`
  - Expected: `4.5:1`

### For `html-has-lang` — Serious

- Add a `lang` attribute to the `<html>` element.
- The scan does not specify which language value should be used.
- The exact language value is **Not explicitly present in the scan results.**

### For `landmark-one-main` — Moderate

- Add a main landmark to the document.
- The scan specifically reports: “Document does not have a main landmark.”

### For `region` — Moderate

- Ensure the affected page content is contained by landmarks.
- Confirmed affected content includes:
  - `#logos`
  - `h1`
  - `.subline`
  - `#mnav`
  - `#page`
  - `#meta-footer`

### For `empty-table-header` — Minor

- Ensure the affected `<th>` has discernible text visible to screen readers.
- Confirmed affected node:
  - `<th style="padding-bottom:10px;"><img src="./img/headline_ticket_prices.gif" border="0"></th>`