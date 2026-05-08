## 1. Summary of accessibility issues

The scan found **8 accessibility violation types** affecting approximately **48 elements**, plus **3 items requiring manual review**.

Key issues:

- **Missing alternative text on images** — many layout, navigation, spacer, border, and heading images lack `alt`, `aria-label`, or presentational roles.
- **Unlabeled `<select>` control** — the “QUICKMENU” dropdown has no accessible name.
- **Image-only links with no accessible text** — several navigation links contain only unlabeled images, making the links unnamed to screen readers.
- **Insufficient color contrast** — table/category header text uses `#41545D` on `#A9B8BF`, producing a contrast ratio of **3.88:1**, below the required **4.5:1**.
- **Missing page language** — the `<html>` element has no `lang` attribute.
- **Landmark structure issues** — the page lacks a `<main>` landmark and some content is outside landmarks.
- **Empty table header** — a `<th>` contains only an unlabeled image, so it has no discernible text.
- **Manual contrast review needed** — three elements could not be automatically evaluated because of background images or obscured backgrounds.

Positive findings:

- The document has a non-empty `<title>`.
- A level-one heading exists.
- A skip link exists and its target exists.
- Many text elements pass color contrast.
- List structure appears valid.
- No major ARIA misuse was detected in the scanned rules.

---

## 2. Severity grouping

### Critical

| Rule | Instances | Issue |
|---|---:|---|
| `image-alt` | 26 | Images lack alternative text or presentational semantics |
| `select-name` | 1 | `<select>` element has no accessible name |

**Total critical instances:** 27

---

### Serious

| Rule | Instances | Issue |
|---|---:|---|
| `color-contrast` | 8 | Text contrast ratio is 3.88:1 instead of 4.5:1 |
| `html-has-lang` | 1 | `<html>` element lacks `lang` |
| `link-name` | 4 | Links have no accessible text/name |

**Total serious instances:** 13

---

### Moderate

| Rule | Instances | Issue |
|---|---:|---|
| `landmark-one-main` | 1 | Document lacks a main landmark |
| `region` | 6 | Some content is not contained in landmarks |

**Total moderate instances:** 7

---

### Minor

| Rule | Instances | Issue |
|---|---:|---|
| `empty-table-header` | 1 | Table header has no discernible text |

**Total minor instances:** 1

---

### Needs manual review

| Rule | Instances | Issue |
|---|---:|---|
| `color-contrast` | 3 | Contrast could not be determined due to background images or overlapping content |

---

## 3. Most critical accessibility problems

### 1. Missing alternative text on images

This is the most widespread issue. Many images have no `alt` text and are not marked as decorative.

Examples include:

- Border images:
  - `border_left_top.gif`
  - `border_top.gif`
  - `border_right.gif`
  - `border_bottom.gif`
- Spacer/marker images:
  - `marker2_w.gif`
  - `marker2_t.gif`
  - `blank_5x5.gif`
- Navigation images:
  - `nav_home.gif`
  - `nav_news.gif`
  - `nav_facts.gif`
  - `nav_survey.gif`
- Heading images:
  - `headline_ticket_offers.gif`
  - `headline_ticket_prices.gif`

Impact:

- Screen reader users may hear meaningless file names or receive no useful information.
- Image-only navigation becomes unusable when the image has no text alternative.
- Content rendered as images, such as section headings, may be invisible to assistive technologies.

Recommended approach:

- Decorative layout images should use `alt=""` or `role="presentation"`.
- Functional images inside links should have meaningful `alt` text describing the link purpose.
- Text images should be replaced with real HTML text where possible.

---

### 2. Unlabeled quick menu `<select>`

The dropdown:

```html
<select onchange="location.href = this.value;">
```

has no accessible name.

Impact:

- Screen reader users may not know what the dropdown is for.
- Voice control users cannot reliably identify the control.
- Keyboard users may trigger navigation unexpectedly when changing the selection.

Recommended fix:

```html
<label for="quickmenu">Quick menu</label>
<select id="quickmenu" name="quickmenu">
  ...
</select>
```

Preferably, avoid auto-navigation on `change`; use a separate “Go” button.

---

### 3. Links without accessible names

Four navigation links are image-only and have no text alternative.

Examples:

```html
<a href="javascript:location.href='home.html';" onfocus="blur();">
  <img name="nav_home" src="./img/nav_home.gif">
</a>
```

Problems:

- The link has no accessible name.
- The image inside the link also lacks `alt`.
- `href="javascript:..."` is poor practice.
- `onfocus="blur();"` removes keyboard focus, which is especially problematic for keyboard and assistive technology users.

Impact:

- Screen reader users encounter unlabeled links.
- Keyboard users may be unable to track or activate navigation reliably.
- Focus management is hostile to accessibility.

Recommended fix:

```html
<a href="home.html">Home</a>
```

If an image must remain:

```html
<a href="home.html">
  <img src="./img/nav_home.gif" alt="Home">
</a>
```

Remove `onfocus="blur();"`.

---

### 4. Insufficient contrast in table headers

Several table header/category labels fail contrast requirements.

Detected colors:

- Foreground: `#41545D`
- Background: `#A9B8BF`
- Contrast ratio: **3.88:1**
- Required: **4.5:1**

Affected text includes:

- `Les Garçons`
- `The Obelisks`
- `ADULT`
- `FS`
- `RS`
- `DC`
- `ST`
- `Group (5 or more)`

Impact:

- Users with low vision, color vision deficiencies, or poor display conditions may struggle to read these labels.

Recommended fix:

Use a darker foreground or lighter background. For example:

```css
.table-header {
  color: #1f2f36;
  background-color: #a9b8bf;
}
```

Or:

```css
.table-header {
  color: #41545d;
  background-color: #dbe3e6;
}
```

Verify new combinations meet at least **4.5:1** for normal text.

---

### 5. Missing document language

The page is missing a `lang` attribute:

```html
<html>
```

Impact:

- Screen readers may use the wrong pronunciation rules.
- Browser translation and spell-check features may behave incorrectly.

Recommended fix:

```html
<html lang="en">
```

If parts of the page use another language, mark them individually, for example:

```html
<span lang="fr">Les Garçons</span>
```

---

## 4. Accessibility insights

### The page appears to rely heavily on legacy layout techniques

The markup uses many old or presentational patterns:

- Table-based layout
- Spacer images
- Border images
- Image-based navigation
- `<font>` elements
- Inline styles
- JavaScript-based links
- `onfocus="blur();"`
- `bgcolor`, `width`, `height`, `align`, `valign`, and similar presentational attributes

These patterns increase accessibility risk because they separate the visual experience from the semantic structure assistive technologies depend on.

---

### Some visual text is implemented as images

Images such as:

```html
<img src="./img/headline_ticket_offers.gif">
<img src="./img/headline_ticket_prices.gif">
```

appear to represent textual headings. Because they lack `alt`, users of screen readers may miss the section titles entirely.

Better approach:

```html
<h2>Ticket offers</h2>
<h2>Ticket prices</h2>
```

Use CSS for visual styling instead of rendering headings as images.

---

### Navigation is not robust

There appear to be two navigation systems:

1. Text-based navigation that passes link-name checks.
2. Image/JavaScript-based navigation that fails link-name checks.

The image-based navigation is especially problematic because the links are unnamed and keyboard focus is intentionally removed.

---

### The page lacks modern landmark structure

The page has a heading and skip link, but it lacks a proper main landmark. Content is also reported outside landmarks.

A modern structure should include:

```html
<header>
  ...
</header>

<nav aria-label="Primary">
  ...
</nav>

<main id="main">
  ...
</main>

<footer>
  ...
</footer>
```

This helps screen reader users navigate quickly between major page regions.

---

### Automated testing did not catch everything

axe-core found several important issues, but manual testing is still needed, especially for:

- Keyboard-only navigation
- Focus visibility
- Whether the quick menu behaves predictably
- Whether tables are semantically correct
- Whether image alternatives are meaningful, not merely present
- Whether the visual reading order matches the DOM order
- Contrast on elements with background images

---

## 5. Recommendations for improvement

### Highest priority fixes

1. **Fix all critical image alternative issues**
   - Use `alt=""` for decorative images.
   - Use meaningful `alt` for functional images.
   - Replace text-as-image headings with real headings.
   - Add appropriate `alt` to navigation images if images remain.

2. **Label the quick menu**
   - Add a visible `<label>`.
   - Avoid navigation on `change`.
   - Add a separate “Go” button.

3. **Fix unnamed image links**
   - Replace JavaScript links with normal links.
   - Add link text or image `alt`.
   - Remove `onfocus="blur();"`.

4. **Correct color contrast failures**
   - Increase contrast for `#41545D` text on `#A9B8BF`.
   - Re-test the three incomplete contrast items manually.

5. **Add document language**
   - Add `lang="en"` to `<html>`.
   - Mark foreign-language phrases with appropriate `lang` values if needed.

---

### Structural improvements

6. **Add landmarks**
   - Wrap top content in `<header>`.
   - Wrap navigation in `<nav>`.
   - Wrap primary page content in `<main>`.
   - Wrap footer content in `<footer>`.

7. **Replace layout tables with CSS**
   - Use CSS layout instead of tables for page structure.
   - Reserve tables for actual tabular data.

8. **Improve table semantics**
   - Use `<caption>` for data tables.
   - Use `<th scope="col">` and `<th scope="row">` where appropriate.
   - Avoid empty `<th>` elements.
   - Do not use tables solely for spacing or presentation.

9. **Remove deprecated/presentational markup**
   - Replace `<font>`, `bgcolor`, `align`, `valign`, fixed pixel widths, and inline styling with CSS.
   - Use semantic HTML elements.

---

### Example fixes

#### Decorative image

```html
<img src="./img/border_top.gif" alt="">
```

or:

```html
<img src="./img/border_top.gif" role="presentation" alt="">
```

#### Functional image link

```html
<a href="home.html">
  <img src="./img/nav_home.gif" alt="Home">
</a>
```

Better:

```html
<a href="home.html">Home</a>
```

#### Heading image replacement

Current:

```html
<th>
  <img src="./img/headline_ticket_prices.gif" border="0">
</th>
```

Better:

```html
<h2>Ticket prices</h2>
```

#### Select label

```html
<label for="quickmenu">Quick menu</label>
<select id="quickmenu" name="quickmenu">
  <option selected>Choose a service</option>
  <option value="../offsite.html">Broadcasting</option>
  <option value="../offsite.html">Education</option>
</select>
<button type="button">Go</button>
```

#### Main landmark

```html
<main id="main">
  ...
</main>
```

#### HTML language

```html
<html lang="en">
```

---

## Overall assessment

The page has several severe accessibility barriers, especially for screen reader and keyboard users. The most urgent issues are the **missing image alternatives**, **unnamed navigation links**, and **unlabeled select control**. The page also shows broader structural problems caused by legacy table-based layout and image-based text/navigation.

Addressing the critical and serious issues first would significantly improve usability for assistive technology users. After that, the page should be modernized with semantic HTML, proper landmarks, CSS-based layout, accessible tables, and verified color contrast.