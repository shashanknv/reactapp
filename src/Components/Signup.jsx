import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../apiConfig";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Username: "",
    Email: "",
    MobileNumber: "",
    Password: "",
    ConfirmPassword: "",
    UserRole: "Customer",
  });

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (
      !form.Username ||
      !form.Email ||
      !form.MobileNumber ||
      !form.Password ||
      !form.ConfirmPassword
    ) {
      setError("All fields are required.");
      return false;
    }

    if (!emailRegex.test(form.Email)) {
      setError("Invalid email format.");
      return false;
    }

    if (!mobileRegex.test(form.MobileNumber)) {
      setError("Invalid mobile number.");
      return false;
    }

    if (form.Password !== form.ConfirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("/api/register", form);
      setShowModal(true);
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          name="Username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input name="Email" placeholder="Email" onChange={handleChange} />
        <input
          name="MobileNumber"
          placeholder="Mobile Number"
          onChange={handleChange}
        />
        <input
          name="Password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          name="ConfirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
        />

        <select name="UserRole" onChange={handleChange}>
          <option value="Customer">Customer</option>
          <option value="Baker">Baker</option>
        </select>

        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Signup Successful!</p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
