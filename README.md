# Color expert

A color-design skill, source-indexed knowledge library and numerical/review toolkit. It helps an agent choose and assess color relationships for the context, medium and intended story. MIT applies to original project contributions; third-party notices retain their own terms.

```text
skills/color-expert/
  SKILL.md              Agent entry point
  color/                Indexed knowledge
  scripts/              Numerical and review tools
  docs/                 Usage and limits
  examples/             Example inputs
  tests/                Regression and independent-oracle checks
```

## Installation

Repository: [jameshuisang/color-expert](https://github.com/jameshuisang/color-expert). Once the skill files are available there:

```sh
npx skills add jameshuisang/color-expert --skill color-expert
```

At release preparation, the local-path installation below was verified with Skills CLI1.9.0; installation from GitHub had not yet been tested.

### Local installation

From the project where you want to use it, run the Skills CLI against this package folder:

```sh
npx skills@1.9.0 add /absolute/path/to/color-expert-skill-package --skill color-expert --agent codex --copy --yes
```

The absolute path above is a placeholder for the folder you actually extracted. Choose your supported agent rather than copying `codex` blindly. No global installation is required. The GitHub command uses the same self-contained skill layout, but a successful local installation alone does not verify the remote download.

Then ask the agent: “Use color-expert to choose or review the colors for this brief.” Host discovery/automatic invocation differs; explicit fallback is to read the installed SKILL.md. The agent reads bundled assets relative to that file.

From the installed skill folder, run `npm ci --ignore-scripts --offline` and `npm run check`. There are no runtime npm dependencies. The package does not provide a model, browser, separate reviewer or background service.

Use an explicit private workspace path for interface review outputs. Do not share user artifacts or feedback with the source package. The legacy static workflow and feedback ledger write relative to their supplied/root directory; installation does not make them an external hosted service. See the bundled runtime/quickstart documentation.

## Release boundary

Read the bundled RELEASE-NOTES.md and THIRD-PARTY-NOTICES.md. Targeted independent review covered installation, test oracles, source notices, concise creator attribution and known private-material exclusions. It is not exhaustive legal, privacy or security clearance. Current tests do not prove superior taste, universal accessibility or absence of bugs.

