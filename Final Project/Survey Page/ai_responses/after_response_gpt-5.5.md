# AI Accessibility Audit — After (Accessible)
**Date:** 15 May 2026
**Model:** GPT-5.5 (web_search_preview enabled)
**Method:** URL-only — no context, no WCAG checklist provided to the AI
**URL analysed:** https://www.w3.org/WAI/demos/bad/after/survey.html

---

## Overall Score

8 / 10

---

## Summary

The page is a substantially accessible retrofit of the W3C BAD survey demo and addresses many classic WCAG 2.0 issues: meaningful headings, skip links, form labels, radio-button grouping for the main survey question, semantic data table markup, visible instructions, keyboard-operable native controls, and text alternatives. However, against WCAG 2.1 and 2.2 there are still some accessibility gaps, mainly around modern form semantics, redundant data entry, and accessible-name consistency.

---

## Issue Breakdown

| Severity | Count |
|---|---|
| Critical | 0 |
| Serious  | 2 |
| Moderate | 3 |
| Minor    | 0 |
| **Total** | **5** |

---

## Strengths

- Provides skip links to bypass repeated page and demo navigation.
- Uses headings and navigation structure to support screen reader and keyboard navigation.
- Main survey radio buttons are grouped with fieldset and legend and have associated labels.
- The results table is presented as a real data table with header relationships.
- The page uses native HTML links, inputs, radio buttons, select controls, and submit controls, which supports keyboard and assistive technology interoperability.

---

## Top 3 Priority Fixes

1. Remove or auto-populate the repeated email confirmation field to avoid requiring users to re-enter the same information.
2. Add correct autocomplete tokens to personal-information fields such as name and email.
3. Ensure visible form labels are included in each control's accessible name, especially the Greenest City select control.

---

## All Issues Found

| ID | Severity | WCAG Criterion | Level | Category | Element | Problem | Recommended Fix |
|---|---|---|---|---|---|---|---|
| ACC-001 | Serious | 3.3.7 Redundant Entry | A | Forms | Free Newsletter section: eMail Address and Retype eMail text fields | The form asks the user to enter their email address and then re-enter the same email address in a second field. Under WCAG 2.2, requiring users to provide the same information again in the same process can create unnecessary cognitive, motor, and memory burden unless the repeated entry is essential or the value is auto-populated or selectable. | Remove the Retype eMail field where possible. If confirmation is genuinely necessary, auto-populate the second field from the first and allow the user to edit it, or provide a clear review step before submission instead of requiring duplicate manual entry. |
| ACC-002 | Moderate | 1.3.5 Identify Input Purpose | AA | Forms | Free Newsletter section: Name, eMail Address, and Retype eMail fields | The personal-information fields collect user-identifying information, but the controls do not expose their purpose using appropriate HTML autocomplete tokens. This makes it harder for browsers, assistive technologies, password/contact managers, and cognitive-support tools to identify and assist with these fields. | Add appropriate autocomplete attributes. For example, use autocomplete="name" on the name field and autocomplete="email" on the email field. If the duplicate email field remains, avoid requiring it; if retained for confirmation, consider autocomplete="email" or remove browser autofill only if there is a clearly justified reason. |
| ACC-003 | Serious | 2.5.3 Label in Name | A | Forms | Greenest City select control, shown near the visible text 'Which city do you find is the greenest?' and implemented with title="cities of the world" | The visible label or prompt for the select control is 'Which city do you find is the greenest?' / 'Greenest City', but the programmatic accessible name appears to be supplied by a title attribute with different wording, 'cities of the world'. Voice-control users may try to activate the field using the visible label text, but that text is not contained in the accessible name. | Use a visible label element associated with the select, and ensure the accessible name contains the visible label text. For example: <label for="cc">Which city do you find is the greenest?</label>. Avoid relying on title alone where visible label text is available. |
| ACC-004 | Moderate | 1.3.1 Info and Relationships | A | Forms | Free Newsletter section: Mr. and Mrs. radio buttons | The Mr. and Mrs. radio buttons appear to function as a related salutation/title choice, but they are not presented with an explicit programmatic group label such as a fieldset and legend. Individual labels identify the choices, but the relationship and purpose of the radio-button group may not be sufficiently clear to screen reader users when navigating by form controls. | Wrap the salutation radio buttons in a fieldset and provide a concise legend such as 'Title' or 'Salutation'. Keep the individual labels 'Mr.' and 'Mrs.' associated with their respective radio buttons. |
| ACC-005 | Moderate | 3.3.2 Labels or Instructions | A | Forms | Greenest City select control | The select control has a title-based accessible name, but the visible question is not directly associated with the control as a label. Relying on title attributes for form labelling is fragile because titles are not consistently discoverable visually, on touch devices, or by all assistive technology interaction modes. | Associate the visible prompt with the select using a label element or aria-labelledby. Prefer visible, persistent labels over title attributes. For example, give the question an id and reference it with aria-labelledby, or use a standard <label for="cc"> element. |
