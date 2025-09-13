import { useEffect, useState } from "react";
import BackendApi from "../services/BackendApi";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    BackendApi.get("/categories").then(res => setCategories(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Categories</h2>
      <ul style={{listStyle:'none', padding:0}}>
        {categories.map(cat => (
          <li key={cat.id} style={{marginBottom:8}}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}
