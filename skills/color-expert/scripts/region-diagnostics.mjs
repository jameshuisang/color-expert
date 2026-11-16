import {readFileSync,statSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {rgb,luminance} from './contrast.mjs';
import {convert} from './spaces.mjs';

const exactKeys=(value,keys)=>value!==null && typeof value==='object' && !Array.isArray(value) && Object.keys(value).length===keys.length && keys.every(k=>Object.hasOwn(value,k));
const LIMITS='Pairwise opaque-sRGB diagnostics only. No beauty, depth, focal-interest or accessibility pass/fail prediction; ignores area, placement, edges, lighting, adaptation and surrounding colors.';
function measure(hex){
 const coords=rgb(hex); // Rejects alpha, CSS strings and non-sRGB formats.
 const [L,C]=convert({from:'srgb',to:'oklch',coords}).coords;
 return {hex,luminance:luminance(hex),oklchL:L,oklchC:C};
}
/** Signed deltas are B minus A; L and C use numeric OKLCH units, not percentages. */
export function diagnoseRegions(data){
 if(!exactKeys(data,['pairs']) || !Array.isArray(data.pairs) || data.pairs.length<1 || data.pairs.length>128)throw new Error('Expected only pairs: an array of 1 to 128 named opaque-sRGB pairs');
 const names=new Set();
 const results=Array.from(data.pairs,p=>{
  if(!exactKeys(p,['name','a','b']))throw new Error('Each pair requires only name, a, b; alpha and thresholds are unsupported');
  if(typeof p.name!=='string'||p.name.trim().length===0||p.name.length>160||/[\u0000-\u001f\u007f]/u.test(p.name))throw new Error('Pair name must contain 1 to 160 characters without control characters');
  if(names.has(p.name.trim()))throw new Error('Pair names must be unique');
  names.add(p.name.trim());
  const a=measure(p.a),b=measure(p.b);
  return {name:p.name,a,b,absoluteLuminanceDelta:Math.abs(b.luminance-a.luminance),signedOklchLDelta:b.oklchL-a.oklchL,signedOklchCDelta:b.oklchC-a.oklchC,absoluteOklchCDelta:Math.abs(b.oklchC-a.oklchC)};
 });
 return {method:'Relative luminance and OKLCH L/C on opaque sRGB pairs',signedDeltaDirection:'b minus a',limits:LIMITS,results};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{
  if(process.argv.length!==3)throw new Error('Usage: node scripts/region-diagnostics.mjs pairs.json');
  if(statSync(process.argv[2]).size>262144)throw new Error('Input exceeds 256 KiB');
  console.log(JSON.stringify(diagnoseRegions(JSON.parse(readFileSync(process.argv[2],'utf8'))),null,2));
 }catch(e){console.error(e.message);process.exitCode=2;}
}
