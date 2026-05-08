# AI Fix Suggestions Report

**Source:** selected-issues.json  
**Date:** 2026-05-07  

---

## html-has-lang (serious)

**Description:** Ensure every HTML document has a lang attribute  

**Original code:**
```html
<html>
```

**AI Analysis:**

1. **Accessibility Problem & WCAG Reference:**

The accessibility issue here is the absence of a `lang` attribute in the HTML document. This is a problem because screen readers and other assistive technologies rely on the `lang` attribute to determine the language of the content. Knowing the language helps these tools to correctly pronounce words and interpret the text layout, enhancing the user experience for people with disabilities, especially those who rely on text-to-speech technologies. This issue is referenced in the WCAG (Web Content Accessibility Guidelines) under Criterion 3.1.1 - "Language of Page." This criterion is part of the guidelines that ensure content is accessible and understandable for a diverse audience, including those with visual and cognitive impairments.

2. **Corrected Code Snippet:**

```html
<html lang="en">
```

3. **Explanation of the Fix:**

Adding the `lang` attribute with a valid language code (such as "en" for English) to the HTML element informs assistive technologies about the primary language used in the document. This allows screen readers to apply correct pronunciation rules and enables the use of language-specific features, such as different text orders or speech synthesizers appropriate to that language. By specifying the document's language, users who depend on these technologies will have a better and more consistent experience, ultimately making the webpage more accessible. The fix improves accessibility by directly addressing WCAG Criterion 3.1.1 and ensuring that technology can appropriately interact with the content from the start.

---

## image-alt (critical)

**Description:** Ensure `<img>` elements have alternative text or a role of none or presentation  

**Original code:**
```html
<img src="./img/border_left_top.gif" width="10px" height="10px">
```

**AI Analysis:**

1. **Accessibility Problem Explanation:**

The accessibility issue here is that the `<img>` element does not have an alternative text or an appropriate role attribute defined. This is an accessibility concern as per the Web Content Accessibility Guidelines (WCAG) 2.1, specifically under the criterion **1.1.1 Non-text Content**. This criterion requires that all non-text content, like images, should have a text alternative that serves the equivalent purpose, except in specific cases such as when the image is purely decorative.

An image lacking alternative text will cause problems for users who rely on screen readers or other assistive technologies because these users will not be able to perceive the information or purpose conveyed by the image.

2. **Corrected Code Snippet:**

```html
<img src="./img/border_left_top.gif" width="10px" height="10px" alt="Left border of the image">
```

3. **Explanation of the Fix:**

  Adding a descriptive `alt` attribute provides a textual alternative that conveys the equivalent meaning of the image content to users who use screen readers. This ensures that all users have access to the same information, fulfilling the requirements of WCAG 1.1.1.

---

## select-name (critical)

**Description:** Ensure select element has an accessible name  

**Original code:**
```html
<select onchange="location.href = this.value;">
  <option value="./home.html">Home</option>
  <option value="./news.html">News</option>
  <option value="./tickets.html">Tickets</option>
</select>
```

**AI Analysis:**

### Accessibility Problem

#### Issue Identification:
The select element in the provided HTML code does not have an accessible name. An accessible name helps assistive technologies, like screen readers, communicate the purpose of the control to users who rely on these technologies.

#### Why This is an Accessibility Problem:
According to the Web Content Accessibility Guidelines (WCAG) 2.1, this scenario falls under the criterion **1.3.1 Info and Relationships** and **4.1.2 Name, Role, Value**. These guidelines emphasize that all user interface components should have programmatically determinable names. Without an accessible name, such elements may be confusing or unusable for users who rely on assistive technologies, as the purpose of the select element becomes unclear.

### Corrected Code Snippet

```html
<label for="navigation-select">Navigate to:</label>
<select id="navigation-select" onchange="location.href = this.value;">
  <option value="./home.html">Home</option>
  <option value="./news.html">News</option>
  <option value="./tickets.html">Tickets</option>
</select>
```

### Explanation of the Fix

#### What Was Done:
1. **Label Association**: A `<label>` element is added with the text "Navigate to:", and its `for` attribute is linked to the `id` of the select element using the same unique identifier, `navigation-select`.

#### Why the Fix Works:
- **Programmatically Associated Label**: By incorporating a `<label>` and associating it with the select element through the `id` and `for` attributes, screen readers and other assistive technologies can now announce what the select element is for. 
- **Accessible Name Provided**: The text within the `<label>` provides a clear, accessible name to the select element, improving the user experience for those who rely on screen readers.

This fix ensures compliance with accessibility standards, improving navigation and usability for all users, especially those with disabilities.

---

## link-name (serious)

**Description:** Ensure links have discernible text  

**Original code:**
```html
<a href="javascript:location.href='home.html';" onfocus="blur();"><img name="nav_home" src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0px"></a>
```

**AI Analysis:**

### 1. Accessibility Problem

The provided HTML code contains an accessibility issue where a link does not have discernible text. According to the Web Content Accessibility Guidelines (WCAG) 2.1, this issue violates **Criterion 2.4.4: Link Purpose (In Context)**, which states that the purpose of each link should be identifiable from the link text alone or the link text together with its context. Links without discernible text are problematic for users who rely on screen readers, as the purpose of the link is not announced, leaving them with no useful information about where the link will navigate them.

### 2. Corrected Code Snippet

To fix the issue, provide an alternative text description for the image within the `<img>` tag by using the `alt` attribute, such that it conveys the purpose of the link.

```html
<a href="javascript:location.href='home.html';" onfocus="blur();"><img name="nav_home" src="./img/nav_home.gif" width="88" height="27" hspace="15" border="0" alt="Home"></a>
```

### 3. Explanation of the Fix

- **Addition of `alt` Attribute**: The `alt` attribute is added to the `<img>` element with the value "Home." This provides a textual alternative to the image, which is read by screen readers, allowing users to understand the purpose of the link.

- **Complying with WCAG**: By adding discernible text through the `alt` attribute, the link is now compliant with WCAG 2.1 Criterion 2.4.4, ensuring that the link purpose is discernible both visually and by users utilizing assistive technologies, such as screen readers.

---

## region (moderate)

**Description:** Ensure all page content is contained by landmarks  

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

**AI Analysis:**

### Issue Analysis

1. **Accessibility Problem:**

   The issue here is that the content (logos) is not contained within an appropriate HTML5 landmark element. According to the Web Content Accessibility Guidelines (WCAG) 2.1, the relevant success criterion is **1.3.1 Info and Relationships**. This criterion emphasizes that information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.

   Landmark regions help users, especially those using assistive technologies like screen readers, to navigate a webpage more efficiently. Without appropriate landmarks, users may have difficulty understanding the structure of the page and may not be able to navigate effectively to or from important content areas.

2. **Corrected Code Snippet:**

   ```html
   <header role="banner">
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

3. **Why the Fix Works:**

   By enclosing the `<p>` element containing the logos within a `<header>` element and assigning it the role of `banner`, we transform this part of the page into a landmark region. The `<header>` element semantically indicates a region that typically contains introductory content or navigational links, and is often used for logo placement.

   This fix improves accessibility by:
   - Allowing assistive technology users to quickly identify and navigate to this particular section on the page via the header landmark.
   - Enhancing the document structure by clearly indicating through the use of landmarks that this is a significant, recurring section (likely present on other pages within the same site).
   - Improving content separation, which aids in both navigation and understanding of the page organization for users employing screen readers.

In sum, ensuring that such content is enclosed in appropriate landmark elements aids accessibility by providing a clear and consistent navigation experience across the webpage.

---

