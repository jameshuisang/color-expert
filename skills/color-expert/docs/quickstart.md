# Using Color Expert

## Requirements

Node 20+ and npm for local tools. An agent host that can read this folder for design reasoning. Actual creative acceptance additionally requires an authorized browser with rendered vision and a fresh separate reviewer. Installation does not supply any of those host capabilities or create accounts.

```sh
npm ci --ignore-scripts --offline
npm run check
```

Run from this folder. Open the whole folder in the editor, explicitly tell the agent to read the project skill, and provide audience, medium, intended impression, functional purpose and any existing constraints. Missing details should become stated assumptions, not a universal preset.

## Choose the right path

- Quick numeric question: run the contrast, ramp or space examples shown in the README. No visual-quality conclusion follows.
- Existing self-contained HTML: use the actual-interface adapter below. Preserve its composition and behaviour.
- Early palette exploration: use the static workflow documented in `docs/runtime.md`. It is a fixed study, not a finished application.
- Framework apps, external resources, complex compositing, print or physical materials: use appropriate host tools and explicitly report what remains unsupported. Do not flatten the task into the example just to obtain a pass.

## Actual interface, complete sequence

First create a new owner-only external directory as described in `docs/private-state-usage.md`; these examples use $HOME/color-expert-private-state.

```sh
npm run interface -- prepare examples/interface-study.html examples/interface-contract.json "$HOME/color-expert-private-state/my-first-review"
cp "$HOME/color-expert-private-state/my-first-review"/evidence.template.json "$HOME/color-expert-private-state/my-first-review"/evidence.json
```

Prepare returns exit 3, meaning pending/unverified. The directory exists and is ready; do not chain the copy with `&&`. Reusing an existing run directory is rejected to protect prior evidence. Use a new name for every revision.

Have the host read the generated review request and open the frozen page. Set each declared viewport and operate the stated controls. Collect measurements using the browser helper, record actual state assertions, and delegate fresh independent pixel review. The template includes all required fields but none of its observation or review defaults count as evidence. Follow `docs/actual-interface-review.md`; browser-specific commands differ by host.

```sh
npm run interface -- assess "$HOME/color-expert-private-state/my-first-review" "$HOME/color-expert-private-state/my-first-review"/evidence.json
```

- Exit 0: all declared checks passed within scope.
- Exit 1: measured or contextual failure; fix in a new revision.
- Exit 2: invalid/mismatched evidence; inspect the error, do not weaken the contract.
- Exit 3: missing/unsupported evidence; report unverified honestly.

A pass is not full accessibility or superior taste. The supplied contract covers selected text in desktop default and mobile error states; extend coverage deliberately for a real product. No real registration or external submission occurs in the example.

## Troubleshooting

- Missing file/source: retain the folder structure and run from the root.
- Manifest mismatch: the candidate has changed. Review the changed file; do not regenerate checksums blindly to conceal unknown additions.
- No reviewer/vision: stop acceptance, preserve analysis and report the missing host capability.
- Unsupported alpha/gradient/nontext: do not override supported flags; use qualified measurement or leave unverified.
- Cannot load local HTML: use an authorized host that supports the artifact; this package does not automatically create a server or upload your work.

Keep runs, feedback and user files private. This skill is published under its stated license with separate third-party terms; private run data is not part of the public package.

For complete optional-persistence setup, feedback commands and retention/rollback limits, read `docs/private-state-usage.md`.

## What it can and can’t verify

It can run supported numeric checks, identify declared workflow contradictions, bind review evidence to files, and stop when required evidence is missing. It cannot guarantee aesthetic quality, authenticate a reviewer merely from a submitted JSON flag, prove physical display/print accuracy from a screenshot, or prevent a complete private-store rollback without an independent authority. Photo/video/material guidance still needs appropriate host tools and real output review.
