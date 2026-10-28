import {createContext, useContext, useEffect, useState} from 'react'
import {products, projects, booths, categories} from '../data/catalog'

// Local, multi-vendor demo data. It is not authentication, access control or a backend.
const KEY='voxbazaar-global-marketplace-demo-v1'
const OLD_KEY='voxbazaar-dashboard-r2-usd-v1'
const initialInventory=products.map((p,i)=>({...p,stock:p.stock??(8+i%15),status:'Published',updated:'Demo catalog'}))
const initialProjects=projects.map(p=>({...p,status:'Published',updated:'Demo catalog'}))
const initialVendors=booths.map((b,i)=>({id:b.id,name:b.name,owner:'Demo maker',category:b.tag,location:b.location,status:i===9?'Pending':i===10?'Changes requested':'Approved',submitted:'October 2026'}))
const initialReports=[
 {id:'RPT-1041',item:'Tenmoku Glazed Tea Bowl',type:'Product',reason:'Product authenticity',status:'Pending',severity:'High',date:'21 Oct 2026'},
 {id:'RPT-1042',item:'A project showcase',type:'Project',reason:'Image ownership',status:'Pending',severity:'Normal',date:'20 Oct 2026'}
]
const initialNotifications=[
 {id:'n1',title:'Demo booth profile ready',detail:'Your local profile can be edited in Vendor Studio.',kind:'Studio',time:'Today',unread:true},
 {id:'n2',title:'Product video support',detail:'Upload a short MP4, WebM or Ogg video from the product editor.',kind:'Products',time:'Yesterday',unread:true}
]
const initialBoothProfiles=Object.fromEntries(booths.map(b=>[b.id,{name:b.name,location:b.location,category:b.tag,description:b.description,image:b.image}]))
function seed(){return {
 activeVendorId:'anyam-studio',customBooths:[],inventory:initialInventory.map(p=>({...p})),studioProjects:initialProjects.map(p=>({...p})),
 catalogProducts:initialInventory.map(p=>({...p})),catalogProjects:initialProjects.map(p=>({...p})),
 vendors:initialVendors.map(v=>({...v})),categories:categories.map(c=>c.name),reports:initialReports.map(r=>({...r})),notifications:initialNotifications.map(n=>({...n})),
 activity:[{id:'a1',title:'Global demo catalog ready',actor:'Demo system',date:'28 Oct 2026'}],
 settings:{boothPublic:true,contactEnabled:true,emailUpdates:true,moderationNotices:true},wishlist:[],
 boothProfiles:initialBoothProfiles,booth:{...initialBoothProfiles['anyam-studio']}
}}
function mergeById(original,older,defaultVendor){
 const map=new Map(original.map(p=>[p.id,p]));
 if(Array.isArray(older))for(const item of older){if(!item?.id)continue;map.set(item.id,{...(map.get(item.id)||{}),...item,vendorId:item.vendorId||defaultVendor||map.get(item.id)?.vendorId})}
 return [...map.values()]
}
function read(){
 const base=seed()
 try{
  const raw=localStorage.getItem(KEY)||localStorage.getItem(OLD_KEY)
  const saved=JSON.parse(raw||'null')
  if(!saved||!Array.isArray(saved.inventory))return base
  const inventory=mergeById(base.inventory,saved.inventory,'anyam-studio')
  const studioProjects=mergeById(base.studioProjects,saved.studioProjects).map(p=>({...p,boothId:p.boothId||'anyam-studio'}))
  const priorBooth=saved.booth?{'anyam-studio':{...base.boothProfiles['anyam-studio'],...saved.booth}}:{}
  return {...base,...saved,inventory,studioProjects,
   vendors:mergeById(base.vendors,saved.vendors),
   catalogProducts:inventory,catalogProjects:studioProjects,
   boothProfiles:{...base.boothProfiles,...priorBooth,...saved.boothProfiles},
   activeVendorId:[...booths,...(saved.customBooths||[])].some(b=>b.id===saved.activeVendorId)?saved.activeVendorId:'anyam-studio'}
 }catch{return base}
}
const Context=createContext(null)
export function DemoProvider({children}){
 const [data,setData]=useState(read)
 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(data))}catch{}},[data])
 const update=(key,value)=>setData(old=>({...old,[key]:typeof value==='function'?value(old[key]):value}))
 const log=(title,actor='Demo user')=>setData(old=>({...old,activity:[{id:Date.now()+'',title,actor,date:new Date().toLocaleDateString('en-GB')},...old.activity].slice(0,50)}))
 const reset=()=>setData(seed())
 const activeVendorId=data.activeVendorId||'anyam-studio'
 const allBooths=[...booths,...(data.customBooths||[])]
 const activeBooth=allBooths.find(b=>b.id===activeVendorId)||booths[0]
 const boothProfile={...activeBooth,...data.boothProfiles?.[activeVendorId]}
 const setActiveVendor=id=>{if(allBooths.some(b=>b.id===id))update('activeVendorId',id)}
 const publishedProducts=data.inventory.filter(p=>p.status==='Published'&&(!(data.customBooths||[]).some(b=>b.id===p.vendorId)||data.vendors.some(v=>v.id===p.vendorId&&v.status==='Approved')))
 const publishedProjects=data.studioProjects.filter(p=>p.status==='Published'&&(!(data.customBooths||[]).some(b=>b.id===p.boothId)||data.vendors.some(v=>v.id===p.boothId&&v.status==='Approved')))
 return <Context.Provider value={{data,update,log,reset,activeVendorId,activeBooth,allBooths,boothProfile,setActiveVendor,publishedProducts,publishedProjects}}>{children}</Context.Provider>
}
export function useDemo(){const x=useContext(Context);if(!x)throw Error('DemoProvider missing');return x}
export function downloadCSV(name,rows){
 const columns=[...new Set(rows.flatMap(row=>Object.keys(row).filter(k=>typeof row[k]!=='object')))]
 const csv=[columns.join(','),...rows.map(r=>columns.map(k=>'"'+String(r[k]??'').replaceAll('"','""')+'"').join(','))].join('\r\n')
 const file=new Blob(['\ufeff',csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(file);const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)
}
