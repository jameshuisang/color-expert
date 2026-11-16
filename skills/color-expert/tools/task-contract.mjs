// Pure explicit task dispatch. This builds requirements, never executes or certifies them.
const DOMAINS=['expressive-art','ui','data','material'];
const dimension=(id,question)=>({id,question,evidenceClass:'subjective-visual-judgment',status:'untested'});
const check=(id,requirement)=>({id,requirement,status:'untested'});
function shape(input,keys){
 if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length!==keys.length||!keys.every(k=>Object.hasOwn(input,k)))throw new Error(`Expected only ${keys.join(', ')}`);
}
const enumValue=(v,values,label)=>{if(!values.includes(v))throw new Error(`${label} must be explicitly one of: ${values.join(', ')}`);};
export function buildTaskContract(input){
 if(!input||!DOMAINS.includes(input.domain))throw new Error('Explicit domain required: expressive-art, ui, data, material; no keyword inference');
 let sourceRoutes,questions,requirements,reviewerDimensions,notRequired=[];
 let parameters;
 if(input.domain==='expressive-art'){
  shape(input,['domain','spatialIntent']);enumValue(input.spatialIntent,['flat','depth'],'spatialIntent');
  parameters={spatialIntent:input.spatialIntent};
  sourceRoutes=[input.spatialIntent==='flat'?'expressive-palette':'illustration-depth'];
  questions=['What expression, medium, audience and reference relationships are intended?','Which relationships should dominate, and which should remain quiet?'];
  requirements=[check('intent-comparison','Compare intended expression with the actual composition; do not infer universal emotions from hues.'),check('functional-text','Inventory any actual functional text; audit applicable contrast or explicitly declare none.')];
  reviewerDimensions=[dimension('expression','Does the color expression fit the stated intent?'),dimension('relationships','Do color, area and placement relationships support the composition?')];
  if(input.spatialIntent==='depth')reviewerDimensions.push(dimension('spatial-readability','Do the intended planes and light relationships read convincingly?'));
  else {reviewerDimensions.push(dimension('flat-composition','Does the deliberately flat organisation work on its own terms?'));notRequired=['Simulated depth, realistic lighting or volumetric shading. Do not penalize flat art for their absence.'];}
 }else if(input.domain==='ui'){
  shape(input,['domain','theme','states']);enumValue(input.theme,['light','dark'],'theme');
  if(!Array.isArray(input.states)||input.states.length<1||input.states.length>64||![...input.states].every(s=>typeof s==='string'&&s===s.trim()&&s.length>0&&s.length<=120&&!/[\u0000-\u001f\u007f]/u.test(s))||new Set(input.states).size!==input.states.length)throw new Error('UI states require 1–64 unique nonempty trimmed names, <=120 characters without controls');
  parameters={theme:input.theme,states:[...input.states]};sourceRoutes=['ui-palette'];
  questions=['What user task and semantic roles must the interface preserve?','Which text, control, focus, error and selection states exist in each named state?'];
  requirements=[check('state-coverage','Render and inspect every declared state; a single palette swatch or default screenshot is insufficient.'),check('text-coverage','Inventory actual rendered functional text and backgrounds in every state; measure contrast using the applicable threshold.'),check('non-text-and-semantics','Check applicable control/focus contrast and non-color cues. Preserve semantic meaning across states; decorative art hierarchy is not a substitute.')];
  reviewerDimensions=[dimension('task-clarity','Can the user identify the primary task and actionable elements?'),dimension('semantic-consistency','Are meaning, affordances and state changes consistent?'),dimension('state-legibility','Are all declared states readable and distinguishable?')];
 }else if(input.domain==='data'){
  const diverging=input.scaleType==='diverging';shape(input,diverging?['domain','scaleType','center']:['domain','scaleType']);
  enumValue(input.scaleType,['categorical','sequential','diverging','cyclic'],'scaleType');
  if(diverging&&(typeof input.center!=='number'||!Number.isFinite(input.center)))throw new Error('Diverging data requires a finite meaningful center; caller must justify its meaning');
  parameters={scaleType:input.scaleType,...(diverging?{center:input.center}:{})};sourceRoutes=['data-communication'];
  questions=['What data, units, audience, legend and comparison task does this encoding serve?',...(diverging?['Why is the declared center meaningful in these data, rather than an arbitrary midpoint?']:[])];
  const scaleChecks={categorical:'Check category distinguishability and stable identity; do not impose numerical order.',sequential:'Check ordered sample lightness against increasing/decreasing data meaning; ordering alone does not prove perceptual uniformity.',diverging:'Check both arms relative to the meaningful center, balance and sign/legend interpretation; do not require whole-ramp monotonicity.',cyclic:'Check wraparound continuity and cyclic data meaning; do not impose a false endpoint or whole-ramp monotonicity.'};
  requirements=[check('scale-semantics',scaleChecks[input.scaleType]),check('legend-and-access','Verify legend, labels and non-color alternatives, and test color-vision variation where possible; record untested cases explicitly.')];
  reviewerDimensions=[dimension('data-task-readability','Does the encoding support the stated comparison task without inventing structure?'),dimension('scale-interpretation','Does the visible scale match the declared data semantics and legend?'),dimension('distinguishability','Are relevant distinctions readable in context?')];
 }else{
  shape(input,['domain','rendererContext']);enumValue(input.rendererContext,['illustration','physical'],'rendererContext');
  parameters={rendererContext:input.rendererContext};sourceRoutes=input.rendererContext==='physical'?['light-shadow','blender-color']:['light-shadow'];
  questions=['What material, lighting, surface properties and viewing conditions are intended?','What renderer, working space, view transform and output medium are actually used?'];
  requirements=[check('pipeline-provenance','Record input color spaces, lighting, material settings and viewing/output transforms; do not equate a UI hex with rendered surface appearance.'),check('material-validation',input.rendererContext==='illustration'?'Assess depicted material and light relationships only. Illustration cannot validate physical reflectance or a real material.':'Distinguish physically based rendering from measured real-world material validation. Record renderer evidence; require measured samples/physical proof for physical-match claims, otherwise mark untested.')];
  reviewerDimensions=[dimension('material-readability','Does the depicted surface communicate the intended material?'),dimension('light-coherence','Are color and light relationships coherent with the intended scene?'),dimension('output-appearance','Does the viewed output preserve the intended appearance under the recorded transform?')];
 }
 return {version:1,domain:input.domain,parameters,sourceRoutes,questions,requirements,reviewerDimensions,notRequired,
  reviewPolicy:{actualLiveVisualReviewRequired:true,separateReviewerRequired:true,freshReviewerPerRevision:true,unavailableVisualTools:'blocked',instruction:'Use a separate reviewer who actually inspects the current live rendered artifact and relevant states; never simulate independent review or substitute code-only judgment.'},
  evidencePolicy:{objective:'Report measured numerical or structural checks with method, inputs and limits.',subjective:'Report visual judgments against this task contract, with reasons; scores are not objective beauty.',untested:'Mark every missing measurement, state, viewing condition or physical validation untested, not passed.'},
  status:'requirements-only-not-evaluated',limits:'No execution, certification, universal emotion mapping or universal beauty guarantee. Caller-selected domain and parameters are not inferred from prompt keywords.'};
}
