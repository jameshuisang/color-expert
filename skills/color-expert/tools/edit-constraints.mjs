// Explicit plan-consistency check only. No NLP, image analysis, lock enforcement or pixel-fidelity proof.
import {readFileSync,realpathSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const properties=new Set(['fill','stroke','geometry']);
const id=x=>typeof x==='string'&&/^[a-z][a-z0-9-]{0,63}$/.test(x);
const exact=(x,keys)=>x&&typeof x==='object'&&!Array.isArray(x)&&Object.keys(x).every(k=>keys.includes(k));
const bounded=x=>Array.isArray(x)&&x.length<=100;
export function auditEditConstraints(plan){
 if(!exact(plan,['mappingComplete','regions','overlaps','writes'])||!bounded(plan.regions)||!plan.regions.length||!bounded(plan.writes)||!plan.writes.length)throw Error('Bounded regions and writes required');
 const regions=new Map(),unknown=[],conflicts=[];
 for(const r of plan.regions){
  if(!exact(r,['id','parent','locked'])||!id(r.id)||regions.has(r.id)||!(r.parent===null||id(r.parent))||!Array.isArray(r.locked)||r.locked.length>3||new Set(r.locked).size!==r.locked.length||r.locked.some(p=>!properties.has(p)))throw Error('Invalid or duplicate region');
  regions.set(r.id,r);
 }
 for(const r of regions.values()){
  const seen=new Set([r.id]);let p=r.parent;
  while(p!==null){if(!regions.has(p))throw Error('Unknown parent');if(seen.has(p))throw Error('Cyclic hierarchy');seen.add(p);p=regions.get(p).parent;}
 }
 const inside=(child,parent)=>{let current=child;while(current!==null){if(current===parent)return true;current=regions.get(current).parent;}return false;};
 const related=(a,b)=>inside(a,b)||inside(b,a);
 if(plan.mappingComplete!==true)unknown.push('Region/property mapping not declared complete');
 const overlaps=plan.overlaps;
 if(overlaps===undefined)unknown.push('Overlap mapping missing');
 else if(!bounded(overlaps))throw Error('Invalid overlap mapping');
 else for(const pair of overlaps){if(!Array.isArray(pair)||pair.length!==2||pair.some(x=>!id(x))||pair[0]===pair[1])throw Error('Invalid overlap pair');if(pair.some(x=>!regions.has(x)))unknown.push('Unmapped overlap target');}
 const assignments=new Map();
 for(const w of plan.writes){
  if(!exact(w,['region','property','value'])||!id(w.region)||!properties.has(w.property)||typeof w.value!=='string'||!w.value.trim()||w.value.length>200)throw Error('Invalid write');
  if(!regions.has(w.region)){unknown.push('Unmapped write target: '+w.region);continue;}
  const key=w.region+':'+w.property;
  if(assignments.has(key)&&assignments.get(key)!==w.value)conflicts.push('Conflicting assignments: '+key);
  assignments.set(key,w.value);
  for(const locked of regions.values()){
   if(locked.locked.includes(w.property)&&related(w.region,locked.id))conflicts.push('Protected '+w.property+': '+locked.id+' affected by '+w.region);
   if(locked.locked.some(p=>p==='fill'||p==='stroke')&&Array.isArray(overlaps)&&overlaps.some(([a,b])=>regions.has(a)&&regions.has(b)&&((related(w.region,a)&&related(locked.id,b))||(related(w.region,b)&&related(locked.id,a)))))conflicts.push('Possible occlusion of protected appearance: '+locked.id);
  }
 }
 return {status:conflicts.length?'contradiction':unknown.length?'incomplete':'consistent-declaration',conflicts:[...new Set(conflicts)],unknown:[...new Set(unknown)],preservesPixelsVerified:false,scope:'Explicit region tree, locks, assignments and declared overlaps only. Mapping is host-supplied, not authenticated or geometrically checked. No natural-language conflict detection, actual lock enforcement, color-quality or pixel-fidelity verification.'};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===realpathSync(process.argv[1])){try{const r=auditEditConstraints(JSON.parse(readFileSync(process.argv[2],'utf8')));console.log(JSON.stringify(r,null,2));process.exitCode=r.status==='contradiction'?1:r.status==='incomplete'?3:0}catch(e){console.error(e.message);process.exitCode=2}}
