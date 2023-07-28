import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";

const NGOManagement = () => {
  const { user, logoutUser, allNgos, getAllNgos, websiteUrl } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNgos, setFilteredNgos] = useState([]);
  const isSuperUser = localStorage.getItem("is_superuser");

  const navigate = useNavigate();

  useEffect(() => {
    getAllNgos();
  }, [getAllNgos]);

  useEffect(() => {
    // Filter NGOs based on search query
    const filtered = allNgos.filter((data) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      return (
        data.ngo_name.toLowerCase().includes(lowerCaseSearchQuery) ||
        data.darpan_id.toLowerCase().includes(lowerCaseSearchQuery)
      );
    });
    setFilteredNgos(filtered);
  }, [allNgos, searchQuery]);

  const handleEditNgoButton = (data) => {
    navigate("/NGO/EditNgo", { state: { data: data } });
  };

  const handleNgoDeleteButton = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this NGO?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific NGO by making an API call
        const response = await fetch(
          `${websiteUrl}/ngos/delete/${id}/`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // NGO successfully deleted, perform any necessary actions (e.g., refresh the NGO list)
          getAllNgos(); // Refresh the NGO list after deletion
        } else {
          // Handle the case when the delete request fails
          console.log("Failed to Delete NGO:", id);
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error Deleting NGO:", error);
      }
    }
  };

  return (
    isSuperUser === "true" &&
    user && (
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
            <h4 className="heading1">NGO Management</h4>
            <div className="case-lists mx-auto">
              <div className="menu1">
                <Link
                  to="/NGO/AddNgo"
                  style={{
                    background: "rgb(245, 145, 32)",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                  className="btn "
                >
                  Add NGO
                </Link>
                <input
                  type="text"
                  placeholder="Search by Name/Darpan ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* Displaying Case Data */}
              <div className="container-fluid" style={{ overflow: "scroll" }}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Darpan ID</th>
                      <th scope="col">Logo</th>
                      <th scope="col">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNgos.map((data, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{data.ngo_name}</td>
                          <td>{data.darpan_id}</td>
                          <td>
                            <img
                              src={`http://localhost:8000${data.ngo_logo}`}
                              alt="NGO Logo"
                              height="30px"
                            />
                          </td>
                          <td style={{display:"flex", flexDirection:"row"}}>
                          <button
                                className="btn btn-primary"
                                style={{ background: "rgb(245, 145, 32)", border:"none"}}
                                onClick={() => {
                                  handleEditNgoButton(data);
                                }}
                              >
                                Edit
                              </button>
                            <div
                              className="btn  mx-1"
                              style={{background:"#ffffff", color:"red"}}
                              onClick={() => {
                                handleNgoDeleteButton(data.id);
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

export default NGOManagement;
