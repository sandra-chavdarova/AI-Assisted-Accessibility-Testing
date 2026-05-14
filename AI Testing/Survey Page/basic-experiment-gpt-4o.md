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

The provided HTML snippet does have some accessibility issues. Here are the issues identified:

1. **Issue Name: Missing Label for Radio Button**
   - Severity: Critical
   - WCAG Criterion Violated: 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions
   - Why it is a problem: Radio buttons without labels are problematic for users relying on screen readers because the users cannot comprehend the purpose of the radio button. Assistive technologies rely on labels to convey the meaning and function of form elements to users.
   - How to fix it: Add a `<label>` element associated with the radio button. This can be done by an explicit `for` attribute on the `<label>` corresponding to the `id` attribute on the `<input>`. Example:
     ```html
     <input class="lign" type="radio" name="res" value="1" id="res1">
     <label for="res1">Option Description</label>
     ```

2. **Issue Name: Lack of Context for Name Attribute**
   - Severity: Moderate
   - WCAG Criterion Violated: 2.4.6 Headings and Labels
   - Why it is a problem: While the `name` attribute groups radio buttons logically, without sufficient context or a grouping mechanism, screen reader users may not understand the relationship between multiple radio buttons in the same group.
   - How to fix it: Group related radio buttons using a `<fieldset>` and `<legend>` elements to provide context and ensure logical structuring. Example:
     ```html
     <fieldset>
       <legend>Choice Group</legend>
       <input class="lign" type="radio" name="res" value="1" id="res1">
       <label for="res1">Option Description</label>
       <!-- Additional radio buttons -->
     </fieldset>
     ```

Addressing these two key issues will enhance accessibility significantly, allowing users utilizing assistive technologies to interact with the form elements effectively and efficiently.

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

The provided HTML snippet has several accessibility issues. Below are the identified problems:

1. **Issue Name:** Placeholder Text in Option Element  
   **Severity:** Minor  
   **WCAG Criterion Violated:** 3.3.2 Labels or Instructions  
   **Why It Is a Problem:** The placeholder option "select a city ----->" does not serve as a valid instructional text for screen readers or indicate any necessity of selection to the users. It lacks a clear prompt to indicate a default selection or action needed.  
   **How to Fix It:** Use a `label` element that clearly explains the purpose of the dropdown. Additionally, use the `disabled` attribute on the placeholder option to prevent selection and indicate it’s not a valid choice: 
   ```html
   <select name="cc" aria-label="Select a city">
     <option value="" disabled selected>Select a city</option>
     <option value="af">Afghanistan, Kabul</option>
     <option value="al">Albania, Tirana</option>
     <option value="dz">Algeria, Algiers</option>
   </select>
   ```
   Ensure the dropdown has an associated label, either visually using a `label` element or non-visually using `aria-label`.

2. **Issue Name:** Lack of Descriptive Label  
   **Severity:** Serious  
   **WCAG Criterion Violated:** 1.3.1 Info and Relationships  
   **Why It Is a Problem:** The dropdown lacks an associated label, which is essential for users relying on assistive technologies to understand the context and purpose of form controls.  
   **How to Fix It:** Provide a `label` element associated with the `select` element. For users who use assistive technologies, it might look like this: 
   ```html
   <label for="city-select">Select your city:</label>
   <select name="cc" id="city-select">
     <option value="" disabled selected>Select a city</option>
     <option value="af">Afghanistan, Kabul</option>
     <option value="al">Albania, Tirana</option>
     <option value="dz">Algeria, Algiers</option>
   </select>
   ```

3. **Issue Name:** Missing Explicit Value for Placeholder  
   **Severity:** Moderate  
   **WCAG Criterion Violated:** None directly, but indirectly affects 3.3.2 Labels or Instructions  
   **Why It Is a Problem:** Though seemingly minor, if nothing is selected, and validation fails, no feedback will be relayed regarding the fact that nothing was chosen since the placeholder text is non-informative on submit.  
   **How to Fix It:** Implement frontend validation to ensure users make a selection, and customize feedback messages ensuring the user knows they must make a valid selection. You might leverage `required` attribute to enforce selection: 
   ```html
   <select name="cc" id="city-select" required aria-label="City select">
     <option value="" disabled selected>Select a city</option>
     <option value="af">Afghanistan, Kabul</option>
     <option value="al">Albania, Tirana</option>
     <option value="dz">Algeria, Algiers</option>
   </select>
   ```

These fixes ensure the dropdown is accessible, providing necessary information and interaction hints to users, including those with disabilities.

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

Upon reviewing the provided HTML snippet, there are several accessibility issues that need to be addressed:

1. **Missing Fieldset and Legend:**
   - **Severity:** Serious
   - **WCAG Criterion Violated:** 1.3.1 Info and Relationships
   - **Why it is a problem:** Screen reader users rely on fieldsets and legends to understand that a group of radio buttons is related and to understand the context of the radio button options. Without it, users may not understand what the radio buttons are referring to.
   - **How to fix it:** Enclose the radio buttons in a `<fieldset>` element, and use a `<legend>` element to define the question. Example:
     ```html
     <fieldset>
       <legend>Which is your favorite city park?</legend>
       <input class="lign" type="radio" name="res" value="1" id="none"><label for="none">None</label>
       <input class="lign" type="radio" name="res" value="2" id="central"><label for="central">Central Park</label>
       <input class="lign" type="radio" name="res" value="3" id="grand"><label for="grand">Grand Park</label>
       <input class="lign" type="radio" name="res" value="4" id="jurassic"><label for="jurassic">Jurassic Park</label>
       <input class="lign" type="radio" name="res" value="5" id="south"><label for="south">South Park</label>
       <input class="lign" type="radio" name="res" value="6" id="other"><label for="other">Other</label>
     </fieldset>
     ```

2. **Missing Labels:**
   - **Severity:** Critical
   - **WCAG Criterion Violated:** 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions
   - **Why it is a problem:** Users who rely on assistive technologies cannot associate the radio button with its corresponding label since there are no `<label>` elements explicitly connected to each input.
   - **How to fix it:** Use the `<label>` element and `for` attribute to associate each radio button with its corresponding label. The `id` of the input should match the `for` attribute of the label. Example is included in the above `fieldset` example.

3. **Improper Class Name for Styling:**
   - **Severity:** Minor
   - **WCAG Criterion Violated:** This is more a best practice issue, not directly tied to a specific WCAG criterion, but relates to 3.2.4 Consistent Identification.
   - **Why it is a problem:** The class name "lign" doesn't communicate its purpose for styling or functionality, which can be difficult for developers to maintain or extend the code in future.
   - **How to fix it:** Consider renaming the class to something more meaningful, like `radio-option` or `park-choice`, to better communicate its use.

These improvements will significantly enhance the accessibility and usability of the form for all users, ensuring compliance with WCAG standards.

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

This HTML snippet exhibits several accessibility issues. Let's identify each one:

### Issue 1: Lack of Table Structure Semantics
- **Severity**: Moderate
- **WCAG Criterion Violated**: 1.3.1 Info and Relationships
- **Why it is a problem**: The `<table>` element is being used for layout purposes without proper headers, which could mislead screen readers and other assistive technologies about the content structure.
- **How to fix it**: If the table is solely for layout purposes, consider using CSS for styling instead and remove the `<table>` tag. If it is intended as a data table, proper use of `<th>` elements for headers should be employed.

### Issue 2: Missing Labels for Inputs
- **Severity**: Critical
- **WCAG Criterion Violated**: 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions
- **Why it is a problem**: Inputs like email, name, and retype email have no associated `<label>` elements or ARIA attributes, which means screen readers won't be able to announce the purpose of each input field correctly.
- **How to fix it**: Use the `<label>` element with the `for` attribute pointing to the corresponding input `id`. For the radio buttons, label each button appropriately.

### Issue 3: Ambiguous Input Order
- **Severity**: Serious
- **WCAG Criterion Violated**: 3.2.3 Consistent Navigation
- **Why it is a problem**: The order of elements (inputs and their descriptions) is inconsistent and may result in a confusing experience for screen reader users.
- **How to fix it**: Ensure that each label and input follow a logical order where the label is immediately before its corresponding input for comprehensible navigation.

### Issue 4: Missing Group Label for Radio Inputs
- **Severity**: Serious
- **WCAG Criterion Violated**: 3.3.2 Labels or Instructions
- **Why it is a problem**: The radio buttons require a group label so users understand they form a single group and must select one option.
- **How to fix it**: Wrap the radio buttons and their "Name:" label in a fieldset, and use a `<legend>` tag for the fieldset to describe the grouped inputs.

Here's one way the code could be modified to address these issues:

```html
<form>
  <fieldset>
    <legend>Title</legend>
    <input type="radio" id="mr" name="title" value="mr">
    <label for="mr">Mr.</label>
    <input type="radio" id="mrs" name="title" value="mrs">
    <label for="mrs">Mrs.</label>
  </fieldset>

  <div>
    <label for="email">eMail Address</label>
    <input type="text" id="email" name="email" size="20">
  </div>

  <div>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" size="20">
  </div>

  <div>
    <label for="remail">Retype eMail</label>
    <input type="text" id="remail" name="remail" size="20">
  </div>
</form>
```

This revision uses `fieldset` and `label` elements to properly associate text with the input fields, improving both semantics and accessibility.

**Score:** Found 2/3 problems: label, order

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

The provided HTML snippet has several accessibility issues that need to be addressed to ensure compliance with WCAG 2.1 standards.

1. **Missing Table Headers**
   - **Severity:** Serious
   - **WCAG Criterion Violated:** 1.3.1 Info and Relationships
   - **Why it is a problem:** The table is missing `<th>` elements to specify that the cells in the first row of each column are headers. Without proper table headers, users relying on assistive technologies (e.g., screen readers) might not understand the relationship between table headers and their corresponding data cells, affecting their ability to interpret the table information correctly.
   - **How to fix it:** Use `<th>` elements in place of `<td>` for the header row. Additionally, specify a scope attribute where appropriate (e.g., `scope="col"`).

     ```html
     <tr>
       <td rowspan="4" style="border-right: 1px dashed silver;">
         <p style="background:#DBDBDB;"><br></p>
         <p style="margin-bottom:0px;" align="right"><strong>love it</strong></p>
         <p style="margin-top:5px;background:#DBDBDB;" align="right"><strong>hate it</strong></p>
       </td>
       <th scope="col"><strong>Lung</strong></th>
       <th scope="col"><strong>Pancreas</strong></th>
       <th scope="col"><strong>Spleen</strong></th>
       <th scope="col"><strong>Liver</strong></th>
       <th scope="col"><strong>Skin</strong></th>
       <th scope="col"><strong>Brain</strong></th>
     </tr>
     ```

2. **Non-semantic use of `<strong>`**
   - **Severity:** Minor
   - **WCAG Criterion Violated:** Not directly violating any WCAG norms, but related to 4.1.2 Name, Role, Value
   - **Why it is a problem:** The `<strong>` tag is correctly used semantically to indicate importance, but if not stylistic, could be misinterpreted visually.
   - **How to fix it:** Evaluate if the `<strong>` is needed to indicate emphasis. If it serves no semantic purpose, it can be removed or replaced with CSS.

3. **Use of `align` Attribute (Deprecated)**
   - **Severity:** Minor
   - **WCAG Criterion Violated:** Not directly a WCAG violation, but relates to 1.3.1 Info and Relationships as using CSS is the recommended practice.
   - **Why it is a problem:** The `align` attribute is a deprecated HTML attribute. Its use is discouraged in favor of CSS for styling.
   - **How to fix it:** Replace the `align` attribute with the corresponding CSS property. For example, use `text-align:right;` inside a `style` attribute or external CSS stylesheet.

     ```html
     <p style="text-align:right; margin-bottom:0px;"><strong>love it</strong></p>
     <p style="text-align:right; margin-top:5px; background:#DBDBDB;"><strong>hate it</strong></p>
     ```

4. **Empty Paragraph Tags for Spacing**
   - **Severity:** Minor
   - **WCAG Criterion Violated:** 1.3.1 Info and Relationships
   - **Why it is a problem:** Using empty paragraph tags for spacing is semantically incorrect and can be problematic for screen readers, which might interpret these as empty elements, causing confusion.
   - **How to fix it:** Use CSS for spacing instead of empty paragraph tags. You can create spacing using padding or margin on adjacent elements.

   Overall, while the seriousness of these issues varies, addressing them will improve usability and compliance with web accessibility guidelines.

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

This HTML snippet is relatively straightforward, but it does have a few accessibility issues. Here's a concise evaluation based on WCAG 2.1 guidelines:

1. **Issue Name: Missing Input Labels Association**
   - **Severity:** Minor
   - **WCAG Criterion Violated:** 1.3.1 Info and Relationships
   - **Why it is a Problem:** While the `<label>` elements are present and wrap around the input elements, it's still good practice to ensure that each input element's `id` attribute is uniquely associated with its corresponding `<label>` for enhanced clarity and focus control.
   - **How to Fix it:** Add an `id` to each `<input>` element and use the `for` attribute in the `<label>` to associate labels explicitly with their inputs. For example:
     ```html
     <label for="park-none"><input type="radio" id="park-none" name="park" value="none"> None</label>
     ```

2. **Issue Name: Use of Placeholder "Jurassic Park"**
   - **Severity:** Minor
   - **WCAG Criterion Violated:** 3.1.5 Readability (AAA level - this is more about best practice than strict compliance at the AA level)
   - **Why it is a Problem:** "Jurassic Park" might not be an actual park but a fictional one, which might confuse some users if the context is not clear, especially those with cognitive disabilities.
   - **How to Fix it:** Clarify or validate if "Jurassic Park" should be listed within the options. Removing or changing it to a real option would eliminate any potential confusion.

3. **Issue Name: Lack of Context for "Other" Option**
   - **Severity:** Moderate
   - **WCAG Criterion Violated:** 3.3.2 Labels or Instructions
   - **Why it is a Problem:** Selecting "Other" might imply a subsequent action or input opportunity that isn't described or offered in this snippet, potentially leaving users wondering what to do next.
   - **How to Fix it:** Provide additional guidance or ensure that if "Other" is selected, a text input or descriptive prompt appears for further specification. This feedback isn't directly visible in the input but contributes overall to clarity.

4. **Issue Name: No default selected option**
   - **Severity:** Minor
   - **WCAG Criterion Violated:** Not directly a WCAG violation but a usability best practice for ease of use.
   - **Why it is a Problem:** While users can select an option, starting with a default choice can enhance usability for those with motor disabilities by reducing the need for an extra input action.
   - **How to Fix it:** Consider setting a sensible default selection marked with the `checked` attribute.

In summary, while the provided HTML is mostly functional, these minor tweaks could offer improvements in user experience and compliance, aligning with good practices and enhancing the site's accessibility.

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

Here's an evaluation of the provided HTML snippet for potential accessibility issues:

### Issue 1: Placeholder Option
- **Severity**: Moderate
- **WCAG Criterion Violated**: 3.3.2 Labels or Instructions
- **Why it is a problem**: The first `<option>` element acts as a placeholder but does not clearly indicate that it is not a valid choice. This can lead to confusion for users relying on screen readers, as they might perceive it as an option they can select.
- **How to fix it**: Add the `disabled` and `hidden` attributes to the placeholder option to prevent it from being selected and to indicate that it is not a valid choice. For example, `<option value="" disabled hidden>Select a city from this list</option>`.

### Issue 2: Meaningful Sequence
- **Severity**: Minor
- **WCAG Criterion Violated**: 1.3.2 Meaningful Sequence
- **Why it is a problem**: The `<optgroup>` elements are labeled as "A" and "B" respectively, which only categorizes cities alphabetically. While this is not inherently wrong, the labels could be more descriptive to aid users who may not immediately understand that these refer to alphabetical grouping.
- **How to fix it**: Ensure the optgroup labels are descriptive and truly aid in navigation or categorization, such as "Cities starting with A" and "Cities starting with B," if it better informs users of the actual intent.

### Issue 3: Absence of Further Descriptive Information
- **Severity**: Minor
- **WCAG Criterion Violated**: Advisory improvement (not a specific WCAG failure, but relates to 2.4.6 Headings and Labels)
- **Why it is a problem**: Users who rely on screen readers might benefit from additional contextual help or instructions about the purpose of choosing the "greenest" city.
- **How to fix it**: Consider adding `aria-describedby` or a help tooltip providing users with clear instructions on what "greenest" refers to in this context (e.g., number of parks, sustainability practices, etc.).

### Issue 4: Consistency in Language and Capitalization
- **Severity**: Minor
- **WCAG Criterion Violated**: 3.1.4 Language of Parts (Advisory improvement)
- **Why it is a problem**: The language in the option values does not indicate any issue in this snippet, but inconsistent capitalization in text can potentially reduce readability. For consistency, ensure uniform capitalization where appropriate.
- **How to fix it**: Keep option values consistently capitalized, e.g., ensuring options are title-cased for better readability and consistency (e.g., "Select A City From This List").

Ultimately, while there are minor improvements suggested, the semantic structure of the markup with `<label>`, `<select>`, and `<option>` elements is fundamentally correct and properly associated, ensuring basic accessibility to users. Consider these refinements for an enhanced user experience.

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

The provided HTML snippet has several accessibility issues that should be addressed to ensure WCAG 2.1 compliance. Here are the identified issues:

1. **Issue Name:** Missing Labels for Radio Buttons
   - **Severity:** Critical
   - **WCAG Criterion Violated:** 1.3.1 Info and Relationships; 4.1.2 Name, Role, Value
   - **Why it is a problem:** Screen readers rely on labels to announce the options available to a user. Without explicit labels, users of assistive technology may not understand the context or the specific options of the radio buttons within the survey.
   - **How to fix it:** Use `<label>` elements to associate each radio button with a descriptive text. Example:
     ```html
     <label>
       <input type="radio" name="res" value="1"> None
     </label>
     <label>
       <input type="radio" name="res" value="2"> Central Park
     </label>
     ```

2. **Issue Name:** Missing Grouping for Radio Buttons
   - **Severity:** Serious
   - **WCAG Criterion Violated:** 1.3.1 Info and Relationships; 2.4.6 Headings and Labels
   - **Why it is a problem:** Radio buttons that are part of a related set should be grouped together to convey their relationship to users. Visual users can clearly see the relationship, but users relying on screen readers might not.
   - **How to fix it:** Use the `<fieldset>` and `<legend>` elements to group radio buttons and provide a context:
     ```html
     <form action="/survey" method="post">
       <h2>This Week's Survey: More city parks - a pain or a gain?</h2>
       <fieldset>
         <legend>Select a park:</legend>
         <label>
           <input type="radio" name="res" value="1"> None
         </label>
         <label>
           <input type="radio" name="res" value="2"> Central Park
         </label>
       </fieldset>
       <input type="submit" value="Submit">
     </form>
     ```

3. **Issue Name:** Inconsistent Language in Survey Title vs. Options
   - **Severity:** Minor
   - **WCAG Criterion Violated:** 3.1.2 Language of Parts
   - **Why it is a problem:** The survey's title suggests soliciting opinions on more parks, yet the options provided appear to be selecting a specific park rather than an opinion stance (e.g., liking or disliking parks). This inconsistency can lead to confusion, especially for users with cognitive disabilities.
   - **How to fix it:** Either adjust the question to reflect the choice being made or the options to reflect opinions about parks, depending on the survey's actual intent. Ensure consistency:
     ```html
     <form action="/survey" method="post">
       <h2>Which park do you prefer to visit the most?</h2>
       <!-- OR reframe options to reflect opinions as suggested -->
       <h2>This Week's Survey: Is having more city parks beneficial?</h2>
       ```


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

The provided HTML snippet is a `<select>` dropdown intended for selecting a city. Let's evaluate it for accessibility issues.

1. **Issue name:** Placeholder Text as Initial Option
   - **Severity:** Serious
   - **WCAG criterion violated:** 3.3.2 Labels or Instructions
   - **Why it is a problem:** The first `<option>` uses placeholder text ("select a city ---->") with artificial pointers. This can be confusing for screen reader users because they might not understand it as an instruction or a selectable option. Additionally, it does not convey the required information or purpose clearly.
   - **How to fix it:** Use a more informative label and consider using the `disabled` attribute for non-selectable placeholder options. Also, visually simplify the placeholder for clarity.
     ```html
     <option value="" disabled selected>Select a city</option>
     ```

2. **Issue name:** Lack of a `<label>` Element
   - **Severity:** Serious
   - **WCAG criterion violated:** 1.3.1 Info and Relationships
   - **Why it is a problem:** A `<select>` element typically requires an associated `<label>` to ensure users understand its purpose, especially those using assistive technologies.
   - **How to fix it:** Add a `<label>` element that explicitly explains the purpose of the dropdown menu and associate it using the `for` attribute.
     ```html
     <label for="city-select">City Selection:</label>
     <select name="cc" id="city-select">
       ...
     </select>
     ```

These issues, once remedied, will contribute to a better user experience for people using assistive technologies, as well as improve overall compliance with WCAG 2.1 standards.

**Score:** Over-reported severity

---

## Score Summary

| ID | Type | Result |
|----|------|--------|
| radio-no-label | REAL | Issue identified |
| select-no-label | REAL | Issue identified |
| multi-radio-group | MULTI | Found 3/3 problems: label, fieldset, legend |
| multi-newsletter-fields | MULTI | Found 2/3 problems: label, order |
| multi-results-table | MULTI | Found 3/3 problems: th, header, scope |
| false-positive-fieldset-legend | FALSE+ | Correct – did not false-positive |
| false-positive-select-labelled | FALSE+ | Correct – did not false-positive |
| calibrate-form-no-instructions | CALIBRATE | Over-reported severity |
| calibrate-select-sort-order | CALIBRATE | Over-reported severity |
