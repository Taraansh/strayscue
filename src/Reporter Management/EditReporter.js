import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditReporter() {
    const path = useLocation();
    const navigate = useNavigate();
    const { user, logoutUser, websiteUrl } = useContext(AuthContext);
    const [reported_name, setReportedName] = useState(null);
    const [phone_number, setPhoneNumber] = useState(null);
    const [alternate_phone_number, setAlternatePhoneNumber] = useState(null);
    const [email_id, setEmailId] = useState(null);
    const [verification_id, setVerificationId] = useState(null);
    const [verificationIdPreview, setVerificationIdPreview] = useState("");

    const [isVerificationIdDeleted, setIsVerificationIdDeleted] = useState(false);

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

      const handleUpdateReporterDetail = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("reported_name", reported_name ? reported_name : path.state.data.reported_name );
        formData.append("phone_number", phone_number ? phone_number : path.state.data.phone_number);
        formData.append("alternate_phone_number", alternate_phone_number ? alternate_phone_number : path.state.data.alternate_phone_number);
        formData.append("email_id", email_id ? email_id : path.state.data.email_id);
    
        if (verification_id) {
          formData.append("verification_id", verification_id ? verification_id : null);
        } else if (isVerificationIdDeleted) {
          formData.append("verification_id", "null");
        } else {
          formData.append("verification_id", path.state.data.verification_id);
        }
    
        try {
          const response = await axios.put(
            `${websiteUrl}/reporters/update/${path.state.data.id}/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 200) {
            console.log("Success:", response.data);
            alert("Reporter Updated Successfully");
            navigate("/Reporter");
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
        padding: "0",
        margin: "0",
        height: "100vh",
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
          <h4 className="heading1">Edit Reporter</h4>
          <div className="case-lists mx-auto">
            <h4 className="heading1">Reporter Details:</h4>
            <div style={{ padding: "1rem" }}>
              <form className="row g-3" onSubmit={handleUpdateReporterDetail}>
                <div className="col-md-6">
                  <label
                    htmlFor="reported_name"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Reporter Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    aria-label="Name"
                    id="reported_name"
                    name="reported_name"
                    defaultValue={path.state.data.reported_name || ""}
                    onChange={(e) => setReportedName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="phone_number"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Phone No <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Phone No"
                    defaultValue={path.state.data.phone_number || ""}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="email_id"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email_id"
                    name="email_id"
                    placeholder="E-mail"
                    defaultValue={path.state.data.email_id || ""}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="alternate_phone_number"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Alternate Phone No
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="alternate_phone_number"
                    name="alternate_phone_number"
                    placeholder="Alternate Phone No"
                    defaultValue={path.state.data.alternate_phone_number || ""}
                    onChange={(e) => setAlternatePhoneNumber(e.target.value)}
                  />
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
                      accept="image/*"
                      id="verification_id"
                      name="verification_id"
                      onChange={handleVerificationIdChange}
                    />
                  </div>
                  {(!isVerificationIdDeleted) ? ((path.state.data.verification_id)?(<div>
                          <h6>Preview:</h6>
                          <img
                            src={`http://localhost:8000${path.state.data.verification_id}`}
                            alt="Verification ID Preview"
                            height="100px"
                          />
                          <button onClick={handleDeleteSavedVerificationId}>
                            Delete
                          </button>
                        </div>):(verificationIdPreview && (
                    <div>
                      <h6>Preview:</h6>
                      <img
                        src={verificationIdPreview}
                        alt="Verification ID Preview"
                        height="100px"
                      />
                      <button onClick={handleDeleteVerificationId}>
                        Delete
                      </button>
                    </div>))) : (verificationIdPreview && (
                    <div>
                      <h6>Preview:</h6>
                      <img
                        src={verificationIdPreview}
                        alt="Verification ID Preview"
                        height="100px"
                      />
                      <button onClick={handleDeleteVerificationId}>
                        Delete
                      </button>
                    </div>)
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
                    onClick={()=>{navigate('/Reporter')}}
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
          position: "absolute",
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
