import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";

const AddNgo = () => {
    const { user, logoutUser } = useContext(AuthContext);

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

                    <h4 className="heading1">Add NGO</h4>


                    <div className="case-lists mx-auto" >
                    <h4 className="heading1">NGO Details:</h4>
                        <div style={{ padding: "1rem" }}>
                            <form className="row g-3">
                                <div className="col-md-4">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">NGO Name:</label>
                                    <input type="text" className="form-control" placeholder="NGO Name" aria-label="First name" required />
                                </div>
                                <div className="col-md-4">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">Darpan ID:</label>
                                    <input type="email" placeholder="Darpan ID" className="form-control" id="inputEmail4" required />
                                </div>
                                <div className="col-md-4">
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">NGO Description:</label>
                                    <input type="password" placeholder="NGO Description" className="form-control" id="inputPassword4" />
                                </div>
                              
                                <div className="col-md-4">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">Mission Statement:</label>
                                    <input type="text" className="form-control" placeholder="Mission Statement" aria-label="First name" required />
                                </div>
                                <div className="col-md-4">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">Helpline No:</label>
                                    <input type="email" className="form-control" placeholder="Helpline No" id="inputEmail4" required />
                                </div>
                                <div className="col-md-4">
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">Alternate Helpline No:</label>
                                    <input type="password" className="form-control" placeholder="Alternate Helpline No" id="inputPassword4" />
                                </div>
                              
                                <div className="col-md-4">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">Facebook Page:</label>
                                    <input type="text" className="form-control" placeholder="Facebook Page" aria-label="First name" required />
                                </div>
                                <div className="col-md-4">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">Linkdin Page:</label>
                                    <input type="email" className="form-control" placeholder="Linkdin Page" id="inputEmail4" required />
                                </div>
                                <div className="col-md-4">
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">Instagram Page:</label>
                                    <input type="password" className="form-control" placeholder="Instagram Page" id="inputPassword4" />
                                </div>
                              
                                <div className="col-md-4">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">Twitter Page:</label>
                                    <input type="text" className="form-control" placeholder="Twitter Page" aria-label="First name" required />
                                </div>
                                <div className="col-md-4">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">NGO Email:</label>
                                    <input type="email" className="form-control" placeholder="NGO Email" id="inputEmail4" required />
                                </div>
                                <div className="col-md-4">
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">NGO Website:</label>
                                    <input type="password" className="form-control" placeholder="NGO Website" id="inputPassword4" />
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

export default AddNgo;

