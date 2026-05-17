## Accessibility review: W3C BAD “Tickets” page  
URL: `https://www.w3.org/WAI/demos/bad/before/tickets.html`

This page is part of the W3C Before and After Demonstration and is intentionally designed with accessibility barriers. The following review focuses on likely issues on the “before” tickets page and practical ways to improve it.

---

# Summary of key issues

The page presents several barriers for users of screen readers, keyboard-only users, users with low vision, users with cognitive disabilities, and users who rely on clear form instructions. Major problems include:

- Poor semantic structure
- Missing or inadequate form labels
- Weak keyboard navigation support
- Inaccessible navigation
- Insufficient table semantics
- Images and visual styling used in ways that are not accessible
- Missing heading structure
- Poor screen reader support for forms and page regions

---

# Detailed accessibility issues and fixes

## 1. Missing or weak semantic page structure

### Problem  
The page appears to rely heavily on layout tables, images, and visual styling rather than semantic HTML elements such as:

```html
<header>
<nav>
<main>
<section>
<footer>
```

The main content area, navigation area, and page sections are not clearly identified programmatically.

### Why this is problematic  
Screen reader users and users of assistive technologies rely on semantic structure to understand the purpose of different parts of the page and move efficiently between them. Without landmarks and semantic regions, users may need to listen through large amounts of repeated or irrelevant content.

### Related WCAG  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 2.4.1 — Bypass Blocks**
- **WCAG 2.4.6 — Headings and Labels**

### Recommended fix  
Use semantic landmarks and meaningful structure.

```html
<header>
  <a href="/" class="site-logo">Citylights</a>
</header>

<nav aria-label="Primary navigation">
  <ul>
    <li><a href="home.html">Home</a></li>
    <li><a href="news.html">News</a></li>
    <li><a href="tickets.html" aria-current="page">Tickets</a></li>
    <li><a href="survey.html">Survey</a></li>
  </ul>
</nav>

<main id="main">
  <h1>Tickets</h1>
  <!-- Ticket content and form -->
</main>

<footer>
  <!-- Footer content -->
</footer>
```

### How this improves accessibility  
Screen reader users can navigate by landmarks and headings. Keyboard users and assistive technology users can more easily locate the main content, navigation, and current page.

---

## 2. No “skip to main content” link

### Problem  
The page likely requires keyboard and screen reader users to move through the full header and navigation before reaching the main ticket content.

### Why this is problematic  
Repeated navigation is inefficient for keyboard-only users and screen reader users, especially across multiple pages.

### Related WCAG  
- **WCAG 2.4.1 — Bypass Blocks**

### Recommended fix  
Add a visible-on-focus skip link near the top of the page.

```html
<a href="#main" class="skip-link">Skip to main content</a>

<main id="main">
  <h1>Tickets</h1>
</main>
```

Example CSS:

```css
.skip-link {
  position: absolute;
  left: -999px;
  top: 0;
  background: #fff;
  color: #000;
  padding: 0.5rem 1rem;
  z-index: 1000;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
}
```

### How this improves accessibility  
Keyboard users can bypass repetitive navigation and jump directly to the ticket information or booking form.

---

## 3. Inaccessible navigation

### Problem  
The navigation may be visually presented but not marked up as a proper list or navigation region. The active page may only be indicated visually.

### Why this is problematic  
Screen reader users may not understand that the links form the main navigation. Users may also not know which page they are currently on.

### Related WCAG  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 2.4.4 — Link Purpose**
- **WCAG 2.4.8 — Location**

### Recommended fix  
Use a `<nav>` element, an unordered list, and `aria-current="page"` for the current page.

```html
<nav aria-label="Primary">
  <ul>
    <li><a href="home.html">Home</a></li>
    <li><a href="news.html">News</a></li>
    <li><a href="tickets.html" aria-current="page">Tickets</a></li>
    <li><a href="survey.html">Survey</a></li>
  </ul>
</nav>
```

### How this improves accessibility  
Assistive technologies can identify the navigation region, and users can understand their current location within the site.

---

## 4. Poor heading structure

### Problem  
The page may use styled text, images, or table cells to visually create headings instead of real heading elements such as `<h1>`, `<h2>`, and `<h3>`.

### Why this is problematic  
Screen reader users often navigate by heading. If headings are not marked up correctly, the page becomes much harder to scan and understand.

### Related WCAG  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 2.4.6 — Headings and Labels**

### Recommended fix  
Use a logical heading hierarchy.

```html
<main id="main">
  <h1>Tickets</h1>

  <section>
    <h2>Ticket prices</h2>
    <!-- price information -->
  </section>

  <section>
    <h2>Book tickets</h2>
    <!-- booking form -->
  </section>
</main>
```

### How this improves accessibility  
Users can quickly understand the structure of the page and jump to the relevant section.

---

## 5. Images without appropriate alternative text

### Problem  
The page likely uses images for branding, navigation, decorative content, or text. Some images may have missing, empty, or unhelpful `alt` text.

Examples of problematic alt text include:

```html
<img src="tickets.gif">
<img src="button.gif" alt="button">
<img src="spacer.gif" alt="spacer">
```

### Why this is problematic  
Screen reader users may miss important content or hear meaningless file names and decorative details.

### Related WCAG  
- **WCAG 1.1.1 — Non-text Content**
- **WCAG 1.4.5 — Images of Text**

### Recommended fix  
Provide meaningful alternative text for informative images and empty alt text for decorative images.

```html
<img src="citylights-logo.png" alt="Citylights">

<img src="decorative-line.png" alt="" role="presentation">
```

If an image is used as a link, the `alt` text should describe the link destination or action.

```html
<a href="tickets.html">
  <img src="tickets-button.png" alt="Tickets">
</a>
```

Better still, avoid images of text and use real HTML text styled with CSS.

```html
<a href="tickets.html" class="nav-link">Tickets</a>
```

### How this improves accessibility  
Screen reader users receive the same information that sighted users receive visually. Users with low vision can also resize real text more easily than text embedded in images.

---

## 6. Form controls may not have properly associated labels

### Problem  
The ticket form likely includes fields such as name, email, ticket quantity, date, or ticket type. These controls may be visually labeled but not programmatically associated with their labels.

Problematic example:

```html
Name:
<input type="text" name="name">
```

### Why this is problematic  
Screen reader users may hear only “edit text” without knowing what information is required. Voice control users may also have difficulty targeting fields by name.

### Related WCAG  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 3.3.2 — Labels or Instructions**
- **WCAG 4.1.2 — Name, Role, Value**

### Recommended fix  
Use explicit `<label>` elements connected to form controls with `for` and `id`.

```html
<label for="customer-name">Name</label>
<input id="customer-name" name="customer-name" type="text" autocomplete="name">

<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email">
```

### How this improves accessibility  
Screen readers announce the purpose of each input. Users can also click the label to focus the field, improving usability for people with motor disabilities.

---

## 7. Related form controls are not grouped

### Problem  
Ticket options, payment options, or delivery methods may be presented as groups of radio buttons or checkboxes without a shared programmatic group label.

### Why this is problematic  
A screen reader user may hear individual options but not understand the question they relate to.

### Related WCAG  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 3.3.2 — Labels or Instructions**

### Recommended fix  
Use `<fieldset>` and `<legend>` for related controls.

```html
<fieldset>
  <legend>Select ticket type</legend>

  <div>
    <input type="radio" id="adult" name="ticket-type" value="adult">
    <label for="adult">Adult ticket</label>
  </div>

  <div>
    <input type="radio" id="child" name="ticket-type" value="child">
    <label for="child">Child ticket</label>
  </div>

  <div>
    <input type="radio" id="senior" name="ticket-type" value="senior">
    <label for="senior">Senior ticket</label>
  </div>
</fieldset>
```

### How this improves accessibility  
Screen reader users hear the group question and each available option, making the form easier to understand and complete.

---

## 8. Required fields and errors may not be clearly identified

### Problem  
Required fields may be indicated only visually, for example by color or an asterisk without explanation. Error messages may not be programmatically connected to the related form fields.

### Why this is problematic  
Users who cannot perceive color, screen reader users, and users with cognitive disabilities may not understand which fields are required or how to correct errors.

### Related WCAG  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 1.4.1 — Use of Color**
- **WCAG 3.3.1 — Error Identification**
- **WCAG 3.3.2 — Labels or Instructions**
- **WCAG 3.3.3 — Error Suggestion**
- **WCAG 4.1.3 — Status Messages**

### Recommended fix  
Clearly identify required fields in text and connect error messages using `aria-describedby`.

```html
<p>Fields marked “required” must be completed.</p>

<label for="email">
  Email address <span aria-hidden="true">*</span>
</label>
<input
  id="email"
  name="email"
  type="email"
  required
  aria-describedby="email-error">

<p id="email-error" class="error">
  Enter a valid email address, for example name@example.com.
</p>
```

If errors appear after submission, place a summary at the top of the form.

```html
<div role="alert" class="error-summary">
  <h2>There is a problem with your submission</h2>
  <ul>
    <li><a href="#email">Enter a valid email address.</a></li>
  </ul>
</div>
```

### How this improves accessibility  
Users receive clear, programmatically available feedback and can quickly locate and fix errors.

---

## 9. Submit buttons or image buttons may not have accessible names

### Problem  
If the page uses image-based buttons, icon-only buttons, or JavaScript-triggered controls without accessible text, users of screen readers may not know what the button does.

Problematic example:

```html
<input type="image" src="submit.gif">
```

### Why this is problematic  
Controls must expose a clear name, role, and value to assistive technologies.

### Related WCAG  
- **WCAG 4.1.2 — Name, Role, Value**
- **WCAG 2.4.6 — Headings and Labels**

### Recommended fix  
Use a native button with clear text.

```html
<button type="submit">Book tickets</button>
```

If an image button must be used, provide meaningful alternative text.

```html
<input type="image" src="book-now.png" alt="Book tickets">
```

### How this improves accessibility  
Screen reader users understand the action before activating the control.

---

## 10. Possible keyboard accessibility problems

### Problem  
Interactive elements may depend on mouse interaction, JavaScript events such as `onclick`, or non-focusable elements such as `<span>` or `<div>` used as controls.

Problematic example:

```html
<img src="submit.gif" onclick="submitForm()">
```

### Why this is problematic  
Keyboard-only users may be unable to reach or activate controls. This affects users with motor disabilities, screen reader users, and power users who navigate without a mouse.

### Related WCAG  
- **WCAG 2.1.1 — Keyboard**
- **WCAG 2.1.2 — No Keyboard Trap**
- **WCAG 2.4.3 — Focus Order**
- **WCAG 2.4.7 — Focus Visible**

### Recommended fix  
Use native interactive elements such as links and buttons.

```html
<button type="button" onclick="submitForm()">Submit</button>
```

Ensure all focusable elements have visible focus styles.

```css
a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}
```

### How this improves accessibility  
Native controls are keyboard accessible by default and expose correct roles to assistive technologies.

---

## 11. Focus order may not match the visual order

### Problem  
If the page uses layout tables, positioned elements, or positive `tabindex` values, the keyboard tab order may not follow the visible reading order.

### Why this is problematic  
Keyboard users may become disoriented if focus jumps unpredictably around the page.

### Related WCAG  
- **WCAG 2.4.3 — Focus Order**
- **WCAG 1.3.2 — Meaningful Sequence**

### Recommended fix  
Keep DOM order aligned with the visual order. Avoid positive `tabindex` values.

Problematic:

```html
<input tabindex="5">
<input tabindex="1">
<input tabindex="3">
```

Better:

```html
<input id="name">
<input id="email">
<input id="ticket-quantity">
```

Use CSS layout rather than manipulating tab order.

### How this improves accessibility  
Users encounter content and controls in a predictable sequence.

---

## 12. Tables may lack proper headers and captions

### Problem  
The tickets page may present ticket prices, seating information, or event schedules in tables without proper table headers, captions, or scope attributes.

Problematic example:

```html
<table>
  <tr>
    <td>Adult</td>
    <td>$20</td>
  </tr>
  <tr>
    <td>Child</td>
    <td>$10</td>
  </tr>
</table>
```

### Why this is problematic  
Screen reader users need table headers to understand the relationship between cells, especially in pricing or schedule tables.

### Related WCAG  
- **WCAG 1.3.1 — Info and Relationships**

### Recommended fix  
Use semantic table markup.

```html
<table>
  <caption>Ticket prices</caption>
  <thead>
    <tr>
      <th scope="col">Ticket type</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Adult</th>
      <td>$20</td>
    </tr>
    <tr>
      <th scope="row">Child</th>
      <td>$10</td>
    </tr>
  </tbody>
</table>
```

### How this improves accessibility  
Screen readers can announce row and column relationships, helping users understand pricing and options.

---

## 13. Layout tables may create confusing reading order

### Problem  
The page likely uses tables for layout rather than data. This can cause screen readers to announce unnecessary table information and may produce a confusing reading order.

### Why this is problematic  
Users may hear “table with X rows and Y columns” for content that is not actually tabular. This adds noise and can make the page harder to understand.

### Related WCAG  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 1.3.2 — Meaningful Sequence**

### Recommended fix  
Use CSS for layout rather than tables.

```html
<div class="ticket-layout">
  <section>
    <h2>Ticket information</h2>
  </section>

  <section>
    <h2>Book tickets</h2>
  </section>
</div>
```

```css
.ticket-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}
```

Use tables only for true tabular data.

### How this improves accessibility  
The content order becomes cleaner and easier for assistive technologies to interpret.

---

## 14. Insufficient color contrast

### Problem  
The page may use low-contrast text, background images, or decorative colors that make text difficult to read.

### Why this is problematic  
Users with low vision, color vision deficiencies, or age-related vision changes may struggle to read the content.

### Related WCAG  
- **WCAG 1.4.3 — Contrast Minimum**
- **WCAG 1.4.11 — Non-text Contrast**

### Recommended fix  
Ensure normal text has a contrast ratio of at least **4.5:1** and large text has a ratio of at least **3:1**.

Example:

```css
body {
  color: #222;
  background-color: #fff;
}

a {
  color: #0645ad;
}

button {
  background-color: #005fcc;
  color: #fff;
}
```

Do not place important text over busy images unless there is a sufficient overlay.

### How this improves accessibility  
Text becomes easier to read for users with low vision and users viewing the page in bright environments.

---

## 15. Reliance on color alone

### Problem  
Required fields, selected navigation items, available tickets, or error states may be identified only by color.

### Why this is problematic  
Users with color blindness or users who cannot perceive the visual styling may miss important information.

### Related WCAG  
- **WCAG 1.4.1 — Use of Color**

### Recommended fix  
Use text, icons, or programmatic attributes in addition to color.

```html
<label for="email">
  Email address <span class="required">(required)</span>
</label>
```

For current navigation:

```html
<a href="tickets.html" aria-current="page">Tickets</a>
```

### How this improves accessibility  
Information is available to users regardless of color perception.

---

## 16. Text resizing and responsive behavior may be poor

### Problem  
The page may use fixed font sizes, fixed-width layout tables, or image text that does not resize well.

### Why this is problematic  
Users with low vision often zoom or increase text size. Fixed layouts can cause clipping, overlapping, or horizontal scrolling.

### Related WCAG  
- **WCAG 1.4.4 — Resize Text**
- **WCAG 1.4.10 — Reflow**

### Recommended fix  
Use relative units such as `rem`, `em`, `%`, and responsive CSS.

```css
body {
  font-size: 1rem;
  line-height: 1.5;
}

.container {
  max-width: 70rem;
  width: 100%;
  padding: 1rem;
}
```

Avoid using images of text for headings or navigation.

### How this improves accessibility  
Users can zoom or resize text without losing access to content or functionality.

---

## 17. Link text may not be descriptive

### Problem  
Links may use unclear text such as “click here,” “more,” or image links without useful alternative text.

### Why this is problematic  
Screen reader users often navigate by links. Ambiguous link text makes it difficult to understand the purpose of each link out of context.

### Related WCAG  
- **WCAG 2.4.4 — Link Purpose in Context**

### Recommended fix  
Use descriptive link text.

Problematic:

```html
<a href="tickets.html">Click here</a>
```

Better:

```html
<a href="tickets.html">View ticket prices and booking options</a>
```

### How this improves accessibility  
Users can understand where a link goes without needing surrounding visual context.

---

## 18. Page title may not be sufficiently descriptive

### Problem  
The browser title may not clearly identify the specific page, for example using a generic title such as “Citylights” on every page.

### Why this is problematic  
Screen reader users hear the page title when navigating between pages or browser tabs. A non-specific title makes orientation harder.

### Related WCAG  
- **WCAG 2.4.2 — Page Titled**

### Recommended fix  
Use a unique, descriptive title.

```html
<title>Tickets | Citylights</title>
```

### How this improves accessibility  
Users can identify the page quickly from the browser tab, history, bookmarks, and screen reader announcements.

---

# Example improved ticket form structure

```html
<form action="/tickets" method="post" novalidate>
  <h2>Book tickets</h2>

  <p>Fields marked “required” must be completed.</p>

  <fieldset>
    <legend>Ticket selection</legend>

    <label for="event">Choose an event</label>
    <select id="event" name="event" required>
      <option value="">Select an event</option>
      <option value="concert">Citylights concert</option>
      <option value="theatre">Evening theatre performance</option>
    </select>

    <label for="quantity">Number of tickets</label>
    <input
      id="quantity"
      name="quantity"
      type="number"
      min="1"
      max="10"
      required>
  </fieldset>

  <fieldset>
    <legend>Your details</legend>

    <label for="name">Full name required</label>
    <input id="name" name="name" type="text" autocomplete="name" required>

    <label for="email">Email address required</label>
    <input id="email" name="email" type="email" autocomplete="email" required>
  </fieldset>

  <button type="submit">Book tickets</button>
</form>
```

---

# Priority recommendations

## High priority

1. Add proper labels to all form controls.  
2. Ensure the entire form is operable by keyboard.  
3. Add semantic headings and landmarks.  
4. Fix image alternative text and replace images of text where possible.  
5. Add a skip link.  
6. Use proper table headers and captions for ticket pricing or schedule data.

## Medium priority

1. Improve color contrast.  
2. Make navigation semantic and indicate the current page with `aria-current`.  
3. Improve error handling and required-field messaging.  
4. Ensure focus indicators are clearly visible.

## Lower priority but still important

1. Improve responsive behavior and text resizing.  
2. Replace layout tables with CSS layout.  
3. Improve link text and page titles.  

---

# Overall conclusion

The tickets page contains many common accessibility barriers: weak semantic structure, inaccessible form markup, poor navigation support, insufficient table semantics, and likely keyboard and screen reader issues. The most important improvements are to rebuild the page using semantic HTML, properly label all form controls, ensure predictable keyboard access, provide meaningful headings, and expose table and navigation relationships programmatically. These changes would significantly improve usability for screen reader users, keyboard users, users with low vision, and users with cognitive disabilities.