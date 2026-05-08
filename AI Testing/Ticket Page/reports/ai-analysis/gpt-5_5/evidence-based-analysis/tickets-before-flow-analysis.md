## 1. Summary of accessibility issues

### Confirmed findings from `violations`

The scan reports **8 confirmed violation types**:

1. **`image-alt` — Critical**
   - **Issue:** Images must have alternative text or a role of `none` / `presentation`.
   - **Evidence:** Multiple `<img>` elements do not have an `alt` attribute, no `aria-label`, no valid `aria-labelledby`, no `title`, and no presentational role.
   - **Examples from scan:**
     - `<img src="./img/border_left_top.gif" width="10px" height="10px">`
     - `<img src="./img/nav_home.gif" ...>`
     - `<img src="./img/headline_ticket_prices.gif" border="0">`
   - **WCAG tags present:** `wcag2a`, `wcag111`.

2. **`select-name` — Critical**
   - **Issue:** A `<select>` element does not have an accessible name.
   - **Evidence:** The scan reports no implicit label, explicit label, `aria-label`, valid `aria-labelledby`, or `title`.
   - **Element:** `<select onchange="location.href = this.value;">`
   - **WCAG tags present:** `wcag2a`, `wcag412`.

3. **`color-contrast` — Serious**
   - **Issue:** Some text does not meet WCAG 2 AA minimum contrast thresholds.
   - **Evidence:** Foreground `#41545d` on background `#a9b8bf` has a contrast ratio of **3.88**, expected **4.5:1**.
   - **Affected text examples:**
     - `Les Garçons`
     - `The Obelisks`
     - `ADULT`
     - `FS`
     - `RS`
     - `DC`
     - `ST`
     - `Group (5 or more)`
   - **WCAG tags present:** `wcag2aa`, `wcag143`.

4. **`html-has-lang` — Serious**
   - **Issue:** The `<html>` element does not have a `lang` attribute.
   - **Element:** `<html>`
   - **WCAG tags present:** `wcag2a`, `wcag311`.

5. **`link-name` — Serious**
   - **Issue:** Several links do not have discernible accessible text.
   - **Evidence:** The scan reports links in tab order without accessible text.
   - **Affected examples:**
     - `<a href="javascript:location.href='home.html';" onfocus="blur();"><img name="nav_home" ...></a>`
     - `<a href="javascript:location.href='news.html';" onfocus="blur();"><img src="./img/nav_news.gif" ...></a>`
     - `<a href="javascript:location.href='tickets.html';" onfocus="blur();"><img name="nav_facts" ...></a>`
     - `<a href="javascript:location.href='survey.html';" onfocus="blur();"><img src="./img/nav_survey.gif" ...></a>`
   - **WCAG tags present:** `wcag2a`, `wcag244`, `wcag412`.

6. **`landmark-one-main` — Moderate**
   - **Issue:** The document does not have a main landmark.
   - **Element:** `<html>`
   - **Evidence:** “Document does not have a main landmark.”
   - **Best-practice tag present:** `best-practice`.

7. **`region` — Moderate**
   - **Issue:** Some page content is not contained by landmarks.
   - **Affected examples:**
     - `#logos`
     - `h1`
     - `.subline`
     - `#mnav`
     - `#page`
     - `#meta-footer`
   - **Best-practice tag present:** `best-practice`.

8. **`empty-table-header` — Minor**
   - **Issue:** A table header does not have text visible to screen readers.
   - **Element:** `<th style="padding-bottom:10px;"><img src="./img/headline_ticket_prices.gif" border="0"></th>`
   - **Best-practice tag present:** `best-practice`.

### Incomplete / needs review from scan

The scan also includes an **incomplete** result for **`color-contrast`** on 3 nodes. These are **not confirmed violations** in the `violations` array.

- `.page.current`: background color could not be determined due to a background image.
- `.annotoggle`: background color could not be determined due to a background image.
- `font[color="41545D"] > font[face="verdana"]`: background color could not be determined because it is partially obscured by another element.

## 2. Severity grouping

### Critical

- **`image-alt`**
  - Multiple images lack alternative text or presentational semantics.
- **`select-name`**
  - One `<select>` element lacks an accessible name.

### Serious

- **`color-contrast`**
  - 8 text elements have insufficient contrast: ratio **3.88**, expected **4.5:1**.
- **`html-has-lang`**
  - The `<html>` element lacks a `lang` attribute.
- **`link-name`**
  - 4 links are in the tab order and do not have accessible text.

### Moderate

- **`landmark-one-main`**
  - The document does not have a main landmark.
- **`region`**
  - 6 page areas are not contained by landmarks.

### Minor

- **`empty-table-header`**
  - 1 table header lacks text visible to screen readers.

## 3. Most critical accessibility problems

### Confirmed critical findings

1. **Missing image alternatives — `image-alt`**
   - Impact: **Critical**
   - The scan identifies many `<img>` elements without an `alt` attribute, `aria-label`, valid `aria-labelledby`, `title`, or presentational role.
   - This affects image elements used in borders, navigation, markers, logos/visual assets, and headings such as:
     - `nav_home.gif`
     - `nav_news.gif`
     - `nav_facts.gif`
     - `nav_survey.gif`
     - `headline_ticket_offers.gif`
     - `headline_ticket_prices.gif`

2. **Unnamed select control — `select-name`**
   - Impact: **Critical**
   - The `<select onchange="location.href = this.value;">` element has no accessible name according to the scan.
   - The scan explicitly reports missing:
     - implicit label
     - explicit label
     - `aria-label`
     - valid `aria-labelledby`
     - `title`

### Confirmed serious findings

3. **Links without accessible text — `link-name`**
   - Impact: **Serious**
   - Four navigation links are in the tab order and do not have accessible text.

4. **Missing document language — `html-has-lang`**
   - Impact: **Serious**
   - The root `<html>` element does not have a `lang` attribute.

5. **Insufficient color contrast — `color-contrast`**
   - Impact: **Serious**
   - The failing contrast ratio is **3.88**, where **4.5:1** is expected.

## 4. Accessibility insights based only on scan evidence

### Confirmed findings

- The page has **critical text alternative problems** for images, based on `image-alt`.
- The page has a **critical form naming problem** for a `<select>` element, based on `select-name`.
- The page has **serious link naming problems**, based on `link-name`.
- The page has **serious color contrast failures**, based on `color-contrast`.
- The page is missing a declared document language, based on `html-has-lang`.
- The page has landmark-related structural issues:
  - no main landmark, based on `landmark-one-main`
  - some content not contained by landmarks, based on `region`
- One table header lacks discernible text, based on `empty-table-header`.

### Interpretations based only on scan evidence

- Because `image-alt` failures include many image-based navigation and visual elements, some image content may not be available as accessible text unless corrected. This is an interpretation based on the explicit `image-alt` violation messages.
- Because `link-name` failures are for links containing images with no accessible text, those links may not be understandable by assistive technologies unless given accessible names. This is an interpretation based on the explicit `link-name` violation messages.
- Because `select-name` reports no accessible name for the `<select>`, users of assistive technologies may not receive a meaningful label for that control. This is an interpretation based on the explicit `select-name` violation messages.

### Not explicitly present in the scan results

- Keyboard traps: **Not explicitly present in the scan results.**
- Missing button names: **Not explicitly present in the scan results.**
- Form fields missing labels under the `label` rule: **Not explicitly present in the scan results.** The `label` rule appears under `inapplicable`; the detected form naming issue is specifically `select-name`.
- Invalid ARIA roles or invalid ARIA attributes: **Not explicitly present in the scan results.**
- Video caption issues: **Not explicitly present in the scan results.**
- Autoplay audio issues: **Not explicitly present in the scan results.**

## 5. Recommendations based only on detected violations

1. **Fix missing image alternatives — `image-alt`**
   - Add appropriate `alt` text to informative images.
   - For decorative images, use `alt=""` or `role="presentation"` / `role="none"` where appropriate.
   - The scan explicitly identifies missing alternatives on multiple images, including navigation images and decorative-looking assets.

2. **Add an accessible name to the select control — `select-name`**
   - Provide an explicit `<label>` associated with the `<select>`, or use another accessible naming method such as `aria-label`, `aria-labelledby`, or `title`.
   - The detected element is:
     - `<select onchange="location.href = this.value;">`

3. **Correct insufficient color contrast — `color-contrast`**
   - Adjust foreground color `#41545d`, background color `#a9b8bf`, or both, so the affected text reaches at least the expected **4.5:1** contrast ratio.
   - Affected text includes:
     - `Les Garçons`
     - `The Obelisks`
     - `ADULT`
     - `FS`
     - `RS`
     - `DC`
     - `ST`
     - `Group (5 or more)`

4. **Add a `lang` attribute to the `<html>` element — `html-has-lang`**
   - Add a valid `lang` attribute to the root `<html>` element.
   - The scan only confirms that the attribute is missing; the correct language value is **not explicitly present in the scan results**.

5. **Provide accessible names for image-based links — `link-name`**
   - Add accessible text to the four affected links.
   - Possible scan-supported repair approaches include visible text, `aria-label`, `aria-labelledby`, or `title`, since the failure summary explicitly checks for those.
   - Affected link targets include:
     - `#home > a[onfocus="blur();"]`
     - `#news > a[onfocus="blur();"]`
     - `#tickets > a[onfocus="blur();"]`
     - `#survey > a[onfocus="blur();"]`

6. **Add a main landmark — `landmark-one-main`**
   - Add one main landmark to the document, for example by using a `<main>` element or equivalent landmark semantics.
   - The scan explicitly reports: “Document does not have a main landmark.”

7. **Contain page content within landmarks — `region`**
   - Place the reported content areas inside appropriate landmark regions.
   - Affected targets include:
     - `#logos`
     - `h1`
     - `.subline`
     - `#mnav`
     - `#page`
     - `#meta-footer`

8. **Give the table header discernible text — `empty-table-header`**
   - Ensure the `<th>` contains text visible to screen readers.
   - The affected header contains only:
     - `<img src="./img/headline_ticket_prices.gif" border="0">`
   - This overlaps with `image-alt`, where that image also lacks alternative text.