import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../../skills/color-expert/tools/interface-browser-collector.js',import.meta.url),'utf8');
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

function paint(namespaceURI,parentElement=null){
 const style={color:'rgb(255, 255, 255)',backgroundColor:'rgb(25, 35, 47)',opacity:'1',backgroundImage:'none',filter:'none',mixBlendMode:'normal',visibility:'visible',textShadow:'none',fontSize:'16px',fontWeight:'400'};
 const el={namespaceURI,parentElement,textContent:'Visible label',children:[],getBoundingClientRect:()=>({width:100,height:20,top:0,left:0,bottom:20,right:100})};
 const document={querySelectorAll:()=>[el],querySelector:()=>({content:'test'}),documentElement:{scrollWidth:375}};
 return vm.runInNewContext(source,{document,innerWidth:375,innerHeight:800,getComputedStyle:(_,pseudo)=>pseudo?{content:'none'}:style})({id:'case',state:'default',assertions:[],observations:[{id:'label',selector:'#label',kind:'text'}]}).observations[0];
}
test('SVG paint and HTML inside SVG cannot pass as HTML CSS color',()=>{
 for(const [ns,parent] of [['http://www.w3.org/2000/svg',null],['http://www.w3.org/1999/xhtml',{namespaceURI:'http://www.w3.org/2000/svg'}]]){
  const r=paint(ns,parent);assert.equal(r.supported,false);assert.match(r.reason,/SVG paint unsupported/);assert.equal(r.foreground,undefined);
 }
});
test('opaque HTML control remains supported after SVG exclusion',()=>{
 const r=paint('http://www.w3.org/1999/xhtml');assert.equal(r.supported,true);assert.equal(r.foreground,'#ffffff');assert.equal(r.background,'#19232f');
});
