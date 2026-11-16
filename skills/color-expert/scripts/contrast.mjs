import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
export function rgb(hex) {
 if(typeof hex !== 'string' || !/^#(?:[a-f\d]{3}|[a-f\d]{6})$/i.test(hex)) throw new Error('Expected opaque sRGB #RGB or #RRGGBB; other formats are unsupported');
 const h=hex.slice(1);const s=h.length===3?[...h].map(c=>c+c).join(''):h;
 return [0,2,4].map(i=>parseInt(s.slice(i,i+2),16)/255);
}
export function luminance(hex) {const c=rgb(hex).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722;}
export function contrast(a,b) {const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);}
export function audit(data) {
 if(!data || !Array.isArray(data.pairs) || !data.pairs.length) throw new Error('pairs must be a nonempty array');
 return data.pairs.map(p=>{
  if(!p || typeof p.name!=='string' || !p.name.trim())throw new Error('Each pair needs a name');
  if(typeof p.minimum!=='number'||!Number.isFinite(p.minimum)||p.minimum<1||p.minimum>21) throw new Error('minimum must be a number from 1 to 21');
  const ratio=contrast(p.foreground,p.background);
  return {name:p.name,foreground:p.foreground,background:p.background,ratio,minimum:p.minimum,pass:ratio>=p.minimum};
 });
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
 try{if(process.argv.length!==3)throw new Error('Usage: node scripts/contrast.mjs palette.json');const results=audit(JSON.parse(readFileSync(process.argv[2],'utf8')));console.log(JSON.stringify({method:'WCAG relative luminance, opaque sRGB',results},null,2));process.exitCode=results.every(r=>r.pass)?0:1;}
 catch(e){console.error(e.message);process.exitCode=2;}
}
