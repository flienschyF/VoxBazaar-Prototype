import {useEffect,useState} from 'react'
import {Header,Footer,BottomNav} from './components/Layout'
import {Home,ExploreProducts,ExploreBooths,ExploreProjects} from './pages/Marketplace'
import {NotFound,ProductDetail,BoothDetail,ProjectDetail} from './pages/Details'
import {AccountPage,SellPage,SearchPage,InfoPage,DevStateSwitcher} from './pages/PrototypeTools'
import {DemoProvider} from './dashboard/DemoStore'
import {DashboardShell} from './dashboard/DashboardShell'
import {VendorOverview,VendorProducts,VendorProductEditor,VendorProjects,VendorProjectEditor,VendorBooth,VendorAnalytics,VendorOrders,VendorSettings} from './dashboard/VendorPages'
import {AdminOverview,AdminVendors,AdminCatalog,AdminReports,AdminCategories,AdminAudit,AdminSettings} from './dashboard/AdminPages'
import {AccountHub,WishlistPage,NotificationsPage,OrdersInfo} from './dashboard/AccountPages'
const read=()=>{
 const hash=decodeURI(window.location.hash.slice(1)||'/')
 const [pathname,search='']=hash.split('?')
 return { pathname:pathname||'/', params:new URLSearchParams(search) }
}
export default function App(){return <DemoProvider><AppRouter/></DemoProvider>}
function AppRouter(){
 const [route,setRoute]=useState(read)
 useEffect(()=>{
  const sync=()=>{setRoute(read());window.scrollTo({top:0,behavior:'instant'})}
  window.addEventListener('hashchange',sync)
  return()=>window.removeEventListener('hashchange',sync)
 },[])
 const {pathname,params}=route, state=params.get('state')||'default'
 let page
 if(pathname==='/')page=<Home state={state}/>
 else if(pathname==='/products')page=<ExploreProducts key={window.location.hash.split('?')[0]} params={params} state={state}/>
 else if(pathname==='/booths')page=<ExploreBooths key={window.location.hash.split('?')[0]} params={params} state={state}/>
 else if(pathname==='/projects')page=<ExploreProjects key={window.location.hash.split('?')[0]} params={params} state={state}/>
 else if(pathname==='/search')page=<SearchPage key={window.location.hash} params={params}/>
 else if(pathname.startsWith('/product/'))page=<ProductDetail id={pathname.split('/')[2]}/>
 else if(pathname.startsWith('/booth/'))page=<BoothDetail id={pathname.split('/')[2]}/>
 else if(pathname.startsWith('/project/'))page=<ProjectDetail id={pathname.split('/')[2]}/>
 else if(pathname==='/sell')page=<SellPage/>
 else if(pathname==='/studio')page=<VendorOverview/>
 else if(pathname==='/studio/products')page=<VendorProducts/>
 else if(pathname==='/studio/products/new')page=<VendorProductEditor key='new-product'/>
 else if(pathname.startsWith('/studio/products/edit/'))page=<VendorProductEditor key={pathname} id={pathname.split('/').pop()}/>
 else if(pathname==='/studio/projects')page=<VendorProjects/>
 else if(pathname==='/studio/projects/new')page=<VendorProjectEditor key='new-project'/>
 else if(pathname.startsWith('/studio/projects/edit/'))page=<VendorProjectEditor key={pathname} id={pathname.split('/').pop()}/>
 else if(pathname==='/studio/booth')page=<VendorBooth/>
 else if(pathname==='/studio/analytics')page=<VendorAnalytics/>
 else if(pathname==='/studio/orders')page=<VendorOrders/>
 else if(pathname==='/studio/settings')page=<VendorSettings/>
 else if(pathname==='/admin')page=<AdminOverview/>
 else if(pathname==='/admin/vendors')page=<AdminVendors/>
 else if(pathname==='/admin/catalog')page=<AdminCatalog/>
 else if(pathname==='/admin/reports')page=<AdminReports/>
 else if(pathname==='/admin/categories')page=<AdminCategories/>
 else if(pathname==='/admin/audit')page=<AdminAudit/>
 else if(pathname==='/admin/settings')page=<AdminSettings/>
 else if(pathname==='/account')page=<AccountHub/>
 else if(pathname==='/account/wishlist')page=<WishlistPage/>
 else if(pathname==='/account/notifications')page=<NotificationsPage/>
 else if(pathname==='/account/orders')page=<OrdersInfo/>
 else if(pathname==='/login'||pathname==='/register')page=<AccountPage/>
 else if(pathname==='/about'||pathname==='/help')page=<InfoPage which={pathname.slice(1)}/>
 else page=<NotFound/>
 if(pathname.startsWith('/studio')||pathname.startsWith('/admin'))return <DashboardShell key={pathname.startsWith('/admin')?'admin':'vendor'} admin={pathname.startsWith('/admin')} pathname={pathname} state={state}>{page}</DashboardShell>
 return <div className="vb-app"><a className="vb-skip-link" href="#main">Skip to main content</a><Header pathname={pathname}/><main id="main" tabIndex="-1" className="vb-main">{page}</main><Footer/><BottomNav pathname={pathname}/><DevStateSwitcher pathname={pathname} state={state}/></div>
}
