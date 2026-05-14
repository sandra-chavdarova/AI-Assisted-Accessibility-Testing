# Accessibility Trap Analysis – W3C BAD Demo Survey Pages

> Snippets are taken from the W3C "Before and After" demonstration:
> - Inaccessible: https://www.w3.org/WAI/demos/bad/before/survey.html
> - Accessible:   https://www.w3.org/WAI/demos/bad/after/survey.html
> - Annotations:  https://www.w3.org/WAI/demos/bad/before/annotated/survey.html

> Comments that hint at issues were stripped from all snippets.

---

## radio-no-label — REAL

**Ground truth:** Radio button has no <label> element and is not associated with its visible text "None". Fails WCAG 3.3.2 (Labels or Instructions) and 1.3.1.

**Snippet:**
```html
<input class="lign" type="radio" name="res" value="1">
```

**AI Response:**

The snippet has an accessibility issue.

```html
<input class="lign" type="radio" name="res" value="1">
```

## Issue 1: Radio button has no accessible label

- **Severity:** serious
- **WCAG criterion violated:**
  - **4.1.2 Name, Role, Value**
  - Also related to **1.3.1 Info and Relationships** and **3.3.2 Labels or Instructions**

### Why it is a problem

The radio button has no visible or programmatically associated label. Screen reader users will encounter a radio button but may not know what option it represents.

For example, a screen reader might announce something like:

> “radio button, not checked”

but it will not announce the meaning of the option, such as “Yes”, “No”, “Option 1”, etc.

This also affects users with cognitive disabilities because the purpose of the control is unclear.

### How to fix it

Associate the radio button with a text label using either a `<label for="">` relationship:

```html
<input id="res1" class="lign" type="radio" name="res" value="1">
<label for="res1">Option 1</label>
```

Or wrap the input inside the label:

```html
<label>
  <input class="lign" type="radio" name="res" value="1">
  Option 1
</label>
```

If this radio button is part of a group of related radio buttons, also provide a group label using `<fieldset>` and `<legend>`:

```html
<fieldset>
  <legend>Choose a result</legend>

  <input id="res1" class="lign" type="radio" name="res" value="1">
  <label for="res1">Option 1</label>

  <input id="res2" class="lign" type="radio" name="res" value="2">
  <label for="res2">Option 2</label>
</fieldset>
```

This gives both the individual radio buttons and the overall radio group clear accessible names.

**Score:** Issue identified

---

## select-no-label — REAL

**Ground truth:** Select box has no <label> element and no title attribute.

**Snippet:**
```html
<select name="cc">
      <option value="">select a city -----&gt;</option>
      <option value="af">Afghanistan, Kabul</option>
      <option value="al">Albania, Tirana</option>
      <option value="dz">Algeria, Algiers</option>
    </select>
```

**AI Response:**

Assuming this snippet is the complete form control (i.e. there is no associated `<label>` elsewhere), there are accessibility issues.

| Issue name | Severity | WCAG criterion violated | Why it is a problem | How to fix it |
|---|---:|---|---|---|
| Missing accessible label for the `<select>` | Serious | WCAG 2.1: **1.3.1 Info and Relationships**, **3.3.2 Labels or Instructions**, **4.1.2 Name, Role, Value** | The `<select>` has no programmatically associated label. Screen reader users may only hear the current selected value, e.g. “select a city arrow,” but not the actual purpose of the field. Voice-control users also need a clear accessible name to target the control. | Add a visible `<label>` associated with the `<select>` using `for` and `id`. |
| Placeholder option is being used as the only instruction | Moderate | WCAG 2.1: **3.3.2 Labels or Instructions** | The first option, `select a city ----->`, is acting like a label/instruction, but placeholder-style options are not a reliable substitute for a persistent label. Once the user selects another option, the instruction disappears. | Use a real `<label>` and, if needed, keep the first option as a simple prompt such as “Select a city”. |
| Decorative punctuation in option text | Minor | WCAG 2.1: **1.3.1 Info and Relationships**, **3.3.2 Labels or Instructions** | The text `-----&gt;` is decorative and may be announced awkwardly by screen readers, e.g. “dash dash dash greater than.” It adds noise and can confuse users. | Remove the decorative arrow/punctuation. |
| Prompt says “city” but options contain country + capital pairs | Moderate | WCAG 2.1: **2.4.6 Headings and Labels**, **3.3.2 Labels or Instructions** | The prompt says “select a city,” but the options are formatted as “Country, Capital,” e.g. “Afghanistan, Kabul.” This can confuse users about whether they are selecting a country, a capital city, or a country/city combination. | Make the label and option text match the actual purpose. For example, use “Select a capital city” or “Select a country and capital.” |

A corrected version could be:

```html
<label for="city">Select a capital city</label>
<select id="city" name="city">
  <option value="">Select a capital city</option>
  <option value="kabul">Kabul, Afghanistan</option>
  <option value="tirana">Tirana, Albania</option>
  <option value="algiers">Algiers, Algeria</option>
</select>
```

Or, if the user is actually selecting a country:

```html
<label for="country">Select a country</label>
<select id="country" name="country">
  <option value="">Select a country</option>
  <option value="af">Afghanistan</option>
  <option value="al">Albania</option>
  <option value="dz">Algeria</option>
</select>
```

**Score:** Issue identified

---

## multi-radio-group — MULTI

**Ground truth:** Three problems: 1. radio inputs have no <label> elements, 2. the group has no <fieldset>/<legend> to convey the question "Which is your favorite city park?", 3. values "1–6" give screen readers no context about the option text.

**Snippet:**
```html
Which is your favorite city park?
    <input class="lign" type="radio" name="res" value="1"> None
    <input class="lign" type="radio" name="res" value="2"> Central Park
    <input class="lign" type="radio" name="res" value="3"> Grand Park
    <input class="lign" type="radio" name="res" value="4"> Jurassic Park
    <input class="lign" type="radio" name="res" value="5"> South Park
    <input class="lign" type="radio" name="res" value="6"> Other
```

**AI Response:**

The snippet has accessibility issues.

## 1. Radio buttons do not have programmatically associated labels

**Severity:** serious  
**WCAG criterion violated:**  
- **WCAG 2.1 — 1.3.1 Info and Relationships**
- **WCAG 2.1 — 3.3.2 Labels or Instructions**
- **WCAG 2.1 — 4.1.2 Name, Role, Value**

### Why it is a problem

Each radio button has visible text next to it, for example:

```html
<input class="lign" type="radio" name="res" value="2"> Central Park
```

However, that text is not programmatically associated with the radio input. A screen reader may announce only something like:

> “Radio button, not checked”

without announcing “Central Park”.

This makes it difficult or impossible for screen reader users to know what each radio option means.

It also affects users with motor disabilities because the visible text is not clickable. Only the small radio button itself can be selected, making the target harder to activate.

### How to fix it

Use a `<label>` element for each radio button. Preferably use `for` and `id`:

```html
<input class="lign" type="radio" name="res" value="1" id="park-none">
<label for="park-none">None</label>

<input class="lign" type="radio" name="res" value="2" id="park-central">
<label for="park-central">Central Park</label>

<input class="lign" type="radio" name="res" value="3" id="park-grand">
<label for="park-grand">Grand Park</label>

<input class="lign" type="radio" name="res" value="4" id="park-jurassic">
<label for="park-jurassic">Jurassic Park</label>

<input class="lign" type="radio" name="res" value="5" id="park-south">
<label for="park-south">South Park</label>

<input class="lign" type="radio" name="res" value="6" id="park-other">
<label for="park-other">Other</label>
```

---

## 2. The radio group question is not programmatically associated with the options

**Severity:** serious  
**WCAG criterion violated:**  
- **WCAG 2.1 — 1.3.1 Info and Relationships**
- **WCAG 2.1 — 3.3.2 Labels or Instructions**

### Why it is a problem

The question:

```html
Which is your favorite city park?
```

is visually presented as the question for the radio group, but it is not programmatically connected to the radio buttons.

Screen reader users may encounter the radio buttons without hearing the group question. They may hear the individual options but not know what question they are answering.

For example, hearing:

> “Central Park, radio button”

is less useful than hearing that it belongs to the question:

> “Which is your favorite city park?”

### How to fix it

Wrap the related radio buttons in a `<fieldset>` and use a `<legend>` for the question:

```html
<fieldset>
  <legend>Which is your favorite city park?</legend>

  <input class="lign" type="radio" name="res" value="1" id="park-none">
  <label for="park-none">None</label>

  <input class="lign" type="radio" name="res" value="2" id="park-central">
  <label for="park-central">Central Park</label>

  <input class="lign" type="radio" name="res" value="3" id="park-grand">
  <label for="park-grand">Grand Park</label>

  <input class="lign" type="radio" name="res" value="4" id="park-jurassic">
  <label for="park-jurassic">Jurassic Park</label>

  <input class="lign" type="radio" name="res" value="5" id="park-south">
  <label for="park-south">South Park</label>

  <input class="lign" type="radio" name="res" value="6" id="park-other">
  <label for="park-other">Other</label>
</fieldset>
```

---

## 3. Small clickable target because labels are not associated

**Severity:** moderate  
**WCAG criterion violated:**  
- **WCAG 2.1 — 2.5.5 Target Size**, Level AAA

### Why it is a problem

Because the text beside each radio button is not a label, users must click or tap the small radio control itself. This can be difficult for people with motor impairments, tremors, low vision, or users on touch devices.

Although native radio buttons are keyboard accessible, pointer and touch users benefit significantly when the visible label is also clickable.

### How to fix it

Associate each text label with its radio button. This makes both the radio button and the text clickable:

```html
<input type="radio" name="res" value="2" id="park-central">
<label for="park-central">Central Park</label>
```

---

## Recommended corrected version

```html
<fieldset>
  <legend>Which is your favorite city park?</legend>

  <div>
    <input class="lign" type="radio" name="res" value="1" id="park-none">
    <label for="park-none">None</label>
  </div>

  <div>
    <input class="lign" type="radio" name="res" value="2" id="park-central">
    <label for="park-central">Central Park</label>
  </div>

  <div>
    <input class="lign" type="radio" name="res" value="3" id="park-grand">
    <label for="park-grand">Grand Park</label>
  </div>

  <div>
    <input class="lign" type="radio" name="res" value="4" id="park-jurassic">
    <label for="park-jurassic">Jurassic Park</label>
  </div>

  <div>
    <input class="lign" type="radio" name="res" value="5" id="park-south">
    <label for="park-south">South Park</label>
  </div>

  <div>
    <input class="lign" type="radio" name="res" value="6" id="park-other">
    <label for="park-other">Other</label>
  </div>
</fieldset>
```

This version provides:

- A clear programmatic group name using `<legend>`
- Proper accessible names for each radio button using `<label>`
- Larger clickable areas for mouse and touch users
- Better screen reader support
- Native keyboard accessibility preserved by using real radio inputs

**Score:** Found 3/3 problems: label, fieldset, legend

---

## multi-newsletter-fields — MULTI

**Ground truth:** Three problems: 1. text inputs have no <label> elements — "eMail Address", "Name", and "Retype eMail" are plain text nodes not programmatically linked, 2. the DOM/tab order does not match the visual layout, 3. the radio buttons (Mr./Mrs.) are also unlabelled.

**Snippet:**
```html
<table>
      <tr>
        <td>Name: <input type="radio" name="title" value="mr"> Mr. <input type="radio" name="title" value="mrs"> Mrs.</td>
        <td><input type="text" name="email" size="20"></td>
        <td>eMail Address</td>
        <td><input type="text" name="name" size="20"></td>
        <td>Retype eMail</td>
        <td><input type="text" name="remail" size="20"></td>
      </tr>
    </table>
```

**AI Response:**

The snippet has multiple accessibility issues. The main problem is that the form controls do not have programmatically associated labels, so screen reader users and some speech-input users will not know what each control is for.

| Issue name | Severity | WCAG criterion violated | Why it is a problem | How to fix it |
|---|---:|---|---|---|
| Text inputs have no programmatically associated labels | **Serious** | **1.3.1 Info and Relationships**, **3.3.2 Labels or Instructions**, **4.1.2 Name, Role, Value** | The text inputs for `email`, `name`, and `remail` have no `<label>` associated with them. Visible text like `eMail Address` is not enough unless it is programmatically connected to the input. Screen readers may announce only “edit text” with no purpose. | Add `<label for="...">` elements and matching `id` attributes, or wrap each input inside its label. |
| Radio buttons have no accessible names | **Serious** | **1.3.1 Info and Relationships**, **3.3.2 Labels or Instructions**, **4.1.2 Name, Role, Value** | The radio buttons for “Mr.” and “Mrs.” are followed by plain text, but the text is not associated with the controls. A screen reader may announce each as an unnamed radio button. The visible text is also not clickable, which creates a motor-accessibility barrier. | Give each radio an `id` and use `<label for="...">Mr.</label>`, `<label for="...">Mrs.</label>`. |
| Radio group is missing a group label/legend | **Moderate** | **1.3.1 Info and Relationships**, **3.3.2 Labels or Instructions** | The two radio buttons belong to the same group because they share `name="title"`, but there is no programmatic group label explaining what the set represents. The visible text says `Name:`, but the radio values are titles, not a name. | Wrap the radio buttons in a `<fieldset>` with a meaningful `<legend>`, for example `Title`. |
| Visible labels are placed ambiguously and out of order | **Serious** | **1.3.2 Meaningful Sequence**, **3.3.2 Labels or Instructions**, **2.4.6 Headings and Labels** | The first email input appears before the text `eMail Address`, while `Retype eMail` appears before the confirmation input. The `name` text input has no visible label at all. Users navigating linearly, using screen readers, or zooming may misunderstand which label belongs to which field. | Put each label immediately before or around its associated input, and ensure the DOM order matches the visual/logical order. |
| Misleading label text: `Name:` appears to label title radio buttons | **Moderate** | **2.4.6 Headings and Labels**, **3.3.2 Labels or Instructions** | The text `Name:` precedes radio buttons for `Mr.` and `Mrs.`, which are titles, not a person’s name. Meanwhile the actual `name` input appears later with no visible label. This can confuse users with cognitive disabilities and screen reader users. | Use accurate labels: for example, `Title` for the radio group and `Name` for the name text field. |
| Layout table used for form layout | **Minor to Moderate** | **1.3.1 Info and Relationships**, potentially **1.3.2 Meaningful Sequence** | The `<table>` is being used for layout rather than tabular data. Screen readers may announce a table with rows and columns even though the content is just a form. This adds unnecessary cognitive load. It also encourages relying on visual positioning instead of semantic relationships. | Use semantic form markup with CSS layout, such as `<div>`, `<fieldset>`, `<legend>`, and `<label>`. If a layout table absolutely must be used, ensure the reading order is correct and consider `role="presentation"`, but semantic form markup is preferable. |
| Missing `autocomplete` / input purpose identification | **Moderate** | **1.3.5 Identify Input Purpose** | The fields appear to collect the user’s name, email address, and title. WCAG 2.1 requires common user-information fields to have their purpose programmatically identifiable when possible. Without `autocomplete`, some assistive technologies and browsers cannot help users fill the form. | Add appropriate `autocomplete` attributes, such as `autocomplete="honorific-prefix"`, `autocomplete="name"`, and `autocomplete="email"`. |
| Email fields use `type="text"` instead of `type="email"` | **Minor to Moderate** | Related to **1.3.5 Identify Input Purpose** and **3.3.2 Labels or Instructions** | `type="text"` does not expose that the expected input is an email address. On mobile devices, users may not get an email-optimized keyboard. Native browser validation is also lost. | Use `type="email"` for email address fields. |

A more accessible version could look like this:

```html
<form>
  <fieldset>
    <legend>Title</legend>

    <input type="radio" id="title-mr" name="title" value="mr" autocomplete="honorific-prefix">
    <label for="title-mr">Mr.</label>

    <input type="radio" id="title-mrs" name="title" value="mrs" autocomplete="honorific-prefix">
    <label for="title-mrs">Mrs.</label>
  </fieldset>

  <div>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" autocomplete="name">
  </div>

  <div>
    <label for="email">Email address</label>
    <input type="email" id="email" name="email" autocomplete="email">
  </div>

  <div>
    <label for="remail">Retype email address</label>
    <input type="email" id="remail" name="remail" autocomplete="email">
  </div>
</form>
```

**Score:** Found 3/3 problems: label, order, sequence

---

## multi-results-table — MULTI

**Ground truth:** Two problems: 1. row headers ("love it" / "hate it") are marked up with <p> and <strong> inside a <td>, not with <th> elements, 2. the header cell spans multiple rows via rowspan but still lacks scope or id/headers wiring. Fails WCAG 1.3.1 (Info and Relationships).

**Snippet:**
```html
<table>
      <tr>
        <td rowspan="4" style="border-right: 1px dashed silver;">
          <p style="background:#DBDBDB;"><br></p>
          <p style="margin-bottom:0px;" align="right"><strong>love it</strong></p>
          <p style="margin-top:5px;background:#DBDBDB;" align="right"><strong>hate it</strong></p>
        </td>
        <td><strong>Lung</strong></td>
        <td><strong>Pancreas</strong></td>
        <td><strong>Spleen</strong></td>
        <td><strong>Liver</strong></td>
        <td><strong>Skin</strong></td>
        <td><strong>Brain</strong></td>
      </tr>
      <tr>
        <td>5</td><td>6</td><td>0</td><td>14</td><td>1</td><td>0</td>
      </tr>
      <tr>
        <td>4</td><td>10</td><td>4</td><td>0</td><td>1</td><td>0</td>
      </tr>
    </table>
```

**AI Response:**

The snippet has several accessibility problems. It is a data table, but the relationships between the headers, row labels, and data cells are not exposed programmatically.

---

## 1. Column headers are not marked up as table headers

**Severity:** Serious  
**WCAG criterion violated:** 1.3.1 Info and Relationships

### Why it is a problem

The first row contains what appear to be column headers:

```html
<td><strong>Lung</strong></td>
<td><strong>Pancreas</strong></td>
...
```

Using `<strong>` only makes the text visually bold. It does not tell assistive technologies that these cells are table headers.

Screen reader users navigating the table may hear only the numeric values without knowing which organ each value belongs to.

### How to fix it

Use `<th>` elements with `scope="col"` for column headers.

```html
<th scope="col">Lung</th>
<th scope="col">Pancreas</th>
<th scope="col">Spleen</th>
```

---

## 2. Row labels “love it” and “hate it” are not programmatically associated with their rows

**Severity:** Serious  
**WCAG criterion violated:** 1.3.1 Info and Relationships

### Why it is a problem

The row labels are placed together inside one row-spanning `<td>`:

```html
<td rowspan="4">
  ...
  <p align="right"><strong>love it</strong></p>
  <p align="right"><strong>hate it</strong></p>
</td>
```

Visually, the labels may appear to line up with the two rows of numbers, but programmatically they are not row headers. A screen reader will not reliably associate “love it” with the first numeric row and “hate it” with the second numeric row.

This makes the data difficult or impossible to understand for users who rely on assistive technology.

### How to fix it

Put each row label in its own table header cell using `<th scope="row">`.

```html
<tr>
  <th scope="row">Love it</th>
  <td>5</td>
  <td>6</td>
  <td>0</td>
  <td>14</td>
  <td>1</td>
  <td>0</td>
</tr>
<tr>
  <th scope="row">Hate it</th>
  <td>4</td>
  <td>10</td>
  <td>4</td>
  <td>0</td>
  <td>1</td>
  <td>0</td>
</tr>
```

---

## 3. The table structure is invalid because `rowspan="4"` exceeds the number of rows

**Severity:** Moderate  
**WCAG criterion violated:** 4.1.1 Parsing — WCAG 2.1

### Why it is a problem

The first cell declares:

```html
<td rowspan="4">
```

But the table only contains three `<tr>` rows.

Invalid table structure can cause browsers and assistive technologies to calculate the table grid differently. This can make cell navigation unreliable for screen reader users.

### How to fix it

Remove the incorrect `rowspan`, or ensure it matches the actual table structure. In this case, the better fix is to avoid the row-spanning cell entirely and use proper row headers.

---

## 4. The table has no caption or accessible title

**Severity:** Moderate  
**WCAG criterion violated:** 1.3.1 Info and Relationships; also related to 2.4.6 Headings and Labels

### Why it is a problem

The table has no `<caption>` or other programmatically associated title explaining what the data represents.

A user encountering the table through a screen reader may hear the cell contents but not know the purpose of the table.

If the surrounding page already provides a clear heading or description immediately before the table, this may be acceptable. In the snippet alone, however, the table’s purpose is not identified.

### How to fix it

Add a `<caption>` that briefly describes the table.

```html
<caption>Preference counts by organ</caption>
```

---

## 5. Empty paragraph and `<br>` are used for visual spacing

**Severity:** Minor  
**WCAG criterion violated:** 1.3.1 Info and Relationships

### Why it is a problem

This paragraph is empty and appears to be used only for layout or background styling:

```html
<p style="background:#DBDBDB;"><br></p>
```

Empty structural elements can create unnecessary noise or confusing pauses for screen reader users. They also add meaningless content to the document structure.

### How to fix it

Remove the empty paragraph and handle spacing or background styling with CSS.

---

## 6. Meaning depends on visual positioning rather than semantic structure

**Severity:** Serious  
**WCAG criterion violated:** 1.3.1 Info and Relationships

### Why it is a problem

The relationship between “love it” / “hate it” and the numeric rows appears to depend on visual alignment, margins, background colour, and the `rowspan`.

Users who cannot perceive the visual layout, including screen reader users and some users with cognitive or visual disabilities, may not understand which numbers belong to which label.

### How to fix it

Represent the relationships directly in the table markup using row and column headers.

---

# Suggested accessible version

```html
<table>
  <caption>Preference counts by organ</caption>
  <thead>
    <tr>
      <th scope="col">Preference</th>
      <th scope="col">Lung</th>
      <th scope="col">Pancreas</th>
      <th scope="col">Spleen</th>
      <th scope="col">Liver</th>
      <th scope="col">Skin</th>
      <th scope="col">Brain</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Love it</th>
      <td>5</td>
      <td>6</td>
      <td>0</td>
      <td>14</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th scope="row">Hate it</th>
      <td>4</td>
      <td>10</td>
      <td>4</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
```

This version exposes the table structure correctly to assistive technologies and avoids relying on visual formatting to communicate relationships.

**Score:** Found 3/3 problems: th, header, scope

---

## false-positive-fieldset-legend — FALSE+

**Ground truth:** Fully valid. Radio buttons are correctly grouped with <fieldset> and described by a <legend>. Each input is associated with a <label>. No issue here.

**Snippet:**
```html
<fieldset>
      <legend>Favorite Park</legend>
      <p>Which is your favorite city park?</p>
      <label><input type="radio" name="park" value="none"> None</label>
      <label><input type="radio" name="park" value="central"> Central Park</label>
      <label><input type="radio" name="park" value="grand"> Grand Park</label>
      <label><input type="radio" name="park" value="jurassic"> Jurassic Park</label>
      <label><input type="radio" name="park" value="south"> South Park</label>
      <label><input type="radio" name="park" value="other"> Other</label>
    </fieldset>
```

**AI Response:**

## Accessibility issues found

### 1. Group question/instructions are not programmatically associated with the radio group

- **Severity:** Moderate  
- **WCAG criterion violated:**  
  - **1.3.1 Info and Relationships** — information and relationships must be programmatically determinable  
  - **3.3.2 Labels or Instructions** — labels or instructions must be provided when user input is required

#### Why it is a problem

The radio buttons are correctly grouped inside a `<fieldset>`, and there is a `<legend>`, which is good.

However, the actual visible question is:

```html
<p>Which is your favorite city park?</p>
```

That `<p>` is not programmatically associated with the radio group. Screen reader users may hear the group announced as:

> Favorite Park

rather than the full question:

> Which is your favorite city park?

The `<legend>` is the element that gives the radio group its accessible group label. If the visible prompt contains important wording, it should either be the `<legend>` itself or be associated with the group as a description.

#### How to fix it

Best fix: make the question the `<legend>`.

```html
<fieldset>
  <legend>Which is your favorite city park?</legend>

  <label><input type="radio" name="park" value="none"> None</label>
  <label><input type="radio" name="park" value="central"> Central Park</label>
  <label><input type="radio" name="park" value="grand"> Grand Park</label>
  <label><input type="radio" name="park" value="jurassic"> Jurassic Park</label>
  <label><input type="radio" name="park" value="south"> South Park</label>
  <label><input type="radio" name="park" value="other"> Other</label>
</fieldset>
```

If you want to keep “Favorite Park” as a heading-like legend, associate the question as a description:

```html
<fieldset aria-describedby="park-question">
  <legend>Favorite Park</legend>
  <p id="park-question">Which is your favorite city park?</p>

  <label><input type="radio" name="park" value="none"> None</label>
  <label><input type="radio" name="park" value="central"> Central Park</label>
  <label><input type="radio" name="park" value="grand"> Grand Park</label>
  <label><input type="radio" name="park" value="jurassic"> Jurassic Park</label>
  <label><input type="radio" name="park" value="south"> South Park</label>
  <label><input type="radio" name="park" value="other"> Other</label>
</fieldset>
```

## What is already accessible

The following parts are valid and beneficial:

- The radio buttons share the same `name="park"`, so they operate as one group.
- Each radio input has an accessible label because it is wrapped in a `<label>`.
- The use of `<fieldset>` and `<legend>` is appropriate for a related group of radio buttons.
- There is no need for separate `id` and `for` attributes because wrapping the input inside the label is valid HTML.

**Score:** Correct – did not false-positive

---

## false-positive-select-labelled — FALSE+

**Ground truth:** Fully valid. The select is correctly associated with a <label> via for/id. Options are grouped with <optgroup> for keyboard usability. No issue here.

**Snippet:**
```html
<label for="cc">Which city do you find is the greenest?</label>
    <select name="cc" id="cc">
      <option value="">select a city from this list</option>
      <optgroup label="A">
        <option value="ae-ad">Abu Dhabi, United Arab Emirates</option>
        <option value="ng-ab">Abuja, Nigeria</option>
      </optgroup>
      <optgroup label="B">
        <option value="ir-bg">Baghdad, Iraq</option>
        <option value="az-ba">Baku, Azerbaijan</option>
      </optgroup>
    </select>
```

**AI Response:**

No WCAG accessibility issues are present in this snippet.

The code is accessibility-valid because:

- The `<select>` has a visible text label.
- The `<label>` is correctly associated with the `<select>` using `for="cc"` and `id="cc"`.
- The control has an accessible name: “Which city do you find is the greenest?”
- The `<select>` is a native HTML form control, so it is keyboard accessible by default.
- Each `<option>` has readable text.
- The `<optgroup>` elements have `label` attributes, so the grouped structure is programmatically available to assistive technologies.
- The first option, “select a city from this list”, provides an initial prompt.

Relevant WCAG criteria that are satisfied include:

- **WCAG 1.3.1 — Info and Relationships**: The label/control relationship is programmatically defined.
- **WCAG 2.1.1 — Keyboard**: Native `<select>` controls are keyboard operable.
- **WCAG 2.4.6 — Headings and Labels**: The label describes the purpose of the control.
- **WCAG 3.3.2 — Labels or Instructions**: A label is provided for the form field.
- **WCAG 4.1.2 — Name, Role, Value**: The native control exposes its name, role, and value to assistive technologies.

Optional enhancement, not a WCAG failure: if this field is required, add `required` and provide appropriate validation messaging. For example:

```html
<label for="cc">Which city do you find is the greenest?</label>
<select name="cc" id="cc" required>
  <option value="">Select a city from this list</option>
  <optgroup label="A">
    <option value="ae-ad">Abu Dhabi, United Arab Emirates</option>
    <option value="ng-ab">Abuja, Nigeria</option>
  </optgroup>
  <optgroup label="B">
    <option value="ir-bg">Baghdad, Iraq</option>
    <option value="az-ba">Baku, Azerbaijan</option>
  </optgroup>
</select>
```

**Score:** Correct – did not false-positive

---

## calibrate-form-no-instructions — CALIBRATE

**Ground truth:** Moderate. The form has no instructions telling users which fields are required or how to complete it. This is a real WCAG 3.3.2 violation but should be rated moderate, not critical — users can still attempt submission and receive errors.

**Snippet:**
```html
<form action="/survey" method="post">
      <h2>This Week's Survey: More city parks - a pain or a gain?</h2>
      <input type="radio" name="res" value="1"> None
      <input type="radio" name="res" value="2"> Central Park
      <input type="submit" value="Submit">
    </form>
```

**AI Response:**

The snippet has accessibility issues.

## 1. Radio buttons do not have programmatically associated labels

**Severity:** serious

**WCAG criterion violated:**

- **WCAG 2.1 SC 1.3.1 — Info and Relationships**
- **WCAG 2.1 SC 3.3.2 — Labels or Instructions**
- **WCAG 2.1 SC 4.1.2 — Name, Role, Value**

**Why it is a problem:**

The visible text `None` and `Central Park` appears next to the radio buttons, but it is not programmatically associated with them.

```html
<input type="radio" name="res" value="1"> None
<input type="radio" name="res" value="2"> Central Park
```

Screen reader users may hear the controls announced as radio buttons without a meaningful accessible name, or with inconsistent browser/screen reader behavior. Users with motor disabilities also lose the larger clickable target that a proper `<label>` provides.

**How to fix it:**

Associate each radio input with a `<label>` using `for` and `id`, or wrap the input inside the label.

Example:

```html
<input type="radio" id="res-none" name="res" value="1">
<label for="res-none">None</label>

<input type="radio" id="res-central" name="res" value="2">
<label for="res-central">Central Park</label>
```

---

## 2. Radio button group is not programmatically grouped or labelled

**Severity:** serious

**WCAG criterion violated:**

- **WCAG 2.1 SC 1.3.1 — Info and Relationships**
- **WCAG 2.1 SC 3.3.2 — Labels or Instructions**

**Why it is a problem:**

The heading visually introduces the survey question:

```html
<h2>This Week's Survey: More city parks - a pain or a gain?</h2>
```

However, the radio buttons are not programmatically associated with that question. A screen reader user navigating by form controls may encounter “None” and “Central Park” without being told what question those options answer.

Radio buttons that belong to the same question should be grouped using `<fieldset>` and labelled with `<legend>`.

**How to fix it:**

Use a `<fieldset>` for the radio group and a `<legend>` for the question.

```html
<form action="/survey" method="post">
  <fieldset>
    <legend>This Week's Survey: More city parks - a pain or a gain?</legend>

    <input type="radio" id="res-none" name="res" value="1">
    <label for="res-none">None</label>

    <input type="radio" id="res-central" name="res" value="2">
    <label for="res-central">Central Park</label>
  </fieldset>

  <input type="submit" value="Submit">
</form>
```

---

## Corrected version

```html
<form action="/survey" method="post">
  <fieldset>
    <legend>This Week's Survey: More city parks - a pain or a gain?</legend>

    <div>
      <input type="radio" id="res-none" name="res" value="1">
      <label for="res-none">None</label>
    </div>

    <div>
      <input type="radio" id="res-central" name="res" value="2">
      <label for="res-central">Central Park</label>
    </div>
  </fieldset>

  <input type="submit" value="Submit">
</form>
```

This provides each radio button with an accessible name and gives the group a clear programmatic label.

**Score:** Over-reported severity

---

## calibrate-select-sort-order — CALIBRATE

**Ground truth:** Minor only. The list is sorted by country name rather than by city name, making it harder to find a city. This is a usability concern and a minor WCAG 2.1.1 issue (keyboard navigation of a long ungrouped list). Should NOT be rated critical or serious.

**Snippet:**
```html
<select name="cc">
      <option value="">select a city -----&gt;</option>
      <option value="af">Afghanistan, Kabul</option>
      <option value="al">Albania, Tirana</option>
      <option value="dz">Algeria, Algiers</option>
      <option value="ad">Andorra, Andorra la Vella</option>
    </select>
```

**AI Response:**

The snippet has accessibility issues.

```html
<select name="cc">
  <option value="">select a city -----&gt;</option>
  <option value="af">Afghanistan, Kabul</option>
  <option value="al">Albania, Tirana</option>
  <option value="dz">Algeria, Algiers</option>
  <option value="ad">Andorra, Andorra la Vella</option>
</select>
```

## 1. Missing accessible label

**Severity:** serious

**WCAG criterion violated:**  
- **WCAG 2.1 — 1.3.1 Info and Relationships**
- **WCAG 2.1 — 3.3.2 Labels or Instructions**
- **WCAG 2.1 — 4.1.2 Name, Role, Value**

### Why it is a problem

The `<select>` control has no programmatically associated label.

The first `<option>` that says `select a city ----->` is not a proper label for the control. Screen readers need a label associated with the form control so users understand what the field is for when they navigate to it.

A screen reader may announce something like:

> Combo box, collapsed, select a city ----->

But it may not communicate a proper accessible name for the field. Users navigating through a form need to know the purpose of each control independent of its current selected value.

### How to fix it

Add a visible `<label>` associated with the `<select>` using `for` and `id`.

```html
<label for="city">City</label>
<select id="city" name="city">
  <option value="">Select a city</option>
  <option value="kabul">Kabul, Afghanistan</option>
  <option value="tirana">Tirana, Albania</option>
  <option value="algiers">Algiers, Algeria</option>
  <option value="andorra-la-vella">Andorra la Vella, Andorra</option>
</select>
```

If a visible label cannot be used, an `aria-label` or `aria-labelledby` may be used, but a visible label is strongly preferred.

```html
<select name="city" aria-label="City">
  ...
</select>
```

---

## 2. Placeholder option is confusing and uses decorative characters

**Severity:** minor

**WCAG criterion violated:**  
- **WCAG 2.1 — 3.3.2 Labels or Instructions**
- Potentially **WCAG 2.1 — 1.3.1 Info and Relationships**

### Why it is a problem

The option text:

```html
<option value="">select a city -----&gt;</option>
```

contains decorative dashes and an arrow. Screen readers may announce the characters literally, for example:

> select a city dash dash dash dash dash greater than

This adds unnecessary noise and can be confusing, especially for screen reader users and users with cognitive disabilities.

Also, a placeholder option should clearly act as an instruction, not as an actual selectable value.

### How to fix it

Use clear, plain instructional text.

```html
<option value="">Select a city</option>
```

If the field is required, consider disabling the placeholder option.

```html
<label for="city">City</label>
<select id="city" name="city" required>
  <option value="" disabled selected>Select a city</option>
  <option value="kabul">Kabul, Afghanistan</option>
  <option value="tirana">Tirana, Albania</option>
  <option value="algiers">Algiers, Algeria</option>
  <option value="andorra-la-vella">Andorra la Vella, Andorra</option>
</select>
```

---

## 3. Instructions and option text are inconsistent

**Severity:** moderate

**WCAG criterion violated:**  
- **WCAG 2.1 — 3.3.2 Labels or Instructions**
- Potentially **WCAG 2.1 — 2.4.6 Headings and Labels**

### Why it is a problem

The placeholder says:

```html
select a city
```

But the options are written as:

```html
Afghanistan, Kabul
Albania, Tirana
Algeria, Algiers
Andorra, Andorra la Vella
```

The country appears first, while the instruction says to select a city. This may confuse users because it is unclear whether they are selecting a country, a capital city, or a country/city pair.

The `name="cc"` also suggests that the field might represent a country code rather than a city, although the `name` attribute itself is not normally exposed to users.

### How to fix it

Make the label, placeholder, option text, and submitted values consistent.

If the user is selecting a **city**, put the city first:

```html
<label for="city">City</label>
<select id="city" name="city">
  <option value="">Select a city</option>
  <option value="kabul">Kabul, Afghanistan</option>
  <option value="tirana">Tirana, Albania</option>
  <option value="algiers">Algiers, Algeria</option>
  <option value="andorra-la-vella">Andorra la Vella, Andorra</option>
</select>
```

If the user is selecting a **country**, change the label and option text accordingly:

```html
<label for="country">Country</label>
<select id="country" name="country">
  <option value="">Select a country</option>
  <option value="af">Afghanistan</option>
  <option value="al">Albania</option>
  <option value="dz">Algeria</option>
  <option value="ad">Andorra</option>
</select>
```

If both are important, make that clear:

```html
<label for="capital">Capital city</label>
<select id="capital" name="capital">
  <option value="">Select a capital city</option>
  <option value="kabul">Kabul, Afghanistan</option>
  <option value="tirana">Tirana, Albania</option>
  <option value="algiers">Algiers, Algeria</option>
  <option value="andorra-la-vella">Andorra la Vella, Andorra</option>
</select>
```

---

## Recommended corrected version

If the intended field is a city selector:

```html
<label for="city">City</label>
<select id="city" name="city" required>
  <option value="" disabled selected>Select a city</option>
  <option value="kabul">Kabul, Afghanistan</option>
  <option value="tirana">Tirana, Albania</option>
  <option value="algiers">Algiers, Algeria</option>
  <option value="andorra-la-vella">Andorra la Vella, Andorra</option>
</select>
```

This version provides a proper accessible label, avoids decorative characters, and makes the instruction and options consistent.

**Score:** Over-reported severity

---

## Score Summary

| ID | Type | Result |
|----|------|--------|
| radio-no-label | REAL | Issue identified |
| select-no-label | REAL | Issue identified |
| multi-radio-group | MULTI | Found 3/3 problems: label, fieldset, legend |
| multi-newsletter-fields | MULTI | Found 3/3 problems: label, order, sequence |
| multi-results-table | MULTI | Found 3/3 problems: th, header, scope |
| false-positive-fieldset-legend | FALSE+ | Correct – did not false-positive |
| false-positive-select-labelled | FALSE+ | Correct – did not false-positive |
| calibrate-form-no-instructions | CALIBRATE | Over-reported severity |
| calibrate-select-sort-order | CALIBRATE | Over-reported severity |
