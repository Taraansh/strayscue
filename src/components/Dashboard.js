import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import AddModal from "../utils/AddModal";
import "../styles/Cases.css";

const Dashboard = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [modalShow, setModalShow] = React.useState(false);

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
            paddingTop: "3rem",
            width: "100vw",
          }}
        >
          <hr />
          <h4 style={{ marginLeft: "10px" }}>Dashboard</h4>
          <div className="cases">
            <div className="case-card">
              <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>1</h3>
              <p>Total Cases</p>
            </div>

            <div className="case-card">
              <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>1</h3>
              <p>Reported</p>
            </div>

            <div className="case-card">
              <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>0</h3>
              <p>Admitted</p>
            </div>

            <div className="case-card">
              <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>0</h3>
              <p>Released</p>
            </div>
          </div>

          <div className="case-lists mx-auto">
            <h4 style={{ marginLeft: "1rem" }}>Case Lists</h4>
            <hr />

            <div className="menu1">
              <Link
                onClick={() => setModalShow(true)}
                style={{
                  background: "rgb(245, 145, 32)",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
                className="btn "
              >
                <i
                  style={{ fontSize: "1.3rem" }}
                  className="fa-light fa-plus"
                ></i>
                Add Case
              </Link>
              <input type="text" placeholder="Search by location, status etc" />
            </div>
          </div>
        </div>

        <AddModal show={modalShow} onHide={() => setModalShow(false)} />
      </>
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
