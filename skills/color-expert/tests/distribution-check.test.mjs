import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {verifyDistribution} from '../scripts/verify-distribution.mjs';
function fixture(fn){const p=mkdtempSync(join(tmpdir(),'color-distribution-test-'));try{writeFileSync(join(p,'hello.txt'),'safe');writeFileSync(join(p,'distribution-manifest.json'),JSON.stringify({files:[{path:'hello.txt',sha256:createHash('sha256').update('safe').digest('hex')}]}));fn(p)}finally{rmSync(p,{recursive:true,force:true})}}
test('distribution verifier accepts consistent exact inventory',()=>fixture(p=>assert.equal(verifyDistribution(p).status,'pass')));
test('distribution verifier rejects changed or extra files',()=>fixture(p=>{writeFileSync(join(p,'hello.txt'),'changed');assert.throws(()=>verifyDistribution(p),/Changed/);writeFileSync(join(p,'extra.txt'),'extra');assert.throws(()=>verifyDistribution(p),/inventory/)}));
test('distribution verifier rejects OS metadata and symlinks',()=>fixture(p=>{writeFileSync(join(p,'.DS_Store'),'metadata');assert.throws(()=>verifyDistribution(p),/metadata/);rmSync(join(p,'.DS_Store'));symlinkSync(join(p,'hello.txt'),join(p,'link'));assert.throws(()=>verifyDistribution(p),/Symlink/)}));

test('distribution verifier rejects env files even when declared',()=>fixture(p=>{writeFileSync(join(p,'.env.local'),'placeholder');assert.throws(()=>verifyDistribution(p),/credential/)}));
