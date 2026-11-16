import {readFileSync} from 'node:fs';import {pathToFileURL} from 'node:url';import {luminance} from './contrast.mjs';
export function inspectRamp(input){
 if(!input||input.type!=='sequential')throw Error('This checker supports sequential samples only; diverging, cyclic and categorical maps need different checks');
 if(!['increasing','decreasing'].includes(input.direction))throw Error('Specify increasing or decreasing luminance');
 if(!Array.isArray(input.colors)||input.colors.length<2||input.colors.length>256)throw Error('Provide 2..256 opaque sRGB colors');
 const values=input.colors.map(luminance),deltas=values.slice(1).map((v,i)=>v-values[i]);const sign=input.direction==='increasing'?1:-1;
 const plateaus=deltas.flatMap((d,i)=>Math.abs(d)<=1e-10?[i]:[]);const reversals=deltas.flatMap((d,i)=>d*sign < -1e-10?[i]:[]);
 return {method:'Relative luminance at opaque sRGB samples only',direction:input.direction,values,deltas,plateaus,reversals,strictlyOrdered:!plateaus.length&&!reversals.length,limitations:['Not perceptual uniformity','Not color-vision accessibility','Not continuous interpolation or text contrast']};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{const r=inspectRamp(JSON.parse(readFileSync(process.argv[2],'utf8')));console.log(JSON.stringify(r,null,2));process.exitCode=r.strictlyOrdered?0:1}catch(e){console.error(e.message);process.exitCode=2}}
