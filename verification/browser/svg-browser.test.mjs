// Optional real-browser regression. DOM mocks cannot establish CSS paint precedence.
import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
const chrome=process.env.COLOR_EXPERT_CHROME??['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','/usr/bin/chromium','/usr/bin/google-chrome'].find(existsSync);
test('real browser: CSS overrides SVG group fill; collector rejects SVG but accepts HTML',{skip:!chrome&&'Chrome/Chromium unavailable; real-browser paint not tested'},()=>{
 const dir=mkdtempSync(join(tmpdir(),'color-svg-browser-'));
 try{
  const helper=readFileSync(new URL('../../skills/color-expert/tools/interface-browser-collector.js',import.meta.url),'utf8');
  const html=`<!doctype html><style>body{background:#19232f;color:white}text{fill:#202832}.nav{fill:#abb5c2}</style>
<svg width="300" height="100"><g class="nav"><text id="svg-label" x="10" y="30">Navigation</text></g></svg><p id="html-label">Navigation</p><pre id="result"></pre>
<script>const inspect=(${helper});const observations=['svg-label','html-label'].map(id=>({id,selector:'#'+id,kind:'text'}));const data=inspect({id:'paint',state:'default',assertions:[],observations});data.svgFill=getComputedStyle(document.getElementById('svg-label')).fill;data.svgColor=getComputedStyle(document.getElementById('svg-label')).color;document.getElementById('result').textContent=JSON.stringify(data);</script>`;
  const file=join(dir,'fixture.html');writeFileSync(file,html);
  const run=spawnSync(chrome,['--headless','--disable-gpu','--disable-background-networking','--no-first-run',`--user-data-dir=${join(dir,'profile')}`,'--dump-dom',pathToFileURL(file).href],{encoding:'utf8',timeout:20000,maxBuffer:2e6});
  assert.equal(run.status,0,run.error?.message??run.stderr);
  const encoded=run.stdout.match(/<pre id="result">([^<]+)<\/pre>/)?.[1];assert.ok(encoded,'browser did not produce observations');
  const r=JSON.parse(encoded.replaceAll('&quot;','"').replaceAll('&amp;','&'));
  assert.equal(r.svgFill,'rgb(32, 40, 50)');assert.equal(r.svgColor,'rgb(255, 255, 255)');
  assert.equal(r.observations[0].supported,false);assert.match(r.observations[0].reason,/SVG paint unsupported/);
  assert.equal(r.observations[1].supported,true);assert.equal(r.observations[1].foreground,'#ffffff');assert.equal(r.observations[1].background,'#19232f');
 }finally{rmSync(dir,{recursive:true,force:true})}
});
