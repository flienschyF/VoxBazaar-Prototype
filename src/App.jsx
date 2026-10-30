import {useEffect,useState} from 'react'
import {Header,Footer,BottomNav} from './components/Layout'
import {Home,ExploreProducts,ExploreBooths,ExploreProjects} from './pages/Marketplace'
import {NotFound,ProductDetail,BoothDetail,ProjectDetail} from './pages/Details'
import {AccountPage,SellPage,SearchPage,InfoPage,DevStateSwitcher} from './pages/PrototypeTools'
import {DemoProvider,useDemo} from './dashboard/DemoStore'
import {CommerceProvider} from './commerce/CommerceStore'
import {CartPage,ShippingPage,PaymentPage,CompletePage,BuyerOrdersPage,VendorShippingSettings,VendorPaymentSettings} from './commerce/CommercePages'
import {DashboardShell} from './dashboard/DashboardShell'
import {VendorOverview,VendorProducts,VendorProductEditor,VendorProjects,VendorProjectEditor,VendorBooth,VendorAnalytics,VendorOrders,VendorSettings} from './dashboard/VendorPages'
import {AdminOverview,AdminVendors,AdminCatalog,AdminReports,AdminCategories,AdminAudit,AdminSettings} from './dashboard/AdminPages'
import {AdminOrders} from './dashboard/AdminOrders'
import {AccountHub,WishlistPage,NotificationsPage,OrdersInfo} from './dashboard/AccountPages'
import {LoginPage,RegisterPage,ForgotPasswordPage,VerifyEmailPage} from "./ux/VoxAccess";
const read=()=>{
 const hash=decodeURI(window.location.hash.slice(1)||'/')
 const [pathname,search='']=hash.split('?')
 return { pathname:pathname||'/', params:new URLSearchParams(search) }
}
export default function App(){return <DemoProvider><CommerceProvider><AppRouter/></CommerceProvider></DemoProvider>}
function GuestAccountRedirect() {
  useEffect(() => {
    window.location.hash = '#/login'
  }, [])

  return null
}
function AppRouter(){
 const {activeVendorId}=useDemo()
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
 else if(pathname==='/cart')page=<CartPage/>
 else if(pathname==='/checkout/shipping')page=<ShippingPage/>
 else if(pathname==='/checkout/payment')page=<PaymentPage/>
 else if(pathname==='/checkout/complete')page=<CompletePage id={params.get('id')}/>
 else if(pathname==='/studio')page=<VendorOverview key={activeVendorId+pathname}/>
 else if(pathname==='/studio/products')page=<VendorProducts key={activeVendorId+pathname}/>
 else if(pathname==='/studio/products/new')page=<VendorProductEditor key={activeVendorId+pathname}/>
 else if(pathname.startsWith('/studio/products/edit/'))page=<VendorProductEditor key={activeVendorId+pathname} id={pathname.split('/').pop()}/>
 else if(pathname==='/studio/projects')page=<VendorProjects key={activeVendorId+pathname}/>
 else if(pathname==='/studio/projects/new')page=<VendorProjectEditor key={activeVendorId+pathname}/>
 else if(pathname.startsWith('/studio/projects/edit/'))page=<VendorProjectEditor key={activeVendorId+pathname} id={pathname.split('/').pop()}/>
 else if(pathname==='/studio/booth')page=<VendorBooth key={activeVendorId+pathname}/>
 else if(pathname==='/studio/analytics')page=<VendorAnalytics key={activeVendorId+pathname}/>
 else if(pathname==='/studio/orders')page=<VendorOrders key={activeVendorId+pathname}/>
 else if(pathname==='/studio/shipping')page=<VendorShippingSettings key={activeVendorId+pathname}/>
 else if(pathname==='/studio/payments')page=<VendorPaymentSettings key={activeVendorId+pathname}/>
 else if(pathname==='/studio/settings')page=<VendorSettings key={activeVendorId+pathname}/>
 else if(pathname==='/admin')page=<AdminOverview/>
 else if(pathname==='/admin/vendors')page=<AdminVendors/>
 else if(pathname==='/admin/orders')page=<AdminOrders/>
 else if(pathname==='/admin/catalog')page=<AdminCatalog/>
 else if(pathname==='/admin/reports')page=<AdminReports/>
 else if(pathname==='/admin/categories')page=<AdminCategories/>
 else if(pathname==='/admin/audit')page=<AdminAudit/>
 else if(pathname==='/admin/settings')page=<AdminSettings/>
 else if(pathname==='/account')
  page=sessionStorage.getItem('voxbazaar-preview-session')
    ? <AccountHub/>
    : <GuestAccountRedirect/>
 else if(pathname==='/account/wishlist')page=<WishlistPage/>
 else if(pathname==='/account/notifications')page=<NotificationsPage/>
 else if(pathname==='/account/orders')page=<BuyerOrdersPage/>
 else if(pathname==='/login')page=<LoginPage/>
 else if(pathname==='/register')page=<RegisterPage/>
 else if(pathname==='/forgot-password')page=<ForgotPasswordPage/>
 else if(pathname==='/verify-email')page=<VerifyEmailPage/>
 else if(pathname==='/about'||pathname==='/help')page=<InfoPage which={pathname.slice(1)}/>
 else page=<NotFound/>
 if(['/login','/register','/forgot-password','/verify-email'].includes(pathname)){
  return page
}
 if(pathname.startsWith('/studio')||pathname.startsWith('/admin'))return <DashboardShell key={pathname.startsWith('/admin')?'admin':'vendor'} admin={pathname.startsWith('/admin')} pathname={pathname} state={state}>{page}</DashboardShell>
 return <div className="vb-app"><a className="vb-skip-link" href="#main">Skip to main content</a><Header pathname={pathname}/><main id="main" tabIndex="-1" className="vb-main">{page}</main><Footer/><BottomNav pathname={pathname}/><DevStateSwitcher pathname={pathname} state={state}/></div>
}
