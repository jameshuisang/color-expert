import {openSync,fstatSync,readSync,closeSync,constants} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {rgb,contrast} from './contrast.mjs';
const exact=(o,keys)=>o!==null&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).length===keys.length&&keys.every(k=>Object.hasOwn(o,k));
const validId=id=>typeof id==='string'&&id.length<=160&&id.trim().length>0&&!/[\u0000-\u001f\u007f]/u.test(id)&&id===id.trim();
const limits='Caller-observed functional-text IDs and resolved opaque sRGB colors only. No automatic DOM/SVG extraction, pixel inspection, compositing, gradient sampling or proof the caller inventoried every rendered text/background. Passing is not whole-interface accessibility certification.';
/**
 * Audit separately declared rendered text IDs against measured color coverage.
 * {functionalTextIds: string[], inventory: [{id,foreground,backgrounds,minimum}], noFunctionalText: boolean}
 * The host must inventory actual rendered functional text independently of palette-token pairs.
 */
export function auditTextCoverage(data){
 if(!exact(data,['functionalTextIds','inventory','noFunctionalText'])||!Array.isArray(data.functionalTextIds)||!Array.isArray(data.inventory)||typeof data.noFunctionalText!=='boolean')throw new Error('Expected functionalTextIds, inventory and boolean noFunctionalText only');
 if(data.functionalTextIds.length>512||data.inventory.length>512)throw new Error('At most 512 functional IDs and inventory entries');
 if(![...data.functionalTextIds].every(validId))throw new Error('Functional text IDs must be nonblank trimmed strings, <=160 characters, without controls');
 const gaps=[];
 const expected=new Set();
 for(const id of data.functionalTextIds){if(expected.has(id))gaps.push({type:'duplicate-functional-id',id});expected.add(id);}
 if(data.noFunctionalText&&(data.functionalTextIds.length||data.inventory.length))gaps.push({type:'contradictory-no-functional-text'});
 if(!data.noFunctionalText&&!data.functionalTextIds.length)gaps.push({type:'undeclared-functional-text-inventory'});
 const seen=new Set();
 const results=Array.from(data.inventory,item=>{
  if(!exact(item,['id','foreground','backgrounds','minimum'])||!validId(item.id))throw new Error('Each inventory entry requires only id, foreground, backgrounds, minimum with a valid ID');
  rgb(item.foreground);
  if(!Array.isArray(item.backgrounds)||item.backgrounds.length>64)throw new Error('backgrounds must be an array of at most 64 opaque sRGB hex colors');
  if(typeof item.minimum!=='number'||!Number.isFinite(item.minimum)||item.minimum<1||item.minimum>21)throw new Error('minimum must be finite and between 1 and 21');
  if(seen.has(item.id))gaps.push({type:'duplicate-inventory-id',id:item.id});seen.add(item.id);
  if(!expected.has(item.id))gaps.push({type:'undeclared-inventory-id',id:item.id});
  if(!item.backgrounds.length)gaps.push({type:'missing-backgrounds',id:item.id});
  const backgrounds=Array.from(item.backgrounds,background=>{
   rgb(background);const ratio=contrast(item.foreground,background);
   return {background,ratio,minimum:item.minimum,pass:ratio>=item.minimum};
  });
  return {id:item.id,foreground:item.foreground,backgrounds,pass:backgrounds.length>0&&backgrounds.every(b=>b.pass)};
 });
 for(const id of expected)if(!seen.has(id))gaps.push({type:'missing-inventory-id',id});
 const coverageComplete=gaps.length===0;
 const contrastFailures=results.flatMap(r=>r.backgrounds.filter(b=>!b.pass).map(b=>({id:r.id,foreground:r.foreground,...b})));
 return {method:'Opaque sRGB relative-luminance text contrast with declared rendered-inventory coverage',limits,noFunctionalText:data.noFunctionalText,coverageComplete,coverageGaps:gaps,results,contrastFailures,overallPass:coverageComplete&&results.every(r=>r.pass)};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{
  if(process.argv.length!==3)throw new Error('Usage: node tools/text-coverage.mjs inventory.json');
  // Inspect and read the same descriptor; do not trust a path stat or size alone.
  // O_NONBLOCK avoids blocking on a FIFO before fstat can reject it.
  let fd;
  let text;
  try{
   fd=openSync(process.argv[2],constants.O_RDONLY|(constants.O_NONBLOCK??0));
   const info=fstatSync(fd);
   if(!info.isFile())throw new Error('Inventory must be a regular file');
   const limit=1048576;
   if(info.size>limit)throw new Error('Inventory file exceeds 1 MiB');
   const buffer=Buffer.alloc(limit+1);
   let total=0;
   while(total<buffer.length){
    const n=readSync(fd,buffer,total,buffer.length-total,null);
    if(n===0)break;
    total+=n;
   }
   if(total>limit)throw new Error('Inventory file exceeds 1 MiB');
   text=buffer.toString('utf8',0,total);
  }finally{if(fd!==undefined)closeSync(fd);}
  const report=auditTextCoverage(JSON.parse(text));
  console.log(JSON.stringify(report,null,2));process.exitCode=report.overallPass?0:1;
 }catch(e){console.error(e.message);process.exitCode=2;}
}
