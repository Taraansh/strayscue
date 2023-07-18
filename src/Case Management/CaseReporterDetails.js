import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CaseReporterDetails() {
  const { case_id } = useContext(AuthContext);
  const [frontImageFile, setFrontImageFile] = useState(null);
  const [backImageFile, setBackImageFile] = useState(null);
  const [reporterName, setReporterName] = useState(null);
  const [reporterContact, setReporterContact] = useState(null);
  const [reporterAltContact, setReporterAltContact] = useState(null);
  const [reporterEmail, setReporterEmail] = useState(null);
  const [location, setLocation] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [landmark, setLandmark] = useState(null);
  const [reportedDate, setReportedDate] = useState(null);
  const [reportedTime, setReportedTime] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);
  const [consentFormImageFile, setConsentFormImageFile] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState("");
  const [backImagePreview, setBackImagePreview] = useState("");
  const [consentFormImagePreview, setConsentFormImagePreview] = useState("");
  const navigate = useNavigate();

  const handleFrontImageChange = (event) => {
    const file = event.target.files[0];
    setFrontImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFrontImagePreview("");
    }
  };

  const handleBackImageChange = (event) => {
    const file = event.target.files[0];
    setBackImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBackImagePreview("");
    }
  };

  const handleConsentFormImageChange = (event) => {
    const file = event.target.files[0];
    setConsentFormImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setConsentFormImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setConsentFormImagePreview("");
    }
  };

  const handleReportingDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("frontImage", frontImageFile);
    formData.append("backImage", backImageFile);
    formData.append("consentFormImage", consentFormImageFile);
    formData.append("reporterName", reporterName);
    formData.append("reporterContact", reporterContact);
    formData.append(
      "reporterAltContact",
      reporterAltContact ? reporterAltContact : ""
    );
    formData.append("reporterEmail", reporterEmail ? reporterEmail : "");
    formData.append("location", location);
    formData.append("pincode", pincode);
    formData.append("landmark", landmark);
    formData.append("reportedDate", reportedDate ? reportedDate : "1111-11-11");
    formData.append("reportedTime", reportedTime ? reportedTime : "11:11:11");
    formData.append("pickupDate", pickupDate ? pickupDate : "1111-11-11");
    formData.append("pickupTime", pickupTime ? pickupTime : "11:11:11");
    formData.append("case_linked", case_id);

    // console.log(formData.get("reporterName"))
    // console.log(formData.get("reporterContact"))
    // console.log(formData.get("reporterAltContact"))
    // console.log(formData.get("reporterEmail"))
    // console.log(formData.get("location"))
    // console.log(formData.get("pincode"))
    // console.log(formData.get("landmark"))
    // console.log(formData.get("reportedDate"))
    // console.log(formData.get("reportedTime"))
    // console.log(formData.get("pickupDate"))
    // console.log(formData.get("pickupTime"))
    // console.log(formData.get("case_linked"))

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cases/addreporter/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Reporter Added Successfully");
        // Handle success or display a success message.
      } else {
        console.error("Error:", response.data);
        // Handle error or display an error message.
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error or display an error message.
    }
  };

  // const handleReportingDetails = (e) => {
  //   e.preventDefault();

  //   const data = {
  //     frontImage: frontImageFile ? frontImageFile : null,
  //     backImage: backImageFile ? backImageFile : null,
  //     consentFormImage: consentFormImageFile ? consentFormImageFile : null,
  //     reporterName: reporterName,
  //     reporterContact: reporterContact,
  //     reporterAltContact: reporterAltContact,
  //     reporterEmail: reporterEmail,
  //     location: location,
  //     pincode: pincode,
  //     landmark: landmark,
  //     reportedDate: reportedDate ? reportedDate : date,
  //     reportedTime: reportedTime ? reportedTime : time,
  //     pickupDate: pickupDate ? pickupDate : date,
  //     pickupTime: pickupTime ? pickupTime : time,
  //     case_linked: case_id,
  //     // caseId: caseID,
  //   };
  //   console.log(data)

  //   // Perform your POST request with the data payload
  //   fetch("http://127.0.0.1:8000/cases/addreporter/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       // Handle response data
  //       console.log(responseData);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error(error);
  //     });
  // };

  const handleSaveExit = (e) => {
    handleReportingDetails(e);
    navigate("/Dashboard");
  };

  const handleSaveNext = (e) => {
    handleReportingDetails(e);
  };

  return (
    <div className="my-3">
      <h2>Reporter Details:</h2>
      <form>
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
                onChange={(e) => setReporterName(e.target.value)}
                autoComplete="name"
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
                onChange={(e) => setReporterContact(e.target.value)}
                autoComplete="number"
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
                onChange={(e) => setReporterAltContact(e.target.value)}
                autoComplete="altnumber"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="reporterEmail" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
                id="reporterEmail"
                aria-describedby="emailHelp"
                name="reporterEmail"
                placeholder="Email ID"
                onChange={(e) => setReporterEmail(e.target.value)}
                autoComplete="email"
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
                onChange={(e) => setLandmark(e.target.value)}
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
                onChange={(e) => setPincode(e.target.value)}
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
                onChange={(e) => setLocation(e.target.value)}
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
              type="date"
              onChange={(e) => setReportedDate(e.target.value)}
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
              type="time"
              onChange={(e) => setReportedTime(e.target.value)}
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
              onChange={(e) => setPickupDate(e.target.value)}
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
              type="time"
              onChange={(e) => setPickupTime(e.target.value)}
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
                  onChange={handleFrontImageChange}
                />
              </div>
            </div>
            {frontImagePreview && (
              <div>
                <h6>Preview:</h6>
                <img
                  src={frontImagePreview}
                  alt="Front Preview"
                  height="100px"
                />
              </div>
            )}
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
                  onChange={handleBackImageChange}
                />
              </div>
            </div>
            {backImagePreview && (
              <div>
                <h6>Preview:</h6>
                <img src={backImagePreview} alt="Back Preview" height="100px" />
              </div>
            )}
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
                onChange={handleConsentFormImageChange}
              />
            </div>
          </div>
          {consentFormImagePreview && (
            <div>
              <h6>Preview:</h6>
              <img
                src={consentFormImagePreview}
                alt="Consent Form Preview"
                height="100px"
              />
            </div>
          )}
        </div>

        <div className="my-1">
          <button type="button" className="btn btn-primary">
            Previous
          </button>
          <button type="button" className="btn btn-primary mx-2">
            Exit
          </button>
          <button
            type="button"
            className="btn btn-primary float-end mx-1"
            onClick={handleSaveNext}
          >
            Save & Next
          </button>
          <button
            type="button"
            className="btn btn-primary float-end mx-1"
            onClick={handleSaveExit}
          >
            Save & Exit
          </button>
        </div>
      </form>
    </div>
  );
}
