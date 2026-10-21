import { ArrowUpRight, Heart, ShoppingBag, Sparkles, Store } from 'lucide-react'
import { boothById, usd } from '../data/catalog'
import { useState } from 'react'

export function Media({src, alt, className='', eager=false}){
 const [failed,setFailed]=useState(false)
 return <div className={'vb-media '+className}>{!failed&&src?<img src={src} alt={alt} loading={eager?'eager':'lazy'} onError={()=>setFailed(true)}/>:<div className="vb-photo-fallback" role="img" aria-label={alt}><Store size={28}/><span>Handmade • VoxBazaar</span></div>}</div>
}
function getSaved(){try{return JSON.parse(localStorage.getItem('vb-liked')||'[]')}catch{return []}}
export function ProductCard({product}){
 const booth=boothById(product.vendorId)
 const [liked,setLiked]=useState(()=>getSaved().includes(product.id))
 const toggle=()=>{const next=!liked;setLiked(next);try{const ids=new Set(getSaved());next?ids.add(product.id):ids.delete(product.id);localStorage.setItem('vb-liked',JSON.stringify([...ids]))}catch{}}
 return <article className="vb-product-card"><a href={`#/product/${product.id}`} className="vb-card-image-link"><Media src={product.image} alt={product.title}/></a><button className={'vb-heart '+(liked?'is-liked':'')} aria-label={liked?'Remove from saved products':'Save product'} aria-pressed={liked} onClick={toggle}><Heart size={19} fill={liked?'currentColor':'none'}/></button>
 <div className="vb-card-content"><span className="vb-category-label">{booth?.name||'Independent maker'}</span><h3><a href={`#/product/${product.id}`}>{product.title}</a></h3><div className="vb-price">{usd(product.price)}</div><a className="vb-card-action" href={`#/booth/${product.vendorId}`}><span>Visit Booth</span><ShoppingBag size={17}/></a></div></article>
}
export function BoothCard({booth}){return <article className="vb-booth-card"><a href={`#/booth/${booth.id}`} aria-label={`Visit ${booth.name}`}><Media src={booth.image} alt={`${booth.name} artisan workshop`} className="vb-booth-image"/></a><div className="vb-booth-content"><span className="vb-category-label">{booth.location}</span><h3><a href={`#/booth/${booth.id}`}>{booth.name}</a></h3><p>{booth.description}</p><span className="vb-shop-tag">{booth.tag}</span><a className="vb-card-action" href={`#/booth/${booth.id}`}><span>Visit booth</span><ArrowUpRight size={17}/></a></div></article>}
export function ProjectCard({project}){return <article className="vb-project-card"><a href={`#/project/${project.id}`}><Media src={project.image} alt={project.title} className="vb-project-image" /></a><div className="vb-project-content"><span className="vb-project-badge"><Sparkles size={14}/> Showcase · {project.category}</span><h3><a href={`#/project/${project.id}`}>{project.title}</a></h3><p>{project.description}</p><div className="vb-project-bottom"><small>By {project.author}</small><a href={`#/project/${project.id}`} aria-label={`View project ${project.title}`}><ArrowUpRight size={19}/></a></div></div></article>}
