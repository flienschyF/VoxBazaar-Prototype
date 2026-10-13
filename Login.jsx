import { useState } from 'react'
import { Store, Building2, CircleAlert, Mail, Lock, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import { AuthShell, Field, PasswordField, Btn, Seg, Checkbox, GoogleLogo, go } from '../ui'
import { signIn } from '../prototype'

export default function Login() {
  const [f, setF] = useState({ role: 'vendor', id: '', pw: '', remember: true })
  const [err, setErr] = useState('')
  const [notice, setNotice] = useState('')
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr(''); setNotice('') }
  const idOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.id)
  const submit = (e) => {
    e.preventDefault()
    if (!idOk || !f.pw) return setErr('Enter a valid email address and your password.')
    const result = signIn(f.id, f.pw, f.role, f.remember)
    if (!result.ok) return setErr(result.message)
    location.hash = '/dashboard'
  }
  const socialDemo = (provider) => setNotice(`${provider} sign-in is a visual prototype only. Use the demo email and password below.`)

  return (
    <AuthShell title="Sign In">
      <div className="mt-5 grid size-12 place-items-center self-center rounded-xl bg-primary text-white"><Store size={26} /></div>
      <h1 className="mt-3 text-center text-[28px] font-bold leading-[34px] tracking-tight">Welcome back</h1>
      <p className="mt-1.5 text-center text-[15px] leading-5 text-muted">Sign in to manage your stalls, applications, and bazaar events.</p>
      <div className="mt-5"><Seg value={f.role} onChange={(role) => { setF({ ...f, role }); setErr(''); setNotice('') }} options={[[ 'vendor', 'Tenant / Vendor', Store ], [ 'organizer', 'Organizer', Building2 ]]} /></div>
      {err && <div role="alert" className="mt-5 flex items-start gap-3 rounded-lg bg-errbg p-4 text-err"><CircleAlert size={21} className="shrink-0" /><p className="text-sm leading-5">{err}</p></div>}
      {notice && <div role="status" className="mt-4 rounded-lg border border-[#D7D3FF] bg-white p-3 text-sm text-muted">{notice}</div>}
      <form onSubmit={submit}>
        <Field className="mt-5" label="Email address" type="email" value={f.id} onChange={set('id')} placeholder={f.role === 'vendor' ? 'you@business.com' : 'you@organization.com'} autoComplete="username" required icon={<Mail size={19} className="text-muted" />} right={idOk && <span className="text-xs font-medium text-blue">Email looks good</span>} trail={idOk && <CheckCircle2 size={20} className="text-blue" />} />
        <PasswordField className="mt-4" label="Password" value={f.pw} onChange={set('pw')} placeholder="Enter your password" autoComplete="current-password" required icon={<Lock size={19} className="text-muted" />} />
        <div className="mt-6 flex items-center justify-between text-sm"><label className="flex items-center gap-2"><Checkbox checked={f.remember} onChange={(remember) => setF({ ...f, remember })} />Remember me</label><button type="button" onClick={() => setNotice('Password reset is not connected to a server in this prototype. You can register a new local demo account or use the demo credentials below.')} className="font-semibold text-primary">Forgot password?</button></div>
        <Btn className="mt-6" type="submit">Sign in to VoxBazaar <ArrowRight size={18} /></Btn>
      </form>
      <div className="my-4 flex items-center gap-4 text-[12px] uppercase tracking-wider text-muted"><i className="h-px flex-1 bg-line" />or continue with<i className="h-px flex-1 bg-line" /></div>
      <Btn light type="button" onClick={() => socialDemo('Google')}><GoogleLogo />Continue with Google</Btn>
      <Btn light type="button" onClick={() => socialDemo('Apple')} className="mt-3"><span className="text-xl">●</span>Continue with Apple</Btn>
      <div className="mt-5 rounded-xl border border-[#E4E1F7] bg-white p-4 text-sm">
        <p className="mb-2 flex items-center gap-2 font-bold"><Sparkles size={16} className="text-primary" />Demo accounts</p>
        <p className="text-muted">Tenant: <button type="button" className="font-semibold text-primary" onClick={() => setF({ ...f, role: 'vendor', id: 'sarah@artisanbakery.com', pw: 'VoxDemo!2026' })}>sarah@artisanbakery.com</button></p>
        <p className="mt-1 text-muted">Organizer: <button type="button" className="font-semibold text-primary" onClick={() => setF({ ...f, role: 'organizer', id: 'alex@semiramis.events', pw: 'VoxDemo!2026' })}>alex@semiramis.events</button></p>
        <p className="mt-1 text-muted">Password for both: <code className="rounded bg-soft px-1.5 py-0.5">VoxDemo!2026</code></p>
      </div>
      <p className="mt-7 text-center text-sm text-muted">Don't have an account? <button onClick={() => go('/register')} className="font-semibold text-primary">Create account</button></p>
      <div className="mt-auto pt-10"><div className="border-t border-[#EAEDFF] pt-3.5 text-center text-xs text-muted"><p className="flex items-center justify-center gap-2"><ShieldCheck size={17} className="text-blue" />Prototype mode · no server connection</p><p className="mt-1 text-faint">Demo data is stored only in this browser.</p></div></div>
    </AuthShell>
  )
}
