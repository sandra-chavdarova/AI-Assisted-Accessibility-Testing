# AI Experiments

## Overall Goal

The goal of these experiments is to evaluate how different AI models and prompting strategies analyze accessibility issues detected by axe-core scans.

The experiments compare:
- smaller vs larger language models
- general prompting vs evidence-based prompting
- reliability and consistency of generated accessibility reports

The objective is to determine which combination produces the most accurate, useful, and grounded accessibility analysis.

## Experiment 1
Model: GPT-4.1-mini

Prompt: General analysis

Goal:
Generate general accessibility summaries from axe-core JSON results.

---

## Experiment 2
Model: GPT-4.1-mini

Prompt: Evidence-based analysis

Goal:
Reduce hallucinations and improve grounding by forcing the model to rely only on provided scan evidence.

---

## Experiment 3
Model: GPT-5.5

Prompt: General analysis

Goal:
Compare advanced model behavior with baseline model outputs.

---

## Experiment 4
Model: GPT-5.5

Prompt: Evidence-based analysis

Goal:
Evaluate whether advanced models combined with strict prompting produce more reliable accessibility analysis.

---

## Final Conclusion

The experiments showed that evidence-based prompting produced more reliable and focused accessibility reports compared to general prompting.

GPT-5.5 generated more detailed and structured analysis, while GPT-4.1-mini produced simpler summaries with less contextual reasoning.

Providing only the accessibility violations instead of the full axe-core JSON reduced unnecessary information and improved prompt efficiency.

Overall, combining evidence-based prompting with a more advanced language model resulted in the highest quality accessibility analysis.
