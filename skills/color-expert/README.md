# Color expert

A local color-design skill, source-indexed library and numerical/review toolkit. It helps an agent choose and assess color relationships for a brief. It is not a trained model, standalone app, background service or guarantee of better taste.

## Use with an agent

Use this installed skill by asking your agent to apply color-expert. For explicit invocation from the skill directory, ask:

> Read `SKILL.md`. Propose colors for a welcoming evening arts event. Define the story, color roles and proportions, show a meaningful alternative, and inspect the result with an independent visual reviewer.

Keep the folder intact: references resolve relative to its root. Automatic discovery differs by host; explicit invocation is the supported fallback. The host supplies model access, filesystem tools, browser vision and separate review. Without those capabilities, it can offer analysis but cannot claim the full visual gate passed. Cross-host installation is not certified.

## Local checks

Requires Node 20+ and npm. No external npm dependencies or model/API calls in this package.

```sh
npm ci --ignore-scripts
npm run check
node scripts/contrast.mjs examples/palette.json
node scripts/ramp.mjs examples/sequential-ramp.json
node scripts/spaces.mjs examples/space-conversion.json
```

Examples are synthetic. Contrast covers opaque sRGB pairs, not whole-interface accessibility. Ramp/conversion tools state their own limits.

## Applied review loop

```sh
node scripts/workflow.mjs start examples/workflow-brief.json --state-dir /absolute/private-state
```

Follow `docs/runtime.md` to submit a candidate, prepare a live preview and obtain independent review. The controller records evidence; it does not call models or spawn reviewers. Its fixed UI/poster preview is not a production app. No personal feedback is bundled; optional learning starts empty.

## Included

A project-scoped skill; attributed color-science, composition/context notes; contrast/space/ramp/data/domain/light diagnostics; host-mediated review/feedback code; synthetic examples, focused tests and small unrun evaluation specifications.

## Excluded

Captured brand CSS/screenshots and derived palette systems, private feedback/receipts, experiment histories, generated reports, procedural-graphics work, APCA integration and its runtime dependencies. The original working project is preserved separately.

MIT applies to original work, not a grant over third-party material. Read `RELEASE-NOTES.md` and `THIRD-PARTY-NOTICES.md` before distribution.

## Actual-interface review

First create the external private state directory following `docs/private-state-usage.md`.

Keep your self-contained HTML composition and interaction instead of adapting it to the fixed palette study. Declare viewport/state observations, prepare an immutable revision, collect browser evidence, and use a fresh independent rendered reviewer. See `docs/actual-interface-review.md`.

```sh
node scripts/interface-review.mjs prepare examples/interface-study.html examples/interface-contract.json "$HOME/color-expert-private-state/interface-01"
# Copy generated evidence.template.json to evidence.json; fill only verified observations.
# Host performs actual interactions and independent pixel review.
node scripts/interface-review.mjs assess "$HOME/color-expert-private-state/interface-01" "$HOME/color-expert-private-state/interface-01"/evidence.json
```

Prepared means unverified (exit 3). This adapter has no fixed palette/style rule. It conservatively supports opaque sRGB text measurement; complex paint and nontext require explicit qualified review/measurement. It is not an arbitrary framework-app launcher or an automatic browser service.

## First-run checklist

1. Keep the complete folder and run `npm ci --ignore-scripts --offline`, then `npm run check`. The check verifies tests and the release manifest; it is not secret/privacy clearance.
2. Explicitly invoke the skill in your agent editor using the prompt above. No global installation, paid service or API key is bundled.
3. Choose numerical checks, the actual-interface adapter, or the limited static palette study. Do not confuse these different scopes.
4. For actual-interface review, prepare a new run and fill the generated evidence template with real browser observations and fresh independent review. Its defaults intentionally cannot pass.
5. If vision, separate agents or supported paint are missing, report unverified and keep the useful analysis. Do not invent evidence to finish.

See `docs/quickstart.md` for a complete supported workflow and `docs/actual-interface-verification.md` for the bounded browser result already obtained. Keep runs and personal feedback out of any shared copy.

## Test quality

`npm run test:mutations` runs a small fault-injection check on temporary copies. See `docs/test-oracles.md` for independent oracle provenance, known test gaps and the distinction between integrity and efficacy. Passing tests are not a guarantee of creative quality or freedom from circular tests.

## Across media

Use `cross-media-appearance`, `print-proofing` and `photo-video-grading` for surfaces, lighting, surround, print and grading. The skill separates diagnosis from execution. `docs/media-workflows.md` explains the declaration preflight and what still requires actual media tools and review.

## Private feedback storage

Static workflow commands now require `--state-dir` pointing to an existing external owner-only directory. No automatic legacy migration or erasure occurs. Checkpoints catch detected tail damage, not whole-store rollback. Revoked/revised consumed feedback blocks old runs from resuming. Read `docs/learning.md` before enabling persistence.

For complete optional-persistence setup, feedback commands and retention/rollback limits, read `docs/private-state-usage.md`.

Start with [Using Color Expert](docs/quickstart.md).
