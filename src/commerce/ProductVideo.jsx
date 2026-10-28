import {useEffect,useState} from 'react'
import {Film,Upload,Trash2} from 'lucide-react'
import {deleteVideo,isValidVideo,readVideo,saveVideo,MAX_VIDEO_BYTES} from './VideoStorage'

export function useSavedProductVideo(id){
 const [src,setSrc]=useState(''),[error,setError]=useState('')
 useEffect(()=>{let live=true,url='';if(!id)return;readVideo(id).then(file=>{if(file&&live){url=URL.createObjectURL(file);setSrc(url)}}).catch(()=>{if(live)setError('Stored video could not be loaded on this device.')});return()=>{live=false;if(url)URL.revokeObjectURL(url);setSrc('')}},[id])
 return {src,error}
}
export function ProductVideoPlayer({productId}){const {src,error}=useSavedProductVideo(productId);if(!src&&!error)return null;return <div className="vb-video-public"><div className="vb-video-label"><Film size={18}/> Product video</div>{src?<video controls playsInline preload="metadata" src={src} aria-label="Product video"/>:<p>{error}</p>}<small>Video stored locally on this device for prototype demonstration.</small></div>}
export function ProductVideoField({productId,onPrepared}){
 const [file,setFile]=useState(null),[preview,setPreview]=useState(''),[existing,setExisting]=useState(false),[message,setMessage]=useState(''),[remove,setRemove]=useState(false)
 useEffect(()=>{let active=true;readVideo(productId).then(v=>{if(active)setExisting(Boolean(v))}).catch(()=>{});return()=>{active=false}},[productId])
 useEffect(()=>{if(!file)return;const u=URL.createObjectURL(file);setPreview(u);return()=>{URL.revokeObjectURL(u);setPreview('')}},[file])
 const choose=e=>{const v=e.target.files?.[0];if(!v)return;if(!isValidVideo(v)){setMessage('Please choose an MP4, WebM or Ogg video under 50 MB.');setFile(null);e.target.value='';return}setFile(v);setRemove(false);setMessage('Video ready. Save the product to store it in this browser.');onPrepared?.(v,false)}
 const removeClick=()=>{setFile(null);setRemove(true);setPreview('');setMessage('Video will be removed when you save the product.');onPrepared?.(null,true)}
 return <div className="vb-video-field"><span className="vb-video-head"><Film size={18}/> Product video (optional)</span><label className="vb-video-upload"><Upload size={20}/><span>Choose product video (MP4, WebM or Ogg)</span><input type="file" accept="video/mp4,video/webm,video/ogg" onChange={choose}/></label><small>Maximum 50 MB. Files stay only on this device in the prototype — no public upload or server storage.</small>{(file||existing&&!remove)&&<button className="vb-outline-button" type="button" onClick={removeClick}><Trash2 size={15}/> Remove video</button>}{preview&&<video controls playsInline preload="metadata" src={preview}/>} {!preview&&existing&&!remove&&<p>Saved video available for this listing on this browser. View it from Product Details.</p>}{message&&<p role="status">{message}</p>}</div>
}
export async function savePreparedVideo(productId,file,remove){if(remove){await deleteVideo(productId);return}if(file){if(!isValidVideo(file))throw new Error(`Video must be less than ${MAX_VIDEO_BYTES/1024/1024} MB.`);await saveVideo(productId,file)}}
