import React from "react";
import "../styles/Cases.css";
import { Link } from "react-router-dom";
import AddModal from "../utils/AddModal";

function ReporterDetails() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
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
            <p>released</p>
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
  );
}

export default ReporterDetails;
