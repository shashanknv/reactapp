import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import HomePage from "./Components/HomePage";
import PrivateRoute from "./Components/PrivateRoute";
import ErrorPage from "./Components/ErrorPage";

import BakerNavbar from "./BakerComponents/BakerNavbar";
import CakeForm from "./BakerComponents/CakeForm";
import ViewCake from "./BakerComponents/ViewCake";

import CustomerNavbar from "./CustomerComponents/CustomerNavbar";
import CustomerViewCake from "./CustomerComponents/CustomerViewCake";

function App() {
  return (
    <Router>
      <Routes>
        {/* Common pages */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* -------------------- BAKER ROUTES -------------------- */}
        <Route
          path="/baker/home"
          element={
            <PrivateRoute>
              <>
                <BakerNavbar />
                <HomePage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/baker/add-cake"
          element={
            <PrivateRoute>
              <>
                <BakerNavbar />
                <CakeForm />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/baker/view-cakes"
          element={
            <PrivateRoute>
              <>
                <BakerNavbar />
                <ViewCake />
              </>
            </PrivateRoute>
          }
        />

        {/* -------------------- CUSTOMER ROUTES -------------------- */}
        <Route
          path="/customer/home"
          element={
            <PrivateRoute>
              <>
                <CustomerNavbar />
                <HomePage />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/customer/view-cakes"
          element={
            <PrivateRoute>
              <>
                <CustomerNavbar />
                <CustomerViewCake />
              </>
            </PrivateRoute>
          }
        />

        {/* Fallback for invalid URLs */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
