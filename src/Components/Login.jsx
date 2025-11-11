import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../apiConfig";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ Email: "", Password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.Email || !form.Password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("/api/login", form);

      // Store login info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.userRole);
      localStorage.setItem("username", res.data.username);

      // Redirect based on role
      if (res.data.userRole === "Baker") {
        navigate("/baker/home");
      } else if (res.data.userRole === "Customer") {
        navigate("/customer/home");
      } else {
        setError("Invalid role detected!");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error.");
    }
  };

//   //THIS IS ONLY FOR TESTING
//   try {
//     // 🧪 TEMPORARY SIMULATION — bypass backend login for testing
//     localStorage.setItem("token", "demoToken");

//     // Change these lines depending on which role you want to test 👇
//     localStorage.setItem("userRole", "Baker"); // or "Customer"
//     localStorage.setItem("username", "DemoBaker"); // or "DemoCustomer"

//     // Redirect to correct homepage
//     navigate("/baker/home"); // or navigate("/customer/home");
//   } catch (err) {
//     console.error(err);
//     setError("Login simulation failed.");
//   }

  return (
    <div className="login-container">
      <h1 className="title">CakeCraft 🎂</h1>
      <p className="intro">Welcome! Please log in to continue.</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={form.Email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={form.Password}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>

      <p className="signup-link">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")}>Signup</span>
      </p>
    </div>
  );
}

export default Login;
