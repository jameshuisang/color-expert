import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,cpSync,readFileSync,rmSync,readdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const source=fileURLToPath(new URL('../../skills/color-expert/',import.meta.url));
function isolated(t){const dir=mkdtempSync(join(tmpdir(),'color-install-'));t.after(()=>rmSync(dir,{recursive:true,force:true}));const skill=join(dir,'installed');cpSync(source,skill,{recursive:true});mkdirSync(join(dir,'work'));return {dir,skill,cwd:join(dir,'work')}}
test('installed skill alone resolves all routes and verifies its own manifest from another cwd',t=>{
 const {skill,cwd}=isolated(t);
 for(const script of ['verify-distribution','smoke-check']){const r=spawnSync(process.execPath,[join(skill,'tools',script+'.mjs')],{cwd,encoding:'utf8'});assert.equal(r.status,0,r.stdout+r.stderr)}
 assert.ok(!readdirSync(skill).includes('verification'));assert.ok(!readdirSync(skill).includes('tests'));
});
test('isolated install starts a workflow with bundled knowledge and external private state',t=>{
 const {dir,skill,cwd}=isolated(t),state=join(dir,'private');mkdirSync(state,{mode:0o700});
 const r=spawnSync(process.execPath,[join(skill,'tools/workflow.mjs'),'start',join(skill,'templates/workflow-brief.json'),'--state-dir',state],{cwd,encoding:'utf8'});
 assert.equal(r.status,0,r.stdout+r.stderr);const output=JSON.parse(r.stdout);assert.equal(output.stage,'awaiting-draft');
 const sources=JSON.parse(readFileSync(join(state,'runs',output.id,'sources.json'),'utf8'));assert.ok(sources.length>0);assert.ok(sources.every(x=>x.path.startsWith('knowledge/')));
 assert.ok(!readdirSync(skill).includes('runs'));
});
