# Monitor color management

Reviewed 2026-11-14. Primary sources: [ICC display calibration](https://www.color.org/displaycalibration/) and [Apple ColorSync profile inspection](https://support.apple.com/en-ca/guide/colorsync-utility/csync004/mac). ICC page read; Apple indexed official page text read, direct page fetch rate-limited.

Calibration adjusts device behaviour toward a target; profiling characterizes that behaviour for color transforms. A profile is not a palette or a guarantee that every application uses it. ICC recommends measurement-based calibration, appropriate viewing conditions and periodic verification. Display gamut and brightness constrain reproduction. Viewing environment and observer differences still matter. Apple ColorSync can inspect installed profiles and compare their gamut plots; it does not turn that plot into a measurement of current panel accuracy.

## Project troubleshooting sequence

1. Record source space/profile and whether the asset is tagged. Do not “fix” appearance by assigning an unrelated profile. Assignment reinterprets numbers; conversion aims to preserve color appearance within target limits.
2. Record display model, active profile, operating system, browser/application version and SDR/HDR state. Do not infer these from a screenshot or from “Mac.”
3. Establish stable viewing conditions. For controlled comparisons, note brightness and any adaptive white-point/night modes; do not change the user's settings without authorization.
4. Compare a tagged test image in color-managed viewers. Separate export/tagging errors from application transforms and hardware drift.
5. If accuracy matters, use measurement and an appropriate calibration target. Do not prescribe one luminance/white-point target for web, cinema and print alike.

No monitor has been measured or calibrated by this project. No ICC files or system settings have been changed. Screenshots alone cannot certify physical display accuracy. The numeric converter is not an ICC engine.
