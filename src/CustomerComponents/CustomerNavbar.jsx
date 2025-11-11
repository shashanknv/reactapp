import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CustomerNavbar.css";

function CustomerNavbar() {
  const navigate = useNavigate();
  const customerName = "DemoCustomer";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="customer-navbar">
      {/* Left side */}
      <div className="navbar-left">
        <h2 className="brand">CakeCraft</h2>
      </div>

      {/* Right side */}
      <div className="navbar-right">
        <span className="user-role">{customerName} / Customer</span>
        <Link to="/customer/home" className="nav-link">
          Home
        </Link>
        <Link to="/customer/view-cakes" className="nav-link">
          Cake
        </Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
