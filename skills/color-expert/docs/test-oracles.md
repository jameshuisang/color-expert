# Test oracles: make wrong behavior fail

A green suite is not evidence that every test is independent, complete or useful. Classify the claim before choosing its oracle. Never compute an expected value by calling the implementation under test or a helper sharing the same disputed logic.

## Audit and new evidence

A read-only independent audit seeded faults into disposable copies of the previous 87-test candidate. Three faults survived the entire suite: swapping red/blue luminance weights, rejecting exact threshold equality, and making the browser collector echo expected state values as observed facts. These are demonstrated test sensitivity gaps, not discovered production bugs. The unmutated implementation did not contain those faults.

Added fixed numerical anchors and deliberately mismatched DOM fixtures. The current 103-test suite passes. `npm run test:mutations` verifies a sixteen-test unmodified numerical/collector/media-contract baseline and then detects eight isolated seeded faults in temporary copies: the three above, omitted nonlinear decoding, reuse of the first irradiance channel, clipping HDR exposure, allowing double output transforms and allowing double print color management. Syntax/import failure does not count as detection. The script requires an assertion failure and restores each copy before the next mutation. This is a targeted experiment, not a comprehensive mutation score.

## Independent anchor provenance

`tests/independent-oracles.test.mjs` uses frozen expected values; production helpers are called only for actual results.

- [WCAG 2.2 relative luminance](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance) specifies the primary weights and sRGB transfer. Full-primary anchors isolate channel identity; grayscale alone cannot detect a weight permutation. Black-background contrast constants are simple hand-evaluated consequences of the [contrast definition](https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio), not separately measured data.
- Transfer values at 8-bit codes 10, 11 and 128 were independently evaluated with 45-digit Python Decimal arithmetic from that definition, outside production code, and frozen as constants. Absolute tolerance 1e-12 accommodates floating evaluation, not a broad empirical fit. The two dark codes exercise either side of the 8-bit branch boundary.
- [PBRT point lights](https://pbr-book.org/4ed/Light_Sources/Point_Lights) supplies inverse-square attenuation, and [diffuse reflection](https://pbr-book.org/4ed/Reflection_Models/Diffuse_Reflection) the Lambertian factor. Analytic unequal-channel examples catch channel reuse. These ideal scalar/RGB calculations are not physical-renderer validation.
- `tests/collector-oracles.test.mjs` freezes actual DOM fixture facts separately from the requested assertions. Wrong text, attribute, focus and hidden expectations must fail while retaining actual values. Missing/nonunique targets fail. Matching values must also succeed, preventing an always-fail implementation from satisfying the tests.

## What existing tests establish

| Family | Legitimate claim | Not established |
| --- | --- | --- |
| Fixed numerical anchors | Selected known outputs match an independent mathematical reference | Every gamut/input, calibrated appearance |
| Round trips, symmetry, ratio invariants | Internal consistency and useful algebraic properties | Absolute correctness; inverse errors can cancel |
| Data interval/semantic negatives | Declared gap, overlap and label contracts reject specified defects | Actual human chart comprehension |
| DOM collector mocks | Extraction and assertion logic on controlled structures | Real-browser paint/layout completeness |
| Review state-machine/evidence fixtures | Missing/stale/contradictory attestations are rejected | Real pixels seen, authentic independent cognition |
| Index, wording, schema and manifest checks | Packaging and contract integrity | Scientific truth or creative quality |
| Historical two-case browser review | One model's observed findings on those frozen cases | Universal taste, human preference or unseen-task performance |

Keep integrity checks, but label them honestly. A synthetic all-pass evidence object is acceptable for testing gate mechanics, never as efficacy evidence. Existing space round trips remain supplementary to known anchors, not the sole oracle. More independently sourced vectors and real-browser negative probes remain worthwhile.

## Required practice for future changes

1. State the behavior and credible failure mode before implementation. Identify the oracle's source, independence, units, assumptions and tolerance.
2. Add at least one failing counterexample plus a valid control. Include boundaries and asymmetry where a symmetric fixture can mask a defect.
3. Do not import production math into expected-value generation. Do not approve regenerated snapshots or manifests simply because tests became green. Review why the expected result changed.
4. Seed a meaningful defect when feasible and demonstrate the test detects it for the intended reason. Record survivors and equivalent/untestable mutants; do not silently discard them.
5. Test a collector's observations independently from downstream consumers. Mocks do not replace actual rendered/browser integration tests.
6. For creative efficacy, freeze briefs, criteria and resource budgets before generation; use unseen applied tasks, independent rationale-blind review and relevant human evidence where required. Never use the author model's own expected praise as ground truth.
7. Have a separate reviewer challenge the oracle. Report integrity, numerical, integration and efficacy outcomes separately. Passing tests cannot guarantee absence of circularity or bugs.

These are project engineering rules, not changes to the assistant's personal saved instructions.
