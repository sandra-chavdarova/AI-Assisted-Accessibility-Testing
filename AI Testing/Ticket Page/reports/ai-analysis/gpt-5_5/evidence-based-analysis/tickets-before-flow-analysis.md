## 1. Summary of accessibility issues

The axe-core scan reports **8 accessibility violation types** across **48 affected nodes**.

Detected issue categories:

- **Missing text alternatives for images**: 26 `<img>` elements do not have `alt`, accessible label, title, or presentational role.
- **Unlabeled form control**: 1 `<select>` element does not have an accessible name.
- **Links without discernible text**: 4 links are in the tab order but do not have accessible text.
- **Insufficient color contrast**: 8 text elements have a contrast ratio of **3.88:1**, below the required **4.5:1** threshold.
- **Missing document language**: The `<html>` element does not have a `lang` attribute.
- **Missing main landmark**: The document does not have a main landmark.
- **Content outside landmarks**: 6 page areas are not contained within landmarks.
- **Empty table header**: 1 `<th>` contains an image but has no text visible to screen readers.

---

## 2. Severity grouping

### Critical

| Rule | Affected nodes | Issue |
|---|---:|---|
| `image-alt` | 26 | Images must have alternative text or be marked as decorative/presentational |
| `select-name` | 1 | Select element must have an accessible name |

**Total critical nodes: 27**

---

### Serious

| Rule | Affected nodes | Issue |
|---|---:|---|
| `color-contrast` | 8 | Text contrast is below WCAG AA minimum |
| `html-has-lang` | 1 | `<html>` element does not have a `lang` attribute |
| `link-name` | 4 | Links do not have discernible accessible text |

**Total serious nodes: 13**

---

### Moderate

| Rule | Affected nodes | Issue |
|---|---:|---|
| `landmark-one-main` | 1 | Document does not have a main landmark |
| `region` | 6 | Some page content is not contained by landmarks |

**Total moderate nodes: 7**

---

### Minor

| Rule | Affected nodes | Issue |
|---|---:|---|
| `empty-table-header` | 1 | Table header does not contain text visible to screen readers |

**Total minor nodes: 1**

---

## 3. Most critical accessibility problems

### 1. Images without accessible text

The most widespread critical issue is `image-alt`, affecting **26 images**.

The scan confirms that these images lack:

- `alt` attributes
- `aria-label`
- valid `aria-labelledby`
- `title`
- `role="none"` or `role="presentation"`

Examples include:

- `border_left_top.gif`
- `border_top.gif`
- `top_weather.gif`
- `nav_home.gif`
- `nav_news.gif`
- `nav_facts.gif`
- `nav_survey.gif`
- `headline_ticket_offers.gif`
- `headline_ticket_prices.gif`

The scan does **not** confirm whether each image is decorative or informative. It only confirms that the images do not currently have an accessible text alternative or presentational role.

---

### 2. Select element without an accessible name

One `<select>` element fails `select-name`:

```html
<select onchange="location.href = this.value;">
```

The scan confirms it has no:

- implicit label
- explicit label
- `aria-label`
- valid `aria-labelledby`
- `title`

This is critical because the select control does not have an accessible name according to the scan.

---

### 3. Links without discernible text

Four links fail `link-name`. The scan confirms they are in the tab order and do not have accessible text.

Affected links include image-based navigation links:

```html
<a href="javascript:location.href='home.html';" onfocus="blur();">
  <img name="nav_home" src="./img/nav_home.gif" ...>
</a>
```

Similar failures are reported for links to:

- `home.html`
- `news.html`
- `tickets.html`
- `survey.html`

The scan confirms these links do not have visible text for screen readers, `aria-label`, valid `aria-labelledby`, or `title`.

---

### 4. Insufficient color contrast

Eight text elements fail the `color-contrast` rule.

The detected color combination is:

- Foreground: `#41545d`
- Background: `#a9b8bf`
- Contrast ratio: **3.88:1**
- Expected minimum: **4.5:1**

Affected text includes:

- `Les Garçons`
- `The Obelisks`
- `ADULT`
- `FS`
- `RS`
- `DC`
- `ST`
- `Group (5 or more)`

The scan confirms these elements do not meet WCAG 2 AA contrast requirements.

---

## 4. Accessibility insights based only on scan evidence

- The page has multiple **image-based elements** without accessible text alternatives.
- Several image-based navigation links lack accessible names, causing both `image-alt` and `link-name` failures.
- At least one table header contains only an image and no screen-reader-accessible text.
- The document does not declare a page language using the `lang` attribute on `<html>`.
- The page does not have a main landmark.
- Multiple page sections are not contained within landmarks, including:
  - `#logos`
  - `h1`
  - `.subline`
  - `#mnav`
  - `#page`
  - `#meta-footer`
- The scan confirms one unlabeled `<select>` control.
- The scan confirms specific text/background color pairs that fail the minimum contrast threshold.

Cannot be confirmed from the scan data:

- Whether each image is decorative or meaningful.
- Whether the visual content of image files such as `headline_ticket_prices.gif` or `nav_home.gif` contains text.
- Whether the page has other accessibility issues not detected or not included in this scan.
- Whether fixing landmarks alone would resolve all navigation or screen-reader usability concerns.

---

## 5. Recommendations based only on detected violations

### Image alternatives

For each image flagged by `image-alt`:

- Add an appropriate `alt` attribute if the image conveys information.
- If the image is decorative, mark it as decorative, for example with `alt=""` or `role="presentation"` / `role="none"`.

For navigation images inside links, ensure the link itself has an accessible name. For example:

```html
<a href="home.html">
  <img src="./img/nav_home.gif" alt="Home">
</a>
```

Or:

```html
<a href="home.html" aria-label="Home">
  <img src="./img/nav_home.gif" alt="">
</a>
```

---

### Select element name

Provide an accessible name for the `<select>` element using a visible label where possible.

Example:

```html
<label for="page-select">Choose a page</label>
<select id="page-select" onchange="location.href = this.value;">
```

Alternatively, use `aria-label` or `aria-labelledby` if a visible label is not available.

---

### Link names

Ensure each link has discernible accessible text.

For the four image-based links, provide text through one of the following:

- visible link text
- `alt` text on the image inside the link
- `aria-label`
- `aria-labelledby`
- `title`, though visible or programmatic labels are generally preferable

Detected affected link targets:

- `#home > a[onfocus="blur();"]`
- `#news > a[onfocus="blur();"]`
- `#tickets > a[onfocus="blur();"]`
- `#survey > a[onfocus="blur();"]`

---

### Color contrast

Adjust the foreground and/or background colors for the detected text so that the contrast ratio is at least **4.5:1**.

Current failing combination:

```text
Foreground: #41545d
Background: #a9b8bf
Contrast: 3.88:1
Required: 4.5:1
```

Affected text includes table or pricing-related labels such as `ADULT`, `FS`, `RS`, `DC`, `ST`, and `Group (5 or more)`.

---

### Document language

Add a `lang` attribute to the `<html>` element.

Example:

```html
<html lang="en">
```

The correct language value cannot be confirmed from the scan data, so it should be set to the actual primary language of the page.

---

### Main landmark and regions

Add a main landmark to the page.

Example:

```html
<main>
  ...
</main>
```

Also ensure page content is contained within appropriate landmarks such as:

- `<header>`
- `<nav>`
- `<main>`
- `<footer>`

The scan specifically reports content outside landmarks for:

- `#logos`
- `h1`
- `.subline`
- `#mnav`
- `#page`
- `#meta-footer`

---

### Empty table header

The table header:

```html
<th style="padding-bottom:10px;">
  <img src="./img/headline_ticket_prices.gif" border="0">
</th>
```

does not have text visible to screen readers.

Provide discernible text for the table header. Possible approaches include:

```html
<th>Ticket prices</th>
```

or, if the image is intended to provide the header text:

```html
<th>
  <img src="./img/headline_ticket_prices.gif" alt="Ticket prices">
</th>
```

The scan does not confirm the actual visual text in the image, so the correct text should be verified from the page content.