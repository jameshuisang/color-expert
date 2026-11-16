# Light, shadow and color appearance

Reviewed 2026-11-14. Scope: physical surface color, rendered materials, and deliberately stylized interface depth. This is a conditional operating guide, not a universal palette recipe. Primary reading supports the mechanisms below; the proposed visual exercises have **not been executed**. No calibrated-display, spectral measurement or Blender-render validation is claimed.

## First separate the causes

A color specification is not an appearance guarantee. Diagnose **illumination → material response → geometry/visibility → image formation and display transform → viewing context** before editing a palette. For flat UI, distinguish an actual lighting simulation from an authored gradient/shadow/composite that merely suggests depth.

Physical basis: outgoing surface light contains emitted light plus incoming light scattered by the material over directions. Incoming light includes other surfaces, so indirect illumination can carry their color. This is why changing a wall or environment can alter an unchanged object. [PBRT light transport](https://pbr-book.org/4ed/Light_Transport_I_Surface_Reflection/The_Light_Transport_Equation)

RGB is a representation in a specified color space, not a unique spectrum or material. Different spectra can match under an observation condition; an RGB match does not establish identical spectral behaviour under changed lighting. [PBRT colour](https://pbr-book.org/4ed/Radiometry,_Spectra,_and_Color/Color)

## Working convictions: what to do, what to reject, and how to check

These are this project's operating judgments based on the cited mechanisms. They are not claims that a paper has experimentally proved a single best design style.

### LS1. Diagnose before compensating
- **When:** a material or asset looks too pale, dark or shifted compared with a brand swatch.
- **Do:** hold the base color fixed; inspect input tagging, light/environment, exposure and view transform separately. Compare a neutral-light baseline with the intended scene. Use `blender-color` and `web-color-management` routes for pipeline details.
- **Good:** a documented appearance target and controlled comparison. **Bad:** repeatedly increasing saturation to compensate for an unknown transform; it may fail elsewhere.
- **Tradeoff:** faithful material color and a fixed screen-pixel brand match are different objectives. A flat graphic/compositing treatment may be preferable when an exact displayed value is the deliverable.
- **Check:** record source/working/output spaces, view/look/exposure, material, lights and target; change one cause per diagnostic revision. Source: [Blender displays/views](https://docs.blender.org/manual/en/5.0/render/color_management/displays_views.html).

### LS2. Shadows remove a contribution, not necessarily all illumination
- **When:** reasoning about cast shadows on physical or rendered surfaces.
- **Do:** identify which direct source is occluded and which sky/environment, bounce or other lights remain. Predict a direction of change, then render or observe.
- **Good:** a shadow colored by its remaining illumination. **Bad:** “all shadows are black,” or “warm light always makes cool shadows.” Those are not universal laws.
- **Tradeoff:** black or complementary shadows may be intentional illustration devices; label the choice as stylization rather than physics.
- **Check:** compare direct-only, environment-only and combined illumination where the renderer permits. Do not claim blue shadow without evidence of the light/context. Basis: PBRT light transport above.

### LS3. Use shadow geometry, not blur alone, to explain physical depth
- **When:** a physically plausible cast shadow is intended.
- **Do:** reason about source extent as seen from the surface, object/receiver separation and occlusion. A larger area source can broaden penumbrae and smooth shading, not just blur a fixed mask.
- **Good:** softness and shape coherent with the light and contact. **Bad:** identical floating blurred blobs under every object while claiming physical accuracy.
- **Tradeoff:** compact UI shadows often intentionally simplify geometry; coherence and legibility matter more than ray-traced realism there.
- **Check:** hold the scene/camera fixed, vary source size, and then object height separately. Record whether light intensity/radiance changed as well. Source: [PBRT area lights, figure 12.15](https://pbr-book.org/4ed/Light_Sources/Area_Lights).

### LS4. A material is more than its base-color swatch
- **When:** transferring a palette to plastic, paint, metal or another 3D surface.
- **Do:** distinguish diffuse/body appearance from reflected environment and highlights; inspect metallic, roughness and other material parameters rather than assigning all changes to albedo. For the Principled model, metallic response and dielectric response are not interchangeable.
- **Good:** neutral and target-light views of the actual material. **Bad:** “same hex, therefore same visible color” across a matte surface and a shiny metal.
- **Tradeoff:** a base color can be chosen for art direction, but document that the resulting appearance is conditional on lighting/material.
- **Check:** compare matte dielectric and metallic variants with unchanged base color and environment, then vary roughness alone. Source: [Blender Principled BSDF](https://docs.blender.org/manual/en/5.0/render/shader_nodes/shader/principled.html). Current page retrieval was intermittent; no exhaustive shader parameter audit is claimed.

### LS5. Do energy operations in the right representation
- **When:** calculating exposure, radiometric mixtures or renderer input values.
- **Do:** distinguish encoded sRGB values, scene-linear values and perceptual editing coordinates. Decode before a physical linear-light calculation, then encode/display appropriately; follow the renderer's actual socket/input contract.
- **Good:** an explicit space and operation. **Bad:** halving an sRGB hex channel and calling it half the light, or treating OKLCH L as radiometric luminance.
- **Tradeoff:** CSS interpolation/compositing may use its specified rules, not your preferred physical model. Artistic interpolation is valid when labelled and visually checked.
- **Check:** for a neutral encoded-sRGB channel of 1, half the linear value encodes to approximately 0.73536, not 0.5. This mathematical example does not predict perceived half-brightness. See `web-spaces.md` for standards and `blender-color.md` for scene-linear handling.

### LS6. Evaluate the color in its context, not only in a swatch strip
- **When:** choosing visible surface contrast and apparent lightness.
- **Do:** compare actual adjacent surfaces, shadow cues, scale and surrounding field alongside numerical measurements.
- **Good:** a contextual screenshot/render plus measured values. **Bad:** “equal RGB must look identical,” or the opposite mistake, dismissing required contrast checks because perception varies.
- **Tradeoff:** perceptual adaptation can preserve a surface impression while pixels change. Do not promise a universal observer response or use an illusion to certify accessibility.
- **Check:** compare full composition and isolated samples; retain both results rather than replacing one with the other. Primary demonstration: [MIT Adelson checker-shadow](https://persci.mit.edu/gallery/checkershadow). Search description was available; direct explanatory-page fetch was unreliable, so no quantitative inference is taken from it.

### LS7. UI shadows should clarify hierarchy, not muddy it
- **When:** using CSS shadows, translucent overlays or depth gradients.
- **Do:** choose an intentional direction/elevation vocabulary and test each actual background and theme. A shadow color includes alpha and compositing context; it is not a standalone opaque token.
- **Good:** components remain distinguishable and readable at the intended size. **Bad:** assuming a dark shadow works on every dark background, or increasing opacity until text/edge clarity is lost.
- **Tradeoff:** a border or surface-lightness difference may communicate separation better than stronger shadow. Decorative departures are acceptable when hierarchy remains clear. This is a design heuristic, not a CSS conformance requirement.
- **Check:** render light/dark themes, hover/focus/disabled states and overlapping surfaces. Check relevant text/UI contrast on resolved surfaces separately; shadow aesthetics alone cannot establish compliance. Source for CSS shadow mechanics: [W3C CSS Backgrounds and Borders](https://www.w3.org/TR/css-backgrounds-3/#box-shadow).

## Iterative practice and bounded learning

1. State medium, purpose and what “good” means here: realism, expressive atmosphere, brand recognition, legibility or a justified combination. Record the tradeoff.
2. Select only the applicable principles above and relevant space/material references. Note unknown light/viewing conditions instead of filling them in as fact.
3. Make a controlled baseline. In 3D include neutral-light and target-light views; in UI include actual backgrounds and themes. Preserve settings and artifact identity.
4. Inspect the rendered output, not only code or numeric tokens. Describe a visible success/failure and its location. If no visual tool/render is available, mark **not visually evaluated**, not passed.
5. Form a specific causal hypothesis; change one diagnostic variable; render and compare. Final art direction may vary multiple variables after diagnosis. Keep a bounded revision budget and an explicit unresolved list.
6. Preserve failed variants and reasons as scoped evidence. Record the user's actual feedback separately from model critique. A single attractive result is a candidate lesson, not a universal law or a trained model update.

Use `evals/light-shadow.json` for challenge prompts and required evidence. These are a manual evaluation specification, not proof that the agent has mastered the subject. Existing automated tests check packaging and invariants only. Review multiple outputs and a held-out task before promoting a reusable rule; maintain a rollback path and do not overwrite scientific constraints with preferences.
