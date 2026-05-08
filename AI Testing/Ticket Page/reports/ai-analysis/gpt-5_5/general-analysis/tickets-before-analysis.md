## 1. Summary of accessibility issues

The axe-core scan found **8 violation types** affecting roughly **48 elements**, plus **3 incomplete color-contrast checks** requiring manual review.

Key issue areas:

| Issue type | Impact | Affected nodes | Main problem |
|---|---:|---:|---|
| Missing image alternative text | Critical | 26 | Many images have no `alt`, including decorative layout images, image-based navigation, and headings rendered as images. |
| Unnamed `<select>` control | Critical | 1 | The quick menu select has no accessible name/label. |
| Insufficient color contrast | Serious | 8 | Dark blue-gray text `#41545d` on blue-gray background `#a9b8bf` fails WCAG AA contrast. |
| Links without accessible names | Serious | 4 | Image-only navigation links have no discernible text because the images also lack `alt`. |
| Missing page language | Serious | 1 | `<html>` lacks a `lang` attribute. |
| Missing main landmark | Moderate | 1 | The page does not expose a `<main>`/`role="main"` region. |
| Content outside landmarks | Moderate | 6 | Header, navigation, main page container, and footer content are not properly wrapped in landmarks. |
| Empty table header | Minor | 1 | A `<th>` contains only an image with no accessible text. |

There are also **3 incomplete contrast checks** where axe could not determine background color because of background images or overlapping elements. These should be manually verified.

---

## 2. Severity grouping

### Critical

#### `image-alt` — Images missing alternative text
Many `<img>` elements do not have `alt`, `aria-label`, `aria-labelledby`, `title`, or `role="presentation"`.

Examples:

```html
<img src="./img/border_left_top.gif" width="10px" height="10px">
<img src="./img/nav_home.gif" name="nav_home" width="88" height="27">
<img src="./img/headline_ticket_offers.gif" border="0">
<img src="./img/headline_ticket_prices.gif" border="0">
```

Impact:
- Screen reader users may hear raw filenames or receive no useful information.
- Image-based navigation becomes unusable when images lack accessible names.
- Text embedded in images is unavailable to assistive technologies and may not resize well.

#### `select-name` — Select control has no accessible name

```html
<select onchange="location.href = this.value;">
```

Impact:
- Screen reader users do not know what the dropdown is for.
- The control’s purpose is unclear.
- The `onchange` behavior may unexpectedly navigate users when they select an option.

---

### Serious

#### `color-contrast` — Insufficient contrast
Several table/header text elements fail contrast:

- Foreground: `#41545d`
- Background: `#a9b8bf`
- Contrast ratio: **3.88:1**
- Required: **4.5:1**

Examples include:

```html
<font color="41545D">Les Garçons</font>
<font color="41545D">The Obelisks</font>
<font color="41545D">ADULT</font>
<font color="41545D">FS</font>
<font color="41545D">RS</font>
<font color="41545D">DC</font>
<font color="41545D">ST</font>
<font color="41545D">Group (5 or more)</font>
```

Impact:
- Low-vision users and users in poor lighting conditions may not be able to read table headers or section labels.
- Fails WCAG 2.x AA Success Criterion 1.4.3.

#### `html-has-lang` — Missing language declaration

```html
<html>
```

Impact:
- Screen readers may use the wrong pronunciation rules.
- Browser translation and assistive technology behavior may be less reliable.

Should be:

```html
<html lang="en">
```

#### `link-name` — Image-only links have no accessible name
Affected navigation links include:

```html
<a href="javascript:location.href='home.html';" onfocus="blur();">
  <img name="nav_home" src="./img/nav_home.gif">
</a>
```

Similar issues exist for News, Tickets, and Survey navigation links.

Impact:
- Screen reader users hear “link” with no name.
- Voice control users cannot identify or activate the links by name.
- Keyboard users may be harmed by `onfocus="blur();"`, which removes focus.

---

### Moderate

#### `landmark-one-main` — No main landmark
The document does not have a main landmark.

Impact:
- Screen reader users cannot quickly jump to the primary content.
- Page navigation is less efficient.

Recommended:

```html
<main id="main">
  ...
</main>
```

or, if using older markup:

```html
<div id="main" role="main">
  ...
</div>
```

#### `region` — Content not contained by landmarks
Affected areas include:

```html
<p id="logos">...</p>
<h1>...</h1>
<p class="subline">...</p>
<div id="mnav" class="inaccessible">...</div>
<div id="page">...</div>
<div id="meta-footer" class="meta">...</div>
```

Impact:
- Assistive technology users get a weaker page structure.
- Header, nav, main, and footer areas are not clearly identified.

---

### Minor

#### `empty-table-header` — Table header has no discernible text

```html
<th style="padding-bottom:10px;">
  <img src="./img/headline_ticket_prices.gif" border="0">
</th>
```

Impact:
- Screen readers encounter a table header with no useful label.
- The table’s structure is less understandable.

---

## 3. Most critical accessibility problems

### 1. Missing alternative text on many images

This is the most widespread and highest-impact problem. The page uses many images for layout, navigation, and headings. Some are decorative; others communicate meaningful content.

Fixing strategy:

- Decorative images should use empty alt text:

```html
<img src="./img/border_left_top.gif" alt="">
```

or be moved to CSS backgrounds.

- Meaningful images should have descriptive alt text:

```html
<img src="./img/headline_ticket_prices.gif" alt="Ticket prices">
```

- Image-based navigation should either use real text or meaningful alt text:

```html
<a href="home.html">
  <img src="./img/nav_home.gif" alt="Home">
</a>
```

Better:

```html
<a href="home.html">Home</a>
```

---

### 2. Image-only navigation links have no accessible names

The missing `alt` text on navigation images causes their parent links to have no accessible names.

Current pattern:

```html
<a href="javascript:location.href='home.html';" onfocus="blur();">
  <img name="nav_home" src="./img/nav_home.gif">
</a>
```

Recommended:

```html
<a href="home.html">Home</a>
```

If images must remain:

```html
<a href="home.html">
  <img src="./img/nav_home.gif" alt="Home">
</a>
```

Also remove:

```html
onfocus="blur();"
```

This is harmful because it removes keyboard focus.

---

### 3. Unlabeled quick menu `<select>`

The select menu has no accessible name:

```html
<select onchange="location.href = this.value;">
```

Recommended:

```html
<label for="quickmenu">Quick menu</label>
<select id="quickmenu" name="quickmenu">
  <option selected>Quick menu</option>
  ...
</select>
```

Prefer a button instead of automatic navigation on change:

```html
<label for="quickmenu">Quick menu</label>
<select id="quickmenu" name="quickmenu">
  <option value="">Choose a section</option>
  <option value="../offsite.html">Broadcasting</option>
</select>
<button type="button" onclick="location.href = document.getElementById('quickmenu').value">
  Go
</button>
```

---

### 4. Insufficient contrast in tables

The combination of `#41545d` text on `#a9b8bf` background has a contrast ratio of **3.88:1**, below the required **4.5:1**.

Fix by darkening the foreground or lightening the background.

For example:

```css
.table-header {
  color: #24343b;
  background-color: #a9b8bf;
}
```

or:

```css
.table-header {
  color: #41545d;
  background-color: #dbe4e8;
}
```

---

### 5. Missing document language

Add a language attribute:

```html
<html lang="en">
```

If the page contains substantial French names such as “Les Garçons”, those specific phrases can optionally be marked:

```html
<span lang="fr">Les Garçons</span>
```

---

## 4. Accessibility insights

### The page uses outdated, presentation-heavy HTML

There are many signs of legacy markup:

- Layout tables
- `<font>` elements
- `bgcolor`, `border`, `width`, `height`, `valign`, `align`
- Spacer images
- Text rendered as images
- JavaScript links
- `onmouseover` navigation effects
- `onfocus="blur();"`

This creates several accessibility risks:
- Poor semantic structure
- Harder screen reader navigation
- Fragile keyboard behavior
- Reduced responsiveness and zoom support
- Increased likelihood of missing text alternatives

---

### Several issues are connected

Some violations are not isolated. For example:

- Missing `alt` on navigation images causes:
  - `image-alt` failures
  - `link-name` failures
  - Poor keyboard/screen reader navigation

- Heading text rendered as an image causes:
  - `image-alt` failure
  - Empty table header failure
  - Poor scalability and readability

- Lack of landmarks causes:
  - `landmark-one-main`
  - `region`

Fixing the underlying structure will resolve multiple axe findings at once.

---

### Some images are probably decorative

Many missing-alt images appear to be purely decorative:

```html
border_left_top.gif
border_top.gif
border_right_top.gif
marker2_w.gif
blank_5x5.gif
border_bottom.gif
```

These should not receive verbose alt text. They should be hidden from assistive technologies:

```html
<img src="./img/border_top.gif" alt="">
```

or preferably removed from the HTML and implemented with CSS.

---

### The page has some positive findings

The scan also shows several checks passing:

- Document has a non-empty `<title>`.
- Page has an `<h1>`.
- A skip link exists and its target exists.
- Many text elements do pass color contrast.
- Lists appear structurally valid.
- No `aria-hidden="true"` is applied to the body.

However, the core page content remains difficult to navigate because of missing alt text, unnamed controls, weak landmarks, and legacy image-based navigation.

---

## 5. Recommendations for improvement

### Priority 1 — Fix critical issues

1. Add meaningful `alt` text to informative images.
2. Add `alt=""` to decorative images.
3. Replace image-based navigation with text links where possible.
4. Add an accessible name to the quick menu `<select>`.
5. Remove `onfocus="blur();"` from links.

Example improved navigation:

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="home.html">Home</a></li>
    <li><a href="news.html">News</a></li>
    <li><a href="tickets.html" aria-current="page">Tickets</a></li>
    <li><a href="survey.html">Survey</a></li>
  </ul>
</nav>
```

---

### Priority 2 — Fix serious issues

1. Add page language:

```html
<html lang="en">
```

2. Improve color contrast for all table headers and labels.
3. Ensure every link has visible and programmatic text.
4. Avoid JavaScript-only links:

Avoid:

```html
<a href="javascript:location.href='home.html';">
```

Use:

```html
<a href="home.html">Home</a>
```

---

### Priority 3 — Improve landmarks and page structure

Use semantic landmarks:

```html
<header>
  ...
</header>

<nav aria-label="Main navigation">
  ...
</nav>

<main id="main">
  ...
</main>

<footer>
  ...
</footer>
```

This will address:
- Missing main landmark
- Content outside landmarks
- Weak document structure

---

### Priority 4 — Modernize tables and headings

Use real text headings instead of heading images:

Avoid:

```html
<img src="./img/headline_ticket_prices.gif">
```

Use:

```html
<h2>Ticket prices</h2>
```

For data tables, use proper table headers:

```html
<table>
  <caption>Ticket prices</caption>
  <thead>
    <tr>
      <th scope="col">Ticket type</th>
      <th scope="col">Adult</th>
      <th scope="col">FS</th>
      <th scope="col">RS</th>
      <th scope="col">DC</th>
      <th scope="col">ST</th>
    </tr>
  </thead>
  <tbody>
    ...
  </tbody>
</table>
```

---

### Priority 5 — Review incomplete contrast findings manually

Axe could not determine contrast for 3 elements due to background images or overlapping elements:

- `.page.current`
- `.annotoggle`
- `font[color="41545D"] > font[face="verdana"]`

Manually inspect these in the browser and verify that text contrast meets:
- **4.5:1** for normal text
- **3:1** for large text

---

## Recommended remediation order

1. **Fix image alt text and image-only links.**
2. **Label the quick menu select.**
3. **Add `<html lang="en">`.**
4. **Replace JavaScript/image navigation with real text links.**
5. **Fix failing color contrast.**
6. **Add semantic landmarks: `header`, `nav`, `main`, `footer`.**
7. **Replace layout tables/spacer images with CSS.**
8. **Replace image headings with real text headings.**
9. **Manually test keyboard navigation and screen reader output.**

Overall, the page has a combination of legacy HTML and accessibility defects. The most urgent fixes are missing text alternatives, unnamed controls, inaccessible image links, and insufficient color contrast.