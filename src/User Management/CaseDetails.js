import React, {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";

export default function CaseDetails() {
    let { addNewCase } = useContext(AuthContext);
    const [activeButton, setActiveButton] = useState(null);
    const buttonStyle = {
      border:"1px solid black",
      fontSize:"16px",
      fontWeight:"bold",
      borderRadius:"2px"
    };
    const handleClick = (buttonIndex) => {
      setActiveButton(buttonIndex);
    };
  return (
    <div className="container p-4 case-lists">
      <div className="btn-group py-4 mb-2" role="group" aria-label="Basic outlined example">
          <button
          style={buttonStyle}
            type="button"
            className={`btn btn-outline-secondary ${activeButton === 0 ? "active" : ""
              }`}
            onClick={() => handleClick(0)}
          >
            Reporter Details
          </button>
          <button
          style={buttonStyle}
            type="button"
            className={`btn btn-outline-secondary ${activeButton === 1 ? "active" : ""
              }`}
            onClick={() => handleClick(1)}
          >
            Animal Details
          </button>
          <button
            style={buttonStyle}
            type="button"
            className={`btn btn-outline-secondary ${activeButton === 2 ? "active" : ""
              }`}
            onClick={() => handleClick(2)}
          >
            Medical Details
          </button>
          <button
            style={buttonStyle}
            type="button"
            className={`btn btn-outline-secondary ${activeButton === 3 ? "active" : ""
              }`}
            onClick={() => handleClick(3)}
          >
           Operation Details
          </button>
          <button
            style={buttonStyle}
            type="button"
            className={`btn btn-outline-secondary ${activeButton === 4 ? "active" : ""
              }`}
            onClick={() => handleClick(4)}
          >
           Post Operation Details
          </button>
        </div>
      <h2>Add Case</h2>
      <form onSubmit={addNewCase}>
        <div className="row">
          <div className="col">
            <label htmlFor="type_of_case" className="form-label">
              Type of case
            </label>
            <select
              id="type_of_case"
              className="form-select my-1"
              aria-label="Type of case"
            >
              <option defaultValue="">Choose</option>
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
  );
}
