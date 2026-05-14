# AI Fix Suggestions Report

**Model:** gpt-4o-mini  
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

### Accessibility Issue Analysis

**Problem Identification:**
The primary accessibility issue here is that the `<html>` element is missing a `lang` attribute. This is critical for assistive technologies, such as screen readers, because they rely on the `lang` attribute to understand the language of the content. If this attribute is not specified, the screen reader may use an incorrect pronunciation or text-to-speech synthesis, leading to potential confusion or misunderstanding for users.

**Reference to WCAG:**
This issue relates to the **Web Content Accessibility Guidelines (WCAG)**, specifically:
- **WCAG 3.1.1**: "Language of Page" - This guideline requires content authors to specify the language of the page's content using the `lang` attribute so that assistive technologies can provide appropriate rendering and pronunciation for users.

### Corrected Code Snippet

To correct the accessibility issue, you should specify the language of the content in the `lang` attribute in the `<html>` tag. Here’s an example where the language is set to English:

```html
<html lang="en">
```

If the primary language was, for example, French, it would be:

```html
<html lang="fr">
```

### Explanation of Why the Fix Works

By adding the `lang` attribute to the `<html>` element, you provide essential information to assistive technologies about the language in which the document is written. This allows:

1. **Correct Pronunciation**: Screen readers and other assistive technologies can pronounce text accurately according to the specified language, improving the user experience for people who rely on these tools.

2. **Proper Text-to-Speech Synthesis**: Different languages have unique phonetic rules and character pronunciations. Specifying the language ensures the correct synthesis of speech.

3. **Contextual Rendering**: Browsers and screen readers can also adjust other settings, such as voice settings or access to language-specific features, leading to a more coherent and accessible experience.

In summary, adding the `lang` attribute enhances the overall accessibility of the webpage, allowing users with disabilities to interact with the content in a meaningful and understandable manner.

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

### Accessibility Problem Analysis

The accessibility issue in the provided HTML code relates to the handling of a decorative image that is not meaningful to the content. According to the Web Content Accessibility Guidelines (WCAG), specifically:

- **WCAG 1.1.1 Non-text Content**: Images that are purely decorative should not be read by assistive technologies like screen readers. If a decorative image is given a descriptive alt text, it can create unnecessary auditory clutter for users of assistive technologies, ultimately hindering the accessibility of the webpage.

### Corrected Code Snippet

To ensure that the decorative image is ignored by assistive technologies, the `alt` attribute should be set to an empty string (`alt=""`). Additionally, you can also consider using `role="presentation"` or `role="img"` to explicitly indicate that the image has no impact on the user experience:

```html
<img src="./img/border_left_top.gif" width="10" height="10" alt="" role="presentation">
```

### Explanation of Why the Fix Works

- By setting `alt=""` (empty alt text), we inform screen readers that the image is decorative and should not be announced. This prevents confusion and ensures that users relying on assistive technologies are not interrupted by non-informational elements.
  
- The `role="presentation"` attribute (though it may be redundant with `alt=""`) further clarifies that the image is purely for layout purposes and does not convey any useful information. Some screen readers and assistive technologies interpret this role to enhance their handling of images without semantic meaning.
  
Ultimately, this fix effectively aligns with the WCAG criteria and enhances the overall user experience for individuals using assistive technologies by minimizing extraneous, non-essential information they need to process.

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

### Analysis of Accessibility Issue

1. **Accessibility Problem Identification**
   - **Lack of a Label**: The `<select>` element does not have an associated label, which means that screen readers will not be able to inform the user about its purpose. This violates **WCAG 2.1 Criterion 4.1.2 - Name, Role, Value**, which states that user interface components need to have labels that describe their function.
   - **Immediate Navigation on Selection**: The `onchange` event triggers the navigation immediately when a selection is made. This is a usability issue for keyboard users who might want to browse the options with arrow keys. If they press the arrow key and inadvertently change the selection, they are taken to another page before they can confirm their choice, which violates **WCAG 2.1 Criterion 3.2.2 - On Input**, which states that changes of context should only occur on user-initiated actions, such as pressing a button to submit.

### Corrected Code Snippet

```html
<label for="navigation">Navigate to:</label>
<select id="navigation" onchange="navigateToPage()">
  <option value="">--Select an option--</option>
  <option value="./home.html">Home</option>
  <option value="./news.html">News</option>
  <option value="./tickets.html">Tickets</option>
</select>

<script>
  function navigateToPage() {
    var selectElement = document.getElementById('navigation');
    if (selectElement.value) {
      window.location.href = selectElement.value;
    }
  }
</script>
```

### Explanation of Why the Fix Works

1. **Adding a Label**: By adding an associated `<label>` element with the `for` attribute linked to the `id` of the `<select>` element, we fulfill the WCAG requirement for user interface components to be properly labeled. This allows screen reader users to understand the purpose of the dropdown.

2. **Separate Navigation Function**: The navigation logic is moved to a separate JavaScript function (`navigateToPage()`), which only executes the page redirection if a valid option is selected. There’s now an option prompt (`--Select an option--`) that is non-navigational (value="") to prompt users to make a choice. This change prevents immediate navigation when the user is still cycling through options, giving them time to confirm their selection without accidentally navigating away before they make a final choice. This adheres to the rule of changing context only upon user confirmation, thus improving accessibility for keyboard users.

Overall, these changes enhance the usability and accessibility of the navigation select element for all users, including those with disabilities.

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

### Accessibility Problem Analysis

1. **Missing Alt Attribute**: The `<img>` element within the anchor tag does not have an `alt` attribute. According to the Web Content Accessibility Guidelines (WCAG) 2.1, specifically Criterion 1.1.1 (Non-text Content), all non-text content (like images) must have a text alternative that serves the equivalent purpose. Without an `alt` attribute, screen readers cannot convey the link's purpose to users who rely on them, resulting in a lack of understanding regarding the link's function.

2. **Improper Use of onFocus**: The `onfocus='blur()'` technique removes keyboard focus from the anchor element as soon as it receives focus. This violates WCAG Criterion 2.4.3 (Focus Order), which states that the focus order must be logical and the user must be able to navigate to all interactive elements on the page. This setup renders the link completely unreachable for keyboard-only users, as they cannot activate the link by pressing the Enter key.

3. **Non-standard href Attribute**: Using `href="javascript:location.href='home.html';"` is problematic for several reasons. This approach breaks WCAG Criterion 2.4.4 (Link Purpose – In Context), as it does not provide a clear and direct URL for the link destination. It disrupts the browser's ability to manage history, does not allow users to right-click and open the link in a new tab or window, and can also confuse assistive technologies about the functionality of the link.

### Corrected Code Snippet

Here’s a corrected version of the original code:

```html
<a href="home.html" tabindex="0">
    <img name="nav_home" src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0" alt="Home">
</a>
```

### Explanation of the Fix

1. **Adding the `alt` Attribute**: By adding `alt="Home"` to the `<img>` tag, we ensure that screen readers can convey the purpose of the link to users. This meets WCAG Criterion 1.1.1, as it provides a text alternative that effectively describes what the link does.

2. **Removing onFocus Attribute**: The removal of the `onfocus="blur();"` attribute allows keyboard users to focus on the link and activate it without interruption. This complies with WCAG Criterion 2.4.3, providing a logical navigation flow where users can operate on interactive elements without losing focus unexpectedly.

3. **Using a Standard URL**: Changing `href="javascript:location.href='home.html';"` to `href="home.html"` provides a proper URL. This complies with WCAG Criterion 2.4.4 by ensuring the link has a clear and accessible destination. It allows users to leverage standard browser functionalities, including navigating back and forth, right-clicking to open in new tabs, and understanding the link's purpose contextually.

Overall, these changes promote better accessibility for all users, enhance usability for keyboard navigation, and present a clear linkage structure in line with best practices.

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

### Accessibility Problem Confirmation

The primary accessibility issue in the provided HTML is that the paragraph containing the logo images isn't wrapped in any semantic landmark region, such as `<header>`, `<nav>`, `<main>`, or `<footer>`. This leads to two main problems:

1. **Landmark Navigation**: Screen reader users can navigate a webpage using landmark roles. By not having this paragraph wrapped in a defined landmark region, screen reader users may skip over it entirely because it lacks a recognizable structure that they can navigate to.
   
2. **Content Structure**: According to **WCAG 2.4.1 - Bypass Blocks**, web content should be organized in a way that allows users to bypass repetitive content and navigate more efficiently. Well-defined landmarks help achieve this by allowing users to jump to specific parts of the page.

### Corrected Code Snippet

To resolve the issue, we can wrap the paragraph in a `<nav>` element, as it contains navigation-related links. This approach assumes that the logos serve as navigation to the respective homepages.

```html
<nav aria-label="Site Navigation">
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

### Explanation of Why the Fix Works

1. **Landmark Structure**: By wrapping the logos in a `<nav>` element, we provide screen reader users a landmark that they can navigate to. This tells users, “Here is a section of the webpage designated for navigation,” making the content accessible.

2. **Descriptive Landmarks**: The use of `aria-label` within the `<nav>` element describes the purpose of this navigation section. It ensures that even if the user is unfamiliar with the content, the context is clear.

3. **Compliance with WCAG**: This fix helps comply with WCAG guidelines by organizing the content semantically and making it easier for assistive technology users to find and interact with the navigation links, effectively addressing the WCAG 2.4.1 - Bypass Blocks requirement.

---

