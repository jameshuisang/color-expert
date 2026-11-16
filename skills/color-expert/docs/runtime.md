# One color expert, host-mediated execution

The user addresses one color expert. Its lead chooses relevant knowledge and delegates internal specialists when needed. Every evaluated revision must be seen in a live browser and critiqued by a separate context-isolated reviewer. The host supplies model execution, browser vision and subagent spawning; the local controller records and checks their work. No unattended model calls or automatic spawning are implemented in this CLI.

## Execute

```sh
node scripts/workflow.mjs start brief.json
node scripts/workflow.mjs submit RUN candidate.json
node scripts/workflow.mjs prepare-visual RUN
# Lead delegates independent-review-request-N.json to a fresh reviewer.
# Reviewer opens the exact live HTML URL in a visual browser, sees the rendered
# colors, reads the binding meta, and returns scored critique. No PNG required.
node scripts/workflow.mjs review RUN review.json
node scripts/workflow.mjs status RUN
```

`start` snapshots selectively retrieved sources and scoped memories. `submit` validates six opaque sRGB tokens, calculates five text ratios, renders SVG/HTML and stops at awaiting-visual. The HTML omits author rationale to reduce reviewer priming. `prepare-visual` creates a live-document handoff and independent review packet, then awaits review. It does not create or require PNG files. Existing historical PNG demonstrations remain untouched.

The handoff records URL, HTML hash, SVG hash and a unique run/revision binding token embedded in the page. The reviewer must open that URL, read the token from the live DOM and actually inspect browser pixels. Text snapshots/DOM/computed styles alone are NOT sight. A browser visual tool can return a transient image internally; no persisted screenshot deliverable is required. If visual capability or a separate reviewer is unavailable, STOP and report the blocker.

## Review contract

`artifactHash` matches the submitted SVG. `visualEvidence` includes `url`, `documentHash`, `bindingToken`, `session`, `visualCapability: true`, and the actual `inspectionMethod`. `visualInspected: true` is required, along with reviewer, observations, changes and verdict (`accept` or `revise`).

`independentReview` includes `separateAgent: true`, `contextSeparated: true`, a non-lead `agentId`, and `scores` plus `reasons` for each dimension: hierarchy, legibility, briefFit, coherence. Integer scores: 0 unusable, 1 major defects, 2 mixed, 3 meets brief, 4 strong. Acceptance requires every dimension >=3 AND all five objective contrast gates. Low scores require a revision verdict and actionable changes. Technical failure cannot be accepted. Revisions are bounded (default 2, max 3); exhaustion stops at needs-user-decision.

The reviewer receives the brief, live visual handoff and rubric, not author rationale or earlier verdicts. Separate context reduces priming; it cannot guarantee an unbiased model. Review scores are rubric-based subjective judgments, not calibrated scientific beauty measurements. Objective contrast values remain separate from those scores.

## Lead delegation policy

- Color lead: interpret intent, select routes, propose candidates, assemble evidence and act on critique.
- Independent visual reviewer: mandatory for EVERY evaluated revision. Use fresh context (`fork_turns: none`) and the narrow packet, with real browser vision. Never substitute the author or simulate a separate agent.
- Numerical helper: use deterministic scripts for supported color conversions, gamut and text checks.
- Optional specialist: delegate a bounded color-management, material/light or procedural question when it is relevant. Return findings to the same lead; do not turn internal roles into additional user-facing experts.

This is an explicit host orchestration contract, not a claim that JSON files spawn agents themselves. If a host cannot spawn a separate reviewer it cannot complete this acceptance workflow.

## Proof and scope limits

The controller rejects missing/stale document evidence, modified local HTML/SVG, absent visual capability, absent independent review, lead self-review and subthreshold acceptance. It verifies strings and artifact hashes, not identity or cognition. A malicious trusted local caller could fabricate session, token, vision and separate-agent attestations. Live DOM manipulation after loading is not independently authenticated by this local gate. The host must inspect and review the unchanged current document, reloading if needed. No external authenticated browser/model receipt service is installed.

The renderer is a fixed 1000×700 study, not an actual finished app. Five opaque-sRGB text pairs at 4.5:1 do not certify whole-interface accessibility. No alpha, gradients, P3 rendering, interaction states, mobile or physical proof is implied. Runs are single-writer; interrupted writes require inspection, not blind replay. Old runs predate this contract and remain historical; start a fresh run rather than fabricate missing evidence.

## Learning

Real user feedback is scoped, versioned, correctable and revocable; see `docs/learning.md`. Model critique or rubric success cannot self-promote into user preference or scientific fact. Learning changes local retrieval, not model weights. No new genuine preference is saved by synthetic verification runs.

## Tool discovery

Before delegation and visual review, follow `docs/visual-tool-discovery.md`: inspect actual host tools and the selected environment, discover an authorized visual browser such as exposed Playwright or Egolite, read its guidance, and verify rendered visual output. Availability is not assumed, no install or permission bypass is implied, and lack of vision blocks acceptance. The reviewer must verify its own capability after delegation.

## Explicit domain preflight (2026-11-15)

New runs require `brief.task` (see `examples/workflow-brief.json` and `docs/domain-contracts.md`). Missing or mismatched domain fails; the static UI renderer accepts only `states:["default"]`. Full UI-state, data and material evaluations require appropriate host renderers. Author/reviewer packets include domain questions and limits. The existing four-score review gate only completes a static palette study, not a production UI or a domain comprehension test. UI retrieval is now role/state/mode-first; broad expressive-art references are optional instead of automatically dominating UI context.

## Actual-interface adapter

`docs/actual-interface-review.md` documents an optional self-contained HTML path that retains the actual composition and declared interactive states. It is separate from the static six-token controller above. It does not restore the original research dashboard or claim arbitrary-app support. Its pass/fail/unverified result applies only to frozen case coverage and host-supplied evidence.
