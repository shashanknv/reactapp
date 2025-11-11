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

  const handleChange = (e) => {
    setCake({ ...cake, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/cakes", cake);
    alert("Cake added successfully!");
    navigate("/baker/view-cakes");
  };

  return (
    <div className="cake-form-container">
      <h2>Add New Cake</h2>
      <form className="cake-form" onSubmit={handleSubmit}>
        <input name="Name" placeholder="Cake Name" onChange={handleChange} />
        <input name="Category" placeholder="Category" onChange={handleChange} />
        <input name="Price" placeholder="Price" onChange={handleChange} />
        <input name="Quantity" placeholder="Quantity" onChange={handleChange} />
        <input name="CakeImage" placeholder="Image URL" onChange={handleChange} />
        <button type="submit">Add Cake</button>
      </form>
    </div>
  );
}

export default CakeForm;
