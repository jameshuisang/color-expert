# Color Expert

Read `SKILL.md` in your agent host, then describe the outcome, medium and constraints. The expert can start by understanding the brief, making a color choice, or judging existing work. It should take the next useful in-scope step rather than force every request through a long process.

## Start

Run from this installed folder:

```sh
npm ci --ignore-scripts --offline
npm run check
```

This checks the package manifest, reference routes and one numerical smoke-test anchor. It does not run the repository regression suite or review an image. There are no runtime dependencies; your host supplies the model, visual tools and separate reviewer.

- [Getting started](guides/getting-started.md): choose a supported workflow.
- [Interface review](guides/interface-review.md): inspect self-contained HTML, states and viewports.
- [Palette study](guides/palette-study.md): limited static UI/poster exploration.
- [Media workflows](guides/media-workflows.md): print, materials, photo and video boundaries.
- [Constrained recoloring](guides/locked-color-edits.md): check protected-layer conflicts before editing.
- [Private feedback](guides/private-feedback.md): optional external storage, correction and revocation.

## Numerical tools

```sh
node tools/contrast.mjs templates/palette.json
node tools/ramp.mjs templates/sequential-ramp.json
node tools/spaces.mjs templates/space-conversion.json
```

Use opaque sRGB inputs for the contrast checker. A numeric pass does not establish visual quality or full accessibility. SVG text, alpha, gradients and other unsupported paint need qualified measurement; do not report a fabricated pass.

## What belongs here

`knowledge/` contains indexed color guidance and attributed sources. `guides/` explains supported tasks. `tools/` runs checks and review workflows. `templates/` provides copyable starting inputs, not approved final designs. Required third-party texts live in `licenses/`.

Do not save artifacts or feedback inside this folder. Stateful workflow commands require `--state-dir` pointing to an existing external owner-only directory. No automatic migration, model retraining or cross-user sharing occurs. Revocation stops retrieval but does not erase history; complete store rollback remains undetectable locally.

MIT applies to original work. Preserve [third-party terms](THIRD-PARTY-NOTICES.md). Maintainer tests, evaluation plans and historical reports live in the source repository's `verification/`, not in the installed skill.
