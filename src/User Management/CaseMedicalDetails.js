import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function CaseMedicalDetails() {
  const { date } = useContext(AuthContext);
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
      <h2>Medical Details:</h2>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="medicalHistory" className="form-label">
              Medical History / Other Issues
            </label>
            <input
              type="text"
              className="form-control"
              id="medicalHistory"
              aria-describedby="medicalHistoryHelp"
              name="medicalHistory"
              placeholder="Medical History / Other Issues"
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="vaccinationStatus" className="form-label">
              Animal Vaccinated
            </label>
            <select
              id="vaccinationStatus"
              className="form-select"
              aria-label="Animal Vaccinated"
              name="vaccinationStatus"
            >
              {/* <option value="ChooseBreed">Choose Breed</option>*/}
              <option value="Already Done">Already Done</option>
              <option value="To be done in NGO">To be done in NGO</option>
              <option value="Not Done">Not Done</option>
              <option value="Unsure">Unsure</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="dewormed" className="form-label">
              Animal Dewormed
            </label>
            <select
              id="dewormed"
              className="form-select"
              aria-label="Animal Dewormed"
              name="dewormed"
            >
              {/* <option value="ChooseBreed">Choose Breed</option>*/}
              <option value="Already Done">Already Done</option>
              <option value="To be done in NGO">To be done in NGO</option>
              <option value="Not Done">Not Done</option>
              <option value="Unsure">Unsure</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="fitForSurgery" className="form-label">
              Animal Fit for Surgery
            </label>
            <select
              id="fitForSurgery"
              className="form-select"
              aria-label="Animal Fit for Surgery"
              name="fitForSurgery"
            >
              {/* <option value="ChooseBreed">Choose Breed</option>*/}
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Unsure">Unsure</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="otherDetails" className="form-label">
              Other Details
            </label>
            <input
              type="text"
              className="form-control"
              id="otherDetails"
              aria-describedby="otherDetailsHelp"
              name="otherDetails"
              placeholder="Other Details"
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label className="form-label" htmlFor="admissionDate">
              Admission Date
            </label>
            <input
              className="form-control"
              id="admissionDate"
              name="admissionDate"
              defaultValue={date}
              type="date"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="bloodReportImage">
              Blood Report Pictures -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="bloodReportImage"
                accept="image/*"
                name="bloodReportImage"
                //   onChange={(event) => setFrontImageFile(event.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="feedingRecordImage">
              Feeding Record Pictures -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="feedingRecordImage"
                accept="image/*"
                name="feedingRecordImage"
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
