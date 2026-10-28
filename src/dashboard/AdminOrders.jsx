import {useState} from 'react'
import {ClipboardList,CreditCard,Package,Truck,ArrowDownToLine} from 'lucide-react'
import {DashCard,DashEmpty,DashNotice,DashStat,DashTitle} from './DashboardShell'
import {useCommerce,usdCents} from '../commerce/CommerceStore'
import {useDemo,downloadCSV} from './DemoStore'
export function AdminOrders(){
 const {orders}=useCommerce(),{allBooths}=useDemo()
 const [vendorId,setVendorId]=useState('all'),[status,setStatus]=useState('all')
 const shown=orders.filter(o=>(vendorId==='all'||o.vendorId===vendorId)&&(status==='all'||o.fulfillment===status))
 const allStatuses=['New','Processing','Ready to ship','Shipped','Delivered','Completed','Cancelled']
 return <><DashTitle label="ADMIN STUDIO / COMMERCE" title="Orders across vendors" description="A read-only view of simulated commerce activity for all maker booths." actions={<button className="vb-outline-button" type="button" onClick={()=>downloadCSV('voxbazaar-orders-demo.csv',shown.map(o=>({id:o.id,vendorId:o.vendorId,placedAt:o.placedAt,fulfillment:o.fulfillment,paymentStatus:o.paymentStatus,totalCents:o.totalCents})))}><ArrowDownToLine size={17}/> Export demo CSV</button>}/>
 <DashNotice>Demo orders are stored only in this browser. There is no payment settlement, carrier booking, tracking feed, or customer verification.</DashNotice>
 <div className="vb-dash-stats vb-dash-stats-3"><DashStat label="Demo orders" value={orders.length} icon={ClipboardList}/><DashStat label="Shipping in progress" value={orders.filter(o=>['Processing','Ready to ship','Shipped'].includes(o.fulfillment)).length} icon={Truck}/><DashStat label="Real payments" value="0" detail="Provider integration pending" icon={CreditCard}/></div>
 <DashCard title="Orders & shipping preview"><div className="vb-dash-toolbar"><label className="vb-dash-select">Vendor <select value={vendorId} onChange={e=>setVendorId(e.target.value)}><option value="all">All vendors</option>{allBooths.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></label><label className="vb-dash-select">Status <select value={status} onChange={e=>setStatus(e.target.value)}><option value="all">All statuses</option>{allStatuses.map(s=><option key={s}>{s}</option>)}</select></label></div>
 {shown.length?<div className="vb-dash-table-wrap"><table className="vb-dash-table"><thead><tr><th>Order</th><th>Vendor</th><th>Demo amount</th><th>Fulfillment</th><th>Delivery</th></tr></thead><tbody>{shown.map(o=><tr key={o.id}><td><b>{o.id}</b><small className="vb-dash-table-sub">{o.items.map(p=>p.title).join(', ')}</small></td><td>{allBooths.find(b=>b.id===o.vendorId)?.name||'Demo vendor'}</td><td>{usdCents(o.totalCents)}</td><td>{o.fulfillment}</td><td>{o.carrier||'Not assigned'}{o.tracking?' · '+o.tracking:''}</td></tr>)}</tbody></table></div>:<DashEmpty title="No matching demo orders" description="Use a vendor product to run a demo checkout, then return to the Admin Orders view." action={<a className="vb-button" href="#/products">Browse products</a>}/>}</DashCard></>
}
