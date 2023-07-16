import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "./NavBar";
import Home from './Home'
const Dashboard = () => {
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
      <Home/>
      <i
        className="fa-solid fa-right-from-bracket"
        style={{
          position: "absolute",
          top: "15px",
          right: "20px",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={logoutUser}
      ></i>
    </div>
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
};

export default Dashboard;
