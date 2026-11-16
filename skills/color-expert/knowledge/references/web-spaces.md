# Web color spaces and gamut

Reviewed 2026-11-14. Evidence: [W3C CSS Color 4](https://www.w3.org/TR/css-color-4/), selected terminology, predefined spaces, OKLCH and conversion sections. This is a changing Candidate Recommendation Draft, not a browser conformance guarantee.

## Technical distinctions

sRGB and Display P3 are RGB encodings with different primaries; both use D65 and the sRGB transfer curve. Display P3 is not cinema DCI-P3 and wider gamut is not HDR. Hex CSS colors denote sRGB. OKLCH describes Oklab lightness, chroma and hue; it is neither a monitor profile nor a bounded display gamut. L is not relative luminance. Coordinates require a named space: copying the same RGB numbers into P3 changes color, whereas conversion changes numbers to preserve colorimetry when representable. Conversion can produce negative or above-one channels. Gamut mapping is a separate, lossy decision; channel clipping can alter hue. Linear-light arithmetic and perceptual interpolation solve different problems.

## Project decision procedure

For a UI, start with usable sRGB roles. Explore in OKLCH, inspect target-gamut membership, then explicitly choose fallbacks rather than silently clipping. Retest contrast on final rendered pairs. A wide-gamut enhancement is optional, not a replacement for legible fallback states. Record the interpolation space for gradients and inspect intermediate colors as well as endpoints.

Example deployment pattern (illustrative values, not equivalent colors or verified contrast):

```css
.accent { background: #c94b46; }
@supports (color: color(display-p3 1 0 0)) {
  @media (color-gamut: p3) {
    .accent { background: color(display-p3 .8 .25 .22); }
  }
}
```

Feature detection is not proof of measured display accuracy. Inspect the actual browser/device. The existing controller and contrast checker remain opaque-sRGB-only; conversion tooling does not silently broaden their claims. Alpha, textures and gradients need the actual composited background.
