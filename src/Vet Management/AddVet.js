import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "../components/NavBar";
import "../styles/Reporter.css";
import logo from "../assets/profile.png";
import { Link } from 'react-router-dom'
const AddVet = () => {
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

<div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 className="mx-4 px-4">Add Vet</h4>
          <div style={{paddingRight:"2rem"}}>
          <Link style={{marginRight:"0.2rem", textDecoration:"none", fontWeight:"bold"}} to="/Dashboard">
            Dashboard
          </Link>
          <span style={{fontWeight:"bold", textDecoration:"none"}}>/Add Vet</span>
          </div>
        </div>


                    <div className="case-lists mx-auto" >
                        <h4 className="heading1">Vet Details:</h4>
                        <div style={{ padding: "1rem" }}>
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label for="inputEmail4" style={{ fontWeight: "bold" }} className="form-label">Vet Name:</label>
                                    <input type="text" className="form-control" placeholder="Name" aria-label="Name" required />
                                </div>
                               
                                <div className="col-md-6">
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">Registration ID:</label>
                                    <input type="Number" className="form-control" id="inputPassword4" placeholder="Phone No" />
                                </div>
                                
                                <div className="col-md-6 mb-3" style={{display:"flex", flexDirection:"column"}}>
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">Vet Certification -</label>
                                    <input type="file" className="custom-file-input" id="fileInput" />
                                </div>
                                <div className="col-md-6 mb-3" style={{display:"flex", flexDirection:"column"}}>
                                    <label for="inputPassword4" style={{ fontWeight: "bold" }} className="form-label">Verification ID -</label>
                                    <input type="file" className="custom-file-input" id="fileInput" />
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

export default AddVet;

