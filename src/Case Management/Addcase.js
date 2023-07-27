import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Cases.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/profile.png";
import '../styles/Addcase.css';
const Addcase = () => {
  const {
    user,
    logoutUser,
    type_of_case,
    status_of_case,
    mortality_of_case,
    case_id,
    username
  } = useContext(AuthContext);
  const navigate = useNavigate();
  // Active Button State
  const [activeButton, setActiveButton] = useState(0);

  // Reporting Details State
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

  // Animal Details State
  const [animalSpecies, setAnimalSpecies] = useState(null);
  const [animalBreed, setAnimalBreed] = useState(null);
  const [animalAge, setAnimalAge] = useState(null);
  const [animalTemperament, setAnimalTemperament] = useState(null);
  const [animalGender, setAnimalGender] = useState(null);
  const [animalPregnant, setAnimalPregnant] = useState(null);
  const [animalMarking, setAnimalMarking] = useState(null);
  const [animalColor, setAnimalColor] = useState(null);
  const [animalCatchable, setAnimalCatchable] = useState(null);
  const [animalWeight, setAnimalWeight] = useState(null);
  const [admissionReason, setAdmissionReason] = useState(null);
  const [animalPictures, setAnimalPictures] = useState(null);
  const [animalPicturesPreview, setAnimalPicturesPreview] = useState("");

  // Medical Details State
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [vaccinationStatus, setVaccinationStatus] = useState(null);
  const [dewormed, setDewormed] = useState(null);
  const [fitForSurgery, setFitForSurgery] = useState(null);
  const [otherDetails, setOtherDetails] = useState(null);
  const [admissionDate, setAdmissionDate] = useState(null);
  const [feedingRecordImage, setFeedingRecordImage] = useState(null);
  const [feedingRecordImagePreview, setFeedingRecordImagePreview] =
    useState("");
  const [bloodReportImage, setBloodReportImage] = useState(null);
  const [bloodReportImagePreview, setBloodReportImagePreview] = useState("");

  // Operation Details State
  const [vetName, setVetName] = useState(null);
  const [operationDate, setOperationDate] = useState(null);
  const [operationStartTime, setOperationStartTime] = useState(null);
  const [operationEndTime, setOperationEndTime] = useState(null);
  const [operationOutcome, setOperationOutcome] = useState(null);
  const [medicalPrescriptionImage, setMedicalPrescriptionImage] =
    useState(null);
  const [medicalPrescriptionImagePreview, setMedicalPrescriptionImagePreview] =
    useState(null);
  const [treatmentRecordImage, setTreatmentRecordImage] = useState(null);
  const [treatmentRecordImagePreview, setTreatmentRecordImagePreview] =
    useState(null);
  const [organImage, setOrganImage] = useState(null);
  const [organImagePreview, setOrganImagePreview] = useState(null);

  // Post Operation Details State
  const [popComment, setPopComment] = useState(null);
  const [popFacility, setPopFacility] = useState(null);
  const [popExpectedDays, setPopExpectedDays] = useState(null);
  const [popStartDate, setPopStartDate] = useState(null);
  const [popEndDate, setPopEndDate] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [euthanized, setEuthanized] = useState(null);
  const [comments, setComments] = useState(null);
  const [popPictures, setPopPictures] = useState(null);
  const [popPicturesPreview, setPopPicturesPreview] = useState(null);
  const [releasePictures, setReleasePictures] = useState(null);
  const [releasePicturesPreview, setReleasePicturesPreview] = useState(null);

  const buttonStyle = {
    border: "1px solid black",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "2px",
  };

  const handleClick = (index) => {
    setActiveButton(index);
  };

  // Reporting Details Image Management
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

  const handleDeleteFrontImage = () => {
    setFrontImageFile(null);
    setFrontImagePreview('');
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

  const handleDeleteBackImage = () => {
    setBackImageFile(null);
    setBackImagePreview('');
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

  const handleDeleteConsentFormImage = () => {
    setConsentFormImageFile(null);
    setConsentFormImagePreview('');
  };

  // Animal Details Image Management
  const handleAnimalPictursChange = (event) => {
    const file = event.target.files[0];
    setAnimalPictures(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAnimalPicturesPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAnimalPicturesPreview("");
    }
  };

  const handleDeleteAnimalPicture = () => {
    setAnimalPictures(null);
    setAnimalPicturesPreview('');
  };

  // Medical Details Image Management
  const handleFeedingRecordImage = (event) => {
    const file = event.target.files[0];
    setFeedingRecordImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeedingRecordImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFeedingRecordImagePreview("");
    }
  };

  const handleDeleteFeedingRecordImage = () => {
    setFeedingRecordImage(null);
    setFeedingRecordImagePreview('');
  };

  const handleBloodReportImage = (event) => {
    const file = event.target.files[0];
    setBloodReportImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBloodReportImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBloodReportImagePreview("");
    }
  };

  const handleDeleteBloodReportImage = () => {
    setBloodReportImage(null);
    setBloodReportImagePreview('');
  };

  // Operation Details Image Management
  const handleMedicalPrescriptionImage = (event) => {
    const file = event.target.files[0];
    setMedicalPrescriptionImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedicalPrescriptionImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setMedicalPrescriptionImagePreview("");
    }
  };

  const handleDeleteMedicalPrescriptionImage = () => {
    setMedicalPrescriptionImage(null);
    setMedicalPrescriptionImagePreview('');
  };

  const handleTreatmentRecordImage = (event) => {
    const file = event.target.files[0];
    setTreatmentRecordImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTreatmentRecordImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setTreatmentRecordImagePreview("");
    }
  };

  const handleDeleteTreatmentRecordImage = () => {
    setTreatmentRecordImage(null);
    setTreatmentRecordImagePreview('');
  };

  const handleOrganImage = (event) => {
    const file = event.target.files[0];
    setOrganImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrganImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setOrganImagePreview("");
    }
  };

  const handleDeleteOrganImage = () => {
    setOrganImage(null);
    setOrganImagePreview('');
  };

  // Post Operation Details Image Management
  const handlePopPictures = (event) => {
    const file = event.target.files[0];
    setPopPictures(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPopPicturesPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPopPicturesPreview("");
    }
  };

  const handleDeletePopPictures= () => {
    setPopPictures(null);
    setPopPicturesPreview('');
  };

  const handleReleasePictures = (event) => {
    const file = event.target.files[0];
    setReleasePictures(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReleasePicturesPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setReleasePicturesPreview("");
    }
  };

  const handleDeleteReleasePictures = () => {
    setReleasePictures(null);
    setReleasePicturesPreview('');
  };

  // Handling Reporting Details
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
        setActiveButton(1);
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

  // Handling Animal Details
  const handleAnimalDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("animalSpecies", animalSpecies ? animalSpecies : "");
    formData.append("animalBreed", animalBreed ? animalBreed : "");
    formData.append("animalAge", animalAge ? animalAge : "");
    formData.append(
      "animalTemperament",
      animalTemperament ? animalTemperament : ""
    );
    formData.append("animalGender", animalGender ? animalGender : "");
    formData.append("animalPregnant", animalPregnant ? animalPregnant : "");
    formData.append("animalMarking", animalMarking ? animalMarking : "");
    formData.append("animalColor", animalColor ? animalColor : "");
    formData.append("animalCatchable", animalCatchable ? animalCatchable : "");
    formData.append("animalWeight", animalWeight ? animalWeight : "");
    formData.append("admissionReason", admissionReason ? admissionReason : "");
    formData.append("animalPictures", animalPictures ? animalPictures : "");
    formData.append("case_linked", case_id);

    console.log(formData.get("animalSpecies"));
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cases/addanimal/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Animal Details Added Successfully");
        setActiveButton(2);
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

  // Handling Medical Details
  const handleMedicalDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bloodReportImage", bloodReportImage);
    formData.append("feedingRecordImage", feedingRecordImage);
    formData.append("medicalHistory", medicalHistory ? medicalHistory : "");
    formData.append(
      "vaccinationStatus",
      vaccinationStatus ? vaccinationStatus : ""
    );
    formData.append("dewormed", dewormed ? dewormed : "");
    formData.append("fitForSurgery", fitForSurgery ? fitForSurgery : "");
    formData.append("otherDetails", otherDetails ? otherDetails : "");
    formData.append(
      "admissionDate",
      admissionDate ? admissionDate : "1111-11-11"
    );
    formData.append("case_linked", case_id);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cases/addmedical/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Medical Details Added Successfully");
        setActiveButton(3);
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

  // Handling Operation Details
  const handleOperationDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("medicalPrescriptionImage", medicalPrescriptionImage);
    formData.append("treatmentRecordImage", treatmentRecordImage);
    formData.append("organImage", organImage);
    formData.append("vetName", vetName ? vetName : "");
    formData.append(
      "operationDate",
      operationDate ? operationDate : "1111-11-11"
    );
    formData.append(
      "operationStartTime",
      operationStartTime ? operationStartTime : "11:11:11"
    );
    formData.append(
      "operationEndTime",
      operationEndTime ? operationEndTime : "11:11:11"
    );
    formData.append(
      "operationOutcome",
      operationOutcome ? operationOutcome : ""
    );
    formData.append("case_linked", case_id);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cases/addoperational/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Operation Details Added Successfully");
        setActiveButton(4);
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

  // Handling Post Operation Details
  const handlePostOperationDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("popPictures", popPictures);
    formData.append("releasePictures", releasePictures);
    formData.append("popComment", popComment ? popComment : "");
    formData.append("popFacility", popFacility ? popFacility : "");
    formData.append("popExpectedDays", popExpectedDays ? popExpectedDays : "");
    formData.append("popStartDate", popStartDate ? popStartDate : "1111-11-11");
    formData.append("popEndDate", popEndDate ? popEndDate : "1111-11-11");
    formData.append("releaseDate", releaseDate ? releaseDate : "1111-11-11");
    formData.append("euthanized", euthanized ? euthanized : "");
    formData.append("comments", comments ? comments : "");
    formData.append("case_linked", case_id);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cases/addpostop/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Post Operation Details Added Successfully");
        navigate("/Dashboard");
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
          paddingTop: "5rem",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          paddingLeft: "50px",
        }}
        className="container"
      >
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="mx-4 px-4">{type_of_case} Case</h4>
          <div>
          <Link style={{marginRight:"0.2rem", textDecoration:"none", fontWeight:"bold"}} to="/Dashboard">
            Dashboard
          </Link>
          <span style={{fontWeight:"bold", textDecoration:"none"}}>/Add Case</span>
          </div>
        
        </div>

        <div className="case-lists mx-auto px-4">
          <div className="row mb-3 top-menu ">
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

        <div className="case-lists mx-auto" >
          <div className="mx-auto px-4 container-fluid">
            {/* Change bar */}
            <div
              className="btn-group form-1 mt-2"
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

            {activeButton === 0 && (
              <>
                <div className="my-3">
                  <h2>Reporter Details:</h2>
                  <form onSubmit={handleReportingDetails}>
                    <div className="row form-1">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="reporterName" className="form-label">
                            Reporter Name<span style={{ color: "red" }}>*</span>
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
                            Phone Number<span style={{ color: "red" }}>*</span>
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
                            onChange={(e) =>
                              setReporterAltContact(e.target.value)
                            }
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

                    <div className="row form-1">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="address" className="form-label">
                            Landmark<span style={{ color: "red" }}>*</span>
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
                            Pincode<span style={{ color: "red" }}>*</span>
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
                            Location<span style={{ color: "red" }}>*</span>
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
                             <button onClick={handleDeleteFrontImage}>Delete</button>
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
                            <img
                              src={backImagePreview}
                              alt="Back Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteBackImage}>Delete</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group">
                        <label
                          className="form-label"
                          htmlFor="consentFormImage"
                        >
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
                          <button  onClick={handleDeleteConsentFormImage}>Delete</button>
                        </div>
                      )}
                    </div>

                    <div className="my-1">
                      {/* <button
                        type="button"
                        className="btn btn-primary mx-2"
                        onClick={() => {
                          setActiveButton(1);
                        }}
                      >
                        Next
                      </button> */}
                      <button
                      style={{ background: "rgb(245, 145, 32)", border: "none", color:"#ffffff" }}
                        type="submit"
                        className="btn float-end mx-1"
                      >
                        Next
                        </button>
                      <div className="form-buttons">
                        {/* <div className="mb-1">
                        <button type="button" className="btn btn-primary">
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary float-end mx-1"
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to Exit?"
                          );
                          if (confirmDelete) {
                            navigate("/Dashboard");
                          }
                        }}
                      >
                        Exit
                      </button>
                        </div> */}
                      <div>

                      {/* <button
                        type="button"
                        className="btn btn-primary "
                        onClick={handleReportingDetailSaveNext}
                      >
                        Save & Next
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary  mx-1"
                        onClick={handleReportingDetailSaveExit}
                        >
                        Save & Exit
                      </button> */}
                      </div>
                     
                        </div>
                    </div>
                  </form>
                </div>
              </>
            )}
            {activeButton === 1 && (
              <>
                <div className="my-3">
                  <h2>Further Animal Details :</h2>
                  <h5>Animal ID:</h5>
                  <form onSubmit={handleAnimalDetails}>
                    <div className="row form-1">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="animalSpecies" className="form-label">
                            Animal Species
                          </label>
                          <select
                            id="animalSpecies"
                            className="form-select"
                            aria-label="Animal Species"
                            name="animalSpecies"
                            onChange={(e) => {
                              setAnimalSpecies(e.target.value);
                            }}
                          >
                            <option value="">Choose Species</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="animalBreed" className="form-label">
                            Animal Breed
                          </label>
                          <select
                            id="animalBreed"
                            className="form-select"
                            aria-label="Animal Breed"
                            name="animalBreed"
                            onChange={(e) => {
                              setAnimalBreed(e.target.value);
                            }}
                          >
                            <option value="">Choose Breed</option>
                            <option value="Indie">Indie</option>
                            <option value="Pet">Pet</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="animalAge" className="form-label">
                            Animal Age
                          </label>
                          <select
                            id="animalAge"
                            className="form-select"
                            aria-label="Animal Age"
                            name="animalAge"
                            onChange={(e) => {
                              setAnimalAge(e.target.value);
                            }}
                          >
                            <option value="">Age</option>
                            <option value="0-1">0-1 Yrs</option>
                            <option value="1-5">1-5 Yrs</option>
                            <option value="5-10">5-10 Yrs</option>
                            <option value="10+">10+ Yrs</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row form-1">
                      <div className="col">
                        <div className="mb-3">
                          <label
                            htmlFor="animalTemperament"
                            className="form-label"
                          >
                            Animal Temperament
                          </label>
                          <select
                            id="animalTemperament"
                            className="form-select"
                            aria-label="Animal Temperament"
                            name="animalTemperament"
                            onChange={(e) => {
                              setAnimalTemperament(e.target.value);
                            }}
                          >
                            <option value="">Choose</option>
                            <option value="Friendly">Friendly</option>
                            <option value="Aggressive">Aggressive</option>
                            <option value="Scared">Scared</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="animalGender" className="form-label">
                            Animal Gender
                          </label>
                          <select
                            id="animalGender"
                            className="form-select"
                            aria-label="Animal Gender"
                            name="animalGender"
                            onChange={(e) => {
                              setAnimalGender(e.target.value);
                            }}
                          >
                            <option value="">Choose Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label
                            htmlFor="animalPregnant"
                            className="form-label"
                          >
                            Animal Pregnant
                          </label>
                          <select
                            id="animalPregnant"
                            className="form-select"
                            aria-label="Animal Pregnant"
                            name="animalPregnant"
                            onChange={(e) => {
                              setAnimalPregnant(e.target.value);
                            }}
                          >
                            <option value="">Choose</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Not Sure">Not Sure</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row form-1">
                      <div className="form-group col mb-3">
                        <label htmlFor="animalMarking" className="form-label">
                          Animal Marking
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="animalMarking"
                          aria-describedby="animalMarkingHelp"
                          name="animalMarking"
                          placeholder="Animal Marking"
                          aria-label="Animal Marking"
                          onChange={(e) => {
                            setAnimalMarking(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group col mb-3">
                        <label htmlFor="animalColor" className="form-label">
                          Animal Color
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="animalColor"
                          aria-describedby="animalColorHelp"
                          name="animalColor"
                          placeholder="Animal Color"
                          aria-label="Animal Color"
                          onChange={(e) => {
                            setAnimalColor(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group col mb-3">
                        <label htmlFor="animalCatchable" className="form-label">
                          Animal Catchable
                        </label>
                        <select
                          id="animalCatchable"
                          className="form-select"
                          aria-label="Animal Catchable"
                          name="animalCatchable"
                          onChange={(e) => {
                            setAnimalCatchable(e.target.value);
                          }}
                        >
                          <option value="">Choose</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="row form-1">
                      <div className="form-group col mb-3">
                        <label htmlFor="animalWeight" className="form-label">
                          Animal Weight (kgs)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="animalWeight"
                          aria-describedby="animalWeightHelp"
                          name="animalWeight"
                          placeholder="Animal Weight"
                          aria-label="Animal Weight (kgs)"
                          onChange={(e) => {
                            setAnimalWeight(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group col mb-3">
                        <label htmlFor="admissionReason" className="form-label">
                          Reason for Admission
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="admissionReason"
                          aria-describedby="admissionReasonHelp"
                          name="admissionReason"
                          placeholder="Reason for Admission"
                          aria-label="Reason for Admission"
                          onChange={(e) => {
                            setAdmissionReason(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group mb-3">
                        <label
                          className="form-label h5"
                          htmlFor="animalPictures"
                        >
                          Animal Pictures -
                        </label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="btn custom-file-input"
                            id="animalPictures"
                            name="animalPictures"
                            accept="image/*"
                            onChange={handleAnimalPictursChange}
                          />
                        </div>
                      </div>
                      {animalPicturesPreview && (
                        <div>
                          <h6>Preview:</h6>
                            <img
                              src={animalPicturesPreview}
                              alt="Animal Preview"
                              height="100px"
                            />
                          <button onClick={handleDeleteAnimalPicture}>Delete</button>
                        </div>
                      )}
                    </div>

                    <div className="my-2">
                      {/* <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setActiveButton(0);
                        }}
                      >
                      <div className="form-buttons"> 
                      <div className="mb-1">
                      <button type="button" className="btn btn-primary">
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mx-2"
                        onClick={() => {
                          setActiveButton(2);
                        }}
                      >
                        Next
                      </button> */}
                      <button
                        type="submit"
                        style={{ background: "rgb(245, 145, 32)", border: "none", color:"#ffffff" }}
                        className="btn float-end mx-1"
                      >
                        Next
                      </button>
                      {/* <button
                        type="button"
                        className="btn btn-primary float-end mx-1"
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to Exit?"
                          );
                          if (confirmDelete) {
                            navigate("/Dashboard");
                          }
                        }}
                      >
                        Exit
                      </button> */}
                    </div>
                  </form>
                </div>
              </>
            )}
            {activeButton === 2 && (
              <>
                <div className="my-3">
                  <h2>Medical Details:</h2>
                  <form onSubmit={handleMedicalDetails}>
                    <div className="row form-1">
                      <div className="col">
                        <div className="mb-3">
                          <label
                            htmlFor="medicalHistory"
                            className="form-label"
                          >
                            Medical History / Other Issues
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="medicalHistory"
                            aria-describedby="medicalHistoryHelp"
                            name="medicalHistory"
                            placeholder="Medical History / Other Issues"
                            onChange={(e) => setMedicalHistory(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label
                            htmlFor="vaccinationStatus"
                            className="form-label"
                          >
                            Animal Vaccinated
                          </label>
                          <select
                            id="vaccinationStatus"
                            className="form-select"
                            aria-label="Animal Vaccinated"
                            name="vaccinationStatus"
                            onChange={(e) =>
                              setVaccinationStatus(e.target.value)
                            }
                          >
                            <option value="">Choose Vaccination Status</option>
                            <option value="Already Done">Already Done</option>
                            <option value="To be done in NGO">
                              To be done in NGO
                            </option>
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
                            onChange={(e) => setDewormed(e.target.value)}
                          >
                            <option value="">Choose</option>
                            <option value="Already Done">Already Done</option>
                            <option value="To be done in NGO">
                              To be done in NGO
                            </option>
                            <option value="Not Done">Not Done</option>
                            <option value="Unsure">Unsure</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row form-1">
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
                            onChange={(e) => setFitForSurgery(e.target.value)}
                          >
                            <option value="">Choose</option>
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
                            onChange={(e) => setOtherDetails(e.target.value)}
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
                            type="date"
                            onChange={(e) => setAdmissionDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group mb-3">
                          <label
                            className="form-label"
                            htmlFor="bloodReportImage"
                          >
                            Blood Report Pictures -
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="btn custom-file-input"
                              id="bloodReportImage"
                              accept="image/*"
                              name="bloodReportImage"
                              onChange={handleBloodReportImage}
                            />
                          </div>
                        </div>
                        {bloodReportImagePreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={bloodReportImagePreview}
                              alt="Blood Report Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteBloodReportImage}>Delete</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group mb-3">
                          <label
                            className="form-label"
                            htmlFor="feedingRecordImage"
                          >
                            Feeding Record Pictures -
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="btn custom-file-input"
                              id="feedingRecordImage"
                              accept="image/*"
                              name="feedingRecordImage"
                              onChange={handleFeedingRecordImage}
                            />
                          </div>
                        </div>
                        {feedingRecordImagePreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={feedingRecordImagePreview}
                              alt="Feeding Record Preview"
                              height="100px"
                            />
                            <button onClick={handleDeleteFeedingRecordImage}>Delete</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="my-1">
                      {/* <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setActiveButton(1);
                        }}
                      >
                      <div className="form-buttons">
                     <div className="mb-1">
                     <button type="button" className="btn btn-primary">
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mx-2"
                        onClick={() => {
                          setActiveButton(3);
                        }}
                      >
                        Next
                      </button> */}
                      <button
                        type="submit"
                        style={{ background: "rgb(245, 145, 32)", border: "none", color:"#ffffff" }}
                        className="btn float-end mx-1"
                      >
                        Next
                      </button>
                      {/* <button
                        type="button"
                        className="btn btn-primary float-end mx-1"
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to Exit?"
                          );
                          if (confirmDelete) {
                            navigate("/Dashboard");
                          }
                        }}
                      >
                        Exit
                      </button> */}
                    </div>
                  </form>
                </div>
              </>
            )}
            {activeButton === 3 && (
              <>
                <div className="my-3">
                  <h2>Operation Details :</h2>
                  <form onSubmit={handleOperationDetails}>
                    <div className="row form-1">
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
                            onChange={(e) => setVetName(e.target.value)}
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
                            type="date"
                            onChange={(e) => setOperationDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row form-1">
                      <div className="col mb-3">
                        <div className="row form-1">
                          <div className="form-group col">
                            <label
                              className="form-label"
                              htmlFor="operationStartTime"
                            >
                              Operation Start Time
                            </label>
                            <input
                              className="form-control"
                              id="operationStartTime"
                              name="operationStartTime"
                              type="time"
                              onChange={(e) =>
                                setOperationStartTime(e.target.value)
                              }
                            />
                          </div>
                          <div className="form-group col">
                            <label
                              className="form-label"
                              htmlFor="operationEndTime"
                            >
                              Operation End Time
                            </label>
                            <input
                              className="form-control"
                              id="operationEndTime"
                              name="operationEndTime"
                              type="time"
                              onChange={(e) =>
                                setOperationEndTime(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col mb-3">
                        <label
                          htmlFor="operationOutcome"
                          className="form-label"
                        >
                          Operation Outcome
                        </label>
                        <select
                          id="operationOutcome"
                          className="form-select"
                          aria-label="Operation Outcome"
                          name="operationOutcome"
                          onChange={(e) => setOperationOutcome(e.target.value)}
                        >
                          <option value="">Choose Outcome</option>
                          <option value="Success">Success</option>
                          <option value="Failure">Failure</option>
                          <option value="Complicated">Complicated</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group mb-2">
                          <label
                            className="form-label"
                            htmlFor="medicalPrescriptionImage"
                          >
                            Medication Prescription -
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="btn custom-file-input"
                              id="medicalPrescriptionImage"
                              accept="image/*"
                              name="medicalPrescriptionImage"
                              onChange={handleMedicalPrescriptionImage}
                            />
                          </div>
                        </div>
                        {medicalPrescriptionImagePreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={medicalPrescriptionImagePreview}
                              alt="Feeding Record Preview"
                              height="100px"
                            /><button onClick={handleDeleteMedicalPrescriptionImage}>Delete</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group mb-2">
                          <label
                            className="form-label"
                            htmlFor="treatmentRecordImage"
                          >
                            Treatment Records -
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="btn custom-file-input"
                              id="treatmentRecordImage"
                              accept="image/*"
                              name="treatmentRecordImage"
                              onChange={handleTreatmentRecordImage}
                            />
                          </div>
                        </div>
                        {treatmentRecordImagePreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={treatmentRecordImagePreview}
                              alt="Treatment Records Preview"
                              height="100px"
                            /><button onClick={handleDeleteTreatmentRecordImage}>Delete</button>
                          </div>
                        )}
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
                              onChange={handleOrganImage}
                            />
                          </div>
                        </div>
                        {organImagePreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={organImagePreview}
                              alt="Organ Pictures Preview"
                              height="100px"
                            /><button onClick={handleDeleteOrganImage}>Delete</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="my-1">
                      {/* <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setActiveButton(2);
                        }}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary mx-2"
                        onClick={() => {
                          setActiveButton(4);
                        }}
                      >
                        Next
                      </button> */}
                      <button
                        type="submit"
                        style={{ background: "rgb(245, 145, 32)", border: "none", color:"#ffffff" }}
                        className="btn  float-end mx-1"
                      >
                        Next
                      </button>
                      {/* <button
                        type="button"
                        className="btn btn-primary float-end mx-1"
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to Exit?"
                          );
                          if (confirmDelete) {
                            navigate("/Dashboard");
                          }
                        }}
                      >
                        Exit
                      </button> */}
                    </div>
                  </form>
                </div>
              </>
            )}
            {activeButton === 4 && (
              <>
                <div className="my-3">
                  <h2>Post Operation Details :</h2>
                  <form onSubmit={handlePostOperationDetails}>
                    <div className="row form-1">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="popComment" className="form-label">
                            Post-Operation Comments
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="popComment"
                            aria-describedby="popCommentHelp"
                            name="popComment"
                            placeholder="Comments"
                            onChange={(e) => setPopComment(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="popFacility" className="form-label">
                            Post-Operation facility
                          </label>
                          <select
                            id="popFacility"
                            className="form-select"
                            aria-label="Post-Operation facility"
                            name="popFacility"
                            onChange={(e) => setPopFacility(e.target.value)}
                          >
                            <option value="">Choose Facility</option>
                            <option value="In Shelter">In Shelter</option>
                            <option value="Not in shelter">
                              Not in shelter
                            </option>
                            <option value="On Street">On Street</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label
                            htmlFor="popExpectedDays"
                            className="form-label"
                          >
                            Post-Operation Expected Days
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="popExpectedDays"
                            aria-describedby="popExpectedDaysHelp"
                            name="popExpectedDays"
                            placeholder="Expected Days"
                            onChange={(e) => setPopExpectedDays(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col mb-3">
                        <label className="form-label" htmlFor="popStartDate">
                          Post-Operation Start Date
                        </label>
                        <input
                          className="form-control"
                          id="popStartDate"
                          name="popStartDate"
                          type="date"
                          onChange={(e) => setPopStartDate(e.target.value)}
                        />
                      </div>
                      <div className="col mb-3">
                        <label className="form-label" htmlFor="popEndDate">
                          Post-Operation End Date
                        </label>
                        <input
                          className="form-control"
                          id="popEndDate"
                          name="popEndDate"
                          type="date"
                          onChange={(e) => setPopEndDate(e.target.value)}
                        />
                      </div>
                      <div className="col mb-3">
                        <label className="form-label" htmlFor="releaseDate">
                          Release Date
                        </label>
                        <input
                          className="form-control"
                          id="releaseDate"
                          name="releaseDate"
                          type="date"
                          onChange={(e) => setReleaseDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="row form-1">
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="euthanized" className="form-label">
                            Euthanized
                          </label>
                          <select
                            id="euthanized"
                            className="form-select"
                            aria-label="Euthanized"
                            name="euthanized"
                            onChange={(e) => setEuthanized(e.target.value)}
                          >
                            <option value="">Choose</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="comments" className="form-label">
                            Other Comments
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="comments"
                            aria-describedby="commentsHelp"
                            name="comments"
                            placeholder="Other Comments"
                            onChange={(e) => setComments(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group mb-2">
                          <label className="form-label" htmlFor="popPictures">
                            Post-Operation Pictures -
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="btn custom-file-input"
                              id="popPictures"
                              accept="image/*"
                              name="popPictures"
                              onChange={handlePopPictures}
                            />
                          </div>
                        </div>
                        {popPicturesPreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={popPicturesPreview}
                              alt="Post Operation Pictures Preview"
                              height="100px"
                            /><button onClick={handleDeletePopPictures}>Delete</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group mb-2">
                          <label
                            className="form-label"
                            htmlFor="releasePictures"
                          >
                            Release Pictures -
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="btn custom-file-input"
                              id="releasePictures"
                              accept="image/*"
                              name="releasePictures"
                              onChange={handleReleasePictures}
                            />
                          </div>
                        </div>
                        {releasePicturesPreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={releasePicturesPreview}
                              alt="Release Pictures Preview"
                              height="100px"
                            /><button onClick={handleDeleteReleasePictures}>Delete</button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="my-1">
                      {/* <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setActiveButton(3);
                        }}
                      >
                        Previous
                      </button> */}
                      <button
                        type="submit"
                        style={{ background: "rgb(245, 145, 32)", border: "none", color:"#ffffff" }}
                        className="btn  float-end mx-1"
                      >
                        Save
                      </button>
                      {/* <button
                        type="Button"
                        className="btn btn-primary float-end mx-1"
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to Exit?"
                          );
                          if (confirmDelete) {
                            navigate("/Dashboard");
                          }
                        }}
                      >
                        Exit
                      </button> */}
                      <div className="form-buttons">
                      <div className="mb-1">
                      <button type="button" style={{ background: "rgb(245, 145, 32)", border: "none", color:"#ffffff" }} className="btn ">
                        Previous
                      </button>
                      <button type="button"  style={{ background: "rgb(245, 145, 32)", border: "none", color:"#ffffff" }} className="btn mx-2">
                        Exit
                      </button>
                      </div>
                     <div >
                     {/* <button
                        type="submit"
                        className="btn btn-primary mx-1"
                        onClick={handlePostOperationSaveExit}
                        >
                        Save & Exit
                      </button> */}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
              position: "fixed",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    right: "0.1rem",
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end",
    width:"100vw",
    fontSize: "20px",
    zIndex: "9",
    padding: "0.5rem 0.5rem",
    backgroundColor:"#ffffff"
        }}
      >
        <span>
          <label style={{ padding: "0.5rem", fontWeight: "bold" }}>
            {username}
          </label>
          <img
         
            width="17%"
            style={{ marginRight: "1.5rem",  cursor: "pointer" }}
            src={logo}
            alt="Logo"
          ></img>
            <i 
             style={{  cursor: "pointer" }}
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

export default Addcase;
