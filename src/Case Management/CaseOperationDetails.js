import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CaseOperationDetails() {
  const { case_id } = useContext(AuthContext);
  const [vetName, setVetName] = useState(null);
  const [operationDate, setOperationDate] = useState(null);
  const [operationStartTime, setOperationStartTime] = useState(null);
  const [operationEndTime, setOperationEndTime] = useState(null);
  const [operationOutcome, setOperationOutcome] = useState(null);
  const [medicalPrescriptionImage, setMedicalPrescriptionImage] =
    useState(null);
  const [medicalPrescriptionImagePreview, setMedicalPrescriptionImagePreview] =
    useState(null);
  const [treatmentRecordImage, setTreatmentRecordImage] = useState(null);
  const [treatmentRecordImagePreview, setTreatmentRecordImagePreview] =
    useState(null);
  const [organImage, setOrganImage] = useState(null);
  const [organImagePreview, setOrganImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleMedicalPrescriptionImage = (event) => {
    const file = event.target.files[0];
    setMedicalPrescriptionImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedicalPrescriptionImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setMedicalPrescriptionImagePreview("");
    }
  };

  const handleTreatmentRecordImage = (event) => {
    const file = event.target.files[0];
    setTreatmentRecordImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTreatmentRecordImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setTreatmentRecordImagePreview("");
    }
  };

  const handleOrganImage = (event) => {
    const file = event.target.files[0];
    setOrganImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrganImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setOrganImagePreview("");
    }
  };

  const handleOperationDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("medicalPrescriptionImage", medicalPrescriptionImage);
    formData.append("treatmentRecordImage", treatmentRecordImage);
    formData.append("organImage", organImage);
    formData.append("vetName", vetName ? vetName : "");
    formData.append(
      "operationDate",
      operationDate ? operationDate : "1111-11-11"
    );
    formData.append(
      "operationStartTime",
      operationStartTime ? operationStartTime : "11:11:11"
    );
    formData.append(
      "operationEndTime",
      operationEndTime ? operationEndTime : "11:11:11"
    );
    formData.append(
      "operationOutcome",
      operationOutcome ? operationOutcome : ""
    );
    formData.append("case_linked", case_id);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cases/addoperational/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Operation Details Added Successfully");
        // Handle success or display a success message.
      } else {
        console.error("Error:", response.data);
        // Handle error or display an error message.
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error or display an error message.
    }
  };

  const handleSaveExit = (e) => {
    handleOperationDetails(e);
    navigate("/Dashboard");
  };

  const handleSaveNext = (e) => {
    handleOperationDetails(e);
  };

  return (
    <div className="my-3">
      <h2>Operation Details :</h2>
      <div className="row">
        <div className="col">
          <div className="form-group mb-3">
            <label htmlFor="vetName" className="form-label">
              Vet Name
            </label>
            <input
              type="text"
              className="form-control"
              id="vetName"
              aria-describedby="vetNameHelp"
              name="vetName"
              placeholder="Vet Name"
              onChange={(e) => setVetName(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="operationDate">
              Operation Date
            </label>
            <input
              className="form-control"
              id="operationDate"
              name="operationDate"
              type="date"
              onChange={(e) => setOperationDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <div className="row">
            <div className="form-group col">
              <label className="form-label" htmlFor="operationStartTime">
                Operation Start Time
              </label>
              <input
                className="form-control"
                id="operationStartTime"
                name="operationStartTime"
                type="time"
                onChange={(e) => setOperationStartTime(e.target.value)}
              />
            </div>
            <div className="form-group col">
              <label className="form-label" htmlFor="operationEndTime">
                Operation End Time
              </label>
              <input
                className="form-control"
                id="operationEndTime"
                name="operationEndTime"
                type="time"
                onChange={(e) => setOperationEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col mb-3">
          <label htmlFor="operationOutcome" className="form-label">
            Operation Outcome
          </label>
          <select
            id="operationOutcome"
            className="form-select"
            aria-label="Operation Outcome"
            name="operationOutcome"
            onChange={(e) => setOperationOutcome(e.target.value)}
          >
            <option value="">Choose Outcome</option>
            <option value="Success">Success</option>
            <option value="Failure">Failure</option>
            <option value="Complicated">Complicated</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="form-label" htmlFor="medicalPrescriptionImage">
              Medication Prescription -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="medicalPrescriptionImage"
                accept="image/*"
                name="medicalPrescriptionImage"
                onChange={handleMedicalPrescriptionImage}
              />
            </div>
          </div>
          {medicalPrescriptionImagePreview && (
            <div>
              <h6>Preview:</h6>
              <img
                src={medicalPrescriptionImagePreview}
                alt="Feeding Record Preview"
                height="100px"
              />
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="form-label" htmlFor="treatmentRecordImage">
              Treatment Records -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="treatmentRecordImage"
                accept="image/*"
                name="treatmentRecordImage"
                onChange={handleTreatmentRecordImage}
              />
            </div>
          </div>
          {treatmentRecordImagePreview && (
            <div>
              <h6>Preview:</h6>
              <img
                src={treatmentRecordImagePreview}
                alt="Treatment Records Preview"
                height="100px"
              />
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="form-label" htmlFor="organImage">
              Organ Pictures -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="organImage"
                accept="image/*"
                name="organImage"
                onChange={handleOrganImage}
              />
            </div>
          </div>
          {organImagePreview && (
            <div>
              <h6>Preview:</h6>
              <img
                src={organImagePreview}
                alt="Organ Pictures Preview"
                height="100px"
              />
            </div>
          )}
        </div>
      </div>

      <div className="my-1">
        <button type="button" className="btn btn-primary">
          Previous
        </button>
        <button type="button" className="btn btn-primary mx-2">
          Exit
        </button>
        <button
          type="submit"
          className="btn btn-primary float-end mx-1"
          onClick={handleSaveNext}
        >
          Save & Next
        </button>
        <button
          type="submit"
          className="btn btn-primary float-end mx-1"
          onClick={handleSaveExit}
        >
          Save & Exit
        </button>
      </div>
    </div>
  );
}
