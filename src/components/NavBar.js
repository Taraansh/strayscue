import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import logo from "../assets/logo.png";
function NavBar() {
  return (
    <nav>
      <ul>
        <li className="item">
          <div>
            <Link
              style={{
                outline: "none",
                border: "none",
                color: "#1a202c",
                fontSize: "14px",
                boxSizing: "border-box",
                textDecoration: "none",
                marginBottom: "1.5rem",
              }}
              to="/Dashboard"
              className="logo"
            >
              <img src={logo} alt="" />
              <span className="nav-items">Strayscue</span>
            </Link>
          </div>
        </li>

        <li className="item">
          <div className="links">
            <Link
              style={{
                outline: "none",
                border: "none",
                color: "#1a202c",
                fontSize: "14px",
                boxSizing: "border-box",
                textDecoration: "none",
              }}
              to="/Dashboard"
            >
              <i className="fas fa-home"></i>
              <span className="nav-items">Dashboard</span>
            </Link>
          </div>
        </li>
        <li className="item">
          <div className="links">
            <Link
              style={{
                outline: "none",
                border: "none",
                color: "#1a202c",
                fontSize: "14px",
                boxSizing: "border-box",
                textDecoration: "none",
              }}
              to="/User Management"
            >
              <i className="fas fa-solid fa-user"></i>
              <span className="nav-items">User Management</span>
            </Link>
          </div>
        </li>
        <li className="item">
          <div className="links">
            <Link
              style={{
                outline: "none",
                border: "none",
                color: "#1a202c",
                fontSize: "14px",
                boxSizing: "border-box",
                textDecoration: "none",
              }}
              to="/NGO"
            >
              <i className="fas fa-solid fa-n"></i>
              <span className="nav-items">NGO Management</span>
            </Link>
          </div>
        </li>
        <li className="item">
          <div className="links">
            <Link
              style={{
                outline: "none",
                border: "none",
                color: "#1a202c",
                fontSize: "14px",
                boxSizing: "border-box",
                textDecoration: "none",
              }}
              to="/Reporter"
            >
              <i className="fas fa-solid fa-r"></i>
              <span className="nav-items">Reporter Management</span>
            </Link>
          </div>
        </li>
        <li className="item">
          <div className="links">
            <Link
              style={{
                outline: "none",
                border: "none",
                color: "#1a202c",
                fontSize: "14px",
                boxSizing: "border-box",
                textDecoration: "none",
              }}
              to="/Vet"
            >
              <i className="fas fa-solid fa-v"></i>
              <span className="nav-items">Vet Management</span>
            </Link>
          </div>
        </li>
        <li className="item">
          <div className="links">
            <Link
              style={{
                outline: "none",
                border: "none",
                color: "#1a202c",
                fontSize: "14px",
                boxSizing: "border-box",
                textDecoration: "none",
              }}
              to="/Sponsor"
            >
              <i className="fas fa-solid fa-s"></i>
              <span className="nav-items">Sponser Management</span>
            </Link>
          </div>
        </li>

        <li className="item">
          <div className="links">
            <Link
              style={{
                outline: "none",
                border: "none",
                color: "#1a202c",
                fontSize: "14px",
                boxSizing: "border-box",
                textDecoration: "none",
              }}
              to="/Settings"
            >
              <i className="fas fa-solid fa-gear"></i>
              <span className="nav-items">Settings</span>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
