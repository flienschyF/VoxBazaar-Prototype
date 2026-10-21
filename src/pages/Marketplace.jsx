import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal, Sparkles, Store, WifiOff, AlertCircle, RefreshCw, Shield, CheckCircle2 } from 'lucide-react'
import { BoothCard, Media, ProductCard, ProjectCard } from '../components/Cards'
import { SectionHeading, PageIntro, Breadcrumbs } from '../components/Layout'
import { booths, categories, products, projects, boothById, usd } from '../data/catalog'
import stitchImages from '../data/stitchImages.json'
import { useMemo, useState } from 'react'

function EmptyState({kind='results',reset}){return <div className="vb-message"><Search size={34}/><h2>No {kind} found</h2><p>Try a different keyword or choose another category.</p>{reset&&<button className="vb-button" onClick={reset}>Clear filters</button>}</div>}
export function StatePreview({state,children,kind='products'}){
 const [retry,setRetry]=useState(0)
 if(!state||state==='default'||retry>0)return children
 if(state==='loading')return <div className="vb-skeleton-grid" aria-label="Loading content" aria-live="polite">{Array.from({length:8},(_,i)=><div className="vb-skeleton" key={i}><div/><span/><small/></div>)}</div>
 if(state==='empty')return <EmptyState kind={kind}/>
 const offline=state==='offline';const denied=state==='no-permission'
 return <div className="vb-message" role="status">{offline?<WifiOff size={35}/>:denied?<Shield size={35}/>:<AlertCircle size={35}/>}<h2>{offline?'You appear to be offline':denied?'This content is not available':'We could not load the page'}</h2><p>{offline?'Reconnect and try again.':denied?'You may not have access to this view.':'This is a demo error state for review.'}</p><button className="vb-button" onClick={()=>setRetry(v=>v+1)}><RefreshCw size={17}/> Retry</button></div>
}
export function Home({state}){return <>
 <section className="vb-container vb-hero"><div className="vb-hero-copy"><span className="vb-eyebrow">A HOME FOR HANDMADE WORK</span><h1>Made by hand.<br/><em>Found with care.</em></h1><p>Discover thoughtfully crafted goods, independent ateliers, and the stories behind every creation.</p><div className="vb-hero-actions"><a href="#/products" className="vb-button">Explore products <ArrowRight size={18}/></a><a href="#/booths" className="vb-button-quiet">Meet the makers <ArrowUpRight size={18}/></a></div><div className="vb-hero-note"><CheckCircle2 size={16}/> A marketplace for independent craft and creativity</div></div><div className="vb-hero-visual"><Media eager src={stitchImages.desktopHome[0]} alt="Artisan hand shaping a ceramic vessel in a workshop"/><div className="vb-hero-image-caption"><span>STORIES FROM THE WORKSHOP</span><b>Craft comes from people.</b></div></div></section>
 <StatePreview state={state} kind="products">
 <section className="vb-container vb-section"><SectionHeading eyebrow="Explore by material" title="Find your kind of handmade" body="Discover crafts, makers and traditions that interest you." link="/products" linkText="All products"/><div className="vb-categories">{categories.map(cat=><a className="vb-category" href={`#/products?category=${cat.slug}`} key={cat.slug}><Media src={cat.image} alt={cat.name}/><strong>{cat.short}</strong><small>{cat.count}</small></a>)}</div></section>
 <section className="vb-container vb-section"><SectionHeading eyebrow="Made in small workshops" title="Recent handmade finds" body="Objects made with patience, skill, and an eye for detail." link="/products" linkText="Explore all products"/><div className="vb-product-grid">{products.slice(0,8).map(p=><ProductCard product={p} key={p.id}/>)}</div></section>
 <section className="vb-container vb-section"><SectionHeading eyebrow="Meet the people" title="Independent booths to explore" body="Each booth is a permanent online home for a maker and their work." link="/booths" linkText="Explore booths"/><div className="vb-booth-grid">{booths.slice(0,3).map(b=><BoothCard booth={b} key={b.id}/>)}</div></section>
 <section className="vb-container vb-section"><SectionHeading eyebrow="From the workbench" title="Projects with a story" body="Go beyond the finished product and see how ideas take shape." link="/projects" linkText="See all projects"/><div className="vb-project-grid">{projects.slice(0,3).map(p=><ProjectCard project={p} key={p.id}/>)}</div></section>
 <section className="vb-container vb-maker-banner"><div><span className="vb-eyebrow">For independent makers</span><h2>Make something? Share it here.</h2><p>Open your digital booth, tell the story of your craft, and showcase products and projects on VoxBazaar.</p><a href="#/sell" className="vb-button">Open your booth <ArrowRight size={17}/></a></div><div className="vb-maker-icon"><Store size={58} strokeWidth={1.15}/><span>Your own online storefront</span></div></section>
 </StatePreview></>}

const categoryOptions=[{slug:'all',name:'All crafts'},...categories.map(c=>({slug:c.slug,name:c.short}))]
function Filters({selected,setSelected,term,setTerm,kind}){
 return <div className="vb-filter-row"><div className="vb-filter-buttons" aria-label={`Filter ${kind} by category`}>{categoryOptions.map(c=><button key={c.slug} onClick={()=>setSelected(c.slug)} aria-pressed={selected===c.slug} className={'vb-chip '+(selected===c.slug?'selected':'')}>{c.name}</button>)}</div><label className="vb-inline-search"><Search size={18}/><span className="vb-sr-only">Search {kind}</span><input placeholder={`Search ${kind}…`} value={term} onChange={e=>setTerm(e.target.value)}/></label></div>
}
export function ExploreProducts({params,state}){
 const [selected,setSelected]=useState(params.get('category')||'all'),[term,setTerm]=useState(params.get('q')||''),[sort,setSort]=useState('featured')
 const filtered=useMemo(()=>{
  const result=products.filter(p=>(selected==='all'||p.category===selected)&&`${p.title} ${boothById(p.vendorId)?.name} ${p.description}`.toLowerCase().includes(term.trim().toLowerCase()))
  if(sort==='low')result.sort((a,b)=>a.price-b.price);if(sort==='high')result.sort((a,b)=>b.price-a.price)
  return result
 },[selected,term,sort])
 return <div className="vb-container vb-page"><PageIntro eyebrow="Explore / Products" title="The things people make" description="Everyday objects and one-of-a-kind pieces from independent makers."/><div className="vb-switcher"><a className="chosen" href="#/products">Products</a><a href="#/booths">Booths</a><a href="#/projects">Projects</a></div><Filters kind="products" selected={selected} setSelected={setSelected} term={term} setTerm={setTerm}/><div className="vb-results-line"><span>{filtered.length} demo products</span><label>Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div><StatePreview state={state} kind="products">{filtered.length?<div className="vb-product-grid">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<EmptyState kind="products" reset={()=>{setSelected('all');setTerm('')}}/>}</StatePreview></div>
}
export function ExploreBooths({params,state}){
 const [selected,setSelected]=useState('all'),[term,setTerm]=useState(params.get('q')||'')
 const filtered=booths.filter(b=>(selected==='all'||b.category===selected)&&`${b.name} ${b.location} ${b.description}`.toLowerCase().includes(term.toLowerCase()))
 return <div className="vb-container vb-page"><PageIntro eyebrow="Explore / Booths" title="Meet the makers" description="Visit independent digital booths and get to know the people behind the products."/><div className="vb-switcher"><a href="#/products">Products</a><a className="chosen" href="#/booths">Booths</a><a href="#/projects">Projects</a></div><Filters kind="booths" selected={selected} setSelected={setSelected} term={term} setTerm={setTerm}/><p className="vb-results-line">{filtered.length} demo booths</p><StatePreview state={state} kind="booths">{filtered.length?<div className="vb-booth-grid">{filtered.map(b=><BoothCard key={b.id} booth={b}/>)}</div>:<EmptyState kind="booths" reset={()=>{setSelected('all');setTerm('')}}/>}</StatePreview></div>
}
export function ExploreProjects({params,state}){
 const [term,setTerm]=useState(params.get('q')||'')
 const filtered=projects.filter(p=>`${p.title} ${p.category} ${p.author}`.toLowerCase().includes(term.toLowerCase()))
 return <div className="vb-container vb-page"><PageIntro eyebrow="Explore / Projects" title="Stories from the workbench" description="Creative showcases, experiments and works in progress from independent makers."/><div className="vb-switcher"><a href="#/products">Products</a><a href="#/booths">Booths</a><a className="chosen" href="#/projects">Projects</a></div><div className="vb-project-info"><Sparkles size={18}/><span>Projects are showcases of creative work — they are not listings for sale.</span></div><div className="vb-filter-row"><label className="vb-inline-search"><Search size={18}/><span className="vb-sr-only">Search projects</span><input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search projects…"/></label></div><p className="vb-results-line">{filtered.length} demo projects</p><StatePreview state={state} kind="projects">{filtered.length?<div className="vb-project-grid">{filtered.map(p=><ProjectCard key={p.id} project={p}/>)}</div>:<EmptyState kind="projects" reset={()=>setTerm('')}/>}</StatePreview></div>
}
