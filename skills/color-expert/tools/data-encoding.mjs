import {rgb,luminance} from './contrast.mjs';
const exact=(o,keys)=>o!==null&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).length===keys.length&&keys.every(k=>Object.hasOwn(o,k));
const text=s=>typeof s==='string'&&s.length<=160&&s===s.trim()&&!/[\u0000-\u001f\u007f]/u.test(s);
const finite=n=>typeof n==='number'&&Number.isFinite(n);
const normalized=s=>s.normalize('NFKC').toLowerCase();
const color=s=>rgb(s).join(',');
const placeholder=s=>!s||/^(?:\?|unknown|unspecified|mixed|various|n\/?a|none|unit|units)$/i.test(s);
/**
 * Declared five-bin continuous quantitative legend only. Exact schema:
 * {unit:{symbol,name}, domain:{lower,upper}, luminanceDirection:'increasing'|'decreasing',
 *  bins:[{lower,upper,lowerInclusive,upperInclusive,label,color}] (exactly five),
 *  missingData:{value:null,label,symbol,color}}.
 * Missing data may be null to report absent coverage. A finite numeric value is
 * accepted for diagnostic reporting, but fails semantics: null is the only sentinel.
 * Returned numericLabels are non-color interval labels the host must display.
 */
export function auditDataEncoding(data){
 if(!exact(data,['unit','domain','luminanceDirection','bins','missingData']))throw new Error('Expected unit, domain, luminanceDirection, bins and missingData only');
 if(!exact(data.domain,['lower','upper'])||!finite(data.domain.lower)||!finite(data.domain.upper)||data.domain.lower>=data.domain.upper)throw new Error('domain requires finite lower < upper');
 if(!['increasing','decreasing'].includes(data.luminanceDirection))throw new Error('Declare increasing or decreasing luminance');
 if(!Array.isArray(data.bins)||data.bins.length!==5)throw new Error('Exactly five bins required');
 const coverageFailures=[],semanticFailures=[],luminanceFailures=[];
 let unit='';
 if(data.unit===null)coverageFailures.push({type:'missing-unit'});
 else{
  if(!exact(data.unit,['symbol','name'])||!text(data.unit.symbol)||!text(data.unit.name))throw new Error('unit must be null or bounded symbol/name strings');
  unit=data.unit.symbol;
  if(placeholder(unit)||placeholder(data.unit.name))semanticFailures.push({type:'ambiguous-unit'});
 }
 const labels=new Set();
 const samples=Array.from(data.bins,(bin,index)=>{
  if(!exact(bin,['lower','upper','lowerInclusive','upperInclusive','label','color'])||!finite(bin.lower)||!finite(bin.upper)||typeof bin.lowerInclusive!=='boolean'||typeof bin.upperInclusive!=='boolean'||!text(bin.label))throw new Error('Invalid bin schema or bounds');
  rgb(bin.color);
  if(bin.lower>=bin.upper)semanticFailures.push({type:'nonpositive-bin-width',index});
  if(!bin.label)coverageFailures.push({type:'missing-bin-label',index});
  const label=normalized(bin.label);
  if(labels.has(label))semanticFailures.push({type:'duplicate-label',index});labels.add(label);
  return {index,luminance:luminance(bin.color),numericLabel:`${bin.lowerInclusive?'[':'('}${bin.lower}, ${bin.upper}${bin.upperInclusive?']':')'}${unit?` ${unit}`:''}`};
 });
 for(let i=1;i<5;i++){
  const previous=data.bins[i-1],current=data.bins[i];
  if(current.lower<=previous.lower)semanticFailures.push({type:'unordered-bins',index:i});
  if(current.lower<previous.upper)semanticFailures.push({type:'overlapping-bins',index:i});
  else if(current.lower>previous.upper)coverageFailures.push({type:'bin-gap',index:i});
  else if(previous.upperInclusive&&current.lowerInclusive)semanticFailures.push({type:'shared-inclusive-endpoint',index:i});
  else if(!previous.upperInclusive&&!current.lowerInclusive)coverageFailures.push({type:'excluded-shared-endpoint',index:i});
  const delta=samples[i].luminance-samples[i-1].luminance;
  if(data.luminanceDirection==='increasing'?delta<=0:delta>=0)luminanceFailures.push({type:'non-strict-luminance-order',index:i});
 }
 const first=data.bins[0],last=data.bins[4];
 if(first.lower!==data.domain.lower||last.upper!==data.domain.upper)semanticFailures.push({type:'domain-boundary-mismatch'});
 if(!first.lowerInclusive||!last.upperInclusive)coverageFailures.push({type:'excluded-domain-endpoint'});
 const missing=data.missingData;
 if(missing===null)coverageFailures.push({type:'missing-no-data-encoding'});
 else{
  if(!exact(missing,['value','label','symbol','color'])||!(missing.value===null||finite(missing.value))||!text(missing.label)||!text(missing.symbol))throw new Error('missingData requires value, label, symbol and opaque color');
  const missingColor=color(missing.color);
  if(missing.value!==null)semanticFailures.push({type:'numeric-no-data-sentinel'});
  if(!missing.label||!missing.symbol)coverageFailures.push({type:'missing-no-data-label-or-symbol'});
  if(labels.has(normalized(missing.label)))semanticFailures.push({type:'duplicate-no-data-label'});
  if(/^[+-]?0+(?:\.0+)?$/.test(missing.label)||/^[+-]?0+(?:\.0+)?$/.test(missing.symbol))semanticFailures.push({type:'zero-no-data-label-or-symbol'});
  // Conservative: require no-data color to differ from every quantitative bin,
  // not just whichever bin contains zero. Compare resolved RGB, not hex spelling.
  if(data.bins.some(bin=>color(bin.color)===missingColor))semanticFailures.push({type:'no-data-color-reuses-bin'});
 }
 const coverageComplete=coverageFailures.length===0,semanticsPass=semanticFailures.length===0,luminanceOrderPass=luminanceFailures.length===0;
 return {method:'Declared continuous five-bin legend semantics and sampled opaque sRGB luminance order',limits:'Checks caller declarations only, including unit strings, closed domain and null missing-data convention. Unit meaning and label truth are not inferred. Numeric interval labels are supplied for the host to render; their actual presence and legibility are not verified. No DOM/data extraction, actual map validity, CVD accessibility or perceptual-uniformity guarantee. Exact numeric endpoints are compared without tolerance.',coverageComplete,coverageFailures,semanticsPass,semanticFailures,luminanceOrderPass,luminanceFailures,samples,overallPass:coverageComplete&&semanticsPass&&luminanceOrderPass};
}
