import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import Footer from "../components/Footer";

const UserManagement = () => {
  const {
    user,
    logoutUser,
    getAllUsersLinkedWithNgo,
    allUsersLinkedWithNgo,
  } = useContext(AuthContext);
  const isSuperUser = localStorage.getItem("is_superuser");
  const type_of_user_in_ngo = localStorage.getItem("type_of_user_in_ngo");

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsersLinkedWithNgo, setFilteredUsersLinkedWithNgo] = useState(
    []
  );

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsersLinkedWithNgo();
  }, [getAllUsersLinkedWithNgo]);

  useEffect(() => {
    // Filter Users based on search query
    const filtered = allUsersLinkedWithNgo.filter((data) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      return (
        data.username.toLowerCase().includes(lowerCaseSearchQuery) ||
        data.type_of_user_in_ngo.toLowerCase().includes(lowerCaseSearchQuery) ||
        data.user_contact.toLowerCase().includes(lowerCaseSearchQuery) ||
        data.email.toLowerCase().includes(lowerCaseSearchQuery)
      );
    });
    setFilteredUsersLinkedWithNgo(filtered);
  }, [allUsersLinkedWithNgo, searchQuery]);

  const handleEditUserLinkedWithNgo = (data) => {
    navigate("/UserManagement/EditUser", { state: { data: data } });
  };

  return (
    (isSuperUser === "true" ||
      type_of_user_in_ngo === "Founder" ||
      type_of_user_in_ngo === "Manager") &&
    user && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent:"space-between",
          height:"100vh",
          margin: "0",
          
        }}
      >
        <NavBar />
        <>
          <div
            style={{
              paddingTop: "5rem",
              width: "100vw",
              paddingLeft: "50px",
              paddingBottom:"3rem"
            }}
            className="container"
          >
            <h4 className="heading1">Users List</h4>
            <div className="case-lists mx-auto">
              <div className="menu1">
                <Link
                  to="/UserManagement/AddUser"
                  style={{
                    background: "rgb(245, 145, 32)",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                  className="btn "
                >
                  Add 
                </Link>
                <input
                  type="text"
                  placeholder="Search by Name/Type/Email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* Displaying User linked with Ngo Data */}
              <div className="container-fluid" style={{ overflow: "auto" }}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">User Name</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Type</th>
                      <th scope="col">Active</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsersLinkedWithNgo.map((data, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{data.username}</td>
                          <td>{data.email}</td>
                          <td>{data.user_contact}</td>
                          <td>{data.type_of_user_in_ngo}</td>
                          <td>{data.is_active}</td>
                          <td>
                            <button
                              className="btn"
                              style={{ background: "rgb(245, 145, 32)", border: "none", color:"#ffffff" }}
                              onClick={() => handleEditUserLinkedWithNgo(data)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
              {localStorage.getItem("username")}
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
        <Footer/>
      </div>
    )
  );
};

export default UserManagement;
