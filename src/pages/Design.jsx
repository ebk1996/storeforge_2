
import { useParams, Link } from "react-router-dom";
import { useApp } from "../context/store";
import { useState } from "react";

export default function Design(){
  const { id } = useParams();
  const { stores, products, createProduct, updateProduct, deleteProduct, updateStore } = useApp();
  const store = stores[id];
  const [draft, setDraft] = useState(store?.theme || {primary:'#7c5cff', secondary:'#18c6ff', layout:'grid'});
  const prodList = (store?.productIds || []).map(pid=>products[pid]);

  if(!store) return <div className="container"><p className="badge">Store not found.</p></div>;

  function addProduct(e){
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = fd.get('title'); const price = fd.get('price'); const image = fd.get('image'); const description = fd.get('description');
    if(!title || !price) return alert('Title and price are required');
    createProduct(store.id, { title, price, image, description });
    e.currentTarget.reset();
  }

  return (
    <div className="container grid" style={{gap:16}}>
      <div className="toolbar">
        <h2 style={{marginRight:'auto'}}>Design: {store.name}</h2>
        <Link className="btn--ghost" to={`/preview/${store.id}`}>Preview</Link>
        <Link className="btn" to={`/publish/${store.id}`}>Export</Link>
      </div>

      <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
        <section className="card grid">
          <h3>Theme</h3>
          <label>Primary color</label>
          <input className="input" type="color" value={draft.primary} onChange={(e)=>setDraft(d=>({...d, primary:e.target.value}))} />
          <label>Secondary color</label>
          <input className="input" type="color" value={draft.secondary} onChange={(e)=>setDraft(d=>({...d, secondary:e.target.value}))} />
          <label>Layout</label>
          <select className="input" value={draft.layout} onChange={(e)=>setDraft(d=>({...d, layout:e.target.value}))}>
            <option value="grid">Grid</option>
            <option value="list">List</option>
            <option value="gallery">Gallery</option>
          </select>
          <div className="toolbar">
            <button className="btn" onClick={()=>updateStore(store.id, { theme: draft })}>Save theme</button>
          </div>
        </section>

        <section className="card grid">
          <h3>Add product</h3>
          <form className="grid" onSubmit={addProduct} style={{gap:8}}>
            <input className="input" name="title" placeholder="Title *" />
            <input className="input" name="price" placeholder="Price *" inputMode="decimal" />
            <input className="input" name="image" placeholder="Image URL" />
            <textarea className="input" rows="3" name="description" placeholder="Description" />
            <button className="btn" type="submit">Add product</button>
          </form>
        </section>
      </div>

      <section className="card grid">
        <h3>Products</h3>
        {prodList.length === 0 ? <p className="badge">No products yet.</p> : (
          <table className="table">
            <thead><tr><th>Image</th><th>Title</th><th>Price</th><th>SKU</th><th/></tr></thead>
            <tbody>
              {prodList.map(p => (
                <tr key={p.id}>
                  <td>{p.image ? <img src={p.image} style={{width:48,height:48,objectFit:'cover',borderRadius:8}}/> : <span className="badge">no image</span>}</td>
                  <td>{p.title}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>{p.sku}</td>
                  <td className="toolbar">
                    <button className="btn--ghost" onClick={()=>{
                      const title = prompt('Title', p.title) ?? p.title;
                      const price = Number(prompt('Price', p.price) ?? p.price);
                      const image = prompt('Image URL', p.image||"") ?? p.image;
                      const description = prompt('Description', p.description||"") ?? p.description;
                      updateProduct(p.id, { title, price, image, description });
                    }}>Edit</button>
                    <button className="btn--ghost" onClick={()=>{ if(confirm('Delete product?')) deleteProduct(p.id); }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
