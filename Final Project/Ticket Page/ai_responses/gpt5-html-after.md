## Summary of visible accessibility issues

The snippet is generally close to accessible: it uses a list for navigation, a visible form label, a table caption, table headers with `scope`, and an ordered list for terms. However, there are several remaining issues that could affect keyboard users, screen reader users, and users who rely on clear form feedback.

---

# 1. Navigation is not marked up as a navigation landmark

## Problem

The navigation is wrapped in:

```html
<div id="nav">
```

A `div` does not expose a navigation landmark to assistive technologies.

## Why this is a barrier

Screen reader users often navigate pages by landmarks. If the primary navigation is not marked up with the semantic `<nav>` element, it is harder to quickly locate and jump to the site navigation.

## Relevant WCAG guidance

- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 2.4.1 — Bypass Blocks**
- **WCAG 2.4.6 — Headings and Labels**

## Fix

Use a semantic `<nav>` element and provide an accessible label if needed.

### Corrected example

```html
<nav aria-label="Primary navigation">
  <ul>
    <li class="home"><a href="home.html">Home</a></li>
    <li class="news"><a href="news.html">News</a></li>
    <li class="facts_set"><a href="tickets.html">Tickets</a></li>
    <li class="survey"><a href="survey.html">Survey</a></li>
  </ul>
</nav>
```

---

# 2. “Tickets” is an anchor without an `href`

## Problem

The “Tickets” item is coded as:

```html
<a>Tickets</a>
```

An `<a>` element without an `href` is not a true link. It is usually not keyboard-focusable by default and may not be announced as an actionable link by assistive technologies.

## Why this is a barrier

Keyboard users may not be able to tab to the “Tickets” item. Screen reader users may also receive inconsistent or confusing information because the item looks like a link visually but does not behave like one programmatically.

## Relevant WCAG guidance

- **WCAG 2.1.1 — Keyboard**
- **WCAG 2.4.4 — Link Purpose**
- **WCAG 4.1.2 — Name, Role, Value**

## Fix

If “Tickets” navigates somewhere, give it an `href`.

```html
<li class="facts_set"><a href="tickets.html">Tickets</a></li>
```

If “Tickets” represents the current page, keep it as a link and use `aria-current="page"`.

```html
<li class="facts_set">
  <a href="tickets.html" aria-current="page">Tickets</a>
</li>
```

If it opens a menu or performs an action, use a `<button>` instead of an anchor.

```html
<li class="facts_set">
  <button type="button" aria-expanded="false" aria-controls="tickets-menu">
    Tickets
  </button>
</li>
```

---

# 3. Form validation silently fails when “Quick Menu” is selected

## Problem

The form has this inline validation:

```html
onsubmit="if(qkmenu.value=='0'){return false;}"
```

If the user submits the form while the default “Quick Menu” option is selected, the form submission is prevented, but no error message is displayed.

## Why this is a barrier

Users are not told what went wrong or how to fix it. This is especially problematic for screen reader users, users with cognitive disabilities, and keyboard users who may not notice that nothing happened.

## Relevant WCAG guidance

- **WCAG 3.3.1 — Error Identification**
- **WCAG 3.3.2 — Labels or Instructions**
- **WCAG 4.1.3 — Status Messages**

## Fix

Provide clear validation feedback and associate the error with the select control.

### Improved accessible example using native validation

```html
<form action="../offsite.html" method="post">
  <div>
    <label for="qkmenu">
      Explore Site by Topic:
    </label>

    <select name="qkmenu" id="qkmenu" required>
      <option value="" selected disabled>Select a topic</option>
      <option value="broadcasting">Broadcasting</option>
      <option value="education">Education</option>
      <option value="transportation">Transportation</option>
    </select>

    <button type="submit">Go</button>
  </div>
</form>
```

This uses browser-native required-field validation and makes the first option a non-selectable instruction.

### More robust custom validation example

```html
<form action="../offsite.html" method="post" id="topic-form" novalidate>
  <div>
    <label for="qkmenu">
      Explore Site by Topic:
    </label>

    <select name="qkmenu" id="qkmenu" aria-describedby="qkmenu-error">
      <option value="">Select a topic</option>
      <option value="broadcasting">Broadcasting</option>
      <option value="education">Education</option>
      <option value="transportation">Transportation</option>
    </select>

    <p id="qkmenu-error" role="alert"></p>

    <button type="submit">Go</button>
  </div>
</form>

<script>
  document.getElementById('topic-form').addEventListener('submit', function (event) {
    const menu = document.getElementById('qkmenu');
    const error = document.getElementById('qkmenu-error');

    if (!menu.value) {
      event.preventDefault();
      error.textContent = 'Please select a topic before continuing.';
      menu.setAttribute('aria-invalid', 'true');
      menu.focus();
    } else {
      error.textContent = '';
      menu.removeAttribute('aria-invalid');
    }
  });
</script>
```

---

# 4. The select `name` appears to be misspelled

## Problem

The select has:

```html
<select name="qkemnu" id="qkmenu">
```

The `id` is `qkmenu`, but the `name` is `qkemnu`. This looks like a typo.

## Why this is a barrier

This is not directly a screen reader issue, but it may cause form processing problems. If the server expects `qkmenu`, the selected topic may not be submitted correctly. Failed or confusing form submission can create usability barriers for all users.

## Relevant WCAG guidance

- **WCAG 3.3.1 — Error Identification**
- **WCAG 3.3.2 — Labels or Instructions**

## Fix

Use a consistent and meaningful `name`.

```html
<select name="qkmenu" id="qkmenu">
  <option value="">Select a topic</option>
  <option value="broadcasting">Broadcasting</option>
  <option value="education">Education</option>
  <option value="transportation">Transportation</option>
</select>
```

---

# 5. The submit button text “Go” may be too vague

## Problem

The submit control is:

```html
<input type="submit" value="Go">
```

Because it follows a labeled select, many users will understand it. However, “Go” on its own can be vague, especially when navigating by form controls or buttons out of context.

## Why this is a barrier

Screen reader users may navigate directly by buttons. Hearing only “Go, button” may not fully explain the action.

## Relevant WCAG guidance

- **WCAG 2.4.6 — Headings and Labels**
- **WCAG 3.3.2 — Labels or Instructions**

## Fix

Use a more descriptive button label.

```html
<button type="submit">Explore selected topic</button>
```

Or, if concise visual text is required, provide a more descriptive accessible name:

```html
<button type="submit" aria-label="Explore selected topic">
  Go
</button>
```

Prefer visible descriptive text when possible.

---

# 6. Table is accessible but could be improved with `<thead>` and `<tbody>`

## Current code

```html
<table id="sfdatetable">
  <caption>Concert Dates</caption>

  <tr class="datahead">
    <th scope="col">Date</th>
    <th scope="col">Event</th>
  </tr>

  <tr>
    <td>12 Feb 09</td>
    <td lang="fr">Les Garçons</td>
  </tr>

  <tr>
    <td>24 Mar 09</td>
    <td>The Obelisks</td>
  </tr>
</table>
```

## Assessment

This table is mostly accessible because it has:

- A `<caption>`
- Column headers using `<th scope="col">`
- Appropriate use of `lang="fr"` for French text

However, using `<thead>` and `<tbody>` improves structure and maintainability.

## Why this matters

Screen readers can generally interpret the current table, but explicit table grouping helps communicate structure and is useful for styling and future table complexity.

## Relevant WCAG guidance

- **WCAG 1.3.1 — Info and Relationships**

## Improved example

```html
<table id="sfdatetable">
  <caption>Concert Dates</caption>

  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Event</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><time datetime="2009-02-12">12 Feb 2009</time></td>
      <td lang="fr">Les Garçons</td>
    </tr>

    <tr>
      <td><time datetime="2009-03-24">24 Mar 2009</time></td>
      <td>The Obelisks</td>
    </tr>
  </tbody>
</table>
```

---

# 7. Dates use a potentially ambiguous two-digit year

## Problem

The table uses dates like:

```html
<td>12 Feb 09</td>
```

The year `09` may be ambiguous.

## Why this is a barrier

Users with cognitive disabilities, users relying on text-to-speech, and international users may find two-digit dates unclear. Screen readers may also announce the date in a way that is not as clear as intended.

## Relevant WCAG guidance

- **WCAG 3.1.5 — Reading Level**, advisory in this context
- **WCAG 1.3.1 — Info and Relationships**

## Fix

Use a full year and, ideally, the semantic `<time>` element.

```html
<td><time datetime="2009-02-12">12 Feb 2009</time></td>
```

---

# 8. Terms section could use a semantic section element

## Current code

```html
<div class="boxcontent">
  <h2>Citylights Terms and Conditions</h2>

  <ol>
    <li>
      You agree through the act of calling the M-U-S-I-C Line...
    </li>

    <li>
      Citylights shall not be liable to you for any damages...
    </li>

    <li>
      Remedies: Since Citylights would be irreparably damaged...
    </li>
  </ol>
</div>
```

## Assessment

This is mostly accessible. The `<h2>` and ordered list are appropriate.

However, if this is a distinct page section, using `<section>` with an accessible name can improve semantics.

## Relevant WCAG guidance

- **WCAG 1.3.1 — Info and Relationships**
- **WCAG 2.4.6 — Headings and Labels**

## Improved example

```html
<section class="boxcontent" aria-labelledby="terms-heading">
  <h2 id="terms-heading">Citylights Terms and Conditions</h2>

  <ol>
    <li>
      You agree through the act of calling the M-U-S-I-C Line...
    </li>

    <li>
      Citylights shall not be liable to you for any damages...
    </li>

    <li>
      Remedies: Since Citylights would be irreparably damaged...
    </li>
  </ol>
</section>
```

---

# Recommended corrected version

```html
<nav aria-label="Primary navigation">
  <ul>
    <li class="home"><a href="home.html">Home</a></li>
    <li class="news"><a href="news.html">News</a></li>
    <li class="facts_set"><a href="tickets.html">Tickets</a></li>
    <li class="survey"><a href="survey.html">Survey</a></li>
  </ul>
</nav>

<form action="../offsite.html" method="post">
  <div>
    <label for="qkmenu">
      Explore Site by Topic:
    </label>

    <select name="qkmenu" id="qkmenu" required>
      <option value="" selected disabled>Select a topic</option>
      <option value="broadcasting">Broadcasting</option>
      <option value="education">Education</option>
      <option value="transportation">Transportation</option>
    </select>

    <button type="submit">Explore selected topic</button>
  </div>
</form>

<table id="sfdatetable">
  <caption>Concert Dates</caption>

  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Event</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><time datetime="2009-02-12">12 Feb 2009</time></td>
      <td lang="fr">Les Garçons</td>
    </tr>

    <tr>
      <td><time datetime="2009-03-24">24 Mar 2009</time></td>
      <td>The Obelisks</td>
    </tr>
  </tbody>
</table>

<section class="boxcontent" aria-labelledby="terms-heading">
  <h2 id="terms-heading">Citylights Terms and Conditions</h2>

  <ol>
    <li>
      You agree through the act of calling the M-U-S-I-C Line...
    </li>

    <li>
      Citylights shall not be liable to you for any damages...
    </li>

    <li>
      Remedies: Since Citylights would be irreparably damaged...
    </li>
  </ol>
</section>
```

## Key remediation priorities

1. Replace `<div id="nav">` with `<nav aria-label="Primary navigation">`.
2. Fix the “Tickets” item so it is a real link or a real button.
3. Replace silent JavaScript validation with native validation or accessible error messaging.
4. Correct the select `name` typo.
5. Use clearer button text than “Go”.
6. Improve table structure with `<thead>`, `<tbody>`, and semantic dates.
7. Optionally convert the terms container from a generic `<div>` to a semantic `<section>`.