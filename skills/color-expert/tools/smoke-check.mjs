// Installed-package sanity check; not a substitute for repository regression tests.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {ROOT,retrieve} from './workflow.mjs';
import {contrast} from './contrast.mjs';
assert.equal(contrast('#000000','#ffffff'),21);
const index=JSON.parse(readFileSync(resolve(ROOT,'knowledge/index.json'),'utf8'));
for(const route of Object.keys(index.routes))assert.ok(retrieve(ROOT,route).length,route);
console.log(JSON.stringify({status:'pass',scope:'Installed routes resolve and black/white contrast anchor matches. Not full regression, visual review or creative efficacy.'}));
