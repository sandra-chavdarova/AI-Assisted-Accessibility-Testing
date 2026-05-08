# AI Evaluation Report
 
**Model Evaluated:** GPT-4o  
**Date:** 2026-05-07

---

## Overview

The prompts in this experiment were **deliberately engineered** to test the limits of AI accuracy. Each issue was selected not just because it was a real violation from the scanned page, but because it contained **hidden secondary problems** or **traps** that a surface-level analysis would miss. The goal was to determine whether the AI reasons deeply about accessibility or simply pattern-matches to the description it is given.

The evaluation answers three questions for each issue:
- **Was AI accurate?** — Did it identify the correct problem and fix?
- **Did it hallucinate?** — Did it invent problems, cite wrong criteria, or praise things that were fine?
- **Was it useful?** — Could a developer apply the fix and consider the issue resolved?
---

## Prompt Engineering Strategy

The following traps were deliberately embedded in the selected issues:

| Issue | Hidden Trap |
|---|---|
| `image-alt` | Decorative image — correct fix is `alt=""`, not a description |
| `select-name` | `onchange` causes immediate navigation — violates WCAG 3.2.2 |
| `link-name` | Three problems in one element: no alt, `onfocus="blur()"`, `javascript:` href |
| `region` | Images and links inside are perfectly accessible — AI should ignore them |
 
---

## Per-Issue Evaluation
 
---

### 1. `html-has-lang` (serious)

**Description given:** Ensure every HTML document has a lang attribute  
**Snippet:** `<html>`

#### What the AI did correctly 
- Identified the correct problem
- Referenced the correct WCAG criterion: **3.1.1 Language of Page**
- Provided the correct fix: `<html lang="en">`
- Explained the fix clearly
#### What the AI missed or got wrong 
- Nothing significant — this was the baseline test case with no trap
#### Verdict
| Question | Answer |
|---|---|
| Accurate? | Yes |
| Hallucinated? |  No |
| Useful? | Yes |
 
---

### 2. `image-alt` (critical) 

**Description given:** Ensure `<img>` elements have alternative text or a role of none or presentation  
**Snippet:** `<img src="./img/border_left_top.gif" width="10px" height="10px">`

#### Context
This was a **deliberate trap**. The image is a decorative border gif with no informational value whatsoever. The correct fix per WCAG 1.1.1 for decorative images is `alt=""` (empty alt) — or `role="presentation"` — so that screen readers skip it entirely. Adding a descriptive alt text is **the wrong fix** because it would make screen readers announce a purely decorative element to the user.

#### What the AI did correctly 
- Correctly identified WCAG **1.1.1 Non-text Content**
- Recognized that decorative images are an exception to the alt text rule (mentioned it in the explanation)
#### What the AI missed or got wrong 
- **Gave the wrong fix:** `alt="Left border of the image"` — this is incorrect for a decorative image
- The AI described the image as if it carries meaning ("left border of the image"), when the correct action is to hide it from assistive technology entirely
- The correct fix should have been:
```html
<img src="./img/border_left_top.gif" width="10px" height="10px" alt="" role="presentation">
```
- The AI acknowledged the decorative exception in theory but did not apply it in practice — a direct contradiction within its own response
#### Verdict
| Question | Answer |
|---|---|
| Accurate? | Partially — correct criterion, wrong fix |
| Hallucinated? | Partially — invented a meaningful description for a decorative element |
| Useful? | No — applying this fix would make the page less accessible |
 
---

### 3. `select-name` (critical)

**Description given:** Ensure select element has an accessible name  
**Snippet:** `<select onchange="location.href = this.value;">` with options

#### Context
This was a **deliberate trap**. The visible problem is the missing label. The hidden problem is `onchange="location.href = this.value;"` — this causes the page to navigate immediately when a keyboard user presses an arrow key to browse options, violating **WCAG 3.2.2 On Input**. A strong AI should fix both.

#### What the AI did correctly 
- Correctly identified the missing accessible name
- Referenced correct WCAG criteria: **4.1.2 Name, Role, Value** and **1.3.1 Info and Relationships**
- Provided the correct label fix with proper `for`/`id` association:
```html
<label for="navigation-select">Navigate to:</label>
<select id="navigation-select" onchange="location.href = this.value;">
```

#### What the AI missed or got wrong 
- **Completely ignored `onchange="location.href = this.value;"`** — this is a WCAG 3.2.2 On Input violation
- Keyboard users pressing arrow keys to browse options will be redirected mid-navigation before they can confirm their choice — the AI left this unfixed
- A complete fix would require a submit button:
```html
<label for="nav-select">Navigate to:</label>
<select id="nav-select">
  <option value="./home.html">Home</option>
  <option value="./news.html">News</option>
  <option value="./tickets.html">Tickets</option>
</select>
<button onclick="location.href = document.getElementById('nav-select').value;">Go</button>
```

#### Verdict
| Question | Answer |
|---|---|
| Accurate? |  Partially — fixed the reported issue, missed the hidden one |
| Hallucinated? | No |
| Useful? |  Partially — label fix is correct but the page is still broken for keyboard users |
 
---

### 4. `link-name` (serious) 

**Description given:** Ensure links have discernible text  
**Snippet:** `<a href="javascript:location.href='home.html';" onfocus="blur();"><img name="nav_home" src="./img/nav_home.gif" ...></a>`

#### Context
Three separate accessibility problems in one element:
1. No `alt` text on the image → WCAG 2.4.4 / 1.1.1
2. `onfocus="blur()"` → actively removes keyboard focus → WCAG 2.1.1 Keyboard
3. `javascript:location.href` → not a real href, breaks browser history, right-click, and AT link destination reading
   The description only mentioned problem 1. The question was: would the AI catch 2 and 3?

#### What the AI did correctly 
- Correctly identified WCAG **2.4.4 Link Purpose**
- Added `alt="Home"` to the image — fixes problem 1
#### What the AI missed or got wrong 
- **Left `onfocus="blur()"` completely untouched** — keyboard users still cannot focus this link
- **Left `javascript:location.href` completely untouched** — not a real href
- The AI fixed only what the description said, and nothing more
- Score: **1 out of 3 problems fixed**
  The complete fix should have been:
```html
<a href="home.html">
  <img src="./img/nav_home.gif" alt="Home" width="88" height="27" hspace="15" border="0">
</a>
```

#### Verdict
| Question | Answer |
|---|---|
| Accurate? |  Partially — fixed 1 of 3 problems |
| Hallucinated? | No |
| Useful? | Partially — screen reader issue fixed, keyboard issue remains |
 
---

### 5. `region` (moderate) 

**Description given:** Ensure all page content is contained by landmarks  
**Snippet:** `<p id="logos">` containing two links with images that both have correct alt text and title attributes

#### Context
This was a **false positive trap**. The images and links inside the paragraph are perfectly accessible — correct alt text, correct titles. The AI should **ignore them entirely** and focus only on the missing landmark wrapper. A weak AI would comment on or attempt to fix the images/links.

#### What the AI did correctly 
- Correctly identified the real problem: content not inside a landmark region
- Referenced **WCAG 1.3.1 Info and Relationships**
- Correctly ignored the images and links — did not attempt to fix them
- Wrapped the content in `<header>`
#### What the AI got wrong 
- Used `<header role="banner">` — the `role="banner"` is **redundant** because `<header>` already carries an implicit ARIA role of `banner` when used as a top-level element. This suggests the AI does not fully understand implicit ARIA semantics, even though the fix is not technically harmful.
#### Verdict
| Question | Answer |
|---|---|
| Accurate? | Mostly — correct fix, minor redundancy |
| Hallucinated? | Minor — redundant `role="banner"` suggests incomplete ARIA knowledge |
| Useful? | Yes — fix is applicable |
 
---

## Summary Table

| Issue | Accurate? | Hallucinated? | Useful? | Hidden trap caught? |
|---|---|---|---|---|
| `html-has-lang` |  Yes |  No |  Yes | N/A — no trap |
| `image-alt` | Partial | Minor | No | Failed — gave descriptive alt for decorative image |
| `select-name` | Partial | No | Partial | Failed — missed `onchange` WCAG 3.2.2 violation |
| `link-name` | Partial | No | Partial | Failed — missed `blur()` and `javascript:` href |
| `region` | Mostly | Minor | Yes | Passed — correctly ignored accessible content inside |
 
---

## Overall Conclusions

### Was AI accurate?
**Partially.** The AI performed well on simple, isolated issues (`html-has-lang`, `region`) but consistently failed to reason beyond the description it was given. In 3 out of 5 cases it fixed only the reported symptom and missed secondary violations hiding in the same code snippet. The `image-alt` case was the most significant failure — the AI gave the opposite of the correct fix for a decorative image.

### Did it hallucinate?
**Minimally, but notably in one case.** The AI did not invent WCAG rules or cite completely wrong criteria. However, in the `image-alt` case it invented a meaningful description (`"Left border of the image"`) for an image that carries no meaning — which is a form of hallucination through assumption. The redundant `role="banner"` in the `region` fix also suggests overconfident application of ARIA without understanding implicit roles.

### Was it useful?
**Conditionally.** For a beginner developer, the AI responses are useful as a starting point — they identify real problems and provide syntactically correct fixes. However, for production use, blindly applying these fixes would leave critical issues unresolved (keyboard traps, `onchange` navigation, `javascript:` hrefs). The AI should not be trusted as a complete accessibility reviewer — it works best as a first pass that a human expert then verifies.
 
---

## Key Finding

> The AI consistently fixes **what the description says** but does not reason beyond it. Prompts that describe only one problem in a multi-problem element will produce incomplete fixes. This is the most important limitation identified in this experiment.