/* Read-only helper for an authorized browser's page-evaluation facility.
   Paste the function expression, call with one frozen contract case.
   Numeric observations are not pixel inspection or independent review. */
(caseContract) => {
 const hex = value => {
  const m=value.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  return m && m.slice(1).every(v=>+v<=255) ? '#'+m.slice(1).map(v=>(+v).toString(16).padStart(2,'0')).join('') : null;
 };
 const transparent=v=>v==='transparent'||/^rgba\(0,\s*0,\s*0,\s*0\)$/.test(v);
 const observations=caseContract.observations.map(o=>{
  const matches=document.querySelectorAll(o.selector);const el=matches.length===1?matches[0]:null;
  const result={id:o.id,selector:o.selector,visible:false,supported:false};
  if(!el)return {...result,reason:'Missing or nonunique selector'};
  const rect=el.getBoundingClientRect(),s=getComputedStyle(el);
  result.visible=rect.width>0&&rect.height>0&&s.visibility==='visible'&&rect.top>=0&&rect.left>=0&&rect.bottom<=innerHeight&&rect.right<=innerWidth;
  let bg=null;for(let n=el;n;n=n.parentElement){const a=getComputedStyle(n);
   if(a.opacity!=='1'||a.backgroundImage!=='none'||a.filter!=='none'||a.mixBlendMode!=='normal'||a.backdropFilter&&a.backdropFilter!=='none')return {...result,reason:'Compositing unsupported'};
   if(!bg&&!transparent(a.backgroundColor)){bg=hex(a.backgroundColor);if(!bg)return {...result,reason:'Nonopaque background unsupported'}}
  }
  if(o.kind==='nontext')return {...result,reason:'Nontext boundary/adjacency and redundant cue require explicit manual measurement'};
  if(el.children.length||!el.textContent.trim())return {...result,reason:'Use a leaf element with visible text'};
  for(const pseudo of ['::before','::after']){const a=getComputedStyle(el,pseudo);if(a.content!=='none'&&a.content!=='normal')return {...result,reason:'Pseudo-element paint unsupported'}}
  if(s.textShadow!=='none'||s.webkitTextStrokeWidth&&parseFloat(s.webkitTextStrokeWidth)>0)return {...result,reason:'Text effects unsupported'};
  const foreground=hex(s.color);return {...result,foreground,background:bg,fontSize:parseFloat(s.fontSize),fontWeight:parseFloat(s.fontWeight),supported:!!foreground&&!!bg,reason:'Check occlusion, pseudo-elements and actual pixels separately'};
 });
 const assertions=caseContract.assertions.map(assertion=>{const nodes=document.querySelectorAll(assertion.selector),el=nodes.length===1?nodes[0]:null;let actual=null;if(el){if(assertion.type==='text')actual=el.textContent.trim();if(assertion.type==='attribute')actual=el.getAttribute(assertion.name);if(assertion.type==='focus')actual=String(document.activeElement===el);if(assertion.type==='hidden')actual=String(el.hidden)}return {assertion,actual,pass:!!el&&actual===assertion.expected}});
 return {assertions,id:caseContract.id,state:caseContract.state,width:innerWidth,height:innerHeight,binding:document.querySelector('meta[name="color-interface-binding"]')?.content,reflow:document.documentElement.scrollWidth<=innerWidth?'pass':'fail',observations};
}
