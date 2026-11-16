import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {ROOT,retrieve} from '../scripts/workflow.mjs';
const read=p=>readFileSync(resolve(ROOT,p),'utf8');
const files=(dir)=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(resolve(dir,e.name)):[resolve(dir,e.name)]);
test('every candidate retrieval route resolves within its bounded budget',()=>{
 const index=JSON.parse(read('color/index.json'));
 for(const route of Object.keys(index.routes))assert.ok(retrieve(ROOT,route).length,route);
 assert.ok(!index.sources.some(s=>['active-ui-foundation','product-palette-library','ui-color-system'].includes(s.id)));
});
test('candidate metadata is dependency-free and unpublished',()=>{
 const p=JSON.parse(read('package.json'));assert.equal(p.private,true);assert.ok(!p.dependencies);assert.equal(p.license,'MIT');
 const lock=JSON.parse(read('package-lock.json'));assert.equal(Object.keys(lock.packages).length,1);
 assert.match(read('README.md'),/MIT applies to original work/);
});
test('user-facing knowledge contains no known private markers or missing exact path references',()=>{
 for(const f of [...files(resolve(ROOT,'color')),...files(resolve(ROOT,'docs'))]){
  if(f.includes('/licenses/'))continue;
  const s=readFileSync(f,'utf8');assert.ok(!/Sentinel_|libfile_|CalpicoFile_|\/Users\/|\bJames\b/.test(s),f);
  if(f.endsWith('.md'))for(const [,p] of s.matchAll(/`((?:docs|scripts|color|examples|evals)\/[^`\s]+)`/g))assert.ok(existsSync(resolve(ROOT,p)),`${f}: ${p}`);
 }
});

test('color skill and legacy route compatibility',()=>{assert.ok(existsSync(resolve(ROOT,'SKILL.md')));assert.deepEqual(retrieve(ROOT,'colour-decision'),retrieve(ROOT,'color-decision'));});

test('README invocation names the shipped color skill',()=>{assert.match(read('README.md'),/Read `SKILL\.md`/);assert.doesNotMatch(read('README.md'),/colour-expert/);});
