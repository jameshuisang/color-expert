<h1 align="center">Color Expert</h1>

## Install

```sh
npx skills add jameshuisang/color-expert --skill color-expert
```

Then describe your task to your agent. You do not need to choose individual knowledge modules or tools. If your host does not discover the skill automatically, ask it to use `color-expert` or read the installed `SKILL.md`.

The skill provides instructions, indexed color knowledge, and numerical/review tools. Your agent host provides the model. Local scripts require **Node 20+ and npm**; visual acceptance also requires an authorized browser with rendered vision and a fresh separate reviewer. Installation does not supply those capabilities or a background service.

<details>
<summary>Install from a local copy and check the tools</summary>

From your project, replace the placeholder below with the full path to the skill package directory containing `SKILL.md`. Choose your supported agent rather than copying `codex` blindly.

```sh
npx skills@1.9.0 add /absolute/path/to/skills/color-expert --skill color-expert --agent codex --copy --yes
```

Keep the complete skill folder, not just `SKILL.md`. No global installation is required. The GitHub command installs the published version, not unpublished local changes.

From the installed skill folder:

```sh
npm ci --ignore-scripts --offline
npm run check
```

There are no runtime npm dependencies. See [Using Color Expert](skills/color-expert/guides/getting-started.md) for the complete review sequence.

</details>

## Try it

Ask for the outcome you need:

- **Choose a palette:** “Choose colors for a neighborhood seed library. It should feel welcoming and practical, not like a luxury skincare brand. Show how the colors work on a seed packet and a website.”
- **Review an interface:** “Review this dashboard's colors without changing its layout. Check hierarchy, status distinctions, and text contrast in the default and error states. Show what you measured and what remains unverified.”
- **Adapt across media:** “This brand works on screen but feels different on uncoated packaging. Help diagnose the effects of paper, ink, lighting, and surrounding colors before proposing changes.”

Provide the audience, medium, intended impression, and existing constraints. For image, video, print, or physical work, the agent needs appropriate host tools and actual output review; the bundled tools are not a grading application or physical renderer.

## How it works

1. **Understand.** Inspect the brief or existing work, identify constraints and retrieve only the relevant color knowledge.
2. **Make.** Choose or adjust color roles in context. Preserve what works and compare alternatives when the decision is open.
3. **Judge & Act.** Measure what can be checked, obtain independent visual review, then fix the diagnosed issue or recommend the next useful step within the user's scope.

These are responsibilities, not a fixed sequence. A narrow measurement can skip exploration; a review can start from the existing artifact. The expert should anticipate relevant problems and act on authorized work, not wait for instructions at every step. It does not gain permission to publish, upload or make external commitments.

Numerical passes do not prove good taste, complete accessibility, physical color accuracy, or absence of bugs. Independent review is required by the workflow, but a submitted JSON flag alone cannot authenticate a reviewer.

## Repository structure

```text
skills/color-expert/     Self-contained installable skill
  SKILL.md              Agent entry point
  knowledge/            Color reasoning and attributed sources
  guides/               Task instructions
  tools/                Runtime checks and workflows
  templates/            Copyable starting inputs
  licenses/             Third-party license texts
verification/           Maintainer tests, evaluation plans and reports
CONTRIBUTING.md          Development and release checks
```

The installed skill carries everything it needs at runtime. `npm run check` inside it runs integrity and smoke checks. Full regression and mutation checks run from the repository root; see [Contributing](CONTRIBUTING.md). Evaluation plans are not proof of creative quality.

## Private project feedback

Optional persistence stores only authorized user feedback in an explicit **private directory outside the installed skill**. Keep user artifacts and review outputs there too. The public package is not a private data store, and installation is not consent to upload feedback. It does not automatically retrain a model or share learning across users. See [Private feedback](skills/color-expert/guides/private-feedback.md) for setup, revocation, and rollback constraints.

## Documentation

[Using Color Expert](skills/color-expert/guides/getting-started.md) · [Interface review](skills/color-expert/guides/interface-review.md) · [Media workflows](skills/color-expert/guides/media-workflows.md) · [Test oracles](verification/test-oracles.md) · [Release notes](verification/reports/RELEASE-NOTES.md)

## License

[MIT](LICENSE) applies to original project contributions. Third-party material retains its own terms; read [Third-party notices](skills/color-expert/THIRD-PARTY-NOTICES.md). Targeted review is not exhaustive legal, privacy, or security clearance.

