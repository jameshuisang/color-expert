# One color expert, different success criteria

The lead explicitly chooses the task contract, then delegates numerical/visual specialists under itself. Sources and subagents do not become separate user-facing experts. Same color fundamentals, different purpose. Contract generation is not execution or validation.

```js
import {buildTaskContract} from './scripts/task-contract.mjs';
const ui = buildTaskContract({domain:'ui',theme:'dark',states:['default','focus','error']});
const data = buildTaskContract({domain:'data',scaleType:'sequential'});
const art = buildTaskContract({domain:'expressive-art',spatialIntent:'flat'});
const diverging = buildTaskContract({domain:'data',scaleType:'diverging',center:0});
const material = buildTaskContract({domain:'material',rendererContext:'physical'});
```

Missing/unknown/incompatible inputs fail rather than guessing from mood words. The meaningfulness of a diverging center still requires justification; a finite number alone cannot establish it. For mixed work, select primary domain and add checks for actual secondary content. Art with captions needs text checks; a dashboard map needs data checks as well as UI checks.

## Domain review dimensions

Score each 0–4 with actual visible/task evidence: 0 fails intended outcome, 1 major defect, 2 mixed/ambiguous, 3 meets declared scope with minor limits, 4 strong specific evidence. Acceptance requires each >=3 AND applicable objective/semantic gates. Unknown evidence stays untested, not 3 by default. No aggregate beauty score compensates for failed communication.

- **Expressive art:** expression, compositional relationships, declared flat organization OR spatial readability. Do not reward depth when deliberately flat. Numeric contrast applies to functional text where relevant, not every painted boundary.
- **UI:** task/action clarity, semantic consistency and state legibility. Show actual declared states. Ask what is actionable/selected/failed/focused and what happens next. Check text and necessary non-text cues, visible non-color alternatives, interaction and keyboard outcome. Static image checks cannot establish operation or real-user speed/error rate. Brand fit is secondary, not a waiver.
- **Data:** encoding semantics, decoding accuracy and legend/context completeness. State question/unit/period/domain, mapping and non-color cues. Test threshold/boundary, nonadjacent comparison, zero/missing/outside range. Sample luminance order is only one diagnostic; do not require it globally for categorical/diverging/cyclic scales.
- **Material:** light/material interpretation and declared pipeline/context. A stylized patch illustration cannot validate physical light transport, material roughness, display profile or AgX.

Each helper's `reviewerDimensions` carries domain questions; use these with the common anchors above. Keep subjective observer scores separate from counted task answers, deterministic checks and human preference. A model reviewer answering a task is a model diagnostic, not user-study evidence. New tuned criteria need new unseen tasks before claiming improved generalization.

## Five-bin declared data audit

`auditDataEncoding` in `scripts/data-encoding.mjs` accepts `unit:{symbol,name}`, `domain:{lower,upper}`, `luminanceDirection`, exactly five `bins:{lower,upper,lowerInclusive,upperInclusive,label,color}`, and `missingData:{value:null,label,symbol,color}`. It reports interval coverage, semantic failures and sampled luminance ordering separately. It detects gaps/overlap, double-included boundary values, ambiguous units, repeated labels and numerical/no-data collisions. It generates unambiguous interval labels for rendering. Values must be opaque sRGB. Closed domain endpoints are this helper's supported contract, not a universal classification rule.

It does not render charts, interpret dataset units, verify period/normalization prose, test actual data membership, simulate CVD, judge label placement, or certify accessibility. Out-of-domain handling still requires explicit host validation. Richer maps, variable class counts, categorical/diverging/cyclic encodings need appropriate validators. Never pass a success flag from this narrow helper off as full communication success.

## Current controller boundary

`workflow.mjs start` now requires explicit `brief.task`. Example static UI:

```json
{"medium":"ui","task":{"domain":"ui","theme":"light","states":["default"]},"scope":"my-study","goal":"Assess booking palette","maxRevisions":2}
```

The existing SVG renderer only supplies a static UI/poster palette study. It rejects UI requests beyond the default state rather than pretending to render focus/hover, and rejects data/material domains incompatible with those media. A poster uses an expressive-art contract. An appropriate host renderer is still required for functioning UI, real data graphics or physical materials. The task contract is passed to author/reviewer packets; stored generic scores govern only the static study, NOT automatic satisfaction of all domain questions. Historical runs and baselines are unchanged; old start briefs need `task` added. The example brief is updated.
