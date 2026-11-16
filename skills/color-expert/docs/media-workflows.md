# Surface, print, photo and video workflows

The skill now routes explicitly to cross-media appearance, print proofing and photo/video grading. These notes extend the diagnosis workflow; they do not make the UI controller a media renderer.

```sh
node scripts/media-preflight.mjs examples/media-brief.json
```

This declaration checker returns `ready-for-host-review` (exit0), `contradiction` (exit1), `incomplete` (exit3), or invalid input (exit2). None is an aesthetic approval. It does not read the source media or authenticate its metadata, transforms, playback, spectra or physical proofs. Nonempty labels can still be wrong. Ready means the selected declaration requirements are present and no supported contradiction was found, not that a real workflow is correct.

For photo/video, declare input kind/encoding/primaries/white point/range, whether output rendering is already baked, output encoding/primaries/white point/target, and whether the same output transform or a LUT is planned. Raw/log additionally needs a specific transform identity; a generic camera-family name does not identify a supported transform. LUTs require declared input/output domains. Video requires playback review evidence rather than stills alone. The checker cannot verify that any of these declarations are true.

For print, declare the process, substrate, destination profile, rendering intent and one color-conversion owner. For materials, describe the surface model, illumination and viewing geometry; cross-illuminant match claims need spectral or physical proof evidence. Actual workflows require suitable host tools and separately recorded outcomes. Only change applications, displays, profiles or exports with user authorization.

The notes recommend context-sensitive investigation rather than a fixed look. Distinguish preservation of a physical color, a perceived relationship, shot continuity and expressive intent. These can demand different decisions.

## Evidence and tests

Eight frozen scenario tests cover missing source data, double transforms, false capture-recovery claims, unknown LUT domains, video/log requirements, double print management, cross-illuminant evidence and invalid domains, with valid controls. They are contract tests, not successful grading/print/material experiments. Existing independent numeric oracles remain; targeted mutation checks additionally verify that bypassing the double-output-transform and double-print-management guards is detected. These are contract sensitivity checks, not appearance oracles. New primary-source sections were read from ACES, Adobe, ICC and PBRT; no transcripts, software implementation, media assets or grading presets were copied.

No new photographs or footage were graded; no output transform, ICC conversion, spectral renderer, calibrated display or printer was executed. No physical match, human color-judgment accuracy or world-class quality is established. Future acceptance should use independently specified unknown-encoding, double-LUT, mixed-light, metameric-pair, gamut-limited print and shot-transition cases with real images/footage/proofs and blinded review. Freeze their expected technical diagnoses before generation and score aesthetics separately.
