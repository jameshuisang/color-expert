import test from 'node:test';
import assert from 'node:assert/strict';
import {luminance,contrast,audit,rgb} from '../scripts/contrast.mjs';
import {inspectRamp} from '../scripts/ramp.mjs';
import {lambertianRGB,pointIrradiance,exposeLinear} from '../scripts/light-transport-diagnostics.mjs';
const near=(actual,expected,tolerance=1e-12)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} != independent expected ${expected}`);
// Expected constants below are NOT produced by imports above. See docs/test-oracles.md.
// WCAG 2.2 normalized primary coefficients; black contrast = (Y+.05)/.05.
test('independent WCAG chromatic primary anchors defeat grayscale-only oracles',()=>{
 for(const [hex,y,ratio] of [['#ff0000',.2126,5.252],['#00ff00',.7152,15.304],['#0000ff',.0722,2.444]]){near(luminance(hex),y);near(contrast(hex,'#000000'),ratio)}
 assert.deepEqual(rgb('#1a2b3c'),[26/255,43/255,60/255]);
});
test('independent sRGB transfer values straddle 8-bit toe and include midgray',()=>{
 // Decimal arithmetic evaluated from the normative definition, frozen separately.
 for(const [hex,y] of [['#0a0a0a',.003035269835488375],['#0b0b0b',.003346535763899161],['#808080',.2158605001138992]])near(luminance(hex),y);
});
test('contract equality at exact maximum contrast must pass',()=>{
 assert.equal(audit({pairs:[{name:'maximum',foreground:'#000',background:'#fff',minimum:21}]})[0].pass,true);
});
test('chromatic ramp ordering has a fixed external luminance oracle',()=>{
 const r=inspectRamp({colors:['#0000ff','#ff0000','#00ff00'],direction:'increasing',type:'sequential'});
 assert.equal(r.strictlyOrdered,true);for(let i=0;i<3;i++)near(r.values[i],[.0722,.2126,.7152][i]);
});
test('analytic physical anchors include unequal channels and nonunit geometry',()=>{
 // PBRT point-source and Lambertian equations, independently evaluated constants.
 near(pointIrradiance({intensity:72,distance:3,cosine:.25}),2);
 const a=lambertianRGB({reflectance:[1,.25,.5],irradiance:[2,8,6]});
 [0.6366197723675814,0.6366197723675814,0.954929658551372].forEach((x,i)=>near(a[i],x));
 assert.deepEqual(exposeLinear([.25,1,3],2),[1,4,12]);
});
