import stitch from './stitchImages.json'

const photo = (key, n) => stitch[key]?.[n] || ''

// Demo-only content based on exported Stitch screens; not real shops or stock.
export const categories = [
  { slug:'ceramics', name:'Ceramics & Stoneware', short:'Ceramics', image:photo('desktopHome',2), count:'Hand-shaped objects' },
  { slug:'textiles', name:'Handwoven Textiles', short:'Textiles', image:photo('desktopHome',3), count:'Fabric & weaving' },
  { slug:'woodwork', name:'Woodwork & Joinery', short:'Woodwork', image:photo('desktopHome',4), count:'Thoughtful timbercraft' },
  { slug:'metal', name:'Metal & Brass', short:'Metalwork', image:photo('desktopHome',5), count:'Forged by hand' },
  { slug:'glass', name:'Glass & Objects', short:'Glasswork', image:photo('desktopHome',6), count:'Everyday sculpture' },
  { slug:'leather', name:'Leather Goods', short:'Leather', image:photo('desktopHome',7), count:'Made to last' },
  { slug:'basketry', name:'Natural Basketry', short:'Basketry', image:photo('desktopHome',8), count:'Woven with care' },
  { slug:'batik', name:'Batik & Natural Dye', short:'Batik', image:photo('desktopHome',9), count:'Colour with roots' },
]

export const booths = [
  { id:'tenun-alami', name:'Tenun Alami Studio', location:'Flores, NTT', category:'textiles', image:photo('desktopHome',15), avatar:photo('desktopHome',14), description:'Handwoven textiles, natural indigo, and stories from the loom.', tag:'Natural weaving' },
  { id:'kusuma-pottery', name:'Kusuma Pottery Atelier', location:'Ubud, Bali', category:'ceramics', image:photo('desktopHome',17), avatar:photo('desktopHome',16), description:'Slow-fired ceramics shaped by material, patience and the kiln.', tag:'Ceramics' },
  { id:'bengkel-kayu', name:'Bengkel Kayu Jati', location:'Blora, Central Java', category:'woodwork', image:photo('desktopHome',19), avatar:photo('desktopHome',18), description:'Reclaimed wood transformed into thoughtful everyday pieces.', tag:'Woodcraft' },
  { id:'studio-oribe', name:'Studio Oribe', location:'Bandung, West Java', category:'ceramics', image:photo('desktopBooths',1), avatar:photo('desktopBooths',0), description:'Small-batch bowls and cups with distinctive glazes.', tag:'Stoneware' },
  { id:'anyam-studio', name:'Anyam Studio', location:'Yogyakarta, Indonesia', category:'basketry', image:photo('desktopBooths',3), avatar:photo('desktopBooths',2), description:'Natural fibres and traditional patterns for modern homes.', tag:'Basketry' },
  { id:'batik-senja', name:'Batik Senja', location:'Solo, Central Java', category:'batik', image:photo('desktopBooths',5), avatar:photo('desktopBooths',4), description:'Contemporary objects rooted in the art of batik.', tag:'Natural dyes' },
]

export const products = [
  { id:'tenmoku-bowl', title:'Tenmoku Glazed Tea Bowl', vendorId:'kusuma-pottery', category:'ceramics', price:185000, image:photo('desktopHome',10), description:'A hand-thrown stoneware bowl with a deep, expressive glaze. A considered piece for daily rituals.', materials:'Stoneware clay, mineral glaze', available:true },
  { id:'teak-serving-bowl', title:'Hand-carved Teak Serving Bowl', vendorId:'bengkel-kayu', category:'woodwork', price:240000, image:photo('desktopHome',11), description:'Carved from teak wood, finished by hand to bring out the grain.', materials:'Teak wood, food-safe finish', available:true },
  { id:'indigo-runner', title:'Handspun Indigo Ikat Runner', vendorId:'tenun-alami', category:'textiles', price:380000, image:photo('desktopHome',12), description:'Handwoven textile in natural indigo tones with a subtle, irregular character.', materials:'Cotton, natural indigo', available:true },
  { id:'brass-dripper', title:'Hammered Brass Dripper Stand', vendorId:'studio-oribe', category:'metal', price:310000, image:photo('desktopHome',13), description:'A carefully made brass stand with a lightly hammered surface.', materials:'Brass', available:true },
  { id:'hinoki-tray', title:'Hand-Carved Hinoki Tray', vendorId:'bengkel-kayu', category:'woodwork', price:265000, image:photo('desktopProducts',2), description:'A compact, handmade tray that shows the natural character of timber.', materials:'Hinoki wood', available:true },
  { id:'linen-scarf', title:'Indigo Dip-Dyed Linen Scarf', vendorId:'tenun-alami', category:'textiles', price:325000, image:photo('desktopProducts',3), description:'Soft linen finished with an individual indigo-dye pattern.', materials:'Linen, indigo', available:true },
  { id:'brass-vessel', title:'Hammered Brass Vessel', vendorId:'studio-oribe', category:'metal', price:215000, image:photo('desktopProducts',4), description:'A small polished vessel with hand-worked details.', materials:'Brass', available:true },
  { id:'terracotta-crock', title:'Terracotta Fermentation Crock', vendorId:'kusuma-pottery', category:'ceramics', price:290000, image:photo('desktopProducts',5), description:'A simple terracotta crock inspired by traditional storage forms.', materials:'Terracotta', available:true },
  { id:'walnut-stand', title:'Hand-Planed Walnut Stand', vendorId:'bengkel-kayu', category:'woodwork', price:420000, image:photo('desktopProducts',6), description:'Solid walnut shaped by hand with a warm, tactile finish.', materials:'Walnut', available:true },
  { id:'raw-silk', title:'Handspun Raw Silk Throw', vendorId:'tenun-alami', category:'textiles', price:610000, image:photo('desktopProducts',7), description:'A substantial woven throw with a soft, organic texture.', materials:'Raw silk', available:true },
  { id:'celadon-pourer', title:'Celadon Porcelain Pourer', vendorId:'studio-oribe', category:'ceramics', price:260000, image:photo('desktopProducts',8), description:'A functional little pourer with a muted celadon glaze.', materials:'Porcelain', available:true },
]

export const projects = [
  { id:'indigo-revival', title:'Sumba Natural Indigo Revival', author:'Tenun Alami Studio', boothId:'tenun-alami', image:photo('desktopHome',20), category:'Natural Dyes', description:'Exploring local dye plants and the role of weaving traditions in everyday craft.' },
  { id:'volcanic-clay', title:'Mount Merapi Volcanic Ash Clay Experiments', author:'Kusuma Pottery Atelier', boothId:'kusuma-pottery', image:photo('desktopHome',21), category:'Material Study', description:'A clay study using volcanic minerals and locally tested firing approaches.' },
  { id:'ironwood', title:'Reclaimed Ironwood Canoe Restoration', author:'Bengkel Kayu Jati', boothId:'bengkel-kayu', image:photo('desktopHome',22), category:'Timber Recovery', description:'Exploring reuse and restoration to preserve useful materials and techniques.' },
  { id:'woodcraft-joinery', title:'Joinery Without Nails', author:'Bengkel Kayu Jati', boothId:'bengkel-kayu', image:photo('desktopProjects',3), category:'Woodcraft', description:'Traditional connections and patient work in contemporary furniture.' },
  { id:'natural-pigments', title:'The Language of Natural Pigments', author:'Batik Senja', boothId:'batik-senja', image:photo('desktopProjects',4), category:'Natural Dyes', description:'A visual journal of colour derived from locally available plants.' },
  { id:'woven-fibers', title:'Weaving Everyday Forms', author:'Anyam Studio', boothId:'anyam-studio', image:photo('desktopProjects',5), category:'Basketry', description:'New forms inspired by established basketry patterns.' },
]

export const rupiah = (value) => new Intl.NumberFormat('id-ID', {style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value).replace('Rp','Rp ')
export const boothById = (id) => booths.find(b=>b.id===id)
