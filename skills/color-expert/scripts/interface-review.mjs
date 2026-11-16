import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,join,dirname} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {privateStateRoot} from './private-state.mjs';
import {contrast} from './contrast.mjs';
const digest=s=>createHash('sha256').update(s).digest('hex');
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const save=(p,x)=>writeFileSync(p,JSON.stringify(x,null,2)+'\n',{flag:'wx'});
const text=x=>typeof x==='string'&&x.trim().length>0&&x.length<=2000;
const demand=(x,m)=>{if(!x)throw Error(m)};
export function validateContract(c){
 demand(c?.version===1&&text(c.goal)&&text(c.audience)&&text(c.intendedReading)&&text(c.avoidedReading),'Explicit contextual brief required');
 demand(text(c.leadId)&&Array.isArray(c.cases)&&c.cases.length>0&&c.cases.length<=30,'Lead and bounded cases required');
 const ids=new Set();
 for(const x of c.cases){
  demand(text(x.id)&&!ids.has(x.id),'Unique case ids required');ids.add(x.id);
  demand(text(x.state)&&text(x.setup)&&Number.isInteger(x.width)&&x.width>=240&&x.width<=3840&&Number.isInteger(x.height)&&x.height>=240&&x.height<=2160,'Explicit state, setup and viewport required');
  demand(Array.isArray(x.assertions)&&x.assertions.length>0&&x.assertions.every(a=>text(a.selector)&&['text','attribute','focus','hidden'].includes(a.type)&&text(a.expected)&&(a.type!=='attribute'||text(a.name))),'Predeclare state assertions');
  demand(Array.isArray(x.observations)&&x.observations.length>0&&x.observations.length<=50,'Predeclare visible observations');
  const names=new Set();for(const o of x.observations){
   demand(text(o.id)&&!names.has(o.id)&&text(o.selector),'Unique observation ids and selectors required');names.add(o.id);
   demand(['normal-text','large-text','nontext'].includes(o.kind),'Supported observation kind required');
   demand(text(o.purpose),'Observation purpose required');
  }
 }
 return c;
}
export function prepare(htmlPath,contractPath,out){
 privateStateRoot(dirname(resolve(out)));
 const c=validateContract(read(contractPath));const html=readFileSync(htmlPath,'utf8');
 demand(!existsSync(out),'Use a new output directory for every revision');
 // Host must assess self-containment; this conservative screen catches ordinary external resources.
 demand(!/<(?:base|iframe|object|embed)\b/i.test(html),'Embedded/external documents unsupported');
 demand(!/\b(?:srcset|imagesrcset)\s*=/i.test(html),'Responsive linked assets unsupported');
 for(const a of html.matchAll(/\b(?:src|href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)){const v=(a[1]??a[2]??a[3]).trim();demand(v.startsWith('#')||v.startsWith('data:'),'Linked assets unsupported');}
 demand(!/\b(?:src|href)\s*=\s*["'](?!#|data:)[^"']+["']/i.test(html)&&!/@import\b|url\(\s*["']?(?!data:|#)/i.test(html),'Use self-contained HTML without linked resources');
 demand(!/color-interface-binding/i.test(html),'Input already contains review binding');
 const binding=randomUUID();const snapshot='<!doctype html><meta name="color-interface-binding" content="'+binding+'">'+html.replace(/<!doctype[^>]*>/i,'');
 mkdirSync(out,{recursive:true});writeFileSync(join(out,'interface.html'),snapshot,{flag:'wx'});save(join(out,'contract.json'),c);
 const manifest={version:1,binding,htmlHash:digest(snapshot),contractHash:digest(JSON.stringify(c)),url:pathToFileURL(resolve(out,'interface.html')).href};save(join(out,'manifest.json'),manifest);
 save(join(out,'evidence.template.json'),{...manifest,selfContainedVerified:false,selfContainmentEvidence:'',cases:c.cases.map(x=>({id:x.id,state:null,width:null,height:null,binding:null,session:'',inspectionMethod:'',visualInspected:false,stateEvidence:'',reflow:'unverified',assertions:x.assertions.map(assertion=>({assertion,actual:null,pass:false})),observations:x.observations.map(o=>({id:o.id,selector:o.selector,visible:false,supported:false,foreground:null,background:null})),review:{separateAgent:false,contextSeparated:false,agentId:'',observedReading:'',observations:'',scores:{fit:null,harmony:null,hierarchy:null,function:null},reasons:{fit:'',harmony:'',hierarchy:'',function:''}}}))});
 save(join(out,'review-request.json'),{manifest,contract:c,instructions:'Fresh independent reviewer: open this exact self-contained page in an authorized visual browser, execute each declared state and viewport, read binding from live DOM and inspect actual pixels. Record interpretation BEFORE reading author rationale. Report observedReading, observations and per-case fit/harmony/hierarchy/function scores 0..4 with reasons. Missing vision or cases means unverified. Do not accept inaccessible states. This packet does not execute browser tools.'});
 return {status:'unverified',manifest,scope:'Self-contained HTML, host-mediated actual-interface review. Dynamic/network apps require another adapter.'};
}
export function assess(out,e){
 const m=read(join(out,'manifest.json')),c=validateContract(read(join(out,'contract.json')));
 demand(digest(readFileSync(join(out,'interface.html')) )===m.htmlHash&&digest(JSON.stringify(c))===m.contractHash,'Snapshot or contract changed; prepare a fresh revision');
 demand(e?.binding===m.binding&&e.htmlHash===m.htmlHash&&e.contractHash===m.contractHash&&e.url===m.url,'Evidence does not match frozen artifact');
 demand(Array.isArray(e.cases),'Case evidence required');
 const expected=c.cases.map(x=>x.id);demand(e.cases.length===expected.length&&new Set(e.cases.map(x=>x.id)).size===expected.length&&e.cases.every(x=>expected.includes(x.id)),'Exact case coverage required');
 const failures=[],unknown=[];
 if(e.selfContainedVerified!==true||!text(e.selfContainmentEvidence))unknown.push('Host self-containment review missing; resource screen is not dependency closure');
 for(const x of c.cases){
  const r=e.cases.find(y=>y.id===x.id);
  if(r.width!==x.width||r.height!==x.height||r.state!==x.state)unknown.push(x.id+': viewport/state mismatch');
  if(r.binding!==m.binding||!text(r.session)||!text(r.inspectionMethod)||r.visualInspected!==true||!text(r.stateEvidence))unknown.push(x.id+': missing live visual/state evidence');
  if(!Array.isArray(r.assertions)||r.assertions.length!==x.assertions.length||r.assertions.some((a,i)=>JSON.stringify(a.assertion)!==JSON.stringify(x.assertions[i])||a.pass!==true||typeof a.actual!=='string'||a.actual!==x.assertions[i].expected))unknown.push(x.id+': live state assertions unverified');
  if(r.reflow==='fail')failures.push(x.id+': horizontal overflow');else if(r.reflow!=='pass')unknown.push(x.id+': reflow unverified');
  demand(Array.isArray(r.observations)&&r.observations.length===x.observations.length&&new Set(r.observations.map(o=>o.id)).size===x.observations.length&&r.observations.every(o=>x.observations.some(v=>v.id===o.id)),'Exact observation coverage required');
  for(const o of x.observations){const a=r.observations.find(v=>v.id===o.id);const label=x.id+'/'+o.id;
   if(a.selector!==o.selector||a.visible!==true||a.supported!==true){unknown.push(label+': unsupported or invisible');continue}
   if(o.kind==='nontext'&&a.nonColorCue!==true)unknown.push(label+': non-color cue unverified');
   let minimum=o.kind==='normal-text'?4.5:3;
   if(o.kind==='large-text'&&!(a.fontSize>=24||(a.fontSize>=18.6667&&a.fontWeight>=700))){unknown.push(label+': large text eligibility unverified');continue}
   try{if(contrast(a.foreground,a.background)<minimum)failures.push(label+': contrast below '+minimum)}catch{unknown.push(label+': unsupported colors')}
  }
  const v=r.review;
  if(!v||v.separateAgent!==true||v.contextSeparated!==true||!text(v.agentId)||v.agentId===c.leadId||!text(v.observedReading)||!text(v.observations))unknown.push(x.id+': independent contextual review missing');
  for(const key of ['fit','harmony','hierarchy','function']){const s=v?.scores?.[key];if(!Number.isInteger(s)||s<0||s>4||!text(v?.reasons?.[key]))unknown.push(x.id+': '+key+' unverified');else if(s<3)failures.push(x.id+': '+key+' below acceptance floor')}
 }
 return {status:failures.length?'fail':unknown.length?'unverified':'pass',failures,unverified:unknown,scope:'Declared cases and observations only. Host attestations are not authenticated; no full accessibility, human comprehension, physical-color or universal taste certification.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{const [cmd,a,b,c]=process.argv.slice(2);let r;if(cmd==='prepare')r=prepare(resolve(a),resolve(b),resolve(c));else if(cmd==='assess')r=assess(resolve(a),read(resolve(b)));else throw Error('Usage: interface-review.mjs prepare page.html contract.json NEW_RUN | assess RUN evidence.json');console.log(JSON.stringify(r,null,2));process.exitCode=r.status==='fail'?1:r.status==='unverified'?3:0;}catch(e){console.error(e.message);process.exitCode=2}}
