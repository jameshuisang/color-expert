import {readFileSync,readdirSync,lstatSync} from 'node:fs';
import {resolve,relative,dirname,sep} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export function verifyDistribution(base=root){
 const manifest=JSON.parse(readFileSync(resolve(base,'distribution-manifest.json'),'utf8'));
 const ignored=new Set(['node_modules','runs','outputs','.color-learning','.colour-learning','.git']);
 const walk=d=>readdirSync(d,{withFileTypes:true}).flatMap(x=>{const p=resolve(d,x.name);if(/^\.env(?:\.|$)/i.test(x.name)||['inbox','credentials.json','secrets.json','id_rsa','id_ed25519'].includes(x.name))throw Error('Private/credential path forbidden in distributable tree');if(x.name==='.DS_Store'||x.name==='Thumbs.db'||x.name.startsWith('._'))throw Error('OS metadata must not be distributed');if(d===base&&ignored.has(x.name))return [];if(lstatSync(p).isSymbolicLink())throw Error('Symlink not allowed in distributable tree');return x.isDirectory()?walk(p):[relative(base,p).split(sep).join('/')];});
 const actual=walk(base).filter(x=>x!=='distribution-manifest.json').sort();
 const declared=manifest.files.map(x=>x.path).sort();
 if(new Set(declared).size!==declared.length||JSON.stringify(actual)!==JSON.stringify(declared))throw Error('Manifest file inventory differs; review additions/removals before packaging');
 for(const x of manifest.files){if(x.path.startsWith('/')||x.path.split('/').includes('..'))throw Error('Unsafe manifest path');const h=createHash('sha256').update(readFileSync(resolve(base,x.path))).digest('hex');if(h!==x.sha256)throw Error('Changed file: '+x.path);}
 return {status:'pass',files:declared.length+1,scope:'Manifest consistency only, not security, privacy or redistribution clearance. Runtime directories must never enter a release archive.'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{if(Number(process.versions.node.split('.')[0])<20)throw Error('Node 20 or newer required');console.log(JSON.stringify(verifyDistribution(),null,2));}catch(e){console.error(e.message);process.exitCode=1}}
