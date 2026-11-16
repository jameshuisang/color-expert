# Color expert

A color-design skill, source-indexed knowledge library and numerical/review toolkit. It helps an agent choose and assess color relationships for the context, medium and intended story. MIT applies to original project contributions; third-party notices retain their own terms.

```text
skills/color-expert/
  SKILL.md              Agent entry point
  color/                Indexed knowledge
  scripts/              Numerical and review tools
  docs/                 Additional context and guidance
  examples/             Example inputs
  tests/                Regression and independent-oracle checks
```

## Installation

Repository: [jameshuisang/color-expert](https://github.com/jameshuisang/color-expert). Once the skill files are available there:

```sh
npx skills add jameshuisang/color-expert --skill color-expert
```

The published baseline was verified through a GitHub installation as well as local-path installation. The private-state remediation in this working copy has not yet been published or remote-installed; its verification is tracked separately.

### Local installation

From the project where you want to use it, run the Skills CLI against this package folder:

```sh
npx skills@1.9.0 add /absolute/path/to/color-expert-skill-package --skill color-expert --agent codex --copy --yes
```

The absolute path above is a placeholder for the folder you actually extracted. Choose your supported agent rather than copying `codex` blindly. No global installation is required. The GitHub command installs the published version, not unpublished changes in a local working copy.

Then ask the agent: “Use color-expert to choose or review the colors for this brief.” Host discovery/automatic invocation differs; explicit fallback is to read the installed SKILL.md. The agent reads bundled assets relative to that file.

From the installed skill folder, run `npm ci --ignore-scripts --offline` and `npm run check`. There are no runtime npm dependencies. The package does not provide a model, browser, separate reviewer or background service.

Use an explicit private workspace path for interface review outputs. Do not share user artifacts or feedback with the source package. Static workflow and feedback storage require an explicit external private state directory; the installation is not a private data store or a hosted service. See the bundled runtime/quickstart documentation.

## Verification

Read the bundled RELEASE-NOTES.md and THIRD-PARTY-NOTICES.md. Targeted independent review covered installation, test oracles, source notices, concise creator attribution and known private-material exclusions. It is not exhaustive legal, privacy or security clearance. Current tests do not prove superior taste, universal accessibility or absence of bugs.


## What the folders mean

`color/` contains the expert's indexed domain knowledge and source notes: what to consider when making color decisions. `docs/` explains how to install, use, verify and maintain the toolkit, including its limitations. `scripts/` performs the supported checks; tests verify scoped behavior. These are complementary, not duplicate documentation folders.

For optional persistence, follow the installed `docs/private-state-usage.md`. State is private and external to the skill; public installation is not consent to upload feedback.

Start with [Using Color Expert](skills/color-expert/docs/quickstart.md).
