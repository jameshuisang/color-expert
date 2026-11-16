// Bounded fault-injection experiment. Mutates temporary COPIES only; no production edits.
import {mkdtempSync,mkdirSync,cpSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const repo=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const root=join(repo,'skills/color-expert');
const mutations=[
 ['ignore-edit-locks','edit-constraints.mjs','if(locked.locked.includes(w.property)&&related(w.region,locked.id))','if(false)'],
 ['ignore-parent-locks','edit-constraints.mjs','const related=(a,b)=>inside(a,b)||inside(b,a);','const related=(a,b)=>a===b;'],
 ['ignore-incomplete-edit-mapping','edit-constraints.mjs','if(plan.mappingComplete!==true)','if(false)'],
 ['allow-svg-color-as-paint','interface-browser-collector.js',"if(n.namespaceURI==='http://www.w3.org/2000/svg')",'if(false)'],
 ['ignore-ledger-checkpoint','learning.mjs','checkCheckpoint(events,ledger);return ledger;','return ledger;'],
 ['ignore-consumed-memory-revocation','workflow.mjs','if(s.memoryBindings.some(m=>current.get(m.id)!==m.revision))','if(false)'],
 ['allow-double-output-transform','media-preflight.mjs',"if(b.input?.outputTransformBaked===true&&b.operations?.applySameOutputTransform===true)",'if(false)'],
 ['allow-double-print-management','media-preflight.mjs',"if(b.print?.conversionOwner==='both')",'if(false)'],
 ['swap-red-blue-weights','contrast.mjs','c[0]*0.2126+c[1]*0.7152+c[2]*0.0722','c[0]*0.0722+c[1]*0.7152+c[2]*0.2126'],
 ['fabricate-state-observations','interface-browser-collector.js','return {assertion,actual,pass:!!el&&actual===assertion.expected}','return {assertion,actual:assertion.expected,pass:true}'],
 ['omit-nonlinear-decoding','contrast.mjs','((v+0.055)/1.055)**2.4','v'],
 ['reject-equal-threshold','contrast.mjs','ratio>=p.minimum','ratio>p.minimum'],
 ['reuse-first-irradiance-channel','light-transport-diagnostics.mjs','irradiance[i] / Math.PI','irradiance[0] / Math.PI'],
 ['clip-linear-hdr','light-transport-diagnostics.mjs','v*2**stops','Math.min(1,v*2**stops)']
];
const dir=mkdtempSync(join(tmpdir(),'color-mutation-'));
try{
 const copied=join(dir,'skills/color-expert');mkdirSync(join(dir,'skills'),{recursive:true});cpSync(root,copied,{recursive:true});mkdirSync(join(dir,'verification/tests'),{recursive:true});
 const selected=['independent-oracles','collector-oracles','media-preflight','learning-safety','edit-constraints'];
 for(const name of selected)cpSync(join(repo,'verification/tests',name+'.test.mjs'),join(dir,'verification/tests',name+'.test.mjs'));
 const run=()=>spawnSync(process.execPath,['--test','--test-reporter=tap',...selected.map(n=>'verification/tests/'+n+'.test.mjs')],{cwd:dir,encoding:'utf8',timeout:30000});
 const baseline=run();if(baseline.status!==0)throw Error('Unmodified oracle suite failed: '+baseline.stdout+baseline.stderr);
 const results=[];
 for(const [name,file,from,to] of mutations){const path=join(dir,'skills/color-expert/tools',file),original=readFileSync(path,'utf8');if(original.split(from).length!==2)throw Error('Mutation target drift: '+name);writeFileSync(path,original.replace(from,to));
  const syntax=spawnSync(process.execPath,['--check',path],{encoding:'utf8'});if(syntax.status!==0)throw Error('Invalid mutation syntax: '+name);
  const r=run();const detected=r.status===1&&r.stdout.includes('ERR_ASSERTION')&&!/ERR_MODULE_NOT_FOUND|SyntaxError/.test(r.stdout+r.stderr);results.push({name,detected});writeFileSync(path,original);if(!detected)throw Error('Mutant survived or failed for unrelated reason: '+name);
 }
 console.log(JSON.stringify({status:'pass',baseline:'36 oracle/contract/safety tests passed',mutations:results,scope:'Fourteen deliberately seeded faults only, not a comprehensive mutation score or proof against circular tests.'},null,2));
}finally{rmSync(dir,{recursive:true,force:true})}
