import { useState } from 'react'
import { Store, Building2, CheckCircle2, Check, X, ArrowRight, Mail, Phone, UserRound, BadgeCheck, CircleAlert } from 'lucide-react'
import { AuthShell, Field, PasswordField, Btn, Seg, Checkbox, GoogleLogo, go } from '../ui'
import { registerUser } from '../prototype'

const RULES = [
  ['At least 8 characters', (p) => p.length >= 8],
  ['One uppercase letter and one number', (p) => /[A-Z]/.test(p) && /\d/.test(p)],
  ['One special character (!@#$%)', (p) => /[^A-Za-z0-9]/.test(p)],
]
export default function Register() {
  const [f, setF] = useState({ role: 'vendor', name: '', email: '', phone: '', business: '', pw: '', agree: false })
  const [tried, setTried] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setMessage(''); setSuccess(false) }
  const nameOk = f.name.trim().length > 1
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)
  const res = RULES.map(([, test]) => test(f.pw))
  const score = res.filter(Boolean).length + (f.pw.length >= 12 ? 1 : 0)
  const ok = nameOk && emailOk && f.phone.replace(/\D/g, '').length >= 7 && f.business.trim().length > 1 && res.every(Boolean) && f.agree
  const submit = (e) => {
    e.preventDefault(); setTried(true); setMessage('')
    if (!ok) return
    const result = registerUser({ name: f.name.trim(), email: f.email.trim(), phone: f.phone.trim(), business: f.business.trim(), password: f.pw, role: f.role })
    if (!result.ok) { setMessage(result.message); return }
    setSuccess(true)
  }
  const strength = ['', 'Weak', 'Fair', 'Strong', 'Very strong'][Math.min(score, 4)]

  return <AuthShell title="Sign Up">
    <span className="mt-4 flex h-6 w-fit items-center gap-1.5 rounded-full bg-line px-3 text-[12px] font-semibold text-primary"><BadgeCheck size={15} />VOXBAZAAR COMMUNITY</span>
    <h1 className="mt-3.5 text-[28px] font-bold leading-[34px] tracking-tight">Create your account</h1>
    <p className="mt-1.5 text-[15px] leading-5 text-muted">Get started with your vendor business or manage your own bazaar as an organizer.</p>
    {success ? <div className="mt-6 rounded-xl border border-emerald-200 bg-white p-5"><div className="mb-3 grid size-11 place-items-center rounded-full bg-emerald-50 text-emerald-700"><CheckCircle2 size={25} /></div><h2 className="text-lg font-bold">Account created!</h2><p className="mt-1 text-sm leading-5 text-muted">Your prototype account has been saved in this browser. Sign in using the email and password you just created.</p><Btn className="mt-5" onClick={() => go('/login')}>Continue to sign in <ArrowRight size={18} /></Btn><button className="mt-3 w-full text-sm font-semibold text-primary" onClick={() => { setF({ role: 'vendor', name: '', email: '', phone: '', business: '', pw: '', agree: false }); setSuccess(false); setTried(false) }}>Create another account</button></div> : <>
      <form onSubmit={submit}>
        <label className="mt-5 block text-sm font-semibold">Choose your account type</label>
        <div className="mt-2"><Seg value={f.role} onChange={(role) => setF({ ...f, role })} options={[[ 'vendor', 'Tenant / Vendor', Store ], [ 'organizer', 'Organizer', Building2 ]]} /></div>
        <Field className="mt-5" label="Full name" value={f.name} onChange={set('name')} placeholder="Your full name" autoComplete="name" required icon={<UserRound size={18} className="text-muted" />} />
        <Field className="mt-4" label="Email address" type="email" value={f.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" required icon={<Mail size={18} className="text-muted" />} right={emailOk && <span className="text-xs font-medium text-blue">Looks good</span>} trail={emailOk && <CheckCircle2 size={19} className="text-blue" />} />
        <Field className="mt-4" label="Business / organization name" value={f.business} onChange={set('business')} placeholder={f.role === 'vendor' ? 'Your shop or brand' : 'Your event organization'} required icon={<Store size={18} className="text-muted" />} />
        <Field className="mt-4" label="Phone number" type="tel" value={f.phone} onChange={set('phone')} placeholder="e.g. +62 812 3456 7890" autoComplete="tel" required icon={<Phone size={18} className="text-muted" />} />
        <PasswordField className="mt-4" label="Create password" value={f.pw} onChange={set('pw')} placeholder="Choose a secure password" autoComplete="new-password" required />
        <div className="mt-2 flex gap-1.5">{[1,2,3,4].map((i) => <i key={i} className={`h-1.5 flex-1 rounded-full ${i <= score ? 'bg-primary' : 'bg-line'}`} />)}</div>
        {f.pw && <p className="mt-1 text-xs font-semibold text-muted">Password strength: {strength}</p>}
        <ul className="mt-2 space-y-1 rounded-lg bg-white px-3 py-3">{RULES.map(([label], i) => <li key={label} className={`flex items-center gap-2 text-xs ${res[i] ? 'text-emerald-700' : 'text-muted'}`}><span className={`grid size-4 place-items-center rounded-full ${res[i] ? 'bg-emerald-50' : 'bg-soft'}`}>{res[i] ? <Check size={11} /> : f.pw ? <X size={11} className="text-err" /> : null}</span>{label}</li>)}</ul>
        <label className="mt-5 flex items-start gap-3 text-sm leading-5 text-muted"><span className="mt-0.5"><Checkbox checked={f.agree} onChange={(agree) => setF({ ...f, agree })} /></span><span>I agree to the <button type="button" onClick={() => setMessage('Terms of Service are represented as placeholder content for this prototype.')} className="font-semibold text-primary underline">Terms of Service</button> and <button type="button" onClick={() => setMessage('Privacy Policy is represented as placeholder content for this prototype.')} className="font-semibold text-primary underline">Privacy Policy</button>.</span></label>
        {tried && !ok && <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-err"><CircleAlert size={16} className="mt-0.5 shrink-0" />Please complete all fields, meet each password requirement, and accept the terms.</p>}
        {message && <p role="status" className="mt-3 rounded-lg bg-soft p-3 text-sm text-muted">{message}</p>}
        <Btn className="mt-6" type="submit">Create account <ArrowRight size={18} /></Btn>
      </form>
      <div className="my-4 flex items-center gap-4 text-xs text-muted"><i className="h-px flex-1 bg-line" />or continue with<i className="h-px flex-1 bg-line" /></div>
      <Btn light type="button" onClick={() => setMessage('Google sign-up is not connected to a server in this prototype. Please use the form above.')}><GoogleLogo />Continue with Google</Btn>
      <p className="mt-7 text-center text-sm text-muted">Already have an account? <button onClick={() => go('/login')} className="font-semibold text-primary">Sign in</button></p>
    </>}
    <p className="mb-2 mt-8 text-center text-xs text-faint">Prototype only · Account data stays in this browser</p>
  </AuthShell>
}
