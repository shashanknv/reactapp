import React, { useEffect, useState } from "react";
import axios from "../apiConfig";
import "./ViewCake.css";

function ViewCake() {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    axios.get("/api/cakes").then((res) => setCakes(res.data));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/cake/${id}`);
    setCakes(cakes.filter((c) => c.cakeId !== id));
  };

  return (
    <div className="view-cakes">
      <h2>All Cakes</h2>
      <div className="cake-grid">
        {cakes.map((cake) => (
          <div className="cake-card" key={cake.cakeId}>
            <img src={cake.cakeImage} alt={cake.name} />
            <h3>{cake.name}</h3>
            <p>Category: {cake.category}</p>
            <p>Price: ₹{cake.price}</p>
            <p>Quantity: {cake.quantity}</p>
            <button onClick={() => handleDelete(cake.cakeId)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewCake;
