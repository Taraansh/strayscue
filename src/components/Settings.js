import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import axios from "axios";

const Settings = () => {
  const { user, logoutUser, websiteUrl } = useContext(AuthContext);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);

  const [username, setUsername] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");

  const [isProfilePhotoDeleted, setIsProfilePhotoDeleted] = useState(false);

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePhotoPreview("");
    }
  };

  const handleDeleteProfilePhoto = () => {
    setProfilePhoto(null);
    setProfilePhotoPreview("");
  };

  const handleDeleteSavedProfilePhoto = () => {
    setIsProfilePhotoDeleted(true);
  };

  // const navigate = useNavigate();
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };


  const handleModifyProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username ? username : localStorage.getItem("username"))

    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto ? profilePhoto : null);
    } else if (isProfilePhotoDeleted) {
      formData.append("profilePhoto", "null");
    } else {
      formData.append("profilePhoto", localStorage.getItem("profilePhoto"));
    }

    try {
      const response = await axios.put(
        `${websiteUrl}/authorize/update/${localStorage.getItem("email")}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
      )
      if (response.status === 200) {
        console.log("Success", response.data)
        alert("Updated Succesfully. Please login again to view changes.")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleModifyPassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === confirmNewPassword) {
        const data = {
          password: oldPassword,
          new_password: newPassword,
        };
        const response = await fetch(
          `${websiteUrl}/authorize/passchange/${localStorage.getItem(
            "email"
          )}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        // Check if the response status is 200 (OK)
        if (response.status === 200) {
          const responseData = await response.json(); // Parse the response data as JSON
          console.log(responseData);
          logoutUser(e);
          alert("Password Changed Successfully. Please Login Again");
        } else if (response.status === 401) {
          alert("Enter Old Password Again");
        } else {
          alert("Something went wrong.");
        }
      } else {
        alert("Enter New Password Again");
      }
    } catch (error) {
      console.error("Error:", error);
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
          <h4 className="heading1">Profile Settings</h4>
          <div className="case-lists mx-auto">
            <div
              className="container-fluid"
              style={{ overflow: "scroll", paddingBottom: "2rem" }}
            >
              <form onSubmit={handleModifyProfile}>
                <div className="mb-3">
                  <label
                    style={{ fontWeight: "bold" }}
                    htmlFor="username"
                    className="form-label"
                  >
                    Username:
                  </label>
                  <input
                    type="text"
                    style={{ width: "auto" }}
                    className="form-control"
                    id="username"
                    defaultValue={localStorage.getItem("username")}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-1" style={{ display: "flex" }}>
                  <div className="mb-3" style={{ marginRight: "2rem" }}>
                    <label
                      style={{ fontWeight: "bold" }}
                      htmlFor="profilePhoto"
                      className="form-label"
                    >
                      Profile Photo:
                    </label>
                    <div className="custom-file">
                      <input
                        className="form-control custom-file-imput"
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={handleProfilePhotoChange}
                      />
                    </div>
                    {
                      !isProfilePhotoDeleted ?
                        (
                          localStorage.getItem("profilePhoto") ? (
                            <div className="mt-4">
                              <div>
                                <h6>Preview:</h6>
                                <div className="mt-4 mx-3" style={{ border: "1px solid black", borderRadius: "0.2rem", position: "relative", width: "max-content" }}>
                                  <img
                                    src={`http://localhost:8000${localStorage.getItem("profilePhoto")}`}
                                    alt="Preview"
                                    height="100px"
                                  />
                                  <button style={{ position: "absolute", top: "0", right: "0", padding: "0", background: "#ffffff" }} className="btn" onClick={handleDeleteSavedProfilePhoto}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25"
                                      height="25"
                                      fill="red"

                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z" id="_icons" fill="red" className="fill-000000"></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            profilePhotoPreview && (
                              <div className="mt-4">
                                <h6>Preview:</h6>
                                <div className="mt-4 mx-3" style={{ border: "1px solid black", borderRadius: "0.2rem", position: "relative", width: "max-content" }}>
                                  <img
                                    src={profilePhotoPreview}
                                    alt="Preview"
                                    height="100px"
                                  />
                                  <button style={{ position: "absolute", top: "0", right: "0", padding: "0", background: "#ffffff" }} className="btn" onClick={handleDeleteProfilePhoto}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25"
                                      height="25"
                                      fill="red"

                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z" id="_icons" fill="red" className="fill-000000"></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            )
                          )
                        ) :
                        (
                          profilePhotoPreview && (
                            <div className="mt-4">
                              <h6>Preview:</h6>
                              <div className="mt-4 mx-3" style={{ border: "1px solid black", borderRadius: "0.2rem", position: "relative", width: "max-content" }}>
                                <img

                                  src={profilePhotoPreview}
                                  alt="Preview"
                                  height="100px"
                                />
                                <button style={{ position: "absolute", top: "0", right: "0", padding: "0", background: "#ffffff" }} className="btn" onClick={handleDeleteProfilePhoto}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="red"

                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z" id="_icons" fill="red" className="fill-000000"></path>
                                  </svg>
                                </button>

                              </div>
                            </div>
                          )
                        )}
                  </div>
                  <div></div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "1rem",
                  }}
                >
                  <button
                    style={{
                      background: "rgb(245, 145, 32)",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                    className="btn"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <h4 className="heading1 my-3">Change Password</h4>
          <div className="case-lists mx-auto">
            <div
              className="container-fluid"
              style={{ overflow: "scroll", paddingBottom: "2rem" }}
            >
              <form onSubmit={handleModifyPassword}>
                <label
                  style={{ fontWeight: "bold" }}
                  htmlFor="password"
                  className="form-label"
                >
                  Old Password:
                </label>
                <div className="input-group mb-3 w-75">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    className="form-control"
                    placeholder="Old Password"
                    required
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    aria-describedby="PasswordHelp"
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <span className="input-group-text" id="basic-addon1">
                    <i
                      style={{
                        cursor: "pointer",
                        fontSize: "1rem",
                        zIndex: "99999",
                      }}
                      onClick={togglePasswordVisibility1}
                    >
                      {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                    </i>
                  </span>
                </div>
                <label
                  style={{ fontWeight: "bold" }}
                  htmlFor="new_password"
                  className="form-label"
                >
                  New Password:
                </label>
                <div className="input-group mb-3 w-75">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    className="form-control"
                    placeholder="New Password"
                    id="new_password"
                    name="new_password"
                    autoComplete="new-password"
                    aria-describedby="NewPwdHelp"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span className="input-group-text" id="basic-addon1">
                    <i
                      style={{
                        cursor: "pointer",
                        fontSize: "1rem",
                        zIndex: "99999",
                      }}
                      onClick={togglePasswordVisibility2}
                    >
                      {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                    </i>
                  </span>
                </div>
                <label
                  style={{ fontWeight: "bold" }}
                  htmlFor="confirm_new_password"
                  className="form-label"
                >
                  Confirm New Password:
                </label>
                <div className="input-group mb-3 w-75">
                  <input
                    type={showPassword3 ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm New Password"
                    required
                    id="confirm_new_password"
                    name="confirm_new_password"
                    aria-describedby="ConfirmNewPwdHelp"
                    autoComplete="new-password"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  <span className="input-group-text" id="basic-addon1">
                    <i
                      style={{
                        cursor: "pointer",
                        fontSize: "1rem",
                        zIndex: "99999",
                      }}
                      onClick={togglePasswordVisibility3}
                    >
                      {showPassword3 ? <FaEyeSlash /> : <FaEye />}
                    </i>
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "1rem",
                  }}
                >
                  <button
                    style={{
                      background: "rgb(245, 145, 32)",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                    className="btn"
                  >
                    Submit
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

export default Settings;
