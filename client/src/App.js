import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Appointments from "./pages/Appointments";
import Administrators from "./pages/Administrators";
import Customers from "./pages/Customers";

// Componenets
import Navbar from "./components/Navbar";
// Style Sheets
import "./css/main.css";
import "./css/nav.css";
import "./css/dashboard.css";
import "./css/login.css";
import "./css/numericSelectors.css";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/administrators" element={<Administrators />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
