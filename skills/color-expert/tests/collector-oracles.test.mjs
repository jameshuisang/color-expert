import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../scripts/interface-browser-collector.js',import.meta.url),'utf8');
function inspect(assertions,{missing=false,duplicate=false}={}){
 const el={textContent:'Actual error',hidden:false,getAttribute:name=>name==='aria-invalid'?'true':null};
 const document={querySelectorAll:()=>missing?[]:duplicate?[el,el]:[el],querySelector:()=>({content:'test-binding'}),activeElement:null,documentElement:{scrollWidth:375}};
 return vm.runInNewContext(source,{document,innerWidth:375,innerHeight:800})({id:'case',state:'error',assertions,observations:[]}).assertions;
}
const a=(type,expected)=>({selector:'#target',type,expected,...type==='attribute'?{name:'aria-invalid'}:{}});
test('collector reports observed mismatches, never expected values as observations',()=>{
 const r=inspect([a('text','Expected success'),a('attribute','false'),a('hidden','true'),a('focus','true')]);
 assert.deepEqual(Array.from(r,x=>x.actual),['Actual error','true','false','false']);assert.ok(r.every(x=>x.pass===false));
});
test('collector matching values are exact not unconditional rejection',()=>{
 const r=inspect([a('text','Actual error'),a('attribute','true'),a('hidden','false'),a('focus','false')]);assert.ok(r.every(x=>x.pass===true));
});
test('collector missing or ambiguous state targets cannot pass',()=>{
 for(const options of [{missing:true},{duplicate:true}]){const r=inspect([a('focus','false')],options);assert.equal(r[0].actual,null);assert.equal(r[0].pass,false)}
});
