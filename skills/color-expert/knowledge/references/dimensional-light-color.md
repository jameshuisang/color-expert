# Dimensional and dynamic light–color reasoning

Reviewed 2026-11-15. Primary-source synthesis plus project operating rules. Extends `light-shadow.md`; not a claim of complete physical simulation or mastery. The referenced text was read; no new renderer output was visually evaluated in this update.

## Separate three different meanings of “3D”

1. **Color coordinates:** RGB or OKLCH describe colors with three coordinates; their axes are not positions in a scene. A color solid/gamut is not a light-transport simulator. Use `hue-plane` and `web-color-management`.
2. **Scene geometry:** positions, normals, distances, visibility and camera direction govern which light paths reach a surface and observer.
3. **Appearance over time:** moving light, camera or geometry changes those paths. Exposure, adaptation and output transforms can also change the image without changing the material. Lock them when diagnosing another cause.

## Causal principles, not swatch recipes

**D1. Predict the path before choosing the pixel.** Trace source → visibility → material scattering → camera → display. Outgoing light includes emission and direct/indirect contributions. In a shadow, identify which contribution was blocked; remaining sources/bounces determine its color. Do not add arbitrary ambient light to certify physical accuracy. [PBRT transport](https://pbr-book.org/4ed/Light_Transport_I_Surface_Reflection/The_Light_Transport_Equation)

**D2. Use direction and distance with their assumptions.** For an ideal point source in vacuum, direct irradiance on a surface includes inverse-square distance and the incidence cosine. A grazing or back-facing surface is not lit like a front-facing one. This point-source rule is not a universal falloff recipe for large area or directional lights. The analytic helper is a diagnostic, not a ray tracer. [PBRT point lights](https://pbr-book.org/4ed/Light_Sources/Point_Lights)

**D3. Distinguish material response.** Diffuse, glossy, mirror-like, anisotropic and subsurface responses cannot be inferred from base color alone. A BRDF concerns local reflection; subsurface transport needs more than a local BRDF. Rotate the camera with light and object fixed to distinguish a moving reflection from a painted mark. Roughness redistributes reflection; it is not simply a saturation or brightness control. [PBRT reflection models](https://pbr-book.org/4ed/Reflection_Models)

**D4. Keep the simple model visibly bounded.** Lambertian reflection is a useful diffuse approximation, with radiance = reflectance × irradiance / π. It does not reproduce every matte material, especially grazing-angle behavior. Our channel-wise RGB calculation is an approximation, not spectral material prediction. [PBRT diffuse](https://pbr-book.org/4ed/Reflection_Models/Diffuse_Reflection)

**D5. Treat boundaries and interiors differently.** Reflection/refraction depend on material and angle; metals and dielectrics are not interchangeable. Transmission is not CSS opacity. Thickness, absorption and internal transport matter for glass, liquid or translucent solids. Do not approximate them with a transparent flat swatch and call it physically validated. [PBRT specular](https://pbr-book.org/4ed/Reflection_Models/Specular_Reflection_and_Transmission)

**D6. Model air when air matters.** Haze, fog and smoke attenuate and scatter light. Atmospheric depth is not universally “make the distance blue.” Medium properties, path length and illumination determine the result; subsurface scattering similarly involves paths inside an object. [PBRT volumes](https://pbr-book.org/4ed/Volume_Scattering)

**D7. Softness must agree with geometry.** Finite source extent changes penumbrae and illumination direction distribution; changing area can change brightness too, depending on the renderer's power/radiance control. Record which quantity is held fixed. Compare contact and distant shadow edges, not just blur radius. [PBRT area lights](https://pbr-book.org/4ed/Light_Sources/Area_Lights)

**D8. RGB is not the material's spectrum.** A three-number color match does not uniquely identify spectral reflectance. RGB multiplication is not generally equivalent to multiplying spectra then integrating. Cross-illuminant matching, narrow-band lighting and metamerism need measured spectral data or an appropriately scoped spectral workflow, not confidence from a hex match. [PBRT colour](https://pbr-book.org/4ed/Radiometry,_Spectra,_and_Color/Color)

## Operational scene contract

Before claiming realistic color, record these fields in the task's evidence (unknown is allowed, silently invented is not):
- Goal: physically plausible, measured reproduction, stylized dimensional illustration, or flat UI. Name intended deviations.
- Geometry: scale/units, normals, object/receiver separation, camera and frame times.
- Lighting: type, position/direction/extent, spectrum or declared RGB approximation, intensity convention, environment and indirect bounce settings.
- Material: input color space, reflectance/base-color meaning, dielectric/conductor model, roughness, IOR, transmission, thickness/volume and textures where applicable.
- Pipeline: source/working/output spaces; renderer/version; exposure, white balance, view/look/tone mapping; sampling/denoising; display assumptions. A screenshot is not calibrated measurement.
- Evidence: baseline, controlled variation, prediction before render, actual visible observation, numerical checks, separate reviewer and unresolved limitations.

## Dynamic review loop

0. Before comparing expert versus general performance, freeze unseen scene inputs, prompts, budgets and blind mapping. The candidate cases below are not yet a held-out benchmark.
1. Establish a baseline and predeclare one causal prediction. Select only applicable principles, not this entire guide for every task.
2. Change one variable for diagnosis: move key light; then camera; then material; then view transform in separate trials. Keep artistic multi-variable exploration separate.
3. Inspect actual rendered frames at start, intermediate, end and failure-prone transitions. Judge shadow direction/contact, highlight motion, hue/lightness continuity and scene readability. A single hero frame cannot establish temporal consistency.
4. Score each criterion 0–4 with concrete locations: causal coherence, material consistency, shadow geometry, temporal continuity, pipeline traceability and brief fit. Project review convention: each ≥3, no contradicted physical claims, and complete required evidence. These are critic judgments, not objective realism scores.
5. Preserve old and new output; reject a revision that fixes one cue but destroys established relationships. Record a scoped lesson only after an actual observation. Never convert one preference into a universal light law.
6. If no renderer/vision is available, return a reasoning plan and mark visual evaluation blocked. Never pass the scene from code, parameter names or unit tests alone.

## Capability boundary and evaluation

`tools/light-transport-diagnostics.mjs` implements only ideal point-source irradiance, Lambertian channel-wise response and linear exposure scaling. Reflectance and irradiance must share an explicitly declared linear RGB basis; this helper deliberately accepts only nonnegative channels, not every wide-gamut coordinate. It has no geometry intersection, visibility solver, indirect bounce, BSDF sampling, volume, spectral engine, tone mapper or image renderer. The host must discover and use a suitable renderer separately. the repository’s candidate evaluation protocols is a candidate visual-test specification, not yet frozen or run. Existing `spaces.mjs` conversion does not establish physical-material accuracy. Existing six-token UI workflow does not become a 3D renderer through this guide.

Fresh Blender manual requests failed during this research pass; retain previous `blender-color` evidence with its recorded scope, not a claim of newly verified Blender behavior. No Blender executable was found on PATH or in the checked /Applications listing; this is a bounded availability check, not proof no renderer exists anywhere.
