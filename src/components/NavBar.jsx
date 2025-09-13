
import { NavLink } from "react-router-dom";

export default function NavBar(){
  const linkStyle = ({isActive})=>({className:"badge", style:{textDecoration:isActive?'underline':'none'}});
  return (
    <header className="container" style={{paddingTop:24}}>
      <div style={{display:'flex', gap:16, alignItems:'center'}}>
        <NavLink to="/" className="badge" style={{fontWeight:900, fontSize:'1.1rem'}}>🛠️ StoreForge</NavLink>
        <nav style={{display:'flex', gap:10}}>
          <NavLink to="/stores" {...linkStyle({})}>Stores</NavLink>
          <NavLink to="/new" {...linkStyle({})}>Create</NavLink>
          <NavLink to="/docs" {...linkStyle({})}>Docs</NavLink>
        </nav>
      </div>
    </header>
  );
}
