import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import vm from 'node:vm';
import {prepare,assess,validateContract} from '../scripts/interface-review.mjs';
const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8');
const contract=JSON.parse(read('examples/interface-contract.json'));
function fixture(fn){const t=mkdtempSync(join(tmpdir(),'color-review-test-'));try{const c=join(t,'contract.json'),h=join(t,'input.html'),out=join(t,'run');writeFileSync(c,JSON.stringify(contract));writeFileSync(h,'<html><body style="background:white;color:black">Example</body></html>');const {manifest}=prepare(h,c,out);const evidence={...manifest,selfContainedVerified:true,selfContainmentEvidence:'Synthetic fixture',cases:contract.cases.map(x=>({...x,binding:manifest.binding,session:'synthetic-test',inspectionMethod:'synthetic fixture, NOT real vision',visualInspected:true,stateEvidence:'Synthetic unit test',reflow:'pass',assertions:x.assertions.map(a=>({assertion:a,actual:a.expected,pass:true})),observations:x.observations.map(o=>({...o,visible:true,supported:true,foreground:'#000000',background:'#ffffff',fontSize:30,fontWeight:700})),review:{separateAgent:true,contextSeparated:true,agentId:'synthetic-reviewer',observedReading:'Synthetic test',observations:'Synthetic test',scores:{fit:3,harmony:3,hierarchy:3,function:3},reasons:{fit:'Synthetic',harmony:'Synthetic',hierarchy:'Synthetic',function:'Synthetic'}}}))};fn({out,evidence,h,c});}finally{rmSync(t,{recursive:true,force:true})}}
test('complete synthetic contract passes scoped gate, not actual vision',()=>fixture(({out,evidence})=>assert.equal(assess(out,evidence).status,'pass')));
test('low contrast fails even with accepting review',()=>fixture(({out,evidence})=>{evidence.cases[0].observations[0].foreground='#ffffff';assert.equal(assess(out,evidence).status,'fail')}));
test('missing duplicated or extra cases rejected',()=>fixture(({out,evidence})=>{for(const cases of [evidence.cases.slice(1),[evidence.cases[0],evidence.cases[0]],[...evidence.cases,evidence.cases[0]]])assert.throws(()=>assess(out,{...evidence,cases}),/coverage/)}));
test('missing observation rejected',()=>fixture(({out,evidence})=>{evidence.cases[0].observations.pop();assert.throws(()=>assess(out,evidence),/observation coverage/)}));
test('stale document and evidence rejected',()=>fixture(({out,evidence})=>{assert.throws(()=>assess(out,{...evidence,binding:'old'}),/match/);writeFileSync(join(out,'interface.html'),'changed');assert.throws(()=>assess(out,evidence),/changed/)}));
test('unknown paint cannot pass',()=>fixture(({out,evidence})=>{evidence.cases[0].observations[0].supported=false;assert.equal(assess(out,evidence).status,'unverified')}));
test('wrong viewport and failed state cannot pass',()=>fixture(({out,evidence})=>{evidence.cases[0].width=111;evidence.cases[1].assertions[0].pass=false;assert.equal(assess(out,evidence).status,'unverified')}));
test('missing actual pixels and self-review cannot pass',()=>fixture(({out,evidence})=>{evidence.cases[0].visualInspected=false;evidence.cases[1].review.agentId=contract.leadId;assert.equal(assess(out,evidence).status,'unverified')}));
test('visual rejection cannot be averaged away',()=>fixture(({out,evidence})=>{evidence.cases[0].review.scores.harmony=2;assert.equal(assess(out,evidence).status,'fail')}));
test('large text requires size evidence',()=>fixture(({out,evidence})=>{evidence.cases[0].observations[0].fontSize=12;assert.equal(assess(out,evidence).status,'unverified')}));
test('external ordinary assets and absent assertions rejected',()=>fixture(({out,h,c})=>{writeFileSync(h,'<script src="remote.js"></script>');assert.throws(()=>prepare(h,c,out+'2'),/assets|self-contained/);assert.throws(()=>validateContract({...contract,cases:[{...contract.cases[0],assertions:[]}]}),/assertions/)}));
function collect(overrides={},kind='normal-text'){
 const style={color:'rgb(0, 0, 0)',backgroundColor:'rgb(255, 255, 255)',backgroundImage:'none',opacity:'1',filter:'none',mixBlendMode:'normal',backdropFilter:'none',visibility:'visible',fontSize:'16px',fontWeight:'400',textShadow:'none',webkitTextStrokeWidth:'0px',...overrides};
 const el={children:[],textContent:'Label',parentElement:null,hidden:false,getBoundingClientRect:()=>({width:50,height:20,top:0,left:0,bottom:20,right:50})};
 const doc={querySelectorAll:()=>[el],querySelector:()=>({content:'binding'}),documentElement:{scrollWidth:375},activeElement:el};
 const fn=vm.runInNewContext(read('scripts/interface-browser-collector.js'),{document:doc,innerWidth:375,innerHeight:800,getComputedStyle:(e,p)=>p?{content:'none'}:style});
 return fn({id:'case',state:'default',observations:[{id:'text',selector:'#text',kind}],assertions:[{selector:'#text',type:'focus',expected:'true'}]});
}
test('collector supports opaque leaf text with actual assertions',()=>{const r=collect();assert.equal(r.observations[0].supported,true);assert.equal(r.assertions[0].pass,true)});
test('collector rejects alpha, gradients, blend, opacity and filters',()=>{for(const x of [{color:'rgba(0, 0, 0, 0.5)'},{backgroundColor:'rgba(255, 255, 255, 0.8)'},{backgroundImage:'linear-gradient(red,blue)'},{opacity:'0.5'},{mixBlendMode:'multiply'},{filter:'blur(2px)'},{backdropFilter:'blur(2px)'}])assert.equal(collect(x).observations[0].supported,false)});
test('collector does not fabricate nontext boundary or cue measurements',()=>assert.equal(collect({},'nontext').observations[0].supported,false));

test('contradictory observed state fails closed despite pass flag',()=>fixture(({out,evidence})=>{evidence.cases[0].assertions[0].actual='false';assert.equal(assess(out,evidence).status,'unverified')}));
test('missing dependency-closure attestation stays unverified',()=>fixture(({out,evidence})=>{delete evidence.selfContainedVerified;assert.equal(assess(out,evidence).status,'unverified')}));
test('unquoted resource and srcset rejected',()=>fixture(({out,h,c})=>{for(const html of ['<script src=remote.js></script>','<img srcset="a.png 1x, b.png 2x">']){writeFileSync(h,html);assert.throws(()=>prepare(h,c,out+'-extra'),/assets/);}}));

test('generated evidence scaffold cannot manufacture a pass',()=>fixture(({out})=>{const e=JSON.parse(readFileSync(join(out,'evidence.template.json'),'utf8'));assert.equal(assess(out,e).status,'unverified');assert.equal(e.cases[0].visualInspected,false);assert.equal(e.cases[0].width,null);assert.equal(e.cases[0].review.separateAgent,false)}));
