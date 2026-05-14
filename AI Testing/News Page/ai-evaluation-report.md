# AI Accessibility Fix Suggestions — Evaluation Report

**Models evaluated:** gpt-4o, gpt-4o-mini, gpt-5.5  
**Prompt strategies:** axe-description, no-description, thorough-description
---

## Experiment Design

### Purpose
This experiment was designed to evaluate how well AI models identify and fix real accessibility violations, and whether the quality of the prompt or the strength of the model affects the depth of the response.

### Prompt Engineering Strategy

The issues were not chosen at random. Each one contains either a **hidden secondary violation** or a **deliberate trap** that a surface-level analysis would miss. The three prompt strategies were designed to test whether more context leads to better results.

| Prompt Strategy | What the AI received |
|---|---|
| `axe-description` | The raw axe-core violation description (e.g. "Ensure links have discernible text") |
| `no-description` | No description — only the HTML snippet |
| `thorough-description` | Full context including hidden problems explicitly described |

### Traps embedded in the issues

| Issue | Hidden Trap |
|---|---|
| `image-alt` | Decorative image — correct fix is `alt=""`, NOT a description |
| `select-name` | `onchange` causes immediate page navigation — WCAG 3.2.2 violation hidden alongside the label issue |
| `link-name` | Three separate problems: missing alt, `onfocus="blur()"`, `javascript:` href |
| `region` | Content inside is perfectly accessible — AI should ignore the images and links entirely |

---

## Scoring System

Each issue is scored on three dimensions per model/prompt combination:

- **Accurate?**  Yes /  Partial /  No
- **Hallucinated?**  No /  Minor /  Yes
- **Hidden trap caught?**  Yes /  Partial /  No

---

## Results by Issue

---

### Issue 1: `html-has-lang` (serious) — Baseline, no trap

**What a correct response looks like:** Add `lang="en"` to `<html>`, cite WCAG 3.1.1.

| Model | Prompt | Accurate? | Hallucinated? | Trap caught? | Notes |
|---|---|-----------|---------------|---|---|
| gpt-4o | axe-description | Yes       | No            | N/A | Correct and clear |
| gpt-4o | no-description | No        | Yes           | N/A | **Hallucinated an entire fake page** with a `<div onclick>` and analyzed that instead of `<html>` |
| gpt-4o | thorough-description | Yes       | No            | N/A | Correct |
| gpt-4o-mini | axe-description | Yes       | Minor         | N/A | Correct but added irrelevant SEO benefit note |
| gpt-4o-mini | no-description | No        | Yes           | N/A | **Hallucinated a full page** with a missing image alt — analyzed the wrong thing entirely |
| gpt-4o-mini | thorough-description | Yes       | No            | N/A | Correct |
| gpt-5.5 | axe-description | Yes       | No            | N/A | Correct, concise, referenced WCAG 2.1 and 2.2 |
| gpt-5.5 | no-description | Yes       | No            | N/A | Correct — only model to handle `<html>` snippet without hallucinating |
| gpt-5.5 | thorough-description | Yes       | No            | N/A | Correct |

**Key observation:** Both gpt-4o and gpt-4o-mini hallucinated entirely fake HTML when given only `<html>` with no description. gpt-5.5 was the only model that correctly identified the missing `lang` attribute from the bare snippet alone.

---

### Issue 2: `image-alt` (critical) — **Decorative image trap**

**What a correct response looks like:** `alt=""` (empty), optionally `role="presentation"` or `aria-hidden="true"`. A description like `alt="Left border of the image"` is **the wrong answer**.

| Model | Prompt | Accurate? | Hallucinated? | Trap caught? | Notes |
|---|---|-----------|---------------|--------------|---|
| gpt-4o | axe-description | No        | Minor         | No           | Gave `alt="Left border of the image"` — wrong fix for decorative image |
| gpt-4o | no-description | Yes       | No            | Yes          | Correctly gave `alt=""` and reasoned the image is decorative from the filename |
| gpt-4o | thorough-description | Yes       | No            | Yes          | Correctly gave `alt=""` + `aria-hidden="true"` |
| gpt-4o-mini | axe-description | Partially | Minor         | No           | Gave `alt="Border decoration"` — still descriptive, still wrong |
| gpt-4o-mini | no-description | Partially | Minor         | Partially    | Offered both `alt=""` and descriptive alt — acknowledged decorative but hedged |
| gpt-4o-mini | thorough-description | Yes       | No            | Partially    | Correct: `alt=""` + `role="presentation"` |
| gpt-5.5 | axe-description | Yes       | No            | Yes          | Correctly identified decorative from filename, gave `alt=""`, suggested CSS alternative |
| gpt-5.5 | no-description | Yes       | No            | Yes          | Correct: `alt=""`, also noted `px` in width/height is invalid HTML |
| gpt-5.5 | thorough-description | Yes       | No            | Yes          | Correct: `alt=""` + `aria-hidden="true"` |

**Key observation:** The axe-description prompt hurt gpt-4o and gpt-4o-mini here — the generic description ("ensure img elements have alternative text") pushed them toward adding text. gpt-5.5 caught the decorative case even with the axe-description. Interestingly, the no-description prompt sometimes performed **better** than the axe-description for this trap because the models reasoned from the filename instead of following the description literally.

---

### Issue 3: `select-name` (critical) — **`onchange` trap**

**What a correct response looks like:** Add a `<label>`, AND remove `onchange` in favour of a submit button (WCAG 3.2.2). A response that only adds the label is incomplete.

| Model | Prompt | Accurate? | Hallucinated? | Trap caught? | Notes                                                                                                                     |
|---|---|-----------|---------------|--------------|---------------------------------------------------------------------------------------------------------------------------|
| gpt-4o | axe-description | Partially | No            | No           | Added label correctly, completely ignored `onchange`                                                                      |
| gpt-4o | no-description | Partially | Minor         | Yes          | **Caught the `onchange` violation**, cited WCAG 3.2.2, but provided unneccesary complication of the code                  |
| gpt-4o | thorough-description | Yes       | No            | Yes          | Caught both issues, cited 3.2.2, provided Go button                                                                       |
| gpt-4o-mini | axe-description | Partially | No            | No           | Added label, missed `onchange`. Also cited wrong criterion (2.4.6 instead of 4.1.2)                                       |
| gpt-4o-mini | no-description | Partially | Minor         | No           | Added label but cited wrong criterion (2.4.6 — Headings and Labels, not the right one for form names). Missed `onchange`. |
| gpt-4o-mini | thorough-description | Yes       | No            | Yes          | Caught both issues when told explicitly, provided Go button fix                                                           |
| gpt-5.5 | axe-description | Partially | No            | No           | Added label and cited correct criteria (4.1.2 + 3.3.2), but did not fix `onchange`                                        |
| gpt-5.5 | no-description | Yes       | No            | Yes            | **Caught the `onchange` violation** unprompted, cited WCAG 3.2.2, full Go button fix with form element                    |
| gpt-5.5 | thorough-description | Yes       | No            | Yes            | Caught both, most complete fix — used `<form>` + submit event listener                                                    |

**Key observation:** gpt-4o and gpt-5.5 both caught the `onchange` trap with the no-description prompt — reasoning from the code itself rather than the description. gpt-4o-mini never caught it without being explicitly told. The axe-description prompt consistently caused all models to miss the hidden violation.

---

### Issue 4: `link-name` (serious) — **Three-problem trap**

**What a correct response looks like:** Fix all three: (1) add `alt="Home"`, (2) remove `onfocus="blur()"`, (3) replace `javascript:` href with `href="home.html"`. Scored out of 3.

| Model | Prompt | Alt fixed | blur() removed | javascript: fixed | Trap caught? |
|---|---|-----------|---|---|---|
| gpt-4o | axe-description | Yes       | No | No | No 1/3 |
| gpt-4o | no-description | Yes       | Yes | Yes | Yes 3/3 |
| gpt-4o | thorough-description | Yes         | Yes | Yes | Yes 3/3 |
| gpt-4o-mini | axe-description | Yes         | No | No | No 1/3 — also added redundant `aria-label` on top of alt |
| gpt-4o-mini | no-description | Yes         | Yes | Yes | Yes 3/3 |
| gpt-4o-mini | thorough-description | Yes         | Yes | Yes | Yes 3/3 — added unnecessary `tabindex="0"` which is redundant on `<a>` |
| gpt-5.5 | axe-description | Yes         | Yes | Yes | Yes 3/3 — only model to catch all three with axe-description |
| gpt-5.5 | no-description | Yes         | Yes | Yes | Yes 3/3 — also added `:focus-visible` CSS |
| gpt-5.5 | thorough-description | Yes         | Yes | Yes | Yes 3/3 — most detailed explanation |

**Key observation:** The axe-description prompt caused gpt-4o and gpt-4o-mini to fix only 1 of 3 problems. gpt-5.5 was the only model to reason beyond the description and catch all three problems even with the minimal axe-description prompt.

---

### Issue 5: `region` (moderate) — **False positive trap**

**What a correct response looks like:** Wrap in `<header>` (or another appropriate landmark). Do NOT comment on or modify the images or links inside — they are already correct. Using `<nav>` for logos is semantically wrong. `role="banner"` on `<header>` is redundant.

| Model | Prompt | Accurate? | Hallucinated? | Trap caught? | Notes |
|---|---|---|---------------|---|---|
| gpt-4o | axe-description | Partially | Minor         | Partially | Used `<header role="banner">` — redundant role. Did not touch the images. |
| gpt-4o | no-description | No | Yes           | No | Claimed the missing `width` attribute on the WAI logo is the problem. Added `width="72"`. Completely missed the landmark issue. |
| gpt-4o | thorough-description | Partially | Yes             | Partially | Used `<nav aria-labelledby="logos">` — wrong landmark (logos ≠ navigation) |
| gpt-4o-mini | axe-description | Partially | Yes             | Partially | Used `<nav>` — wrong landmark for logos |
| gpt-4o-mini | no-description | No | Yes           | No | Focused on missing `width` attribute and alt text improvements — missed the landmark issue entirely |
| gpt-4o-mini | thorough-description | Partially | Yes             | Partially | Used `<nav>` again — wrong landmark, even with thorough description |
| gpt-5.5 | axe-description | Partially | Yes             | Partially | Used `<header>` correctly but no `role="banner"` redundancy. Did not touch images. Best of axe responses. |
| gpt-5.5 | no-description | No | Yes           | No | Focused on alt text describing link destination vs image — raised a valid but off-topic concern, missed the landmark issue |
| gpt-5.5 | thorough-description | Yes | Yes             | Yes | **Best response overall** — used `<header>`, explicitly stated the images and links inside are fine, offered `<nav>` as an alternative with explanation of when each is appropriate |

**Key observation:** The no-description prompt caused all models to look inside the snippet and invent problems with the images or links — which are already correct. The region issue is the hardest case for all models. gpt-5.5 with thorough-description was the only combination to fully pass.

---

## Overall Summary Tables

### Was AI accurate?

| Issue | gpt-4o | gpt-4o-mini | gpt-5.5 |
|---|---|---|---|
| `html-has-lang` |  Mixed (fails on no-desc) |  Mixed (fails on no-desc) | Consistent |
| `image-alt` |  Mixed |  Mixed |  Consistent |
| `select-name` |  Mixed |  Weak |  Consistent |
| `link-name` |  Mixed |  Mixed | Consistent |
| `region` |  Weak |  Weak |  Mixed |

### Did AI hallucinate?

| Issue | gpt-4o | gpt-4o-mini | gpt-5.5 |
|---|---|---|---|
| `html-has-lang` |  Yes (no-desc) |  Yes (no-desc) |  Never |
| `image-alt` |  Minor (axe-desc) |  Minor |  Never |
| `select-name` |  No |  Wrong criterion |  No |
| `link-name` | No |  Redundant aria-label |  No |
| `region` | Yes (no-desc) |  Yes (no-desc) |  Yes (no-desc) |

### Did prompt quality affect results?

| Prompt strategy | Effect |
|---|---|
| `axe-description` | Caused models to fix only what was described — hidden traps consistently missed |
| `no-description` | Caused hallucinations on minimal snippets (`<html>`, logos). Paradoxically helped on `image-alt` because models reasoned from filename |
| `thorough-description` | Best overall results — models that received full context caught hidden problems reliably |

---

## Overall Conclusions

### Was AI accurate?
**It depends heavily on the model and the prompt.** gpt-5.5 was the most consistently accurate across all combinations. gpt-4o and gpt-4o-mini both produced correct results on simple issues but failed on multi-problem cases unless explicitly guided. No model performed well on the `region` issue without a thorough description.

### Did it hallucinate?
**Yes — especially on minimal snippets.** The most significant finding is that gpt-4o and gpt-4o-mini both hallucinated entirely fake HTML pages when given only `<html>` with no description. This is a meaningful failure: the models invented content rather than analyzing what was given. gpt-5.5 never did this. Smaller hallucinations (wrong WCAG criterion, redundant ARIA attributes) appeared across all models.

### Was it useful?
**Conditionally.** With a thorough description, gpt-4o and gpt-5.5 produce fixes a developer could apply directly. With only an axe-core description, the fixes are incomplete — they address the symptom but leave secondary violations untouched. With no description on short snippets, the outputs can be actively misleading. AI is most useful as a guided first pass, not as an autonomous accessibility reviewer.

---

## Key Findings

> **1. The axe-description prompt is the weakest strategy for multi-problem issues.** Because it names only one violation, models fix only that violation — even when the code contains additional serious problems in plain sight.

> **2. The no-description prompt causes hallucinations on minimal snippets.** Models that receive only `<html>` or a small image tag without context tend to invent surrounding HTML and analyze that instead.
> 
> **3. Prompt quality matters more than model quality for most issues.** Even gpt-4o-mini produced correct results on hard cases when given a thorough description. The gap between models narrows significantly with better prompts.

> **4. The `region` issue exposed the limits of all models.** Without being explicitly told that the content inside was already accessible, every model attempted to modify images or links that did not need fixing — or chose the wrong landmark entirely.