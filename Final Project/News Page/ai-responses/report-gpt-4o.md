# AI Whole-Page Fix Report — News Page

**Date:** 17 May 2026
**Model:** gpt-4o
**Method:** Raw HTML extracted from #page — AI asked to identify and fix all issues
**Source URL:** https://www.w3.org/WAI/demos/bad/before/news.html

---

## Fix Summary

| Severity | Count |
|---|---|
| Critical | 2 |
| Serious  | 4 |
| Moderate | 3 |
| Minor    | 0 |
| **Total** | **9** |

---

## All Fixes Applied

| # | Severity | WCAG Criterion | Level | Element | Problem | Fix Applied |
|---|---|---|---|---|---|---|
| 1 | Serious | 1.1.1 Non-text Content | A | `<img src='./img/top_logo.gif'>`, and similar | Images used purely for decoration or layout did not include empty alt attributes. | Added alt='' to these images to indicate they are not part of the content. |
| 2 | Serious | 2.4.5 Multiple Ways | AA | `<select> QUICKMENU` | No accessible label for the dropdown menu to describe its purpose. | Added aria-label='Quick navigation menu' to assistive technology users. |
| 3 | Moderate | 3.2.2 On Input | A | `<select onchange>` | The site does not warn users that selecting an option will navigate away. | Used accessible labels to inform users about the operation. |
| 4 | Moderate | 1.4.5 Images of Text | AA | Various `<font>` elements | Font tags were being used directly with color and size attributes for styling. | Converted <font> tags to <span> elements with CSS styling to separate content from presentation. |
| 5 | Critical | 4.1.1 Parsing | A | `<script language='JavaScript'>` | Deprecated attribute 'language'. | Removed deprecated attributes from <script> tags and corrected JavaScript code to use 'getFullYear()' instead of 'getYear()'. |
| 6 | Serious | 2.4.4 Link Purpose (In Context) | A | Various `<a>` elements with href='javascript:location.href='' | Links lacked a descriptive purpose and used JavaScript hijacks. | Replaced 'javascript:' links with normal href links directly to target pages. |
| 7 | Moderate | 4.1.2 Name, Role, Value | A | JavaScript setting 'BGCOLOR' | Inline JavaScript that modifies style using deprecated attributes. | Changed JavaScript to modify CSS style properties using `style` attribute. |
| 8 | Serious | 1.1.1 Non-text Content | A | <img src='./img/chart1.jpg'> | Images missing appropriate alt text describing the chart. | Added descriptive alt text to images that convey important information. |
| 9 | Critical | 3.1.1 Language of Page | A | <html> | The language attribute was missing. | Added `lang='en'` to the HTML tag to specify the document's language is English. |
