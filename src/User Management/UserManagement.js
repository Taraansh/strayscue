import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";

const UserManagement = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return user ? (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "0",
        margin: "0",
        height: "100vh",
      }}
    >
      <NavBar />
      <>
        <div
          style={{
            paddingTop: "5rem",
            width: "100vw",
            paddingLeft: "50px",
          }}
          className="container"
        >
          <h4 className="heading1">Parent NGO List</h4>

          <div className="case-lists mx-auto">
            <div className="menu1">
              <Link
              to="/User Management/Add User"
                style={{
                  background: "rgb(245, 145, 32)",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
                className="btn "
              >
                <i
                  style={{ fontSize: "1.3rem" }}
                  className="fa-light fa-plus"
                ></i>
                Add User
              </Link>
              <input type="text" placeholder="Search by Name/E-mail" />
            </div>
            {/* Displaying Case Data */}
            <div className="container-fluid" style={{ overflow: "scroll" }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">User Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Type</th>
                    <th scope="col">Added User</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
      <div
        style={{
          position: "absolute",

          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          right: "0.1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100vw",
          fontSize: "20px",
          zIndex: "9",

          padding: "0.5rem 0.5rem",
          backgroundColor: "#ffffff",
        }}
      >
        <span>
          <label style={{ padding: "0.5rem", fontWeight: "bold" }}>
            Chetan
          </label>
          <img
            width="17%"
            style={{ marginRight: "1.5rem", cursor: "pointer" }}
            src={logo}
            alt="Logo"
          ></img>
          <i
            style={{ cursor: "pointer" }}
            className="fa-solid fa-right-from-bracket"
            onClick={logoutUser}
          ></i>
        </span>
      </div>
    </div>
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
};

export default UserManagement;
