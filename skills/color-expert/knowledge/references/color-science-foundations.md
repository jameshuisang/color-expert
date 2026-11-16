# Color models: choose the information needed by the question

Reviewed 2026-11-16. Primary-source synthesis; operational rules are project decisions, not published performance findings. This note adds no renderer, appearance model or spectral implementation.

## Do not confuse representation, display and physical cause

A color space is usually three-dimensional [S1]. A hue-only wheel is incomplete for specifying lightness and chroma, not intrinsically false. HSL/HSV also have three coordinates even when displayed as a wheel plus a slider. Coordinated two-dimensional slices can expose a three-dimensional model accurately; a rotatable solid may conceal values through occlusion. Choose a useful diagram, not a claim that a 3D picture is inherently more correct.

Keep these separate:
- **Coordinates:** RGB/XYZ/Oklab/OKLCH locate a stimulus under stated assumptions.
- **Visualization:** wheel, slice, graph or solid displays some of those relationships.
- **Appearance:** adaptation, surround and viewing conditions affect perception.
- **Physical scene:** geometry, spectra, material scattering and light transport determine light arriving at the observer.

A good result in one does not certify the others. Intentional flat illustration is not a defective physical simulation.

## Select the model and state its limits

| Question | Appropriate representation | Essential limit |
|---|---|---|
| Order hue relationships | Explicitly named wheel or hue slice | It omits other dimensions unless supplied separately. |
| Adjust approximate lightness/chroma/hue independently | Oklab/OKLCH | Approximate perceptual organization; not guaranteed equal appearance, not a viewing-condition model. |
| Add light or apply an exposure multiplier | Declared scene-linear tristimulus basis | Encoded sRGB channel arithmetic is not linear-light arithmetic; display tone mapping may hide the proportional result. |
| Deliver to sRGB/P3 | Defined primaries, white point, transfer function and target gamut | Space conversion preserves a color where representable; gamut mapping changes it. Wide gamut is not HDR. |
| Predict adaptation/surround effects | Appropriate appearance model and specified viewing conditions | CIECAM16 is described by its publisher; this project has no CIECAM16 implementation. |
| Predict real material under different illumination | Spectral data/appropriate transport model | A base-color RGB triplet cannot uniquely recover reflectance spectra. |

Oklab's author provides the derivation and describes useful perceptual adjustments [S2]. Treat its coordinates as useful approximations, not aesthetic truth. Hue is unstable/undefined near zero chroma; do not reward tiny-neutral hue agreement as meaningful accuracy. Neither OKLCH L nor HSL L is a replacement for relative luminance in a stated contrast calculation [S3].

CIECAM16 transforms tristimulus values using viewing-condition information and chromatic adaptation [S4]. The public publisher summary was read, not the full paid report. No equations or accuracy claims beyond that summary are inferred.

## Spectral and transport boundary

Different spectra can yield the same tristimulus match for a given observer/condition. Addition and scalar multiplication in a linear tristimulus basis (not encoded sRGB or Oklab) represent corresponding spectral sums/scalings, but multiplying two RGB triplets is not generally equivalent to multiplying their spectra then integrating [S5]. This matters for narrow-band lighting, cross-illuminant matching and physical materials. Answer “insufficient information” when only a hex paint color is supplied for such a prediction; name the missing reflectance/emission spectrum, illuminant and observer assumptions.

For controlled direct illumination, a point-source model uses inverse-square distance; a receiving planar patch also has an incidence-cosine factor. Lambertian response uses reflectance divided by pi [S6,S7]. Predictions apply only to the named simplified model, with visibility, orientation, source intensity and pipeline controlled. They do not predict area-light falloff, indirect bounce or post-tone-mapped pixels universally.

## Measurable operating discipline

Before calculation, declare inputs, units, source/working/output spaces, background, gamut and supported model. Before rendering, write a falsifiable prediction and tolerance. Keep independent checks distinct from the implementation being tested.

For application tasks, specify constraints such as monotonic lightness, gamut inclusion, hue-drift tolerance (excluding near-neutrals), actual foreground/background contrast, and clipping/mapping policy. Report residuals and violated constraints, not only “pass.” Check rendered output separately for banding, hierarchy and legibility. Numerically valid ramps are not proven beautiful.

For tests of the expert, separate:
1. Prediction/constraint correctness under an independent reference.
2. Actual rendered observations and capability limits.
3. Preference/brief fit, recorded as human judgment.

Freeze prompts, conditions, tool budgets, revision budgets and grading before predictions. Use unseen parameter values; record exclusions and all failures. Compare expert with baseline and, when testing the value of this guidance, a clearly defined ablation. A generic model may already know color science: removing guidance does not erase its knowledge. Three conditions are not automatically an experiment on the visual interface's dimensionality.

## Source coverage

- **S1:** [CIE colour space definition](https://cie.co.at/eilvterm/17-23-041), public definition read.
- **S2:** [Oklab original derivation](https://bottosson.github.io/posts/oklab/), relevant coordinate, motivation and comparison sections read.
- **S3:** [W3C CSS Color 4](https://www.w3.org/TR/css-color-4/), relevant terminology/space definitions read; accessed current Candidate Recommendation Draft, not a claim of uniform browser support.
- **S4:** [CIE 248:2022 CIECAM16 publisher summary](https://www.cie.co.at/publications/cie-2016-colour-appearance-model-colour-management-systems-ciecam16), summary only, not full report.
- **S5:** [PBRT 4e colour chapter](https://pbr-book.org/4ed/Radiometry,_Spectra,_and_Color/Color), relevant tristimulus and spectral limitations read.
- **S6:** [PBRT 4e point lights](https://pbr-book.org/4ed/Light_Sources/Point_Lights), model/implementation sections read.
- **S7:** [PBRT 4e diffuse reflection](https://pbr-book.org/4ed/Reflection_Models/Diffuse_Reflection), Lambertian model/limits read.

Follow `dimensional-light-color` for scene contracts and `web-color-management` for delivery. Numerical tests and model documentation are not evidence of calibrated displays, physical materials, artistic superiority or universal color understanding.
