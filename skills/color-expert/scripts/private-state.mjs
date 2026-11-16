import {realpathSync,lstatSync} from 'node:fs';
import {resolve,dirname,isAbsolute,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const ASSETS=realpathSync(resolve(dirname(fileURLToPath(import.meta.url)),'..'));
export function privateStateRoot(root){
 if(typeof root!=='string'||!isAbsolute(root))throw Error('Explicit absolute private state directory required');
 if(lstatSync(root).isSymbolicLink())throw Error('Private state root must not be a symlink');
 const base=realpathSync(root),st=lstatSync(base);
 if(!st.isDirectory())throw Error('Private state root must be a directory');
 if(base===ASSETS||base.startsWith(ASSETS+sep)||ASSETS.startsWith(base+sep))throw Error('Private state must be outside and not contain the installed skill');
 if(process.platform!=='win32'&&(st.mode&0o077)!==0)throw Error('Private state directory must be owner-only (mode 0700); choose or secure it explicitly');
 return base;
}
