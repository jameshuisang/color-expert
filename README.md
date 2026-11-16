# Color Expert

Help your agent choose and review colors for the story, audience, and medium, rather than apply the same palette everywhere.

[Install](#install) · [Try it](#try-it) · [How it works](#how-it-works) · [Documentation](#documentation)

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

There are no runtime npm dependencies. See [Using Color Expert](skills/color-expert/docs/quickstart.md) for the complete review sequence.

</details>

## Try it

Ask for the outcome you need:

- **Choose a palette:** “Choose colors for a neighborhood seed library. It should feel welcoming and practical, not like a luxury skincare brand. Show how the colors work on a seed packet and a website.”
- **Review an interface:** “Review this dashboard's colors without changing its layout. Check hierarchy, status distinctions, and text contrast in the default and error states. Show what you measured and what remains unverified.”
- **Adapt across media:** “This brand works on screen but feels different on uncoated packaging. Help diagnose the effects of paper, ink, lighting, and surrounding colors before proposing changes.”

Provide the audience, medium, intended impression, and existing constraints. For image, video, print, or physical work, the agent needs appropriate host tools and actual output review; the bundled tools are not a grading application or physical renderer.

## How it works

1. **Frame the decision.** Identify the purpose, medium, audience, and readings to encourage or avoid.
2. **Retrieve relevant guidance.** Load the applicable color references rather than the whole library.
3. **Apply color in context.** Assign dominant, supporting, and focal roles; consider proportion, adjacency, and a meaningful alternative.
4. **Check and review.** Run supported numerical checks and obtain fresh independent rendered review for creative evaluations. Missing evidence stays unverified.
5. **Explain the recommendation.** Report assumptions, tradeoffs, sources, checks, and what still needs review.

Numerical passes do not prove good taste, complete accessibility, physical color accuracy, or absence of bugs. Independent review is required by the workflow, but a submitted JSON flag alone cannot authenticate a reviewer.

## Inside the skill

```text
skills/color-expert/
  SKILL.md              Agent entry point
  color/                Indexed knowledge
  scripts/              Numerical and review tools
  docs/                 Additional context and guidance
  examples/             Example inputs
  tests/                Regression and independent-oracle checks
```

`color/` informs color decisions. `docs/` explains how to operate and maintain the toolkit. `scripts/` runs supported checks; `tests/` checks scoped behavior, not creative superiority.

## Private project feedback

Optional persistence stores only authorized user feedback in an explicit **private directory outside the installed skill**. Keep user artifacts and review outputs there too. The public package is not a private data store, and installation is not consent to upload feedback. It does not automatically retrain a model or share learning across users. See [Private state](skills/color-expert/docs/private-state-usage.md) and [Learning](skills/color-expert/docs/learning.md) for setup, revocation, and rollback constraints.

## Documentation

[Using Color Expert](skills/color-expert/docs/quickstart.md) · [Interface review](skills/color-expert/docs/actual-interface-review.md) · [Media workflows](skills/color-expert/docs/media-workflows.md) · [Test oracles](skills/color-expert/docs/test-oracles.md) · [Release notes](skills/color-expert/RELEASE-NOTES.md)

## License

[MIT](LICENSE) applies to original project contributions. Third-party material retains its own terms; read [Third-party notices](skills/color-expert/THIRD-PARTY-NOTICES.md). Targeted review is not exhaustive legal, privacy, or security clearance.
