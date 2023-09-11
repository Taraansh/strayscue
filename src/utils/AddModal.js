import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import AuthContext from "../context/AuthContext";

export default function AddModal(props) {
  const { addNewCase } = useContext(AuthContext);

  const handleNextClick = (e) => {
    e.preventDefault();

    const typeOfCase = e.target.elements.type_of_case.value;
    const statusOfCase = e.target.elements.status_of_case.value;
    const mortalityOfCase = e.target.elements.mortality_of_case.value;

    addNewCase(typeOfCase, statusOfCase, mortalityOfCase);
  };

  return (
    <Modal
      style={{ zIndex: "999999999999999999999999" }}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={handleNextClick}>
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
                required
              >
                <option value="">Choose</option>
                <option value="Sterilization">Sterilization</option>
                <option value="OPD">OPD</option>
                <option value="IPD">IPD</option>
                <option value="Vaccination">Vaccination</option>
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
                <option value="Reported">Reported</option>
                <option value="Admitted">Admitted</option>
                <option value="Blood Test">Blood Test</option>
                <option value="Operation">Operation</option>
                <option value="Post Operation">Post Operation</option>
                <option value="Released">Released</option>
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
                <option value="Healthy">Healthy</option>
                <option value="Unhealthy">Unhealthy</option>
                <option value="Fatal">Fatal</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="btn"
            style={{
              background: "rgb(245, 145, 32)",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            Next
          </Button>
          <Button className="btn btn-light" onClick={props.onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
