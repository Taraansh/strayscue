import React from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AddModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Case
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ padding: "1rem" }}>
          <div>
            <label htmlFor="type_of_case" className="form-label h5">
              Type of case
            </label>
            <select
              id="type_of_case"
              className="form-select my-1"
              aria-label="Type of case"
              name="type_of_case"
            >
              <option selected>Choose</option>
              <option value="sterilization">Sterilization</option>
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
              <option value="vaccination">Vaccination</option>
            </select>
          </div>
          <div className="my-4">
            <label htmlFor="status_of_case" className="form-label h5">
              Status of case
            </label>
            <select
              id="status_of_case"
              className="form-select my-1"
              aria-label="Status of case"
              name="status_of_case"
            >
              <option value="reported">Reported</option>
              <option value="admitted">Admitted</option>
              <option value="blood_test">Blood Test</option>
              <option value="operation">Operation</option>
              <option value="post_operation">Post Operation</option>
              <option value="released">Released</option>
            </select>
          </div>
          <div>
            <label htmlFor="mortality_of_case" className="form-label h5">
              Mortality of case
            </label>
            <select
              id="mortality_of_case"
              className="form-select my-1"
              aria-label="Mortality of case"
              name="mortality_of_case"
            >
              <option value="healthy">Healthy</option>
              <option value="unhealthy">Unhealthy</option>
              <option value="fatal">Fatal</option>
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Link
          to="/Addcase"
          className="btn"
          style={{
            background: "rgb(245, 145, 32)",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Next
        </Link>
        <Button className="btn btn-light" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
