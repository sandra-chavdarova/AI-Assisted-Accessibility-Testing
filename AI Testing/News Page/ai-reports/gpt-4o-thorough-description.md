# AI Fix Suggestions Report

**Model:** gpt-4o  
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

1. **Accessibility Problem Confirmation and Explanation:**

The accessibility problem in this scenario is the absence of the `lang` attribute on the `<html>` element. This is crucial because the `lang` attribute specifies the primary language of the webpage content, which is essential for assistive technologies such as screen readers to read the content correctly. Without this attribute, screen readers might not pronounce words correctly, and browsers may not render content appropriately according to language-specific rules.

- **WCAG Criterion Reference:** This issue is related to WCAG 2.1, Guideline 3.1 "Readable," specifically Success Criterion 3.1.1 "Language of Page." This criterion requires the primary language of the page to be programmatically determined to assist users who rely on screen readers or other assistive technologies.

2. **Corrected Code Snippet:**

```html
<html lang="en">
```

3. **Explanation of Why the Fix Works:**

The fix involves adding a `lang` attribute to the `<html>` element with an appropriate language code, such as `"en"` for English. By specifying `lang="en"`, you provide assistive technologies the information needed to interpret and present the text according to the correct language rules. This enables screen readers to use the correct pronunciation rules and helps browsers apply the right language-specific typographic standards and styles. Consequently, this enhances the page's accessibility and usability for users with various disabilities, such as visual impairments or reading challenges.

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

### Analysis of the Accessibility Issue

1. **Accessibility Problem:**
   - The issue here is that a decorative image is not marked properly to be ignored by assistive technologies like screen readers. According to the Web Content Accessibility Guidelines (WCAG) 2.1, a decorative image that does not add meaning or information should be hidden from assistive technologies. This aligns with WCAG criterion **1.1.1 Non-text Content**. The criterion states that “All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for...” and further notes that decorative images should be marked so they can be ignored by assistive technologies.

2. **Corrected Code Snippet:**

```html
<img src="./img/border_left_top.gif" width="10px" height="10px" alt="" aria-hidden="true">
```

3. **Explanation of Fix:**
   - **`alt=""`:** By providing an empty string (`""`) for the `alt` attribute, you effectively tell screen readers to skip this image, as it does not hold any content that needs to be conveyed to the user.
   - **`aria-hidden="true"`:** Adding `aria-hidden="true"` further ensures that the image is completely ignored by all assistive technologies. It’s a belt-and-braces approach — ensuring maximum compatibility and understanding across various assistive technology implementations.
   - Together, these attributes ensure that users who rely on screen readers, as well as other assistive technologies, do not have to listen to or interact with unnecessary content, providing a cleaner and more accessible experience. This meets the WCAG 2.1 requirements by correctly implementing the criteria laid out for non-text content without meaningful information.

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

### Identified Accessibility Problem

The navigation select element has two main accessibility issues:

1. **Missing Label**: Screen reader users cannot discern the purpose of the select menu because it lacks an associated label. This violates [WCAG 2.1 Criterion 2.4.6 - Headings and Labels](https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels), which requires that headings and labels describe the topic or purpose.

2. **Unexpected Page Navigation**: The use of `onchange` for immediate navigation when a selection is made causes a problematic experience for keyboard users. This happens because the browser triggers the `onchange` event when users navigate options using arrow keys, leading to premature navigation. This behavior violates [WCAG 2.1 Criterion 3.2.2 - On Input](https://www.w3.org/WAI/WCAG21/Understanding/on-input), which mandates that changes of context (like page navigation) should not occur unexpectedly when a user changes an input setting without their confirmation.

### Corrected Code Snippet

```html
<!-- Added a label for the select element -->
<label for="navigation-select">Navigate to:</label>
<select id="navigation-select">
  <option value="">--Select a page--</option>
  <option value="./home.html">Home</option>
  <option value="./news.html">News</option>
  <option value="./tickets.html">Tickets</option>
</select>
<button id="navigate-button" type="button">Go</button>

<script>
document.getElementById('navigate-button').addEventListener('click', function() {
  const select = document.getElementById('navigation-select');
  const url = select.value;
  if (url) {
    location.href = url;
  }
});
</script>
```

### Explanation of the Fix

1. **Label Association**: A `<label>` element is associated with the `<select>` by using the `for` and `id` attributes to provide a clear context of the select menu's purpose. This helps screen readers announce the function of the dropdown, improving accessibility by meeting the criteria laid out in WCAG 2.4.6.

2. **Button for Explicit User Action**: Removing the `onchange` attribute from the `<select>` element prevents immediate navigation. Instead, a separate `<button>` element is used to trigger navigation. Users must now explicitly select an option and then click the "Go" button to navigate. This prevents unintentional context changes when users browse options with keyboard navigation, adhering to WCAG 3.2.2, ensuring that input changes do not cause unexpected changes in context. This is crucial for both keyboard-only and screen reader users, as it gives them control over when the navigation occurs.

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

The navigational link in the provided HTML contains several accessibility issues that contravene the guidelines set by the Web Content Accessibility Guidelines (WCAG):

1. **Missing Alt Attribute**: The image lacks an `alt` attribute that would allow screen readers to announce the link's purpose, violating **WCAG 2.1.1 - Non-text Content**. This criterion requires that all non-text content have a text alternative that serves the equivalent purpose.

2. **Removes Keyboard Focus**: The `onfocus='blur()'` attribute programmatically removes keyboard focus when the link is reached, directly contravening **WCAG 2.1.1 - Keyboard**. This impacts users who rely on keyboards for navigation, making elements unreachable and non-functional.

3. **Non-standard URL Handling**: Using `href="javascript:location.href='home.html';"` breaks typical browser interactions such as the use of the back button, and assistive technology like screen readers may not handle such JavaScript-based redirects well. This points to issues with **WCAG 2.4.4 - Link Purpose (In Context)**, which specifies that users should have an understanding of links' purposes.

### Corrected Code Snippet

```html
<a href="home.html">
  <img src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0" alt="Home">
</a>
```

### Explanation of the Fix

1. **Added Alt Attribute**: The `alt="Home"` attribute provides a text alternative for the image. This resolves the first issue by offering a description that screen readers can use to communicate the link's purpose to users, fulfilling the requirements of WCAG 2.1.1 - Non-text Content.

2. **Removed `onfocus` Event**: By removing `onfocus="blur();"`, the element can now gain keyboard focus, making it accessible to users navigating with a keyboard, thus conforming to WCAG 2.1.1 - Keyboard Requirement. This fix ensures the link can be accessed by pressing the Tab key, which is a common method of navigation for users with disabilities.

3. **Replaced `javascript:` URL**: Using a standard href value such as `href="home.html"` instead of `href="javascript:location.href='home.html';"` allows for normal browser behavior, including history tracking, opening in a new tab, and proper screen reading, aligning with WCAG 2.4.4 - Link Purpose (In Context). This helps improve the usability and accessibility of the link for all users, especially those using assistive technologies.

In summary, these fixes ensure compliance with relevant WCAG criteria by offering accessible navigation, making the element accessible via keyboard, and allowing better handling by assistive technology.

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

1. **Accessibility Problem and Explanation:**

   The accessibility issue here is that the HTML paragraph containing the logo links is not accessible via landmarks, which can be problematic for screen reader users who rely on landmark navigation. This relates to the WCAG 2.1 criterion 1.3.1 (Info and Relationships) and also relates to WCAG 2.4.1 (Bypass Blocks). 

   - **WCAG 2.1 - 1.3.1 Info and Relationships**: This criterion mandates that information, structure, and relationships conveyed through presentation can be determined programmatically or are available in text. In this context, enclosing relevant content in semantic landmark elements like `<header>`, `<footer>`, `<main>`, or `<nav>` helps ensure that the relationship of the content is clear and programmatically determinable.
   
   - **WCAG 2.4.1 Bypass Blocks**: This guideline emphasizes providing mechanisms to allow users to bypass blocks of content that are repeated on multiple webpages. Landmarks are vital for this navigation technique.

   Since the paragraph is an isolated piece of content significant enough to be perceived as page navigation (functions like 'home' links), it should be included within a landmark region so that screen reader users can easily locate and navigate to it.

2. **Corrected Code Snippet:**

   ```html
   <nav aria-labelledby="logos">
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

3. **Explanation of the Fix:**

   Wrapping the `<p id="logos">` element with a `<nav>` landmark effectively groups these related links into a navigational region. The `aria-labelledby="logos"` attribute ensures that screen readers announce this block as a navigation region with a label derived from the `id` of the enclosed `<p>`, providing semantic meaning and clarity. This way, users who navigate by landmarks can efficiently locate and activate these home links, thus improving accessibility and compliance with WCAG guidelines by defining a recognizable and programmatically determinable structural relationship for assistive technologies.

---

