// Declaration audit only. Does not inspect files, transform pixels or certify appearance.
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const known=x=>typeof x==='string'&&x.trim().length>0&&!['unknown','unspecified'].includes(x.trim().toLowerCase());
export function auditMediaBrief(b){
 if(!b||!['photo','video','print','material'].includes(b.medium))throw Error('Supported medium required');
 const missing=[],contradictions=[];
 const need=(value,name)=>{if(!known(value))missing.push(name)};
 need(b.intent,'intent');need(b.viewingConditions,'viewingConditions');
 if(['photo','video'].includes(b.medium)){
  for(const k of ['encoding','primaries','whitePoint','range'])need(b.input?.[k],'input.'+k);
  if(!['raw','log','rendered'].includes(b.input?.kind))missing.push('input.kind');
  if(typeof b.input?.outputTransformBaked!=='boolean')missing.push('input.outputTransformBaked');
  if(['raw','log'].includes(b.input?.kind))need(b.input?.transformId,'input.transformId');
  for(const k of ['encoding','primaries','whitePoint','target'])need(b.output?.[k],'output.'+k);
  if(typeof b.operations?.applySameOutputTransform!=='boolean')missing.push('operations.applySameOutputTransform');
  if(b.input?.outputTransformBaked===true&&b.operations?.applySameOutputTransform===true)contradictions.push('duplicate-output-transform');
  if(b.claims?.restoreClippedCaptureData===true)contradictions.push('unsupported-capture-recovery-claim');
  if(typeof b.operations?.useLUT!=='boolean')missing.push('operations.useLUT');
  if(b.operations?.useLUT===true){need(b.operations.lutInputDomain,'operations.lutInputDomain');need(b.operations.lutOutputDomain,'operations.lutOutputDomain')}
  if(b.medium==='video'&&b.evidence?.playbackReviewed!==true)missing.push('evidence.playbackReviewed');
 }else if(b.medium==='print'){
  for(const k of ['profile','process','substrate','intent'])need(b.print?.[k],'print.'+k);
  if(!['application','printer','both'].includes(b.print?.conversionOwner))missing.push('print.conversionOwner');
  if(b.print?.conversionOwner==='both')contradictions.push('double-print-color-management');
 }else{
  for(const k of ['surfaceModel','illumination','viewGeometry'])need(b.material?.[k],'material.'+k);
  if(b.claims?.crossIlluminantMatch===true&&b.evidence?.spectralOrPhysicalProof!==true)missing.push('evidence.spectralOrPhysicalProof');
 }
 return {status:contradictions.length?'contradiction':missing.length?'incomplete':'ready-for-host-review',missing,contradictions,scope:'Declaration consistency only; metadata and claimed evidence are not authenticated. No image, playback, physical proof or aesthetic quality has been validated.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{const r=auditMediaBrief(JSON.parse(readFileSync(process.argv[2],'utf8')));console.log(JSON.stringify(r,null,2));process.exitCode=r.status==='contradiction'?1:r.status==='incomplete'?3:0}catch(e){console.error(e.message);process.exitCode=2}}
