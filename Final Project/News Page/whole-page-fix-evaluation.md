# Whole-Page Fix Evaluation Report — News Page

**Date:** 17 May 2026  
**Models compared:** gpt-4o vs gpt-5.5  
**Method:** Raw `#page` HTML extracted from the Before news page — sent identically to both models with no descriptions, no axe-core results, and no WCAG checklist  
**Source URL:** https://www.w3.org/WAI/demos/bad/before/news.html

---

## Approach

The `#page` element was extracted from the inaccessible Before version of the news page and sent to both models using the same prompt and system role. The AI was asked to identify every accessibility issue, fix them directly in the code, and return the corrected HTML alongside a structured report of every change made.

This tests a single question: **given broken HTML and no hints, can AI act as an autonomous accessibility engineer?**

---

## Fix Count Comparison

| Severity | gpt-4o | gpt-5.5 |
|---|---|---|
| Critical | 2 | 2 |
| Serious | 4 | 12 |
| Moderate | 3 | 12 |
| Minor | 0 | 2 |
| **Total** | **9** | **28** |

gpt-5.5 identified **three times as many issues** as gpt-4o from the same input.

---

## What Both Models Fixed

Both models independently identified and fixed the following:

| Issue | WCAG | gpt-4o | gpt-5.5 |
|---|---|---|---|
| Missing `lang` attribute on `<html>` | 3.1.1 | Yes | Yes |
| Images missing alt text | 1.1.1 | Yes | Yes |
| Navigation links using `javascript:` href | 2.4.4 | Yes | Yes |
| `<select>` quick menu has no accessible label | 4.1.2 | Yes | Yes |
| Deprecated/invalid HTML attributes | 4.1.1 | Yes | Yes |

---

## What Only gpt-5.5 Fixed

gpt-5.5 caught a significant number of issues that gpt-4o missed entirely:

| Issue | WCAG | Severity |
|---|---|---|
| `onfocus="blur()"` removes keyboard focus from nav links | 2.1.1 Keyboard | Critical |
| No visible focus indicator on interactive elements | 2.4.7 Focus Visible | Serious |
| `onchange` on select causes immediate navigation | 3.2.2 On Input | Serious |
| Headings were styled paragraphs, not semantic `<h>` elements | 1.3.1 Info and Relationships | Serious |
| Layout tables used throughout — no `role="presentation"` | 1.3.1 Info and Relationships | Serious |
| No skip link to bypass navigation | 2.4.1 Bypass Blocks | Serious |
| No page `<title>` defined | 2.4.2 Page Titled | Serious |
| No landmark regions (`<header>`, `<main>`, `<nav>`, `<footer>`) | 1.3.1 Info and Relationships | Serious |
| Chart image (`chart1.jpg`) had no descriptive alt text | 1.1.1 Non-text Content | Serious |
| Fixed-width pixel layout — no reflow support | 1.4.10 Reflow | Moderate |
| `<font>` elements and fixed pixel font sizing | 1.4.4 Resize Text | Moderate |
| Blockquote attribution not semantically associated | 1.3.1 Info and Relationships | Moderate |
| Callout tables not marked as figures | 1.3.1 Info and Relationships | Moderate |
| Current page not marked in navigation | 2.4.8 Location | Minor |
| Empty paragraphs and `<br>` used for spacing | 1.3.1 Info and Relationships | Minor |

---

## What Only gpt-4o Fixed

gpt-4o noted one issue that gpt-5.5 did not specifically call out:

| Issue | WCAG | Severity |
|---|---|---|
| `<font>` elements used for presentation instead of CSS `<span>` | 1.4.5 Images of Text | Moderate |

This was addressed structurally by gpt-5.5 (which rewrote the entire layout) but not listed as a separate fix entry.

---

## Quality of the Fixed HTML

### gpt-4o fixed HTML
The output was a **patched version** of the original — it kept the table-based layout structure and added targeted fixes (alt attributes, lang attribute, aria-label on the select, fixed JavaScript). The page structure remained as a nested table layout with no semantic landmarks. It is better than the original but still fails many WCAG criteria.

### gpt-5.5 fixed HTML
The output was a **complete rewrite** — it replaced the entire table-based layout with semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<aside>`, `<figure>`), added a skip link, converted navigation to a proper `<ul>` list, replaced the `onchange` select with a labeled form and Go button, added CSS focus styles, and used responsive layout with CSS Grid. The fixed HTML is **structurally close** to what a human accessibility engineer would produce, **but still tends to fail for certain issues**.

---

## Evaluation Against Known Violations

Cross-referencing with axe-core results and manual testing findings from earlier phases:

| Known Violation | gpt-4o caught? | gpt-5.5 caught? |
|---|---|---|
| Missing `lang` attribute | Yes | Yes |
| Navigation images missing alt text | Yes | Yes |
| `javascript:` href on navigation links | Yes | Yes |
| `onfocus="blur()"` removing keyboard focus | No | Yes |
| Missing skip navigation link | No | Yes |
| `onchange` navigation violation (WCAG 3.2.2) | Noted but not fully fixed | Noted but not fully fixed |
| Headings not semantic | No | Yes |
| No landmark regions | No | Yes |
| Layout tables not marked as presentation | No | Yes |
| No page title | No | Yes |

---

## Was AI Accurate?

**gpt-4o:** Accurate on what it found, but found very little. Its fixes are all correct — no wrong fixes were applied — but it missed the majority of structural violations. It treated the task as a patch job rather than a full audit.

**gpt-5.5:** Mostly accurate. The rewritten HTML is valid, semantic, and addresses the majority of issues identified by both manual testing and axe-core. GAPS REMAIN (some ARIA relationships could be more specific) but no incorrect fixes were introduced.

---

## Did AI Hallucinate?

**gpt-4o:**  Yes, a bit — it listed WCAG 2.4.5 Multiple Ways as the criterion for the missing select label, when the correct criterion is 4.1.2 Name, Role, Value. The fix itself (adding `aria-label`) was correct, but the criterion cited was wrong.

**gpt-5.5:** No hallucinations detected. All cited WCAG criteria were correct and applicable to the issues described.

---

## Was AI Useful?

**gpt-4o:** Useful as a quick pass for the most obvious issues — missing alt text, missing lang, broken links. A developer could apply the fixes in minutes. However, it would leave the page with significant remaining violations that axe-core and manual testing would still catch.

**gpt-5.5:** Mostly useful — the rewritten HTML could serve as a genuine **starting point** for remediation. 

---

## Limitations of gpt-5.5 — What It Got Wrong or Missed

Despite the significantly stronger output, gpt-5.5 had notable weaknesses worth documenting.

### 1. Fix report claimed more than the HTML delivered

The fix report listed `onchange` navigation (WCAG 3.2.2) as fixed — but looking at the raw extracted HTML sent to the model (document 17), the `<select onchange="location.href = this.value;">` still appears with only `aria-label` added. The fix report described a Go button solution that does appear in the final rewritten HTML, but this discrepancy shows the model's self-reporting cannot always be trusted at face value. Always verify the actual HTML output against the fix list.

### 2. Visual fidelity completely lost

gpt-5.5 rewrote the page so thoroughly that the visual identity of the Citylights portal is gone — the branding colours, the image-based header, the sidebar layout, the decorative borders. The output looks like a generic unstyled HTML page. In a real accessibility remediation project this would be unacceptable — the goal is to fix violations while preserving the visual design, not to rebuild the page from scratch. A human engineer would apply targeted fixes to the existing structure, not discard it entirely.

### 3. Weather script fallback is incomplete

The original weather script used `document.write` which is invalid in modern HTML. gpt-5.5 replaced it with a cleaner `Intl.DateTimeFormat` approach using a `<time>` element — which is correct. However the fallback text inside the `<time>` element is just `"Sunny, 23°C"` with no date. If JavaScript fails or is disabled, the user sees incomplete information. A proper fix would include a meaningful static fallback.

### 4. Image inside blockquote

The portrait image of Clara F. remains inside the `<blockquote>` element rather than being separated as a `<figure>`. While not a critical violation, it means the image is semantically part of the quoted text rather than an illustration of the person quoted — a minor structural inaccuracy that a human reviewer would catch.

### 5. Cannot verify interaction behaviour

gpt-5.5 claimed to fix the skip link by adding `tabindex="-1"` to `<main>` — which is the correct fix. However from earlier Playwright testing we know that even the real W3C after page has a broken skip link where focus lands on `<body>` instead of `<main>`. AI cannot test whether its own fixes actually work in a browser — it can only reason about the code. This is a fundamental limitation: **AI produces plausible fixes but cannot validate them**.

### 6. Interaction violations remain undetectable

Issues that only manifest during user interaction were not caught by either model:
- Form data preservation on failed submission
- Focus order verified by actual keyboard tabbing
- Screen reader announcement order in the floated layout
- Hover-triggered JavaScript (`onmouseover`/`onmouseout`) on navigation cells — still present in gpt-5.5 output

These require Playwright or manual testing — no amount of HTML analysis can substitute.

---

## Key Finding

> Both models received identical input with no prompting hints. gpt-4o applied 9 surface-level fixes to the existing structure. gpt-5.5 applied 28 fixes and rewrote the page from scratch using semantic HTML5. The difference is not in what they were told — it is in how deeply they reasoned about the code.

> This contrasts with the snippet-level experiment (Task 14), where **prompt quality** was the dominant factor. At the whole-page level, the complexity of the task exceeds what prompt engineering alone can compensate for — model capability becomes the limiting factor.

---

## Conclusion

AI can act as an autonomous accessibility engineer for whole-page HTML — **but only as a starting point.** gpt-4o produces a useful but shallow patch. gpt-5.5 produces output that rivals a junior accessibility engineer's first-pass remediation.

Neither model replaced the full testing process — issues like form data loss on submission, non-logical tab order verified by keyboard navigation, and interaction-specific violations still require manual or automated Playwright testing to catch. But for code-level structural remediation, gpt-5.5 demonstrated that AI can contribute meaningfully to the fix phase of an accessibility audit, not just the detection phase.