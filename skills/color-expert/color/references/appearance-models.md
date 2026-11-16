# Appearance models: evidence and limits

Reviewed 2026-11-14; publisher summary rechecked 2026-11-16.

CIE describes a color appearance model as a viewing-condition-dependent mapping between tristimulus measurements and perceptual attributes. Its CIECAM02 publication (CIE 159:2004) was withdrawn in 2022 and superseded by CIECAM16 (CIE 248:2022).

Sources:
- https://cie.co.at/publications/colour-appearance-model-colour-management-systems-ciecam02
- https://www.cie.co.at/publications/cie-2016-colour-appearance-model-colour-management-systems-ciecam16

Project interpretation: this supports accounting for illumination, surround and context. It does not make a 2022 creator interview a current implementation specification. Keep a wheel's purpose, coordinate system, assumed conditions and medium explicit. A pigment-mixing guide, a perceptual palette tool and CSS interpolation solve different tasks; do not transfer conclusions between them without evidence.

Coverage: public publisher summaries, not the full CIECAM16 report. No CIECAM16 implementation or numerical ColorDisk validation is implied. Existing XYZ/Oklab coordinate conversions and separate WCAG/APCA checks do not implement viewing-condition appearance prediction.
