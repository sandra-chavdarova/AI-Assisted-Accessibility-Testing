# Visual Screenshot Accessibility Trap Analysis

> Screenshots are taken from the W3C "Before and After" demo:
> - Inaccessible: https://www.w3.org/WAI/demos/bad/before/survey.html
> - Accessible:   https://www.w3.org/WAI/demos/bad/after/survey.html

> The AI receives **only the image** — no type label, no ground truth.

---

## full-page-before — FULL_PAGE

**Image:** `survey-before.png`

**Ground truth:** Inaccessible version. Known issues: radio buttons and select dropdown have no <label> elements, radio group lacks <fieldset>/<legend>, table row headers ("love it"/"hate it") use <td>+<strong> instead of <th>, newsletter inputs are unlabelled, no form instructions. AI should surface multiple serious/critical issues.

**AI Response:**

Here are the accessibility issues identified in the screenshot:

1. **Use of Color for Information**
   - **Severity**: Serious
   - **WCAG 2.1 Criterion**: 1.4.1 (Use of Color)
   - **Problem**: The radio buttons appear to have indications based on color alone, which users with color blindness may not perceive.
   - **Fix**: Ensure that information dependent on color is also conveyed via text or another means that does not rely on color.

2. **Form Labeling**
   - **Severity**: Serious
   - **WCAG 2.1 Criterion**: 1.3.1 (Info and Relationships), 3.3.2 (Labels or Instructions)
   - **Problem**: The form fields for name and email do not appear to have clear labels, making it difficult for screen readers to convey the necessary information to users.
   - **Fix**: Add explicit labels for each form field using the `<label>` element and ensure that they are programmatically associated with their respective input fields.

3. **Inconsistent Navigation Order**
   - **Severity**: Moderate
   - **WCAG 2.1 Criterion**: 2.4.3 (Focus Order)
   - **Problem**: The focus order may not follow a logical reading order, confusing users who rely on keyboard navigation.
   - **Fix**: Ensure that the tab order follows a logical reading order that matches the visual presentation of the page.

4. **Text Contrast**
   - **Severity**: Moderate
   - **WCAG 2.1 Criterion**: 1.4.3 (Contrast (Minimum))
   - **Problem**: Some text elements may not have sufficient contrast against their background, making them hard to read for users with visual impairments.
   - **Fix**: Increase the contrast ratio between text and background colors to meet or exceed a 4.5:1 ratio for normal text.

5. **Missing Alt Text on Images**
   - **Severity**: Critical
   - **WCAG 2.1 Criterion**: 1.1.1 (Non-text Content)
   - **Problem**: Important images, such as logos, may not have descriptive alt text, making it difficult for screen reader users to understand the content.
   - **Fix**: Add descriptive alt text to images to convey the same information a sighted user would obtain.

6. **Non-descriptive Link Text**
   - **Severity**: Minor
   - **WCAG 2.1 Criterion**: 2.4.4 (Link Purpose (In Context))
   - **Problem**: Link text such as "submit" does not provide adequate context about what will happen when the link is activated.
   - **Fix**: Use descriptive link text that clearly identifies the link's purpose.

Addressing these issues will help make the web page more accessible to a wider range of users.

**Score:** Issue identified

---

## full-page-after — FULL_PAGE

**Image:** `survey-after.png`

**Ground truth:** Accessible version. All inputs labelled, radio groups use <fieldset>/<legend>, table uses proper <th> elements, instructions present. AI should report no significant issues.

**AI Response:**

Based on the screenshot provided, here is an evaluation of potential accessibility issues:

1. **Form Labels for Checkboxes and Fields**
   - **Severity**: Moderate
   - **WCAG 2.1 Criterion Violated**: 1.3.1 Info and Relationships
   - **Problem**: The checkboxes for favorite parks and the fields for subscribing to the newsletter may not have clear labels associated programmatically, making it difficult for screen readers to associate the text with the input fields.
   - **Solution**: Ensure each input field and checkbox has a corresponding `<label>` element properly associated using the `for` attribute.

2. **Form Validation and Feedback**
   - **Severity**: Moderate
   - **WCAG 2.1 Criterion Violated**: 3.3.1 Error Identification, 3.3.3 Error Suggestion
   - **Problem**: There is no indication of required fields besides a note ("Fields are required if not otherwise noted"). Users need clear prompts if required fields are not filled or if there are errors.
   - **Solution**: Use `aria-required="true"` for required fields and provide inline error messages or instructions visible to screen readers.

3. **Color Contrast**
   - **Severity**: Serious
   - **WCAG 2.1 Criterion Violated**: 1.4.3 Contrast (Minimum)
   - **Problem**: Text or elements may not follow sufficient contrast ratios against their backgrounds, making it difficult for users with visual impairments to read.
   - **Solution**: Ensure all text and interactive elements meet a contrast ratio of at least 4.5:1 against the background.

4. **Descriptive Links**
   - **Severity**: Minor
   - **WCAG 2.1 Criterion Violated**: 2.4.4 Link Purpose (In Context)
   - **Problem**: The "Go" button lacks descriptive context about what it will do.
   - **Solution**: Use descriptive link text or `aria` labels to provide more context for assistive technologies.

5. **Tab Order for Navigation**
   - **Severity**: Moderate
   - **WCAG 2.1 Criterion Violated**: 2.1.1 Keyboard
   - **Problem**: If the tab order is not logical or skips items, it might prevent effective navigation for keyboard users.
   - **Solution**: Ensure a logical and sequential tab order that mirrors the visual interface.

6. **Responsive Design**
   - **Severity**: Minor
   - **WCAG 2.1 Criterion Violated**: 1.4.10 Reflow
   - **Problem**: If this page is not responsive, users on small screens might experience issues.
   - **Solution**: Implement responsive design techniques to ensure content is accessible on all screen sizes.

Overall, this interface would benefit from a thorough review of form field labels, error suggestions, and color contrast to improve accessibility. Applying these adjustments in line with WCAG 2.1 guidelines will enhance the usability for users with disabilities.

**Score:** Correct – did not false-positive

---

## false-positive-fieldset — FALSE+

**Image:** `survey-after-false-positive.png`

**Ground truth:** Correctly implemented radio group: <fieldset> with <legend> "Favorite Park" provides the group label, and each radio input is wrapped in a <label>. No accessibility issue. AI should not flag this.

**AI Response:**

It seems there are no visible accessibility issues in this screenshot. Each radio button option is clearly labeled, and assuming the underlying HTML is properly structured with <label> tags, users with assistive technologies should be able to navigate and understand the options easily.

However, since this assessment is based purely on visible content, it’s important to consider the following:

1. **Keyboard Accessibility**: Ensure that users can navigate and select radio buttons using just a keyboard. This means properly following focus order and ensuring the user can tab through options.

2. **Screen Reader Compatibility**: Ensure that the labels for each radio button are correctly associated with the input elements using <label> tags and appropriate attributes (such as `aria-labelledby` if needed).

3. **Contrast Ratio**: Verify that the text contrasts sufficiently against the background for readability (the standard is a 4.5:1 contrast ratio for normal text).

4. **Error Identification**: Make sure there is an accessible way to inform the user if they need to select an option (if this is a required field).

5. **Responsive Design**: Ensure that this section is usable across different devices and screen sizes.

If these general accessibility guidelines are met, the UI should provide a good accessible experience.

**Score:** Correct – did not false-positive

---

## false-positive-table — FALSE+

**Image:** `survey-after-false-positive-2.png`

**Ground truth:** Correctly implemented data table: row headers "hate it"/"love it" use <th scope="row"> and column headers (Lung, Pancreas, etc.) use <th scope="col">. No accessibility issue. AI should not flag this.

**AI Response:**

Upon examining the screenshot, here are the potential accessibility issues:

### 1. Table Headers Not Clearly Identified
- **Severity**: Serious
- **WCAG 2.1 Criterion Violated**: 1.3.1 Info and Relationships
- **Why it is a problem for users**: Users relying on screen readers may have difficulty understanding the relationships between the data if headers are not explicitly defined.
- **How to fix it**: Ensure that table headers are properly marked using `<th>` elements, and use the `scope` attribute to associate rows and columns correctly.

### 2. Insufficient Color Contrast
- **Severity**: Moderate
- **WCAG 2.1 Criterion Violated**: 1.4.3 Contrast (Minimum)
- **Why it is a problem for users**: Users with visual impairments may struggle to read text if there is insufficient contrast between the text and the background.
- **How to fix it**: Increase the contrast ratio by changing the text or background color to comply with a minimum contrast ratio of 4.5:1.

### 3. Lack of Descriptive Caption
- **Severity**: Minor
- **WCAG 2.1 Criterion Violated**: 1.3.1 Info and Relationships
- **Why it is a problem for users**: Without a descriptive caption, screen reader users may not understand the context of the table.
- **How to fix it**: Include a proper `<caption>` element at the beginning of the table to describe its content briefly.

### 4. No Indication of “Favorite” and “Least Favorite”
- **Severity**: Minor
- **WCAG 2.1 Criterion Violated**: 1.3.1 Info and Relationships
- **Why it is a problem for users**: The table may not communicate the meaning of the sections (love it/hate it) clearly to screen readers.
- **How to fix it**: Include ARIA attributes or use a legend to clarify how the “love it” and “hate it” relate to the information.

These issues, if addressed, will enhance accessibility, allowing users with disabilities to understand and interpret the information more effectively.

**Score:** Correct – did not false-positive

---

## table-missing-th — REAL

**Image:** `survey-before-issue-present.png`

**Ground truth:** Row headers "love it" and "hate it" are marked up with <p>+<strong> inside a <td>, not with <th scope="row"> elements. Screen readers cannot associate data cells with their row context. Fails WCAG 1.3.1 (Info and Relationships).

**AI Response:**

The screenshot provided presents a table with data, and here are the accessibility issues identified:

1. **Inadequate Table Headers**
   - **Severity**: Serious
   - **WCAG 2.1 Criterion Violated**: 1.3.1 Info and Relationships
   - **Why it is a problem**: Screen readers rely on properly marked headers to interpret the data relationship. If headers are not marked correctly, users with visual impairments may not understand which data corresponds to which label.
   - **How to fix it**: Use `<th>` elements for all header cells to clearly define them in HTML. Ensure that row headers (e.g., "love it," "hate it") are also marked with `<th>` and include scope attributes where appropriate (e.g., scope="col" or scope="row").

2. **Color Contrast Issues**
   - **Severity**: Moderate
   - **WCAG 2.1 Criterion Violated**: 1.4.3 Contrast (Minimum)
   - **Why it is a problem**: Users with visual impairments or color blindness may have difficulty distinguishing between the different sections if there is not enough contrast between text and background colors.
   - **How to fix it**: Ensure that the text contrast ratio is at least 4.5:1 against its background for regular text and 3:1 for large text.

3. **Ambiguous Question Context**
   - **Severity**: Minor
   - **WCAG 2.1 Criterion Violated**: 3.3.2 Labels or Instructions
   - **Why it is a problem**: The question context may be unclear to users without additional information on what they are supposed to base their choices on. 
   - **How to fix it**: Provide more context or instructions about the question, such as specifying a particular aspect or criteria for evaluating "favorite" or "least favorite."

Overall, addressing these issues would improve the accessibility of the table for users with disabilities, particularly those relying on assistive technologies.

**Score:** Issue identified

---

## select-no-label — REAL

**Image:** `survey-before-issue-present-2.png`

**Ground truth:** The <select> dropdown (QUICKMENU) has no <label> element, no title attribute, and no aria-label. Screen readers announce it without any meaningful name. Fails WCAG 1.3.1 and 4.1.2 (Name, Role, Value).

**AI Response:**

### Issue Analysis

#### Issue 1: Non-Descriptive Text
- **Severity:** Moderate
- **WCAG 2.1 Criterion Violated:** 2.4.6 Headings and Labels
- **Why it is a problem for users:** The text "QUICKMENU ---->" isn't descriptive. Users with cognitive disabilities or those using screen readers might not understand what this label represents or what options it includes.
- **How to fix it:** Use a more descriptive label that clearly indicates the purpose or content of the menu, such as "Navigation Options" or "Main Menu".

#### Issue 2: Visual Cue Reliance
- **Severity:** Serious
- **WCAG 2.1 Criterion Violated:** 1.4.1 Use of Color
- **Why it is a problem for users:** The arrow (`---->`) may serve as a visual cue, but users who are blind or have low vision, including those who use screen readers, may not perceive or understand its purpose.
- **How to fix it:** Provide additional text or ARIA labels that convey the purpose of the controls for screen readers.

#### Issue 3: Dropdown Menu Indicator
- **Severity:** Serious
- **WCAG 2.1 Criterion Violated:** 4.1.2 Name, Role, Value
- **Why it is a problem for users:** The dropdown arrow indicates additional options, but without ARIA attributes, this is not apparent to screen readers and assistive technologies.
- **How to fix it:** Use appropriate ARIA roles and properties such as `aria-expanded` and `aria-controls` to inform users about the menu's state and available options.

By addressing these issues, the interface would be more accessible to a wider range of users, including those with disabilities.

**Score:** Issue identified

---

## newsletter-unlabelled-inputs — REAL

**Image:** `survey-before-issue-present-3.png`

**Ground truth:** Multiple issues: (1) "Name:", "eMail Address", and "Retype eMail" are plain text nodes, not <label> elements linked to their inputs. (2) Mr./Mrs. radio buttons also lack <label> elements. (3) Tab/DOM order does not match visual layout. Fails WCAG 1.3.1 and 3.3.2.

**AI Response:**

Based on the screenshot, here are the accessibility issues identified:

1. **Gender-Specific Salutation Options**
   - **Severity**: Moderate
   - **WCAG 2.1 Criterion Violated**: 1.3.1 Info and Relationships
   - **Why it is a problem**: Limiting salutations to "Mr." and "Mrs." does not accommodate users who do not identify with these titles, which can be exclusionary and not inclusive of all gender identities.
   - **How to fix it**: Provide an additional option such as "Mx." or allow users to enter their own salutation.

2. **Input Labels and Associations**
   - **Severity**: Serious
   - **WCAG 2.1 Criterion Violated**: 3.3.2 Labels or Instructions
   - **Why it is a problem**: The labels for the name, email address, and retype email fields are not programmatically associated with their respective inputs, which can be problematic for screen reader users.
   - **How to fix it**: Use `<label>` elements to explicitly associate each input with its label using the `for` attribute and the `id` attribute on input elements.

3. **Redundant Email Confirmation Field**
   - **Severity**: Minor
   - **WCAG 2.1 Criterion Violated**: 2.4.6 Headings and Labels (Use of repeating fields can also affect keyboard navigation)
   - **Why it is a problem**: Requiring users to retype their email address can be cumbersome and is generally not a recommended practice, as it can be a barrier for those with cognitive or motor disabilities.
   - **How to fix it**: Consider removing the "Retype Email" field and instead use validation to ensure the accuracy of the email address.

Overall, addressing these issues will enhance the accessibility and inclusivity of the form, making it usable by a wider audience.

**Score:** Issue identified

---

## Score Summary

| ID | Type | Result |
|----|------|--------|
| full-page-before | FULL_PAGE | Issue identified |
| full-page-after | FULL_PAGE | Correct – did not false-positive |
| false-positive-fieldset | FALSE+ | Correct – did not false-positive |
| false-positive-table | FALSE+ | Correct – did not false-positive |
| table-missing-th | REAL | Issue identified |
| select-no-label | REAL | Issue identified |
| newsletter-unlabelled-inputs | REAL | Issue identified |
