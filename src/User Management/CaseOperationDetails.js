import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function CaseOperationDetails() {
  const { date, time } = useContext(AuthContext);
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
      <h2>Operation Details :</h2>
      <div className="row">
        <div className="col">
          <div className="form-group mb-3">
            <label htmlFor="vetName" className="form-label">
              Vet Name
            </label>
            <input
              type="text"
              className="form-control"
              id="vetName"
              aria-describedby="vetNameHelp"
              name="vetName"
              placeholder="Vet Name"
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="operationDate">
              Operation Date
            </label>
            <input
              className="form-control"
              id="operationDate"
              name="operationDate"
              value={date}
              type="date"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <div className="row">
            <div className="form-group col">
              <label className="form-label" htmlFor="operationStartTime">
                Operation Start Time
              </label>
              <input
                className="form-control"
                id="operationStartTime"
                name="operationStartTime"
                value={time}
                type="time"
              />
            </div>
            <div className="form-group col">
              <label className="form-label" htmlFor="operationEndTime">
                Operation End Time
              </label>
              <input
                className="form-control"
                id="operationEndTime"
                name="operationEndTime"
                value={time}
                type="time"
              />
            </div>
          </div>
        </div>
        <div className="col mb-3">
          <label htmlFor="operationOutcome" className="form-label">
            Operation Outcome
          </label>
          <select
            id="operationOutcome"
            className="form-select"
            aria-label="Operation Outcome"
            name="operationOutcome"
          >
            {/* <option value="ChooseBreed">Choose Breed</option>*/}
            <option value="Success">Success</option>
            <option value="Failure">Failure</option>
            <option value="Complicated">Complicated</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="form-label" htmlFor="medicalPrescriptionImage">
              Medication Prescription -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="medicalPrescriptionImage"
                accept="image/*"
                name="medicalPrescriptionImage"
                //   onChange={(event) => setFrontImageFile(event.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="form-label" htmlFor="treatmentRecordImage">
              Treatment Records -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="treatmentRecordImage"
                accept="image/*"
                name="treatmentRecordImage"
                //   onChange={(event) => setFrontImageFile(event.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="form-label" htmlFor="organImage">
              Organ Pictures -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="organImage"
                accept="image/*"
                name="organImage"
                //   onChange={(event) => setFrontImageFile(event.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-1">
        <button type="button" className="btn btn-primary">
          Previous
        </button>
        <button type="button" className="btn btn-primary mx-2">
          Exit
        </button>
        <button type="submit" className="btn btn-primary float-end mx-1">
          Save & Next
        </button>
        <button type="submit" className="btn btn-primary float-end mx-1">
          Save & Exit
        </button>
      </div>
    </div>
  );
}
