import { useState, useEffect } from "react";
import BackendApi from "../services/BackendApi";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    BackendApi.get("/categories").then(res => setCategories(res.data));
    BackendApi.get("/locations").then(res => setLocations(res.data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    BackendApi.post("/listings", { title, description, price, category, location })
      .then(() => {
        setSuccess(true);
        setTitle(""); setDescription(""); setPrice(""); setCategory(""); setLocation("");
      });
  }

  return (
    <div className="container">
      <h2>Post a Classified Ad</h2>
      {success && <div className="badge" style={{color:'green'}}>Ad posted!</div>}
      <form onSubmit={handleSubmit} className="grid" style={{gap:8, maxWidth:400}}>
        <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea className="input" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required />
        <input className="input" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} required />
        <select className="input" value={category} onChange={e=>setCategory(e.target.value)} required>
          <option value="">Select category</option>
          {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
        </select>
        <select className="input" value={location} onChange={e=>setLocation(e.target.value)} required>
          <option value="">Select location</option>
          {locations.map(loc => <option key={loc.id} value={loc.name}>{loc.name}</option>)}
        </select>
        <button className="btn" type="submit">Post Ad</button>
      </form>
    </div>
  );
}
