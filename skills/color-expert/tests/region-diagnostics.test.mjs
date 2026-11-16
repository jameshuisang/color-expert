import test from 'node:test';
import assert from 'node:assert/strict';
import {diagnoseRegions} from '../scripts/region-diagnostics.mjs';
const pair=(a,b,name='Plane A to plane B')=>({name,a,b});
const run=(a,b)=>diagnoseRegions({pairs:[pair(a,b)]}).results[0];
test('region diagnostics equal colors have zero deltas and no verdict',()=>{
 const r=run('#369','#336699');
 for(const key of ['absoluteLuminanceDelta','signedOklchLDelta','signedOklchCDelta','absoluteOklchCDelta'])assert.equal(r[key],0);
 assert.equal(r.name,'Plane A to plane B');assert.ok(!Object.hasOwn(r,'pass'));
 assert.match(diagnoseRegions({pairs:[pair('#000','#fff')]}).limits,/No beauty, depth/);
});
test('region black to white reports luminance 1 and signed lightness near 1',()=>{
 const r=run('#000','#fff');assert.equal(r.absoluteLuminanceDelta,1);assert.ok(Math.abs(r.signedOklchLDelta-1)<1e-7);
 assert.ok(r.absoluteOklchCDelta<1e-7);assert.equal(r.a.luminance,0);assert.equal(r.b.luminance,1);
 const reverse=run('#fff','#000');assert.equal(reverse.absoluteLuminanceDelta,r.absoluteLuminanceDelta);assert.equal(reverse.signedOklchLDelta,-r.signedOklchLDelta);
});
test('region colored comparisons retain labels/order and signed chroma direction',()=>{
 const output=diagnoseRegions({pairs:[pair('#777','#f00','Focal region'),pair('#f00','#777','Surround')]});
 assert.deepEqual(output.results.map(r=>r.name),['Focal region','Surround']);assert.equal(output.signedDeltaDirection,'b minus a');
 const [a,b]=output.results;assert.ok(a.signedOklchCDelta>0);assert.equal(a.signedOklchCDelta,-b.signedOklchCDelta);assert.equal(a.absoluteOklchCDelta,b.absoluteOklchCDelta);
});
test('region input bounds and unsupported fields/formats fail explicitly',()=>{
 const good=pair('#000','#fff');
 for(const x of [null,[],{}, {pairs:[]},{pairs:new Array(129).fill(good)},{pairs:new Array(1)},
 {pairs:[good],threshold:1},{pairs:[{...good,alpha:.5}]},{pairs:[{...good,name:' '}]},
 {pairs:[{...good,name:'a'.repeat(161)}]},{pairs:[{...good,name:'line\nbreak'}]},
 {pairs:[good,good]},{pairs:[{...good,a:'#ffffff00'}]},{pairs:[{...good,b:'color(display-p3 1 0 0)'}]},
 {pairs:[{...good,a:NaN}]},{pairs:[{...good,b:Infinity}]}])assert.throws(()=>diagnoseRegions(x));
});
