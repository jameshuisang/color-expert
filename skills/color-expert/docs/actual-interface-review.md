# Review an actual interface

This optional adapter inspects your self-contained HTML rather than replacing it with the six-token study. It is host-mediated: a browser-capable agent opens the artifact, operates its controls and delegates a fresh independent pixel reviewer. No package installs, remote uploads or automatic browser/model calls occur.

## Start

```sh
node scripts/interface-review.mjs prepare examples/interface-study.html examples/interface-contract.json runs/interface-01
```

Exit 3 means prepared but **unverified**, not failed setup. Every revision needs a new output directory. Keep user content and runs private. Do not execute untrusted HTML merely because it was supplied as evidence. Review authority and tool permissions still apply. External scripts/styles/assets, embedded documents and network applications are outside this adapter; its resource screen is not a security sandbox. Do not strip dependencies to force an app through it.

Preparation also creates evidence.template.json with deliberately unverified defaults. Copy it to evidence.json and replace only fields backed by actual observation; missing capabilities stay unknown. Do not distribute run files containing user content.

Open the generated review request. For each declared viewport/state, operate the actual interface, verify the state and inspect rendered pixels. The contract freezes selectors, purposes and observation categories before collection; it is a scoped coverage plan, not an automatically complete accessibility inventory. Include errors, selection, focus and responsive views where relevant. Add declared cases rather than silently omitting failures.

`scripts/interface-browser-collector.js` is a read-only function for a supported browser evaluation facility. Pass a single contract case after setting viewport and state. It reports computed opaque sRGB text pairs and horizontal overflow. It conservatively rejects alpha, gradients, filters and blending; nontext boundaries need manual foreground/background measurement and explicit non-color-cue verification. Offscreen observations require a separately declared view/scroll protocol or stay unverified. DOM data cannot detect every occlusion, pseudo-element or visual defect: the reviewer must inspect the same pixels. Never set supported=true merely to clear a gate.

## Evidence

Before review, the host must examine the self-contained source for dynamic resource loads; static scanning cannot establish a JavaScript dependency closure. Evidence must include selfContainedVerified:true and concrete selfContainmentEvidence. If that cannot be established, leave unverified.

Top-level evidence contains the prepared manifest's binding, htmlHash, contractHash and url, plus exactly one record per case. Each record contains collector fields, actual session and inspectionMethod, visualInspected, stateEvidence, and a fresh independent review: separateAgent/contextSeparated true, non-lead agentId, observedReading recorded before author rationale, concrete observations, scores and reasons for fit/harmony/hierarchy/function (integer 0..4; each >=3 to pass). A manually measured nontext observation must retain id/selector and include visible, supported, foreground/background opaque hex values and nonColorCue. Never invent these fields when tools or a reviewer are absent.

```sh
node scripts/interface-review.mjs assess runs/interface-01 runs/interface-01/evidence.json
```

Exit 0: scoped pass. Exit 1: detected failure. Exit 2: invalid or mismatched evidence. Exit 3: unverified. Contrast thresholds derive from observation kind, not reviewer-provided numbers; large-text eligibility is checked. Missing coverage, duplicates and changed artifacts are rejected. A failed measurement or review cannot be offset by an average score. Preserve failed results and change the artifact in a new revision.

Hashes bind local files, not browser truth. Same-URL dynamic DOM changes and fabricated host attestations cannot be authenticated here. Record how each state was reached, reload after unintended changes, and never treat a numerical pass as evidence that pixels were seen. No claim of full accessibility, user comprehension, cross-browser behaviour, physical output or superior taste follows.

## Distribution choice

The fixture is newly authored generic interface code, not a copied product palette. No private capture, historical feedback, APCA dependency or third-party component code was restored. The useful capability restored is declared state/viewport review, not the original research dashboard. Original source attribution and license notices remain unchanged. Release still requires the final rights/privacy review; MIT is selected for original work.
