import React, { useEffect, useState } from "react";
import axios from "../apiConfig";
import "./ViewCake.css";

function ViewCake() {
  const [cakes, setCakes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none"); // new state for sorting

  useEffect(() => {
    axios
      .get("/api/cakes")
      .then((res) => setCakes(res.data))
      .catch(() => {
        // 🧪 Dummy data for testing
        setCakes([
          {
            cakeId: 1,
            name: "Chocolate Delight",
            category: "Chocolate",
            price: 350,
            quantity: 10,
            cakeImage: "https://source.unsplash.com/200x200/?chocolate-cake",
          },
          {
            cakeId: 2,
            name: "Strawberry Heaven",
            category: "Fruit",
            price: 400,
            quantity: 7,
            cakeImage: "https://source.unsplash.com/200x200/?strawberry-cake",
          },
          {
            cakeId: 3,
            name: "Vanilla Bliss",
            category: "Vanilla",
            price: 250,
            quantity: 5,
            cakeImage: "https://source.unsplash.com/200x200/?vanilla-cake",
          },
        ]);
      });
  }, []);

  // Delete cake (Baker only)
  const handleDelete = async (id) => {
    await axios.delete(`/api/cake/${id}`);
    setCakes(cakes.filter((cake) => cake.cakeId !== id));
  };

  // Filter cakes
  const filteredCakes = cakes.filter(
    (cake) =>
      cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cake.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort cakes based on selected option
  const sortedCakes = [...filteredCakes].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div className="view-cakes">
      <h2>All Cakes</h2>

      {/* Search + Sort controls */}
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
              <p>Category: {cake.category}</p>
              <p>Price: ₹{cake.price}</p>
              <p>Quantity: {cake.quantity}</p>
              <button onClick={() => handleDelete(cake.cakeId)}>Delete</button>
            </div>
          ))
        ) : (
          <p className="no-results">No cakes found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewCake;
