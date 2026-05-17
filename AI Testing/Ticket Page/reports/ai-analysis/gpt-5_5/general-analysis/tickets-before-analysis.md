## 1. Summary of accessibility issues

The axe-core scan found **8 accessibility rule violations** across **48 affected nodes**.

Key issue areas detected:

- **Missing alternative text on images**: 26 `<img>` elements do not have `alt`, `aria-label`, `aria-labelledby`, `title`, or a presentational role.
- **Unnamed form control**: 1 `<select>` element has no accessible name.
- **Unnamed links**: 4 links are in the tab order but have no accessible text.
- **Insufficient color contrast**: 8 text elements use foreground `#41545D` on background `#A9B8BF`, with a contrast ratio of **3.88:1**, below the expected **4.5:1**.
- **Missing document language**: The `<html>` element has no `lang` attribute.
- **Missing main landmark**: The document does not have a main landmark.
- **Content outside landmarks**: Several page sections are not contained within landmarks.
- **Empty table header**: A `<th>` contains only an image without accessible text.

---

## 2. Severity grouping

| Severity | Rule | Affected nodes | Summary |
|---|---:|---:|---|
| **Critical** | `image-alt` | 26 | Images lack alternative text or presentational semantics |
| **Critical** | `select-name` | 1 | `<select>` element has no accessible name |
| **Serious** | `color-contrast` | 8 | Text contrast is below WCAG AA minimum threshold |
| **Serious** | `html-has-lang` | 1 | `<html>` element has no `lang` attribute |
| **Serious** | `link-name` | 4 | Links have no discernible accessible text |
| **Moderate** | `landmark-one-main` | 1 | Document does not have a main landmark |
| **Moderate** | `region` | 6 | Content is not contained by landmarks |
| **Minor** | `empty-table-header` | 1 | Table header has no screen-reader-visible text |

### Totals by severity

| Severity | Rules | Affected nodes |
|---|---:|---:|
| **Critical** | 2 | 27 |
| **Serious** | 3 | 13 |
| **Moderate** | 2 | 7 |
| **Minor** | 1 | 1 |

---

## 3. Most critical accessibility problems

### A. Images are missing accessible text — `image-alt`, critical

The largest critical issue is that **26 images lack accessible text or presentational semantics**.

Examples include:

- Border or layout images:
  - `border_left_top.gif`
  - `border_top.gif`
  - `border_right_top.gif`
  - `border_left.gif`
  - `border_right.gif`
  - `border_bottom_left.gif`
  - `border_bottom.gif`
  - `border_bottom_right.gif`
- Navigation images:
  - `nav_home.gif`
  - `nav_news.gif`
  - `nav_facts.gif`
  - `nav_survey.gif`
- Headline images:
  - `headline_ticket_offers.gif`
  - `headline_ticket_prices.gif`
- Other images:
  - `top_weather.gif`
  - `mark.gif`
  - `marker2_w.gif`
  - `marker2_t.gif`
  - `blank_5x5.gif`

The scan evidence shows these images do not have:

- `alt`
- `aria-label`
- `aria-labelledby`
- `title`
- `role="none"` or `role="presentation"`

This affects users who rely on assistive technologies because the images may be announced without useful meaning, or meaningful image content may be unavailable.

---

### B. The `<select>` element has no accessible name — `select-name`, critical

One `<select>` element was found without an accessible name:

```html
<select onchange="location.href = this.value;">
```

The scan indicates it does not have:

- an implicit wrapped `<label>`
- an explicit `<label>`
- `aria-label`
- `aria-labelledby`
- `title`

Because the select also changes location on `onchange`, the scan evidence confirms it is an interactive control, but it has no accessible name for assistive technology users.

---

### C. Links have no discernible text — `link-name`, serious

Four links are in the tab order but have no accessible text.

Detected links include image-only navigation links:

```html
<a href="javascript:location.href='home.html';" onfocus="blur();">
  <img name="nav_home" src="./img/nav_home.gif" ...>
</a>
```

Similar violations were found for:

- `home.html`
- `news.html`
- `tickets.html`
- `survey.html`

The scan reports:

> Element is in tab order and does not have accessible text

These links also contain images that separately fail `image-alt`, so the image-only links do not provide accessible link names.

---

## 4. Accessibility insights based only on scan evidence

- The page has a substantial number of image-related accessibility failures: **26 image-alt violations**.
- Several navigation links appear to rely on images such as `nav_home.gif`, `nav_news.gif`, `nav_facts.gif`, and `nav_survey.gif`, and those images do not provide accessible text.
- The page includes at least one form control, a `<select>`, but the control has no accessible name.
- The document root is simply:

  ```html
  <html>
  ```

  and does not include a `lang` attribute.
- The document lacks a main landmark, and multiple content areas are outside landmarks, including:
  - `#logos`
  - `h1`
  - `.subline`
  - `#mnav`
  - `#page`
  - `#meta-footer`
- The same color combination appears repeatedly:
  - foreground: `#41545D`
  - background: `#A9B8BF`
  - contrast ratio: `3.88:1`
  - expected: `4.5:1`
- The affected contrast issues occur in table or pricing-related content, including:
  - `Les Garçons`
  - `The Obelisks`
  - `ADULT`
  - `FS`
  - `RS`
  - `DC`
  - `ST`
  - `Group (5 or more)`
- A table header contains only an image:

  ```html
  <th style="padding-bottom:10px;">
    <img src="./img/headline_ticket_prices.gif" border="0">
  </th>
  ```

  The table header itself has no text visible to screen readers.

---

## 5. Recommendations based only on detected violations

### Critical priority

#### 1. Add accessible text or presentation semantics to images

For each image, determine from the page content whether it is meaningful or decorative.

- If the image conveys content, provide meaningful `alt` text.
- If the image is decorative, use empty alt text:

```html
<img src="./img/border_top.gif" alt="">
```

or presentational semantics where appropriate:

```html
<img src="./img/border_top.gif" role="presentation">
```

For image-based navigation, the image or link must expose the destination or purpose, for example:

```html
<a href="home.html">
  <img src="./img/nav_home.gif" alt="Home">
</a>
```

or:

```html
<a href="home.html" aria-label="Home">
  <img src="./img/nav_home.gif" alt="">
</a>
```

#### 2. Provide an accessible name for the `<select>`

Add a visible label, an explicit `<label>`, or an ARIA label.

Example using a visible label:

```html
<label for="page-select">Choose a page</label>
<select id="page-select" onchange="location.href = this.value;">
```

Example using `aria-label` if no visible label is available:

```html
<select aria-label="Choose a page" onchange="location.href = this.value;">
```

---

### Serious priority

#### 3. Fix unnamed links

The four image-only navigation links need accessible names.

Detected affected links:

- `#home > a`
- `#news > a`
- `#tickets > a`
- `#survey > a`

Use one of the following approaches:

```html
<a href="home.html">Home</a>
```

or:

```html
<a href="home.html">
  <img src="./img/nav_home.gif" alt="Home">
</a>
```

or:

```html
<a href="home.html" aria-label="Home">
  <img src="./img/nav_home.gif" alt="">
</a>
```

#### 4. Improve color contrast

The detected color pair has a contrast ratio of **3.88:1**, but the expected ratio is **4.5:1**.

Affected colors:

- Text: `#41545D`
- Background: `#A9B8BF`

Adjust either the foreground or background color so the contrast ratio is at least **4.5:1** for the affected text.

#### 5. Add a `lang` attribute to the `<html>` element

The scan found:

```html
<html>
```

Add the appropriate document language, for example:

```html
<html lang="en">
```

Use the correct language value for the actual page language.

---

### Moderate priority

#### 6. Add a main landmark

The document does not have a main landmark.

Add a `<main>` element or an equivalent landmark:

```html
<main>
  ...
</main>
```

#### 7. Place page content inside landmarks

The scan found content outside landmarks, including:

- `#logos`
- `h1`
- `.subline`
- `#mnav`
- `#page`
- `#meta-footer`

Place content inside appropriate landmark regions such as:

```html
<header>
  ...
</header>

<nav>
  ...
</nav>

<main>
  ...
</main>

<footer>
  ...
</footer>
```

---

### Minor priority

#### 8. Provide discernible text for the empty table header

The table header contains only an image without accessible text:

```html
<th style="padding-bottom:10px;">
  <img src="./img/headline_ticket_prices.gif" border="0">
</th>
```

Provide accessible text either through the image `alt`, visible text, or another appropriate accessible naming method.

Example:

```html
<th style="padding-bottom:10px;">
  <img src="./img/headline_ticket_prices.gif" alt="Ticket prices">
</th>
```

or replace the image with text:

```html
<th style="padding-bottom:10px;">Ticket prices</th>
```