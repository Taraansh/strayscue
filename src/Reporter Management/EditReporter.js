import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function EditReporter() {
  const path = useLocation();
  const [openedImage, setOpenedImage] = useState(null);
  const navigate = useNavigate();
  const { user, logoutUser, websiteUrl, handleDownloadImage } =
    useContext(AuthContext);
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
    formData.append(
      "reported_name",
      reported_name ? reported_name : path.state.data.reported_name
    );
    formData.append(
      "phone_number",
      phone_number ? phone_number : path.state.data.phone_number
    );
    formData.append(
      "alternate_phone_number",
      alternate_phone_number
        ? alternate_phone_number
        : path.state.data.alternate_phone_number
    );
    formData.append("email_id", email_id ? email_id : path.state.data.email_id);

    if (verification_id) {
      formData.append(
        "verification_id",
        verification_id ? verification_id : null
      );
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
        toast.success("Reporter Updated Successfully");
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
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
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
            paddingBottom: "3rem",
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
                    E-mail <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email_id"
                    name="email_id"
                    placeholder="E-mail"
                    required
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
                  {!isVerificationIdDeleted ? (
                    path.state.data.verification_id ? (
                      <div>
                        <h6>Preview:</h6>
                        <img
                          src={`${websiteUrl}${path.state.data.verification_id}`}
                          alt="Verification ID Preview"
                          height="100px"
                        />
                        <div className="my-2">
                          <button
                            onClick={handleDeleteSavedVerificationId}
                            className="btn"
                            style={{
                              background: "#ffffff",
                              border: "1px solid grey",
                              padding: "0.3rem",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash-fill"
                              viewBox="0 0 16 16"
                              style={{
                                background: "transparent",
                                color: "red", // border: "none",
                              }}
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                          </button>
                          <button
                            className="mx-2 btn btn-primary"
                            style={{
                              background: "rgb(245, 145, 32)",
                              border: "none",
                              color: "#ffffff",
                            }}
                            onClick={(e) => {
                              e.preventDefault(); // Prevent default form submission
                              setOpenedImage(
                                `${websiteUrl}${path.state.data.verification_id}`
                              );
                            }}
                          >
                            Open
                          </button>
                          <button
                            className="btn btn-primary"
                            style={{
                              background: "rgb(245, 145, 32)",
                              border: "none",
                              color: "#ffffff",
                              paddingLeft: "0.4rem",
                              paddingRight: "0",
                              paddingBottom: "0.2rem",
                            }}
                            onClick={(e) =>
                              handleDownloadImage(
                                e,
                                `${websiteUrl}${path.state.data.verification_id}`
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className="bi bi-download"
                              viewBox="0 0 24 24"
                            >
                              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      verificationIdPreview && (
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
                        </div>
                      )
                    )
                  ) : (
                    verificationIdPreview && (
                      <div>
                        <h6>Preview:</h6>
                        <img
                          src={verificationIdPreview}
                          alt="Verification ID Preview"
                          height="100px"
                        />
                        <div className="my-2">
                          <button
                            onClick={handleDeleteVerificationId}
                            className="btn"
                            style={{
                              background: "#ffffff",
                              border: "1px solid grey",
                              padding: "0.3rem",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash-fill"
                              viewBox="0 0 16 16"
                              style={{
                                background: "transparent",
                                color: "red", // border: "none",
                              }}
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                          </button>
                        </div>
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
                      navigate("/Reporter");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {openedImage && (
          <div className="image-modal-overlay">
            <div className="image-modal">
              <button
                className="close-button btn btn-light"
                onClick={() => setOpenedImage(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z"
                    id="_icons"
                    fill="white"
                    className="fill-000000"
                  ></path>
                </svg>
              </button>
              <img src={openedImage} alt="Preview" className="opened-image" />
            </div>
          </div>
        )}
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
      <Footer />
    </div>
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
}
