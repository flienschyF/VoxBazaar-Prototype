import { useState } from 'react'
import { ArrowRight, BookOpen, CircleHelp, Home, LayoutGrid, Menu, Search, ShieldCheck, ShoppingBag, Store, UserRound, X } from 'lucide-react'

const href = (path) => `#${path}`
export const navLinks = [
  {name:'Products', path:'/products'},
  {name:'Booths', path:'/booths'},
  {name:'Projects', path:'/projects'},
]
export function Brand(){return <a className="vb-brand" href={href('/')} aria-label="VoxBazaar home"><span className="vb-brand-icon" aria-hidden="true">V</span><span><strong>VoxBazaar</strong><small>MADE BY INDEPENDENT HANDS</small></span></a>}
export function Header({pathname}){
 const [menu,setMenu]=useState(false)
 const [search,setSearch]=useState('')
 const submit=(e)=>{e.preventDefault(); location.hash='/search?q='+encodeURIComponent(search);setMenu(false)}
 return <>
   <header className="vb-header"><div className="vb-head-inner">
     <Brand/>
     <nav className="vb-top-nav" aria-label="Primary navigation">{navLinks.map(l=><a key={l.path} className={pathname.startsWith(l.path)?'active':''} href={href(l.path)}>{l.name}</a>)}</nav>
     <form className="vb-header-search" role="search" onSubmit={submit}><label className="vb-sr-only" htmlFor="header-search">Search products, booths or projects</label><Search size={18} aria-hidden="true"/><input id="header-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search handmade creations…"/><button type="submit" aria-label="Submit search"><ArrowRight size={18}/></button></form>
     <div className="vb-header-actions"><a className="vb-outline-button" href={href('/sell')}>Open your booth</a><a className="vb-signin" href={href('/account')}><UserRound size={18}/><span>Account</span></a></div>
     <div className="vb-mobile-head"><a href={href('/search')} aria-label="Search"><Search size={21}/></a><button type="button" onClick={()=>setMenu(!menu)} aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu}>{menu?<X size={23}/>:<Menu size={23}/>}</button></div>
   </div></header>
   {menu&&<nav className="vb-mobile-menu" aria-label="Mobile expanded navigation">{navLinks.map(l=><a key={l.path} href={href(l.path)} onClick={()=>setMenu(false)}>{l.name}</a>)}<a href={href('/sell')} onClick={()=>setMenu(false)}>Open your booth</a></nav>}
 </>
}
export function Footer(){return <footer className="vb-footer"><div className="vb-container vb-footer-grid"><div><Brand/><p>An independent marketplace for handmade objects, creative projects, and the people who make them.</p><span className="vb-demo-notice">Interactive design prototype · Fictional demo content</span></div><div><b>Explore</b><a href="#/products">Handmade products</a><a href="#/booths">Digital booths</a><a href="#/projects">Creative projects</a></div><div><b>For makers</b><a href="#/sell">Open your booth</a><a href="#/studio">Vendor Studio demo</a></div><div><b>Information</b><a href="#/help">Help & contact</a><a href="#/about">About the prototype</a></div></div><div className="vb-container vb-footer-bottom"><span>© 2026 VoxBazaar · Prototype only</span><span>Crafted for independent makers</span></div></footer>}
export function BottomNav({pathname}){
 const links=[{name:'Home',path:'/',icon:Home},{name:'Explore',path:'/products',icon:LayoutGrid},{name:'Search',path:'/search',icon:Search},{name:'Sell',path:'/sell',icon:Store},{name:'Account',path:'/account',icon:UserRound}]
 return <nav className="vb-bottom-nav" aria-label="Mobile bottom navigation">{links.map(({name,path,icon:Icon})=><a key={name} href={href(path)} className={pathname===path || (path==='/products' && ['/products','/booths','/projects'].some(v=>pathname.startsWith(v)))?'current':''} aria-current={pathname===path?'page':undefined}><Icon size={21} strokeWidth={1.9}/><span>{name}</span></a>)}</nav>
}
export function SectionHeading({eyebrow,title,body,link,linkText='View all'}){return <div className="vb-section-head"><div>{eyebrow&&<span className="vb-eyebrow">{eyebrow}</span>}<h2>{title}</h2>{body&&<p>{body}</p>}</div>{link&&<a className="vb-text-link" href={href(link)}>{linkText} <ArrowRight size={17}/></a>}</div>}
export function PageIntro({eyebrow,title,description}){return <div className="vb-page-intro">{eyebrow&&<span className="vb-eyebrow">{eyebrow}</span>}<h1>{title}</h1><p>{description}</p></div>}
export function Breadcrumbs({items}){return <nav className="vb-crumbs" aria-label="Breadcrumb"> <a href="#/">Home</a>{items.map((item,i)=><span key={i} className="vb-crumb-item"><span aria-hidden="true">/</span>{item.path?<a href={href(item.path)}>{item.name}</a>:<span aria-current="page">{item.name}</span>}</span>)}</nav>}
