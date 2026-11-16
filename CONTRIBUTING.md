# Maintaining Color Expert

The installable skill is `skills/color-expert/`. All its runtime tools, guides, templates and required notices must work after that directory is copied alone. Private runs and feedback belong outside both repository and installation.

Run from the repository root:

```sh
npm ci --ignore-scripts --offline
npm run check
```

This runs regression tests, targeted fault injection and the installed skill's integrity/smoke checks. Run `npm run test:browser` separately in an environment allowed to launch Chrome/Chromium. The browser regression reports a skip when no browser is installed, and a launch failure remains a failure. `npm run check` does not include real-browser execution. Neither a skip nor the core suite proves browser paint behavior.

- `verification/tests/`: regression and independently specified oracle checks.
- `verification/evaluations/`: candidate creative evaluation protocols, not completed benchmarks.
- `verification/reports/`: dated release and validation records; historical results do not automatically transfer to a new revision.
- `verification/test-oracles.md`: independent expectations, counterexamples and mutation methodology.
- `verification/source-intake.md`: source selection and attribution requirements.

Preserve scientific qualifications and third-party license text. Keep runtime paths relative to the skill root. Before updating the manifest, review the exact additions/removals; checksums are not privacy or rights clearance. Never include private feedback, user captures, run outputs, credentials or OS metadata in a release. Do not publish changes without authorization.
