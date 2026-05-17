## Accessibility analysis and remediation

The snippet contains several accessibility barriers related to keyboard access, semantic markup, screen reader support, form labeling, table structure, and deprecated presentational HTML.

---

# 1. Navigation implemented with table cell, JavaScript link, mouse-only events, and image without alt text

## Problem

```html
<td WIDTH=154px bgcolor="#EDEDED" id="home"
onMouseOver="switchImage('nav_home', './img/nav_home2.gif'); ChangeColor('home','#FFF')"
onMouseOut="switchImage('nav_home', './img/nav_home.gif'); ChangeColor('home','#EDEDED')">
<A HREF="javascript:location.href='home.html';" onFocus="blur();">
<img name="nav_home" src=./img/nav_home.gif width=88 height=27 hspace="15" border=0px>
</a>
</TD>
```

### Issues

1. **Navigation is inside a table cell rather than semantic navigation markup**
   - A `<td>` should be used for tabular data, not page navigation.
   - Screen reader users benefit from semantic landmarks such as `<nav>`.

2. **The link uses `javascript:` instead of a real URL**
   - This can fail if JavaScript is unavailable.
   - It also makes the link less predictable for assistive technologies.

3. **`onFocus="blur();"` removes keyboard focus**
   - This prevents keyboard users from focusing the link.
   - Users navigating with Tab may be unable to access the link at all.

4. **Mouse-only hover behavior**
   - `onMouseOver` and `onMouseOut` do not support keyboard users.
   - Keyboard users need equivalent `:focus` styling.

5. **Image link has no `alt` attribute**
   - Screen reader users may not know where the link goes.
   - If the image contains the word “Home,” that text must be provided as alternative text.

6. **Deprecated presentational attributes**
   - `bgcolor`, `hspace`, `border`, and table-based layout should be replaced with CSS.

## Why this is a barrier

Keyboard-only users, screen reader users, and users who disable JavaScript may not be able to identify or activate the navigation link. Removing focus also violates expected keyboard behavior.

## Relevant WCAG 2.1 criteria

- **1.1.1 Non-text Content** — Images need text alternatives.
- **1.3.1 Info and Relationships** — Navigation should use appropriate semantic structure.
- **2.1.1 Keyboard** — Functionality must be available from a keyboard.
- **2.4.4 Link Purpose** — Link purpose must be clear.
- **2.4.7 Focus Visible** — Keyboard focus must be visible.
- **4.1.2 Name, Role, Value** — Controls must expose proper names and roles.

## Accessible fix

Use semantic navigation, a real `href`, text or properly labeled images, and CSS for hover/focus states.

### Recommended accessible HTML

```html
<nav aria-label="Primary navigation">
  <ul class="primary-nav">
    <li>
      <a href="home.html" class="nav-link home-link">
        Home
      </a>
    </li>
  </ul>
</nav>
```

### Example CSS

```css
.primary-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #ededed;
  color: #000;
  text-decoration: none;
}

.nav-link:hover,
.nav-link:focus {
  background-color: #fff;
  outline: 2px solid #000;
  outline-offset: 2px;
}
```

### If the image must be retained

```html
<nav aria-label="Primary navigation">
  <ul class="primary-nav">
    <li>
      <a href="home.html" class="nav-link">
        <img src="./img/nav_home.gif" width="88" height="27" alt="Home">
      </a>
    </li>
  </ul>
</nav>
```

If the image is decorative and visible text is present, use `alt=""`:

```html
<a href="home.html" class="nav-link">
  <img src="./img/nav_home.gif" width="88" height="27" alt="">
  <span>Home</span>
</a>
```

---

# 2. Select menu has no accessible label and navigates automatically on change

## Problem

```html
<SELECT ONCHANGE="location.href = this.value;">
    <OPTION SELECTED>QUICKMENU ---->
    <OPTION VALUE="../offsite.html">Broadcasting
    <OPTION VALUE="../offsite.html">Education
    <OPTION VALUE="../offsite.html">Transportation
</SELECT>
```

### Issues

1. **The `<select>` has no label**
   - Screen reader users may hear only “combo box” without knowing its purpose.

2. **Changing the selection immediately navigates away**
   - Users may be redirected unexpectedly while browsing options.
   - Keyboard and screen reader users often move through options using arrow keys, which can trigger the navigation accidentally depending on browser/AT behavior.

3. **The first option is being used as a label**
   - Placeholder options are not a substitute for a real `<label>`.

4. **The first option lacks an explicit value**
   - This can lead to unpredictable behavior if selected.

5. **Options all point to the same URL**
   - If that reflects the real system, users may not be taken to a distinct destination. If intentional, the labels should make sense contextually.

## Why this is a barrier

Users may not understand the purpose of the control and may be unexpectedly redirected before making a deliberate choice.

## Relevant WCAG 2.1 criteria

- **1.3.1 Info and Relationships** — Form controls need programmatic labels.
- **2.1.1 Keyboard** — Controls must be operable by keyboard without unexpected behavior.
- **3.2.2 On Input** — Changing a form control should not unexpectedly change context.
- **3.3.2 Labels or Instructions** — Inputs require labels or instructions.
- **4.1.2 Name, Role, Value** — Form controls need accessible names.

## Accessible fix

Provide a visible label and a submit button so the user controls when navigation occurs.

### Recommended accessible HTML

```html
<form action="/go" method="get">
  <label for="quickmenu">Quick menu</label>

  <select id="quickmenu" name="destination">
    <option value="">Select a section</option>
    <option value="../offsite.html">Broadcasting</option>
    <option value="../offsite.html">Education</option>
    <option value="../offsite.html">Transportation</option>
  </select>

  <button type="submit">Go</button>
</form>
```

If JavaScript is required for the redirect, keep the button and trigger navigation only after activation:

```html
<form id="quickmenu-form">
  <label for="quickmenu">Quick menu</label>

  <select id="quickmenu" name="destination">
    <option value="">Select a section</option>
    <option value="../broadcasting.html">Broadcasting</option>
    <option value="../education.html">Education</option>
    <option value="../transportation.html">Transportation</option>
  </select>

  <button type="submit">Go</button>
</form>

<script>
  document.getElementById('quickmenu-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const destination = document.getElementById('quickmenu').value;

    if (destination) {
      window.location.href = destination;
    }
  });
</script>
```

---

# 3. Concert table lacks table semantics and accessible headers

## Problem

```html
<table width="250px" border="1" bordercolor="#C0C0C0" rules="rows">
    <tr bgcolor="#A9B8BF">
        <td><b><font color="41545D">Les Garçons</font></b></td>
        <td><b><font color="41545D">The Obelisks</font></b></td>
    </tr>
    <tr>
        <td>12/2/06</td>
        <td>24/3/06</td>
    </tr>
</table>
```

### Issues

1. **Header cells are marked up as `<td>` instead of `<th>`**
   - Screen readers cannot reliably associate the dates with the concert names.

2. **No table caption**
   - Users may not know what the table represents.

3. **Deprecated presentational markup**
   - `width`, `border`, `bordercolor`, `rules`, `bgcolor`, `<font>`, and `<b>` for styling should be replaced with CSS.

4. **Dates are ambiguous**
   - `12/2/06` may mean different dates depending on locale.
   - Screen reader users also benefit from clearer date formats.

5. **Potential color contrast issue**
   - The text color `#41545D` on `#A9B8BF` should be tested for contrast.
   - If it fails, use a darker text color or lighter background.

## Why this is a barrier

Without proper table headers, screen reader users may hear isolated dates without knowing which performer they belong to. Ambiguous dates can also create comprehension problems.

## Relevant WCAG 2.1 criteria

- **1.3.1 Info and Relationships** — Table headers and relationships must be programmatically determinable.
- **1.4.3 Contrast Minimum** — Text must have sufficient contrast.
- **4.1.1 Parsing** — Avoid invalid or obsolete markup that may reduce compatibility.

## Accessible fix

Use `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">`, and CSS.

### Accessible table version

```html
<table class="concert-table">
  <caption>Concert dates</caption>

  <thead>
    <tr>
      <th scope="col">Les Garçons</th>
      <th scope="col">The Obelisks</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        <time datetime="2006-02-12">12 February 2006</time>
      </td>
      <td>
        <time datetime="2006-03-24">24 March 2006</time>
      </td>
    </tr>
  </tbody>
</table>
```

### Example CSS

```css
.concert-table {
  width: 250px;
  border-collapse: collapse;
}

.concert-table caption {
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: left;
}

.concert-table th,
.concert-table td {
  border-bottom: 1px solid #c0c0c0;
  padding: 0.5rem;
}

.concert-table th {
  background-color: #a9b8bf;
  color: #1f2a30;
  font-weight: bold;
}
```

### Alternative structure

If each row represents one concert, this may be clearer:

```html
<table class="concert-table">
  <caption>Upcoming concert dates</caption>

  <thead>
    <tr>
      <th scope="col">Artist</th>
      <th scope="col">Date</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Les Garçons</td>
      <td><time datetime="2006-02-12">12 February 2006</time></td>
    </tr>
    <tr>
      <td>The Obelisks</td>
      <td><time datetime="2006-03-24">24 March 2006</time></td>
    </tr>
  </tbody>
</table>
```

This second version is usually easier to understand and more scalable.

---

# 4. Deprecated and inaccessible text formatting in terms paragraph

## Problem

```html
<p id="terms" align="justify">
<b>
[1] YOU AGREE THROUGH THE ACT OF CALLING THE M-U-S-I-C LINE...
<U>SINCE CITYLIGHTS WOULD BE IRREPARABLY DAMAGED...</U>
</b>
</p>
```

### Issues

1. **Text is entirely bold and uppercase**
   - Large blocks of uppercase text are harder to read.
   - Bold should be used selectively for emphasis, not for entire paragraphs.

2. **Underlined text may be mistaken for a link**
   - Underlining is commonly associated with links.
   - Users with cognitive disabilities or low vision may expect it to be interactive.

3. **`align="justify"` is presentational**
   - Justified text can create uneven spacing, making reading harder for users with dyslexia or low vision.

4. **Using `<b>` and `<u>` for visual styling instead of meaning**
   - If the content is truly important, use semantic elements such as `<strong>`.
   - Visual styling should be handled in CSS.

5. **Spelled-out “M-U-S-I-C” may be announced awkwardly**
   - Screen readers may read each letter separately depending on settings.
   - If the intended word is “music,” write it normally unless the spelling is legally required.

## Why this is a barrier

This formatting reduces readability and may confuse users. Underlined non-links can mislead users, while dense bold uppercase legal text is difficult for many people to process.

## Relevant WCAG 2.1 criteria

- **1.3.1 Info and Relationships** — Semantic meaning should be represented programmatically.
- **1.4.8 Visual Presentation** — Justified text can negatively affect readability. This is a AAA criterion, but still a strong usability recommendation.
- **3.1.5 Reading Level** — Complex text should be made understandable where possible.
- **4.1.1 Parsing** — Avoid obsolete or presentational HTML patterns.

## Accessible fix

Use normal case text, semantic emphasis only where needed, and CSS for visual styling.

### Recommended accessible HTML

```html
<section aria-labelledby="terms-heading">
  <h2 id="terms-heading">Terms and conditions</h2>

  <p id="terms">
    <strong>1. You agree through the act of calling the music line</strong>
    that the following terms apply.
  </p>

  <p>
    Since Citylights would be irreparably damaged, additional restrictions may apply.
  </p>
</section>
```

### Example CSS

```css
#terms {
  max-width: 65ch;
  line-height: 1.5;
  text-align: left;
}

.important-term {
  font-weight: 700;
}
```

If a specific phrase requires emphasis:

```html
<p>
  You agree through the act of calling the music line.
  <strong>Since Citylights would be irreparably damaged, this condition is important.</strong>
</p>
```

Avoid underlining unless the text is a link:

```html
<a href="/terms/citylights-damages">
  Read more about Citylights damages policy
</a>
```

---

# Summary of recommended improvements

| Area | Issue | Fix |
|---|---|---|
| Navigation | Table cell used for navigation | Use `<nav>`, `<ul>`, `<li>`, and real links |
| Navigation | `javascript:` link | Use `href="home.html"` |
| Navigation | Focus removed with `blur()` | Remove it and provide visible focus styles |
| Navigation | Mouse-only behavior | Add CSS `:hover` and `:focus` styles |
| Image link | Missing `alt` text | Add `alt="Home"` or visible text |
| Select menu | Missing label | Add `<label for="quickmenu">Quick menu</label>` |
| Select menu | Auto-navigation on change | Use a submit button |
| Table | Headers use `<td>` | Use `<th scope="col">` |
| Table | Missing caption | Add `<caption>` |
| Table | Presentational attributes | Move styling to CSS |
| Dates | Ambiguous date format | Use clear text plus `<time datetime="">` |
| Text formatting | All caps, bold, underline | Use normal case and semantic emphasis |
| Text formatting | Justified text | Prefer left-aligned text for readability |

---

# Consolidated accessible version

```html
<nav aria-label="Primary navigation">
  <ul class="primary-nav">
    <li>
      <a href="home.html" class="nav-link">
        Home
      </a>
    </li>
  </ul>
</nav>

<form id="quickmenu-form">
  <label for="quickmenu">Quick menu</label>

  <select id="quickmenu" name="destination">
    <option value="">Select a section</option>
    <option value="../broadcasting.html">Broadcasting</option>
    <option value="../education.html">Education</option>
    <option value="../transportation.html">Transportation</option>
  </select>

  <button type="submit">Go</button>
</form>

<table class="concert-table">
  <caption>Upcoming concert dates</caption>

  <thead>
    <tr>
      <th scope="col">Artist</th>
      <th scope="col">Date</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Les Garçons</td>
      <td><time datetime="2006-02-12">12 February 2006</time></td>
    </tr>
    <tr>
      <td>The Obelisks</td>
      <td><time datetime="2006-03-24">24 March 2006</time></td>
    </tr>
  </tbody>
</table>

<section aria-labelledby="terms-heading">
  <h2 id="terms-heading">Terms and conditions</h2>

  <p id="terms">
    <strong>1. You agree through the act of calling the music line</strong>
    that the following terms apply.
  </p>

  <p>
    Since Citylights would be irreparably damaged, additional restrictions may apply.
  </p>
</section>
```