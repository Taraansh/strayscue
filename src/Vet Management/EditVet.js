import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditVet() {
  const path = useLocation();
  const { user, logoutUser, websiteUrl, handleOpenImage, handleDownloadImage } = useContext(AuthContext);
  const [vet_name, setVetName] = useState(null);
  const [registration_id, setRegistrationId] = useState(null);
  const [vet_certification, setVetCertification] = useState(null);
  const [verification_id, setVerificationId] = useState(null);

  const [vetCertificationPreview, setVetCertificationPreview] = useState("");
  const [verificationIdPreview, setVerificationIdPreview] = useState("");

  const [isVetCertificationDeleted, setIsVetCertificationDeleted] =
    useState(false);
  const [isVerificationIdDeleted, setIsVerificationIdDeleted] = useState(false);

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

  const handleDeleteVetCertification = () => {
    setVetCertification(null);
    setVetCertificationPreview("");
  };

  const handleDeleteSavedVetCertification = () => {
    setIsVetCertificationDeleted(true);
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

  const handleDeleteVerificationId = () => {
    setVerificationId(null);
    setVerificationIdPreview("");
  };

  const handleDeleteSavedVerificationId = () => {
    setIsVerificationIdDeleted(true);
  };

  const handleUpdateVetDetail = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("vet_name", vet_name ? vet_name : path.state.data.vet_name);
    formData.append("registration_id", registration_id ? registration_id : path.state.data.registration_id);

    if (vet_certification) {
      formData.append(
        "vet_certification",
        vet_certification ? vet_certification : null
      );
    } else if (isVetCertificationDeleted) {
      formData.append("vet_certification", "null");
    } else {
      formData.append("vet_certification", path.state.data.vet_certification);
    }

    if (verification_id) {
      formData.append(
        "verification_id",
        verification_id ? verification_id : null
      );
    } else if (isVetCertificationDeleted) {
      formData.append("verification_id", "null");
    } else {
      formData.append("verification_id", path.state.data.verification_id);
    }

    try {
      const response = await axios.put(
        `${websiteUrl}/vets/update/${path.state.data.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Success:", response.data);
        alert("Vet Updated Successfully");
        navigate("/Vet");
        // Handle success or display a success message.
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
          <h4 className="heading1">Edit Vet</h4>

          <div className="case-lists mx-auto">
            <h4 className="heading1">Vet Details:</h4>
            <div style={{ padding: "1rem" }}>
              <form className="row g-3" onSubmit={handleUpdateVetDetail}>
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
                    id="vet_name"
                    name="vet_name"
                    defaultValue={path.state.data.vet_name || ""}
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
                    defaultValue={path.state.data.registration_id || ""}
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
                  {!isVetCertificationDeleted ? (
                    path.state.data.vet_certification ? (
                      <div>
                        <h6>Preview:</h6>
                        <img
                          src={`${websiteUrl}${path.state.data.vet_certification}`}
                          alt="Vet Certification Preview"
                          height="100px"
                        />
                        <button onClick={handleDeleteSavedVetCertification}>Delete</button>
                        <button className='mx-2 btn btn-primary' style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }} onClick={(e) => handleOpenImage(e, `${websiteUrl}${path.state.data.vet_certification}`)}>Open</button>
                          <button className='btn btn-primary' style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff", paddingLeft:"0.4rem", paddingRight:"0", paddingBottom:"0.2rem" }} onClick={(e) => handleDownloadImage(e, `${websiteUrl}${path.state.data.vet_certification}`)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-download" viewBox="0 0 24 24">
                                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                    </svg></button>
                      </div>
                    ) : (
                      vetCertificationPreview && (
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
                      )
                    )
                  ) : (
                    vetCertificationPreview && (
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
                    )
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
                  {!isVerificationIdDeleted ? (
                    path.state.data.verification_id ? (
                      <div>
                        <h6>Preview:</h6>
                        <img
                          src={`${websiteUrl}${path.state.data.verification_id}`}
                          alt="Verification Id Preview"
                          height="100px"
                        />
                        <button onClick={handleDeleteSavedVerificationId}>Delete</button>
                        <button className='mx-2 btn btn-primary' style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff" }} onClick={(e) => handleOpenImage(e, `${websiteUrl}${path.state.data.verification_id}`)}>Open</button>
                          <button className='btn btn-primary' style={{ background: "rgb(245, 145, 32)", border: "none", color: "#ffffff", paddingLeft:"0.4rem", paddingRight:"0", paddingBottom:"0.2rem" }} onClick={(e) => handleDownloadImage(e, `${websiteUrl}${path.state.data.verification_id}`)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-download" viewBox="0 0 24 24">
                                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                    </svg></button>
                      </div>
                    ) : (
                      verificationIdPreview && (
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
                      )
                    )
                  ) : (
                    verificationIdPreview && (
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
                    )
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
}
