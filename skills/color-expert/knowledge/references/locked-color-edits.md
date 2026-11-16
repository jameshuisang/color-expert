# Color edits with locked structure

A project method to test, not a claim of proven better taste. Use it when the user wants color changes while preserving linework, geometry, objects or material identity. It does not replace the existing independent rendered-review requirement.

## Resolve the editing contract first

Translate the preservation request into named layers/regions and protected properties before assigning colors. Distinguish geometry, stroke/linework and interior fill. Map every proposed edit to those same identifiers. “Keep every black line” and “make the dark mortar cream” conflict if the mortar is part of the protected line layer. Do not send both instructions and hope the generator resolves them. Drop the conflicting edit when it is optional; otherwise ask which requirement takes priority.

A group edit affects its children unless the actual tool provides a verified exclusion. Check overlaps and paint order: recoloring a separate shape can still cover a protected outline. Missing mappings are unknown, not permission. `tools/edit-constraints.mjs` checks explicit declarations, not prose, image geometry, real layer contents or actual tool enforcement.

When exact preservation matters, prefer fills beneath an immutable line layer or edits restricted to known interior regions. A prompt is not a lock. Retain the source and inspect registered contours/regions after editing; do not claim exact preservation from an attractive preview. If the tool cannot enforce or verify the constraint, offer an approximate study only within the user's allowed scope, or stop for a suitable workflow.

## Compare different scene structures, not just different accents

When exploration is authorized, make two plausible distributions while holding drawing, content and viewing conditions fixed:

- **Structure-led:** keep enough light–dark/chroma separation for the main frame, base, tools and material changes to read. The focal subject belongs inside that larger structure.
- **Focal-led:** concentrate emphasis on the relevant gesture, object or action while keeping supporting objects identifiable. Do not automatically make every support pale or gray.

These are comparison hypotheses, not mandatory styles or a demand for vivid color. On a greenhouse drawing, one option might distinguish the frame, wood and wheels through different values; another might reduce those contrasts to emphasize hands and a flower. Either can serve the brief. Compare the whole scene before preferring the clearer focal point. Do not recolor protected outlines to manufacture either option.

Name the important material or object distinctions before making colors: for example metal frame versus timber shelf, transparent pane versus solid wall, wheel versus ground. Color alone need not communicate physical material truth, and a screenshot cannot verify a real material. The question here is whether the intended drawing remains intelligible.

## Judge the full scene, then act

Have the reviewer inspect the source and candidates without the author's rationale. Report separately:
1. Preservation: were protected features retained? Exact fidelity requires the relevant evidence, not a taste score.
2. Object/material legibility: can the intended parts still be distinguished, including large structural regions and small functional details?
3. Story and scene character: does the whole setting convey the requested reading?
4. Focal hierarchy: does the important gesture/action attract attention without sacrificing required distinctions?
5. Color relationships and preference: what unifies the image, what competes, and which tradeoff is preferred for this brief?

An improvement in focal hierarchy cannot compensate for a failed preservation constraint. For subjective tradeoffs, preserve the stronger earlier option or make the diagnosed local correction; do not automatically desaturate or lighten the rest. Record reviewer/user disagreement rather than declaring one taste objectively correct. A small controlled evaluation can reveal regressions, but cannot establish universal effectiveness.
