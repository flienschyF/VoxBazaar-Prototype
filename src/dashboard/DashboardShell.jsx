import {BarChart3, Bell, BookOpen, ChartNoAxesColumn, ChevronDown, ClipboardCheck, ExternalLink, FileText, Flag, FolderKanban, Grid2X2, House, LayoutDashboard, ListChecks, Menu, Package, Search, Settings, ShieldCheck, SlidersHorizontal, Store, Tags, UserRoundCheck, Users, X} from 'lucide-react'
import {useState} from 'react'
import {useDemo} from './DemoStore'

const vendorNavigation=[
 {label:'Overview',url:'/studio',icon:LayoutDashboard},
 {label:'Products',url:'/studio/products',icon:Package},
 {label:'Projects',url:'/studio/projects',icon:FolderKanban},
 {label:'Booth appearance',url:'/studio/booth',icon:Store},
 {label:'Analytics',url:'/studio/analytics',icon:ChartNoAxesColumn},
 {label:'Orders (R2)',url:'/studio/orders',icon:ListChecks},
 {label:'Settings',url:'/studio/settings',icon:Settings},
]
const adminNavigation=[
 {label:'Overview',url:'/admin',icon:LayoutDashboard},
 {label:'Vendors & verification',url:'/admin/vendors',icon:UserRoundCheck},
 {label:'Content catalog',url:'/admin/catalog',icon:Package},
 {label:'Reports & moderation',url:'/admin/reports',icon:Flag},
 {label:'Categories',url:'/admin/categories',icon:Tags},
 {label:'Audit logs',url:'/admin/audit',icon:ClipboardCheck},
 {label:'Settings',url:'/admin/settings',icon:Settings},
]
export function DashboardShell({admin=false,pathname,state='default',children}){
 const [open,setOpen]=useState(false),[search,setSearch]=useState('')
 const {data}=useDemo()
 const nav=admin?adminNavigation:vendorNavigation
 const name=admin?'Admin Studio':'Vendor Studio'
 return <div className="vb-dash-shell">
   <a className="vb-skip-link" href="#dash-main">Skip to main content</a>
   <aside className={'vb-dash-sidebar '+(open?'is-open':'')} aria-label={name+' navigation'}>
    <div className="vb-dash-brand"><a href="#/" className="vb-dash-logo" aria-label="VoxBazaar homepage"><span className="vb-brand-icon" aria-hidden="true">V</span><strong>VoxBazaar</strong></a><span className="vb-dash-brand-caption">{name}</span><button type="button" onClick={()=>setOpen(false)} className="vb-dash-mobile-close" aria-label="Close sidebar"><X size={21}/></button></div>
    <div className="vb-dash-workspace"><span className="vb-dash-avatar">{admin?'A':'P'}</span><span><b>{admin?'Marketplace management':data.booth.name}</b><small>{admin?'Admin workspace':'Digital booth workspace'}</small></span><ChevronDown size={15}/></div>
    <p className="vb-dash-sidebar-title">WORKSPACE</p>
    <nav className="vb-dash-nav">{nav.map(({label,url,icon:Icon})=><a key={url} href={'#'+url} className={pathname===url?'active':''} aria-current={pathname===url?'page':undefined} onClick={()=>setOpen(false)}><Icon size={19}/><span>{label}</span></a>)}</nav>
    <div className="vb-dash-sidebar-bottom"><a href="#/products"><ExternalLink size={17}/>View marketplace</a><div className="vb-demo-flag"><ShieldCheck size={18}/><span>Interactive prototype<br/><small>Demo data · Browser only</small></span></div></div>
   </aside>
   {open&&<button className="vb-dash-scrim" aria-label="Close navigation" onClick={()=>setOpen(false)}/>}
   <div className="vb-dash-right">
    <header className="vb-dash-header"><button className="vb-dash-menu-button" onClick={()=>setOpen(true)} aria-label="Open navigation"><Menu size={22}/></button><div className="vb-dash-header-title"><b>{name}</b><small>{admin?'Manage the marketplace':'Manage your work'}</small></div><div className="vb-dash-header-spacer"/><label className="vb-dash-preview-state"><span>Preview state</span><select value={state} onChange={e=>{location.hash=pathname+(e.target.value==='default'?'':'?state='+e.target.value)}} aria-label="Dashboard preview state"><option value="default">Default</option><option value="loading">Loading</option><option value="empty">Empty</option><option value="error">Error</option><option value="offline">Offline</option><option value="no-permission">No permission</option></select></label><a className="vb-dash-header-link" href="#/" aria-label="Go to public marketplace"><Store size={17}/> Marketplace</a><a className="vb-dash-header-alert" href="#/account/notifications" aria-label="Notifications"><Bell size={20}/>{data.notifications.some(n=>n.unread)&&<span className="vb-dot"/>}</a><span className="vb-dash-avatar" aria-hidden="true">{admin?'A':'P'}</span></header>
    <main id="dash-main" tabIndex="-1" className="vb-dash-main"><div className="vb-dash-inner">{state==='default'?children:<DashPreviewState state={state} pathname={pathname}/>}</div></main>
   </div>
 </div>
}
export function DashTitle({label,title,description,actions}){return <div className="vb-dash-title"><div><span className="vb-dash-overline">{label}</span><h1>{title}</h1>{description&&<p>{description}</p>}</div>{actions&&<div className="vb-dash-actions">{actions}</div>}</div>}
export function DashCard({title,extra,children,className=''}){return <section className={'vb-dash-panel '+className}><div className="vb-dash-panel-heading"><h2>{title}</h2>{extra}</div>{children}</section>}
export function DashBadge({status}){const norm=String(status||'Draft').toLowerCase().replace(/\s+/g,'-');return <span className={'vb-dash-badge is-'+norm}><span aria-hidden="true" className="vb-dash-status-dot"/>{status}</span>}
export function DashStat({label,value,detail,icon:Icon}){return <div className="vb-dash-stat"><div className="vb-dash-stat-top"><span>{label}</span>{Icon&&<Icon size={18}/>}</div><strong>{value}</strong>{detail&&<small>{detail}</small>}</div>}
export function DashNotice({children}){return <div className="vb-dash-notice"><ShieldCheck size={17}/><span>{children}</span></div>}
export function DashEmpty({title,description,action}){return <div className="vb-dash-empty"><FolderKanban size={29}/><h3>{title}</h3><p>{description}</p>{action}</div>}
export function ConfirmModal({title,detail,confirmLabel='Confirm',danger=false,onConfirm,onClose}){return <div className="vb-modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="vb-modal" role="alertdialog" aria-modal="true" aria-labelledby="vb-confirm-title" aria-describedby="vb-confirm-body"><h2 id="vb-confirm-title">{title}</h2><p id="vb-confirm-body">{detail}</p><div className="vb-modal-buttons"><button className="vb-outline-button" onClick={onClose}>Cancel</button><button className={'vb-button '+(danger?'vb-danger':'')} onClick={()=>{onConfirm();onClose()}}>{confirmLabel}</button></div></section></div>}

function DashPreviewState({state,pathname}){
 if(state==='loading')return <><DashTitle label="STATE PREVIEW / LOADING" title="Loading workspace" description="Skeleton elements represent an asynchronous data fetch."/><div className="vb-dash-stats">{[0,1,2,3].map(i=><div key={i} className="vb-dash-stat vb-dash-loading"><span/><b/><small/></div>)}</div><div className="vb-dash-panel vb-dash-loading-large" aria-label="Loading example content"/></>
 const isOffline=state==='offline', isBlocked=state==='no-permission', isEmpty=state==='empty';
 const title=isOffline?'You are offline':isBlocked?'Access restricted':isEmpty?'Nothing to show yet':'Could not load this workspace';
 const desc=isOffline?'Check your connection and try again.':isBlocked?'A production dashboard would require verified role-based access. This is a simulated state.':isEmpty?'This is a simulated empty dashboard, not a change to your saved data.':'This is a simulated error state for UI review. No data was changed.';
 return <><DashTitle label="STATE PREVIEW / DEMO" title={title} description={desc}/><div className="vb-dash-panel"><DashEmpty title={title} description={desc} action={<a href={'#'+pathname} className="vb-button">Return to default</a>}/></div></>
}
