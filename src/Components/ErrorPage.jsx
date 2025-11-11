import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <button onClick={() => navigate("/")}>Go to Login</button>
    </div>
  );
}

export default ErrorPage;
