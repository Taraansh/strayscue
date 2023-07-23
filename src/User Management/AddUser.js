import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const AddUser = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
   
    // const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

                    <h4 className="heading1">Add User</h4>


                    <div className="case-lists mx-auto" >
                        <div style={{ padding: "1rem" }}>
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">Name:</label>
                                    <input type="text" className="form-control" placeholder="First name" aria-label="First name" required />
                                </div>
                                <div className="col-md-6">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">Email</label>
                                    <input type="email" className="form-control" id="inputEmail4" required />
                                </div>
                                <div className="col-md-6">
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">User Name:</label>
                                    <input type="password" className="form-control" id="inputPassword4" />
                                </div>
                                <div className="col-md-6">
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">Password:</label>
                                    <div className="input-group mb-3 " >
                                <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password"
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
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </i></span>
                            </div>
                                </div>
                                <div className="col-md-6">
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">Contact:</label>
                                    <input type="password" className="form-control" id="inputPassword4" />
                                </div>
                                <div className="col-md-6">
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">Type:</label>
                                    <select id="inputState" class="form-select">
                                        <option selected>Choose</option>
                                        <option>Founder</option>
                                        <option>Manager</option>
                                        <option>Worker</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <button style={{
                                        background: "rgb(245, 145, 32)",
                                        color: "#ffffff",
                                        cursor: "pointer",
                                    }} type="submit" className="btn">Submit</button>
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

export default AddUser;

