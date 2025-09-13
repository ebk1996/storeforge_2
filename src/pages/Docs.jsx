
export default function Docs(){
  return (
    <div className="container grid" style={{gap:16}}>
      <h2>Documentation</h2>
      <div className="card grid">
        <ol style={{lineHeight:1.6,color:'#9fb2d6'}}>
          <li>Go to <b>Create</b>, fill out name + subdomain, then save.</li>
          <li>Open <b>Design</b> to set colors & layout and add products.</li>
          <li>Use <b>Preview</b> to verify your storefront.</li>
          <li>Open <b>Publish</b> and click <b>Export .zip</b>. Drop it into your favorite static host.</li>
        </ol>
        <p className="badge">Tip: you can create multiple stores and switch between them any time.</p>
      </div>
    </div>
  );
}
