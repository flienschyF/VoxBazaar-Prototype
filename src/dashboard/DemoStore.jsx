import {createContext, useContext, useEffect, useState} from 'react'
import {products, projects, booths} from '../data/catalog'

const demoInventory=products.filter(p=>p.vendorId==='anyam-studio').map((p,i)=>({id:p.id,title:p.title,price:p.price,category:p.category,image:p.image,status:i===3?'Draft':i===5?'In review':'Published',updated:'21 Oct 2026'}))
const demoProjects=projects.filter(p=>p.boothId==='anyam-studio').map((p,i)=>({id:p.id,title:p.title,category:p.category,image:p.image,description:p.description,status:i===1?'Draft':'Published',updated:'21 Oct 2026'}))
const initialVendors=[
 {id:'v1',name:'Anyam Studio',owner:'Putri Larasati',category:'Basketry',location:'Yogyakarta',status:'Approved',submitted:'20 Oct 2026'},
 {id:'v2',name:'Tanah & Api Ceramics',owner:'Aditya Putra',category:'Ceramics',location:'Bandung',status:'Pending',submitted:'19 Oct 2026'},
 {id:'v3',name:'Batik Senja',owner:'Ratna Wibowo',category:'Textiles',location:'Solo',status:'Approved',submitted:'17 Oct 2026'},
 {id:'v4',name:'Kayu Rasa Studio',owner:'Bima Setiawan',category:'Woodwork',location:'Jepara',status:'Changes requested',submitted:'16 Oct 2026'},
 {id:'v5',name:'Kusuma Pottery Atelier',owner:'Ayunda Putri',category:'Ceramics',location:'Bali',status:'Approved',submitted:'15 Oct 2026'},
 {id:'v6',name:'Tenun Alami Studio',owner:'Citra Ardi',category:'Textiles',location:'Flores',status:'Approved',submitted:'14 Oct 2026'},
 {id:'v7',name:'Kaca Pagi Studio',owner:'Lina Hartono',category:'Glasswork',location:'Surabaya',status:'Pending',submitted:'21 Oct 2026'},
 {id:'v8',name:'Kulit Bumi Goods',owner:'Rendra Malik',category:'Leather goods',location:'Jakarta',status:'Approved',submitted:'18 Oct 2026'}
]
const initialReports=[
 {id:'RPT-1041',item:'Tenmoku Glazed Tea Bowl',type:'Product',reason:'Product authenticity',status:'Pending',severity:'High',date:'21 Oct 2026'},
 {id:'RPT-1042',item:'Savu River Wild Reed Basketry',type:'Project',reason:'Image ownership',status:'Pending',severity:'Normal',date:'20 Oct 2026'},
 {id:'RPT-1043',item:'Handspun Indigo Ikat Runner',type:'Product',reason:'Listing information',status:'Pending',severity:'Normal',date:'19 Oct 2026'},
 {id:'RPT-1044',item:'Woodcraft Joinery',type:'Project',reason:'Inaccurate category',status:'Resolved',severity:'Normal',date:'17 Oct 2026'}
]
const initialNotifications=[
 {id:'n1',title:'Booth profile ready for review',detail:'Your updated business profile has been saved.',kind:'Studio',time:'Today',unread:true},
 {id:'n2',title:'New product submitted',detail:'Your handmade piece is awaiting moderation.',kind:'Products',time:'Yesterday',unread:true},
 {id:'n3',title:'Project showcase published',detail:'Your project is visible in the demo showcase.',kind:'Projects',time:'Oct 18',unread:false}
]
const demoCatalog=products.map((p,i)=>({...p,status:i%11===0?'In review':'Published',updated:'21 Oct 2026'}))
const demoCatalogProjects=projects.map((p,i)=>({...p,status:i%7===0?'In review':'Published',updated:'21 Oct 2026'}))
const initial = { catalogProducts:demoCatalog,catalogProjects:demoCatalogProjects, categories:['Ceramics','Textiles','Basketry','Woodwork','Natural dyes','Metalwork','Leather goods','Art & prints'], inventory:demoInventory,studioProjects:demoProjects, vendors:initialVendors,reports:initialReports,notifications:initialNotifications,
  activity:[{id:'a1',title:'Example catalog created',date:'21 Oct 2026',actor:'Demo System'}],
  settings:{boothPublic:true,contactEnabled:true,emailUpdates:true,moderationNotices:true},wishlist:[], booth:{name:'Anyam Studio',location:'Yogyakarta, Indonesia',description:'Natural fibres and traditional patterns for modern homes.',category:'Basketry'} }
// Versioned demo storage: old rupiah-valued drafts are kept separately and never interpreted as USD.
const KEY='voxbazaar-dashboard-r2-usd-v1'
function load(){try{let parsed=JSON.parse(localStorage.getItem(KEY)||'null');if(parsed&&Array.isArray(parsed.inventory))return {...initial,...parsed}}catch{}return initial}
const Context=createContext(null)
export function DemoProvider({children}){
 const [data,setData]=useState(load)
 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(data))}catch{}},[data])
 const update=(key,value)=>setData(old=>({...old,[key]: typeof value==='function'?value(old[key]):value}))
 const log=(title,actor='Demo user')=>setData(old=>({...old,activity:[{id:Date.now()+'',title,actor,date:new Date().toLocaleDateString('en-GB')},...old.activity].slice(0,30)}))
 const reset=()=>setData({...initial,inventory:[...demoInventory],studioProjects:[...demoProjects],vendors:[...initialVendors],catalogProducts:[...demoCatalog],catalogProjects:[...demoCatalogProjects],reports:[...initialReports],notifications:[...initialNotifications],activity:[...initial.activity],settings:{...initial.settings},wishlist:[],categories:[...initial.categories],booth:{...initial.booth}})
 return <Context.Provider value={{data,update,log,reset}}>{children}</Context.Provider>
}
export function useDemo(){const x=useContext(Context);if(!x)throw Error('DemoProvider missing');return x}
export const downloadCSV=(name,rows)=>{
 const columns=[...new Set(rows.flatMap(row=>Object.keys(row).filter(k=>typeof row[k]!=='object')))];
 const csv=[columns.join(','),...rows.map(r=>columns.map(k=>'"'+String(r[k]??'').replaceAll('"','""')+'"').join(','))].join('\r\n');
 const file=new Blob(['\ufeff',csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(file);const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)
}
