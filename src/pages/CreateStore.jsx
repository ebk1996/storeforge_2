
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/store";

export default function CreateStore(){
  const { createStore, currentUser } = useApp();
  const nav = useNavigate();

  function onSubmit(e){
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name')||'').trim();
    const subdomain = String(fd.get('subdomain')||'').trim().toLowerCase().replace(/[^a-z0-9-]/g,'');
    const description = String(fd.get('description')||'').trim();
    const logoUrl = String(fd.get('logoUrl')||'').trim();
    if(!name) return alert('Name is required');
    if(!subdomain) return alert('Subdomain is required');
    if(!currentUser) return alert('Sign in on Home first');
    const store = createStore({ name, subdomain, description, logoUrl });
    nav(`/design/${store.id}`);
  }

  return (
    <div className="container grid" style={{gap:16}}>
      <h2>Create a new store</h2>
      <form className="card grid" onSubmit={onSubmit} style={{gap:12}}>
        <label>Store name *</label>
        <input className="input" name="name" placeholder="e.g. Nebula Threads" />
        <label>Subdomain *</label>
        <div style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:8, alignItems:'center'}}>
          <span className="badge">https://</span>
          <input className="input" name="subdomain" placeholder="nebula-threads" />
        </div>
        <label>Description</label>
        <textarea className="input" rows="3" name="description" placeholder="What do you sell?" />
        <label>Logo URL</label>
        <input className="input" name="logoUrl" placeholder="https://..." />
        <div className="toolbar">
          <button className="btn" type="submit">Create store</button>
        </div>
      </form>
    </div>
  );
}
