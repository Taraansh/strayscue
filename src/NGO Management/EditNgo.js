import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditNgo() {
  const path = useLocation();
  const navigate = useNavigate();
  const isSuperUser = localStorage.getItem("is_superuser");
  const { user, logoutUser } = useContext(AuthContext);
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

    if (ngo_logo) {
      formData.append("ngo_logo", ngo_logo ? ngo_logo : null);
    } else if (isNgoLogoDeleted) {
      formData.append("ngo_logo", "null");
    } else {
      formData.append("ngo_logo", path.state.data.ngo_logo);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/ngos/update/${path.state.data.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Success:", response.data);
        alert("NGO Updated Successfully");
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
    user && (<div
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
                      onChange={(e)=> setNgoName(e.target.value)}
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
                      onChange={(e)=> setDarpanId(e.target.value)}
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
                      defaultValue={path.state.data.description || ""}
                      onChange={(e)=> setDescription(e.target.value)}
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
                      defaultValue={path.state.data.mission_statement || ""}
                      onChange={(e)=> setMissionStatement(e.target.value)}
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
                      defaultValue={path.state.data.helpline_number || ""}
                      onChange={(e)=> setHelplineNumber(e.target.value)}
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
                      defaultValue={path.state.data.alternate_helpline_number || ""}
                      onChange={(e)=> setAlternateHelplineNumber(e.target.value)}
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
                      defaultValue={path.state.data.facebook_page || ""}
                      onChange={(e)=> setFacebookPage(e.target.value)}
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
                      defaultValue={path.state.data.linkedin_page || ""}
                      onChange={(e)=> setLinkedinPage(e.target.value)}
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
                      defaultValue={path.state.data.instagram_page || ""}
                      onChange={(e)=> setInstagramPage(e.target.value)}
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
                      defaultValue={path.state.data.twitter_page || ""}
                      onChange={(e)=> setTwitterPage(e.target.value)}
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
                      defaultValue={path.state.data.ngo_email || ""}
                      onChange={(e)=> setNgoEmail(e.target.value)}
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
                      defaultValue={path.state.data.ngo_website || ""}
                      onChange={(e)=> setNgoWebsite(e.target.value)}
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
                    {(!isNgoLogoDeleted) ? ((path.state.data.ngo_logo) ? (
                        <div>
                            <h6>Preview:</h6>
                            <img
                            src={`http://localhost:8000${path.state.data.ngo_logo}`}
                            alt="NGO Logo Preview"
                            height="100px"
                          />
                          <button onClick={handleDeleteSavedNgoLogo}>
                            Delete
                          </button>
                        </div>
                    ) : (ngoLogoPreview && (
                      <div>
                        <h6>Preview:</h6>
                        <img
                          src={ngoLogoPreview}
                          alt="NGO Logo Preview"
                          height="100px"
                        />
                        <button onClick={handleDeleteNgoLogo}>
                          Delete
                        </button>
                      </div>))): (ngoLogoPreview && (
                      <div>
                        <h6>Preview:</h6>
                        <img
                          src={ngoLogoPreview}
                          alt="NGO Logo Preview"
                          height="100px"
                        />
                        <button onClick={handleDeleteNgoLogo}>
                          Delete
                        </button>
                      </div>)
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
      </div>)
  );
}
