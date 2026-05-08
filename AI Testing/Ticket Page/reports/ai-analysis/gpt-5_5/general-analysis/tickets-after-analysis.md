## 1. Summary of accessibility issues

Scan target: `https://www.w3.org/WAI/demos/bad/after/tickets.html`  
Tool: axe-core `4.11.4`

The scan reports **2 accessibility violations**, both with **moderate impact**, plus a large set of **incomplete color-contrast checks** requiring manual review.

### Detected violations

| Rule | Impact | Issue | Affected nodes |
|---|---:|---|---:|
| `landmark-one-main` | Moderate | The document does not have a main landmark | 1 |
| `region` | Moderate | Some page content is not contained by landmarks | 14 |

### Incomplete/manual checks

| Rule | Impact | Issue |
|---|---:|---|
| `color-contrast` | Serious | axe could not determine contrast for many elements because their backgrounds use images |

### Positive findings

The page passed many important checks, including:

- Page has a non-empty `<title>`
- `<html lang="en">` is present and valid
- Images have `alt` text
- Links have discernible text
- Form controls have labels / accessible names
- Skip link exists
- Lists are structurally valid
- Tables use headers, captions, and header associations
- Many visible text elements have sufficient color contrast where axe could calculate it

---

## 2. Severity grouping

### Moderate violations

#### 1. Missing main landmark

**Rule:** `landmark-one-main`  
**Impact:** Moderate  
**Problem:** The page does not expose a `<main>` element or `role="main"` landmark.

This affects users of screen readers and other assistive technologies who rely on landmark navigation to jump directly to the main content.

Example affected target:

```html
<html lang="en">
```

Failure message:

> Document does not have a main landmark

---

#### 2. Content not contained by landmarks

**Rule:** `region`  
**Impact:** Moderate  
**Problem:** Several areas of page content are outside semantic landmarks.

Affected examples include:

- Logo area: `#logos`
- Meta page heading: `#meta-header > h1`
- Meta navigation: `#mnav`
- Demo skip links
- Header logo link
- Weather image
- Quick-menu form label and select
- Info section: `#info`
- Main content wrapper: `#main`
- Footer: `#footer`
- Meta footer: `#meta-footer`

This makes page navigation less efficient for users who browse by landmarks.

---

### Serious incomplete checks

#### Color contrast could not be determined

**Rule:** `color-contrast`  
**Impact:** Serious  
**Status:** Incomplete, not confirmed failure  
**Problem:** axe could not determine the background color for many elements because background images are involved.

Examples include:

- Current page tab: `.page.current`
- Annotation toggle: `.annotoggle`
- Main navigation links: `.home`, `.news`, `.facts_set`, `.survey`
- Main heading: `#content > h1`
- Body text inside `#main`
- Tables, captions, headers, and data cells
- Terms and conditions heading and list items

This does not necessarily mean the page fails WCAG contrast requirements, but it does mean these items need **manual contrast verification**.

---

### No critical or serious confirmed violations

The scan does **not** report any confirmed `critical` or `serious` violations. Several serious or critical rules appear in the `passes` section, but those are successful checks, not failures.

---

## 3. Most critical accessibility problems

Although there are no confirmed critical violations, the most important issues are:

### 1. Missing main landmark

The absence of a main landmark is the clearest structural issue. Users of assistive technology often use landmarks to quickly move to:

- Header
- Navigation
- Main content
- Footer
- Complementary content

Without a main landmark, users may have to tab or browse through repeated header and navigation content before reaching the ticket information.

Recommended fix:

```html
<main id="main">
  ...
</main>
```

Or, if changing the element is difficult:

```html
<div id="main" role="main">
  ...
</div>
```

---

### 2. Incomplete landmark structure

Multiple sections are not contained in appropriate landmarks. This weakens the semantic structure of the page.

For example:

```html
<div id="footer">
```

should likely be:

```html
<footer id="footer">
```

And navigation areas such as:

```html
<div id="mnav">
```

should likely be:

```html
<nav id="mnav" aria-label="Demo navigation">
```

---

### 3. Color contrast needs manual validation

The biggest potential risk is the large number of incomplete color contrast checks. Many of these are important content areas, including:

- Navigation links
- Main page heading
- Ticket pricing table
- Concert dates
- Terms and conditions

Because the page uses background images, axe cannot automatically determine whether text meets WCAG contrast thresholds.

If any of these fail contrast, the impact would be significant for users with low vision, color-vision differences, or users viewing the page in poor lighting.

---

## 4. Accessibility insights

### The page is generally accessible in many core areas

The scan shows strong accessibility support in several foundational areas:

- Images have alternative text.
- Links have accessible names.
- Form controls are labeled.
- Skip links exist.
- Language is declared correctly.
- Tables appear to be semantically structured.
- List markup is valid.
- Many text elements have sufficient calculated contrast.

This suggests the page has already addressed many common accessibility failures.

---

### The remaining issues are mostly structural

The confirmed violations are not about missing labels, broken ARIA, empty links, or image alternatives. They are about **page regions and landmarks**.

This means the page may be understandable once a user reaches the content, but it is less efficient to navigate.

---

### The page uses older layout patterns

The markup appears to use many generic containers:

```html
<div id="header">
<div id="nav">
<div id="main">
<div id="footer">
```

These are visually meaningful but not automatically meaningful to assistive technologies unless they are converted to semantic HTML or given landmark roles.

Modern HTML should prefer:

```html
<header>
<nav>
<main>
<footer>
```

---

### Some content may be duplicated between demo wrapper and demo page

The page appears to contain both W3C demo wrapper content and the Citylights demo page content. This may explain the multiple headers, navigation areas, and footers.

If this page is intended as a demo embedded inside a larger instructional page, landmarks should be carefully labeled to distinguish:

- W3C/WAI demo wrapper navigation
- Citylights demo navigation
- Main demo content
- Meta footer
- Demo page footer

Use `aria-label` where multiple landmarks of the same type exist.

Example:

```html
<nav aria-label="WAI demo navigation">
```

```html
<nav aria-label="Citylights site navigation">
```

---

### Color contrast cannot be assumed to pass

The calculated contrast results that did pass are very good in many cases, often with high ratios such as `21:1`, `13.71:1`, and `8.59:1`.

However, many important areas could not be checked because of background images. These need human verification using a color picker or browser dev tools.

---

## 5. Recommendations for improvement

### Priority 1: Add a main landmark

Wrap the primary page content in a `<main>` element.

Current pattern:

```html
<div id="main">
  ...
</div>
```

Recommended:

```html
<main id="main">
  ...
</main>
```

If preserving the existing element is necessary:

```html
<div id="main" role="main">
  ...
</div>
```

There should generally be **one** main landmark per page.

---

### Priority 2: Convert structural `<div>` elements into semantic landmarks

Recommended changes:

| Current element | Recommended element |
|---|---|
| `#meta-header` | `<header>` or `<div role="banner">` |
| `#mnav` | `<nav aria-label="WAI demo navigation">` |
| `#header` | `<header>` |
| `#nav` | `<nav aria-label="Citylights navigation">` |
| `#main` | `<main>` |
| `#footer` | `<footer>` |
| `#meta-footer` | `<footer>` or clearly labeled complementary/contentinfo region |

Example:

```html
<header id="meta-header">
  ...
</header>

<nav id="mnav" aria-label="Demo navigation">
  ...
</nav>

<main id="main">
  ...
</main>

<footer id="footer">
  ...
</footer>
```

If there are multiple footers or headers, make their purposes clear with labels where appropriate.

---

### Priority 3: Ensure all meaningful content is inside landmarks

Move or wrap the following content into appropriate landmark containers:

- `#logos`
- `#meta-header > h1`
- `.subline`
- `#mnav`
- Demo skip links
- `#header > a`
- Weather image
- Quick menu label and select
- `#info`
- `#main`
- `#footer`
- `#meta-footer`

For example:

```html
<header id="header">
  <a href="home.html">
    <img src="./img/toplogo.png" alt="Citylights: your access to the city.">
  </a>

  <form>
    ...
  </form>

  <div id="info">
    ...
  </div>
</header>
```

---

### Priority 4: Manually verify color contrast for image-backed elements

Because axe could not compute contrast where background images are used, manually check contrast for:

- Navigation tabs
- Current page indicator
- Main heading
- Body copy over background images
- Table captions
- Table headers and data cells
- Terms and conditions section

Use WCAG thresholds:

| Text type | Minimum contrast |
|---|---:|
| Normal text | 4.5:1 |
| Large text, 18pt+ or 14pt+ bold | 3:1 |
| UI components / graphical objects | 3:1 |

If contrast is insufficient, consider:

- Replacing image backgrounds with solid colors
- Adding a solid background behind text
- Using darker text
- Using lighter background overlays
- Avoiding text directly over patterned or gradient images

Example improvement:

```css
#main {
  background-color: #ffffff;
  background-image: none;
}

#main p,
#main td,
#main th {
  color: #000000;
}
```

Or:

```css
.text-on-image {
  background-color: rgba(255, 255, 255, 0.95);
  color: #000;
}
```

---

### Priority 5: Preserve existing good practices

The page already does many things well. Keep the following:

- Meaningful image `alt` attributes
- Visible form labels
- Skip links
- Valid language attributes
- Discernible link text
- Semantic lists
- Table captions and header associations
- High contrast where already confirmed

---

### Priority 6: Re-test after changes

After applying landmark and contrast updates:

1. Re-run axe-core.
2. Confirm `landmark-one-main` is resolved.
3. Confirm `region` is resolved or significantly reduced.
4. Manually test contrast for background-image areas.
5. Test keyboard navigation.
6. Test screen reader landmark navigation.

Recommended manual checks:

- Can a screen reader user jump directly to main content?
- Are navigation regions clearly named?
- Are there multiple landmarks with the same role and no label?
- Does the visual focus indicator remain visible?
- Does text remain readable at 200% zoom?
- Are background images still compatible with high-contrast or forced-colors modes?

---

## Overall assessment

The page has a relatively good accessibility foundation. The confirmed failures are limited to **landmark structure**, especially the missing main landmark and content outside landmarks.

The main remediation work should focus on:

1. Adding a proper `<main>` landmark.
2. Wrapping header, navigation, content, and footer areas in semantic landmarks.
3. Manually validating color contrast for image-backed content.

Once those are addressed, the page should be significantly easier to navigate for screen reader and keyboard users.