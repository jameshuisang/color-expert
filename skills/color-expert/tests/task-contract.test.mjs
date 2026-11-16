import test from 'node:test';
import assert from 'node:assert/strict';
import {buildTaskContract as build} from '../scripts/task-contract.mjs';
test('explicit expressive contracts respect flat intent rather than penalize missing depth',()=>{
 const flat=build({domain:'expressive-art',spatialIntent:'flat'}),depth=build({domain:'expressive-art',spatialIntent:'depth'});
 assert.deepEqual(flat.sourceRoutes,['expressive-palette']);assert.deepEqual(depth.sourceRoutes,['illustration-depth']);
 assert.ok(!flat.reviewerDimensions.some(d=>d.id==='spatial-readability'));assert.match(flat.notRequired.join(' '),/Do not penalize flat art/);
 assert.ok(depth.reviewerDimensions.some(d=>d.id==='spatial-readability'));
});
test('UI requires task/state semantics with copied explicit theme and states',()=>{
 const input={domain:'ui',theme:'dark',states:['default','error','focus']};const c=build(input);
 assert.deepEqual(c.sourceRoutes,['ui-palette']);assert.ok(c.reviewerDimensions.some(d=>d.id==='semantic-consistency'));
 assert.match(c.requirements.map(r=>r.requirement).join(' '),/art hierarchy is not a substitute/);
 input.states.push('changed');assert.equal(c.parameters.states.length,3);
});
test('data semantics are explicit and diverging center is required, not assumed',()=>{
 for(const scaleType of ['categorical','sequential','diverging','cyclic']){
  const c=build({domain:'data',scaleType,...(scaleType==='diverging'?{center:0}:{})});
  assert.deepEqual(c.sourceRoutes,['data-communication']);assert.equal(c.parameters.scaleType,scaleType);
  if(scaleType==='diverging')assert.match(c.questions.join(' '),/Why is the declared center meaningful/);
 }
});
test('material illustrations cannot validate physical materials',()=>{
 const i=build({domain:'material',rendererContext:'illustration'}),p=build({domain:'material',rendererContext:'physical'});
 assert.deepEqual(i.sourceRoutes,['light-shadow']);assert.deepEqual(p.sourceRoutes,['light-shadow','blender-color']);
 assert.match(i.requirements[1].requirement,/cannot validate physical/);assert.match(p.requirements[1].requirement,/otherwise mark untested/);
});
test('every contract demands actual separate live review and separates evidence classes',()=>{
 for(const input of [{domain:'expressive-art',spatialIntent:'flat'},{domain:'ui',theme:'light',states:['default']},{domain:'data',scaleType:'sequential'},{domain:'material',rendererContext:'physical'}]){
  const c=build(input);assert.equal(c.reviewPolicy.actualLiveVisualReviewRequired,true);assert.equal(c.reviewPolicy.separateReviewerRequired,true);assert.equal(c.reviewPolicy.unavailableVisualTools,'blocked');
  assert.deepEqual(Object.keys(c.evidencePolicy),['objective','subjective','untested']);assert.equal(c.status,'requirements-only-not-evaluated');
  assert.ok(c.reviewerDimensions.every(d=>d.status==='untested'));assert.ok(c.requirements.every(d=>d.status==='untested'));
 }
});
test('ambiguous, missing and incompatible domains/parameters fail without keyword inference',()=>{
 for(const input of [null,{},'ui',{domain:'a dark UI'},{domain:'ui'},{domain:'ui',theme:'auto',states:['default']},{domain:'ui',theme:'light',states:[]},{domain:'ui',theme:'light',states:['x','x']},{domain:'ui',theme:'light',states:new Array(1)},
 {domain:'ui',theme:'light',states:['default'],spatialIntent:'depth'},{domain:'expressive-art',spatialIntent:'maybe'},
 {domain:'data'},{domain:'data',scaleType:'diverging'},{domain:'data',scaleType:'diverging',center:NaN},{domain:'data',scaleType:'diverging',center:Infinity},{domain:'data',scaleType:'sequential',center:0},
 {domain:'material',rendererContext:'blender'},{domain:'material',rendererContext:'illustration',physicalValidated:true}])assert.throws(()=>build(input));
});
