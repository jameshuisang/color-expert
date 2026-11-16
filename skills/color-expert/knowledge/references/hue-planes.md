# Hue planes and precise vocabulary
Source: https://www.youtube.com/watch?v=Gd1qsQgsE5w
Color Nerd, *Color Theory You Never Learned: Hue Planes*. Reviewed 2026-11-14; complete available transcript 0:00–7:10 / 7:14. No visual review.

**0:56–2:23:** A hue circle omits lighter/darker variants; a constant-hue slice exposes variation in lightness and chroma.
**2:31–3:22:** The demonstrated hue pages differ in achievable chroma and its lightness location. Those numeric maxima belong to the displayed atlas/gamut, not universal limits.
**3:29–5:20:** Naming zones and saturation/chroma coordinates are different abstractions. Dark colors can remain saturated; never treat HSL saturation and OKLCH chroma as interchangeable numbers.
**6:07–7:10:** RGB cube slices are not automatically constant perceptual hue slices.

Cross-check: CIE defines saturation through colorfulness relative to brightness, not simply distance from gray: https://cie.co.at/eilvterm/17-22-073 . CSS Color 4 separately defines model coordinates. Simplified “purity” language is teaching shorthand.

Operational consequence: name the model before comparing dimensions; when a lightness change cannot retain the requested chroma in gamut, explain the tradeoff rather than silently clipping or promising identical character.
