import React, { useState } from "react";
import axios from "../apiConfig";
import "./CakeForm.css";
import { useNavigate } from "react-router-dom";

function CakeForm() {
  const navigate = useNavigate();

  const [cake, setCake] = useState({
    Name: "",
    Category: "",
    Price: "",
    Quantity: "",
    CakeImage: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative input for Price & Quantity
    if ((name === "Price" || name === "Quantity") && value < 0) return;

    setCake({ ...cake, [name]: value });
  };

  // Convert uploaded image to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCake({ ...cake, CakeImage: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation checks
    if (!cake.Name || !cake.Category || !cake.Price || !cake.Quantity) {
      alert("Please fill in all fields.");
      return;
    }

    if (cake.Price <= 0 || cake.Quantity <= 0) {
      alert("Price and Quantity must be positive numbers.");
      return;
    }

    const cakeData = {
      ...cake,
      CakeImage:
        cake.CakeImage ||
        "https://cdn-icons-png.flaticon.com/512/1744/1744559.png", // Dummy if not uploaded
    };

    try {
      await axios.post("/api/cakes", cakeData);
      alert("Cake added successfully!");
      navigate("/baker/view-cakes");
    } catch (err) {
      console.error("Error adding cake:", err);
      alert("Error while adding cake.");
    }
  };

  return (
    <div className="cake-form-container">
      <h2>Add New Cake</h2>

      <form className="cake-form" onSubmit={handleSubmit}>
        <input
          name="Name"
          placeholder="Cake Name"
          value={cake.Name}
          onChange={handleChange}
          required
        />
        <input
          name="Category"
          placeholder="Category"
          value={cake.Category}
          onChange={handleChange}
          required
        />

        {/* 👇 Non-negative number restriction */}
        <input
          name="Price"
          type="number"
          placeholder="Price (₹)"
          value={cake.Price}
          onChange={handleChange}
          min="1"
          required
        />
        <input
          name="Quantity"
          type="number"
          placeholder="Quantity"
          value={cake.Quantity}
          onChange={handleChange}
          min="1"
          required
        />

        <label className="upload-label">
          Upload Cake Image
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
          />
        </label>

        {preview ? (
          <img src={preview} alt="Preview" className="preview-image" />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/1744/1744559.png"
            alt="Default Preview"
            className="preview-image"
          />
        )}

        <button type="submit">Add Cake</button>
      </form>
    </div>
  );
}

export default CakeForm;
