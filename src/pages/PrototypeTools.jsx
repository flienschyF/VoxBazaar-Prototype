import { ArrowRight, CircleHelp, LockKeyhole, Mail, Search, Store, UserRound, CheckCircle2, Plus, Trash2, Info } from 'lucide-react'
import { PageIntro } from '../components/Layout'
import { BoothCard, ProductCard, ProjectCard } from '../components/Cards'
import { boothById, booths, products, projects, usd } from '../data/catalog'
import { useState } from 'react'
import {useCommerce} from '../commerce/CommerceStore'
import {categories} from '../data/catalog'
import {useDemo} from '../dashboard/DemoStore'
function makeSafeRead(key,empty){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(empty))}catch{return empty}}
export function SearchPage({params}){
 const {publishedProducts,publishedProjects,data,allBooths}=useDemo()
 const displayBooths=allBooths.filter(b=>!(data.customBooths||[]).some(c=>c.id===b.id)||data.vendors.find(v=>v.id===b.id)?.status==='Approved').map(b=>({...b,...data.boothProfiles?.[b.id]}))
 const [term,setTerm]=useState(params.get('q')||'')
 const q=term.trim().toLowerCase();const matches=(obj)=>JSON.stringify(obj).toLowerCase().includes(q)
 const foundProducts=q?publishedProducts.filter(matches):publishedProducts.slice(0,4), foundBooths=q?displayBooths.filter(matches):displayBooths.slice(0,3), foundProjects=q?publishedProjects.filter(matches):publishedProjects.slice(0,3)
 return <div className="vb-container vb-page"><PageIntro eyebrow="Search / Discover" title="Find something handmade" description="Search products, digital booths and project showcases."/><label className="vb-search-big"><Search size={22}/><span className="vb-sr-only">Search VoxBazaar</span><input autoFocus value={term} onChange={e=>setTerm(e.target.value)} placeholder="Try Morocco, jewelry, sadu or ceramics"/></label><section className="vb-section"><h2>Products ({foundProducts.length})</h2>{foundProducts.length?<div className="vb-product-grid">{foundProducts.slice(0,8).map(p=><ProductCard key={p.id} product={p}/>)}</div>:<p className="vb-empty-inline">No matching products.</p>}</section><section className="vb-section"><h2>Booths ({foundBooths.length})</h2>{foundBooths.length?<div className="vb-booth-grid">{foundBooths.slice(0,3).map(b=><BoothCard key={b.id} booth={b}/>)}</div>:<p className="vb-empty-inline">No matching booths.</p>}</section><section className="vb-section"><h2>Projects ({foundProjects.length})</h2>{foundProjects.length?<div className="vb-project-grid">{foundProjects.slice(0,3).map(p=><ProjectCard key={p.id} project={p}/>)}</div>:<p className="vb-empty-inline">No matching projects.</p>}</section></div>
}
export function SellPage(){
 const {data,update,log,setActiveVendor}=useDemo()
 const {updateShipping}=useCommerce()
 const [stage,setStage]=useState(1),[done,setDone]=useState(false)
 const [details,setDetails]=useState({owner:'',email:'',name:'',category:'ceramics',description:'',city:'',country:''})
 const set=(name,value)=>setDetails(d=>({...d,[name]:value}))
 const next=e=>{
  e.preventDefault()
  if(stage<3){setStage(v=>v+1);return}
  const id='demo-booth-'+Date.now()
  const location=[details.city.trim(),details.country.trim()].filter(Boolean).join(', ')
  const country=details.country.trim()||'Other'
  const booth={id,name:details.name.trim(),location,country,category:details.category,description:details.description.trim(),tag:categories.find(c=>c.slug===details.category)?.short||'Craft',image:'',avatar:''}
  update('customBooths',arr=>[...(arr||[]),booth])
  update('boothProfiles',arr=>({...arr,[id]:{name:booth.name,location,category:booth.tag,description:booth.description,image:''}}))
  update('vendors',arr=>[{id,name:booth.name,owner:details.owner.trim(),category:booth.tag,location,status:'Pending',submitted:new Date().toLocaleDateString('en-GB')},...arr])
  updateShipping({from:location||'Demo workshop'},id)
  update('activeVendorId',id)
  log(`Demo vendor application submitted: ${booth.name}`)
  setDone(true)
 }
 return <div className="vb-container vb-page vb-form-page"><PageIntro eyebrow="FOR MAKERS / DEMO ONBOARDING" title="Open a digital booth" description="Preview a new maker application for VoxBazaar. Each booth has independent products, projects and shipping settings."/>
 {done?<div className="vb-form-panel vb-message"><CheckCircle2 size={40}/><h2>Booth application saved</h2><p>Your fictional booth is now in the Admin verification queue. It will appear in public Browse Booths only after a demo Admin approves it.</p><p>You can switch to your new demo booth in Vendor Studio and add your first product for review.</p><a href="#/studio" className="vb-button">Open your demo Vendor Studio <ArrowRight size={18}/></a><a href="#/admin/vendors" className="vb-outline-button">Open Admin verification demo</a></div>:
 <><div className="vb-progress">{['Maker','Digital booth','Preview'].map((v,i)=><span key={v} className={stage>=i+1?'active':''}>{i+1}. {v}</span>)}</div><form className="vb-form-panel" onSubmit={next}>
 {stage===1&&<><h2>Meet the maker</h2><p>Use fictional information for this local prototype. No real account is created.</p><label>Maker name <span>*</span><input required value={details.owner} onChange={e=>set('owner',e.target.value)} placeholder="Demo Maker"/></label><label>Demo email <span>*</span><input type="email" required autoComplete="off" value={details.email} onChange={e=>set('email',e.target.value)} placeholder="demo@example.com"/></label></>}
 {stage===2&&<><h2>About your digital booth</h2><label>Booth name <span>*</span><input required value={details.name} onChange={e=>set('name',e.target.value)} placeholder="Your studio name"/></label><label>Craft category<select value={details.category} onChange={e=>set('category',e.target.value)}>{categories.map(c=><option value={c.slug} key={c.slug}>{c.name}</option>)}</select></label><label>City <span>*</span><input required value={details.city} onChange={e=>set('city',e.target.value)} placeholder="e.g. Marrakech"/></label><label>Country <span>*</span><input required value={details.country} onChange={e=>set('country',e.target.value)} placeholder="e.g. Morocco"/></label><label>Maker story <span>*</span><textarea required rows={4} minLength={15} value={details.description} onChange={e=>set('description',e.target.value)} placeholder="Describe your handmade work…"/></label></>}
 {stage===3&&<><h2>Review your booth</h2><div className="vb-preview"><span className="vb-shop-tag">{categories.find(c=>c.slug===details.category)?.name}</span><h3>{details.name}</h3><p>{details.description}</p><small>{details.city}, {details.country} · Demo maker: {details.owner}</small></div><p className="vb-form-note"><Info size={18}/> Submitting adds a local application to Admin Studio only; no real verification or public account exists.</p></>}
 <div className="vb-form-actions">{stage>1&&<button type="button" className="vb-outline-button" onClick={()=>setStage(s=>s-1)}>Back</button>}<button className="vb-button" type="submit">{stage===3?'Submit demo booth':'Continue'} <ArrowRight size={18}/></button></div></form></>}
 </div>
}
export function StudioPage(){
 const [draft,setDraft]=useState(()=>makeSafeRead('vb-vendor-draft',null)),[entries,setEntries]=useState(()=>makeSafeRead('vb-studio-products-usd-v1',[])),[title,setTitle]=useState(''),[price,setPrice]=useState('')
 const add=(e)=>{e.preventDefault();const v=Number(price);if(!title.trim()||!Number.isFinite(v)||v<=0)return;const next=[...entries,{title:title.trim(),price:v}];setEntries(next);try{localStorage.setItem('vb-studio-products-usd-v1',JSON.stringify(next))}catch{};setTitle('');setPrice('')}
 const remove=(i)=>{const next=entries.filter((_,j)=>i!==j);setEntries(next);try{localStorage.setItem('vb-studio-products-usd-v1',JSON.stringify(next))}catch{}}
 return <div className="vb-container vb-page"><PageIntro eyebrow="Vendor Studio / Prototype" title={draft?.name||'Your maker workspace'} description="Preview how makers can manage a booth and draft products. Changes are local to your browser and not publicly listed."/><div className="vb-studio-stats"><div><span>Booth</span><strong>{draft?'Draft saved':'Not created yet'}</strong></div><div><span>Draft products</span><strong>{entries.length}</strong></div><div><span>Published publicly</span><strong>0</strong></div></div><div className="vb-studio-layout"><div className="vb-form-panel"><h2>Add a draft product</h2><form onSubmit={add}><label>Product name <span aria-hidden="true">*</span><input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Handwoven basket"/></label><label>Price (USD $) <span aria-hidden="true">*</span><input required type="number" min="0.01" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} placeholder="34.00"/></label><button className="vb-button" type="submit"><Plus size={18}/> Add draft</button></form></div><div className="vb-form-panel"><h2>Your product drafts</h2>{entries.length?entries.map((p,i)=><div className="vb-draft-item" key={i}><span><b>{p.title}</b><small>{usd(p.price)}</small></span><button onClick={()=>remove(i)} aria-label={`Remove ${p.title}`}><Trash2 size={19}/></button></div>):<p>Nothing here yet. Add your first product on the left.</p>}</div></div><p className="vb-studio-footnote">This is a lightweight functional Studio demonstration. Uploads, moderation, authentication, and shared data need a backend in a later phase.</p></div>
}
export function AccountPage(){const [email,setEmail]=useState(''),[sent,setSent]=useState(false)
 return <div className="vb-container vb-page vb-form-page"><PageIntro eyebrow="Member account" title="Good to see you" description="The interactive marketplace preview works without an account."/><div className="vb-form-panel"><h2>Sign in preview</h2>{sent?<div className="vb-form-note"><Mail size={18}/> Demo only: email was not sent. Real authentication is not enabled on GitHub Pages.</div>:<form onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Email address <span aria-hidden="true">*</span><input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.com"/></label><button type="submit" className="vb-button">Continue <ArrowRight size={17}/></button></form>}<div className="vb-form-secondary"><a href="#/">Continue browsing without an account</a><a href="#/sell">Create a maker booth</a></div></div></div>
}
export function InfoPage({which}){
 const mapping={about:['About this prototype','VoxBazaar is a virtual marketplace concept for independent makers. Visitors can explore digital booths, browse product listings and read project showcases. This demo contains fictional examples and includes an optional simulated checkout walkthrough, not real payments or public account registration.'],help:['Help & contact','This interactive prototype demonstrates the VoxBazaar interface. If something does not work, return to the homepage and try again. No support messages or personal information are collected through this page.']}
 const [title,copy]=mapping[which]||mapping.about
 return <div className="vb-container vb-page vb-legal"><PageIntro eyebrow="VoxBazaar" title={title} description={copy}/><a href="#/" className="vb-button">Explore marketplace <ArrowRight size={17}/></a></div>
}
export function DevStateSwitcher({pathname,state}){
 const [open,setOpen]=useState(false)
 if(!['/','/products','/booths','/projects'].includes(pathname))return null
 const states=['default','loading','empty','error','offline','no-permission']
 return <div className="vb-dev-switcher"><button type="button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Preview screen states" className="vb-dev-toggle">UI states {open?'×':'+'}</button>{open&&<div className="vb-dev-panel"><b>Design state preview</b><span>These states are part of the Stitch exports.</span>{states.map(s=><a key={s} className={state===s?'active':''} href={`#${pathname}?state=${s}`} onClick={()=>setOpen(false)}>{s}</a>)}</div>}</div>
}
