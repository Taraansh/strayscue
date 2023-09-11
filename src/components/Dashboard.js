import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import AddModal from "../utils/AddModal";
import "../styles/Cases.css";
import logo from "../assets/profile.png";
import Footer from "./Footer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Dashboard = () => {
  const {
    user,
    logoutUser,
    allCases,
    getAllCases,
    allCasesLinkedWithNGO,
    getAllCasesLinkedWithNgo,
    websiteUrl,
  } = useContext(AuthContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [activeButton, setActiveButton] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredCases, setFilteredCases] = useState([]);
  const [filteredNGOCases, setFilteredNGOCases] = useState([]);
  const stored_ngo_linked_with_this_user = localStorage.getItem(
    "ngo_linked_with_this_user"
  );

  const navigate = useNavigate();

  const buttonStyle = {
    border: "1px solid black",
    fontSize: "16px",
    width: "100%",
    fontWeight: "bold",
    /* padding: 0px 0px 0px 26px; */
    borderRadius: "2px",
  };

  const handleClick = (index) => {
    setActiveButton(index);
  };

  useEffect(() => {
    getAllCases();
    getAllCasesLinkedWithNgo();
  }, [getAllCases, getAllCasesLinkedWithNgo]);

  useEffect(() => {
    // Updated filtering logic for filteredCases and filteredNGOCases
    const filteredCases = allCases.filter((data) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const isEmptyLocation = !data.reportingdetail?.location;
      const isEmptyReporterName = !data.reportingdetail?.reporterName;
      const isEmptyLandmark = !data.reportingdetail?.landmark;

      if (searchQuery.trim() === "") {
        // Show all cases when there is no search query (blank search)
        return (
          activeButton === 0 || data.type_of_case === getCaseType(activeButton)
        );
      } else {
        // Show cases matching the search query, excluding blank cases, and matching the active button type
        return (
          ((!isEmptyLocation &&
            data.reportingdetail.location
              .toLowerCase()
              .includes(lowerCaseSearchQuery)) ||
            (!isEmptyReporterName &&
              data.reportingdetail.reporterName
                .toLowerCase()
                .includes(lowerCaseSearchQuery)) ||
            (!isEmptyLandmark &&
              data.reportingdetail.landmark
                .toLowerCase()
                .includes(lowerCaseSearchQuery))) &&
          (activeButton === 0 ||
            data.type_of_case === getCaseType(activeButton))
        );
      }
    });

    const sortedCases = filteredCases.sort((a, b) => {
      // Convert the date strings to Date objects for comparison
      const dateA = new Date(a.date_when_created);
      const dateB = new Date(b.date_when_created);

      // Sort in descending order (newest first)
      return dateB - dateA;
    });

    const filteredNGOCases = allCasesLinkedWithNGO.filter((data) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const isEmptyLocation = !data.reportingdetail?.location;
      const isEmptyReporterName = !data.reportingdetail?.reporterName;
      const isEmptyLandmark = !data.reportingdetail?.landmark;

      if (searchQuery.trim() === "") {
        // Show all cases when there is no search query (blank search)
        return (
          activeButton === 0 || data.type_of_case === getCaseType(activeButton)
        );
      } else {
        // Show cases matching the search query, excluding blank cases, and matching the active button type
        return (
          ((!isEmptyLocation &&
            data.reportingdetail.location
              .toLowerCase()
              .includes(lowerCaseSearchQuery)) ||
            (!isEmptyReporterName &&
              data.reportingdetail.reporterName
                .toLowerCase()
                .includes(lowerCaseSearchQuery)) ||
            (!isEmptyLandmark &&
              data.reportingdetail.landmark
                .toLowerCase()
                .includes(lowerCaseSearchQuery))) &&
          (activeButton === 0 ||
            data.type_of_case === getCaseType(activeButton))
        );
      }
    });

    const sortedNGOCases = filteredNGOCases.sort((a, b) => {
      // Convert the date strings to Date objects for comparison
      const dateA = new Date(a.date_when_created);
      const dateB = new Date(b.date_when_created);

      // Sort in descending order (newest first)
      return dateB - dateA;
    });

    setFilteredCases(sortedCases);
    setFilteredNGOCases(sortedNGOCases);
  }, [allCases, allCasesLinkedWithNGO, activeButton, searchQuery]);

  const getCaseType = (index) => {
    switch (index) {
      case 1:
        return "Sterilization";
      case 2:
        return "OPD";
      case 3:
        return "IPD";
      case 4:
        return "Vaccination";
      default:
        return "";
    }
  };

  // Determine which set of cases to display based on user's NGO link
  const casesToShow = stored_ngo_linked_with_this_user
    ? filteredNGOCases
    : filteredCases;

  // Calculate the counts for each status
  const totalCasesCount = casesToShow.length;
  const reportedCount = casesToShow.filter(
    (data) => data.status_of_case === "Reported"
  ).length;
  const admittedCount = casesToShow.filter(
    (data) => data.status_of_case === "Admitted"
  ).length;
  const releasedCount = casesToShow.filter(
    (data) => data.status_of_case === "Released"
  ).length;

  const handleEditCaseButton = (data) => {
    navigate("/Editcase", { state: { data: data } });
  };

  const handleStatusChange = async (case_id, newStatus) => {
    try {
      const response = await fetch(`${websiteUrl}/cases/update/${case_id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status_of_case: newStatus }),
      });
      if (response.ok) {
        // Status successfully updated, perform any necessary actions
        window.location.reload();
        // Refresh the cases list after updating status
      } else {
        // Handle the case when the PUT request fails
        toast.error("Failed to update status");
      }
    } catch (error) {
      // Handle any errors that occur during the PUT request
      console.error("Error updating status:", error);
    }
  };

  const handleCaseDeleteButton = async (case_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this case?"
    );
    if (confirmDelete) {
      try {
        // Delete the specific case by making an API call
        const response = await fetch(`${websiteUrl}/cases/delete/${case_id}/`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Order successfully deleted, perform any necessary actions (e.g., refresh the order list)
          getAllCases(); // Refresh the case list after deletion
          getAllCasesLinkedWithNgo(); // Refresh the case list after deletion
        } else {
          // Handle the case when the delete request fails
          toast.error("Failed to delete Case");
        }
      } catch (error) {
        // Handle any errors that occur during the delete operation
        console.error("Error deleting case:", error);
      }
    }
  };

  return user ? (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
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
              paddingBottom: "3rem",
            }}
            className="container"
          >
            <h4 className="heading1">Dashboard</h4>

            <div className="cases mx-auto">
              <div className="case-set1">
                <div className="case-card">
                  <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {totalCasesCount}
                  </h3>
                  <p>Total Cases</p>
                </div>

                <div className="case-card">
                  <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {reportedCount}
                  </h3>
                  <p>Reported</p>
                </div>
              </div>

              <div className="case-set1">
                <div className="case-card">
                  <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {admittedCount}
                  </h3>
                  <p>Admitted</p>
                </div>

                <div className="case-card">
                  <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {releasedCount}
                  </h3>
                  <p>Released</p>
                </div>
              </div>
            </div>

            <div className="case-lists mx-auto">
              <h4 style={{ marginLeft: "1rem" }}>Case List</h4>
              <hr />

              <div className="menu1">
                <Link
                  onClick={() => setModalShow(true)}
                  style={{
                    background: "rgb(245, 145, 32)",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                  className="btn "
                >
                  Add Case
                </Link>
                <span style={{ display: "flex" }}>
                  <input
                  id="search-query"
                    type="text"
                    placeholder="Search by Reporter Name, location, landmark"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="button"
                    style={{
                      background: "rgb(245, 145, 32)",
                      border: "none",
                      color: "#ffffff",
                    }}
                    className="btn mx-1"
                    onClick={(e) => {
                      setSearchQuery("");
                    }}
                  >
                    Clear
                  </button>
                </span>
              </div>
              {/* Displaying Case Data */}
              <div>
                <div className="container-fluid" style={{ overflow: "auto" }}>
                  <div
                    className="btn-group my-2 mb-4"
                    style={{ width: "100%" }}
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      style={buttonStyle}
                      type="button"
                      className={`btn btn-outline-secondary ${
                        activeButton === 0 ? "active" : ""
                      }`}
                      onClick={() => handleClick(0)}
                    >
                      All
                    </button>
                    <button
                      style={buttonStyle}
                      type="button"
                      className={`btn btn-outline-secondary ${
                        activeButton === 1 ? "active" : ""
                      }`}
                      onClick={() => handleClick(1)}
                    >
                      Sterilization
                    </button>
                    <button
                      style={buttonStyle}
                      type="button"
                      className={`btn btn-outline-secondary ${
                        activeButton === 2 ? "active" : ""
                      }`}
                      onClick={() => handleClick(2)}
                    >
                      OPD
                    </button>
                    <button
                      style={buttonStyle}
                      type="button"
                      className={`btn btn-outline-secondary ${
                        activeButton === 3 ? "active" : ""
                      }`}
                      onClick={() => handleClick(3)}
                    >
                      IPD
                    </button>
                    <button
                      style={buttonStyle}
                      type="button"
                      className={`btn btn-outline-secondary ${
                        activeButton === 4 ? "active" : ""
                      }`}
                      onClick={() => handleClick(4)}
                    >
                      Vaccination
                    </button>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">ACTION</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">REPORTER NAME</th>
                        <th scope="col">LOCATION</th>
                        <th scope="col">LANDMARK</th>
                        <th scope="col">PINCODE</th>
                        <th scope="col">CREATED BY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stored_ngo_linked_with_this_user
                        ? filteredNGOCases.map((data, index) => {
                            return (
                              <tr key={index}>
                                <th
                                  scope="row"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                  }}
                                >
                                  {/* {index + 1} */}
                                  <button
                                    className="btn"
                                    style={{
                                      background: "rgb(245, 145, 32)",
                                      border: "none",
                                      color: "#ffffff",
                                    }}
                                    onClick={() => {
                                      handleEditCaseButton(data);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <div
                                    className="btn mx-1"
                                    onClick={() => {
                                      handleCaseDeleteButton(data.case_id);
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
                                </th>
                                <td>
                                  <select
                                    id="status_of_case"
                                    className="form-select my-1"
                                    aria-label="Status of case"
                                    name="status_of_case"
                                    value={data.status_of_case}
                                    onChange={(e) => {
                                      const newStatus = e.target.value;
                                      handleStatusChange(
                                        data.case_id,
                                        newStatus
                                      );
                                    }}
                                  >
                                    <option value="Reported">Reported</option>
                                    <option value="Admitted">Admitted</option>
                                    <option value="Blood Test">
                                      Blood Test
                                    </option>
                                    <option value="Operation">Operation</option>
                                    <option value="Post Operation">
                                      Post Operation
                                    </option>
                                    <option value="Released">Released</option>
                                  </select>
                                </td>
                                <td>{data.reportingdetail?.reporterName}</td>
                                <td>{data.reportingdetail?.location}</td>
                                <td>{data.reportingdetail?.landmark}</td>
                                <td>{data.reportingdetail?.pincode}</td>
                                <td>{data.user_name}</td>
                              </tr>
                            );
                          })
                        : filteredCases.map((data, index) => {
                            return (
                              <tr key={index}>
                                <th
                                  scope="row"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                  }}
                                >
                                  {/* {index + 1} */}
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      handleEditCaseButton(data);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <div
                                    className="btn btn-primary mx-1"
                                    onClick={() => {
                                      handleCaseDeleteButton(data.case_id);
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
                                </th>
                                <td>
                                  <select
                                    id="status_of_case"
                                    className="form-select my-1"
                                    aria-label="Status of case"
                                    name="status_of_case"
                                    defaultValue={data.status_of_case}
                                    onChange={(e) => {
                                      const newStatus = e.target.value;
                                      handleStatusChange(
                                        data.case_id,
                                        newStatus
                                      );
                                    }}
                                  >
                                    <option value="Reported">Reported</option>
                                    <option value="Admitted">Admitted</option>
                                    <option value="Blood Test">
                                      Blood Test
                                    </option>
                                    <option value="Operation">Operation</option>
                                    <option value="Post Operation">
                                      Post Operation
                                    </option>
                                    <option value="Released">Released</option>
                                  </select>
                                </td>
                                <td>{data.reportingdetail?.reporterName}</td>
                                <td>{data.reportingdetail?.location}</td>
                                <td>{data.reportingdetail?.landmark}</td>
                                <td>{data.reportingdetail?.pincode}</td>
                                <td>{data.user_name}</td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <AddModal show={modalShow} onHide={() => setModalShow(false)} />
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
            <Link
              to="/Settings"
              style={{ textDecoration: "none", color: "black" }}
            >
              <span
                style={{
                  padding: "0.5rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {localStorage.getItem("username")}
              </span>
              <img
                width="17%"
                style={{ marginRight: "1.5rem", cursor: "pointer" }}
                src={logo}
                alt="Logo"
              ></img>
            </Link>

            <i
              style={{ cursor: "pointer" }}
              className="fa-solid fa-right-from-bracket"
              onClick={logoutUser}
            ></i>
          </span>
        </div>
        <Footer />
      </div>
    </>
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
};

export default Dashboard;
