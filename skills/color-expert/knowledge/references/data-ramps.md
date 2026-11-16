# Choose a ramp for the data, then check it
Authoritative reference: https://matplotlib.org/stable/users/explain/colors/colormaps.html . Reviewed selected overview/classification/lightness discussion on 2026-11-14.

Sequential maps encode ordered magnitude; diverging maps emphasize deviation around a meaningful center; cyclic maps encode wraparound; qualitative maps distinguish unordered categories. Do not impose a single dark-to-light sequence on all four. Matplotlib discusses lightness progression and perceptual uniformity as useful considerations, not universal guarantees for arbitrary data or viewing conditions.

Project method: state the quantity, order/center/cycle and audience; choose a map type; inspect at actual size; include a legend and non-color cues where required. For a sequential set, run `node tools/ramp.mjs file.json`. It reports relative luminance at supplied opaque sRGB samples, plateaus, direction and reversals. It does not inspect unsampled gradient interpolation, verify perceptual spacing, simulate color-vision differences or certify accessibility. For UI text on a ramp, separately test rendered text/background contrasts across the occupied region.

A hue-plane explanation is not itself a gamut mapper. A grayscale check is not an aesthetic verdict. Use the Color Nerd edge-color example as a source of ideas, then enforce the actual task's constraints.
