
import { Link } from "react-router-dom";
import { useApp } from "../context/store";

export default function Stores(){
  const { stores, currentUser, deleteStore } = useApp();
  const list = Object.values(stores).filter(s => !currentUser || s.ownerId===currentUser.id);
  return (
    <div className="container grid" style={{gap:16}}>
      <div className="toolbar">
        <h2 style={{marginRight:'auto'}}>Your stores</h2>
        <Link className="btn" to="/new">+ Create</Link>
      </div>
      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>
        {list.length === 0 ? <p className="badge">No stores yet.</p> : list.map(s => (
          <div key={s.id} className="card grid">
            <div className="toolbar">
              <div className="badge">{s.subdomain}.storeforge.app</div>
              <Link className="btn--ghost" to={`/design/${s.id}`}>Design</Link>
            </div>
            <h3>{s.name}</h3>
            <p style={{color:'#9fb2d6'}}>{s.description || "No description"}</p>
            <div className="toolbar">
              <Link className="btn" to={`/preview/${s.id}`}>Preview</Link>
              <Link className="btn--ghost" to={`/publish/${s.id}`}>Export</Link>
              <button className="btn--ghost" onClick={()=>{if(confirm('Delete store?')) deleteStore(s.id)}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
