# Model Comparison Report — Whole-Page Fix (News Page)

**Date:** 16 May 2026
**Models compared:** gpt-4o vs gpt-5.5
**Method:** Same HTML sent to both models — same prompt, same system role
**Source URL:** https://www.w3.org/WAI/demos/bad/before/news.html

---

## Approach

The `#page` HTML from the Before news page was extracted and sent identically to both models.
No descriptions, no axe-core results, and no WCAG checklist were provided.
This tests whether the model itself — not the prompt — determines fix quality.

---

## Fix Count Comparison

| Severity | gpt-4o | gpt-5.5 |
|---|---|---|
| Critical | 2 | 2 |
| Serious | 4 | 12 |
| Moderate | 3 | 12 |
| Minor | 0 | 2 |
| **Total** | **9** | **28** |

---

## Issues Fixed Only by gpt-4o

| WCAG Criterion | Severity | Element | Problem |
|---|---|---|---|
| 2.4.5 Multiple Ways | Serious | select QUICKMENU | No accessible label for the dropdown menu to describe its purpose. |
| 1.4.5 Images of Text | Moderate | Various <font> elements | Font tags were being used directly with color and size attributes for styling. |

---

## Issues Fixed Only by gpt-5.5

| WCAG Criterion | Severity | Element | Problem |
|---|---|---|---|
| 2.4.1 Bypass Blocks | Serious | p.skip#startcontent | The page had a paragraph saying 'Demo starts here' instead of a functional skip link, so keyboard and screen reader users could not bypass repeated header and navigation content. |
| 2.4.2 Page Titled | Serious | head | The page had no accessible document title. |
| 1.3.1 Info and Relationships | Serious | layout tables throughout page | Tables were used for visual layout, causing assistive technologies to announce meaningless table structures and making the reading order harder to understand. |
| 2.1.1 Keyboard | Critical | navigation links with href='javascript:...' and onfocus='blur();' | The links removed focus and depended on JavaScript URLs, making keyboard navigation unreliable and hiding the user’s current focus position. |
| 2.4.7 Focus Visible | Serious | interactive controls | The original code explicitly blurred focused navigation links and did not provide a reliable visible focus indicator. |
| 1.3.1 Info and Relationships | Serious | quick menu select | The select control had no programmatically associated label. |
| 1.4.3 Contrast (Minimum) | Serious | headline text using white font color | Several headlines were white text on a white page background, making them unreadable for many users. |
| 1.3.1 Info and Relationships | Serious | p.class='headline' and font-sized headings | Headings were visually styled paragraphs instead of semantic heading elements, so the document outline was not available to assistive technology. |
| 2.4.6 Headings and Labels | Moderate | article, section, and aside regions | Content sections and callouts were not programmatically labelled. |
| 1.3.2 Meaningful Sequence | Serious | floated multi-column article layout | The original floated layout and cleared containers could create a confusing reading order compared with the visual order. |
| 1.3.1 Info and Relationships | Moderate | chart and photo callout tables | Callouts were implemented as layout tables, which obscured their role as figures and related captions. |
| 1.3.1 Info and Relationships | Moderate | blockquote attribution | The attribution for the quotation was plain bold text outside a semantic relationship. |
| 1.3.1 Info and Relationships | Moderate | status information | Traffic and weather information were embedded in layout table cells without a meaningful region or structure. |
| 1.4.10 Reflow | Moderate | fixed-width tables and pixel-based layout | The original page used fixed-width tables that could require horizontal scrolling on small screens or high zoom. |
| 1.4.4 Resize Text | Moderate | font elements and fixed pixel sizing | Deprecated font elements and rigid layout sizing could interfere with readable text resizing. |
| 2.4.8 Location | Minor | current News navigation item | The current page was not programmatically identified in the navigation. |
| 1.3.1 Info and Relationships | Minor | line breaks and empty paragraphs used for spacing | Empty paragraphs and repeated <br> elements were used for visual spacing rather than structure. |

---

## Key Observations

- gpt-4o applied **9** fixes
- gpt-5.5 applied **28** fixes
- gpt-4o found **2** issues that gpt-5.5 did not
- gpt-5.5 found **17** issues that gpt-4o did not

---

## Notes

- Each model's corrected HTML is saved separately for independent axe-core validation
- Cross-reference with axe-core and manual findings to evaluate completeness
- Compare corrected HTML files against the real W3C after page as ground truth
