import { useState } from 'react'
import { ArrowLeft, Lock, User, Eye, EyeOff } from 'lucide-react'

export const go = (p) => { location.hash = p }

export const GoogleLogo = () => (
  <svg width="22" height="22" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
)

// Kerangka halaman auth: lebar ponsel, di tengah layar saat dibuka di desktop
export function AuthShell({ title, children }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[440px] flex-col px-4 pb-6">
      <header className="flex items-center justify-between py-2.5">
        <div className="flex items-center gap-2">
          <button onClick={() => go('/')} aria-label="Back" className="grid size-11 place-items-center"><ArrowLeft size={24} /></button>
          <span className="text-lg font-semibold tracking-tight text-primary">
            VoxBazaar <span className="font-normal text-[#C7C4D8]">/</span> <b className="font-bold text-ink">{title}</b>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-soft px-3 py-1.5 text-[13px] font-medium text-muted"><Lock size={15} className="text-blue" />TLS 256</span>
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-white"><User size={18} /></span>
        </div>
      </header>
      {children}
    </div>
  )
}

export function Field({ label, right, icon, trail, className = '', ...input }) {
  return (
    <div className={className}>
      <div className="flex h-6 items-center justify-between">
        <label className="text-[15px] font-semibold">{label}</label>
        {right}
      </div>
      <div className="mt-px flex h-11 items-center gap-2 rounded-lg border border-[#EEF0FB] bg-white px-4 focus-within:border-primary">
        {icon}
        <input {...input} className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#9A98AC]" />
        {trail}
      </div>
    </div>
  )
}

export function PasswordField({ error, ...p }) {
  const [show, setShow] = useState(false)
  return (
    <Field {...p} type={show ? 'text' : 'password'} style={error ? { color: '#BA1A1A' } : undefined}
      trail={<button type="button" aria-label="Toggle password" onClick={() => setShow(!show)} className="text-muted">{show ? <Eye size={24} /> : <EyeOff size={24} />}</button>} />
  )
}

export const Btn = ({ light, className = '', ...p }) => (
  <button {...p} className={`flex h-11 w-full items-center justify-center gap-2 rounded-lg text-base font-semibold transition active:scale-[.99] ${light ? 'bg-white text-ink' : 'bg-primary text-white'} ${className}`} />
)

export const Seg = ({ value, onChange, options }) => (
  <div className="flex h-[52px] rounded-lg bg-soft p-1">
    {options.map(([k, label, Icon]) => (
      <button key={k} type="button" onClick={() => onChange(k)}
        className={`flex flex-1 items-center justify-center gap-2 rounded-md text-base font-semibold ${value === k ? 'bg-surface text-primary' : 'text-muted'}`}>
        <Icon size={20} />{label}
      </button>
    ))}
  </div>
)

export const Checkbox = ({ checked, onChange }) => (
  <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-[18px] shrink-0 accent-primary" />
)
