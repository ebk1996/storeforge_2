
import { useParams, Link } from "react-router-dom";
import { useApp } from "../context/store";

export default function Preview(){
  const { id } = useParams();
  const { stores, products } = useApp();
  const store = stores[id];
  if(!store) return <div className="container"><p className="badge">Store not found.</p></div>;
  const prodList = (store.productIds || []).map(pid => products[pid]);

  return (
    <div className="container" style={{paddingTop:12}}>
      <div className="toolbar">
        <h2 style={{marginRight:'auto'}}>Preview</h2>
        <Link className="btn--ghost" to={`/design/${store.id}`}>Back to Design</Link>
        <Link className="btn" to={`/publish/${store.id}`}>Export</Link>
      </div>

      <Storefront store={store} products={prodList} />
    </div>
  );
}

export function Storefront({store, products}){
  const { theme } = store;
  const layout = theme?.layout || 'grid';
  const gridStyles = layout==='grid' ? {gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))'} : {gridTemplateColumns:'1fr'};

  return (
    <div className="card">
      <header style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
        {store.logoUrl ? <img src={store.logoUrl} style={{height:42}}/> : <div className="badge">Logo</div>}
        <h2>{store.name}</h2>
        <div style={{marginLeft:'auto'}} className="badge">{store.subdomain}.storeforge.app</div>
      </header>
      <p style={{color:'#9fb2d6'}}>{store.description}</p>
      <div className="grid" style={gridStyles}>
        {products.map(p => (
          <article key={p.id} className="card" style={{borderColor: theme.primary}}>
            {p.image && <img src={p.image} style={{width:'100%',height:160,objectFit:'cover',borderRadius:12}}/>}
            <h3>{p.title}</h3>
            <p style={{color:'#9fb2d6'}}>{p.description}</p>
            <div className="toolbar">
              <span className="badge" style={{borderColor:theme.secondary}}>${p.price.toFixed(2)}</span>
              <button className="btn" style={{background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`}}>Add to cart</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
