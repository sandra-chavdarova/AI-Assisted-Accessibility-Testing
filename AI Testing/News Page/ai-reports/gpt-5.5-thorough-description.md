# AI Fix Suggestions Report

**Model:** gpt-5.5  
**Prompt strategy:** thorough-description  
**Date:** 2026-05-13  

---

## html-has-lang (serious)

**Original code:**
```html
<html>
```

**Prompt sent:**
```
You are an accessibility expert.

Analyze the following accessibility issue and suggest a fix.

Context:
The HTML root element is missing a lang attribute. This means assistive technologies like screen readers cannot determine the language of the page content, which affects correct pronunciation, text-to-speech synthesis, and language-specific rendering. Every HTML document must declare its primary language using the lang attribute on the <html> element.

HTML:
<html>

Requirements:
1. Confirm what the accessibility problem is and explain why (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

## 1. Accessibility problem

The page’s root `<html>` element is missing a `lang` attribute:

```html
<html>
```

This is an accessibility issue because assistive technologies, including screen readers and text-to-speech tools, rely on the `lang` attribute to determine the primary language of the page. Without it, they may use the wrong pronunciation rules, voice settings, or language-specific processing.

This fails **WCAG 2.1 Success Criterion 3.1.1: Language of Page** — Level A.

> The default human language of each web page must be programmatically determinable.

## 2. Corrected code snippet

If the page is primarily in English:

```html
<html lang="en">
```

Full example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Page Title</title>
</head>
<body>
  Page content
</body>
</html>
```

If the page uses another primary language, use the appropriate language code, for example:

```html
<html lang="fr">
```

or:

```html
<html lang="es">
```

## 3. Why the fix works

Adding `lang="en"` to the `<html>` element programmatically declares the primary language of the document.

This allows screen readers, browsers, translation tools, and other assistive technologies to:

- Apply the correct pronunciation rules
- Select the correct speech synthesis voice
- Interpret punctuation and grammar more accurately
- Handle language-specific rendering and hyphenation correctly

By declaring the page language on the root `<html>` element, the document satisfies **WCAG 3.1.1: Language of Page**.

---

## image-alt (critical)

**Original code:**
```html
<img src="./img/border_left_top.gif" width="10px" height="10px">
```

**Prompt sent:**
```
You are an accessibility expert.

Analyze the following accessibility issue and suggest a fix.

Context:
This is a small 10x10 pixel decorative border image used purely for visual styling purposes. It carries no informational value and conveys nothing meaningful to the user. Because it is decorative, it should be hidden from assistive technologies entirely — not described. Adding a descriptive alt text would cause screen readers to announce a meaningless decorative element to users.

HTML:
<img src="./img/border_left_top.gif" width="10px" height="10px">

Requirements:
1. Confirm what the accessibility problem is and explain why (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

## 1. Accessibility problem

The image is decorative but has no `alt` attribute:

```html
<img src="./img/border_left_top.gif" width="10px" height="10px">
```

This is an accessibility issue under **WCAG 2.2 Success Criterion 1.1.1: Non-text Content**.

WCAG requires that non-text content either have an appropriate text alternative or, if it is purely decorative, be implemented so assistive technologies can ignore it.

Because this image is only a visual border corner and conveys no meaning, it should **not** have descriptive alt text. However, if the `alt` attribute is missing, some screen readers may announce the image filename or path, such as `border_left_top.gif`, which creates unnecessary noise for users.

## 2. Corrected code snippet

```html
<img src="./img/border_left_top.gif" width="10" height="10" alt="" aria-hidden="true">
```

## 3. Why this fix works

The empty `alt=""` tells assistive technologies that the image is decorative and has no meaningful content.

The `aria-hidden="true"` further ensures the image is removed from the accessibility tree and is not announced by screen readers.

Also, the `width` and `height` attributes should use numeric values without `px`, so `width="10"` and `height="10"` are correct HTML.

This satisfies **WCAG 1.1.1 Non-text Content** because decorative content is implemented in a way that allows assistive technologies to ignore it.

---

## select-name (critical)

**Original code:**
```html
<select onchange="location.href = this.value;">
  <option value="./home.html">Home</option>
  <option value="./news.html">News</option>
  <option value="./tickets.html">Tickets</option>
</select>
```

**Prompt sent:**
```
You are an accessibility expert.

Analyze the following accessibility issue and suggest a fix.

Context:
This is a navigation select element that redirects the user to a different page immediately when an option is selected, using onchange='location.href = this.value'. It has no associated label, so screen readers cannot identify its purpose. Additionally, the onchange handler causes immediate page navigation when a keyboard user presses arrow keys to browse options — before they can confirm their choice. This affects both screen reader users and keyboard-only users.

HTML:
<select onchange="location.href = this.value;">
  <option value="./home.html">Home</option>
  <option value="./news.html">News</option>
  <option value="./tickets.html">Tickets</option>
</select>

Requirements:
1. Confirm what the accessibility problem is and explain why (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

## 1. Accessibility problem

The `<select>` has two accessibility issues:

1. **No accessible label**
   - Screen reader users cannot determine what the select menu is for.
   - This fails or risks failing:
     - **WCAG 2.1 / 2.2 — 4.1.2 Name, Role, Value**
       - Form controls must expose an accessible name to assistive technologies.
     - Also related to **WCAG 1.3.1 Info and Relationships**, because the relationship between the control and its purpose is not programmatically available.

2. **Immediate navigation on selection**
   - The `onchange` handler redirects the user as soon as the selected option changes.
   - Keyboard users often use arrow keys to move through `<select>` options. If changing the highlighted option triggers navigation immediately, users may be taken to a new page before confirming their choice.
   - This fails or risks failing:
     - **WCAG 3.2.2 On Input**
       - Changing the setting of a user interface component must not automatically cause a change of context unless the user has been advised before using it.

## 2. Corrected code snippet

```html
<nav aria-label="Site navigation">
  <form id="navigation-form">
    <label for="page-select">Go to page</label>

    <select id="page-select" name="page">
      <option value="./home.html">Home</option>
      <option value="./news.html">News</option>
      <option value="./tickets.html">Tickets</option>
    </select>

    <button type="submit">Go</button>
  </form>
</nav>

<script>
  document.getElementById("navigation-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedUrl = document.getElementById("page-select").value;

    if (selectedUrl) {
      window.location.href = selectedUrl;
    }
  });
</script>
```

## 3. Why this fix works

- The `<label for="page-select">Go to page</label>` gives the `<select>` a clear accessible name.
  - Screen reader users will hear something like: “Go to page, combo box.”
  - This satisfies the need for a programmatically associated label.

- The page no longer changes immediately when the user changes the selected option.
  - Users can move through the options with the keyboard without being redirected unexpectedly.
  - Navigation only happens when the user explicitly activates the **Go** button.

- The separate submit button provides a clear confirmation step.
  - This avoids an unexpected change of context and aligns with **WCAG 3.2.2 On Input**.

---

## link-name (serious)

**Original code:**
```html
<a href="javascript:location.href='home.html';" onfocus="blur();"><img name="nav_home" src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0px"></a>
```

**Prompt sent:**
```
You are an accessibility expert.

Analyze the following accessibility issue and suggest a fix.

Context:
This is a navigation link in the site header that uses an image instead of text. It has three separate accessibility problems: (1) the image has no alt attribute so screen readers cannot announce the link purpose, (2) onfocus='blur()' programmatically removes keyboard focus the moment the element is reached, making it completely unreachable for keyboard-only users, (3) the href uses javascript:location.href instead of a standard URL, which breaks browser history, right-click open in new tab, and assistive technology link destination reading.

HTML:
<a href="javascript:location.href='home.html';" onfocus="blur();"><img name="nav_home" src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0px"></a>

Requirements:
1. Confirm what the accessibility problem is and explain why (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

## Accessibility problem

The link is an image-only navigation link, but it is not accessible because:

1. **The image has no `alt` attribute**  
   Screen readers use the image’s `alt` text as the accessible name for the link. Without it, the link purpose may be announced as blank, the image filename, or something unhelpful.  
   **WCAG 2.2 SC 1.1.1 — Non-text Content**  
   **WCAG 2.2 SC 2.4.4 — Link Purpose (In Context)**  
   **WCAG 2.2 SC 4.1.2 — Name, Role, Value**

2. **`onfocus="blur();"` removes keyboard focus**  
   When keyboard users tab to the link, focus is immediately removed, making the link effectively unreachable and unusable by keyboard.  
   **WCAG 2.2 SC 2.1.1 — Keyboard**  
   Also impacts **SC 2.4.7 — Focus Visible**, because users cannot see or maintain focus on the link.

3. **The `href` uses `javascript:location.href` instead of a real URL**  
   This prevents the link from behaving like a normal link. It can break browser features such as copying the link, opening in a new tab, link destination preview, browser history behavior, and assistive technology interpretation of the link destination. Native links should use real URLs in `href`.

## Corrected code snippet

```html
<a href="home.html">
  <img
    src="./img/nav_home.gif"
    width="88"
    height="27"
    alt="Home"
  >
</a>
```

Optional CSS replacement for the old presentational attributes:

```css
.site-header a img {
  border: 0;
}

.site-header a {
  margin-inline: 15px;
}
```

## Why this fix works

- `alt="Home"` gives the image a text alternative. Because the image is inside a link, that `alt` text becomes the accessible name of the link. A screen reader can announce something meaningful such as “Home, link.”
- Removing `onfocus="blur();"` allows keyboard users to tab to the link, see focus, and activate it with Enter.
- Using `href="home.html"` makes the element a normal, semantic link. It works with browser history, right-click “open in new tab,” copy link address, assistive technology link lists, and standard keyboard/browser behavior.
- The link now has a clear purpose, is keyboard accessible, and preserves native HTML behavior.

---

## region (moderate)

**Original code:**
```html
<p id="logos">
  <a href="https://www.w3.org/" title="W3C Home">
    <img alt="W3C logo" src="../img/w3c.png" height="48" width="72">
  </a>
  <a href="https://www.w3.org/WAI/" title="WAI Home">
    <img alt="Web Accessibility Initiative (WAI) logo" src="../img/wai.png" height="48">
  </a>
</p>
```

**Prompt sent:**
```
You are an accessibility expert.

Analyze the following accessibility issue and suggest a fix.

Context:
This paragraph contains two logo images linking to W3C and WAI homepages. Both images have correct alt text and both links have descriptive title attributes — the content inside is fully accessible. The only problem is that the paragraph itself is not wrapped in any landmark region such as header, nav, main, or footer. Screen reader users who navigate by landmarks will skip this content entirely because it is outside any landmark.

HTML:
<p id="logos">
  <a href="https://www.w3.org/" title="W3C Home">
    <img alt="W3C logo" src="../img/w3c.png" height="48" width="72">
  </a>
  <a href="https://www.w3.org/WAI/" title="WAI Home">
    <img alt="Web Accessibility Initiative (WAI) logo" src="../img/wai.png" height="48">
  </a>
</p>

Requirements:
1. Confirm what the accessibility problem is and explain why (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

## 1. Accessibility problem

The two linked logo images are accessible individually: the images have useful `alt` text, and the links have descriptive text via the images’ accessible names.

The problem is structural: the content is outside any landmark region. Users who navigate by landmarks — for example, jumping between `banner`, `navigation`, `main`, and `contentinfo` regions — may not encounter this logo area when using landmark navigation.

This relates primarily to **WCAG 2.1 / 2.2 Success Criterion 1.3.1: Info and Relationships**. The visual/structural relationship of this content to the page — likely as page branding or header content — should be programmatically determinable. Landmarks provide that semantic structure to assistive technologies.

It also supports **WCAG 2.4.1: Bypass Blocks**, because landmarks help users identify and move past repeated page regions such as headers and navigation.

## 2. Corrected code snippet

If these logos are part of the page header or branding area, wrap them in a `header` landmark:

```html
<header>
  <p id="logos">
    <a href="https://www.w3.org/" title="W3C Home">
      <img alt="W3C logo" src="../img/w3c.png" height="48" width="72">
    </a>
    <a href="https://www.w3.org/WAI/" title="WAI Home">
      <img alt="Web Accessibility Initiative (WAI) logo" src="../img/wai.png" height="48">
    </a>
  </p>
</header>
```

If this logo block is specifically site navigation, a `nav` landmark may be more appropriate:

```html
<nav aria-label="Home links">
  <p id="logos">
    <a href="https://www.w3.org/" title="W3C Home">
      <img alt="W3C logo" src="../img/w3c.png" height="48" width="72">
    </a>
    <a href="https://www.w3.org/WAI/" title="WAI Home">
      <img alt="Web Accessibility Initiative (WAI) logo" src="../img/wai.png" height="48">
    </a>
  </p>
</nav>
```

## 3. Why the fix works

Wrapping the content in an appropriate landmark exposes the page structure programmatically to assistive technologies.

Using `<header>` identifies the logo area as part of the page’s banner/header content. Screen reader users can then navigate to the header/banner landmark and encounter the logo links there.

Using `<nav aria-label="Home links">` identifies the logo links as a navigation region. The `aria-label` gives the navigation landmark a clear accessible name, helping users distinguish it from other navigation areas on the page.

In both cases, the content is no longer isolated outside the page’s landmark structure, making it easier for screen reader users who rely on landmark navigation to find it.

---

