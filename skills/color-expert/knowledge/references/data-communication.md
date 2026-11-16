# Data color: a decoding contract, not an attractive ramp

Primary-project/research notes and conditional project synthesis. Selected sections read 2026-11-15. All proposed tests below are project-derived; not validated universal thresholds.

## D1 — Name the question and variable before color

What must the reader compare, classify or locate? Declare measurement, unit, period, domain and missing-value semantics. Ordered magnitude usually calls for sequential encoding; meaningful deviation for diverging; unordered identity for qualitative; wrapping quantities for cyclic. Do not invent a neutral midpoint because a palette is symmetric. Asymmetric classes around a meaningful center may be appropriate.

ColorBrewer creators explain sequential, diverging and qualitative schemes and center/category considerations: https://colorbrewer2.org/learnmore/schemes_full.html (whole short scheme-types page). Matplotlib's primary project docs cover cyclic and other classes, lightness progression and problematic reversals: https://matplotlib.org/stable/users/explain/colors/colormaps.html (overview/classes/sequential discussion). These guides do not establish universal audience suitability.

## D2 — Specify the mapping, not just the swatches

Record normalization, class edges, endpoint inclusion, clipping and treatment outside the displayed domain. Labels “0–25” and “25–50” alone leave 25 ambiguous. Prefer an explicit convention such as [0,25), [25,50), with the final upper endpoint defined. Changing bin edges or normalization can change the story even with identical colors. Compare arms with the same data and mapping.

Matplotlib BoundaryNorm documents explicit increasing boundaries and clipping/extension behaviour: https://matplotlib.org/stable/api/_as_gen/matplotlib.colors.BoundaryNorm.html (parameters/clip/extensions). Apply the discipline of explicit mapping; do not assume its API conventions are universal. `tools/data-encoding.mjs` checks a bounded declared sequential-bin contract; it is not a renderer or arbitrary chart validator.

## D3 — Zero, missing and outside-domain are different states

Show missing as missing, not the lowest valid number, zero or unremarked background. Preserve distinct labels and non-color identifiers. Out-of-range data requires its own documented handling, not conflation with missing. Matplotlib's masked example distinguishes bad, under and over values: https://matplotlib.org/stable/gallery/images_contours_and_fields/image_masked.html (example and explanation). Its illustrative colors are not recommended palettes. Our requirement to name these states in the legend is project synthesis.

## D4 — A sequence should not imply categories without a reason

Single-hue and multi-hue sequential maps can both work. Use sufficient ordered lightness and verify real-scale adjacent/nonadjacent distinctions. Extra hue travel can aid separation or imply an unintended category boundary: assess the actual task. Do not generalize one user's preference into a rule against multi-hue ramps. Stable categorical identity across filtering/sorting is different from sequential monotonicity. Never impose a globally monotonic test on a diverging or cyclic sequence.

## D5 — Test readers on the actual graphic

A sorted equal-area swatch strip is not a map. Test small/irregular regions, adjacency, spatially separated comparisons, label collisions and intended viewing size. Ask: wettest region? which are >=75 mm? which bin includes exactly 25? zero or missing? what period? Include labelled legend, units, title and suitable non-color cues. Use grayscale/CVD simulation as diagnostics, not certification. Color-blind-safe product labels do not replace verifying this display and audience.

For precise numeric comparison consider position on a common scale and numbers rather than color alone; test that recommendation in context. Heer & Bostock's primary experiment found common-scale position more accurate than length/angle/area in its proportional-judgment task, NOT a universal position-vs-hue ranking. Read abstract, Experiment 1 methods/results and Experiment 2 scope; no raw-data reanalysis. https://hci.stanford.edu/publications/2010/crowd-perception/heer-chi2010.pdf

## D6 — Separate communication from aesthetic judgment

Record task correctness, ambiguity and lookup conditions separately from palette liking. Numeric monotonicity does not establish equal perceptual spacing or comprehension. A beautiful palette with an ambiguous boundary fails its data contract. A model reviewer answering a known question supplies a limited model diagnostic, not human accuracy/time evidence. User tests require actual user observations and a preregistered comparison. Freeze mapping, layout and tasks before comparing palettes; keep held-out cases untouched after tuning.
