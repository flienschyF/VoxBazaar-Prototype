import { Store, TriangleAlert, Users, Calendar, MapPin, Download, Check, Clock, Zap, Droplets, Leaf, ShieldCheck, LayoutGrid, FileText, Utensils, Images, MessageCircle, ArrowRight, Info, Award } from 'lucide-react'
import { go } from './../ui'

const stats = [['45,000+', 'Projected Footfall', 'Expected across all market days'], ['120', 'Curated Stalls', 'Hand-picked by the organizers'], ['$1.8M', 'Projected Sales', 'Combined across all stalls'], ['94%', 'Vendor Return', 'Vendors who rejoin every year']]
const timeline = [['Load-in & Setup', 'Day 1', 'Staggered load-in times to minimize congestion. Dedicated marshals on site.'], ['Market Days (Buka)', 'Day 2-4', 'Full operations with on-ground technical support dan kebersihan area.'], ['Teardown & Departure', 'Day 5', 'Orderly checkout and area inspection before the stall is released.']]
const utils = [[Zap, 'Power & Lighting', 'Standard outlet and basic lighting for every stall.'], [Droplets, 'Water Access', 'Shared water points near each food zone.'], [Leaf, 'Waste Management', 'Sorting bins and a zero single-use plastics policy.'], [ShieldCheck, 'Security & Support', 'On-ground security and technical support all day.']]
const zones = [['bg-primary', 'Zone A - Artisan', 'Standard & Corner'], ['bg-amber-500', 'Zone B - Gourmet', 'F&B with utilities'], ['bg-emerald-500', 'Zone C - Lifestyle', 'Standard booths']]
const reqs = [[FileText, 'Required', 'Business License', 'Izin usaha resmi dan sertifikat keamanan pangan (jika F&B).'], [Leaf, 'Required', 'Zero Single-Use Plastics', 'Wajib menggunakan kemasan ramah lingkungan sesuai regulasi event.'], [Utensils, 'F&B only', 'Food Safety Certificate', 'Sertifikat higiene dan sanitasi untuk semua vendor makanan dan minuman.'], [Images, 'Required', 'Brand Assets & Photos', 'Logo dan foto produk berkualitas tinggi untuk profil vendor kamu.'], [ShieldCheck, 'Required', 'Safety Compliance', 'Patuhi aturan keselamatan area: alat pemadam, kabel, dan kapasitas stand.']]
const pkgs = [
  { tag: 'For artisans', name: 'Standard Booth', size: '2x2 m', price: '$650', desc: 'Ideal untuk artisan dan bisnis rintisan dengan space 2x2 meter.', cta: 'Pilih Standard', items: ['2x2 meter booth space', 'Table and two chairs', 'One power outlet', 'Listing in the vendor directory'] },
  { tag: 'Best visibility', name: 'Premium Corner', size: '3x3 m', price: '$1,150', desc: 'Posisi strategis di sudut area utama, ukuran 3x3 meter dengan eksposur tinggi.', cta: 'Pilih Premium', hot: true, items: ['3x3 meter corner space', 'Prime position in the main area', 'Enhanced lighting and signage', 'Featured on official social media', 'Priority load-in slot'] },
  { tag: 'Heavy F&B', name: 'Gourmet Stall', size: '4x3 m', price: '$1,400', desc: 'Khusus F&B berat. Space luas 4x3 meter, sudah termasuk instalasi air & listrik ekstra.', cta: 'Pilih Gourmet', items: ['4x3 meter stall space', 'Water and extra power installation', 'Dedicated waste sorting station', 'Listing in the food directory'] },
]
const steps = ['Daftar Akun', 'Submit Profil', 'Review Panitia', 'Load-In & Jualan']

const Sec = ({ bg = '', children }) => <section className={bg}><div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8 md:py-14">{children}</div></section>
const Eyebrow = ({ children, c }) => <p className={`mb-2 text-[11px] font-bold uppercase tracking-widest text-primary ${c ? 'text-center' : ''}`}>{children}</p>
const H2 = ({ children, c }) => <h2 className={`text-2xl font-bold tracking-tight md:text-3xl ${c ? 'text-center' : ''}`}>{children}</h2>
const Card = ({ className = '', ...p }) => <div {...p} className={`rounded-xl border border-[#ECE9F6] bg-white p-5 md:p-6 ${className}`} />
const Primary = ({ className = '', ...p }) => <button {...p} className={`h-11 rounded-md bg-primary px-5 text-sm font-bold text-white ${className}`} />
const Logo = ({ s = 22 }) => <span className="grid place-items-center rounded-md bg-primary text-white" style={{ width: s, height: s }}><Store size={s * 0.6} /></span>

export default function Landing() {
  return (
    <div>
      <nav className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3.5 md:px-8">
          <div className="flex items-center gap-2.5"><Logo s={28} /><div><b className="block text-base leading-tight tracking-tight text-primary">VoxBazaar</b><span className="hidden text-[10px] leading-tight text-gray-400 md:block">Semiramis Bazaar 2027</span></div></div>
          <div className="hidden gap-8 text-sm font-medium text-gray-500 md:flex">{['Overview', 'Logistics', 'Requirements', 'Pricing'].map((l, i) => <a key={l} className={i ? '' : 'text-primary'}>{l}</a>)}</div>
          <div className="flex items-center gap-2"><button onClick={() => go('/login')} className="px-2 text-sm font-semibold text-primary">Sign in</button><Primary onClick={() => go('/register')} className="h-10 text-xs">Become a Vendor</Primary></div>
        </div>
      </nav>
      <div className="border-b border-amber-100 bg-amber-50"><div className="mx-auto flex max-w-[1280px] items-center gap-2 px-5 py-2.5 text-xs font-semibold text-amber-800 md:px-8"><TriangleAlert size={16} className="text-amber-600" /><span className="flex-1">Registrasi vendor untuk Batch 1 ditutup dalam 5 hari!</span><button onClick={() => go('/register')} className="hidden items-center gap-1 font-bold sm:flex">Daftar sekarang<ArrowRight size={12} /></button></div></div>

      <Sec bg="bg-surface">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 md:mb-7">
          <div className="flex items-center gap-2 text-xs font-bold"><Logo s={18} />VoxBazaar<span className="ml-2 rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] text-green-700">Registration Open</span></div>
          <div className="hidden gap-5 text-[11px] text-gray-500 sm:flex"><span className="flex items-center gap-1.5"><Calendar size={13} className="text-primary" />4-day market, load-in on Day 1</span><span className="flex items-center gap-1.5"><MapPin size={13} className="text-primary" />Venue details shared after approval</span></div>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[760px] flex-1">
            <Eyebrow>Semiramis Bazaar 2027</Eyebrow>
            <h1 className="mb-3.5 text-[34px] font-bold leading-10 tracking-tight lg:text-[44px] lg:leading-[52px]">The Premier Curated Artisan & Gourmet Market Experience</h1>
            <p className="text-base leading-relaxed text-gray-500">Bergabunglah bersama ratusan tenant terpilih di ajang pameran dan bazaar kuliner terbesar tahun ini dengan pengunjung yang diprediksi membludak.</p>
          </div>
          <div className="flex w-full flex-col gap-2.5 lg:w-[280px]">
            <Primary onClick={() => go('/register')} className="w-full">Become a Vendor</Primary>
            <button className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white text-sm font-bold text-gray-800"><Download size={16} />Download Vendor Kit</button>
          </div>
        </div>
        <div className="relative mt-6 grid aspect-[1.2] w-full place-items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-100 md:mt-7 lg:aspect-[2.05]">
          <div className="text-center text-xs font-medium text-gray-400"><Images size={48} className="mx-auto mb-2" />Market Image Placeholder</div>
          <img src={`${import.meta.env.BASE_URL}hero.jpg`} alt="" className="absolute inset-0 size-full object-cover" onError={(e) => e.currentTarget.remove()} />
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 text-[11px] font-bold">
            <span className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white/95 px-3 py-1.5"><Users size={13} className="text-primary" />45,000+ Footfall</span>
            <span className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white/95 px-3 py-1.5"><Award size={13} className="text-primary" />Curated Vendors Only</span>
            <span className="flex items-center gap-1.5 rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-green-700"><Check size={13} />Batch 1 Registration Open</span>
          </div>
        </div>
      </Sec>

      <Sec>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:gap-16">
          <div className="lg:flex-[4]"><Eyebrow>Why Exhibit</Eyebrow><h3 className="text-xl font-bold leading-snug tracking-tight">Engineered for high-sales conversion & vendor prestige.</h3></div>
          <div className="space-y-3 text-sm leading-relaxed text-gray-500 lg:flex-[6]"><p>Every stall is placed on purpose. Zones are planned around visitor flow so that artisans, gourmet food and lifestyle brands each meet the crowd that is looking for them.</p><p>With clear logistics, on-site support, and a curated vendor mix, the market keeps its reputation and your brand gets the visibility it deserves.</p></div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{stats.map(([v, l, d]) => <Card key={l} className="border-[#EEEAF8] bg-surface"><b className="mb-1 block text-3xl tracking-tight text-primary">{v}</b><b className="block text-xs">{l}</b><span className="text-[11px] leading-snug text-gray-400">{d}</span></Card>)}</div>
      </Sec>

      <Sec bg="bg-[#F4F2FC]">
        <div className="mb-7"><Eyebrow>Logistics & Timeline</Eyebrow><H2>Precision-planned vendor operations</H2><p className="mt-2 text-sm text-gray-500">Everything you need to know before load-in day, all in one place.</p></div>
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="flex flex-col"><h4 className="mb-5 flex items-center gap-2 text-sm font-bold"><Clock size={18} className="text-primary" />Operational Timeline</h4>
            {timeline.map(([t, d, x]) => <div key={t} className="mb-4"><div className="mb-1 flex justify-between text-sm font-bold">{t}<span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] text-primary">{d}</span></div><p className="text-xs leading-relaxed text-gray-500">{x}</p></div>)}
            <div className="mt-auto flex justify-between border-t border-gray-100 pt-4 text-[11px]"><span className="text-gray-400">Full schedule sent after approval</span><b className="text-primary">View details</b></div></Card>
          <Card><h4 className="mb-5 flex items-center gap-2 text-sm font-bold"><Zap size={18} className="text-primary" />Included Utilities</h4>
            {utils.map(([I, t, x]) => <div key={t} className="mb-4 flex gap-3"><I size={15} className="mt-0.5 shrink-0 text-primary" /><div><b className="block text-xs">{t}</b><span className="text-[11px] leading-relaxed text-gray-500">{x}</span></div></div>)}</Card>
          <Card className="flex flex-col"><h4 className="mb-5 flex items-center justify-between text-sm font-bold"><span className="flex items-center gap-2"><LayoutGrid size={18} className="text-primary" />Zone Allocation</span><span className="text-[11px] text-primary">View floorplan</span></h4>
            <div className="mb-4 space-y-2 rounded-lg bg-[#EEF0FF] p-3">{zones.map(([c, n, t]) => <div key={n} className="flex items-center justify-between rounded-md border border-[#E4E7FB] bg-white px-3 py-2.5 text-[11px]"><span className="flex items-center gap-2 font-semibold"><i className={`size-2 rounded-full ${c}`} />{n}</span><span className="text-[10px] text-gray-400">{t}</span></div>)}</div>
            <p className="mb-5 text-[11px] leading-relaxed text-gray-500">Final stall placement is confirmed by the organizer after your application is reviewed.</p>
            <button className="mt-auto rounded-md bg-[#E4E7FB] py-3 text-xs font-bold text-primary">Request Zone Preference</button></Card>
        </div>
      </Sec>

      <Sec>
        <div className="mb-7 flex flex-col justify-between gap-3 lg:flex-row lg:items-end"><div><Eyebrow>Compliance</Eyebrow><H2>Mandatory Vendor Requirements</H2><p className="mt-2 text-sm text-gray-500">Prepare these documents before submitting your application.</p></div>
          <span className="flex w-fit items-center gap-1.5 rounded-md border border-[#E4E7FB] bg-[#F3F2FF] px-3 py-2 text-[11px] text-gray-600"><Info size={14} className="text-primary" />Documents are reviewed before approval</span></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reqs.map(([I, tg, t, x]) => <Card key={t} className="border-[#EEEAF8] bg-surface"><div className="mb-4 flex justify-between"><I size={22} className="text-primary" /><span className="text-[10px] font-medium text-gray-400">{tg}</span></div><b className="mb-1.5 block text-sm">{t}</b><p className="text-xs leading-relaxed text-gray-500">{x}</p></Card>)}
          <Card className="flex flex-col border-[#C7D2FE] bg-[#EEF0FF]"><b className="mb-3 flex items-center gap-2 text-sm text-primary"><MessageCircle size={20} />Need help with documents?</b><p className="mb-4 text-xs leading-relaxed text-gray-600">Our vendor support team can check your files before you submit.</p><b className="mt-auto flex items-center gap-1 text-xs text-primary">Contact vendor support<ArrowRight size={12} /></b></Card>
        </div>
      </Sec>

      <Sec bg="bg-[#F4F2FC]">
        <div className="mb-10 text-center"><Eyebrow c>Pilih Paket</Eyebrow><H2 c>Choose Your Exhibition Presence</H2><p className="mx-auto mt-2 max-w-[480px] text-sm text-gray-500">Transparent per-event pricing. Every package includes a place in the official vendor directory and on-ground support.</p></div>
        <div className="grid gap-7 lg:grid-cols-3 lg:gap-5">
          {pkgs.map((p) => (
            <Card key={p.name} className={`relative flex flex-col ${p.hot ? 'border-[1.5px] border-primary' : ''}`}>
              {p.hot && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Most Popular</span>}
              <div className="mb-5 flex justify-between"><div><span className="text-[11px] text-gray-400">{p.tag}</span><b className={`block text-base ${p.hot ? 'text-primary' : ''}`}>{p.name}</b></div><span className="h-fit rounded bg-indigo-50 px-2 py-1 text-[10px] font-bold text-primary">{p.size}</span></div>
              <div className="mb-3 flex items-end"><b className={`text-4xl tracking-tight ${p.hot ? 'text-primary' : ''}`}>{p.price}</b><span className="mb-1.5 ml-1 text-xs text-gray-400">/ event</span></div>
              <p className="mb-4 border-b border-gray-100 pb-4 text-xs leading-relaxed text-gray-500">{p.desc}</p>
              <b className="mb-3 text-[11px] text-gray-700">What's included</b>
              <ul className="mb-6 space-y-2">{p.items.map((i) => <li key={i} className="flex gap-2 text-[11px] leading-snug text-gray-600"><Check size={14} className="mt-px shrink-0 text-primary" />{i}</li>)}</ul>
              <div className="mt-auto border-t border-gray-100 pt-4"><button onClick={() => go('/register')} className={`h-10 w-full rounded-md text-xs font-bold ${p.hot ? 'bg-primary text-white' : 'border border-gray-200 bg-white text-gray-800'}`}>{p.cta}</button></div>
            </Card>
          ))}
        </div>
      </Sec>

      <Sec>
        <div className="mb-8 text-center"><Eyebrow c>How It Works</Eyebrow><H2 c>Four Steps to Semiramis 2027</H2><p className="mx-auto mt-2 max-w-[480px] text-sm text-gray-500">From creating your account to opening your stall, the process is short and clear.</p></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{steps.map((s, i) => <Card key={s} className="border-[#EEEAF8] bg-surface"><span className={`mb-4 grid size-8 place-items-center rounded-full text-sm font-bold ${i ? 'bg-indigo-100 text-primary' : 'bg-primary text-white'}`}>{i + 1}</span><b className="mb-1.5 block text-sm">{s}</b><p className="text-xs leading-relaxed text-gray-500">Lengkapi data dan ikuti prosedur agar stand bazaar kamu siap beroperasi dengan lancar.</p></Card>)}</div>
      </Sec>

      <Sec bg="bg-[#F4F2FC]">
        <Card className="flex flex-col gap-6 !p-6 lg:flex-row lg:items-center lg:justify-between lg:!p-10">
          <div className="max-w-[720px]"><b className="mb-2 block text-[11px] text-primary">Batch 1 closes in 5 days</b><h3 className="mb-2 text-2xl font-bold leading-[30px] tracking-tight lg:text-[28px] lg:leading-[34px]">Ready to showcase your craft at Semiramis Bazaar 2027?</h3><p className="text-sm text-gray-500">Jangan lewatkan kesempatan emas ini. Slot sangat terbatas.</p></div>
          <Primary onClick={() => go('/register')} className="w-full lg:w-[180px]">Apply Now</Primary>
        </Card>
      </Sec>

      <footer className="bg-[#F1EFFD]"><div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 px-5 py-7 md:px-8 lg:flex-row lg:py-8">
        <div className="max-w-[360px]"><b className="mb-2 flex items-center gap-2 text-sm"><Logo s={18} />VoxBazaar</b><p className="mb-3 text-[11px] leading-relaxed text-gray-500">The vendor and bazaar management platform behind Semiramis Bazaar 2027.</p><p className="text-[11px] text-gray-400">© 2026 VoxBazaar. All rights reserved.</p></div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] text-gray-500">{['Vendor Terms', 'Privacy Policy', 'Safety Guidelines', 'Contact Organizer', 'Help Center'].map((l) => <a key={l}>{l}</a>)}</div>
      </div></footer>
    </div>
  )
}
