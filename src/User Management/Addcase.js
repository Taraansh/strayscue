import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Cases.css";
import CaseReporterDetails from "./CaseReporterDetails";
import CaseAnimalDetails from "./CaseAnimalDetails";
import CaseMedicalDetails from "./CaseMedicalDetails";
import CaseOperationDetails from "./CaseOperationDetails";
import CasePostOperationDetails from "./CasePostOperationDetails";
import { Link } from "react-router-dom";

const Addcase = () => {
  const { user, logoutUser, type_of_case, status_of_case, mortality_of_case } =
    useContext(AuthContext);
    const [activeButton, setActiveButton] = useState(0);

  const buttonStyle = {
    border: "1px solid black",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "2px",
  };


  const handleClick = (index) => {
    setActiveButton(index);
  };

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
      <div
        style={{
          paddingTop: "3rem",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
        }}
      >
        <hr />
        <h4 className="mx-4 px-4">{type_of_case} Case</h4>
        <Link className="float-right" to="/Dashboard">Dashboard</Link>
        <div className="case-lists mx-auto px-4">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="type_of_case" className="form-label">
                Type of case
              </label>
              <input
                id="type_of_case"
                className="form-control my-1"
                aria-label="Type of case"
                name="type_of_case"
                value={type_of_case}
                readOnly
              ></input>
            </div>
            <div className="col">
              <label htmlFor="status_of_case" className="form-label">
                Status of case
              </label>
              <input
                id="status_of_case"
                className="form-control my-1"
                aria-label="Status of case"
                name="status_of_case"
                value={status_of_case}
                readOnly
              ></input>
            </div>
            <div className="col">
              <label htmlFor="mortality_of_case" className="form-label">
                Mortality of case
              </label>
              <input
                id="mortality_of_case"
                className="form-control my-1"
                aria-label="Mortality of case"
                name="mortality_of_case"
                value={mortality_of_case}
                readOnly
              ></input>
            </div>
          </div>
        </div>

        <div className="case-lists mx-auto">
          <div className="mx-auto px-4 container-fluid">
            {/* Change bar */}
            <div
              className="btn-group mt-2"
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
                Reporter Details
              </button>
              <button
                style={buttonStyle}
                type="button"
                className={`btn btn-outline-secondary ${
                  activeButton === 1 ? "active" : ""
                }`}
                onClick={() => handleClick(1)}
              >
                Animal Details
              </button>
              <button
                style={buttonStyle}
                type="button"
                className={`btn btn-outline-secondary ${
                  activeButton === 2 ? "active" : ""
                }`}
                onClick={() => handleClick(2)}
              >
                Medical Details
              </button>
              <button
                style={buttonStyle}
                type="button"
                className={`btn btn-outline-secondary ${
                  activeButton === 3 ? "active" : ""
                }`}
                onClick={() => handleClick(3)}
              >
                Operation Details
              </button>
              <button
                style={buttonStyle}
                type="button"
                className={`btn btn-outline-secondary ${
                  activeButton === 4 ? "active" : ""
                }`}
                onClick={() => handleClick(4)}
              >
                Post Operation Details
              </button>
            </div>

            {activeButton === 0 && <CaseReporterDetails />}
            {activeButton === 1 && <CaseAnimalDetails />}
            {activeButton === 2 && <CaseMedicalDetails />}
            {activeButton === 3 && <CaseOperationDetails />}
            {activeButton === 4 && <CasePostOperationDetails />}
          </div>
        </div>
      </div>
      <i
        className="fa-solid fa-right-from-bracket"
        style={{
          position: "absolute",
          top: "15px",
          right: "20px",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={logoutUser}
      ></i>
    </div>
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
};

export default Addcase;
