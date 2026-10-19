import {useEffect,useState} from 'react'
import {Header,Footer,BottomNav} from './components/Layout'
import {Home,ExploreProducts,ExploreBooths,ExploreProjects} from './pages/Marketplace'
import {NotFound,ProductDetail,BoothDetail,ProjectDetail} from './pages/Details'
import {AccountPage,StudioPage,SellPage,SearchPage,InfoPage,DevStateSwitcher} from './pages/PrototypeTools'
const read=()=>{
 const hash=decodeURI(window.location.hash.slice(1)||'/')
 const [pathname,search='']=hash.split('?')
 return { pathname:pathname||'/', params:new URLSearchParams(search) }
}
export default function App(){
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
 else if(pathname==='/studio')page=<StudioPage/>
 else if(pathname==='/account'||pathname==='/login'||pathname==='/register')page=<AccountPage/>
 else if(pathname==='/about'||pathname==='/help')page=<InfoPage which={pathname.slice(1)}/>
 else page=<NotFound/>
 return <div className="vb-app"><a className="vb-skip-link" href="#main">Skip to main content</a><Header pathname={pathname}/><main id="main" tabIndex="-1" className="vb-main">{page}</main><Footer/><BottomNav pathname={pathname}/><DevStateSwitcher pathname={pathname} state={state}/></div>
}
