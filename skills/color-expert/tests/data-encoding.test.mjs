import test from 'node:test';
import assert from 'node:assert/strict';
import {auditDataEncoding} from '../scripts/data-encoding.mjs';
const fixture=()=>({unit:{symbol:'mm',name:'millimetres'},domain:{lower:0,upper:125},luminanceDirection:'decreasing',bins:['#eee','#bbb','#888','#555','#222'].map((color,i)=>({lower:i*25,upper:(i+1)*25,lowerInclusive:true,upperInclusive:i===4,label:`Rainfall class ${i+1}`,color})),missingData:{value:null,label:'No observations',symbol:'×',color:'#ff00ff'}});
const types=r=>[...r.coverageFailures,...r.semanticFailures].map(f=>f.type);
test('valid half-open bins with closed last endpoint provide numeric non-color labels',()=>{
 const r=auditDataEncoding(fixture());assert.equal(r.overallPass,true);assert.equal(r.samples[0].numericLabel,'[0, 25) mm');assert.equal(r.samples[4].numericLabel,'[100, 125] mm');
 assert.match(r.limits,/not verified/);
});
test('overlaps, gaps and shared endpoints fail independently of luminance',()=>{
 for(const [mutate,type] of [
  [d=>d.bins[1].lower=24,'overlapping-bins'],[d=>d.bins[1].lower=26,'bin-gap'],
  [d=>d.bins[0].upperInclusive=true,'shared-inclusive-endpoint'],[d=>d.bins[1].lowerInclusive=false,'excluded-shared-endpoint'],
  [d=>d.bins[4].upperInclusive=false,'excluded-domain-endpoint'],[d=>d.domain.upper=150,'domain-boundary-mismatch'],
  [d=>d.bins[1].lower=-1,'unordered-bins'],[d=>d.bins[1].upper=25,'nonpositive-bin-width']]){
  const d=fixture();mutate(d);const r=auditDataEncoding(d);assert.equal(r.overallPass,false);assert.ok(types(r).includes(type));assert.equal(r.luminanceOrderPass,true);
 }
});
test('missing and ambiguous units, missing or duplicate labels fail closed',()=>{
 for(const [mutate,type] of [[d=>d.unit=null,'missing-unit'],[d=>d.unit.symbol='','ambiguous-unit'],[d=>d.unit.name='unknown','ambiguous-unit'],[d=>d.bins[1].label='','missing-bin-label'],[d=>d.bins[1].label=d.bins[0].label.toUpperCase(),'duplicate-label']]){
  const d=fixture();mutate(d);const r=auditDataEncoding(d);assert.equal(r.overallPass,false);assert.ok(types(r).includes(type));
 }
});
test('no-data must have null sentinel and separate label, symbol and resolved color',()=>{
 for(const [mutate,type] of [[d=>d.missingData=null,'missing-no-data-encoding'],[d=>d.missingData.value=0,'numeric-no-data-sentinel'],[d=>d.missingData.label='0','zero-no-data-label-or-symbol'],[d=>d.missingData.symbol='0','zero-no-data-label-or-symbol'],[d=>d.missingData.symbol='','missing-no-data-label-or-symbol'],[d=>d.missingData.label=d.bins[0].label,'duplicate-no-data-label'],[d=>d.missingData.color='#EEEEEE','no-data-color-reuses-bin']]){
  const d=fixture();mutate(d);const r=auditDataEncoding(d);assert.equal(r.overallPass,false);assert.ok(types(r).includes(type));
 }
});
test('luminance direction and repeated colors are distinct from semantic checks',()=>{
 for(const mutate of [d=>d.luminanceDirection='increasing',d=>d.bins[1].color=d.bins[0].color]){
  const d=fixture();mutate(d);const r=auditDataEncoding(d);assert.equal(r.coverageComplete,true);assert.equal(r.semanticsPass,true);assert.equal(r.luminanceOrderPass,false);assert.equal(r.overallPass,false);
 }
 const d=fixture();const colors=d.bins.map(b=>b.color).reverse();d.bins.forEach((b,i)=>b.color=colors[i]);d.luminanceDirection='increasing';assert.equal(auditDataEncoding(d).overallPass,true);
});
test('reject malformed, nonfinite, unbounded, sparse and nonopaque input',()=>{
 for(const mutate of [d=>d.extra=true,d=>delete d.unit,d=>d.unit=['mm','in'],d=>d.unit.symbol='x'.repeat(161),d=>d.domain.lower=NaN,d=>d.domain.upper=Infinity,d=>d.domain.upper=0,d=>d.luminanceDirection='either',d=>d.bins.pop(),d=>d.bins=new Array(5),d=>d.bins[0].lower='0',d=>d.bins[0].upper=Infinity,d=>d.bins[0].lowerInclusive='yes',d=>d.bins[0].color='#ffffff80',d=>d.bins[0].label='a\nb',d=>d.missingData.value='0',d=>d.missingData.color='transparent']){
  const d=fixture();mutate(d);assert.throws(()=>auditDataEncoding(d));
 }
 for(const d of [null,{},[]])assert.throws(()=>auditDataEncoding(d));
});
