// Includes material derived from CSS Color Module Level 4, 12 November 2026,
// section 19: https://www.w3.org/TR/2026/CRD-css-color-4-20261112/#color-conversion-code
// Copyright © 2026 World Wide Web Consortium.
// W3C Software and Document License 2023:
// https://www.w3.org/copyright/software-license-2023/
// Full notice: docs/licenses/w3c-software-document-2023.txt
// Modified for this project: selected matrices and transfer functions reorganized
// into a limited D65 conversion module with validation and gamut reporting.
// Oklab by Björn Ottosson, Copyright (c) 2020 Björn Ottosson, MIT:
// docs/licenses/ottosson-2020-MIT.txt
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
// Numeric matrices/transfer definitions: W3C CSS Color 4, section 19,
// https://www.w3.org/TR/2026/CRD-css-color-4-20261112/#color-conversion-code
// Oklab model: https://bottosson.github.io/posts/oklab/
// Conversion only: no gamut mapping, ICC, OCIO, AgX, alpha, or CSS parser.
export const spaces = Object.freeze(['srgb','srgb-linear','display-p3','oklch']);
const mul=(m,v)=>m.map(row=>row.reduce((s,x,i)=>s+x*v[i],0));
const S=[[506752/1228815,87881/245763,12673/70218],[87098/409605,175762/245763,12673/175545],[7918/409605,87881/737289,1001167/1053270]];
const SI=[[12831/3959,-329/214,-1974/3959],[-851781/878810,1648619/878810,36519/878810],[705/12673,-2585/12673,705/667]];
const P=[[608311/1250200,189793/714400,198249/1000160],[35783/156275,247089/357200,198249/2500400],[0,32229/714400,5220557/5000800]];
const PI=[[446124/178915,-333277/357830,-72051/178915],[-14852/17905,63121/35810,423/17905],[11844/330415,-50337/660830,316169/330415]];
const X=[[.819022437996703,.3619062600528904,-.1288737815209879],[.0329836539323885,.9292868615863434,.0361446663506424],[.0481771893596242,.2642395317527308,.6335478284694309]];
const A=[[.210454268309314,.7936177747023054,-.0040720430116193],[1.9779985324311684,-2.4285922420485799,.450593709617411],[.0259040424655478,.7827717124575296,-.8086757549230774]];
const XI=[[1.2268798758459243,-.5578149944602171,.2813910456659647],[-.0405757452148008,1.112286803280317,-.0717110580655164],[-.0763729366746601,-.4214933324022432,1.5869240198367816]];
const AI=[[1,.3963377773761749,.2158037573099136],[1,-.1055613458156586,-.0638541728258133],[1,-.0894841775298119,-1.2914855480194092]];
const finite=v=>typeof v==='number'&&Number.isFinite(v);
export function decode(v){if(!finite(v))throw new Error('Expected finite channel');return Math.abs(v)<=.04045?v/12.92:Math.sign(v)*((Math.abs(v)+.055)/1.055)**2.4;}
export function encode(v){if(!finite(v))throw new Error('Expected finite channel');return Math.abs(v)<=.0031308?12.92*v:Math.sign(v)*(1.055*Math.abs(v)**(1/2.4)-.055);}
function triple(v){if(!Array.isArray(v)||v.length!==3||![...v].every(finite))throw new Error('Expected three finite numeric coordinates');}
const hue=h=>((h%360)+360)%360;
function xyz(space,v){
 if(space==='oklch'){const h=hue(v[2])*Math.PI/180;return mul(XI,mul(AI,[v[0],v[1]*Math.cos(h),v[1]*Math.sin(h)]).map(x=>x**3));}
 return mul(space==='display-p3'?P:S,space==='srgb-linear'?v:v.map(decode));
}
function fromXYZ(space,v){
 if(space==='oklch'){const [l,a,b]=mul(A,mul(X,v).map(Math.cbrt));const c=Math.hypot(a,b);return [l,c,c<=.000004?0:hue(Math.atan2(b,a)*180/Math.PI)];}
 const linear=mul(space==='display-p3'?PI:SI,v);return space==='srgb-linear'?linear:linear.map(encode);
}
// Tolerance only compensates matrix roundoff; coordinates are never clipped.
const inCube=v=>v.every(x=>x>=-1e-7&&x<=1+1e-7);
export function convert(request){
 if(!request||typeof request!=='object'||Array.isArray(request)||Object.keys(request).some(k=>!['from','to','coords'].includes(k)))throw new Error('Expected only from, to, coords; alpha and CSS strings unsupported');
 const {from,to,coords}=request;
 if(!spaces.includes(from)||!spaces.includes(to))throw new Error('Unsupported space');
 triple(coords);
 if(from==='oklch'&&(coords[0]<0||coords[0]>1||coords[1]<0))throw new Error('OKLCH input requires L in [0,1], C >= 0, hue degrees');
 const x=xyz(from,coords);triple(x);
 const result=from===to?[...coords]:fromXYZ(to,x);
 if(to==='oklch')result[2]=result[1]<=.000004?0:hue(result[2]);
 triple(result);
 const srgb=fromXYZ('srgb',x),p3=fromXYZ('display-p3',x);triple(srgb);triple(p3);
 return {space:to,coords:result,huePowerless:to==='oklch'?result[1]<=.000004:null,gamut:{srgb:inCube(srgb),'display-p3':inCube(p3),tolerance:1e-7},clipped:false,limits:'D65 numeric conversion only; no gamut mapping, alpha, ICC, OCIO, AgX or appearance matching'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{if(process.argv.length!==3)throw new Error('Usage: node scripts/spaces.mjs request.json');console.log(JSON.stringify(convert(JSON.parse(readFileSync(process.argv[2],'utf8'))),null,2));}
 catch(e){console.error(e.message);process.exitCode=2;}
}
