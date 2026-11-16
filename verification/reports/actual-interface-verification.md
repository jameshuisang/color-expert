# Actual-interface adapter verification

2026-11-16. Implementation and bounded real-browser proof, not a quality benchmark.

## Implemented

- Freeze a self-contained actual HTML interface and contextual state/viewport contract; no six-token redesign is required.
- Declare selectors and actual DOM state assertions before collection. Bind local snapshot and contract hashes. Reject changed files, mismatched/duplicate/missing cases and missing observations.
- Read-only browser helper reports opaque sRGB leaf-text observations, viewport and horizontal overflow; unknown compositing remains unsupported. Manual nontext measurements stay explicit.
- Require actual pixel inspection and fresh independent contextual review for every case. Recompute contrast and state-assertion consistency; return scoped pass, fail or unverified.
- No imported private UI assets or third-party component code. Newly authored workshop example illustrates the method, not a required visual style.

## Verified

80 Node tests pass, including negative cases for low contrast despite favourable review, missing/duplicate case coverage, stale files/evidence, unsupported paint, wrong viewport, missing pixels, lead self-review, low contextual score, large-text eligibility, contradictory assertions and ordinary external assets. Synthetic tests prove gate behaviour, not visual quality.

A separate fresh-context reviewer opened the frozen original workshop fixture in Ego browser, operated its empty-form error state, viewed actual screenshots, verified live binding and collected DOM observations at 960×800 default and 375×800 error. All declared state assertions matched. Scoped assessment passed after a complete source check established the example has only inline CSS and a local form handler, with no external or dynamic dependencies.

Measured declared text ratios ranged from 7.13:1 to 11.87:1. Both viewports had no observed horizontal overflow. Independent scores for each case were fit 3, harmony 4, hierarchy 4 and function 4 on the documented 0–4 scale. The reviewer described a calm, practical presentation, with generic/sparse appearance as a minor limitation. These scores are one model review, not calibrated human findings.

The reviewer detected a browser viewport reset between invocations and corrected it by collecting screenshot and numeric observations together at the requested size. This is a host-operation hazard, not evidence that every browser preserves viewport settings.

A separate code auditor identified assertion and external-resource-screen weaknesses; both were corrected and regression-tested. Original raw host records remain outside the distribution so local session identifiers and file paths do not become end-user artifacts.

## Not verified

No arbitrary framework app adapter, network/dependency closure analyzer, automatic browser runner, full accessibility audit, native screen-reader/keyboard sequence, automated nontext/focus-outline measurement, success-state review, all responsive sizes, multiple browsers, physical/display calibration, human preference study or unseen-brief creative comparison. The resource screen is not a sandbox; JavaScript self-containment still requires host review. Hashes do not authenticate browser state, reviewer identity or cognition. The broader contextual harmony and pair-study plans remain unrun.
