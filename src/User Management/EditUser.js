import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import axios from "axios";

export default function EditUser() {
  const { user, logoutUser, websiteUrl } = useContext(AuthContext);
  const path = useLocation();
  const navigate = useNavigate();
  const isSuperUser = localStorage.getItem("is_superuser");
  const stored_type_of_user_in_ngo = localStorage.getItem(
    "type_of_user_in_ngo"
  );
  // const stored_ngo_linked_with_this_user = localStorage.getItem("ngo_linked_with_this_user");
  // const ngo_name = localStorage.getItem("ngo_name");

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [user_contact, setUser_contact] = useState(null);
  const [type_of_user_in_ngo, setType_of_user_in_ngo] = useState(null);
  const [is_active, setIsActive] = useState(null);
  // const [ngo_linked_with_this_user, setNgo_linked_with_this_user] = useState(null);

  const handleUpdateUserLinkedWithNgo = async (e) => {
    e.preventDefault();
    const update_data = {
      username: username ? username : path.state.data.username,
      user_contact: user_contact ? user_contact : path.state.data.user_contact,
      email: email ? email : path.state.data.email,
      type_of_user_in_ngo: type_of_user_in_ngo ? type_of_user_in_ngo : path.state.data.type_of_user_in_ngo,
      is_active: is_active ? is_active: path.state.data.is_active,
    };
    console.log(update_data)

    try {
      const response = await axios.put(
        `${websiteUrl}/authorize/modify/${path.state.data.id}/`,
        update_data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Success", response.data);
        alert("Updated Succesfully");
        navigate("/UserManagement");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //   return (
  //     <div>EditUser - {path.state.data.username}</div>
  //   )

  return (
    (isSuperUser === "true" ||
      stored_type_of_user_in_ngo === "Founder" ||
      stored_type_of_user_in_ngo === "Manager") &&
    user && (
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
            <h4 className="heading1">Edit User</h4>
            <div className="case-lists mx-auto">
              <div style={{ padding: "1rem" }}>
                <form
                  className="row g-3"
                  onSubmit={handleUpdateUserLinkedWithNgo}
                >
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
                      placeholder="Username"
                      autoComplete="username"
                      defaultValue={path.state.data.username || ""}
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
                      defaultValue={path.state.data.email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                      defaultValue={path.state.data.user_contact || ""}
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
                      defaultValue={path.state.data.type_of_user_in_ngo}
                      onChange={(e) => setType_of_user_in_ngo(e.target.value)}
                    >
                      <option value="">Choose</option>
                      <option value="Founder">Founder</option>
                      <option value="Manager">Manager</option>
                      <option value="Worker">Worker</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="is_active"
                      style={{ fontWeight: "bold" }}
                      className="form-label"
                    >
                      Status <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="is_active"
                      name="is_active"
                      className="form-select"
                      defaultValue={path.state.data.is_active}
                      onChange={(e) => setIsActive(e.target.value)}
                    >
                      <option value="">Choose</option>
                      <option value="Active">Active</option>
                      <option value="Not Active">Not Active</option>
                    </select>
                  </div>

                  {/* {isSuperUser === "true" && (<div className="col-md-6">
                  <label
                    htmlFor="ngo_linked_with_this_user"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Select Ngo for this User <span style={{ color: "red" }}>*</span>
                  </label>
                  <select id="ngo_linked_with_this_user" 
                  name="ngo_linked_with_this_user" 
                  className="form-select"
                  defaultValue={path.state.data.ngo_linked_with_this_user}
                  onChange={(e)=> setNgo_linked_with_this_user(e.target.value)}>
                    <option value="">Choose</option>
                    {
                      allNgos.map((data, index)=> {
                        return <option key={index} value={data.ngo_name}>{data.ngo_name}</option>
                      })
                    }
                  </select>
                </div>)} */}

               <div className="col-md-6">
                  <label
                    htmlFor="ngo_linked_with_this_user"
                    style={{ fontWeight: "bold" }}
                    className="form-label"
                  >
                    Select Ngo for this User <span style={{ color: "red" }}>*</span>
                  </label>
                  <input id="ngo_linked_with_this_user" 
                  name="ngo_linked_with_this_user" 
                  className="form-control"
                  value={path.state.data.ngo_name}
                  readOnly
                  >
                  </input>
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
    )
  );
}
