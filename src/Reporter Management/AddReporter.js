import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const AddReporter = () => {
  const { user, logoutUser, websiteUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reported_name, setReportedName] = useState(null);
  const [phone_number, setPhoneNumber] = useState(null);
  const [alternate_phone_number, setAlternatePhoneNumber] = useState(null);
  const [email_id, setEmailId] = useState(null);
  const [verification_id, setVerificationId] = useState(null);
  const [verificationIdPreview, setVerificationIdPreview] = useState("");

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

  const handleReporterDetailSubmit = async (e) => {
    e.preventDefault();
    const reporter_profile_creator = localStorage.getItem("id");

    const formData = new FormData();
    formData.append("reported_name", reported_name);
    formData.append("phone_number", phone_number);
    formData.append("alternate_phone_number", alternate_phone_number);
    formData.append("email_id", email_id);
    formData.append("verification_id", verification_id);
    formData.append("reporter_profile_creator", reporter_profile_creator);

    try {
      const response = await axios.post(
        `${websiteUrl}/reporters/addreporter/`,
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
        navigate("/Reporter");
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
        flexDirection: "column",
        justifyContent:"space-between",
        height:"100vh",
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
            paddingBottom:"3rem"
          }}
          className="container"
        >
          <h4 className="heading1">Add Reporter</h4>

          <div className="case-lists mx-auto">
            <h4 className="heading1">Reporter Details:</h4>
            <div style={{ padding: "1rem" }}>
              <form className="row g-3" onSubmit={handleReporterDetailSubmit}>
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
                    required
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
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    htmlFor="email_id"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    E-mail <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email_id"
                    name="email_id"
                    placeholder="E-mail"
                    required
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
                  {verificationIdPreview && (
                    <div>
                      <h6>Preview:</h6>
                      <img
                        src={verificationIdPreview}
                        alt="Verification ID preview"
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
      <Footer/>
    </div>
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
};

export default AddReporter;
