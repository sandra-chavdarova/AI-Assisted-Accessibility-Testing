## Accessibility review: W3C WAI BAD Demo — “Tickets” page  
URL: `https://www.w3.org/WAI/demos/bad/after/tickets.html`

This page is part of the W3C “Before and After Demonstration” and represents the improved “after” version. As a result, many major accessibility barriers commonly found on the corresponding “before” page appear to be addressed. The page generally demonstrates good accessibility practices, but there are still some areas worth reviewing or improving for modern WCAG 2.1 expectations and inclusive usability.

---

# Summary assessment

| Area | Assessment |
|---|---|
| Keyboard accessibility | Generally expected to be usable, but focus visibility and logical tab order should be verified |
| Semantic HTML | Mostly strong; ensure all navigation, headings, forms, and tables use native semantics |
| Navigation accessibility | Good structure, but current-page indication could be improved with `aria-current` |
| Form accessibility | Labels and required-field instructions should be programmatically connected |
| Table accessibility | Ticket/pricing tables should include captions and scoped headers |
| Screen reader compatibility | Generally good; improvements possible around status/error messaging |
| Readability/usability | Mostly clear, but required fields, instructions, and validation feedback should be explicit |

---

# 1. Current navigation item may rely on visual styling only

## Problem  
The active page in the navigation may be visually indicated, for example by color, bold text, or styling. If that state is not exposed programmatically, screen reader users may not know which page they are currently on.

## Why this is problematic  
Users who cannot see the visual styling need a non-visual way to identify their current location in the site navigation.

## Related WCAG guidance  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 2.4.4 — Link Purpose**
- **WCAG 2.4.8 — Location** AAA, but still a useful usability enhancement

## Recommended fix  
Use `aria-current="page"` on the current navigation link.

### Example

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="home.html">Home</a></li>
    <li><a href="news.html">News</a></li>
    <li><a href="tickets.html" aria-current="page">Tickets</a></li>
    <li><a href="survey.html">Survey</a></li>
  </ul>
</nav>
```

## How this improves accessibility  
Screen readers can announce that the “Tickets” link is the current page, helping users understand where they are within the site.

---

# 2. Keyboard focus visibility should be checked and preserved

## Problem  
Even when a page is technically keyboard accessible, users can still face barriers if the keyboard focus indicator is subtle, hidden, or removed through CSS.

For example, this would be problematic:

```css
a:focus,
button:focus {
  outline: none;
}
```

## Why this is problematic  
Keyboard-only users, including users with motor disabilities and screen magnifier users, need to see where focus is currently located.

## Related WCAG guidance  
- **WCAG 2.1.1 — Keyboard**
- **WCAG 2.4.7 — Focus Visible**

## Recommended fix  
Ensure every interactive element has a visible focus state.

### Example

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

## How this improves accessibility  
Users navigating with `Tab`, `Shift + Tab`, or other keyboard commands can clearly identify their position on the page.

---

# 3. Required form fields should be programmatically identifiable

## Problem  
If required fields in the ticket form are indicated only visually, for example with an asterisk `*`, some users may not understand which fields are required.

## Why this is problematic  
Screen reader users may hear only the field label and not the visual required-field indicator unless it is included in the accessible name or description.

## Related WCAG guidance  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 3.3.2 — Labels or Instructions**
- **WCAG 3.3.1 — Error Identification**

## Recommended fix  
Use the native `required` attribute and provide clear text instructions explaining what the required indicator means.

### Example

```html
<p><span aria-hidden="true">*</span> Required fields</p>

<label for="name">
  Name <span aria-hidden="true">*</span>
</label>
<input id="name" name="name" type="text" required aria-describedby="name-help">

<p id="name-help">Enter your full name.</p>
```

Alternatively, include the word “required” directly:

```html
<label for="email">Email address, required</label>
<input id="email" name="email" type="email" required>
```

## How this improves accessibility  
Screen reader users, voice-control users, and users with cognitive disabilities receive clearer instructions and can more easily complete the form.

---

# 4. Form validation messages should be associated with the relevant fields

## Problem  
If the ticket order form produces validation errors after submission, the errors need to be programmatically connected to the fields that caused them.

A common accessibility issue is placing an error message visually near a field but not associating it with the input.

## Why this is problematic  
Screen reader users may not know that a specific field has an error. Keyboard users may also have difficulty finding what needs to be corrected.

## Related WCAG guidance  
- **WCAG 3.3.1 — Error Identification**
- **WCAG 3.3.3 — Error Suggestion**
- **WCAG 4.1.3 — Status Messages**

## Recommended fix  
Use `aria-describedby` to connect error text to the relevant field. Use `aria-invalid="true"` when a field has an error.

### Example

```html
<label for="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  required
  aria-invalid="true"
  aria-describedby="email-error">

<p id="email-error" class="error">
  Enter an email address in the format name@example.com.
</p>
```

For a list of errors at the top of the form:

```html
<div role="alert" aria-labelledby="error-heading">
  <h2 id="error-heading">There is a problem with your order</h2>
  <ul>
    <li><a href="#email">Enter a valid email address.</a></li>
    <li><a href="#quantity">Select the number of tickets.</a></li>
  </ul>
</div>
```

## How this improves accessibility  
Users are told what went wrong, where the problem is, and how to fix it.

---

# 5. Ticket quantity controls should have clear accessible names

## Problem  
If the page includes multiple similar controls such as ticket quantity fields or dropdowns, labels like “Quantity” may not be sufficient on their own.

For example, a screen reader user may hear:

> Quantity, combo box

But may not know which performance, event, or ticket type the field belongs to.

## Why this is problematic  
Repeated labels can make forms difficult to understand for screen reader users and voice-control users.

## Related WCAG guidance  
- **WCAG 2.4.6 — Headings and Labels**
- **WCAG 3.3.2 — Labels or Instructions**
- **WCAG 1.3.1 — Info and Relationships**

## Recommended fix  
Make each form control label unique and descriptive.

### Example

```html
<label for="tickets-fireflies">
  Number of tickets for The Fireflies
</label>
<select id="tickets-fireflies" name="tickets-fireflies">
  <option value="0">0</option>
  <option value="1">1</option>
  <option value="2">2</option>
</select>
```

If the visual design needs a shorter label, use visually hidden text.

```html
<label for="tickets-fireflies">
  Tickets
  <span class="visually-hidden">for The Fireflies</span>
</label>
```

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
```

## How this improves accessibility  
Users can understand exactly what each control does without needing to visually inspect surrounding content.

---

# 6. Data tables should include captions and scoped headers

## Problem  
Ticket pages often contain tabular information such as event names, dates, venues, prices, and availability. If the table does not have proper headers or a caption, screen reader users may have difficulty understanding the relationship between cells.

## Why this is problematic  
Screen reader users navigate tables cell by cell. Without table headers, they may hear isolated values without knowing what those values represent.

For example:

> $12  
> 7:30 PM  
> Available

Without headers, these values may lack context.

## Related WCAG guidance  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 1.3.2 — Meaningful Sequence**

## Recommended fix  
Use a proper HTML table with a caption and `scope` attributes.

### Example

```html
<table>
  <caption>Ticket prices and availability</caption>
  <thead>
    <tr>
      <th scope="col">Performance</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Price</th>
      <th scope="col">Availability</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">The Fireflies</th>
      <td>June 12</td>
      <td>7:30 PM</td>
      <td>$12</td>
      <td>Available</td>
    </tr>
  </tbody>
</table>
```

## How this improves accessibility  
Screen readers can announce the relevant row and column headers, making the table much easier to understand.

---

# 7. Avoid using placeholder text as the only form instruction

## Problem  
If form fields use placeholder text as the only label or instruction, users may lose context once they begin typing.

## Why this is problematic  
Placeholder text often disappears when users enter data. It may also have insufficient contrast and may not be reliably announced as a label by assistive technologies.

## Related WCAG guidance  
- **WCAG 3.3.2 — Labels or Instructions**
- **WCAG 1.4.3 — Contrast Minimum**

## Recommended fix  
Use persistent visible labels for all form fields.

### Example

```html
<label for="card-number">Card number</label>
<input id="card-number" name="card-number" autocomplete="cc-number">
```

Additional instructions can be provided with `aria-describedby`.

```html
<label for="phone">Phone number</label>
<input id="phone" name="phone" type="tel" aria-describedby="phone-format">

<p id="phone-format">Use the format 555-123-4567.</p>
```

## How this improves accessibility  
Users always have access to the field purpose and expected input format.

---

# 8. Use appropriate `autocomplete` attributes for user information fields

## Problem  
If the ticket order form collects personal information such as name, email, address, or payment details, missing `autocomplete` attributes can create unnecessary effort for users.

## Why this is problematic  
Autocomplete helps users with motor disabilities, cognitive disabilities, and memory-related impairments complete forms more easily and accurately.

## Related WCAG guidance  
- **WCAG 1.3.5 — Identify Input Purpose**

## Recommended fix  
Add appropriate `autocomplete` values.

### Example

```html
<label for="given-name">First name</label>
<input id="given-name" name="given-name" autocomplete="given-name">

<label for="family-name">Last name</label>
<input id="family-name" name="family-name" autocomplete="family-name">

<label for="email">Email</label>
<input id="email" name="email" type="email" autocomplete="email">

<label for="postal-code">Postal code</label>
<input id="postal-code" name="postal-code" autocomplete="postal-code">
```

## How this improves accessibility  
Users can complete forms faster and with fewer errors, especially when using assistive technologies or alternative input devices.

---

# 9. Ensure links are understandable out of context

## Problem  
If the page contains generic link text such as “click here”, “more”, or “read more”, screen reader users navigating by links may not understand the destination or purpose.

## Why this is problematic  
Many screen reader users browse pages by pulling up a list of links. Generic link text becomes ambiguous in that mode.

## Related WCAG guidance  
- **WCAG 2.4.4 — Link Purpose in Context**
- **WCAG 2.4.9 — Link Purpose Link Only** AAA

## Recommended fix  
Use descriptive link text.

### Poor example

```html
<a href="venue.html">Click here</a>
```

### Better example

```html
<a href="venue.html">View venue accessibility information</a>
```

## How this improves accessibility  
Users can understand link destinations without needing surrounding visual context.

---

# 10. Status messages after form submission should be announced

## Problem  
If the page dynamically shows a success message, error summary, updated price, or ticket availability after a user action, that update may not be announced to screen reader users unless properly coded.

## Why this is problematic  
Screen reader users may not know that something has changed on the page.

## Related WCAG guidance  
- **WCAG 4.1.3 — Status Messages**
- **WCAG 3.3.1 — Error Identification**

## Recommended fix  
Use an ARIA live region for dynamic status messages.

### Example

```html
<div id="order-status" role="status" aria-live="polite"></div>
```

When the user updates the form:

```js
document.getElementById('order-status').textContent =
  'Your order total is now $36.';
```

For urgent errors:

```html
<div role="alert">
  Your selected performance is sold out.
</div>
```

## How this improves accessibility  
Screen reader users are notified of important changes without needing to search the page manually.

---

# 11. Maintain a logical heading hierarchy

## Problem  
The page should use headings in a meaningful, nested order, for example:

```html
<h1>Tickets</h1>
<h2>Available performances</h2>
<h2>Order tickets</h2>
<h3>Contact information</h3>
```

Problems occur when heading levels are skipped for visual reasons, such as using an `h4` immediately after an `h1`.

## Why this is problematic  
Screen reader users often navigate by headings. An illogical heading structure makes the page harder to scan and understand.

## Related WCAG guidance  
- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 2.4.6 — Headings and Labels**

## Recommended fix  
Use headings to communicate document structure, not visual size. Style headings with CSS rather than choosing heading levels for appearance.

### Example

```html
<h1>Tickets</h1>

<section>
  <h2>Upcoming shows</h2>
  ...
</section>

<section>
  <h2>Order tickets</h2>
  ...
</section>
```

## How this improves accessibility  
Users can quickly understand and navigate the page structure.

---

# 12. Color should not be the only way information is conveyed

## Problem  
Ticket availability, required fields, discounted prices, or errors should not be communicated using color alone.

For example:

```html
<span class="sold-out">Sold out</span>
```

is better than displaying sold-out items only in red.

## Why this is problematic  
Users who are color blind, have low vision, or use monochrome/high-contrast settings may not perceive color differences.

## Related WCAG guidance  
- **WCAG 1.4.1 — Use of Color**
- **WCAG 1.4.3 — Contrast Minimum**

## Recommended fix  
Use text, icons with accessible names, and programmatic states in addition to color.

### Example

```html
<p>
  <strong>Sold out:</strong> No tickets are currently available for this performance.
</p>
```

For form errors:

```html
<label for="email">Email address</label>
<input id="email" aria-invalid="true" aria-describedby="email-error">
<p id="email-error">Error: Enter a valid email address.</p>
```

## How this improves accessibility  
Information remains available to people who cannot perceive color or who use customized display settings.

---

# Positive accessibility practices to preserve

The page appears to follow several strong accessibility principles that should be retained:

## Native HTML controls  
Using real links, buttons, labels, inputs, selects, lists, headings, and tables is preferable to custom scripted widgets.

## Skip navigation  
A “skip to content” link, if present, is beneficial for keyboard and screen reader users.

## Semantic structure  
Clear headings, lists for navigation, and meaningful document structure help assistive technology users navigate efficiently.

## Descriptive page title  
A unique page title such as “Tickets” within the site context helps users identify the page in browser tabs and screen reader announcements.

## Clear content organization  
Grouping related ticket information, ordering controls, and instructions improves usability for all users.

---

# Recommended implementation checklist

Use this checklist to verify the page against WCAG 2.1:

## Keyboard
- All links, buttons, and form fields are reachable by keyboard.
- Focus order follows the visual and logical reading order.
- Focus indicator is visible.
- No keyboard trap exists.

## Forms
- Every input has a visible `<label>`.
- Required fields use `required` or `aria-required`.
- Instructions are visible and programmatically associated.
- Errors are clearly identified.
- Error messages are linked to fields with `aria-describedby`.
- Form fields use appropriate `autocomplete` attributes.

## Navigation
- Navigation is marked up with `<nav>`.
- The current page uses `aria-current="page"`.
- Skip link is available and visible on focus.
- Link text is descriptive.

## Tables
- Data tables use `<caption>`.
- Header cells use `<th>`.
- Column and row headers use `scope`.
- Tables are not used for layout.

## Screen readers
- Page has a meaningful `<title>`.
- Main content is identified with `<main>`.
- Headings are logical.
- Dynamic updates use `role="status"` or `aria-live`.
- Decorative images have empty `alt=""`.
- Informative images have meaningful `alt`.

---

# Overall conclusion

The W3C “after” version of the Tickets page is generally a strong accessibility example and is likely substantially more accessible than the corresponding “before” demo. The most important improvements to verify or add are:

1. Use `aria-current="page"` for the active navigation item.  
2. Ensure strong visible keyboard focus styles.  
3. Programmatically identify required form fields.  
4. Associate form errors and instructions with their fields.  
5. Use clear table captions and scoped table headers.  
6. Ensure dynamic form updates are announced to assistive technologies.  

These refinements would improve usability for screen reader users, keyboard-only users, users with low vision, users with cognitive disabilities, and people relying on browser autofill or alternative input devices.