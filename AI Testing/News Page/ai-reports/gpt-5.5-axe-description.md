# AI Fix Suggestions Report

**Model:** gpt-5.5  
**Prompt strategy:** axe-description  
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

Issue:
Ensure every HTML document has a lang attribute

HTML:
<html>

Requirements:
1. Confirm what the accessibility problem is and explain why (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

## 1. Accessibility problem

The HTML document is missing a `lang` attribute on the root `<html>` element:

```html
<html>
```

This fails **WCAG 2.1 / 2.2 Success Criterion 3.1.1: Language of Page**.

The `lang` attribute identifies the primary language of the page. Without it, assistive technologies such as screen readers may not know which language rules to use for pronunciation, voice selection, punctuation, and reading behavior. This can make the content harder or impossible to understand for some users.

## 2. Corrected code snippet

If the page content is in English:

```html
<html lang="en">
```

Full example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Page title</title>
</head>
<body>
  <p>Page content goes here.</p>
</body>
</html>
```

## 3. Why this fix works

Adding `lang="en"` declares that the primary language of the document is English. Screen readers, browsers, translation tools, and other assistive technologies can then process the page using the correct language settings.

If the page is in another language, use the appropriate language code, for example:

```html
<html lang="fr">
```

or

```html
<html lang="es">
```

The value should match the main language of the page using a valid language tag.

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

Issue:
Ensure <img> elements have alternative text or a role of none or presentation

HTML:
<img src="./img/border_left_top.gif" width="10px" height="10px">

Requirements:
1. Confirm what the accessibility problem is and explain why (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

### 1. Accessibility problem

The `<img>` element does not have alternative text:

```html
<img src="./img/border_left_top.gif" width="10px" height="10px">
```

This fails **WCAG 2.1 Success Criterion 1.1.1: Non-text Content**, which requires that images have a text alternative unless they are purely decorative.

Because this image appears to be a small border/corner graphic (`border_left_top.gif`), it is likely decorative. Without an `alt` attribute, assistive technologies may announce the image filename or treat it as unlabeled content, creating unnecessary noise for screen reader users.

---

### 2. Corrected code snippet

```html
<img src="./img/border_left_top.gif" width="10" height="10" alt="">
```

---

### 3. Why this fix works

The empty `alt=""` tells assistive technologies that the image is decorative and should be ignored.

This satisfies WCAG **1.1.1 Non-text Content** because decorative images do not need meaningful alternative text, but they still need to be explicitly marked so screen readers do not announce them unnecessarily.

If the image is purely visual decoration, an even better long-term approach would be to move it into CSS as a background image instead of using an `<img>` element.

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

Issue:
Ensure select element has an accessible name

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

### 1. Accessibility problem

The `<select>` element does not have an accessible name.

Screen reader users may hear only something like “combo box” or “collapsed” without knowing what the menu is for. Form controls need a programmatically determinable name so assistive technologies can identify their purpose.

This is a failure of:

**WCAG 2.1 Success Criterion 4.1.2 — Name, Role, Value**

> User interface components must have a name and role that can be programmatically determined.

It may also affect usability for **WCAG 3.3.2 — Labels or Instructions**, because the control lacks a visible label explaining what the user is expected to do.

---

### 2. Corrected code snippet

```html
<label for="page-select">Choose a page</label>

<select id="page-select" name="page-select" onchange="location.href = this.value;">
  <option value="./home.html">Home</option>
  <option value="./news.html">News</option>
  <option value="./tickets.html">Tickets</option>
</select>
```

---

### 3. Why this fix works

The `<label>` element provides a clear, visible name for the `<select>`.

The `for="page-select"` attribute connects the label to the `<select>` with `id="page-select"`. This means assistive technologies can programmatically determine the control’s accessible name.

A screen reader can now announce something like:

> “Choose a page, combo box, Home”

This tells the user both what the control is and what it is used for.

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

Issue:
Ensure links have discernible text

HTML:
<a href="javascript:location.href='home.html';" onfocus="blur();"><img name="nav_home" src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0px"></a>

Requirements:
1. Confirm what the accessibility problem is and explain why (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

## 1. Accessibility problem

The link does not have discernible text.

```html
<a href="javascript:location.href='home.html';" onfocus="blur();">
  <img name="nav_home" src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0px">
</a>
```

The link contains only an image, but the image has no `alt` attribute. Because of that, screen readers and other assistive technologies do not have an accessible name for the link. A user may hear only something like “link” or the image file name, which does not explain the link’s purpose.

This relates primarily to:

- **WCAG 2.1 Success Criterion 2.4.4 — Link Purpose In Context**  
  The purpose of each link must be determinable from the link text or its context.

It can also affect:

- **WCAG 2.1 Success Criterion 4.1.2 — Name, Role, Value**  
  User interface components must have an accessible name and role that assistive technologies can determine.

Additionally, `onfocus="blur();"` removes keyboard focus from the link, which can make keyboard navigation difficult or impossible.

---

## 2. Corrected code snippet

```html
<a href="home.html">
  <img 
    name="nav_home"
    src="./img/nav_home.gif"
    width="88"
    height="27"
    alt="Home">
</a>
```

---

## 3. Why this fix works

The `alt="Home"` text gives the image an accessible text alternative. Because the image is inside the link, that alternative text becomes the accessible name of the link.

Assistive technologies can now announce the link clearly, for example:

> “Home, link”

The fix also replaces the JavaScript-based navigation with a normal `href="home.html"`, which is more reliable, accessible, and works better for keyboard users, screen readers, browsers, and search engines.

Removing `onfocus="blur();"` allows keyboard users to tab to the link and see/use focus normally.

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

Issue:
Ensure all page content is contained by landmarks

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

The logo links are page content, but they are not contained inside a landmark region such as `<header>`, `<main>`, `<nav>`, or `<footer>`.

This can make the page structure harder to understand and navigate for screen reader users, because many assistive technologies allow users to jump between landmarks.

Relevant WCAG criterion:

- **WCAG 2.1 / 2.2 — 1.3.1 Info and Relationships**: Information, structure, and relationships conveyed visually should also be programmatically determinable.
- This also supports **WCAG 2.4.1 Bypass Blocks**, because landmarks help users bypass repeated content such as headers and navigation.

## 2. Corrected code snippet

Since these logos appear to be site or organizational branding links, they should be placed inside a page header landmark.

```html
<header>
  <div id="logos">
    <a href="https://www.w3.org/" title="W3C Home">
      <img alt="W3C logo" src="../img/w3c.png" height="48" width="72">
    </a>
    <a href="https://www.w3.org/WAI/" title="WAI Home">
      <img alt="Web Accessibility Initiative (WAI) logo" src="../img/wai.png" height="48">
    </a>
  </div>
</header>
```

## 3. Why this fix works

The `<header>` element creates a landmark region, exposed to assistive technologies as a **banner** landmark when it is used at the top level of the page.

By placing the logo links inside `<header>`, the content is now part of the page’s programmatically defined structure. Screen reader users can navigate to the header/banner landmark and find the logo links there.

Also, replacing the `<p>` with a `<div>` is more appropriate because the logos are not paragraph text; they are grouped branding/navigation links.

---

