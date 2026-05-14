# Basic Experiment – Blind Trap Analysis

> The AI was given raw HTML snippets with no hints about what is wrong.
> This tests genuine reasoning, not confirmation of a given answer.

---

## real-placeholder-only — REAL

**Ground truth:** No label — placeholder is the only name source. Fails WCAG 1.3.1 and 3.3.2.

**Snippet:**
```html
<input type="text" placeholder="Enter your full name" />
```

**AI Response:**

The provided HTML snippet contains a single `<input>` element with a `placeholder` attribute. Upon examining the code, there are accessibility issues that need to be addressed:

1. **Issue Name:** Lack of Label
   - **Severity:** Critical
   - **WCAG Criterion Violated:** 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions
   - **Why it is a Problem:** The input field lacks an associated `<label>` element. The `placeholder` attribute is not an acceptable substitute for a label because placeholder text can disappear when users start typing, and it might not be announced by screen readers as a label. This makes it difficult for users with visual disabilities to understand the purpose of the input field.
   - **How to Fix it:** Associate the input with a `<label>` element by using the `for` attribute to point to the input’s `id`. For example:

     ```html
     <label for="fullName">Full Name</label>
     <input type="text" id="fullName" placeholder="Enter your full name" />
     ```
   
2. **Issue Name:** Placeholder Misuse
   - **Severity:** Moderate
   - **WCAG Criterion Violated:** 1.4.3 Contrast (Minimum), Usability Concerns
   - **Why it is a Problem:** Placeholder text typically has low contrast, which can make it difficult to read for users with visual impairments, particularly those with low vision. It should not be relied upon to convey essential information because it might not meet contrast requirements.
   - **How to Fix it:** Ensure that placeholder text meets the minimum contrast ratio (4.5:1). Additionally, avoid using placeholder text as the sole means of conveying essential information about the input field. Instead, ensure that critical information is always visible, such as through labels or other adjacent help text.

By addressing these issues, you can enhance the accessibility and usability of the input field for all users.

**Score:** Issue identified

---

## multi-radio-group — MULTI

**Ground truth:** Three problems: (1) radio inputs have no <label> elements, (2) no <fieldset>/<legend> grouping the question, (3) values "1/2/3" give screen readers no context about what is being selected.

**Snippet:**
```html
<input type="radio" name="q1" value="1">
      <input type="radio" name="q1" value="2">
      <input type="radio" name="q1" value="3">
```

**AI Response:**

Here is an evaluation of the provided HTML snippet for accessibility issues:

1. **Issue Name:** Missing Labels for Form Controls
   - **Severity:** Critical
   - **WCAG Criterion Violated:** 1.3.1 Info and Relationships and 4.1.2 Name, Role, Value
   - **Why it is a Problem:** The radio buttons are input elements that should have associated labels so users, especially those using screen readers, can understand what each option represents. Without labels, users might not be able to determine what each radio button represents, leading to confusion and incorrect form submissions.
   - **How to Fix it:** Add `<label>` elements with descriptive text for each radio button. For example:
     ```html
     <label><input type="radio" name="q1" value="1"> Option 1</label>
     <label><input type="radio" name="q1" value="2"> Option 2</label>
     <label><input type="radio" name="q1" value="3"> Option 3</label>
     ```

2. **Issue Name:** Lack of Grouping for Option Set
   - **Severity:** Serious
   - **WCAG Criterion Violated:** 1.3.1 Info and Relationships
   - **Why it is a Problem:** Radio buttons are typically used for selecting one option from a known set, and the logical grouping of these buttons helps users understand the options that belong together. When radio buttons are not grouped with a `<fieldset>` along with a `<legend>`, it can be difficult for users, especially those using assistive technologies, to comprehend the choices that are meant to be selected mutually exclusively.
   - **How to Fix it:** Use a `<fieldset>` to group related radio buttons and a `<legend>` to provide a description of the group:
     ```html
     <fieldset>
       <legend>Question 1</legend>
       <label><input type="radio" name="q1" value="1"> Option 1</label>
       <label><input type="radio" name="q1" value="2"> Option 2</label>
       <label><input type="radio" name="q1" value="3"> Option 3</label>
     </fieldset>
     ```

By addressing these critical and serious issues, you ensure the form controls are accessible and understandable, providing a better user experience for individuals with disabilities.

**Score:** Found 3/3 problems: label, fieldset, legend

---

## multi-link-trap — MULTI

**Ground truth:** Three problems: (1) img has no alt attribute, (2) onfocus=blur() makes element keyboard-unreachable, (3) javascript:location.href breaks history and screen reader link destination.

**Snippet:**
```html
<a href="javascript:location.href='home.html';" onfocus="blur();"><img src="./img/nav_home.gif" width="88" height="27" border="0px"></a>
```

**AI Response:**

Certainly! Analyzing the provided HTML code snippet reveals several accessibility issues. Here is the breakdown:

1. **Issue Name**: JavaScript URL in Anchor
   - **Severity**: Critical
   - **WCAG Criterion Violated**: 2.1.1 Keyboard (Level A)
   - **Why it is a problem**: The `href` attribute uses `javascript:` which may not be accessible for all users and can disrupt standard web navigation features, especially for those who rely on keyboard navigation or assistive technologies.
   - **How to fix it**: Use a standard link with a direct URL for navigation, such as `<a href="home.html">`, instead of using JavaScript for navigation within the `href` attribute.

2. **Issue Name**: `onfocus="blur()"`
   - **Severity**: Critical
   - **WCAG Criterion Violated**: 2.1.1 Keyboard (Level A)
   - **Why it is a problem**: Removing focus from a link upon receiving focus makes it impossible for keyboard users and screen reader users to interact with the link. It essentially makes the link unreachable.
   - **How to fix it**: Remove the `onfocus="blur();"`. Ensure the link can receive focus so keyboard users can navigate to and activate the link.

3. **Issue Name**: Missing Alt Attribute in Image
   - **Severity**: Serious
   - **WCAG Criterion Violated**: 1.1.1 Non-text Content (Level A)
   - **Why it is a problem**: The image used within the link does not provide alternative text. This means screen readers will not convey any meaningful information about the link's purpose to users with visual impairments.
   - **How to fix it**: Add an `alt` attribute to the image with a concise description of the link's purpose. For example, `<img src="./img/nav_home.gif" alt="Home" width="88" height="27" border="0">`.

4. **Issue Name**: Inline Styles
   - **Severity**: Minor
   - **WCAG Criterion Violated**: 1.3.1 Info and Relationships (Level A)
   - **Why it is a problem**: The use of inline styles (like `border="0px"`) can lead to inconsistent styling across a website and may not be easily adaptable by users relying on custom style sheets to improve readability or understanding.
   - **How to fix it**: Migrate styles to a CSS stylesheet and use semantic HTML/CSS conventions, such as applying a `class` with styles defined elsewhere.

By addressing these issues, the HTML snippet will become more accessible and compliant with WCAG 2.1 standards.

**Score:** Found 3/3 problems: alt, blur, javascript

---

## false-positive-region — FALSE+

**Ground truth:** Fully valid. aria-labelledby correctly references the h2 id. No issue here.

**Snippet:**
```html
<section aria-labelledby="contact-title">
        <h2 id="contact-title">Contact Information</h2>
        <p>Please fill in all fields below.</p>
      </section>
```

**AI Response:**

The provided HTML snippet has been evaluated for accessibility issues according to WCAG 2.1 criteria, and here are the findings:

Overall, this specific snippet does not exhibit any explicit accessibility problems. The code is valid based on the information given:

1. **Use of `aria-labelledby` with `id` Attribute**:
   - The `section` element uses `aria-labelledby` referencing the `h2` element with a corresponding `id`. This setup is correct as per WCAG guidelines, which allows screen readers to announce the heading as the label for the section.

2. **Heading Structure**:
   - The `h2` element is properly used for the "Contact Information" heading, which denotes a new section or topic.

3. **General Considerations**:
   - Assuming no additional context is provided or omitted, there are no issues in terms of color contrast, focus order, interactive elements, or media content since they are not part of this snippet.

No accessibility barriers have been identified in this specific segment. However, it is crucial to remember that any accessible implementation also depends on how this snippet is integrated with the rest of the webpage. Therefore, perform a comprehensive audit throughout the entire page to ensure complete accessibility compliance.

**Score:** Correct – did not false-positive

---

## false-positive-label-wrap — FALSE+

**Ground truth:** Fully valid. Input is wrapped inside its label — no for/id needed. No issue here.

**Snippet:**
```html
<label>
        Email address
        <input type="email" name="email" />
      </label>
```

**AI Response:**

Upon examining the provided HTML snippet, there are no accessibility issues present, and the code is valid given the context provided. Here’s why:

1. **Labeling**: The `<label>` element is correctly associated with the `<input>` element by nesting, which provides a clear text label for screen readers and improves clickability for users with motor impairments. This is compliant with WCAG 2.1 Success Criterion 3.3.2: Labels or Instructions.

2. **Input Type**: The input type is set to "email", which provides semantic information to browsers and assistive technologies about the kind of data expected. It also enables built-in validation and potentially provides an appropriate virtual keyboard layout on touch devices, which aligns with best practices for Form Input fields under WCAG.

Since the code snippet properly includes a label for the email input field and semantically correct markup, it is WCAG compliant based on the visible content. If there were additional context or specific requirements, other issues could potentially arise, but with the information given, it adheres to accessibility standards.

**Score:** Correct – did not false-positive

---

## calibrate-redundant-role — CALIBRATE

**Ground truth:** Minor only. role="button" on a <button> is redundant but causes no harm. Should not be reported as serious or critical.

**Snippet:**
```html
<button role="button" type="submit">Submit</button>
```

**AI Response:**

Upon examining the provided HTML snippet, there is one potential accessibility concern:

### Issue Name: Redundant Role Attribute

- **Severity**: Minor
- **WCAG Criterion Violated**: None explicitly, but relates to best practices and general understandability.
- **Why it is a Problem**: The `role="button"` attribute is not necessary here because the element in question is a `<button>`, which already has an implicit `button` role. Redundantly specifying the role may not directly lead to a violation, but it can clutter the code and potentially confuse developers who are maintaining it, especially if roles are manually overwritten incorrectly in more complex scenarios.
- **How to Fix it**: Remove the `role="button"` attribute as it is redundant for `<button>` elements:
  ```html
  <button type="submit">Submit</button>
  ```

This code, after removing the redundant role, is valid and should work correctly for users relying on assistive technologies, as well as meet relevant WCAG criteria when considered in isolation.

**Score:** Severity calibrated correctly

---

## calibrate-opacity-error — CALIBRATE

**Ground truth:** Serious. opacity:0 hides visually but NOT from the accessibility tree — screen readers still announce the error even though it is invisible on screen.

**Snippet:**
```html
<span style="opacity: 0;">Error: this field is required</span>
```

**AI Response:**

Examining the provided HTML snippet reveals the following accessibility issue:

1. **Hidden Content with No Access for Assistive Technologies**
   - **Severity**: Critical
   - **WCAG Criterion Violated**: 1.3.1 Info and Relationships and 1.4.3 Contrast (Minimum)
   - **Why it is a problem**: The content inside the `<span>` element is styled with `opacity: 0;`, effectively making it invisible to all users, including those using assistive technologies like screen readers. This means that users with visual impairments, who rely on screen readers to access content, will miss important error feedback, as the screen reader will also skip over it, considering it as invisible or decorative content.
   - **How to fix it**: Ensure the text is perceivable by screen readers even if it needs to be visually hidden from sighted users. This can be achieved by using techniques such as visually hiding the text while keeping it available to screen readers. An example approach is using CSS techniques like:
     ```css
     .visually-hidden {
       position: absolute;
       width: 1px;
       height: 1px;
       margin: -1px;
       padding: 0;
       border: 0;
       clip: rect(0, 0, 0, 0);
       overflow: hidden;
     }
     ```
     Applying this class to the `<span>` element will hide it visually but make it accessible to screen readers:
     ```html
     <span class="visually-hidden">Error: this field is required</span>
     ```

This change ensures that all critical information is available to users with disabilities who rely on assistive technologies, thus enhancing the accessibility of the web content.

**Score:** Issue identified

---

## Score Summary

| ID | Type | Result |
|----|------|--------|
| real-placeholder-only | REAL | Issue identified |
| multi-radio-group | MULTI | Found 3/3 problems: label, fieldset, legend |
| multi-link-trap | MULTI | Found 3/3 problems: alt, blur, javascript |
| false-positive-region | FALSE+ | Correct – did not false-positive |
| false-positive-label-wrap | FALSE+ | Correct – did not false-positive |
| calibrate-redundant-role | CALIBRATE | Severity calibrated correctly |
| calibrate-opacity-error | CALIBRATE | Issue identified |
