# UI color: operational meaning before expression

Project method revised 2026-11-15 after a constrained evaluation exposed thin UI guidance. Sources below were read in selected sections, not full audits. This is a design/verification method, not a promise of usability or full accessibility conformance.

## U1 — Start with the user's task and role/state/mode table

State the action and expected result: book, cancel, retry, select, locate focus. Define semantic tokens for foreground/surface/action/status/selection/focus, not swatch names alone. Enumerate actual states and themes before assigning values. An action accent must not accidentally look selected, disabled or erroneous. Keep meaning stable as values adapt to light/dark backgrounds. A neutral structural system can leave color more available for actions/status; tinted neutrals are allowed when the roles remain clear. No rule that green is inherently calm or blue inherently trustworthy.

IBM Carbon's creator-authored system uses role tokens, interaction states and theme-specific layering. Its exact grey steps and token names are examples, not universal laws. Read: role/token, interaction and layering sections. https://www.carbondesignsystem.com/building-blocks/foundations/color/overview

## U2 — Audit all actual visible text and necessary non-text cues

Use `text-coverage.mjs` for host-observed text/background coverage; never just a few token examples. Separately identify controls, states and graphic parts whose visible cue is necessary. Under WCAG 2.2 SC 1.4.11 these need 3:1 against adjacent colors with specified exceptions. This is NOT a requirement for every decorative divider/card boundary, nor for default versus hover colors never adjacent. A clearly text-labelled button may not depend on its boundary. Establish what must be seen and why before choosing pairs.

W3C Understanding (informative explanation), criterion/component/state/boundary sections: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html . Existing text-contrast notes cover separate applicable text thresholds. A numeric pass does not establish hierarchy, comprehension or keyboard operation.

## U3 — Meaning cannot depend only on hue

For error/status/selection use visible differentiators appropriate to the task: explicit words, icon shape, underline, check mark, pattern or other adequate visual distinction. An accessibility name alone does not help sighted users distinguish hues. Sufficient lightness difference can sometimes provide an additional visual cue, but do not assume arbitrary palette differences are sufficient. Test actual content: “Confirm booking” beside “Cancellation needs confirmation” can remain ambiguous in any palette.

W3C Understanding use-of-color criterion/intent/lightness notes: https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html . This is separate from contrast and from whether an assistive-technology user can discover the state.

## U4 — State transitions, not screenshots alone

Review default, hover, pressed, focus, selected, disabled, pending, success and error where applicable; do not invent unsupported states merely to fill a checklist. Keyboard focus must be visibly locatable and persist while focused. SC 2.4.7 does not prescribe a single shape; do not confuse it with AAA Focus Appearance. Verify keyboard flow, not just a painted ring in a static mockup. Read criterion/intent: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

Repeated functions should remain recognizably consistent. Semantic tokens are a project implementation strategy, not a literal WCAG requirement for identical hex values or identical wording in all contexts. W3C criterion/repeated-component notes: https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html

## U5 — Review operation, then expressive fit

Ask a fresh reviewer, without author rationale: identify the primary action, selected item, failed item, focus location and recovery step. Record correct/incorrect/ambiguous answers against an explicit expected task outcome. For real users, measure errors and time under a specified protocol; model guesses are not human usability measurements. Separately grade role clarity, state distinction, theme legibility and task fit. Brand/atmosphere can differentiate valid solutions; it cannot excuse ambiguous actions or failed requirements.