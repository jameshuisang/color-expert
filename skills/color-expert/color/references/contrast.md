# Text contrast

Source: W3C WCAG 2.2 Understanding SC 1.4.3, reviewed 2026-11-14.
https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

For applicable text, AA requires 4.5:1, or 3:1 for large text (18pt regular or 14pt bold). Evaluate unrounded ratios. Exceptions and the actual rendered context matter. A contrast ratio alone is not a full accessibility audit.

The bundled checker applies the sRGB relative-luminance calculation to opaque hex foreground/background pairs. It intentionally rejects alpha, gradients, P3 and OKLCH rather than silently treating them as sRGB. Resolve actual rendered colors and gamut before testing those inputs. Do not round a failing ratio into a pass.
