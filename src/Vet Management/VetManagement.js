import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

const VetManagement = () => {
  const { user, logoutUser, allVets, getAllVets, websiteUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVets, setFilteredVets] = useState([]);

  useEffect(() => {
    getAllVets();
  }, [getAllVets]);

  useEffect(() => {
    // Filter vets based on search query
    const filtered = allVets.filter((data) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      return (
        data.vet_name.toLowerCase().includes(lowerCaseSearchQuery) ||
        data.registration_id.toLowerCase().includes(lowerCaseSearchQuery)
      );
    });
    setFilteredVets(filtered);
  }, [allVets, searchQuery]);

  const handleEditVetButton = (data) => {
    navigate("/Vet/EditVet", { state: { data: data } });
  };

  const handleVetDeleteButton = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Vet?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific Vet by making an API call
        const response = await fetch(
          `${websiteUrl}/vets/delete/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // Vet successfully deleted, perform any necessary actions (e.g., refresh the vet list)
          getAllVets(); // Refresh the Vet list after deletion
        } else {
          // Handle the case when the delete request fails
          console.log("Failed to Delete Vet:", id);
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error Deleting Vet:", error);
      }
    }
  };

  return user ? (
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
          <h4 className="heading1">Vets List</h4>
          <div className="case-lists mx-auto">
            <div className="menu1">
              <Link
                to="/Vet/AddVet"
                style={{
                  background: "rgb(245, 145, 32)",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
                className="btn "
              >
                Add Vet
              </Link>
              <input
                type="text"
                id="search-input"
                placeholder="Search by Name/Registration ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />            </div>
            {/* Displaying Vet Data */}
            <div className="container-fluid" style={{ overflow: "scroll" }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Reg. ID</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVets.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{data.vet_name}</td>
                        <td>{data.registration_id}</td>
                        <td>
                          <button
                            className="btn"
                            style={{ background: "rgb(245, 145, 32)", border: "none", color:"#ffffff" }}
                            onClick={() => handleEditVetButton(data)}
                          >
                            Edit
                          </button>
                          <div
                            className="btn mx-1"
                            onClick={() => {
                              handleVetDeleteButton(data.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash-fill"
                              viewBox="0 0 16 16"
                              style={{
                                background: "transparent",
                                color: "red",
                                // border: "none",
                              }}
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
          position: "fixed",
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
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
};

export default VetManagement;
