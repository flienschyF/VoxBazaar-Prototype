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
  { id:'kaca-pagi', name:'Kaca Pagi Studio', location:'Surabaya, Indonesia', category:'glass', image:photo('desktopBooths',7), avatar:photo('desktopBooths',6), description:'Small-batch glasswork exploring light, texture, and everyday ritual.', tag:'Glass & objects' },
  { id:'kulit-bumi', name:'Kulit Bumi Goods', location:'Jakarta, Indonesia', category:'leather', image:photo('desktopBooths',8), avatar:photo('desktopHome',7), description:'Hand-cut leather accessories designed for everyday use and repair.', tag:'Leather goods' }
]

export const products = [
  { id:'tenmoku-bowl', title:'Tenmoku Glazed Tea Bowl', vendorId:'kusuma-pottery', category:'ceramics', price:28, image:photo('desktopHome',10), description:'A hand-thrown stoneware bowl with a deep, expressive glaze. A considered piece for daily rituals.', materials:'Stoneware clay, mineral glaze', available:true },
  { id:'teak-serving-bowl', title:'Hand-carved Teak Serving Bowl', vendorId:'bengkel-kayu', category:'woodwork', price:42, image:photo('desktopHome',11), description:'Carved from teak wood, finished by hand to bring out the grain.', materials:'Teak wood, food-safe finish', available:true },
  { id:'indigo-runner', title:'Handspun Indigo Ikat Runner', vendorId:'tenun-alami', category:'textiles', price:54, image:photo('desktopHome',12), description:'Handwoven textile in natural indigo tones with a subtle, irregular character.', materials:'Cotton, natural indigo', available:true },
  { id:'brass-dripper', title:'Hammered Brass Dripper Stand', vendorId:'studio-oribe', category:'metal', price:37, image:photo('desktopHome',13), description:'A carefully made brass stand with a lightly hammered surface.', materials:'Brass', available:true },
  { id:'hinoki-tray', title:'Hand-Carved Hinoki Tray', vendorId:'bengkel-kayu', category:'woodwork', price:45, image:photo('desktopProducts',2), description:'A compact, handmade tray that shows the natural character of timber.', materials:'Hinoki wood', available:true },
  { id:'linen-scarf', title:'Indigo Dip-Dyed Linen Scarf', vendorId:'tenun-alami', category:'textiles', price:39, image:photo('desktopProducts',3), description:'Soft linen finished with an individual indigo-dye pattern.', materials:'Linen, indigo', available:true },
  { id:'brass-vessel', title:'Hammered Brass Vessel', vendorId:'studio-oribe', category:'metal', price:32, image:photo('desktopProducts',4), description:'A small polished vessel with hand-worked details.', materials:'Brass', available:true },
  { id:'terracotta-crock', title:'Terracotta Fermentation Crock', vendorId:'kusuma-pottery', category:'ceramics', price:36, image:photo('desktopProducts',5), description:'A simple terracotta crock inspired by traditional storage forms.', materials:'Terracotta', available:true },
  { id:'walnut-stand', title:'Hand-Planed Walnut Stand', vendorId:'bengkel-kayu', category:'woodwork', price:68, image:photo('desktopProducts',6), description:'Solid walnut shaped by hand with a warm, tactile finish.', materials:'Walnut', available:true },
  { id:'raw-silk', title:'Handspun Raw Silk Throw', vendorId:'tenun-alami', category:'textiles', price:88, image:photo('desktopProducts',7), description:'A substantial woven throw with a soft, organic texture.', materials:'Raw silk', available:true },
  { id:'celadon-pourer', title:'Celadon Porcelain Pourer', vendorId:'studio-oribe', category:'ceramics', price:34, image:photo('desktopProducts',8), description:'A functional little pourer with a muted celadon glaze.', materials:'Porcelain', available:true },
  { id:'woven-rattan-tray', title:'Handwoven Rattan Serving Tray', vendorId:'anyam-studio', category:'basketry', price:34, image:photo('desktopProducts',9), description:'A handwoven tray made with natural rattan for everyday use.', materials:'Natural rattan', available:true },
  { id:'pandan-market-tote', title:'Pandan Market Tote', vendorId:'anyam-studio', category:'basketry', price:46, image:photo('desktopProducts',10), description:'A durable handwoven pandan tote with a simple structured shape.', materials:'Pandan fibre', available:true },
  { id:'rattan-planter', title:'Rattan Planter Cover', vendorId:'anyam-studio', category:'basketry', price:29, image:photo('desktopProducts',11), description:'A woven planter cover for indoor pots.', materials:'Rattan fibre', available:true },
  { id:'woven-coasters', title:'Set of Four Woven Coasters', vendorId:'anyam-studio', category:'basketry', price:18, image:photo('desktopProducts',12), description:'Four handwoven coasters made from plant fibres.', materials:'Pandan fibre', available:true },
  { id:'natural-fibre-basket', title:'Natural Fibre Storage Basket', vendorId:'anyam-studio', category:'basketry', price:57, image:photo('desktopProducts',13), description:'An open-top handwoven basket for household storage.', materials:'Rattan and reed', available:true },
  { id:'mini-rattan-pouch', title:'Mini Rattan Pouch', vendorId:'anyam-studio', category:'basketry', price:24, image:photo('desktopProducts',14), description:'A pocket-sized rattan pouch woven by hand.', materials:'Rattan', available:true },
  { id:'batik-table-napkins', title:'Batik Cotton Napkin Pair', vendorId:'batik-senja', category:'batik', price:26, image:photo('desktopProducts',15), description:'Two cotton napkins with individually applied batik patterns.', materials:'Cotton, wax resist dye', available:true },
  { id:'batik-scarf', title:'Indigo Batik Cotton Scarf', vendorId:'batik-senja', category:'batik', price:48, image:photo('desktopDetail',1), description:'A light cotton scarf made using traditional resist-dye techniques.', materials:'Cotton', available:true },
  { id:'linen-pouch', title:'Natural Linen Zipper Pouch', vendorId:'tenun-alami', category:'textiles', price:22, image:photo('desktopDetail',2), description:'A practical fabric pouch finished with a sewn zipper.', materials:'Linen', available:true },
  { id:'ikat-cushion', title:'Handwoven Ikat Cushion Cover', vendorId:'tenun-alami', category:'textiles', price:59, image:photo('desktopDetail',3), description:'A cotton cushion cover featuring a small-batch woven pattern.', materials:'Handwoven cotton', available:true },
  { id:'stoneware-cup', title:'Speckled Stoneware Cup', vendorId:'kusuma-pottery', category:'ceramics', price:33, image:photo('desktopDetail',4), description:'A comfortable daily cup, hand-thrown and glazed.', materials:'Stoneware', available:true },
  { id:'unglazed-vase', title:'Matte Ceramic Bud Vase', vendorId:'kusuma-pottery', category:'ceramics', price:41, image:photo('desktopDetail',5), description:'A minimalist hand-shaped vase for a single stem.', materials:'Clay, satin glaze', available:true },
  { id:'wooden-spoons', title:'Carved Teak Cooking Spoon Set', vendorId:'bengkel-kayu', category:'woodwork', price:31, image:photo('desktopDetail',6), description:'A pair of hand-carved wooden kitchen spoons.', materials:'Teak wood', available:true },
  { id:'reclaimed-bookends', title:'Reclaimed Wood Bookends', vendorId:'bengkel-kayu', category:'woodwork', price:44, image:photo('desktopDetail',7), description:'Two bookends made from reclaimed timber offcuts.', materials:'Reclaimed hardwood', available:true },
  { id:'glass-candleholder', title:'Hand-blown Glass Candle Holder', vendorId:'kaca-pagi', category:'glass', price:38, image:photo('desktopDetail',8), description:'A clear glass candleholder formed in small batches.', materials:'Glass', available:true },
  { id:'ribbed-glass-cup', title:'Ribbed Glass Tumbler', vendorId:'kaca-pagi', category:'glass', price:27, image:photo('desktopDetail',9), description:'A hand-finished tumbler with an understated ribbed surface.', materials:'Glass', available:true },
  { id:'leather-cardholder', title:'Hand-stitched Leather Cardholder', vendorId:'kulit-bumi', category:'leather', price:49, image:photo('desktopDetail',10), description:'A slim cardholder stitched by hand with a repairable construction.', materials:'Leather, waxed thread', available:true },
  { id:'leather-keyring', title:'Leather Key Fob', vendorId:'kulit-bumi', category:'leather', price:16, image:photo('desktopDetail',11), description:'A compact leather key fob with a brass split ring.', materials:'Leather, brass', available:true },
  { id:'brass-earrings', title:'Small Hammered Brass Earrings', vendorId:'studio-oribe', category:'metal', price:25, image:photo('desktopDetail',12), description:'Simple lightweight earrings with a hand-worked finish.', materials:'Brass', available:true },
  { id:'ceramic-incense-holder', title:'Ceramic Incense Dish', vendorId:'studio-oribe', category:'ceramics', price:21, image:photo('desktopDetail',13), description:'A small handmade dish designed to hold incense.', materials:'Glazed porcelain', available:true }
]

export const projects = [
  { id:'indigo-revival', title:'Sumba Natural Indigo Revival', author:'Tenun Alami Studio', boothId:'tenun-alami', image:photo('desktopHome',20), category:'Natural Dyes', description:'Exploring local dye plants and the role of weaving traditions in everyday craft.' },
  { id:'volcanic-clay', title:'Mount Merapi Volcanic Ash Clay Experiments', author:'Kusuma Pottery Atelier', boothId:'kusuma-pottery', image:photo('desktopHome',21), category:'Material Study', description:'A clay study using volcanic minerals and locally tested firing approaches.' },
  { id:'ironwood', title:'Reclaimed Ironwood Canoe Restoration', author:'Bengkel Kayu Jati', boothId:'bengkel-kayu', image:photo('desktopHome',22), category:'Timber Recovery', description:'Exploring reuse and restoration to preserve useful materials and techniques.' },
  { id:'woodcraft-joinery', title:'Joinery Without Nails', author:'Bengkel Kayu Jati', boothId:'bengkel-kayu', image:photo('desktopProjects',3), category:'Woodcraft', description:'Traditional connections and patient work in contemporary furniture.' },
  { id:'natural-pigments', title:'The Language of Natural Pigments', author:'Batik Senja', boothId:'batik-senja', image:photo('desktopProjects',4), category:'Natural Dyes', description:'A visual journal of colour derived from locally available plants.' },
  { id:'woven-fibers', title:'Weaving Everyday Forms', author:'Anyam Studio', boothId:'anyam-studio', image:photo('desktopProjects',5), category:'Basketry', description:'New forms inspired by established basketry patterns.' },
  { id:'rattan-harvest', title:'Working with Rattan from Harvest to Weave', author:'Anyam Studio', boothId:'anyam-studio', image:photo('desktopProjects',6), category:'Basketry', description:'An illustrated study of selecting, drying and weaving rattan.' },
  { id:'glass-light', title:'A Study in Recycled Glass and Light', author:'Kaca Pagi Studio', boothId:'kaca-pagi', image:photo('desktopProjects',7), category:'Glasswork', description:'Exploring forms, transparency and responsible reuse of material.' },
  { id:'handstitched-details', title:'Why Hand Stitching Matters', author:'Kulit Bumi Goods', boothId:'kulit-bumi', image:photo('desktopProjects',8), category:'Leatherwork', description:'A closer look at the durability and character of hand-stitched leather.' }
]

export const usd = (value) => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(value) || 0)
export const boothById = (id) => booths.find(b=>b.id===id)
