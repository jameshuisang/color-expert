import test from 'node:test';
import assert from 'node:assert/strict';
import {auditTextCoverage} from '../../skills/color-expert/tools/text-coverage.mjs';
const entry=(id='title',foreground='#000',backgrounds=['#fff'])=>({id,foreground,backgrounds,minimum:4.5});
const input=(inventory=[entry()],functionalTextIds=['title'])=>({functionalTextIds,inventory,noFunctionalText:false});
test('text coverage passes complete observed inventory and reports every background',()=>{
 const r=auditTextCoverage(input([entry('title','#000',['#fff','#eee'])]));
 assert.equal(r.overallPass,true);assert.equal(r.coverageComplete,true);assert.equal(r.results[0].backgrounds.length,2);assert.equal(r.results[0].backgrounds[0].ratio,21);
 assert.deepEqual(r.coverageGaps,[]);assert.deepEqual(r.contrastFailures,[]);
});
test('text coverage separates missing/duplicate IDs and backgrounds from contrast failure',()=>{
 for(const d of [input([],['title']),input([entry(),entry()]),input([entry()],['title','title']),input([entry('other')]),input([entry('title','#000',[])])]){
  const r=auditTextCoverage(d);assert.equal(r.overallPass,false);assert.equal(r.coverageComplete,false);assert.ok(r.coverageGaps.length);assert.equal(r.contrastFailures.length,0);
 }
 const bad=auditTextCoverage(input([entry('title','#999',['#fff','#000'])]));
 assert.equal(bad.coverageComplete,true);assert.equal(bad.overallPass,false);assert.equal(bad.contrastFailures.length,1);assert.equal(bad.contrastFailures[0].background,'#fff');
});
test('text coverage only permits empty inventory with explicit no-functional-text declaration',()=>{
 assert.equal(auditTextCoverage({functionalTextIds:[],inventory:[],noFunctionalText:true}).overallPass,true);
 assert.equal(auditTextCoverage(input([],[])).overallPass,false);
 assert.equal(auditTextCoverage({...input(),noFunctionalText:true}).overallPass,false);
});
test('inline SVG footer fixture exposes omission independently of main palette checks',()=>{
 // Caller inspects rendered SVG. This fixture maps visible IDs manually, not via a purported SVG parser.
 const svg='<svg xmlns="http://www.w3.org/2000/svg"><rect width="200" height="100" fill="#fff"/><text id="title" fill="#000">Title</text><text id="footer" fill="#bbb">Terms</text></svg>';
 assert.match(svg,/id="footer"/);
 const observedIds=['title','footer'];
 const omitted=auditTextCoverage(input([entry()],observedIds));
 assert.deepEqual(omitted.coverageGaps,[{type:'missing-inventory-id',id:'footer'}]);
 const measured=auditTextCoverage(input([entry(),entry('footer','#bbb')],observedIds));
 assert.equal(measured.coverageComplete,true);assert.equal(measured.overallPass,false);assert.equal(measured.contrastFailures[0].id,'footer');
});
test('text coverage rejects malformed, unbounded and unsupported input',()=>{
 for(const d of [null,{}, {...input(),extra:true}, {...input(),noFunctionalText:undefined},input([entry()],['']),input([entry()],new Array(513).fill('x')),
 input([entry()],new Array(1)),input([{...entry(),alpha:.5}]),input([{...entry(),backgrounds:undefined}]),input([entry('title','#ffffff00')]),input([entry('title','#000',['transparent'])]),
 input([entry('title','#000',new Array(1))]),input([entry('title','#000',new Array(65).fill('#fff'))]),input([{...entry(),minimum:NaN}]),input([{...entry(),minimum:Infinity}]),input([{...entry(),minimum:22}])])assert.throws(()=>auditTextCoverage(d));
});

test('text coverage CLI exit codes and bounded regular-file input',async()=>{
 const {mkdtempSync,writeFileSync,rmSync,existsSync}=await import('node:fs');
 const {tmpdir}=await import('node:os');
 const {join}=await import('node:path');
 const {fileURLToPath}=await import('node:url');
 const {spawnSync}=await import('node:child_process');
 const dir=mkdtempSync(join(tmpdir(),'text-coverage-'));
 const script=fileURLToPath(new URL('../../skills/color-expert/tools/text-coverage.mjs',import.meta.url));
 const cli=path=>{
  const result=spawnSync(process.execPath,[script,path],{encoding:'utf8',timeout:3000});
  assert.equal(result.error,undefined);return result;
 };
 try{
  const path=join(dir,'inventory.json');
  writeFileSync(path,JSON.stringify(input()));assert.equal(cli(path).status,0);
  writeFileSync(path,JSON.stringify(input([entry('title','#bbb')])));assert.equal(cli(path).status,1);
  writeFileSync(path,JSON.stringify(input([],['title'])));assert.equal(cli(path).status,1);
  writeFileSync(path,'{broken');assert.equal(cli(path).status,2);
  writeFileSync(path,Buffer.alloc(1048577,32));const oversized=cli(path);assert.equal(oversized.status,2);assert.match(oversized.stderr,/exceeds 1 MiB/);
  const directory=cli(dir);assert.equal(directory.status,2);
  if(process.platform!=='win32'&&existsSync('/dev/null')){
   const special=cli('/dev/null');assert.equal(special.status,2);assert.match(special.stderr,/regular file/);
  }
 }finally{rmSync(dir,{recursive:true,force:true});}
});
