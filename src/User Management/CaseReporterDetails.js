import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function CaseReporterDetails() {
  const {date, time} = useContext(AuthContext)
  const [frontImageFile, setFrontImageFile] = useState(null);
  const [backImageFile, setBackImageFile] = useState(null);
  const [consentFormImageFile, setConsentFormImageFile] = useState(null);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("frontImage", frontImageFile);
    formData.append("backImage", backImageFile);
    formData.append("consentFormImage", consentFormImageFile);

    // Get the other form data
    const formElement = event.target;
    const inputs = formElement.querySelectorAll("input");
    inputs.forEach((input) => {
      if (input.name && input.value !== "") {
        formData.append(input.name, input.value);
      }
    });

    // Perform your POST request with the formData
    fetch("/your-post-endpoint", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log(data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
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
      <h2>Reporter Details:</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="reporterName" className="form-label">
                Reporter Name
              </label>
              <input
                type="text"
                className="form-control"
                id="reporterName"
                aria-describedby="reporterNameHelp"
                name="reporterName"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="contact"
                aria-describedby="contactHelp"
                name="reporterContact"
                placeholder="Phone Number"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="altcontact" className="form-label">
                Alternte Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="altcontact"
                aria-describedby="altCcontactHelp"
                name="reporterAltContact"
                placeholder="Alternate Phone Number"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="reporterEmail"
                placeholder="Email ID"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Landmark
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                aria-describedby="addressHelp"
                name="landmark"
                placeholder="Near to xyz place"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">
                Pincode
              </label>
              <input
                type="text"
                className="form-control"
                id="pincode"
                aria-describedby="pincodeHelp"
                name="pincode"
                placeholder="Pincode"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                aria-describedby="locationHelp"
                name="location"
                placeholder="Location"
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label className="form-label" htmlFor="reporteddate">
              Reported Date
            </label>
            <input
              className="form-control"
              id="reporteddate"
              name="reportedDate"
              value={date}
              type="date"
            />
          </div>
          <div className="form-group col">
            <label className="form-label" htmlFor="reportedTime">
              Reported Time
            </label>
            <input
              className="form-control"
              id="reportedTime"
              name="reportedTime"
value={time}              type="time"
            />
          </div>
          <div className="form-group col">
            <label className="form-label" htmlFor="pickupDate">
              Pickup Date
            </label>
            <input
              className="form-control"
              id="pickupDate"
              name="pickupDate"
              placeholder="MM/DD/YYYY"
              type="date"
              value={date}
            />
          </div>
          <div className="form-group col">
            <label className="form-label" htmlFor="pickupTime">
              Pickup Time
            </label>
            <input
              className="form-control"
              id="pickupTime"
              name="pickupTime"
              value={time}
              type="time"
            />
          </div>
        </div>

        <h4 className="my-2">Reporter Photo ID-</h4>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label className="form-label" htmlFor="frontImage">
                Front Photo:
              </label>
              <div className="custom-file">
                <input
                  type="file"
                  className="btn custom-file-input"
                  id="frontImage"
                  accept="image/*"
                  name="frontImage"
                  onChange={(event) => setFrontImageFile(event.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label className="form-label" htmlFor="backImage">
                Back Photo:
              </label>
              <div className="custom-file">
                <input
                  type="file"
                  className="btn custom-file-input"
                  id="backImage"
                  name="backImage"
                  accept="image/*"
                  onChange={(event) => setBackImageFile(event.target.files[0])}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label className="form-label" htmlFor="consentFormImage">
              Consent Form
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="consentFormImage"
                name="consentFormImage"
                accept="image/*"
                onChange={(event) =>
                  setConsentFormImageFile(event.target.files[0])
                }
              />
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
      </form>
    </div>
  );
}
