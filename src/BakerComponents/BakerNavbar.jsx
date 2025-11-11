import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BakerNavbar.css";

function BakerNavbar() {
  const navigate = useNavigate();
  const bakerName = "DemoBaker"; // You can replace with dynamic baker name later
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="baker-navbar">
      {/* Left Side */}
      <div className="navbar-left">
        <h2 className="brand">CakeCraft</h2>
      </div>

      {/* Right Side */}
      <div className="navbar-right">
        <span className="user-role">{bakerName} / Baker</span>
        <Link to="/baker/home" className="nav-link">
          Home
        </Link>

        {/* Cake dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setDropdown(true)}
          onMouseLeave={() => setDropdown(false)}
        >
          <button className="dropbtn">Cake ▾</button>
          {dropdown && (
            <div className="dropdown-content">
              <Link to="/baker/add-cake">Add Cake</Link>
              <Link to="/baker/view-cakes">View Cakes</Link>
            </div>
          )}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default BakerNavbar;
