import React, { useEffect, useState } from "react";
import axios from "../apiConfig";
import "./CustomerViewCake.css";

function CustomerViewCake() {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    axios.get("/api/cakes").then((res) => setCakes(res.data));
  }, []);

  return (
    <div className="customer-cake-list">
      <h2>Available Cakes</h2>
      <div className="cake-grid">
        {cakes.map((cake) => (
          <div className="cake-card" key={cake.cakeId}>
            <img src={cake.cakeImage} alt={cake.name} />
            <h3>{cake.name}</h3>
            <p>{cake.category}</p>
            <p>₹{cake.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerViewCake;
