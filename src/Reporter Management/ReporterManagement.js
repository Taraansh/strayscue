import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

const ReporterManagement = () => {
  const { user, logoutUser, allReporters, getAllReporters, websiteUrl } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReporters, setFilteredReporters] = useState([]);

  useEffect(() => {
    getAllReporters();
  }, [getAllReporters]);

  useEffect(() => {
    // Filter Reporters based on search query
    const filtered = allReporters.filter((data) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      return (
        data.reported_name.toLowerCase().includes(lowerCaseSearchQuery) ||
        data.phone_number.toLowerCase().includes(lowerCaseSearchQuery) ||
        data.alternate_phone_number
          .toLowerCase()
          .includes(lowerCaseSearchQuery) ||
        data.email_id.toLowerCase().includes(lowerCaseSearchQuery)
      );
    });
    setFilteredReporters(filtered);
  }, [allReporters, searchQuery]);

  const handleEditReporterButton = (data) => {
    navigate("/Reporter/EditReporter", { state: { data: data } });
  };

  const handleReporterDeleteButton = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Reporter?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific Reporter by making an API call
        const response = await fetch(
          `${websiteUrl}/reporters/delete/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // Reporter successfully deleted, perform any necessary actions (e.g., refresh the Reporter list)
          getAllReporters(); // Refresh the Reporter list after deletion
        } else {
          // Handle the case when the delete request fails
          console.log("Failed to Delete Reporter:", id);
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error Deleting Reporter:", error);
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
          <h4 className="heading1">Reporters List</h4>
          <div className="case-lists mx-auto">
            <div className="menu1">
              <Link
                to="/Reporter/AddReporter"
                style={{
                  background: "rgb(245, 145, 32)",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
                className="btn "
              >
                Add Reporter
              </Link>
              <input
                type="text"
                placeholder="Search by Name/E-mail/Contact"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Displaying Reporter Data */}
            <div className="container-fluid" style={{ overflow: "auto" }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReporters.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{data.reported_name}</td>
                        <td>{data.email_id}</td>
                        <td>{data.phone_number}</td>
                        <td>
                          <button
                            className="btn"
                            style={{ background: "rgb(245, 145, 32)", border: "none", color:"#ffffff" }}
                            onClick={() => handleEditReporterButton(data)}
                          >
                            Edit
                          </button>
                          <div
                            className="btn mx-1"
                            onClick={() => {
                              handleReporterDeleteButton(data.id);
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

export default ReporterManagement;
