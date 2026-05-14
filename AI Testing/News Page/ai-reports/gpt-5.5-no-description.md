# AI Fix Suggestions Report

**Model:** gpt-5.5  
**Prompt strategy:** no-description  
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

Analyze the following HTML snippet for accessibility issues and suggest a fix.

HTML:
<html>

Requirements:
1. Identify and explain the accessibility problem (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

## 1. Accessibility problem

The `<html>` element is missing a `lang` attribute:

```html
<html>
```

This creates an accessibility issue because assistive technologies, such as screen readers, may not know what language to use when pronouncing the page content.

### Relevant WCAG criterion

**WCAG 2.2 — 3.1.1 Language of Page — Level A**

> The default human language of each web page can be programmatically determined.

Without a `lang` attribute, screen readers may use the wrong pronunciation rules, voice, or language processing.

---

## 2. Corrected code snippet

If the page is in English:

```html
<html lang="en">
```

A more complete example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Title</title>
</head>
<body>
  <!-- Page content -->
</body>
</html>
```

---

## 3. Why the fix works

Adding `lang="en"` tells browsers and assistive technologies that the primary language of the page is English.

This helps screen readers:

- Use the correct pronunciation rules
- Select the appropriate speech synthesizer voice
- Interpret punctuation and abbreviations correctly
- Improve the experience for users who rely on assistive technology

If the page is in another language, use the appropriate language code, for example:

```html
<html lang="fr">
```

for French, or:

```html
<html lang="es">
```

for Spanish.

---

## image-alt (critical)

**Original code:**
```html
<img src="./img/border_left_top.gif" width="10px" height="10px">
```

**Prompt sent:**
```
You are an accessibility expert.

Analyze the following HTML snippet for accessibility issues and suggest a fix.

HTML:
<img src="./img/border_left_top.gif" width="10px" height="10px">

Requirements:
1. Identify and explain the accessibility problem (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

### 1. Accessibility problem

The `<img>` element is missing an `alt` attribute:

```html
<img src="./img/border_left_top.gif" width="10px" height="10px">
```

This fails **WCAG 2.1 Success Criterion 1.1.1 — Non-text Content**.

All images must have a text alternative. If the image conveys information, the `alt` text should describe its meaning. If the image is purely decorative, it should have an empty `alt` attribute so assistive technologies can ignore it.

In this case, the filename `border_left_top.gif` suggests the image is decorative, likely used only for visual layout or styling.

---

### 2. Corrected code snippet

```html
<img src="./img/border_left_top.gif" width="10" height="10" alt="">
```

A better modern approach would be to avoid using an image for decoration and use CSS instead, but if the image remains in the HTML, it should have an empty `alt`.

---

### 3. Why the fix works

The empty `alt=""` tells screen readers that the image is decorative and should be skipped.

Without an `alt` attribute, some screen readers may announce the image filename, such as:

> “border left top dot gif”

That creates unnecessary noise for users of assistive technologies.

Also, the `width` and `height` attributes should use numeric values without `px`, because HTML image dimensions are interpreted as pixels by default.

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

Analyze the following HTML snippet for accessibility issues and suggest a fix.

HTML:
<select onchange="location.href = this.value;">
  <option value="./home.html">Home</option>
  <option value="./news.html">News</option>
  <option value="./tickets.html">Tickets</option>
</select>

Requirements:
1. Identify and explain the accessibility problem (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

### 1. Accessibility problem

The `<select>` automatically navigates to another page when its value changes:

```html
<select onchange="location.href = this.value;">
```

This is an accessibility issue under:

**WCAG 2.2 — 3.2.2 On Input**

> Changing the setting of a user interface component must not automatically cause a change of context unless the user has been advised of the behavior before using the component.

Selecting an option causes a page navigation, which is a **change of context**. This can be especially problematic for keyboard, screen reader, and switch-control users who may change the selected option while exploring the control, without intending to immediately navigate.

The `<select>` also has no accessible label, which makes its purpose unclear to screen reader users.

---

### 2. Corrected code snippet

```html
<form id="page-navigation">
  <label for="page-select">Choose a page</label>

  <select id="page-select" name="page">
    <option value="./home.html">Home</option>
    <option value="./news.html">News</option>
    <option value="./tickets.html">Tickets</option>
  </select>

  <button type="submit">Go</button>
</form>

<script>
  document.getElementById('page-navigation').addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedPage = document.getElementById('page-select').value;
    window.location.href = selectedPage;
  });
</script>
```

---

### 3. Why the fix works

The user can now change the selected option without being immediately redirected. Navigation only happens after the user explicitly activates the **Go** button.

This satisfies **WCAG 3.2.2 On Input** because changing the value of the `<select>` no longer automatically causes a change of context.

The added `<label>` also gives the `<select>` an accessible name, so assistive technologies can announce its purpose clearly, for example:

> “Choose a page, combo box”

---

## link-name (serious)

**Original code:**
```html
<a href="javascript:location.href='home.html';" onfocus="blur();"><img name="nav_home" src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0px"></a>
```

**Prompt sent:**
```
You are an accessibility expert.

Analyze the following HTML snippet for accessibility issues and suggest a fix.

HTML:
<a href="javascript:location.href='home.html';" onfocus="blur();"><img name="nav_home" src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0px"></a>

Requirements:
1. Identify and explain the accessibility problem (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

### 1. Accessibility problems

The snippet has several accessibility issues:

```html
<a href="javascript:location.href='home.html';" onfocus="blur();">
  <img name="nav_home" src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0px">
</a>
```

#### Problem 1: Image link has no alternative text  
The image is the only content inside the link, but it has no `alt` attribute. Screen reader users will not know what the link does.

- **WCAG 2.1 Success Criterion 1.1.1 — Non-text Content**
- **WCAG 2.1 Success Criterion 2.4.4 — Link Purpose In Context**

#### Problem 2: Keyboard focus is removed with `onfocus="blur();"`  
The `onfocus="blur();"` attribute forces the link to lose focus as soon as it receives it. This prevents keyboard users from navigating to or activating the link reliably.

- **WCAG 2.1 Success Criterion 2.1.1 — Keyboard**
- **WCAG 2.1 Success Criterion 2.4.7 — Focus Visible**

#### Problem 3: JavaScript is used instead of a real link URL  
Using `href="javascript:..."` is unnecessary and can cause problems for assistive technologies, browser features, and users who disable JavaScript.

A normal link should use the destination URL directly.

---

### 2. Corrected code snippet

```html
<a href="home.html">
  <img src="./img/nav_home.gif" width="88" height="27" alt="Home">
</a>
```

Optional CSS to preserve spacing and focus visibility:

```html
<style>
  .nav-link {
    margin-inline: 15px;
  }

  .nav-link:focus-visible {
    outline: 2px solid #005fcc;
    outline-offset: 2px;
  }

  .nav-link img {
    border: 0;
  }
</style>

<a class="nav-link" href="home.html">
  <img src="./img/nav_home.gif" width="88" height="27" alt="Home">
</a>
```

---

### 3. Why the fix works

- `alt="Home"` gives the image link an accessible name, so screen reader users hear something meaningful like “Home, link.”
- `href="home.html"` makes the anchor a proper HTML link that works without JavaScript.
- Removing `onfocus="blur();"` allows keyboard users to tab to the link, see focus, and activate it using Enter.
- The optional `:focus-visible` style ensures the keyboard focus indicator is clear and visible.

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

Analyze the following HTML snippet for accessibility issues and suggest a fix.

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
1. Identify and explain the accessibility problem (reference WCAG criterion number and name)
2. Provide the corrected code snippet
3. Explain why the fix works
```

**AI Response:**

## 1. Accessibility problem

The links contain only images, so the images’ `alt` text becomes the accessible link text.

Currently, the accessible link names are:

- “W3C logo”
- “Web Accessibility Initiative (WAI) logo”

These describe the images, but not clearly the purpose or destination of the links. For linked images, the `alt` text should describe the link’s function or destination, not the visual appearance of the image.

This relates to:

- **WCAG 2.4.4 — Link Purpose (In Context)**: The purpose of each link should be clear from the link text or its context.
- Also relevant: **WCAG 1.1.1 — Non-text Content**, because functional images need text alternatives that describe their function.

The `title` attributes should not be relied on to provide the accessible name because support is inconsistent, especially for keyboard, touch, and screen reader users.

---

## 2. Corrected code snippet

```html
<p id="logos">
  <a href="https://www.w3.org/">
    <img alt="W3C home" src="../img/w3c.png" height="48" width="72">
  </a>

  <a href="https://www.w3.org/WAI/">
    <img alt="Web Accessibility Initiative home" src="../img/wai.png" height="48">
  </a>
</p>
```

---

## 3. Why the fix works

The image `alt` text now describes the purpose of each link:

- “W3C home” tells users the link goes to the W3C homepage.
- “Web Accessibility Initiative home” tells users the link goes to the WAI homepage.

Because the images are the only content inside the links, their `alt` text becomes the accessible name of each link. Screen reader users will now hear meaningful link text that explains where each link goes.

Removing the `title` attributes also avoids relying on information that may not be available to all users.

---

