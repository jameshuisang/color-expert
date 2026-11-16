// Expectations frozen from independent audit cases before checker implementation.
import test from 'node:test';
import assert from 'node:assert/strict';
import {auditEditConstraints} from '../../skills/color-expert/tools/edit-constraints.mjs';
const base=()=>({mappingComplete:true,regions:[{id:'scene',parent:null,locked:[]},{id:'ink',parent:'scene',locked:['stroke','fill','geometry']},{id:'frame',parent:'scene',locked:['geometry']}],overlaps:[],writes:[{region:'frame',property:'fill',value:'#17454b'}]});
test('frozen control: geometry protection permits mapped interior fills, not fidelity certification',()=>{const r=auditEditConstraints(base());assert.equal(r.status,'consistent-declaration');assert.equal(r.preservesPixelsVerified,false)});
test('frozen conflict: recoloring mortar on locked contour is forbidden',()=>{const p=base();p.writes=[{region:'ink',property:'stroke',value:'#eee8d9'}];assert.equal(auditEditConstraints(p).status,'contradiction')});
test('frozen conflict: parent edit reaches locked descendant',()=>{const p=base();p.writes=[{region:'scene',property:'fill',value:'#eee8d9'}];assert.equal(auditEditConstraints(p).status,'contradiction')});
test('frozen unknown: unmapped alias or unspecified mortar target cannot pass',()=>{for(const region of ['mortar','unknown']){const p=base();p.writes[0].region=region;assert.equal(auditEditConstraints(p).status,'incomplete')}});
test('frozen conflict: inconsistent assignments to one region property',()=>{const p=base();p.writes.push({region:'frame',property:'fill',value:'#ffffff'});assert.equal(auditEditConstraints(p).status,'contradiction')});
test('frozen unknown: omitted overlap map or incomplete mapping cannot pass',()=>{const p=base();delete p.overlaps;assert.equal(auditEditConstraints(p).status,'incomplete');const q=base();q.mappingComplete=false;assert.equal(auditEditConstraints(q).status,'incomplete')});
test('independent boundary: declared overlap can occlude locked ink even with a different target',()=>{const p=base();p.overlaps=[['frame','ink']];assert.equal(auditEditConstraints(p).status,'contradiction')});
test('hierarchical protection flows down as well as up',()=>{const p=base();p.regions[0].locked=['fill'];assert.equal(auditEditConstraints(p).status,'contradiction')});
test('malformed or cyclic declarations are rejected, not silently repaired',()=>{for(const mutate of [p=>p.regions.push(p.regions[0]),p=>p.regions[0].parent='frame',p=>p.regions[1].locked=['everything'],p=>p.writes[0].property='all',p=>p.writes=[]]){const p=base();mutate(p);assert.throws(()=>auditEditConstraints(p))}});

// Run the actual entrypoint, not an imported function: a broken guard can silently exit 0.
import {mkdtempSync,symlinkSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
test('CLI through symlink executes validation and fails closed on invalid inputs',()=>{
 const dir=mkdtempSync(join(tmpdir(),'color-edit-cli-'));
 try {
  const alias=join(dir,'check.mjs');
  symlinkSync(fileURLToPath(new URL('../../skills/color-expert/tools/edit-constraints.mjs',import.meta.url)),alias);
  for(const [name,contents] of [['missing.json',null],['malformed.json','{'],['invalid.json','{}']]){
   const input=join(dir,name);if(contents!==null)writeFileSync(input,contents);
   const r=spawnSync(process.execPath,[alias,input],{encoding:'utf8'});
   assert.equal(r.status,2);assert.equal(r.stdout,'');assert.ok(r.stderr.trim());
  }
  const input=join(dir,'plan.json');
  for(const [plan,code,status] of [[base(),0,'consistent-declaration'],[{...base(),writes:[{region:'ink',property:'fill',value:'#eee8d9'}]},1,'contradiction'],[{...base(),mappingComplete:false},3,'incomplete']]){
   writeFileSync(input,JSON.stringify(plan));const r=spawnSync(process.execPath,[alias,input],{encoding:'utf8'});
   assert.equal(r.status,code);assert.equal(JSON.parse(r.stdout).status,status);assert.equal(r.stderr,'');
  }
 } finally {rmSync(dir,{recursive:true,force:true});}
});
