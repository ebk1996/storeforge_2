
import { Link } from "react-router-dom";
import { useApp } from "../context/store";
import { useState } from "react";

export default function Home(){
  const { currentUser, signup, login, logout } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("signup");

  async function handleAuth(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message || (mode === "signup" ? "Signup failed" : "Login failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container grid" style={{marginTop:12}}>
      <h1>Build & launch a store in minutes</h1>
      <p style={{color:'#9fb2d6'}}>StoreForge lets anyone generate a beautiful e‑commerce storefront, add products, pick a theme, and export a ready‑to‑host site.</p>

      <div className="card grid" style={{gridTemplateColumns:'1fr 1fr', gap:16}}>
        <div className="grid">
          <h3>Get started</h3>
          {!currentUser ? (
            <form onSubmit={handleAuth} className="grid" style={{gridTemplateColumns:'1fr 1fr auto', gap:8}}>
              <input className="input" name="email" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
              <input className="input" name="password" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
              <button className="btn" type="submit" disabled={loading}>{loading ? (mode === "signup" ? "Signing up..." : "Logging in...") : (mode === "signup" ? "Sign up" : "Log in")}</button>
              <button type="button" className="btn--ghost" style={{marginLeft:8}} onClick={()=>setMode(mode === "signup" ? "login" : "signup")}>{mode === "signup" ? "Already registered? Log in" : "Need an account? Sign up"}</button>
              {error && <div className="badge" style={{color:'red'}}>{error}</div>}
            </form>
          ) : (
            <div className="toolbar">
              <span className="badge">Signed in as <b>{currentUser.email}</b></span>
              <button className="btn--ghost" onClick={logout}>Sign out</button>
              <Link className="btn" to="/new">Create a store</Link>
              <Link className="btn--ghost" to="/stores" style={{padding:'10px 14px', display:'inline-block'}}>My stores</Link>
            </div>
          )}
          <ul style={{marginTop:8, color:'#9fb2d6'}}>
            <li>⚡ Instant: local-first, no servers required</li>
            <li>🎨 Themes: colors & layouts</li>
            <li>🧾 Products: images, price, stock</li>
            <li>📦 One‑click <b>Export</b> to static hosting (Netlify, Vercel, S3)</li>
          </ul>
        </div>
        <div className="card">
          <h3>How export works</h3>
          <p style={{color:'#9fb2d6'}}>We package a static storefront (HTML/CSS/JS) with your products as <code>data.json</code>. Drop the zip into any static host — it just works.</p>
          <p className="badge">No backend needed</p>
        </div>
      </div>
    </div>
  );
}
