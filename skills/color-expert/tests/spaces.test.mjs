import test from 'node:test';
import assert from 'node:assert/strict';
import {convert,decode,encode} from '../scripts/spaces.mjs';
const cv=(from,to,coords)=>convert({from,to,coords});
const near=(a,b,t=1e-6)=>a.forEach((v,i)=>assert.ok(Math.abs(v-b[i])<t,`${a} != ${b}`));
test('space transfer functions preserve linear toe, negatives and known mid-gray',()=>{
 assert.equal(decode(.04045),.04045/12.92);assert.equal(encode(.0031308),12.92*.0031308);
 near([decode(.5),encode(.21404114048223255)],[.21404114048223255,.5],1e-12);
 for(const x of [-1.2,-.2,0,.001,.04,.5,1,1.2])assert.ok(Math.abs(encode(decode(x))-x)<1e-7);
});
test('space known sRGB red Oklch anchor and black/white/neutral hue',()=>{
 near(cv('srgb','oklch',[1,0,0]).coords,[.62795536,.25768331,29.233885],2e-5);
 near(cv('srgb','oklch',[0,0,0]).coords,[0,0,0]);
 const w=cv('srgb','oklch',[1,1,1]);near(w.coords,[1,0,0]);assert.equal(w.huePowerless,true);
 assert.equal(cv('srgb','oklch',[.5,.5,.5]).huePowerless,true);
 near(cv('oklch','srgb',[.5,0,271]).coords,[.388572859,.388572859,.388572859]);
});
test('Display P3 red genuinely exceeds sRGB; conversion does not clip or relabel',()=>{
 const r=cv('display-p3','srgb',[1,0,0]);near(r.coords,[1.09306636,-.22674197,-.15013458],1e-7);
 assert.equal(r.gamut.srgb,false);assert.equal(r.gamut['display-p3'],true);assert.equal(r.clipped,false);
});
test('space round trips and same-space preservation',()=>{
 for(const space of ['srgb','srgb-linear','display-p3'])for(const v of [[.2,.4,.6],[1,0,0],[0,1,0],[0,0,1]]){
  for(const target of ['srgb','srgb-linear','display-p3','oklch'])near(cv(target,space,cv(space,target,v).coords).coords,v,2e-6);
 }
 const v=[-.1,.3,1.1];near(cv('srgb','srgb',v).coords,v,1e-12);
 near(cv('oklch','oklch',[.5,.1,-30]).coords,[.5,.1,330]);
});
test('space API rejects CSS, alpha, invalid triples and unsupported transforms',()=>{
 for(const req of [null,'red',{from:'srgb',to:'xyz',coords:[0,0,0]},{from:'srgb',to:'srgb',coords:[0,0,0],alpha:1},
 {from:'srgb',to:'oklch',coords:[0,NaN,0]},{from:'srgb',to:'oklch',coords:[0,Infinity,0]},
 {from:'srgb',to:'oklch',coords:[0,0]},{from:'srgb',to:'oklch',coords:[0,,0]},
 {from:'oklch',to:'srgb',coords:[50,.1,0]},{from:'oklch',to:'srgb',coords:[.5,-.1,0]},
 {from:'srgb',to:'oklch',coords:[1e308,0,0]}])assert.throws(()=>convert(req));
});
