import {createContext,useContext,useEffect,useState} from 'react'
import {booths} from '../data/catalog'
import {useDemo} from '../dashboard/DemoStore'

// Interactive browser-only demo. Never treat this as a payment processor, a real shipping quote or stock authority.
const KEY='voxbazaar-commerce-global-demo-v1'
const OLD_KEY='voxbazaar-commerce-demo-v1'
const originFor=id=>booths.find(b=>b.id===id)?.location||'Independent studio'
const defaults=id=>({from:originFor(id),handling:'3–5 business days',carrier:'Carrier selected by vendor',note:'Handmade products are packed with care.',standardFee:5,expressFee:12,shipsInternationally:true})
const initial={cart:[],orders:[],shippingByVendor:{},paymentByVendor:{},checkout:{name:'',email:'',address:'',city:'',region:'',postal:'',country:'',phone:'',shippingMethod:'standard'}}
const Context=createContext(null)
function read(){try{
 const saved=JSON.parse(localStorage.getItem(KEY)||localStorage.getItem(OLD_KEY)||'null')
 if(saved&&Array.isArray(saved.cart)&&Array.isArray(saved.orders))return {...initial,...saved,
  shippingByVendor:{...(saved.shipping?{'anyam-studio':saved.shipping}:{}),...(saved.shippingByVendor||{})},
  paymentByVendor:{...(saved.payment?{'anyam-studio':saved.payment}:{}),...(saved.paymentByVendor||{})},
  checkout:{...initial.checkout,...saved.checkout}}
 }catch{}return initial}
export const cents=n=>Math.round((Number(n)||0)*100)
export const usdCents=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format((Number(n)||0)/100)
export function CommerceProvider({children}){
 const {activeVendorId}=useDemo()
 const [store,setStore]=useState(read)
 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(store))}catch{}},[store])
 const shippingFor=id=>({...defaults(id),...(store.shippingByVendor[id]||{})})
 const paymentFor=id=>({provider:'Stripe Connect (future integration)',status:'Not connected',...(store.paymentByVendor[id]||{})})
 const activeVendorShipping=shippingFor(activeVendorId)
 const activeVendorPayment=paymentFor(activeVendorId)
 const cart=store.cart
 const cartVendorId=cart[0]?.vendorId
 const cartShipping=cartVendorId?shippingFor(cartVendorId):defaults('anyam-studio')
 const shippingOption=store.checkout.shippingMethod==='express'?'express':'standard'
 const shippingFeeCents=cents(cartShipping[shippingOption==='express'?'expressFee':'standardFee'])
 const addProduct=(product,qty=1)=>{
  if(product.status&&product.status!=='Published')return {ok:false,reason:'This product is not currently published.'}
  if(product.stock===0)return {ok:false,reason:'This item is currently out of stock.'}
  const vendorId=product.vendorId
  if(!vendorId)return {ok:false,reason:'This product is missing a vendor.'}
  if(cart.length&&cart[0].vendorId!==vendorId)return {ok:false,reason:'This walkthrough supports one vendor per checkout. Complete or clear your bag before purchasing from another vendor.'}
  setStore(s=>({...s,cart:s.cart.some(x=>x.id===product.id)
   ?s.cart.map(x=>x.id===product.id?{...x,qty:Math.min(product.stock??99,99,x.qty+qty)}:x)
   :[...s.cart,{id:product.id,title:product.title,priceCents:cents(product.price),image:product.image||'',vendorId,qty:Math.min(qty,product.stock??99)}]}))
  return {ok:true}
 }
 const setQty=(id,qty)=>setStore(s=>({...s,cart:s.cart.map(x=>x.id===id?{...x,qty:Math.min(99,Math.max(0,qty))}:x).filter(x=>x.qty>0)}))
 const clearCart=()=>setStore(s=>({...s,cart:[]}))
 const placeDemoOrder=({shipping,paymentMethod})=>{
  if(!store.cart.length||!shipping?.name||!shipping?.city||!shipping?.country)return null
  const subtotalCents=store.cart.reduce((a,x)=>a+x.priceCents*x.qty,0)
  const vendor=store.cart[0].vendorId
  const fee=cents(shippingFor(vendor)[shippingOption==='express'?'expressFee':'standardFee'])
  const order={id:`VB-DEMO-${Date.now()}-${Math.floor(Math.random()*999)}`,placedAt:new Date().toISOString(),items:store.cart.map(x=>({...x})),vendorId:vendor,
   shipping:{...shipping},shippingMethod:shippingOption,shippingCents:fee,subtotalCents,totalCents:subtotalCents+fee,
   paymentMethod,paymentStatus:'Demo only — no charge',fulfillment:'New',tracking:'',carrier:'',notes:[]}
  setStore(s=>({...s,orders:[order,...s.orders],cart:[],checkout:{...initial.checkout}}))
  return order.id
 }
 const updateOrder=(id,fields)=>setStore(s=>({...s,orders:s.orders.map(o=>o.id===id?{...o,...fields}:o)}))
 const updateCheckout=patch=>setStore(s=>({...s,checkout:{...s.checkout,...patch}}))
 const updateShipping=(patch,vendorId=activeVendorId)=>setStore(s=>({...s,shippingByVendor:{...s.shippingByVendor,[vendorId]:{...defaults(vendorId),...s.shippingByVendor[vendorId],...patch}}}))
 const updatePayment=(patch,vendorId=activeVendorId)=>setStore(s=>({...s,paymentByVendor:{...s.paymentByVendor,[vendorId]:{...s.paymentByVendor[vendorId],...patch}}}))
 const resetCommerce=()=>setStore({...initial,checkout:{...initial.checkout},cart:[],orders:[],shippingByVendor:{},paymentByVendor:{}})
 return <Context.Provider value={{cart,orders:store.orders,shipping:activeVendorShipping,payment:activeVendorPayment,checkout:store.checkout,cartVendorId,cartShipping,shippingFeeCents,shippingFor,paymentFor,updateCheckout,addProduct,setQty,clearCart,placeDemoOrder,updateOrder,updateShipping,updatePayment,resetCommerce}}>{children}</Context.Provider>
}
export function useCommerce(){const value=useContext(Context);if(!value)throw new Error('CommerceProvider is required');return value}
