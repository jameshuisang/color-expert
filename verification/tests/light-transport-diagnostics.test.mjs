import test from 'node:test';
import assert from 'node:assert/strict';
import {pointIrradiance,lambertianRGB,exposeLinear} from '../../skills/color-expert/tools/light-transport-diagnostics.mjs';
import {encode} from '../../skills/color-expert/tools/spaces.mjs';
test('ideal point light obeys inverse-square and cosine, not arbitrary shadow color',()=>{
 const e=pointIrradiance({intensity:100,distance:2,cosine:1});
 assert.equal(e,25);
 assert.equal(pointIrradiance({intensity:100,distance:4,cosine:1}),e/4);
 assert.equal(pointIrradiance({intensity:100,distance:2,cosine:.5}),e/2);
 assert.equal(pointIrradiance({intensity:100,distance:2,cosine:-1}),0);
 assert.equal(pointIrradiance({intensity:100,distance:2,cosine:1,visible:false}),0);
});
test('Lambertian radiance is reflectance times irradiance over pi',()=>{
 const v=lambertianRGB({reflectance:[1,.5,0],irradiance:[Math.PI,Math.PI,Math.PI]});
 assert.deepEqual(v,[1,.5,0]);
});
test('linear exposure preserves ratios and does not clip HDR',()=>{
 assert.deepEqual(exposeLinear([1,.5,.25],1),[2,1,.5]);
 assert.ok(Math.abs(encode(exposeLinear([1,1,1],-1)[0])-.735356983)<1e-8);
});
test('diagnostics reject invalid inputs including holes and unphysical reflectance',()=>{
 for (const distance of [0,-1,NaN,1e200,1e-200]) assert.throws(()=>pointIrradiance({intensity:1,distance,cosine:1}));
 assert.throws(()=>pointIrradiance({intensity:1,distance:1,cosine:2}));
 assert.throws(()=>lambertianRGB({reflectance:[1.1,0,0],irradiance:[1,1,1]}));
 assert.throws(()=>lambertianRGB({reflectance:new Array(3),irradiance:[1,1,1]}));
 assert.throws(()=>exposeLinear([1,1,1],Infinity));
});
