# Pair judgement in an applied color workflow

This is our proposed design method. It uses the distinctions in `pair-research`, while retaining a context-first objective. It is not a replication, universal beauty formula, or an evaluated improvement.

## Ask four different questions

Record each answer separately, on its own anchored scale; do not pool raw scores into a beauty percentage.

| ID | Rating target | Question to a reviewer |
|---|---|---|
| `pairHarmony` | the two colors together | Do these colors feel connected and mutually supportive here? |
| `pairPreference` | the whole combination | How much do you personally like the whole combination? |
| `foregroundPreference` | one named focal region on its actual ground | How much do you like this region's color as it appears against this background? |
| `briefFit` | communication in the application | How well does the color treatment communicate this brief? |

For the first three, explain the target without priming a desired outcome. A high foreground score must not overwrite a low whole-composition score. Do not ask merely which is “best.” Keep salience (what is noticed first), recognizability and task success separate from foreground liking. A focal color can attract attention and still be disliked.

## Diagnostic choices, not automatic fixes

1. **Whole treatment feels disconnected:** try a more related supporting family while preserving the needed focal distinction. This is a candidate, not mandatory analogous harmony. Compare against the retained original.
2. **Cohesive but dull:** preserve the unifying relationship and try changing focal-to-ground lightness before adding another hue. If that destroys the intended mood, reject it. Do not equate increased contrast with guaranteed appeal.
3. **Focal color feels weak on its ground:** hold the focal color fixed and audition backgrounds. Separate hue, lightness and chroma variations; inspect both focal liking and the whole composition. Repeat with the actual intended lightness difference instead of assuming a hue-contrast effect always transfers.
4. **Tempted to desaturate everything:** inspect whether the complaint concerns harmony, reading, mood, or personal liking first. Changing all colors at once makes a diagnosis difficult and may erase the story.
5. **Strong aesthetic scores but wrong story:** keep brief fit as a separate requirement. Do not force a conventional harmony solution onto an intentionally unsettling scene, urgent warning or exuberant brand.

## Controlled comparisons

Keep actual composition, text, shape, area, adjacency and viewing size fixed within a diagnostic comparison. Add a role-swap as a separate condition, not as a duplicate measurement. Compare both the application and a simple pair study, but never let the latter certify the former.

Use a declared space for constructing variants, record resulting delivered colors and test gamut before rendering. If an OKLCH hue change also changes rendered luminance, report the confound or redesign the control. Equal OKLCH L is not equal luminance; HSL saturation is not perceptual chroma. Preserve valid functional contrast and non-color cues in user-facing candidates. In a laboratory-only low-contrast stimulus, flag the stimulus as unsuitable for functional text rather than silently failing accessibility.

Collect rationale-blind observations first. Freeze review targets, hypotheses, rejection criteria and budget before generation. Use the independent live-pixel reviewer for each evaluated revision. If human observers are unavailable, label feedback model-critic-only; do not claim human preference or population prediction. Compare pre/post expert snapshots on unseen briefs before claiming learning improved outcomes.

## Candidate diagnostic module

`evals/contextual-harmony/pair-diagnostics.json` specifies an unrun development module. It does not authorize recruiting participants, save invented preferences, enforce one aesthetic direction, or bypass the existing rendering/independent-review gate. Applicable source claims are in the compact evidence note; this guide supplies project hypotheses, not new scientific findings.
