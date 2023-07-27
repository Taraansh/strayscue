import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import Footer from "./Footer";

const Settings = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
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
                        height:"900px"
                    }}
                    className="container"
                >

                    <h4 className="heading1">Profile Settings</h4>


                    <div className="case-lists mx-auto" >



                        <div className="container-fluid" style={{ overflow: "scroll", paddingBottom: "2rem" }} >
                            <div class="mb-3">
                                <label style={{ fontWeight: "bold" }} for="User1" className="form-label">User Name:</label>
                                <input type="text" style={{ width: "auto" }} className="form-control" id="username" />

                            </div>
                            <div className="form-1" style={{ display: "flex" }}>
                                <div class="mb-3" style={{ marginRight: "2rem" }}>
                                    <label style={{ fontWeight: "bold" }} for="formFile" className="form-label">Profile Photo:</label>
                                    <input className="form-control" type="file" id="formFile" />
                                </div>
                                <div >
                                    <label style={{ fontWeight: "bold" }} className="form-label">Preview:</label>

                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "1rem" }}>
                                <Link

                                    style={{
                                        background: "rgb(245, 145, 32)",
                                        color: "#ffffff",
                                        cursor: "pointer",
                                    }}
                                    className="btn "
                                >

                                    Submit
                                </Link>
                            </div>


                        </div>
                    </div>


                    <h4 className="heading1 my-3">Change Password</h4>
                    <div className="case-lists mx-auto" >



                       
                        <div className="container-fluid" style={{ overflow: "scroll", paddingBottom: "2rem" }} >
                            <div>

                           
                        <label style={{ fontWeight: "bold" }} for="User1" className="form-label">Old Password:</label>
                            <div className="input-group mb-3 w-75" >
                                <input type={showPassword1 ? "text" : "password"} className="form-control" placeholder="Password"
                                    required
                                    id="current-password"
                                    name="password"
                                    autoComplete="current-password" aria-label="Username" aria-describedby="basic-addon1" />
                                <span className="input-group-text" id="basic-addon1"><i
                                    style={{
                                        cursor: "pointer",
                                       
                                        
                                        fontSize: "1rem",
                                        zIndex: "99999",
                                    }}
                                    onClick={togglePasswordVisibility1}
                                >
                                    {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                                </i></span>
                            </div>
                            <label style={{ fontWeight: "bold" }} for="User1" className="form-label">New Password:</label>
                            <div className="input-group mb-3 w-75" >
                                <input type={showPassword2 ? "text" : "password"} className="form-control" placeholder="Password"
                                    required
                                    id="current-password"
                                    name="password"
                                    autoComplete="current-password" aria-label="Username" aria-describedby="basic-addon1" />
                                <span className="input-group-text" id="basic-addon1"><i
                                    style={{
                                        cursor: "pointer",
                                       
                                        
                                        fontSize: "1rem",
                                        zIndex: "99999",
                                    }}
                                    onClick={togglePasswordVisibility2}
                                >
                                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                                </i></span>
                            </div>
                            <label style={{ fontWeight: "bold" }} for="User1" className="form-label">Confirm New Password:</label>
                            <div className="input-group mb-3 w-75" >
                                
                                <input type={showPassword3 ? "text" : "password"} className="form-control" placeholder="Password"
                                    required
                                    id="current-password"
                                    name="password"
                                    autoComplete="current-password" aria-label="Username" aria-describedby="basic-addon1" />
                                <span className="input-group-text" id="basic-addon1"><i
                                    style={{
                                        cursor: "pointer",
                                       
                                        
                                        fontSize: "1rem",
                                        zIndex: "99999",
                                    }}
                                    onClick={togglePasswordVisibility3}
                                >
                                    {showPassword3 ? <FaEyeSlash /> : <FaEye />}
                                </i></span>
                            </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "1rem" }}>
                                <Link

                                    style={{
                                        background: "rgb(245, 145, 32)",
                                        color: "#ffffff",
                                        cursor: "pointer",
                                    }}
                                    className="btn "
                                >

                                    Submit
                                </Link>
                            </div>


                        </div>
                    </div>

                       <Footer/>
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
                    backgroundColor: "#ffffff"
                }}
            >
                <span>
                    <label style={{ padding: "0.5rem", fontWeight: "bold" }}>
                        Chetan
                    </label>
                    <img
                        width="17%"
                        style={{ marginRight: "1.5rem", cursor: "pointer", }}
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

