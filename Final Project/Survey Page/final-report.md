# AI Model Comparison & Role of AI in Accessibility Testing

## GPT-4o vs GPT-5.5 — What Changed?

Both models were given only a URL and no additional context. The difference in output was significant.

GPT-4o found **10 issues on the Before page and 3 on the After page**, with scores of 3/10 and 9.5/10. Its findings were correct but surface-level — it identified the most obvious structural violations (missing alt text, unlabeled inputs, missing lang attribute) and little else. The issue descriptions were generic and could apply to almost any inaccessible page.

GPT-5.5 found **36 issues on the Before page and 5 on the After page**, with scores of 2/10 and 8/10. Its analysis was significantly deeper — it identified issues that GPT-4o missed entirely, including focus order problems, on-focus and on-input predictability violations (WCAG 3.2.1, 3.2.2), redundant data entry (WCAG 3.3.7), input purpose (WCAG 1.3.5), reflow concerns, and image-of-text usage. Crucially, it also covered **WCAG 2.2 criteria** that GPT-4o ignored. Descriptions were specific, actionable, and referenced concrete elements.

The quality gap is substantial — GPT-5.5 produces output closer to a real accessibility audit, while GPT-4o produces a useful but shallow first pass.

---

## Is AI Enough on Its Own?

**No — and the data from both models confirms this clearly.**

Even GPT-5.5, the stronger model, missed issues that only the other methods caught:

- **Form data loss on failed submission** — found only by manual testing. No AI model can detect this because it requires actually submitting the form and observing the result.
- **Non-logical tab order** — flagged conceptually by GPT-5.5 but not verified, since AI cannot navigate the page with a keyboard.
- **No skip navigation link** — missed by both AI models on the Before page.
- **Exact DOM node counts and paths** — only Axe-core provides this, which is essential for developers fixing issues in code.
- **Flow scan violations** — Axe-core detected issues that only appear after keyboard interaction, which AI cannot replicate.

At the same time, AI uniquely contributes things the other methods cannot:

- Plain-language explanations suitable for non-technical stakeholders
- Coverage of cognitive and usability concerns beyond pure WCAG rule matching
- Zero setup — no browser, no tooling, no configuration required
- WCAG 2.2 awareness that Axe-core does not yet fully cover

---

## Conclusion

AI accessibility testing has matured considerably — GPT-5.5 in particular produces audit output that rivals a basic manual review in breadth. However, it cannot replace human interaction testing or automated DOM scanning. **The three methods are complementary, not interchangeable:**

So, it is best to use **Axe-core** for fast, reliable, CI-integrated structural checks,
use **manual testing** to catch real interaction failures that no tool can observe, and
use **AI** as a rapid first-pass audit and for generating accessible, readable reports for non-technical audiences

A strategy that combines all three is more thorough than any single method alone — and the comparison between GPT-4o and GPT-5.5 also demonstrates that as AI models improve, their contribution to accessibility testing will continue to grow.