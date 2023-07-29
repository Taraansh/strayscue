import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddVet = () => {
  const { user, logoutUser, websiteUrl } = useContext(AuthContext);
  const [vet_name, setVetName] = useState(null);
  const [registration_id, setRegistrationId] = useState(null);
  const [vet_certification, setVetCertification] = useState(null);
  const [verification_id, setVerificationId] = useState(null);

  const [vetCertificationPreview, setVetCertificationPreview] = useState("");
  const [verificationIdPreview, setVerificationIdPreview] = useState("");

  const navigate = useNavigate();

  const handleVetCerificationChange = (event) => {
    const file = event.target.files[0];
    setVetCertification(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVetCertificationPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setVetCertificationPreview("");
    }
  };

  const handleVerificationIdChange = (event) => {
    const file = event.target.files[0];
    setVerificationId(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVerificationIdPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setVerificationIdPreview("");
    }
  };

  const handleDeleteVetCertification = () => {
    setVetCertification(null);
    setVetCertificationPreview("");
  };

  const handleDeleteVerificationId = () => {
    setVerificationId(null);
    setVerificationIdPreview("");
  };

  const handleVetDetailSubmit = async (e) => {
    e.preventDefault();
    const vet_profile_creator = localStorage.getItem("id");

    const formData = new FormData();
    formData.append("vet_name", vet_name);
    formData.append("registration_id", registration_id);
    formData.append("vet_certification", vet_certification);
    formData.append("verification_id", verification_id);
    formData.append("vet_profile_creator", vet_profile_creator);

    try {
      const response = await axios.post(
        `${websiteUrl}/vets/addvet/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Vet Added Successfully");
        navigate("/Vet");
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
        paddingBottom: "2rem",
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
          }}
          className="container"
        >
          <h4 className="heading1">Add Vet</h4>

          <div className="case-lists mx-auto">
            <h4 className="heading1">Vet Details:</h4>
            <div style={{ padding: "1rem" }}>
              <form className="row g-3" onSubmit={handleVetDetailSubmit}>
                <div className="col-md-6">
                  <label
                    htmlFor="vet_name"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Vet Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    required
                    id="vet_name"
                    name="vet_name"
                    onChange={(e) => setVetName(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="registration_id"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Registration ID <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="registration_id"
                    name="registration_id"
                    placeholder="Enter ID"
                    required
                    onChange={(e) => setRegistrationId(e.target.value)}
                  />
                </div>

                <div
                  className="col-md-6 mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label
                    htmlFor="vet_certification"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Vet Certification -
                  </label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="vet_certification"
                      accept="image/*"
                      name="vet_certification"
                      onChange={handleVetCerificationChange}
                    />
                  </div>
                  {vetCertificationPreview && (
                    <div>
                      <h6>Preview:</h6>
                      <img
                        src={vetCertificationPreview}
                        alt="Vet Certification Preview"
                        height="100px"
                      />
                      <button onClick={handleDeleteVetCertification}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className="col-md-6 mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label
                    htmlFor="verification_id"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Verification ID -
                  </label>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="verification_id"
                      name="verification_id"
                      accept="image/*"
                      onChange={handleVerificationIdChange}
                    />
                  </div>
                  {verificationIdPreview && (
                    <div>
                      <h6>Preview:</h6>
                      <img
                        src={verificationIdPreview}
                        alt="Verification Id Preview"
                        height="100px"
                      />
                      <button onClick={handleDeleteVerificationId}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <button
                    style={{
                      background: "rgb(245, 145, 32)",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                    type="submit"
                    className="btn"
                  >
                    Submit
                  </button>
                  <button
                    style={{
                      background: "rgb(245, 145, 32)",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                    type="button"
                    className="btn mx-2"
                    onClick={() => {
                      navigate("/Vet");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
};

export default AddVet;
