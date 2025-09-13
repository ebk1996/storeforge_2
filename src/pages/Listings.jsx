import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackendApi from "../services/BackendApi";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BackendApi.get("/listings").then(res => {
      setListings(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading listings...</div>;

  return (
    <div className="container">
      <h2>Classified Listings</h2>
      <ul style={{listStyle:'none', padding:0}}>
        {listings.map(listing => (
          <li key={listing.id} style={{marginBottom:16, borderBottom:'1px solid #eee', paddingBottom:8}}>
            <Link to={`/listings/${listing.id}`} style={{fontWeight:600, fontSize:'1.1rem'}}>{listing.title}</Link>
            <div>{listing.category} | {listing.location}</div>
            <div>${listing.price}</div>
            <div style={{color:'#555'}}>{listing.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
