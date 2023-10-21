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

export default function EditNgo() {
  const { user, logoutUser, websiteUrl, handleDownloadImage } =
    useContext(AuthContext);
  const isSuperUser = localStorage.getItem("is_superuser");

  const [openedImage, setOpenedImage] = useState(null);

  const path = useLocation();
  const navigate = useNavigate();

  const [ngo_name, setNgoName] = useState(null);
  const [darpan_id, setDarpanId] = useState(null);
  const [description, setDescription] = useState(null);
  const [mission_statement, setMissionStatement] = useState(null);
  const [helpline_number, setHelplineNumber] = useState(null);
  const [alternate_helpline_number, setAlternateHelplineNumber] =
    useState(null);
  const [facebook_page, setFacebookPage] = useState(null);
  const [linkedin_page, setLinkedinPage] = useState(null);
  const [instagram_page, setInstagramPage] = useState(null);
  const [twitter_page, setTwitterPage] = useState(null);
  const [ngo_email, setNgoEmail] = useState(null);
  const [ngo_website, setNgoWebsite] = useState(null);
  const [ngo_address, setNgoAddress] = useState(null);
  const [offline_cases, setOfflineCases] = useState(null);
  const [ngo_logo, setNgoLogo] = useState(null);
  const [ngoLogoPreview, setNgoLogoPreview] = useState(null);

  const [isNgoLogoDeleted, setIsNgoLogoDeleted] = useState(false);

  const handleNgoLogoChange = (event) => {
    const file = event.target.files[0];
    setNgoLogo(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNgoLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNgoLogoPreview("");
    }
  };

  const handleDeleteNgoLogo = () => {
    setNgoLogo(null);
    setNgoLogoPreview("");
  };

  const handleDeleteSavedNgoLogo = () => {
    setIsNgoLogoDeleted(true);
  };

  const handleNgoDetailSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ngo_name", ngo_name ? ngo_name : path.state.data.ngo_name);
    formData.append(
      "darpan_id",
      darpan_id ? darpan_id : path.state.data.darpan_id
    );
    formData.append(
      "description",
      description ? description : path.state.data.description
    );
    formData.append(
      "mission_statement",
      mission_statement ? mission_statement : path.state.data.mission_statement
    );
    formData.append(
      "helpline_number",
      helpline_number ? helpline_number : path.state.data.helpline_number
    );
    formData.append(
      "alternate_helpline_number",
      alternate_helpline_number
        ? alternate_helpline_number
        : path.state.data.alternate_helpline_number
    );
    formData.append(
      "facebook_page",
      facebook_page ? facebook_page : path.state.data.facebook_page
    );
    formData.append(
      "linkedin_page",
      linkedin_page ? linkedin_page : path.state.data.linkedin_page
    );
    formData.append(
      "instagram_page",
      instagram_page ? instagram_page : path.state.data.instagram_page
    );
    formData.append(
      "twitter_page",
      twitter_page ? twitter_page : path.state.data.twitter_page
    );
    formData.append(
      "ngo_email",
      ngo_email ? ngo_email : path.state.data.ngo_email
    );
    formData.append(
      "ngo_website",
      ngo_website ? ngo_website : path.state.data.ngo_website
    );
    formData.append(
      "ngo_address",
      ngo_address ? ngo_address : path.state.data.ngo_address
    );
    formData.append(
      "offline_cases",
      offline_cases ? offline_cases : path.state.data.offline_cases
    );

    if (ngo_logo) {
      formData.append("ngo_logo", ngo_logo ? ngo_logo : null);
    } else if (isNgoLogoDeleted) {
      formData.append("ngo_logo", "null");
    } else {
      formData.append("ngo_logo", path.state.data.ngo_logo);
    }

    try {
      const response = await axios.put(
        `${websiteUrl}/ngos/update/${path.state.data.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("NGO Updated Successfully");
        navigate("/NGO");
        // Handle success or display a success message.
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error or display an error message.
    }
  };

  return (
    // <div>EditNgo - {path.state.data.ngo_name}</div>
    isSuperUser === "true" &&
    user && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
              paddingBottom: "3rem",
            }}
            className="container"
          >
            <h4 className="heading1">Edit NGO</h4>
            <div className="case-lists mx-auto">
              <h4 className="heading1">NGO Details:</h4>
              <div style={{ padding: "1rem" }}>
                <form className="row g-3" onSubmit={handleNgoDetailSubmit}>
                  <div className="col-md-4">
                    <label
                      htmlFor="ngo_name"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      NGO Name: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="NGO Name"
                      aria-label="NGO name"
                      id="ngo_name"
                      name="ngo_name"
                      defaultValue={path.state.data.ngo_name || ""}
                      onChange={(e) => setNgoName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="darpan_id"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Darpan ID: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Darpan ID"
                      className="form-control"
                      id="darpan_id"
                      name="darpan_id"
                      defaultValue={path.state.data.darpan_id || ""}
                      onChange={(e) => setDarpanId(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="inputPdescriptionassword4"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      NGO Description:
                    </label>
                    <input
                      type="text"
                      placeholder="NGO Description"
                      className="form-control"
                      id="description"
                      name="description"
                      defaultValue={
                        path.state.data.description === "null"
                          ? ""
                          : path.state.data.description
                      }
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <label
                      htmlFor="mission_statement"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Mission Statement:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mission Statement"
                      id="mission_statement"
                      name="mission_statement"
                      defaultValue={
                        path.state.data.mission_statement === "null"
                          ? ""
                          : path.state.data.mission_statement
                      }
                      onChange={(e) => setMissionStatement(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="helpline_number"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Helpline No:
                    </label>
                    <input
                      type="phone"
                      className="form-control"
                      placeholder="Helpline No"
                      id="helpline_number"
                      name="helpline_number"
                      defaultValue={
                        path.state.data.helpline_number === "null"
                          ? ""
                          : path.state.data.helpline_number
                      }
                      onChange={(e) => setHelplineNumber(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="alternate_helpline_number"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Alternate Helpline No:
                    </label>
                    <input
                      type="phone"
                      className="form-control"
                      placeholder="Alternate Helpline No"
                      id="alternate_helpline_number"
                      name="alternate_helpline_number"
                      defaultValue={
                        path.state.data.alternate_helpline_number === "null"
                          ? ""
                          : path.state.data.alternate_helpline_number
                      }
                      onChange={(e) =>
                        setAlternateHelplineNumber(e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label
                      htmlFor="facebook_page"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Facebook Page:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Facebook Page"
                      id="facebook_page"
                      name="facebook_page"
                      defaultValue={
                        path.state.data.facebook_page === "null"
                          ? ""
                          : path.state.data.facebook_page
                      }
                      onChange={(e) => setFacebookPage(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="linkedin_page"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Linkdin Page:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Linkdin Page"
                      id="linkedin_page"
                      name="linkedin_page"
                      defaultValue={
                        path.state.data.linkedin_page === "null"
                          ? ""
                          : path.state.data.linkedin_page
                      }
                      onChange={(e) => setLinkedinPage(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="instagram_page"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Instagram Page:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Instagram Page"
                      id="instagram_page"
                      name="instagram_page"
                      defaultValue={
                        path.state.data.instagram_page === "null"
                          ? ""
                          : path.state.data.instagram_page
                      }
                      onChange={(e) => setInstagramPage(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <label
                      htmlFor="twitter_page"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Twitter Page:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Twitter Page"
                      id="twitter_page"
                      name="twitter_page"
                      defaultValue={
                        path.state.data.twitter_page === "null"
                          ? ""
                          : path.state.data.twitter_page
                      }
                      onChange={(e) => setTwitterPage(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="ngo_email"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      NGO Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="NGO Email"
                      id="ngo_email"
                      name="ngo_email"
                      defaultValue={
                        path.state.data.ngo_email === "null"
                          ? ""
                          : path.state.data.ngo_email
                      }
                      onChange={(e) => setNgoEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="ngo_website"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      NGO Website:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="NGO Website"
                      id="ngo_website"
                      name="ngo_website"
                      defaultValue={
                        path.state.data.ngo_website === "null"
                          ? ""
                          : path.state.data.ngo_website
                      }
                      onChange={(e) => setNgoWebsite(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="ngo_address"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      NGO Address:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="NGO Address"
                      id="ngo_address"
                      name="ngo_address"
                      defaultValue={
                        path.state.data.ngo_address === "null"
                          ? ""
                          : path.state.data.ngo_address
                      }
                      onChange={(e) => setNgoAddress(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="offline_cases"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Total Cases Catered Offline:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Offline Cases"
                      id="offline_cases"
                      name="offline_cases"
                      defaultValue={
                        path.state.data.offline_cases === "null"
                          ? ""
                          : path.state.data.offline_cases
                      }
                      onChange={(e) => setOfflineCases(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <div
                      className="mb-3"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label
                        htmlFor="ngo_logo"
                        style={{ fontWeight: "bold" }}
                        className="form-label"
                      >
                        NGO Logo -
                      </label>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="ngo_logo"
                          accept="image/*"
                          name="ngo_logo"
                          onChange={handleNgoLogoChange}
                        />
                      </div>
                      {!isNgoLogoDeleted ? (
                        path.state.data.ngo_logo ? (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={`${websiteUrl}${path.state.data.ngo_logo}`}
                              alt="NGO Logo Preview"
                              height="100px"
                            />
                            <div className="my-2">
                              <button
                                className="my-2 btn"
                                onClick={handleDeleteSavedNgoLogo}
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
                                    `${websiteUrl}${path.state.data.ngo_logo}`
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
                                    `${websiteUrl}${path.state.data.ngo_logo}`
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
                          ngoLogoPreview && (
                            <div>
                              <h6>Preview:</h6>
                              <img
                                src={ngoLogoPreview}
                                alt="NGO Logo Preview"
                                height="100px"
                              />
                              <div className="my-2">
                                <button
                                  onClick={handleDeleteNgoLogo}
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
                        ngoLogoPreview && (
                          <div>
                            <h6>Preview:</h6>
                            <img
                              src={ngoLogoPreview}
                              alt="NGO Logo Preview"
                              height="100px"
                            />
                            <div className="my-2">
                              <button
                                onClick={handleDeleteNgoLogo}
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
                        navigate("/NGO");
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
    )
  );
}
