import {useState} from 'react'
import {Activity,ArrowDownToLine,ArrowRight,ArrowUpRight,BarChart3,Check,ClipboardList,Edit3,Eye,FolderKanban,ImagePlus,Package,Plus,Settings2,ShieldCheck,Store,Trash2} from 'lucide-react'
import {deleteVideo} from '../commerce/VideoStorage'
import {useCommerce,usdCents} from '../commerce/CommerceStore'
import {ProductVideoField,ProductVideoPlayer,savePreparedVideo} from '../commerce/ProductVideo'
import {VendorOrdersPage} from '../commerce/CommercePages'
import {Media} from '../components/Cards'
import {boothById,categories,usd} from '../data/catalog'
import {DashBadge,DashCard,DashEmpty,DashNotice,DashStat,DashTitle,ConfirmModal} from './DashboardShell'
import {downloadCSV,useDemo} from './DemoStore'
const href=x=>'#'+x
function Photo({src,alt}){return src?<img className="vb-dash-thumbnail" src={src} alt={alt} loading="lazy" onError={e=>e.currentTarget.style.visibility='hidden'}/>:<span className="vb-dash-thumbnail vb-thumb-empty"><ImagePlus size={17}/></span>}
const productFields={title:'',category:'basketry',price:'',stock:10,materials:'',image:'',description:'',status:'Draft'}
const projectFields={title:'',category:'Craft process',description:'',image:'',status:'Draft'}
export function VendorOverview(){
 const {data,activeVendorId,activeBooth,boothProfile}=useDemo()
 const {orders}=useCommerce()
 const own=data.inventory.filter(p=>p.vendorId===activeVendorId),projectList=data.studioProjects.filter(p=>p.boothId===activeVendorId)
 const ownOrders=orders.filter(o=>o.vendorId===activeVendorId)
 return <><DashTitle label="VENDOR STUDIO / OVERVIEW" title={`${activeBooth.name} workspace`} description="Manage products, creative projects, shipping and demo orders for the selected digital booth." actions={<a className="vb-button" href={href('/studio/products/new')}><Plus size={17}/> Add a product</a>}/>
 <DashNotice>Demo vendor switcher is available in the left sidebar. Every maker has separate content and fulfillment settings on this browser; it is not real account sign-in.</DashNotice>
 <div className="vb-dash-stats"><DashStat icon={Package} label="Products" value={own.length} detail={`${own.filter(p=>p.status==='Published').length} published`}/><DashStat icon={FolderKanban} label="Projects" value={projectList.length} detail={`${projectList.filter(p=>p.status==='Published').length} published`}/><DashStat icon={ShieldCheck} label="Awaiting review" value={own.filter(p=>p.status==='In review').length} detail="Demo moderation"/><DashStat icon={ClipboardList} label="Demo orders" value={ownOrders.length} detail="No real transactions"/></div>
 <div className="vb-dash-columns"><DashCard title="Digital booth" extra={<a className="vb-dash-inline-link" href={href('/studio/booth')}>Customize <ArrowRight size={16}/></a>}><div className="vb-dash-booth-preview"><Media src={boothProfile.image||own[0]?.image} alt={`${boothProfile.name} visual preview`}/><div><span className="vb-dash-overline">GLOBAL MAKER STOREFRONT</span><h3>{boothProfile.name}</h3><p>{boothProfile.description}</p><p>{boothProfile.location}</p><div className="vb-dash-card-actions"><a className="vb-outline-button" href={href('/studio/booth')}>Edit booth</a><a className="vb-dash-inline-link" href={href('/booth/'+activeVendorId)}>Public booth <ArrowUpRight size={15}/></a></div></div></div></DashCard>
 <DashCard title="Quick actions"><div className="vb-dash-quick-actions"><a href={href('/studio/products/new')}><Package size={18}/><span><b>Add product</b><small>Pricing, stock and product video</small></span><ArrowRight size={16}/></a><a href={href('/studio/projects/new')}><FolderKanban size={18}/><span><b>Create project</b><small>Showcase the making process</small></span><ArrowRight size={16}/></a><a href={href('/studio/orders')}><ClipboardList size={18}/><span><b>Manage orders</b><small>Simulated fulfillment by vendor</small></span><ArrowRight size={16}/></a><a href={href('/studio/shipping')}><Store size={18}/><span><b>Shipping profile</b><small>Demo shipping options & fees</small></span><ArrowRight size={16}/></a><a href={href('/studio/payments')}><Settings2 size={18}/><span><b>Payment integration</b><small>Future Stripe Connect onboarding</small></span><ArrowRight size={16}/></a></div></DashCard></div>
 <DashCard title="Products from this booth" extra={<a className="vb-dash-inline-link" href={href('/studio/products')}>Manage products <ArrowRight size={15}/></a>}><div className="vb-dash-table-wrap"><table className="vb-dash-table"><thead><tr><th>Product</th><th>Price</th><th>Status</th><th>Edit</th></tr></thead><tbody>{own.slice(0,5).map(p=><tr key={p.id}><td><div className="vb-dash-product-cell"><Photo src={p.image} alt=""/><span>{p.title}</span></div></td><td>{usd(p.price)}</td><td><DashBadge status={p.status}/></td><td><a href={href('/studio/products/edit/'+p.id)}><Edit3 size={17}/></a></td></tr>)}</tbody></table></div></DashCard></>
}
export function VendorProducts(){
 const {data,update,log,activeVendorId,activeBooth}=useDemo()
 const [search,setSearch]=useState(''),[status,setStatus]=useState('All'),[confirm,setConfirm]=useState(null)
 const own=data.inventory.filter(p=>p.vendorId===activeVendorId)
 const visible=own.filter(p=>(status==='All'||p.status===status)&&p.title.toLowerCase().includes(search.toLowerCase()))
 const change=(id,newStatus)=>{update('inventory',arr=>arr.map(p=>p.id===id?{...p,status:newStatus,updated:'Just now'}:p));log(`${activeBooth.name}: product ${id} changed to ${newStatus}`)}
 return <><DashTitle label="VENDOR STUDIO / PRODUCTS" title={`${activeBooth.name} products`} description="Create and manage this maker's product listings, prices, stock, and videos." actions={<a className="vb-button" href={href('/studio/products/new')}><Plus size={17}/> Add product</a>}/>
 <DashNotice>New listings are saved as drafts or submitted for review. An Admin can publish them via the demo content catalog.</DashNotice>
 <DashCard title="Product inventory"><div className="vb-dash-toolbar"><label className="vb-dash-search">Search<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a product"/></label><label className="vb-dash-select">Status <select value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Published</option><option>Draft</option><option>In review</option><option>Changes requested</option><option>Rejected</option></select></label><button className="vb-outline-button" type="button" onClick={()=>downloadCSV('vendor-products-demo.csv',own)}><ArrowDownToLine size={16}/> Export</button></div>
 {visible.length?<div className="vb-dash-table-wrap"><table className="vb-dash-table"><thead><tr><th>Product</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{visible.map(p=><tr key={p.id}><td><div className="vb-dash-product-cell"><Photo src={p.image} alt=""/><span>{p.title}<small>{p.updated||'Demo item'}</small></span></div></td><td>{usd(p.price)}</td><td>{p.stock??'—'}</td><td><DashBadge status={p.status}/></td><td><div className="vb-dash-row-actions"><a href={href('/studio/products/edit/'+p.id)} aria-label={`Edit ${p.title}`}><Edit3 size={17}/></a><button type="button" aria-label={`Submit ${p.title} for review`} title="Submit for review" onClick={()=>change(p.id,'In review')}><Eye size={17}/></button><button type="button" aria-label={`Delete ${p.title}`} onClick={()=>setConfirm(p)}><Trash2 size={17}/></button></div></td></tr>)}</tbody></table></div>:
 <DashEmpty title="No matching products" description="Adjust your search or add a new product." action={<a className="vb-button" href={href('/studio/products/new')}>Add product</a>}/>}</DashCard>
 {confirm&&<ConfirmModal danger title="Remove this demo listing?" detail={`Delete ${confirm.title} from the local demo inventory?`} confirmLabel="Delete product" onClose={()=>setConfirm(null)} onConfirm={()=>{update('inventory',arr=>arr.filter(p=>p.id!==confirm.id));deleteVideo(confirm.id).catch(()=>{});log('Deleted '+confirm.title)}}/>}</>
}
export function VendorProductEditor({id}){
 const {data,update,log,activeVendorId,activeBooth}=useDemo()
 const existing=data.inventory.find(p=>p.id===id&&p.vendorId===activeVendorId)
 const [form,setForm]=useState(()=>existing?{...existing,price:String(existing.price)}:{...productFields})
 const [savedId,setSavedId]=useState(id||null),[saved,setSaved]=useState(false),[videoChange,setVideoChange]=useState({file:null,remove:false}),[videoMessage,setVideoMessage]=useState('')
 const set=(name,value)=>{setSaved(false);setForm(v=>({...v,[name]:value}))}
 const submit=async(e)=>{
  e.preventDefault()
  if(!form.title.trim()||!(Number(form.price)>0))return
  const product={...form,id:existing?.id||savedId||`custom-${Date.now()}`,vendorId:activeVendorId,price:Number(form.price),stock:Math.max(0,Math.floor(Number(form.stock)||0)),updated:'Just now'}
  update('inventory',old=>old.some(p=>p.id===product.id)?old.map(p=>p.id===product.id?product:p):[product,...old])
  setSavedId(product.id);log(`${activeBooth.name}: saved product ${form.title}`)
  try{await savePreparedVideo(product.id,videoChange.file,videoChange.remove);setVideoMessage('')}catch(err){setVideoMessage('Product saved, but video storage failed: '+err.message)}
  setSaved(true)
 }
 if(id&&!existing)return <DashNotice>Product not found in this vendor's demo inventory. Switch to its owner in the sidebar to edit it.</DashNotice>
 return <><DashTitle label="VENDOR STUDIO / PRODUCTS" title={existing?'Edit product':'Add a product'} description={`${activeBooth.name} · Add pricing, stock, product media and descriptive details.`} actions={<a className="vb-outline-button" href={href('/studio/products')}>Back to products</a>}/>
 {saved&&<div className="vb-dash-success" role="status"><Check size={18}/> Saved to this browser. {form.status==='Published'&&<><a href={href('/product/'+savedId)}>Preview published listing</a> · </>} <a href={href('/studio/products')}>View inventory</a></div>}{videoMessage&&<p role="alert">{videoMessage}</p>}
 <div className="vb-dash-editor-grid"><form className="vb-dash-panel vb-dash-form" onSubmit={submit}><h2>Product information</h2><label>Product name <span>*</span><input required maxLength={100} value={form.title} onChange={e=>set('title',e.target.value)} placeholder="e.g. Handcrafted ceramic cup"/></label>
 <div className="vb-dash-form-columns"><label>Category <span>*</span><select required value={form.category} onChange={e=>set('category',e.target.value)}>{categories.map(cat=><option value={cat.slug} key={cat.slug}>{cat.name}</option>)}</select></label><label>Price (USD $) <span>*</span><input required type="number" min="0.01" step="0.01" value={form.price} onChange={e=>set('price',e.target.value)}/></label></div>
 <label>Available stock<input required type="number" min="0" step="1" value={form.stock??0} onChange={e=>set('stock',e.target.value)}/></label>
 <label>Materials<input value={form.materials||''} onChange={e=>set('materials',e.target.value)} placeholder="e.g. Ceramic tile, natural pigments"/></label>
 <label>Description <span>*</span><textarea required rows={5} minLength={15} value={form.description||''} onChange={e=>set('description',e.target.value)} placeholder="Explain the craft, size, materials, process and care."/></label>
 <label>Product photo URL (demo)<input type="url" value={form.image||''} onChange={e=>set('image',e.target.value)} placeholder="https://..."/><small>Illustrative photos use external URLs. Secure image uploads will need backend storage.</small></label>
 <ProductVideoField key={savedId||'new-video'} productId={savedId||'unsaved-product'} onPrepared={(file,remove)=>setVideoChange({file,remove})}/>
 <label>Publishing status<select value={form.status} onChange={e=>set('status',e.target.value)}><option>Draft</option><option>In review</option>{existing?.status==='Published'&&<option>Published</option>}{existing?.status==='Changes requested'&&<option>Changes requested</option>}</select></label>
 <div className="vb-dash-form-actions"><a href={href('/studio/products')} className="vb-outline-button">Cancel</a><button type="submit" className="vb-button"><Check size={17}/> Save product</button></div></form>
 <DashCard title="Listing preview"><div className="vb-dash-preview-card"><div className="vb-dash-preview-image"><Photo src={form.image} alt={form.title||'Product preview'}/></div><span className="vb-dash-overline">{activeBooth.name}</span><h3>{form.title||'Your handmade product'}</h3><p>{form.description||'Describe your craft.'}</p><strong>{Number(form.price)>0?usd(Number(form.price)):'Price not set'}</strong><DashBadge status={form.status}/><div className="vb-dash-preview-cta"><Store size={17}/> Visit Booth</div></div>
 <DashNotice>Videos are saved only in IndexedDB on this device. Public sharing, moderation and real account ownership will require backend services.</DashNotice>{savedId&&<ProductVideoPlayer productId={savedId}/>}</DashCard></div></>
}
export function VendorProjects(){
 const {data,update,log,activeVendorId,activeBooth}=useDemo(),[search,setSearch]=useState(''),[confirm,setConfirm]=useState(null)
 const own=data.studioProjects.filter(p=>p.boothId===activeVendorId&&p.title.toLowerCase().includes(search.toLowerCase()))
 return <><DashTitle label="VENDOR STUDIO / PROJECTS" title={`${activeBooth.name} projects`} description="Share the process and story behind each craft. Projects are not for sale." actions={<a href={href('/studio/projects/new')} className="vb-button"><Plus size={17}/> Create project</a>}/>
 <DashCard title="Project showcases"><div className="vb-dash-toolbar"><label className="vb-dash-search">Search<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a project"/></label></div>
 {own.length?<div className="vb-dash-table-wrap"><table className="vb-dash-table"><thead><tr><th>Project</th><th>Theme</th><th>Status</th><th>Actions</th></tr></thead><tbody>{own.map(p=><tr key={p.id}><td><div className="vb-dash-product-cell"><Photo src={p.image} alt=""/>{p.title}</div></td><td>{p.category}</td><td><DashBadge status={p.status}/></td><td><div className="vb-dash-row-actions"><a href={href('/studio/projects/edit/'+p.id)}><Edit3 size={17}/></a><button aria-label={'Delete '+p.title} onClick={()=>setConfirm(p)}><Trash2 size={17}/></button></div></td></tr>)}</tbody></table></div>:
 <DashEmpty title="No projects yet" description="Create the first project showcase for this maker." action={<a className="vb-button" href={href('/studio/projects/new')}>Create project</a>}/>}</DashCard>
 {confirm&&<ConfirmModal danger title="Remove this project?" detail={`Remove ${confirm.title} from this browser?`} confirmLabel="Remove" onClose={()=>setConfirm(null)} onConfirm={()=>{update('studioProjects',arr=>arr.filter(p=>p.id!==confirm.id));log('Removed project '+confirm.title)}}/>}</>
}
export function VendorProjectEditor({id}){
 const {data,update,log,activeVendorId,activeBooth}=useDemo()
 const existing=data.studioProjects.find(p=>p.id===id&&p.boothId===activeVendorId)
 const [form,setForm]=useState(existing?{...existing}:{...projectFields}),[saved,setSaved]=useState(false),[savedId,setSavedId]=useState(id)
 const set=(key,value)=>{setSaved(false);setForm(s=>({...s,[key]:value}))}
 const submit=e=>{e.preventDefault();const entity={...form,id:existing?.id||savedId||`project-${Date.now()}`,boothId:activeVendorId,author:activeBooth.name,updated:'Just now'};update('studioProjects',arr=>arr.some(p=>p.id===entity.id)?arr.map(p=>p.id===entity.id?entity:p):[entity,...arr]);setSavedId(entity.id);log(`${activeBooth.name}: project ${entity.title} saved`);setSaved(true)}
 if(id&&!existing)return <DashNotice>Project not found for this vendor. Switch the demo vendor to edit its showcase.</DashNotice>
 return <><DashTitle label="VENDOR STUDIO / PROJECTS" title={existing?'Edit project':'Create project'} description="Explain the creative process without adding a price or checkout." actions={<a href={href('/studio/projects')} className="vb-outline-button">Back to projects</a>}/>
 {saved&&<div className="vb-dash-success" role="status"><Check size={17}/> Saved locally. {form.status==='Published'?<a href={href('/project/'+savedId)}>Preview published project</a>:<a href={href('/admin/catalog')}>Review in Admin Studio</a>}</div>}
 <div className="vb-dash-editor-grid"><form onSubmit={submit} className="vb-dash-panel vb-dash-form"><h2>Project story</h2><label>Project title <span>*</span><input required maxLength={120} value={form.title} onChange={e=>set('title',e.target.value)}/></label><label>Theme<input value={form.category} onChange={e=>set('category',e.target.value)}/></label><label>Story <span>*</span><textarea required minLength={15} rows={9} value={form.description} onChange={e=>set('description',e.target.value)}/></label><label>Cover image URL<input type="url" value={form.image||''} onChange={e=>set('image',e.target.value)}/></label><label>Status<select value={form.status} onChange={e=>set('status',e.target.value)}><option>Draft</option><option>In review</option>{existing?.status==='Published'&&<option>Published</option>}</select></label><div className="vb-dash-form-actions"><button type="submit" className="vb-button">Save project</button></div></form><DashCard title="Showcase preview"><div className="vb-dash-preview-card"><Photo src={form.image} alt=""/><span className="vb-dash-overline">SHOWCASE · {activeBooth.name}</span><h3>{form.title||'Untitled project'}</h3><p>{form.description||'Your creative story appears here.'}</p><DashBadge status={form.status}/></div><DashNotice>Projects are creative stories, not purchasable listings.</DashNotice></DashCard></div></>
}
export function VendorBooth(){
 const {data,update,log,activeVendorId,activeBooth,boothProfile}=useDemo()
 const [form,setForm]=useState(()=>({...boothProfile})),[saved,setSaved]=useState(false)
 const set=(k,v)=>{setSaved(false);setForm(s=>({...s,[k]:v}))}
 const save=e=>{e.preventDefault();update('boothProfiles',s=>({...s,[activeVendorId]:{...form}}));log(`${activeBooth.name}: booth updated`);setSaved(true)}
 return <><DashTitle label="VENDOR STUDIO / BOOTH" title="Digital booth appearance" description={`Customize ${activeBooth.name}'s online storefront.`} actions={<a className="vb-outline-button" href={href('/booth/'+activeVendorId)}><Eye size={17}/> View public booth</a>}/>
 {saved&&<div className="vb-dash-success" role="status"><Check size={17}/> Booth updated in this browser.</div>}
 <div className="vb-dash-editor-grid"><form className="vb-dash-panel vb-dash-form" onSubmit={save}><h2>Storefront details</h2><label>Booth name <span>*</span><input required value={form.name} onChange={e=>set('name',e.target.value)}/></label><label>Craft category <span>*</span><input required value={form.category||''} onChange={e=>set('category',e.target.value)}/></label><label>City / country<input value={form.location||''} onChange={e=>set('location',e.target.value)}/></label><label>Cover image URL<input type="url" value={form.image||''} onChange={e=>set('image',e.target.value)}/></label><label>Maker story<textarea required rows={6} value={form.description||''} onChange={e=>set('description',e.target.value)}/></label><button className="vb-button" type="submit">Save booth</button></form>
 <DashCard title="Live local preview"><div className="vb-dash-preview-card"><div className="vb-dash-preview-image"><Photo src={form.image} alt="Booth cover"/></div><h3>{form.name}</h3><span className="vb-dash-overline">{form.category} · {form.location}</span><p>{form.description}</p><DashBadge status="Published"/></div><DashNotice>Demo only. These changes affect the public preview on this browser, not the live server.</DashNotice></DashCard></div></>
}
export function VendorAnalytics(){
 const {data,activeVendorId,activeBooth}=useDemo(),{orders}=useCommerce()
 const own=data.inventory.filter(p=>p.vendorId===activeVendorId),myOrders=orders.filter(o=>o.vendorId===activeVendorId)
 return <><DashTitle label="VENDOR STUDIO / ANALYTICS" title="Studio analytics" description={`Illustrative performance dashboard for ${activeBooth.name}.`} actions={<button className="vb-outline-button" onClick={()=>downloadCSV('voxbazaar-demo-orders.csv',myOrders)}><ArrowDownToLine size={17}/> Export demo orders</button>}/>
 <DashNotice>These are local, simulated records. No actual sales, customer tracking, visitor analytics or payment settlements are collected.</DashNotice>
 <div className="vb-dash-stats"><DashStat label="Products" value={own.length} icon={Package}/><DashStat label="Project showcases" value={data.studioProjects.filter(p=>p.boothId===activeVendorId).length} icon={FolderKanban}/><DashStat label="Demo checkouts" value={myOrders.length} icon={Activity}/><DashStat label="Real revenue" value={usd(0)} detail="Payments not enabled" icon={BarChart3}/></div>
 <DashCard title="Commerce walkthrough overview"><p><b>{myOrders.length}</b> simulated order(s) for this vendor in this browser.</p><p>Total simulated order values (not revenue): <b>{usdCents(myOrders.reduce((sum,o)=>sum+o.totalCents,0))}</b>.</p><DashNotice>Real analytics, commission fees, balances and payouts will require secured backend services.</DashNotice></DashCard></>
}
export function VendorOrders(){return <VendorOrdersPage/>}
export function VendorSettings(){
 const {data,update,log,reset,activeBooth}=useDemo()
 const [confirm,setConfirm]=useState(false)
 const change=(key,value)=>{update('settings',s=>({...s,[key]:value}));log(`Changed ${key} demo setting`)}
 return <><DashTitle label="VENDOR STUDIO / SETTINGS" title="Studio settings" description={`${activeBooth.name} · General demo preferences.`}/><DashCard title="Preview settings"><div className="vb-commerce-requirements"><label><input type="checkbox" checked={Boolean(data.settings.emailUpdates)} onChange={e=>change('emailUpdates',e.target.checked)}/> Email notification preference (demo)</label><p>Production permissions, security and identity require a backend. Switching vendors here is for demonstrations only.</p></div><button className="vb-outline-button" onClick={()=>setConfirm(true)}>Reset global demo workspace</button></DashCard>
 {confirm&&<ConfirmModal danger title="Reset demo inventory and vendor selection?" detail="Restores default products, projects and booth profiles in this browser. Commerce orders have a separate reset." confirmLabel="Reset workspace" onClose={()=>setConfirm(false)} onConfirm={reset}/>}</>
}
