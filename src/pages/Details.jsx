import {useState} from 'react'
import {useDemo} from '../dashboard/DemoStore'
import {useCommerce,usdCents,cents} from '../commerce/CommerceStore'
import {ProductVideoPlayer} from '../commerce/ProductVideo'
import {ArrowRight,CheckCircle2,ChevronLeft,Info,Package,Search,Sparkles,Store,Truck,Video} from 'lucide-react'
import {Breadcrumbs,SectionHeading} from '../components/Layout'
import {Media,ProductCard,ProjectCard} from '../components/Cards'
import {booths,boothById,usd} from '../data/catalog'
export function NotFound(){return <div className="vb-container vb-message vb-notfound"><Search size={42}/><h1>We couldn't find that page</h1><p>The item may be unpublished, or the link may have changed in this demo.</p><a href="#/" className="vb-button">Back to home</a></div>}
export function ProductDetail({id}){
 const {publishedProducts,data,allBooths}=useDemo()
 const {addProduct}=useCommerce()
 const [cartMessage,setCartMessage]=useState('')
 const product=publishedProducts.find(p=>p.id===id)
 if(!product)return <NotFound/>
 const booth=allBooths.find(b=>b.id===product.vendorId)
 const vendor={...booth,...data.boothProfiles?.[product.vendorId]}
 const related=publishedProducts.filter(p=>p.vendorId===product.vendorId&&p.id!==id)
 const add=()=>{const result=addProduct(product);setCartMessage(result.ok?'Added to your shopping bag.':result.reason)}
 return <div className="vb-container vb-page"><Breadcrumbs items={[{name:'Products',path:'/products'},{name:product.title}]}/><div className="vb-detail-grid"><Media className="vb-detail-photo" src={product.image} alt={product.title} eager/><div className="vb-detail-copy"><span className="vb-eyebrow">MADE BY {vendor?.name?.toUpperCase()||'AN INDEPENDENT MAKER'}</span><h1>{product.title}</h1><p className="vb-detail-price">{usd(product.price)}</p><p className="vb-global-product-origin">{booth?.location||'Independent maker'} · Handmade product</p><div className="vb-detail-divider"/><p>{product.description}</p><div className="vb-detail-facts"><div><b>Materials</b><span>{product.materials||'Ask the maker'}</span></div><div><b>Craft</b><span>Handmade / small-batch</span></div><div><b>Availability</b><span><CheckCircle2 size={16}/>{product.stock===0?'Out of stock':typeof product.stock==='number'?`${product.stock} available (demo)`:'Ask the maker'}</span></div></div>
 <div className="vb-commerce-product-actions"><button className="vb-button" type="button" onClick={add} disabled={product.stock===0}><Package size={18}/> {product.stock===0?'Out of stock':'Add to Cart (Demo)'}</button><a className="vb-outline-button" href={`#/booth/${product.vendorId}`}>Visit Booth <ArrowRight size={18}/></a></div>
 {cartMessage&&<p className="vb-commerce-cart-message" role="status">{cartMessage} <a href="#/cart">View cart</a></p>}
 <small className="vb-detail-note"><Info size={15}/> Interactive prototype only. No real charge, order or shipping service.</small>
 <ProductVideoPlayer productId={product.id}/></div></div>
 {related.length>0&&<section className="vb-section"><SectionHeading title={`More from ${vendor?.name}`} link={`/booth/${product.vendorId}`} linkText="See booth"/><div className="vb-product-grid">{related.slice(0,4).map(p=><ProductCard key={p.id} product={p}/>)}</div></section>}</div>
}
export function BoothDetail({id}){
 const {data,publishedProducts,publishedProjects,allBooths}=useDemo()
 const {shippingFor}=useCommerce()
 const original=allBooths.find(b=>b.id===id)
 if(!original || (data.customBooths||[]).some(b=>b.id===id)&&data.vendors.find(v=>v.id===id)?.status!=='Approved')return <NotFound/>
 const booth={...original,...data.boothProfiles?.[id]}
 const products=publishedProducts.filter(p=>p.vendorId===id)
 const projects=publishedProjects.filter(p=>p.boothId===id)
 const shipping=shippingFor(id)
 return <div className="vb-container vb-page"><Breadcrumbs items={[{name:'Booths',path:'/booths'},{name:booth.name}]}/><Media className="vb-detail-cover" src={booth.image} alt={`${booth.name} craft workshop (illustrative)`} eager/>
 <div className="vb-booth-title"><div><span className="vb-eyebrow">INDEPENDENT DIGITAL BOOTH</span><h1>{booth.name}</h1><p>{booth.location} · {booth.tag}</p></div><a className="vb-button-quiet" href="#/booths"><ChevronLeft size={18}/> All booths</a></div>
 <div className="vb-booth-story"><div><h2>Meet the maker</h2><p>{booth.description}</p><p>This is a fictional storefront in a design demonstration. The maker, product catalog and imagery are illustrative.</p></div>
 <div><span className="vb-shop-tag"><Store size={16}/> Global maker booth</span><p><Truck size={16} style={{verticalAlign:'middle'}}/> Shipping from {shipping.from}</p><p>Preparation: {shipping.handling}</p><p>Standard shipping estimate: {usdCents(cents(shipping.standardFee))} (demo)</p><small>No shipping partner or payment account is connected yet.</small></div></div>
 <section className="vb-section"><SectionHeading eyebrow="Explore handmade goods" title="Products from this maker" body="Every product is individually priced. Select one to see its details and optional video."/>{products.length?<div className="vb-product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<p className="vb-empty-inline">This maker has not published products in the demo yet.</p>}</section>
 {projects.length>0&&<section className="vb-section"><SectionHeading title="Creative projects & stories"/><div className="vb-project-grid">{projects.map(p=><ProjectCard key={p.id} project={p}/>)}</div></section>}</div>
}
export function ProjectDetail({id}){
 const {publishedProjects}=useDemo()
 const project=publishedProjects.find(p=>p.id===id)
 if(!project)return <NotFound/>
 return <div className="vb-container vb-page"><Breadcrumbs items={[{name:'Projects',path:'/projects'},{name:project.title}]}/><div className="vb-project-detail"><span className="vb-project-badge"><Sparkles size={16}/> Showcase · {project.category}</span><h1>{project.title}</h1><p className="vb-lead">{project.description}</p><Media src={project.image} className="vb-project-cover" alt={project.title} eager/><div className="vb-project-narrative"><h2>Behind the work</h2><p>This showcase introduces the craft process, the materials and inspiration. Projects are not products for sale.</p><p>Demonstration content only. A real maker could add original progress photos and updates after media storage is integrated.</p><a className="vb-button" href={`#/booth/${project.boothId}`}>Explore maker booth <ArrowRight size={18}/></a></div></div></div>
}
