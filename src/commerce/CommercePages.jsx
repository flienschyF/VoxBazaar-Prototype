import {useState} from 'react'
import {ArrowRight,ArrowLeft,CheckCircle2,ClipboardList,CreditCard,MapPin,Package,ShieldCheck,Truck,Trash2,Lock} from 'lucide-react'
import {PageIntro} from '../components/Layout'
import {DashCard,DashEmpty,DashNotice,DashStat,DashTitle} from '../dashboard/DashboardShell'
import {useDemo} from '../dashboard/DemoStore'
import {boothById} from '../data/catalog'
import {useCommerce,usdCents,cents} from './CommerceStore'
const link=x=>'#'+x
const paymentOptions=[
 {id:'demo-card',label:'Card payment preview',detail:'Stripe Connect is not connected. No card details are collected.'},
 {id:'demo-transfer',label:'Bank transfer preview',detail:'No bank instructions are generated; this is only a UI simulation.'}
]
function DemoBanner(){return <div className="vb-commerce-banner" role="note"><ShieldCheck size={18}/><span><b>Interactive commerce prototype.</b> No charges, shipments, vendor payouts or real orders are created. Data is stored on this browser only.</span></div>}
function Summary({cart,shipping=0}){
 const subtotal=cart.reduce((v,x)=>v+x.priceCents*x.qty,0)
 return <div className="vb-commerce-summary"><h3>Order summary</h3>{cart.map(x=><div className="vb-commerce-summary-line" key={x.id}><span>{x.title} × {x.qty}</span><b>{usdCents(x.priceCents*x.qty)}</b></div>)}
 <div className="vb-commerce-summary-line"><span>Subtotal</span><b>{usdCents(subtotal)}</b></div>
 <div className="vb-commerce-summary-line"><span>Demo shipping estimate</span><b>{usdCents(shipping)}</b></div>
 <div className="vb-commerce-total"><span>Estimated total</span><strong>{usdCents(subtotal+shipping)}</strong></div>
 <small>Illustrative USD amounts. No live delivery rates, taxes, discounts or real payment processing. Production totals must be calculated by a secure backend.</small></div>
}
export function CartPage(){
 const {cart,setQty,clearCart,shippingFeeCents}=useCommerce()
 const {allBooths}=useDemo()
 const vendor=cart[0]&&allBooths.find(b=>b.id===cart[0].vendorId)
 return <div className="vb-container vb-page vb-commerce-page"><PageIntro eyebrow="BUYER / CART" title="Your shopping bag" description="Review handmade goods from one independent vendor at a time."/><DemoBanner/>
 {!cart.length?<div className="vb-commerce-card"><DashEmpty title="Your bag is empty" description="Browse handmade products from around the world and choose a piece to preview checkout." action={<a className="vb-button" href={link('/products')}>Explore products <ArrowRight size={17}/></a>}/></div>:
 <div className="vb-commerce-columns"><section className="vb-commerce-card"><div className="vb-commerce-row between"><h2>Items from {vendor?.name||'this vendor'}</h2><button className="vb-commerce-textbtn" type="button" onClick={clearCart}><Trash2 size={15}/> Clear cart</button></div>
 <p className="vb-commerce-muted">Ships from {vendor?.location||'the maker’s studio'} · One-vendor checkout demo</p>
 {cart.map(x=><div className="vb-commerce-cart-row" key={x.id}><img src={x.image} alt=""/><div><a href={link('/product/'+x.id)}><strong>{x.title}</strong></a><p>{usdCents(x.priceCents)} each</p><div className="vb-commerce-quantity"><button onClick={()=>setQty(x.id,x.qty-1)} aria-label={`Decrease ${x.title} quantity`}>−</button><span>{x.qty}</span><button onClick={()=>setQty(x.id,x.qty+1)} aria-label={`Increase ${x.title} quantity`}>+</button></div></div><b>{usdCents(x.priceCents*x.qty)}</b></div>)}
 </section><aside><Summary cart={cart} shipping={shippingFeeCents}/><a className="vb-button vb-commerce-full" href={link('/checkout/shipping')}>Continue to shipping <ArrowRight size={18}/></a><a className="vb-commerce-back" href={link('/products')}>Continue shopping</a></aside></div>}</div>
}
const fields=[['name','Full name','text'],['email','Email address','email'],['phone','Phone number','tel'],['address','Street address','text'],['city','City','text'],['region','State / Province','text'],['postal','Postal code','text'],['country','Country','text']]
export function ShippingPage(){
 const {cart,checkout,updateCheckout,cartShipping,shippingFeeCents}=useCommerce()
 const {allBooths}=useDemo()
 const vendor=cart[0]&&allBooths.find(b=>b.id===cart[0].vendorId)
 const submit=e=>{e.preventDefault();if(e.currentTarget.reportValidity())location.hash='/checkout/payment'}
 return <div className="vb-container vb-page vb-commerce-page"><PageIntro eyebrow="CHECKOUT / 1 OF 2" title="Shipping & delivery" description="Preview a vendor-specific delivery workflow and choose a demo shipping option."/><DemoBanner/>
 {!cart.length?<div className="vb-commerce-card"><DashEmpty title="Your cart is empty" description="Add a product first." action={<a className="vb-button" href={link('/products')}>Explore products</a>}/></div>:
 <div className="vb-commerce-columns"><form className="vb-commerce-card vb-commerce-form" onSubmit={submit}><h2><MapPin size={23}/> Sample delivery address</h2><p>Use imaginary details only. This prototype stores form data locally and cannot arrange deliveries.</p>
 <div className="vb-commerce-form-grid">{fields.map(([key,label,type])=><label key={key} className={key==='address'?'wide':''}>{label}<input type={type} required maxLength={120} autoComplete="off" value={checkout[key]||''} placeholder={key==='name'?'Demo Buyer':key==='email'?'demo@example.com':key==='address'?'123 Example Street':''} onChange={e=>updateCheckout({[key]:e.target.value})}/></label>)}</div>
 <h3>Choose a shipping option</h3><div className="vb-commerce-methods">{['standard','express'].map(method=><label key={method} className={'vb-commerce-method '+(checkout.shippingMethod===method?'chosen':'')}><input type="radio" name="shippingMethod" checked={checkout.shippingMethod===method} onChange={()=>updateCheckout({shippingMethod:method})}/><span><strong>{method==='standard'?'Standard delivery':'Express delivery'} — {usdCents(cents(cartShipping[method==='standard'?'standardFee':'expressFee']))}</strong><small>Illustrative only. No carrier-rate lookup or actual booking.</small></span></label>)}</div>
 <div className="vb-commerce-shipping-option"><Truck size={22}/><div><b>From {vendor?.name||'Vendor'} · {cartShipping.from}</b><small>Preparation: {cartShipping.handling}. Preferred courier: {cartShipping.carrier}.</small></div></div>
 <div className="vb-commerce-actions"><a className="vb-outline-button" href={link('/cart')}><ArrowLeft size={16}/> Back to cart</a><button className="vb-button" type="submit">Continue to payment <ArrowRight size={17}/></button></div></form><aside><Summary cart={cart} shipping={shippingFeeCents}/></aside></div>}</div>
}
export function PaymentPage(){
 const {cart,checkout,placeDemoOrder,shippingFeeCents,paymentFor}=useCommerce()
 const {allBooths}=useDemo()
 const [method,setMethod]=useState('demo-card'),[working,setWorking]=useState(false)
 const valid=fields.every(([k])=>String(checkout[k]||'').trim())
 const provider=cart.length?paymentFor(cart[0].vendorId):null
 const buy=e=>{e.preventDefault();if(!valid||!cart.length)return;setWorking(true);const id=placeDemoOrder({shipping:{...checkout},paymentMethod:method});if(id)location.hash='/checkout/complete?id='+encodeURIComponent(id);setWorking(false)}
 return <div className="vb-container vb-page vb-commerce-page"><PageIntro eyebrow="CHECKOUT / 2 OF 2" title="Payment preview" description="Review the total and demonstrate a future payment experience for the selected vendor."/><DemoBanner/>
 {!cart.length?<div className="vb-commerce-card"><DashEmpty title="No active checkout" description="Start with a product from the marketplace." action={<a className="vb-button" href={link('/products')}>Explore products</a>}/></div>:!valid?<div className="vb-commerce-card"><DashEmpty title="Shipping details required" description="Complete the sample address before continuing." action={<a href={link('/checkout/shipping')} className="vb-button">Shipping details</a>}/></div>:
 <div className="vb-commerce-columns"><form className="vb-commerce-card vb-commerce-form" onSubmit={buy}><h2><CreditCard size={23}/> Select a method (demo)</h2><p>{allBooths.find(b=>b.id===cart[0].vendorId)?.name}: {provider?.status||'Not connected'}. Stripe or another provider will be integrated in the final development phase.</p>
 <div className="vb-commerce-methods">{paymentOptions.map(m=><label className={'vb-commerce-method '+(method===m.id?'chosen':'')} key={m.id}><input type="radio" name="method" checked={method===m.id} onChange={()=>setMethod(m.id)}/><span><strong>{m.label}</strong><small>{m.detail}</small></span></label>)}</div>
 <div className="vb-commerce-shipping-option"><MapPin size={21}/><div><b>Demo delivery to {checkout.city}, {checkout.country}</b><small>{checkout.shippingMethod==='express'?'Express':'Standard'} sample delivery — {usdCents(shippingFeeCents)}</small></div><a href={link('/checkout/shipping')}>Edit</a></div>
 <div className="vb-commerce-actions"><a className="vb-outline-button" href={link('/checkout/shipping')}><ArrowLeft size={16}/> Back</a><button className="vb-button" type="submit" disabled={working}><Lock size={16}/> Simulate order — no charge</button></div></form><aside><Summary cart={cart} shipping={shippingFeeCents}/></aside></div>}</div>
}
export function CompletePage({id}){
 const {orders}=useCommerce(),order=orders.find(o=>o.id===id)
 const {allBooths}=useDemo()
 return <div className="vb-container vb-page vb-commerce-page"><DemoBanner/><div className="vb-commerce-confirm"><CheckCircle2 size={48}/><span className="vb-eyebrow">DEMO ORDER CONFIRMED</span><h1>Checkout preview complete</h1><p>This was a simulated order. No money was charged, and nothing will be shipped.</p>{order&&<><div className="vb-commerce-confirm-number">Order reference: <strong>{order.id}</strong></div><p><b>Vendor:</b> {allBooths.find(b=>b.id===order.vendorId)?.name} · <b>Demo total:</b> {usdCents(order.totalCents)}</p></>}
 <div className="vb-commerce-actions"><a className="vb-button" href={link('/account/orders')}>View demo orders <ArrowRight size={17}/></a><a className="vb-outline-button" href={link('/products')}>Back to products</a></div></div></div>
}
export function BuyerOrdersPage(){
 const {orders}=useCommerce()
 const {allBooths}=useDemo()
 return <div className="vb-container vb-page vb-commerce-page"><PageIntro eyebrow="ACCOUNT / ORDERS" title="My demo orders" description="Review your simulated purchases across different vendors."/><DemoBanner/>
 {orders.length?<div className="vb-commerce-order-list">{orders.map(o=><article className="vb-commerce-card" key={o.id}><div className="vb-commerce-row between"><div><span className="vb-eyebrow">{o.id}</span><h2>{o.items.map(x=>x.title).join(', ')}</h2><p>Placed {new Date(o.placedAt).toLocaleDateString('en-US')}</p></div><strong>{usdCents(o.totalCents)}</strong></div><div className="vb-commerce-tags"><span>{o.fulfillment}</span><span>{o.paymentStatus}</span></div><p><b>Vendor:</b> {allBooths.find(b=>b.id===o.vendorId)?.name||'Vendor'}</p><p><b>Shipping:</b> {o.shippingMethod||'standard'} · {o.carrier||'Carrier not assigned'} {o.tracking?`· Demo tracking ${o.tracking}`:''}</p></article>)}</div>:
 <div className="vb-commerce-card"><DashEmpty title="No demo orders yet" description="Complete a simulated checkout to see one here." action={<a href={link('/products')} className="vb-button">Explore products</a>}/></div>}</div>
}
const statuses=['New','Processing','Ready to ship','Shipped','Delivered','Completed','Cancelled']
export function VendorOrdersPage(){
 const {activeVendorId,activeBooth}=useDemo()
 const {orders,updateOrder}=useCommerce()
 const [editing,setEditing]=useState({})
 const own=orders.filter(o=>o.vendorId===activeVendorId)
 const set=(id,k,v)=>setEditing(s=>({...s,[id]:{...s[id],[k]:v}}))
 const save=(o)=>{const fields=editing[o.id]||{};updateOrder(o.id,fields);setEditing(s=>{const next={...s};delete next[o.id];return next})}
 return <><DashTitle label="VENDOR STUDIO / ORDERS" title="Orders & fulfillment" description={`Manage simulated orders for ${activeBooth.name}. Switch the demo vendor in the sidebar to view another store.`} actions={<a href={link('/studio/shipping')} className="vb-outline-button"><Truck size={17}/> Shipping settings</a>}/>
 <DashNotice>Each demo vendor has its own orders. Only orders placed in this browser appear here. No real payments or shipments occur.</DashNotice>
 <div className="vb-dash-stats vb-dash-stats-3"><DashStat label="Demo orders" value={own.length} icon={ClipboardList}/><DashStat label="Preparing" value={own.filter(o=>['New','Processing'].includes(o.fulfillment)).length} icon={Package}/><DashStat label="Shipped" value={own.filter(o=>o.fulfillment==='Shipped').length} icon={Truck}/></div>
 <DashCard title={`${activeBooth.name} order queue`}>{own.length?<div className="vb-commerce-order-list">{own.map(o=><article className="vb-commerce-vendor-order" key={o.id}><div className="vb-commerce-row between"><div><span className="vb-eyebrow">{o.id}</span><h3>{o.items.map(x=>x.title+' × '+x.qty).join(', ')}</h3><p>{usdCents(o.totalCents)} · {o.paymentStatus}</p></div><span className="vb-commerce-status">{o.fulfillment}</span></div>
 <p className="vb-commerce-muted">Buyer destination (demo): {o.shipping?.city}, {o.shipping?.country} · {o.shippingMethod||'standard'} shipping</p>
 <div className="vb-commerce-order-fields"><label>Fulfillment<select value={editing[o.id]?.fulfillment??o.fulfillment} onChange={e=>set(o.id,'fulfillment',e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></label><label>Carrier<input value={editing[o.id]?.carrier??o.carrier} onChange={e=>set(o.id,'carrier',e.target.value)} placeholder="Example Courier"/></label><label>Tracking number<input value={editing[o.id]?.tracking??o.tracking} onChange={e=>set(o.id,'tracking',e.target.value)} placeholder="DEMO-12345"/></label></div>
 <button type="button" className="vb-outline-button" onClick={()=>save(o)}>Save demo status</button></article>)}</div>:
 <DashEmpty title="No orders for this vendor" description="Browse this vendor's products, add one to cart and complete the demo checkout. Then return to this workspace." action={<a href={link('/booth/'+activeVendorId)} className="vb-button">Browse {activeBooth.name}</a>}/>}</DashCard></>
}
export function VendorShippingSettings(){
 const {activeVendorId,activeBooth}=useDemo()
 const {shipping,updateShipping}=useCommerce()
 const [form,setForm]=useState(shipping),[saved,setSaved]=useState(false)
 // Key the form via the parent component to ensure it follows the selected vendor.
 const set=(k,v)=>{setForm(s=>({...s,[k]:v}));setSaved(false)}
 const save=e=>{e.preventDefault();updateShipping({...form,standardFee:Math.max(0,Number(form.standardFee)||0),expressFee:Math.max(0,Number(form.expressFee)||0)},activeVendorId);setSaved(true)}
 return <><DashTitle label="VENDOR STUDIO / SHIPPING" title="Shipping settings" description={`Configure demonstration shipping options for ${activeBooth.name}.`}/><DashNotice>No carrier is connected. Amounts are illustrative prices set for the prototype, not live courier quotes.</DashNotice>
 <DashCard title="Vendor-specific shipping profile"><form className="vb-commerce-form" onSubmit={save}><label>Shipping origin<input required value={form.from} onChange={e=>set('from',e.target.value)}/></label><label>Preparation time<input required value={form.handling} onChange={e=>set('handling',e.target.value)} placeholder="3–5 business days"/></label><label>Preferred delivery company (demo)<input value={form.carrier} onChange={e=>set('carrier',e.target.value)} placeholder="Example Courier"/></label>
 <div className="vb-commerce-form-grid"><label>Standard estimate (USD $)<input required min="0" max="9999" type="number" step="0.01" value={form.standardFee} onChange={e=>set('standardFee',e.target.value)}/></label><label>Express estimate (USD $)<input required min="0" max="9999" type="number" step="0.01" value={form.expressFee} onChange={e=>set('expressFee',e.target.value)}/></label></div>
 <label>Shipping policy<textarea rows={4} value={form.note} onChange={e=>set('note',e.target.value)}/></label><button className="vb-button" type="submit">Save shipping settings</button>{saved&&<p className="vb-commerce-success" role="status">Saved locally for {activeBooth.name}.</p>}</form></DashCard></>
}
export function VendorPaymentSettings(){
 const {activeBooth}=useDemo(),{payment}=useCommerce(),[intent,setIntent]=useState(false)
 return <><DashTitle label="VENDOR STUDIO / PAYMENTS" title="Payment account" description={`Payment connection roadmap for ${activeBooth.name}.`}/><DashNotice>Stripe Connect is planned for a later phase. Each vendor would need separate secure onboarding. No bank data, account keys, payments or payouts are handled here.</DashNotice>
 <DashCard title="Future provider connection"><div className="vb-commerce-provider"><CreditCard size={27}/><div><h3>Stripe Connect</h3><p>Vendor-specific account onboarding will require a secure backend, provider-approved marketplace account, eligible countries and verified webhooks.</p></div><span className="vb-commerce-status">{payment.status}</span></div>
 <button type="button" className="vb-outline-button" onClick={()=>setIntent(v=>!v)}><Lock size={16}/> {intent?'Hide':'View'} integration requirements</button>
 {intent&&<div className="vb-commerce-requirements"><h3>Implementation checklist</h3><ul><li>Account eligibility and vendor-country support.</li><li>Provider-hosted onboarding; never request bank details in this demo.</li><li>Backend payment intents / checkout sessions and signed webhooks.</li><li>Commission, refund, payout and dispute policies.</li><li>Carrier-provider API partnerships and shipping label/tracking integration.</li><li>Sandbox and security testing before activation.</li></ul><p>These features are not connected to a live payment or shipping provider.</p></div>}</DashCard></>
}
