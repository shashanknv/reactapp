import React, { useEffect, useState } from "react";
import axios from "../apiConfig";
import "./CustomerViewCake.css";

function CustomerViewCake() {
  const [cakes, setCakes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    axios
      .get("/api/cakes")
      .then((res) => setCakes(res.data))
      .catch(() => {
        // 🧪 Dummy data for testing
        setCakes([
          {
            cakeId: 1,
            name: "Vanilla Dream",
            category: "Vanilla",
            price: 300,
            cakeImage: "https://source.unsplash.com/200x200/?vanilla-cake",
          },
          {
            cakeId: 2,
            name: "Red Velvet Bliss",
            category: "Red Velvet",
            price: 450,
            cakeImage: "https://source.unsplash.com/200x200/?redvelvet-cake",
          },
          {
            cakeId: 3,
            name: "Black Forest Magic",
            category: "Chocolate",
            price: 380,
            cakeImage: "https://source.unsplash.com/200x200/?blackforest-cake",
          },
        ]);
      });
  }, []);

  const filteredCakes = cakes.filter(
    (cake) =>
      cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cake.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCakes = [...filteredCakes].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div className="customer-cake-list">
      <h2>Available Cakes</h2>

      <div className="search-sort-bar">
        <input
          type="text"
          placeholder="🔍 Search by name or category..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="sort-dropdown"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Sort by Price</option>
          <option value="lowToHigh">Low → High</option>
          <option value="highToLow">High → Low</option>
        </select>
      </div>

      <div className="cake-grid">
        {sortedCakes.length > 0 ? (
          sortedCakes.map((cake) => (
            <div className="cake-card" key={cake.cakeId}>
              <img
                src={
                  cake.cakeImage
                    ? cake.cakeImage
                    : "https://cdn-icons-png.flaticon.com/512/1744/1744559.png"
                }
                alt={cake.name}
              />

              <h3>{cake.name}</h3>
              <p>{cake.category}</p>
              <p>₹{cake.price}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No cakes found.</p>
        )}
      </div>
    </div>
  );
}

export default CustomerViewCake;
