import { useEffect, useState } from 'react'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const read = () => location.hash.slice(1) || '/'
export default function App() {
  const [path, setPath] = useState(read)
  useEffect(() => {
    const f = () => { setPath(read()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  if (path.startsWith('/dashboard')) return <Dashboard />
  if (path === '/register') return <Register />
  if (path === '/login') return <Login />
  return <Landing />
}
