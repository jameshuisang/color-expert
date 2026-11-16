# Check a constrained recoloring plan

Read the `locked-color-edits` knowledge route. Before generation, map instructions to actual layers/regions and distinguish protected geometry, stroke and fill. A color choice that changes a protected property is a conflict, even if the palette sounds appropriate.

```sh
node tools/edit-constraints.mjs templates/edit-plan.json
```

The template is synthetic, not a verified mapping of your image. Replace it with the actual plan. Every region needs a unique `id`, a parent ID or `null`, and a `locked` list drawn from `geometry`, `stroke`, `fill`. Every write names a region, property and intended value. Declare overlap pairs and whether mapping is complete; an empty overlap list is a host assertion, not detected geometry.

The checker treats writes to parents as affecting descendants and locks on parents as protecting descendants. Writes that could overlap protected fill/stroke are conservatively blocked. Exclusion masks and paint-order proofs are not modeled: use more precise disjoint region definitions, or retain an unverified outcome and use an appropriate host tool. Do not invent disjoint regions merely to pass.

- Exit 0, `consistent-declaration`: no contradiction found in those declarations. This is NOT permission or proof of preserved pixels.
- Exit 1, `contradiction`: protected write, potential occlusion or conflicting assignments. Drop an optional conflicting edit; ask when resolving it would change the user's requirements.
- Exit 2: malformed schema. Correct the input; do not silently reinterpret it.
- Exit 3, `incomplete`: missing/unmapped targets or overlap information. Inspect the source before proceeding.

The tool does not understand free-form prose, find aliases automatically, inspect images, enforce layers or prove that an output matches a source. A declared lock does not create one. For exact preservation, use a genuinely constrained editor/renderer and compare the resulting protected geometry/contours to the source. Then judge the whole scene: object/material distinctions, story, focal hierarchy and color relationships separately. A focal improvement cannot excuse failed preservation.
