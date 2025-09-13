
import { create } from "zustand";
import { nanoid } from "nanoid";
import { signup as backendSignup, login as backendLogin, getStores as backendGetStores } from "../services/BackendApi";

const LS_KEY = "storeforge_v1";

function load(){
  try{
    return JSON.parse(localStorage.getItem(LS_KEY)) || { users:[], currentUser:null, stores:{}, products:{} };
  }catch{ return { users:[], currentUser:null, stores:{}, products:{} }; }
}
function save(state){ localStorage.setItem(LS_KEY, JSON.stringify(state)); }

export const useApp = create((set, get) => ({
  ...load(),
  signup: async (email, password) => {
    const result = await backendSignup(email, password);
    const user = result.user;
    const next = { ...get(), currentUser: user };
    save(next); set(next);
    return user;
  },
  login: async (email, password) => {
    const result = await backendLogin(email, password);
    const user = result.user;
    const next = { ...get(), currentUser: user };
    save(next); set(next);
    return user;
  },
  fetchStores: async () => {
    const stores = await backendGetStores();
    set(state => ({ ...state, stores: stores.reduce((acc, s) => { acc[s.id] = s; return acc; }, {}) }));
    return stores;
  },
  logout(){
    const state = get(); const next = {...state, currentUser:null}; save(next); set(next);
  },
  createStore({name, subdomain, description, logoUrl}){
    const id = nanoid();
    const ownerId = get().currentUser?.id;
    const store = { id, ownerId, name, subdomain, description, logoUrl, theme:{ primary:'#7c5cff', secondary:'#18c6ff', layout:'grid' }, productIds:[] };
    const state = get(); state.stores[id] = store;
    const next = {...state, stores:{...state.stores} };
    save(next); set(next);
    return store;
  },
  updateStore(id, patch){
    const state = get();
    state.stores[id] = {...state.stores[id], ...patch};
    const next = {...state, stores:{...state.stores}}; save(next); set(next);
  },
  deleteStore(id){
    const state = get();
    delete state.stores[id];
    const p = {...state.products};
    Object.values(p).forEach(prod=>{ if(prod.storeId===id) delete p[prod.id]; });
    const next = {...state, stores:{...state.stores}, products:p}; save(next); set(next);
  },
  createProduct(storeId, prod){
    const id = nanoid();
    const product = { id, storeId, title: prod.title, price: Number(prod.price||0), image: prod.image || "", description: prod.description || "", inStock: prod.inStock ?? true, sku: prod.sku || id.slice(0,8) };
    const state = get();
    state.products[id] = product;
    state.stores[storeId].productIds.push(id);
    const next = {...state, products:{...state.products}, stores:{...state.stores}}; save(next); set(next);
    return product;
  },
  updateProduct(id, patch){
    const state = get();
    state.products[id] = {...state.products[id], ...patch};
    const next = {...state, products:{...state.products}}; save(next); set(next);
  },
  deleteProduct(id){
    const state = get();
    const prod = state.products[id];
    if(!prod) return;
    const s = state.stores[prod.storeId];
    s.productIds = s.productIds.filter(pid=>pid!==id);
    delete state.products[id];
    const next = {...state, stores:{...state.stores}, products:{...state.products}}; save(next); set(next);
  },
}));
