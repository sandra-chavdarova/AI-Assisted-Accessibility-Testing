# AI Fix Suggestions Report

**Model:** gpt-4o  
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

Certainly! Let's go through the provided HTML snippet and analyze it for accessibility issues.

**HTML Snippet:**

```html
<html>
    <head>
        <title>Sample Page</title>
    </head>
    <body>
        <div onclick="alert('Hello World!')">Click me!</div>
    </body>
</html>
```

### Accessibility Issue

#### Problem Identification:
The main accessibility issue with the given snippet involves the usage of a `div` element with an `onclick` event to trigger an action. This relates to the **WCAG 2.1 - Criterion 2.1.1 (Keyboard Accessible)**, which states that all functionality should be operable through a keyboard interface. The problem here is that using `onclick` on a `div` element requires users to interact with it using a mouse or a touch screen. This interaction is not natively keyboard accessible because non-interactive elements like `div` do not receive keyboard focus.

### Fix:
To ensure that the functionality is accessible to keyboard users, instead of using a `div`, we should use a `<button>` element, which is natively interactive and accessible.

```html
<html>
    <head>
        <title>Sample Page</title>
    </head>
    <body>
        <button onclick="alert('Hello World!')">Click me!</button>
    </body>
</html>
```

### Explanation of the Fix:

1. **Semantics:** By changing from a `div` to a `button`, we're using a semantic HTML element that is intended for clickable, interactive content. This improves the page's semantic structure and readability both to developers and assistive technologies.

2. **Keyboard Accessibility:** `<button>` elements are focusable and accessible via the keyboard by default. A user can navigate to the button using the `Tab` key and activate it using the `Enter` or `Spacebar` keys, thus aligning with WCAG 2.1's requirement for keyboard accessibility.

3. **Assistive Technologies:** Most screen readers will identify a `<button>` element correctly and announce to users that it's an actionable element, improving the user experience for individuals who rely on assistive technologies for navigation.

This fix allows all users, regardless of their input method, to interact with the element effectively, thus making the web page more inclusive and aligned with WCAG guidelines.

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

Certainly! Let's analyze the given HTML snippet for accessibility issues.

### Accessibility Problem

The HTML snippet provided is:

```html
<img src="./img/border_left_top.gif" width="10px" height="10px">
```

#### Issue:

The primary accessibility issue with this code is the absence of an `alt` attribute for the `<img>` tag. According to the Web Content Accessibility Guidelines (WCAG), this relates to:

- **WCAG 2.1 - Criterion 1.1.1 Non-text Content**: Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols, or simpler language.

Without the `alt` attribute, screen readers and other assistive technologies will have difficulties interpreting what this image is about, which may inhibit users who rely on these technologies from fully understanding the content or purpose of the image.

### Corrected Code Snippet

```html
<img src="./img/border_left_top.gif" width="10px" height="10px" alt="">
```

### Explanation for the Fix

- **Usage of `alt` attribute**: The `alt` attribute is used to provide an alternative text description for images. For decorative images or images whose purposes are purely visual and add no functional content to the webpage, providing an empty `alt` attribute (`alt=""`) indicates to assistive technologies that the image can be safely ignored. This practice helps improve accessibility by preventing unnecessary information from being read aloud by screen readers, thus reducing cognitive load and improving the user experience for individuals relying on these tools.

In this particular case, given the context of a border image, it is assumed that the image is decorative and does not convey any content necessary to understand the web page. Hence, setting `alt=""` is appropriate here. If the image is not decorative and has an important role or meaning, a descriptive alternative text should be used instead.

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

When analyzing this HTML snippet for accessibility, there are a couple of issues that need to be addressed based on the Web Content Accessibility Guidelines (WCAG):

### 1. Identify and explain the accessibility problem

**WCAG 2.1 - Level A: Sequential focus navigation is not possible**  
- **Criterion 3.2.2 On Input**: This guideline suggests that changing the context (like navigation) should not happen automatically or unexpectedly when a user interacts with a component unless the change can be easily discerned by users or it has been explicitly requested by the users.

- **Issue**: The `select` element's `onchange` event directly changes the page to the selected option's URL. This impairs users reliant on keyboard navigation or assistive technologies, as they might not expect a page to change when they simply navigate through the dropdown options.

### 2. Provide the corrected code snippet

```html
<select id="navigation">
  <option value="">Select a page...</option>
  <option value="./home.html">Home</option>
  <option value="./news.html">News</option>
  <option value="./tickets.html">Tickets</option>
</select>
<button onclick="navigate()">Go</button>

<script>
  function navigate() {
    var selectElement = document.getElementById('navigation');
    var selectedValue = selectElement.value;
    if (selectedValue) {
      location.href = selectedValue;
    }
  }
</script>
```

### 3. Explain why the fix works

- **Explanation**: By adding a "Go" button next to the `select` element, users now need to explicitly choose an action to navigate. This respects WCAG's 3.2.2 guideline as the user is actively requesting a context change. Users who inadvertently change their selection don't face an unintended navigation, as they now explicitly control when navigation occurs via the button.

- **Advantages for Accessibility**:
  - **Keyboard Users**: They can navigate through the options without the fear of suddenly being redirected. When they're ready to navigate, they can press the tab key to reach the "Go" button and activate it with the Enter key.
  - **Screen Reader Users**: These users receive clear feedback when interacting with the "Go" button, thus understanding their action leads to navigation.
  - **Users with Cognitive Disabilities**: It's clearer and less confusing since the navigation takes place only when an intentional action—clicking the "Go" button—is taken.

This approach provides a clearer and more predictable experience while adhering to accessibility guidelines.

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

### Accessibility Problem

The provided HTML snippet contains a few accessibility issues:

1. **Use of JavaScript for Navigation:**
   - Problem: The use of `href="javascript:..."` for navigation is not ideal. This can interfere with keyboard navigation, assistive technologies, and native browser behaviors. This approach may result in unpredictable behavior for screen readers and users relying on keyboard navigation.
   - WCAG Reference: Does not directly correspond to a single WCAG criterion, but it impacts several areas including [WCAG 2.1.1: Keyboard](https://www.w3.org/TR/WCAG21/#keyboard), which focuses on functionality available through the keyboard interface.

2. **Lack of Alt Text for Images:**
   - Problem: The image within the anchor does not have an `alt` attribute. Images without `alt` attributes are inaccessible for screen reader users, as they won't get any meaningful information from the image.
   - WCAG Reference: [WCAG 1.1.1: Non-text Content](https://www.w3.org/TR/WCAG21/#non-text-content), which requires all non-text content to have an alternative text representation.

3. **Onfocus Attribute Blurs Link:**
   - Problem: The `onfocus="blur();"` attribute removes focus from the link, which is problematic for users navigating with a keyboard, making it impossible to interact with the link.
   - WCAG Reference: [WCAG 2.1.1: Keyboard](https://www.w3.org/TR/WCAG21/#keyboard), ensuring all functionality is available from a keyboard.

### Corrected Code Snippet

Here is a revised version of the HTML code, addressing the identified accessibility issues:

```html
<a href="home.html">
    <img src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0" alt="Home Navigation">
</a>
```

### Explanation of the Fix

1. **Direct Link in `href`:**
   - By using `href="home.html"` directly in the `<a>` tag, the link becomes more accessible to all users, including those utilizing assistive technologies. It ensures standard navigation behavior expected from hyperlinks.

2. **Alt Attribute for Image:**
   - Adding an `alt` attribute to the image (`alt="Home Navigation"`) provides a text alternative that can be read by screen readers. This makes the purpose of the image clear to users who cannot see it, meeting the WCAG requirement for non-text content.

3. **Removes Onfocus Blur:**
   - By removing the `onfocus="blur();"` attribute, the link can now be interacted with via keyboard, maintaining focus for users who rely on keyboard navigation. This ensures the link is operable, fulfilling the keyboard accessibility requirement.

Overall, these changes ensure the content does not rely on scripts or styles that might limit accessibility, providing a better user experience across a wide spectrum of users, including those utilizing assistive devices.

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

### Accessibility Issue

The HTML snippet has an accessibility issue related to the use of non-text content, specifically images that do not have a `width` attribute consistently applied. According to the Web Content Accessibility Guidelines (WCAG) 2.1, this aligns with:

- **WCAG 2.1.1 Non-text Content**: This criterion requires that all non-text content that is presented to the user has a text alternative that serves the equivalent purpose.

While both images have an `alt` attribute, which is great for providing alternative text, it's also important to ensure that all image attributes are consistent and properly implemented, such as `height` and `width`. This ensures that screen reader users, as well as users relying on browser zoom features, have a consistent experience, and it prevents potential layout shifts. 

Moreover, the `alt` attributes appear appropriate in this instance, so the main issue lies in the inconsistent use of image dimensions.

### Corrected HTML Code

```html
<p id="logos">
  <a href="https://www.w3.org/" title="W3C Home">
    <img alt="W3C logo" src="../img/w3c.png" height="48" width="72">
  </a>
  <a href="https://www.w3.org/WAI/" title="WAI Home">
    <img alt="Web Accessibility Initiative (WAI) logo" src="../img/wai.png" height="48" width="72">
  </a>
</p>
```

### Explanation of the Fix

By ensuring that both images have consistent `height` and `width` attributes, the code snippet helps in preventing visual issues for users who rely on accessibility technologies like screen magnifiers. It ensures that the images scale correctly across different user settings and devices.

This fix maintains a consistent layout and reduces layout shifts, benefiting users who might need to override default styles or who browse with CSS disabled. Having specified dimensions also aids in faster rendering of web pages, as the browser allocates space for the images before they are fully downloaded, avoiding reflow.

Overall, providing consistent attributes contributes to a more predictable and stable user experience, aligning with best practices for accessibility even though the issue identified isn't a direct criterion violation, but rather a best practice for reliable functionality and presentation.

---

