# Depth, attention and visual interest: primary research

Reviewed 2026-11-14. Coverage is explicitly limited below; no experiment replicated and no model fitted.

## Luminance is a conditional depth cue
[Hibbard et al., 2023, Luminance contrast provides metric depth information](https://pmc.ncbi.nlm.nih.gov/articles/PMC9929495/). Abstract, introduction and experimental results/discussion sections read. Luminance manipulation influenced local depth relationships under particular viewing conditions; increasing contrast aided apparent depth when luminance and disparity cues agreed, not when they conflicted. Between-object luminance changes did not produce the same result as within-object changes. This supports attention to consistent local shading cues, not “more contrast always creates depth” or a universal dark-is-far rule.

[Von Castell et al., 2018, Bright paint makes interior-space surfaces appear farther away](https://pmc.ncbi.nlm.nih.gov/articles/PMC6124702/). Abstract and discussion read. In stereoscopic room simulations, brighter bounding walls increased judged spatial extent; other surfaces had smaller effects. This is an important counterexample to blanket dark-is-deep advice. Room-distance judgments and object shape-from-shading are different tasks. Neither study proves a color recipe for our garden illustration.

## Focal attention is relational and multi-feature
[Itti & Koch, 2000](https://ilab.usc.edu/publications/Itti_Koch00vr.html). Author-hosted abstract read, not full model implementation. Their bottom-up saliency model combines orientation, intensity and color information. This motivates checking several competing cues rather than selecting the highest-chroma hue in isolation. A stimulus-driven saliency model is not a full account of task goals, meaning or aesthetic preference. No saliency detector is implemented here; do not claim measured gaze from visual judgment.

## Interestingness cannot be reduced to colorfulness
[Gardezi et al., 2021, What Makes an Image Interesting and How Can We Explain It](https://pmc.ncbi.nlm.nih.gov/articles/PMC8440840/). Abstract/introduction read; later fetch encountered a challenge, so no full-method audit claimed. In their photographic tasks, low-level colorfulness/complexity measures did not explain relative interestingness, while content-related factors and eye-movement measures were relevant. Do not generalize their category ordering to all art or all people. The actionable boundary is to avoid treating saturated pixels, edge count or viewing time as a reliable beauty/interest score.

## Conditional project application

Identify intended focal region and supporting planes, then inspect local relations, occlusion, shape, light consistency and content at both overview and detail scales. A color edit can strengthen one cue and weaken another. Describe the expected perceptual change before editing, and ask an independent reviewer whether it occurred. Numbers describe supplied colors, not what a viewer must perceive. Deliberate flat graphics should be graded for successful flat organization, not penalized for absent simulated depth.
