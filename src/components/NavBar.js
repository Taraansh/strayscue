import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import logo from "../assets/logo.png";
function NavBar() {
  return (
    <nav>
      <ul>
        <li className="item">
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
          <div>
              <img src={logo} alt="" />
          </div>
              <span className="nav-items">Strayscue</span>
            </Link>
        </li>

        <li className="item">
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
          <div className="links">
              <i className="fas fa-home"></i>
              <span className="nav-items">Dashboard</span>
          </div>
            </Link>
        </li>
        <li className="item">
            <Link
              style={{
                outline: "none",
                border: "none",
                color: "#1a202c",
                fontSize: "14px",
                boxSizing: "border-box",
                textDecoration: "none",
              }}
              to="/UserManagement"
            >
          <div className="links">
              <i className="fas fa-solid fa-user"></i>
              <span className="nav-items">User Management</span>
          </div>
            </Link>
        </li>
        <li className="item">
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
          <div className="links">
              <i className="fas fa-solid fa-n"></i>
              <span className="nav-items">NGO Management</span>
          </div>
            </Link>
        </li>
        <li className="item">
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
          <div className="links">
              <i className="fas fa-solid fa-r"></i>
              <span className="nav-items">Reporter Management</span>
          </div>
            </Link>
        </li>
        <li className="item">
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
          <div className="links">
              <i className="fas fa-solid fa-v"></i>
              <span className="nav-items">Vet Management</span>
          </div>
            </Link>
        </li>
        <li className="item">
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
          <div className="links">
              <i className="fas fa-solid fa-s"></i>
              <span className="nav-items">Sponser Management</span>
          </div>
            </Link>
        </li>

        <li className="item">
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
          <div className="links">
              <i className="fas fa-solid fa-gear"></i>
              <span className="nav-items">Settings</span>
          </div>
            </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
