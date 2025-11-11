import React from "react";
import "./HomePage.css";

function HomePage() {
  const userRole = localStorage.getItem("userRole");
  const username = localStorage.getItem("username") || "User";

  return (
    <div className="home-container">
      <h1>Welcome back, {username}! 🎉</h1>
      {userRole === "Baker" ? (
        <p>You can manage your cakes, add new ones, or edit existing recipes.</p>
      ) : (
        <p>Browse delicious handcrafted cakes and place your orders easily!</p>
      )}
    </div>
  );
}

export default HomePage;
