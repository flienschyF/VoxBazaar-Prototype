// Videos stay in this browser's IndexedDB. No video is uploaded to the Internet.
const DB='voxbazaar-video-demo-v1',STORE='videos'
function connect(){return new Promise((resolve,reject)=>{if(!('indexedDB' in window))return reject(new Error('This browser does not support local video storage.'));const req=indexedDB.open(DB,1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE))req.result.createObjectStore(STORE)};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('Unable to open video storage.'))})}
function operation(key,mode,action){return connect().then(db=>new Promise((resolve,reject)=>{const tx=db.transaction(STORE,mode),store=tx.objectStore(STORE),req=action(store,key);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);tx.oncomplete=()=>db.close();tx.onabort=()=>{db.close();reject(tx.error||new Error('Video storage failed.'))}}))}
export const readVideo=id=>operation(id,'readonly',(s,k)=>s.get(k))
export const saveVideo=(id,file)=>operation(id,'readwrite',(s,k)=>s.put(file,k))
export const deleteVideo=id=>operation(id,'readwrite',(s,k)=>s.delete(k))
export const MAX_VIDEO_BYTES=50*1024*1024
export const isValidVideo=file=>Boolean(file&&['video/mp4','video/webm','video/ogg'].includes(file.type)&&file.size<=MAX_VIDEO_BYTES&&file.size>0)
