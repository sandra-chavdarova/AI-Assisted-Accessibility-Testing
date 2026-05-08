## 1. Summary of accessibility issues

The scan was run with **axe-core 4.11.4** on:

`https://www.w3.org/WAI/demos/bad/after/tickets.html`

Overall, the page performs well on many fundamental accessibility checks. It has:

- A valid document title.
- A valid `lang="en"` on the `<html>` element.
- Valid `lang="fr"` on French text.
- Discernible link text.
- Image alternative text.
- Labeled form controls.
- Structured lists.
- Mostly valid table header associations.
- Skip links / bypass mechanisms.

However, axe reported **2 confirmed accessibility violations**, both **moderate impact**, plus a significant number of **incomplete color contrast checks** that require manual review.

### Confirmed violations

| Issue | Impact | Affected nodes | Summary |
|---|---:|---:|---|
| Missing main landmark | Moderate | 1 | The document does not contain a `<main>` landmark or `role="main"`. |
| Content outside landmarks | Moderate | 14 | Several visible page sections are not contained within semantic landmarks such as `header`, `nav`, `main`, or `footer`. |

### Incomplete / needs manual verification

| Issue | Impact | Affected nodes | Summary |
|---|---:|---:|---|
| Color contrast could not be determined | Serious | ~53 | axe could not calculate contrast because background images obscure the actual background color. |

These incomplete checks are not confirmed failures, but they are important because they relate to **WCAG 1.4.3 Contrast Minimum**, a common and user-impacting accessibility requirement.

---

## 2. Severity grouping

### Critical

**0 confirmed critical violations**

No critical accessibility violations were reported.

Several critical-level rules passed, including:

- Images have `alt` text.
- The page body is not hidden from assistive technology.
- Input buttons have discernible names.
- The select element has an accessible name.

---

### Serious

**0 confirmed serious violations**

No confirmed serious violations were reported.

However, there is **1 serious incomplete rule**:

#### Incomplete: `color-contrast`

axe could not determine color contrast for many elements because the background color is affected by a background image.

Examples include:

- `.page.current`
- `.annotoggle`
- `.home > a`
- `.news > a`
- `.facts_set > a`
- `.survey > a`
- `#content > h1`
- `#sffloat1` text
- Table captions
- Table cells
- Price table values
- Terms and conditions list items

Because the issue is marked incomplete, it requires **manual testing** rather than automatic remediation assumptions.

---

### Moderate

**2 confirmed moderate violations**

#### 1. `landmark-one-main`

The document does not have a main landmark.

Affected target:

```html
<html lang="en">
```

Problem:

```text
Document does not have a main landmark
```

This means screen reader users and keyboard users cannot reliably jump to the primary page content using landmark navigation.

---

#### 2. `region`

Some content is not contained by landmarks.

Affected examples include:

```html
<p id="logos">...</p>
```

```html
<h1>
  <span class="subhead">Accessible Tickets Page</span>
  <span class="hidden"> -</span>
  Before and After Demonstration
</h1>
```

```html
<div id="mnav" class="accessible">
```

```html
<ul class="skip">...</ul>
```

```html
<div id="main">
```

```html
<div id="footer">
```

```html
<div id="meta-footer" class="meta">
```

This indicates that some page sections are visually structured but not semantically exposed through landmarks.

---

### Minor

**0 confirmed minor violations**

No minor violations were reported.

---

## 3. Most critical accessibility problems

Although the confirmed violations are only **moderate**, the most important accessibility concerns are:

### 1. Missing main landmark

The page does not expose a clear main content region.

This affects users who rely on:

- Screen reader landmark navigation.
- Keyboard shortcuts for jumping between regions.
- Browser or assistive-technology page structure summaries.

A page should generally have exactly one main landmark:

```html
<main id="main">
  ...
</main>
```

or:

```html
<div id="main" role="main">
  ...
</div>
```

This is the most important confirmed issue because it affects global page navigation.

---

### 2. Content not contained within landmarks

Multiple structural areas are outside recognized landmarks. This can make the page harder to understand and navigate for assistive technology users.

Examples include the logo area, meta header, navigation wrapper, demo skip links, main content wrapper, footer, and meta footer.

This suggests the page uses many `<div>` and `<p>` containers for layout but does not consistently provide semantic equivalents such as:

```html
<header>
<nav>
<main>
<footer>
```

or ARIA landmark roles.

---

### 3. Color contrast could not be verified because of background images

This is not a confirmed violation, but it is the most serious potential issue.

axe reported many instances like:

```text
Element's background color could not be determined due to a background image
```

This means automated testing could not confirm whether the foreground text meets contrast requirements.

Affected content includes navigation, headings, tables, ticket prices, and terms text. If any of those areas fail contrast, users with low vision, color vision deficiencies, or glare-sensitive viewing conditions may have difficulty reading the page.

---

## 4. Accessibility insights

### Positive findings

The page has many good accessibility characteristics:

- **Document language is defined** with `lang="en"`.
- **Foreign-language text is marked** with `lang="fr"`.
- **Images have alternative text**, including W3C, WAI, Citylights, and weather images.
- **Links have discernible names**.
- **The select menu has a visible label**.
- **Tables use captions and header associations**.
- **Skip links are present**.
- **Heading order passed axe’s check**.
- **Lists are semantically structured**.
- **Most visible text contrast that axe could evaluate passed.**

This suggests the page is already substantially more accessible than a typical unremediated page.

---

### Landmark structure is the main confirmed weakness

The page appears to have visual regions such as:

- Meta header
- Main navigation
- Demo page area
- Citylights header
- Main content
- Footer
- Meta footer

But several of these are not represented using semantic landmarks. For sighted users, the visual layout may be clear, but assistive technology users benefit from semantic page regions.

---

### Automated testing has limitations

The large number of incomplete color-contrast checks is a good example of where automated tools need human support.

axe can calculate contrast when foreground and background colors are determinable. But when background images, gradients, overlays, or transparency are involved, axe may not know what color is actually behind the text.

Therefore, incomplete color-contrast results should not be ignored. They should be manually checked.

---

### Best-practice issues can still matter

Both confirmed violations are tagged as best-practice or structural issues rather than direct WCAG failures. However, they still matter because landmarks are heavily used by screen reader users to navigate complex pages efficiently.

A page without a main landmark may still be usable, but it is less efficient and less predictable.

---

## 5. Recommendations for improvement

### Priority 1: Add a main landmark

Wrap the primary page content in a `<main>` element.

Current structure appears to include:

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

If changing the element is difficult, use:

```html
<div id="main" role="main">
  ...
</div>
```

There should generally be **one and only one** main landmark per page.

---

### Priority 2: Place all visible content inside landmarks

Use semantic HTML landmarks for major page areas.

For example:

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

For multiple navigation sections, give each one a unique accessible name:

```html
<nav id="mnav" aria-label="WAI demo navigation">
  ...
</nav>

<nav id="nav" aria-label="Citylights navigation">
  ...
</nav>
```

For supplemental footer or metadata sections, use either a single footer or named regions where appropriate:

```html
<footer id="meta-footer">
  ...
</footer>
```

or:

```html
<section id="meta-footer" aria-label="Demo information">
  ...
</section>
```

---

### Priority 3: Manually verify color contrast where axe was incomplete

Review all incomplete `color-contrast` results manually.

Check text against WCAG contrast requirements:

- **Normal text:** at least **4.5:1**
- **Large text:** at least **3:1**
- **UI components / graphical meaningful elements:** at least **3:1**

Particularly inspect:

- Navigation links.
- Active tab/current page indicators.
- Headings over background images.
- Ticket price tables.
- Table captions.
- Terms and conditions text.
- Any text over patterned or image backgrounds.

Useful approaches:

- Temporarily disable background images and inspect fallback colors.
- Use browser DevTools to identify computed foreground and background colors.
- Use a contrast checker with sampled colors from the actual rendered page.
- Test hover, focus, active, and selected states.

---

### Priority 4: Provide solid fallback background colors

Where text appears over a background image, define a reliable fallback background color.

Example:

```css
#main {
  background-color: #ffffff;
  background-image: url(...);
}
```

For text overlays, consider adding a solid or semi-opaque background behind text:

```css
.text-panel {
  background-color: #ffffff;
  color: #000000;
}
```

or:

```css
.text-panel {
  background-color: rgba(255, 255, 255, 0.92);
  color: #000000;
}
```

This improves both readability and automated testability.

---

### Priority 5: Retest after landmark changes

After adding semantic landmarks, rerun axe and verify that these rules pass:

- `landmark-one-main`
- `region`
- `landmark-no-duplicate-main`
- `landmark-main-is-top-level`
- `landmark-unique`

Also perform quick manual tests:

- Use keyboard only.
- Tab through the page.
- Activate skip links.
- Use a screen reader landmarks list.
- Confirm there is a single main region.
- Confirm navigation regions have meaningful names.

---

## Overall assessment

The page has a generally strong accessibility foundation. The confirmed issues are mainly related to **semantic page structure**, especially missing or incomplete landmark regions.

The most urgent follow-up is to:

1. Add a single main landmark.
2. Wrap all major page content in appropriate landmarks.
3. Manually verify color contrast for areas using background images.

Once those are addressed, the page should be substantially more robust for screen reader, keyboard, and low-vision users.