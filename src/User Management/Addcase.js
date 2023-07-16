import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Cases.css";
import CaseReporterDetails from "./CaseReporterDetails";
import CaseAnimalDetails from "./CaseAnimalDetails";
import CaseMedicalDetails from "./CaseMedicalDetails";
import CaseOperationDetails from "./CaseOperationDetails";
import CasePostOperationDetails from "./CasePostOperationDetails";
const Addcase = () => {
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
      <div
        style={{
          paddingTop: "3rem",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
        }}
      >
        <hr />
        <h4 className="mx-4 px-2">Edit Case</h4>
        <div className="case-lists mx-auto">
          <div className="px-4">
            <form>
              <div className="row">
                <div className="col">
                  <label htmlFor="type_of_case" className="form-label">
                    Type of case
                  </label>
                  <select
                    id="type_of_case"
                    className="form-select my-1"
                    aria-label="Type of case"
                    name="type_of_case"
                  >
                    <option selected>Choose</option>
                    <option value="sterilization">Sterilization</option>
                    <option value="OPD">OPD</option>
                    <option value="IPD">IPD</option>
                    <option value="vaccination">Vaccination</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="status_of_case" className="form-label">
                    Status of case
                  </label>
                  <select
                    id="status_of_case"
                    className="form-select my-1"
                    aria-label="Status of case"
                    name="status_of_case"
                  >
                    <option defaultValue="">Choose</option>
                    <option value="reported">Reported</option>
                    <option value="admitted">Admitted</option>
                    <option value="blood_test">Blood Test</option>
                    <option value="operation">Operation</option>
                    <option value="post_operation">Post Operation</option>
                    <option value="released">Released</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="mortality_of_case" className="form-label">
                    Mortality of case
                  </label>
                  <select
                    id="mortality_of_case"
                    className="form-select my-1"
                    aria-label="Mortality of case"
                    name="mortality_of_case"
                  >
                    <option defaultValue="">Choose</option>
                    <option value="healthy">Healthy</option>
                    <option value="unhealthy">Unhealthy</option>
                    <option value="fatal">Fatal</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="cause_of_failure" className="form-label">
                  Cause of Failure
                </label>
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control"
                      id="cause_of_failure"
                      placeholder="Cause of Failure"
                    />
                  </div>
                  <div className="col-auto d-flex align-items-center">
                    <button type="submit" className="btn btn-primary mx-1">
                      Save
                    </button>
                    <button type="submit" className="btn btn-primary mx-1">
                      Save &amp; Exit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <CaseReporterDetails />
        <CaseAnimalDetails />
        <CaseMedicalDetails />
        <CaseOperationDetails />
        <CasePostOperationDetails />
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
