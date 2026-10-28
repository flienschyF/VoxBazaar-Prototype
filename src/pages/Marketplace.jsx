import {ArrowRight,ArrowUpRight,Search,SlidersHorizontal,Sparkles,Store,WifiOff,AlertCircle,RefreshCw,Shield,CheckCircle2,Globe2} from 'lucide-react'
import {BoothCard,Media,ProductCard,ProjectCard} from '../components/Cards'
import {SectionHeading,PageIntro} from '../components/Layout'
import {booths,categories,countries} from '../data/catalog'
import stitchImages from '../data/stitchImages.json'
import {useMemo,useState} from 'react'
import {useDemo} from '../dashboard/DemoStore'
function EmptyState({kind='results',reset}){return <div className="vb-message"><Search size={34}/><h2>No {kind} found</h2><p>Try a different keyword, craft category or country.</p>{reset&&<button className="vb-button" onClick={reset}>Clear filters</button>}</div>}
export function StatePreview({state,children,kind='products'}){
 const [retry,setRetry]=useState(0)
 if(!state||state==='default'||retry>0)return children
 if(state==='loading')return <div className="vb-skeleton-grid" aria-label="Loading content" aria-live="polite">{Array.from({length:8},(_,i)=><div className="vb-skeleton" key={i}><div/><span/><small/></div>)}</div>
 if(state==='empty')return <EmptyState kind={kind}/>
 const offline=state==='offline',denied=state==='no-permission'
 return <div className="vb-message" role="status">{offline?<WifiOff size={35}/>:denied?<Shield size={35}/>:<AlertCircle size={35}/>}<h2>{offline?'You appear to be offline':denied?'This content is not available':'We could not load the page'}</h2><p>{offline?'Reconnect and try again.':denied?'You may not have access to this view.':'This is a demo error state for review.'}</p><button className="vb-button" onClick={()=>setRetry(v=>v+1)}><RefreshCw size={17}/> Retry</button></div>
}
const featuredIds=['zellij-trivet','palm-leaf-basket','sadu-cushion','copper-coffee-pot','jaipur-scarf','ghana-bead-necklace','oaxaca-clay-vase','andean-woven-pouch']
const boothIds=['dar-zellij','noor-palm','kyoto-clay','oaxaca-barro','accra-beads','anyam-studio']
export function Home({state}){
 const {publishedProducts,publishedProjects,data,allBooths}=useDemo()
 const publicBooths=allBooths.filter(b=>!(data.customBooths||[]).some(c=>c.id===b.id)||data.vendors.find(v=>v.id===b.id)?.status==='Approved').map(b=>({...b,...data.boothProfiles?.[b.id],category:b.category}))
 const featured=featuredIds.map(id=>publishedProducts.find(p=>p.id===id)).filter(Boolean)
 const previewProducts=[...featured,...publishedProducts.filter(p=>!featuredIds.includes(p.id))].slice(0,8)
 const featuredBooths=boothIds.map(id=>publicBooths.find(b=>b.id===id)).filter(Boolean)
 return <>
 <section className="vb-container vb-hero"><div className="vb-hero-copy"><span className="vb-eyebrow">HANDMADE, ACROSS BORDERS</span><h1>Made by hand.<br/><em>Found with care.</em></h1><p>Explore handmade creations, independent digital booths, and craft stories from makers around the world.</p><div className="vb-hero-actions"><a href="#/products" className="vb-button">Explore products <ArrowRight size={18}/></a><a href="#/booths" className="vb-button-quiet">Meet the makers <ArrowUpRight size={18}/></a></div><div className="vb-hero-note"><Globe2 size={16}/> Discover global craft traditions · Interactive prototype</div></div><div className="vb-hero-visual"><Media eager src={stitchImages.desktopHome[0]} alt="Independent maker at work"/><div className="vb-hero-image-caption"><span>STORIES FROM THE WORKSHOP</span><b>Craft comes from people.</b></div></div></section>
 <StatePreview state={state} kind="products"><section className="vb-container vb-section"><SectionHeading eyebrow="Explore by material" title="Find your kind of handmade" body="Ceramics, textiles, metalwork, basketry, jewelry and more." link="/products" linkText="All products"/><div className="vb-categories">{categories.map(cat=><a className="vb-category" href={`#/products?category=${cat.slug}`} key={cat.slug}><Media src={cat.image} alt={cat.name}/><strong>{cat.short}</strong><small>{cat.count}</small></a>)}</div></section>
 <section className="vb-container vb-section"><SectionHeading eyebrow="From makers around the world" title="Discover across cultures" body="Explore illustrated product examples from the Middle East, Africa, Asia, Europe and the Americas." link="/products" linkText="Explore all products"/><div className="vb-product-grid">{previewProducts.map(p=><ProductCard product={p} key={p.id}/>)}</div><p className="vb-global-caption">All maker names and product records are fictional demo content; sample imagery is illustrative, not a verified representation of any specific craftsperson's work.</p></section>
 <section className="vb-container vb-section"><SectionHeading eyebrow="The people behind the craft" title="Digital booths from near and far" body="Every maker has a personal online storefront with products, stories and a shipping profile." link="/booths" linkText="All maker booths"/><div className="vb-booth-grid">{featuredBooths.map(b=><BoothCard booth={b} key={b.id}/>)}</div></section>
 <section className="vb-container vb-section"><SectionHeading eyebrow="Beyond the finished product" title="Projects with a story" body="Learn about craft methods, materials and ideas from makers around the world." link="/projects" linkText="See all projects"/><div className="vb-project-grid">{publishedProjects.filter(p=>['zellij-patterns','sadu-pattern-story','accra-glass'].includes(p.id)).concat(publishedProjects.filter(p=>!['zellij-patterns','sadu-pattern-story','accra-glass'].includes(p.id))).slice(0,3).map(p=><ProjectCard key={p.id} project={p}/>)}</div></section>
 <section className="vb-container vb-maker-banner"><div><span className="vb-eyebrow">For independent makers everywhere</span><h2>Make something? Share it here.</h2><p>Create a digital booth, showcase handmade products and tell the story behind your projects.</p><a href="#/sell" className="vb-button">Open your booth <ArrowRight size={17}/></a></div><div className="vb-maker-icon"><Store size={58} strokeWidth={1.15}/><span>Your online storefront</span></div></section></StatePreview></>
}
const categoryOptions=[{slug:'all',name:'All crafts'},...categories.map(c=>({slug:c.slug,name:c.short}))]
function Filters({selected,setSelected,term,setTerm,kind,country,setCountry}){
 const {allBooths}=useDemo()
 const availableCountries=[...new Set([...countries,...allBooths.map(b=>b.country||'Other')])].sort((a,b)=>a==='All countries'?-1:b==='All countries'?1:a.localeCompare(b))
 return <div className="vb-global-filters"><div className="vb-filter-row"><div className="vb-filter-buttons" aria-label={`Filter ${kind} by craft category`}>{categoryOptions.map(c=><button key={c.slug} onClick={()=>setSelected(c.slug)} aria-pressed={selected===c.slug} className={'vb-chip '+(selected===c.slug?'selected':'')}>{c.name}</button>)}</div></div>
 <div className="vb-global-controls"><label className="vb-inline-search"><Search size={18}/><span className="vb-sr-only">Search {kind}</span><input placeholder={`Search ${kind} or maker…`} value={term} onChange={e=>setTerm(e.target.value)}/></label><label className="vb-global-country"><Globe2 size={18}/><span className="vb-sr-only">Filter by country</span><select value={country} onChange={e=>setCountry(e.target.value)}>{availableCountries.map(c=><option key={c} value={c}>{c}</option>)}</select></label></div></div>
}
export function ExploreProducts({params,state}){
 const {publishedProducts,data,allBooths}=useDemo()
 const [selected,setSelected]=useState(params.get('category')||'all'),[term,setTerm]=useState(params.get('q')||''),[country,setCountry]=useState('All countries'),[sort,setSort]=useState('featured')
 const filtered=useMemo(()=>{
  const result=publishedProducts.filter(p=>{
   const maker=data.boothProfiles?.[p.vendorId]
   const booth=allBooths.find(b=>b.id===p.vendorId)
   return (selected==='all'||p.category?.toLowerCase()===selected)&& (country==='All countries'||booth?.country===country)&& `${p.title} ${maker?.name||booth?.name} ${booth?.location} ${booth?.country} ${p.description}`.toLowerCase().includes(term.trim().toLowerCase())
  })
  if(sort==='low')result.sort((a,b)=>a.price-b.price)
  if(sort==='high')result.sort((a,b)=>b.price-a.price)
  return result
 },[selected,country,term,sort,publishedProducts,data.boothProfiles,allBooths])
 return <div className="vb-container vb-page"><PageIntro eyebrow="Explore / Products" title="Handmade from around the world" description="Discover craft traditions, independent makers and one-of-a-kind handmade goods."/><div className="vb-switcher"><a className="chosen" href="#/products">Products</a><a href="#/booths">Booths</a><a href="#/projects">Projects</a></div>
 <Filters kind="products" selected={selected} setSelected={setSelected} term={term} setTerm={setTerm} country={country} setCountry={setCountry}/><div className="vb-results-line"><span>{filtered.length} sample products</span><label>Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
 <StatePreview state={state} kind="products">{filtered.length?<div className="vb-product-grid">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<EmptyState kind="products" reset={()=>{setSelected('all');setTerm('');setCountry('All countries')}}/>}</StatePreview></div>
}
export function ExploreBooths({params,state}){
 const {data,allBooths}=useDemo()
 const [selected,setSelected]=useState('all'),[term,setTerm]=useState(params.get('q')||''),[country,setCountry]=useState('All countries')
 const list=allBooths.filter(b=>!(data.customBooths||[]).some(c=>c.id===b.id)||data.vendors.find(v=>v.id===b.id)?.status==='Approved').map(b=>({...b,...data.boothProfiles?.[b.id],category:b.category}))
 const filtered=list.filter(b=>(selected==='all'||b.category===selected)&&(country==='All countries'||b.country===country)&&`${b.name} ${b.location} ${b.country} ${b.description}`.toLowerCase().includes(term.toLowerCase()))
 return <div className="vb-container vb-page"><PageIntro eyebrow="Explore / Booths" title="Meet makers across the globe" description="Visit independent online booths to see handmade products and creative projects."/><div className="vb-switcher"><a href="#/products">Products</a><a className="chosen" href="#/booths">Booths</a><a href="#/projects">Projects</a></div>
 <Filters kind="booths" selected={selected} setSelected={setSelected} term={term} setTerm={setTerm} country={country} setCountry={setCountry}/><p className="vb-results-line">{filtered.length} sample maker booths</p><StatePreview state={state} kind="booths">{filtered.length?<div className="vb-booth-grid">{filtered.map(b=><BoothCard key={b.id} booth={b}/>)}</div>:<EmptyState kind="booths" reset={()=>{setSelected('all');setTerm('');setCountry('All countries')}}/>}</StatePreview></div>
}
export function ExploreProjects({params,state}){
 const {publishedProjects}=useDemo(),[term,setTerm]=useState(params.get('q')||'')
 const filtered=publishedProjects.filter(p=>`${p.title} ${p.category} ${p.author} ${p.description}`.toLowerCase().includes(term.toLowerCase()))
 return <div className="vb-container vb-page"><PageIntro eyebrow="Explore / Projects" title="Stories from the workbench" description="Creative showcases and experiments from different craft traditions."/><div className="vb-switcher"><a href="#/products">Products</a><a href="#/booths">Booths</a><a className="chosen" href="#/projects">Projects</a></div><div className="vb-project-info"><Sparkles size={18}/><span>Projects are showcases — they are not listings for sale.</span></div><div className="vb-filter-row"><label className="vb-inline-search"><Search size={18}/><span className="vb-sr-only">Search projects</span><input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search worldwide projects…"/></label></div><p className="vb-results-line">{filtered.length} demo projects</p><StatePreview state={state} kind="projects">{filtered.length?<div className="vb-project-grid">{filtered.map(p=><ProjectCard key={p.id} project={p}/>)}</div>:<EmptyState kind="projects" reset={()=>setTerm('')}/>}</StatePreview></div>
}
