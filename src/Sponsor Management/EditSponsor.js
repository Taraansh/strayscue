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

export default function EditSponsor() {
  const path = useLocation();
  const [openedImage, setOpenedImage] = useState(null);

  const { user, logoutUser, websiteUrl, handleDownloadImage } =
    useContext(AuthContext);
  const [sponsor_name, setSponsorName] = useState(null);
  const [animal_fit_for_surgery, setAnimalFitForSurgery] = useState(null);
  const [sponsor_amount, setAmount] = useState(null);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [sponsor_logo, setSponsorLogo] = useState(null);
  const [sponsorLogoPreview, setSponsorLogoPreview] = useState("");

  const [isSponsorLogoDeleted, setIsSponsorLogoDeleted] = useState(false);

  const navigate = useNavigate();

  const handleSponsorLogoChange = (event) => {
    const file = event.target.files[0];
    setSponsorLogo(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSponsorLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSponsorLogoPreview("");
    }
  };

  const handleDeleteSponsorLogo = () => {
    setSponsorLogo(null);
    setSponsorLogoPreview("");
  };

  const handleDeleteSavedSponsorLogo = () => {
    setIsSponsorLogoDeleted(true);
  };

  const handleUpdateSponsorDetail = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "sponsor_name",
      sponsor_name ? sponsor_name : path.state.data.sponsor_name
    );
    formData.append(
      "animal_fit_for_surgery",
      animal_fit_for_surgery
        ? animal_fit_for_surgery
        : path.state.data.animal_fit_for_surgery
    );
    formData.append(
      "sponsor_amount",
      sponsor_amount ? sponsor_amount : path.state.data.sponsor_amount
    );
    formData.append(
      "start_date",
      start_date
        ? start_date
          ? start_date
          : "1111-11-11"
        : path.state.data.start_date
    );
    formData.append(
      "end_date",
      end_date ? (end_date ? end_date : "1111-11-11") : path.state.data.end_date
    );

    if (sponsor_logo) {
      formData.append("sponsor_logo", sponsor_logo ? sponsor_logo : null);
    } else if (isSponsorLogoDeleted) {
      formData.append("sponsor_logo", "null");
    } else {
      formData.append("sponsor_logo", path.state.data.sponsor_logo);
    }

    try {
      const response = await axios.put(
        `${websiteUrl}/sponsors/update/${path.state.data.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Sponsor Updated Successfully");
        navigate("/Sponsor");
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
        height: "100vh",
        justifyContent: "space-between",
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
          <h4 className="heading1">Edit Sponsor</h4>

          <div className="case-lists mx-auto">
            <h4 className="heading1">Sponsor Details:</h4>
            <div style={{ padding: "1rem" }}>
              <form className="row g-3" onSubmit={handleUpdateSponsorDetail}>
                <div className="col-md-4">
                  <label
                    htmlFor="sponsor_name"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Sponsor Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sponsor Name"
                    aria-label="sponsor_name"
                    id="sponsor_name"
                    name="sponsor_name"
                    defaultValue={path.state.data.sponsor_name || ""}
                    onChange={(e) => setSponsorName(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="animal_fit_for_surgery"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Animal Fit for Surgery
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="animal_fit_for_surgery"
                    className="form-select"
                    name="animal_fit_for_surgery"
                    defaultValue={path.state.data.animal_fit_for_surgery}
                    onChange={(e) => setAnimalFitForSurgery(e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Sterilization">Sterilization</option>
                    <option value="OPD">OPD</option>
                    <option value="IPD">IPD</option>
                    <option value="Adoption">Adoption</option>
                    <option value="Post Op Care">Post Op Care</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label
                    htmlFor="sponsor_amount"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Amount <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="Number"
                    className="form-control"
                    id="sponsor_amount"
                    name="sponsor_amount"
                    placeholder="Amout"
                    defaultValue={path.state.data.sponsor_amount || ""}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="row my-1">
                  <div className="col">
                    <label
                      className="form-label"
                      style={{ fontWeight: "bold" }}
                      htmlFor="start_date"
                    >
                      Start Date
                    </label>
                    <input
                      className="form-control"
                      id="start_date"
                      name="start_date"
                      type="date"
                      defaultValue={
                        path.state.data.start_date
                          ? path.state.data.start_date === "1111-11-11"
                            ? ""
                            : path.state.data.start_date
                          : ""
                      }
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label
                      className="form-label"
                      style={{ fontWeight: "bold" }}
                      htmlFor="end_date"
                    >
                      End Date
                    </label>
                    <input
                      className="form-control"
                      id="end_date"
                      name="end_date"
                      type="date"
                      defaultValue={
                        path.state.data.end_date
                          ? path.state.data.end_date === "1111-11-11"
                            ? ""
                            : path.state.data.end_date
                          : ""
                      }
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-md-6"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label
                      htmlFor="sponsor_logo"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Sponsor Logo -
                    </label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="sponsor_logo"
                        accept="image/*"
                        name="sponsor_logo"
                        onChange={handleSponsorLogoChange}
                      />
                    </div>
                    {!isSponsorLogoDeleted ? (
                      path.state.data.sponsor_logo ? (
                        <div className="my-2">
                          <h6>Preview:</h6>
                          <img
                            src={`${websiteUrl}${path.state.data.sponsor_logo}`}
                            alt="Consent Form Preview"
                            height="100px"
                          />
                          <div
                            className="my-1"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <button
                              onClick={handleDeleteSavedSponsorLogo}
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
                                  `${websiteUrl}${path.state.data.sponsor_logo}`
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
                                  `${websiteUrl}${path.state.data.sponsor_logo}`
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
                        sponsorLogoPreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={sponsorLogoPreview}
                              alt="Sponsor Logo Preview"
                              height="100px"
                            />
                            <div className="my-2">
                              <button
                                onClick={handleDeleteSponsorLogo}
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
                      )
                    ) : (
                      sponsorLogoPreview && (
                        <div>
                          <h6>Preview:</h6>
                          <img
                            src={sponsorLogoPreview}
                            alt="Sponsor Logo Preview"
                            height="100px"
                          />
                          <div className="my-2">
                            <button
                              onClick={handleDeleteSponsorLogo}
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
                      navigate("/Sponsor");
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
      <Footer />
    </div>
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
}
