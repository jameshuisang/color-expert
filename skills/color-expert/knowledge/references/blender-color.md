# Blender / 3D color pipeline

Reviewed 2026-11-14. Version-pinned primary references: Blender **5.0** manual [Colour Spaces](https://docs.blender.org/manual/en/5.0/render/color_management/color_spaces.html) and [Displays and Views](https://docs.blender.org/manual/en/5.0/render/color_management/displays_views.html), relevant article text read directly after search fetch errors. [OpenColorIO](https://opencolorio.org/) overview also read. This does not establish the user's installed Blender version or configuration.

## Facts to preserve

Blender processes scene colors in a scene-linear working space. The 5.0 default is Linear Rec.709; wider-gamut alternatives include ACEScg and Linear Rec.2020. Choose the working space early: changing it can affect rendering and require manual correction. Image input spaces and the sequencer have separate settings. Normal/displacement data should bypass color transforms using Non-Color; base-color images need their actual encoding. OpenEXR is suitable for scene-linear intermediates, but retain the working-space identity.

A display transform is distinct from the working space. AgX handles scene dynamic range and desaturates bright colors; it is not an ICC monitor profile or a material color space. Standard does not add a tone-mapping look; that does not make arbitrary lit materials match flat CSS. Khronos PBR Neutral targets faithful material colors under grayscale illumination with constraints, not every scene. Display P3 support also depends on hardware/OS/backend. View as Render and Save as Render control whether view adjustments apply to image viewing/export; avoid baking a look twice.

## Project application: website palette to material

Treat the UI swatch as an appearance target, not a final pixel promise. Record source encoding, Blender version, OCIO config, working space, display/view/look, exposure and output encoding. Import or convert the color once through the correct input path. Inspect a neutral-light test object, then the intended lighting. Roughness, metallic response, geometry, environment, exposure and view transform alter appearance. Do not compensate for a pipeline error by randomly increasing saturation.

For a flat brand graphic, consider keeping it display-referred in final compositing instead of forcing a lit surface to reproduce it. For a physical-looking object, preserve intended color relationships while accepting meaningful shading. These are project recommendations, not universal artistic laws.

## Verification boundary

No Blender executable/configuration, scene or render has been inspected or run in this update. No OCIO transforms are executed by the local converter. Linear sRGB/Rec.709 values are not ACEScg values; ACEScg also has a different white point. Do not paste converter output into arbitrary Blender sockets without checking the actual input convention. Browser previews do not validate Blender output or monitor calibration.
