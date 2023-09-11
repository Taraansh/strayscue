import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddUser = () => {
  const { user, logoutUser, websiteUrl, allNgos, getAllNgos } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const isSuperUser = localStorage.getItem("is_superuser");
  const stored_type_of_user_in_ngo = localStorage.getItem(
    "type_of_user_in_ngo"
  );
  const stored_ngo_linked_with_this_user = localStorage.getItem(
    "ngo_linked_with_this_user"
  );
  const ngo_name = localStorage.getItem("ngo_name");

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [user_contact, setUser_contact] = useState(null);
  const [ngo_linked_with_this_user, setNgo_linked_with_this_user] =
    useState(null);
  const [type_of_user_in_ngo, setType_of_user_in_ngo] = useState(null);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    getAllNgos();
  }, [getAllNgos]);

  let addNewNgoUser = async (e) => {
    e.preventDefault();
    let ngo_linked_with_this_user_value;

    if (isSuperUser === "true") {
      ngo_linked_with_this_user_value = ngo_linked_with_this_user
        ? ngo_linked_with_this_user
        : null;
    } else if (
      stored_type_of_user_in_ngo === "Founder" ||
      stored_type_of_user_in_ngo === "Manager"
    ) {
      ngo_linked_with_this_user_value = stored_ngo_linked_with_this_user;
    }

    const data = {
      username: username,
      user_contact: user_contact,
      email: email,
      password: password,
      ngo_linked_with_this_user: ngo_linked_with_this_user_value,
      type_of_user_in_ngo: type_of_user_in_ngo ? type_of_user_in_ngo : null,
    };

    fetch(`${websiteUrl}/authorize/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Email already exists") {
          toast.info("Email already exists");
        } else if (data.message === "Contact already exists") {
          toast.info("Contact already exists");
        } else if (data.message === "username already exists") {
          toast.info("Username already exists");
        } else {
          toast.success("User Added");
          navigate("/UserManagement");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    (isSuperUser === "true" ||
      stored_type_of_user_in_ngo === "Founder" ||
      stored_type_of_user_in_ngo === "Manager") &&
    user && (
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
              paddingBottom: "3rem",
              paddingLeft: "50px",
            }}
            className="container"
          >
            <h4 className="heading1">Add User</h4>
            <div className="case-lists mx-auto">
              <div style={{ padding: "1rem" }}>
                <form className="row g-3" onSubmit={addNewNgoUser}>
                  {/* <div className="col-md-6">
                  <label
                    htmlFor="inputEmail4"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    aria-label="First name"
                    required
                  />
                </div> */}

                  <div className="col-md-6">
                    <label
                      htmlFor="username"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Username <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      required
                      placeholder="Username"
                      autoComplete="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="email"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="password"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Password <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="input-group mb-3 ">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        required
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        aria-label="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="input-group-text" id="basic-addon1">
                        <i
                          style={{
                            cursor: "pointer",
                            fontSize: "1rem",
                            zIndex: "99999",
                          }}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </i>
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="user_contact"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Contact <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="user_contact"
                      name="user_contact"
                      placeholder="Contact"
                      required
                      onChange={(e) => setUser_contact(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="type_of_user_in_ngo"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="type_of_user_in_ngo"
                      name="type_of_user_in_ngo"
                      className="form-select"
                      onChange={(e) => setType_of_user_in_ngo(e.target.value)}
                    >
                      <option value="">Choose</option>
                      <option value="Founder">Founder</option>
                      <option value="Manager">Manager</option>
                      <option value="Worker">Worker</option>
                    </select>
                  </div>

                  {isSuperUser === "true" ? (
                    <div className="col-md-6">
                      <label
                        htmlFor="ngo_linked_with_this_user"
                        style={{ fontWeight: "bold" }}
                        className="form-label"
                      >
                        Select Ngo for this User
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        id="ngo_linked_with_this_user"
                        name="ngo_linked_with_this_user"
                        className="form-select"
                        onChange={(e) =>
                          setNgo_linked_with_this_user(e.target.value)
                        }
                      >
                        <option value="">Choose</option>
                        {allNgos.map((data, index) => {
                          return (
                            <option key={index} value={data.id}>
                              {data.ngo_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : (
                    (stored_type_of_user_in_ngo === "Founder" ||
                      stored_type_of_user_in_ngo === "Manager") && (
                      <div className="col-md-6">
                        <label
                          htmlFor="ngo_linked_with_this_user"
                          style={{ fontWeight: "bold" }}
                          className="form-label"
                        >
                          Select Ngo for this User
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          id="ngo_linked_with_this_user"
                          name="ngo_linked_with_this_user"
                          className="form-control"
                          value={ngo_name}
                          readOnly
                        ></input>
                      </div>
                    )
                  )}

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
                        navigate("/UserManagement");
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
    )
  );
};

export default AddUser;
