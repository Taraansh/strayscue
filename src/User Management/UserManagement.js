import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";

const UserManagement = () => {
  const {
    user,
    logoutUser,
    getAllUsersLinkedWithNgo,
    allUsersLinkedWithNgo,
    websiteUrl,
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

  const handleDeleteUserLinkedWithNgoButton = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this User?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific User by making an API call
        const response = await fetch(`${websiteUrl}/authorize/deleteuser/${id}/`, {
          method: "DELETE",
        });
        if (response.ok) {
          // User successfully deleted, perform any necessary actions (e.g., refresh the User list)
          getAllUsersLinkedWithNgo(); // Refresh the User list after deletion
        } else {
          // Handle the case when the delete request fails
          console.log("Failed to Delete User:", id);
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error Deleting User:", error);
      }
    }
  };

  return (
    (isSuperUser === "true" ||
      type_of_user_in_ngo === "Founder" ||
      type_of_user_in_ngo === "Manager") &&
    user && (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: "2rem",
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
            }}
            className="container"
          >
            <h4 className="heading1">Users List</h4>
            <div className="case-lists mx-auto">
            <h5 className="heading1">Add User in NGO</h5>
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
              <div className="container-fluid" style={{ overflow: "scroll" }}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">User Name</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Type</th>
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
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEditUserLinkedWithNgo(data)}
                            >
                              Edit
                            </button>
                            <div
                              className="btn btn-primary mx-1"
                              onClick={() => {
                                handleDeleteUserLinkedWithNgoButton(data.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                              </svg>
                            </div>
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
      </div>
    )
  );
};

export default UserManagement;
