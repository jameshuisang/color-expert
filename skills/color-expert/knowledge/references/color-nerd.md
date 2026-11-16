# Color Nerd: selected creator guidance

Reviewed 2026-11-14. Coverage includes selected written material and seven complete available video transcripts, not the full channel or visual review.

## Creator concepts

From Peter Donahue's 2022 interview, *Design is for Everyone*, episode 10 (July 5): https://designisforeveryone.webflow.io/episodes/s1-e10-peter-donahue

Donahue describes basing his ColorDisk on CIECAM02, accounting for viewing context rather than treating an artist's wheel as a complete perceptual model. He emphasizes that pigment-mixing paths need not be straight lines. Treat the description of his particular disk as a historical creator claim: its current implementation was not measured here. His sweeping criticism of traditional teaching is an educational position, not a license to label every traditional model false.

From the creator's six-lesson product teaching page: https://www.thegraymuse.com/en-ca/pages/color-fidget

The written lesson descriptions suggest exploring color character as well as hue; limiting choices with gamut masks; considering similarity and contrast; and assigning different roles and amounts to colors. They discuss 60–30–10 alongside counterexamples, so do not enforce it as a universal rule. The page's Moon–Spencer framework and emotion associations are creator teaching material, not validated universal predictors of taste or user response. These are summaries of the page, not video transcripts. The page reserves rights to its videos, diagrams and content; retain links and concise notes, not copied course assets.

## How this changes the specialist

For an expressive palette, describe intended character, visual hierarchy and relative amounts before selecting a wheel-based harmony. Show alternatives and evaluate them in context. For software, add semantic states and measured text contrast; an artistic harmony or complementary relationship does not establish accessibility. For paint, request actual pigments and medium rather than predicting mixtures with CSS interpolation.

## Verification

CIE confirms that appearance models depend on viewing conditions. Its CIECAM02 report was superseded by CIECAM16 in 2022. This supports the need to specify context, not a claim that a particular ColorDisk is exact or that one model is the only valid one. See `appearance-models.md`.

## Current official tools (discovered, not audited)

https://petertdonahue.com/ links to a Digital Color Fidget, OSA-UCS picker, gamut-mask and palette tools. https://linktr.ee/color.nerd links to ColorDisk resources. Tool algorithms, output accuracy, asset rights and current disk version have not been independently checked.

## Video: ColorDisk walkthrough (2022)

Source: https://www.youtube.com/watch?v=alrdClpGHvY — *HOW TO USE MY SCIENCE-BASED COLOR WHEEL*. Read the available transcript through Egolite, 0:00–8:00 of 8:05, on 2026-11-14. Auto-caption spellings may be wrong; diagrams were not independently inspected.

- **1:20–2:18:** Donahue distinguishes visually complementary hues from pigments that mix to neutral. His proposed pairings belong to his diagram, not every RGB, print or paint model.
- **2:18–3:31:** The disk locates common pigments by hue and chroma and labels them with pigment codes. Do not infer a paint recipe from hue names alone.
- **3:31–5:28:** He presents an overlay, attributed to Kubelka–Munk theory, to approximate curved pigment-mixing paths and hue shifts when adding white. This is a creator demonstration, not a measured validation of the overlay; do not substitute it for medium-specific mixing tests.
- **5:39–7:20:** Color names are presented descriptively, based on surveyed English usage, rather than mandatory primary/secondary naming rules. Do not universalize those names across languages.
- **7:27–8:00:** He calls the disk an evolving prototype. Preserve the resource version when using it.

The six Color Fidget lesson transcripts are now summarized separately in `color-fidget-lessons.md`; load that reference only when the task concerns character, gamut masks, relationships, proportions or applied exploration.
