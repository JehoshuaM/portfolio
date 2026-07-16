---
title: Context Loss in AI-Assisted Software Development
pdf: /research/AI-Assisted-Software_Development.pdf
tags: [ai, software-engineering, research, dora, productivity]
level: advanced
---

## The Setup

AI-assisted development went from novelty to default practice in roughly three years. The marketing claims have scaled faster than the evidence. This project asks a narrow question: when you strip away the headlines and read the actual studies, academic and industry, what do they support, and what do they quietly undermine?

The framing matters because the two camps are not measuring the same thing. Academic work tends to ask *“is the output correct?”*. Industry reports tend to ask *“did the team ship faster?”*. Both are legitimate. They are not interchangeable, and most public discourse blurs them until neither side is talking about the same metric.

### Research Questions

- Does AI-assisted development genuinely improve developer outcomes, and on which axes?
- Where do academic findings and industry reports align, and where do they conflict?
- How do long-context limitations shape where AI is actually useful?

### Methodology

- Reviewed primary academic literature on LLMs in software engineering tasks, including code generation correctness studies and long-context retrieval evaluations.
- Cross-referenced against industry reports, including DORA's 2026 ROI study and the 2025 State of AI-Assisted Software Development survey.
- Identified contradictions, recurring themes, and measurement mismatches between sources.
- Synthesized findings around *tradeoffs* rather than headline claims every "AI improves X" finding was tested against "at the cost of what?"

### Sources Reviewed

- **2025 State of AI-Assisted Software Development** — adoption rates, self-reported productivity, workflow integration patterns.
- **DORA 2026: ROI of AI-Assisted Software Development** — delivery metrics, organizational outcomes, correlation vs. causation framing.
- **Lost in the Middle: How Language Models Use Long Contexts** — empirical evidence of context-retrieval failure modes in long inputs.
- Additional supporting literature on code generation correctness, hallucination rates, and review burden.

### What "Productivity" Actually Means Here

Throughout this research, *productivity* is treated as a composite. It includes throughput (PRs merged, lead time), correctness (functional behaviour on held-out tasks), and maintainability (review burden, defect rate over time). Conflating these is the most common error in public AI-productivity discourse, and the reason most headline numbers cannot be compared directly.
