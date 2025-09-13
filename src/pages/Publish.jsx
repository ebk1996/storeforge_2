
import { useParams, Link } from "react-router-dom";
import { useApp } from "../context/store";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Publish(){
  const { id } = useParams();
  const { stores, products } = useApp();
  const store = stores[id];
  if(!store) return <div className="container"><p className="badge">Store not found.</p></div>;
  const prodList = (store.productIds || []).map(pid => products[pid]);

  async function exportZip(){
    const zip = new JSZip();
    const data = { store, products: prodList };
    zip.file("data.json", JSON.stringify(data, null, 2));
    zip.file("index.html", buildIndexHtml());
    zip.file("styles.css", buildStyles(store.theme));
    zip.file("app.js", buildClientJs());
    const blob = await zip.generateAsync({type:"blob"});
    saveAs(blob, `${store.subdomain || "store"}.zip`);
  }

  function buildIndexHtml(){
    return `<!doctype html>
<html lang="en"><head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${store.name}</title>
<link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <div id="app"><noscript>Enable JS to view the store.</noscript></div>
  <script src="./app.js"></script>
</body></html>`;
  }

  function buildStyles(theme){
    const primary = theme?.primary || "#7c5cff";
    const secondary = theme?.secondary || "#18c6ff";
    return `:root{--primary:${primary};--secondary:${secondary};--bg:#0b0d10;--text:#e9eef7;--panel:#11151a;--muted:#9fb2d6}
*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--text)}
a{color:var(--secondary);text-decoration:none}.container{max-width:1100px;margin:0 auto;padding:16px}
.card{background:#11151a;border:1px solid #1c2330;border-radius:16px;padding:16px}.grid{display:grid;gap:16px}
.badge{display:inline-block;background:#0d1117;border:1px solid #1c2330;border-radius:999px;padding:4px 10px;color:var(--muted)}
.btn{background:linear-gradient(90deg,var(--primary),var(--secondary));border:none;color:#fff;padding:10px 14px;border-radius:12px;cursor:pointer;font-weight:700}
.header{display:flex;gap:12px;align-items:center}.img{width:100%;height:160px;object-fit:cover;border-radius:12px}
`;
  }

  function buildClientJs(){
    return `async function main(){
  const res = await fetch('./data.json');
  const { store, products } = await res.json();
  const app = document.getElementById('app');
  const header = document.createElement('div'); header.className='container card';
  header.innerHTML = '<div class="header">'+
    (store.logoUrl ? '<img src="'+store.logoUrl+'" style="height:42px" />' : '<span class="badge">Logo</span>')+
    '<h2 style="margin:0 8px 0 0">'+store.name+'</h2>'+
    '<span class="badge" style="margin-left:auto">'+store.subdomain+'.storeforge.app</span></div>'+
    '<p style="color:#9fb2d6">'+(store.description||'')+'</p>';
  app.appendChild(header);

  const grid = document.createElement('div'); grid.className='container grid';
  grid.style.gridTemplateColumns = (store.theme?.layout==='list' ? '1fr' : 'repeat(auto-fit,minmax(220px,1fr))');
  products.forEach(p=>{
    const card = document.createElement('article'); card.className='card';
    card.innerHTML = (p.image ? '<img class="img" src="'+p.image+'" />' : '')+
      '<h3>'+p.title+'</h3>'+
      '<p style="color:#9fb2d6">'+(p.description||'')+'</p>'+
      '<div style="display:flex;gap:8px;align-items:center">'+
        '<span class="badge">$'+p.price.toFixed(2)+'</span>'+
        '<button class="btn">Add to cart</button>'+
      '</div>';
    grid.appendChild(card);
  });
  app.appendChild(grid);
}
main();`;
  }

  return (
    <div className="container grid" style={{gap:16}}>
      <div className="toolbar">
        <h2 style={{marginRight:'auto'}}>Publish: {store.name}</h2>
        <Link className="btn--ghost" to={`/preview/${store.id}`}>Preview</Link>
        <Link className="btn--ghost" to={`/design/${store.id}`}>Design</Link>
      </div>
      <div className="card grid">
        <p style={{color:'#9fb2d6'}}>Click export to download a static site bundle (<code>.zip</code>) containing an SEO‑friendly store. Deploy to Netlify, Vercel, GitHub Pages, S3, Cloudflare Pages—no backend required.</p>
        <button className="btn" onClick={exportZip}>Export .zip</button>
      </div>
      <div className="card">
        <h3>What’s inside the bundle?</h3>
        <ul style={{color:'#9fb2d6'}}>
          <li><b>index.html</b> — storefront markup</li>
          <li><b>styles.css</b> — theme styles</li>
          <li><b>app.js</b> — client logic</li>
          <li><b>data.json</b> — your store & products</li>
        </ul>
      </div>
    </div>
  );
}
