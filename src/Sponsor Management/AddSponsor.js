import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSponsor = () => {
  const { user, logoutUser, websiteUrl } = useContext(AuthContext);
  const [sponsor_name, setSponsorName] = useState(null);
  const [animal_fit_for_surgery, setAnimalFitForSurgery] = useState(null);
  const [sponsor_amount, setAmount] = useState(null);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [sponsor_logo, setSponsorLogo] = useState(null);
  const [sponsorLogoPreview, setSponsorLogoPreview] = useState("");

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

  const handleSponsorDetailSubmit = async (e) => {
    e.preventDefault();
    const sponsor_profile_creator = localStorage.getItem("id");

    const formData = new FormData();
    formData.append("sponsor_name", sponsor_name);
    formData.append("animal_fit_for_surgery", animal_fit_for_surgery);
    formData.append("sponsor_amount", sponsor_amount);
    formData.append("start_date", start_date ? start_date : "1111-11-11");
    formData.append("end_date", end_date ? end_date : "1111-11-11");
    formData.append("sponsor_logo", sponsor_logo);
    formData.append("sponsor_profile_creator", sponsor_profile_creator);

    try {
      const response = await axios.post(
        `${websiteUrl}/sponsors/addsponsor/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Sponsor Added Successfully");
        navigate("/Sponsor");
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
          <h4 className="heading1">Add Sponsor</h4>

          <div className="case-lists mx-auto">
            <h4 className="heading1">Sponsor Details:</h4>
            <div style={{ padding: "1rem" }}>
              <form className="row g-3" onSubmit={handleSponsorDetailSubmit}>
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
                    required
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
                    required
                    onChange={(e) => setAnimalFitForSurgery(e.target.value)}
                  >
                    <option value="">Choose</option>
                    <option value="Vacciation">Vacciation</option>
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
                    required
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
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-md-6 mb-3"
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
                    {sponsorLogoPreview && (
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
};

export default AddSponsor;
