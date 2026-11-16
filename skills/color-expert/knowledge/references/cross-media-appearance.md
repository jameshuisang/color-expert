# Appearance across surfaces and viewing conditions

## Start with the cause, not the hex value

Ask what changes: source illumination, object reflectance/transmission, geometry and viewing direction, neighboring colors, observer adaptation, capture/rendering, display or print reproduction. Separate a requested **appearance match** from copying numeric coordinates. Record the intended audience, use, surface, lighting, surround and output conditions before recommending an adjustment. If those are unknown, offer conditional alternatives rather than false certainty.

For a physical object, RGB is not a measured spectrum. A matte sample, glossy coating, metal and translucent material can share a nominal RGB description yet look different. Directional reflection and subsurface transport need a suitable material model; the existing scalar Lambertian helper does not provide one. A BRDF value is not universally bounded by one: energy conservation concerns integrated reflected energy, not a blanket numeric clamp. [PBRT surface reflection](https://pbr-book.org/4ed/Radiometry,_Spectra,_and_Color/Surface_Reflection)

For context, inspect the same candidate on its real neighbors, at intended area ratios and size, under representative adaptation and surround. A screenshot comparison can reveal a contextual problem but cannot measure observer adaptation or certify a display. Route to `color-model`, `monitor-color`, `light-shadow` or `blender-color` as appropriate. Preserve deliberate warm/cool lighting and mood unless the task calls for neutral reproduction; perceived neutral is not always the artistic goal.

## Print and physical proof

Specify the actual printer/ink/paper or production process, destination profile, rendering intent, source tagging and proof conditions. Printer profiles are condition-specific. Application-managed and printer-managed conversion are alternative responsibilities; enabling both can double-manage color. Paper white and gamut previews help evaluate a target but are not physical proof. [Adobe print color management](https://helpx.adobe.com/photoshop/desktop/print/print-with-color-management.html)

White mapping differs by rendering intent; relative, absolute and perceptual choices are not interchangeable. Evaluate the desired result rather than always choosing one intent. [ICC sRGB profiles and intents](https://registry.color.org/rgb-registry/srgbprofiles)

Project procedure: compare a correctly tagged soft proof, then a physical test on the actual substrate under its intended lighting when accuracy matters. Ask about gloss/texture, fluorescence and alternate illuminants rather than promising a universal screen-to-print match. For cross-illuminant matching, RGB alone cannot establish spectral equivalence. Seek measured spectra or actual samples/proofs. Do not invent CMYK recipes, spot-color matches, ΔE measurements, ICC execution or calibrated viewing evidence.

## Evidence boundary

These are diagnosis and review instructions, not a spectral renderer, ICC engine, print service or CIE appearance-model implementation. A supported numerical conversion does not establish appearance equivalence. Use `tools/media-preflight.mjs` to expose missing declarations and known workflow contradictions; a complete declaration still needs real host execution and review.
