# Project Checks

I sometimes add a structured review with a `:::quiz` block. I use these for test criteria, troubleshooting branches, and pre-power checklists. When I add more than one block, Crucible presents them as a sequence.

## Example

```text
:::quiz
question: What should be checked before applying power?
options:
  - Polarity, continuity, expected voltage, and current limit (correct)
  - Only the enclosure dimensions
  - Nothing if the schematic looks right
explanation: Record the expected voltage, polarity, current limit, and continuity checks before power-on.
:::
```

Each check gives me selectable options, feedback, and room to explain why the right answer matters.
