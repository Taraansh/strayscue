import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CaseMedicalDetails() {
  const { case_id } = useContext(AuthContext);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [vaccinationStatus, setVaccinationStatus] = useState(null);
  const [dewormed, setDewormed] = useState(null);
  const [fitForSurgery, setFitForSurgery] = useState(null);
  const [otherDetails, setOtherDetails] = useState(null);
  const [admissionDate, setAdmissionDate] = useState(null);
  const [feedingRecordImage, setFeedingRecordImage] = useState(null);
  const [feedingRecordImagePreview, setFeedingRecordImagePreview] =
    useState("");
  const [bloodReportImage, setBloodReportImage] = useState(null);
  const [bloodReportImagePreview, setBloodReportImagePreview] = useState("");
  const navigate = useNavigate();

  const handleFeedingRecordImage = (event) => {
    const file = event.target.files[0];
    setFeedingRecordImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeedingRecordImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFeedingRecordImagePreview("");
    }
  };

  const handleBloodReportImage = (event) => {
    const file = event.target.files[0];
    setBloodReportImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBloodReportImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBloodReportImagePreview("");
    }
  };

  const handleMedicalDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bloodReportImage", bloodReportImage);
    formData.append("feedingRecordImage", feedingRecordImage);
    formData.append("medicalHistory", medicalHistory ? medicalHistory : "");
    formData.append(
      "vaccinationStatus",
      vaccinationStatus ? vaccinationStatus : ""
    );
    formData.append("dewormed", dewormed ? dewormed : "");
    formData.append("fitForSurgery", fitForSurgery ? fitForSurgery : "");
    formData.append("otherDetails", otherDetails ? otherDetails : "");
    formData.append(
      "admissionDate",
      admissionDate ? admissionDate : "1111-11-11"
    );
    formData.append("case_linked", case_id);

    console.log(formData.get("medicalHistory"));
    console.log(formData.get("vaccinationStatus"));
    console.log(formData.get("dewormed"));
    console.log(formData.get("fitForSurgery"));
    console.log(formData.get("otherDetails"));
    console.log(formData.get("admissionDate"));
    console.log(formData.get("case_linked"));

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cases/addmedical/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Medical Details Added Successfully");
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
    handleMedicalDetails(e);
    navigate("/Dashboard");
  };

  const handleSaveNext = (e) => {
    handleMedicalDetails(e);
  };

  return (
    <div className="my-3">
      <h2>Medical Details:</h2>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="medicalHistory" className="form-label">
              Medical History / Other Issues
            </label>
            <input
              type="text"
              className="form-control"
              id="medicalHistory"
              aria-describedby="medicalHistoryHelp"
              name="medicalHistory"
              placeholder="Medical History / Other Issues"
              onChange={(e) => setMedicalHistory(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="vaccinationStatus" className="form-label">
              Animal Vaccinated
            </label>
            <select
              id="vaccinationStatus"
              className="form-select"
              aria-label="Animal Vaccinated"
              name="vaccinationStatus"
              onChange={(e) => setVaccinationStatus(e.target.value)}
            >
              <option value="">Choose Vaccination Status</option>
              <option value="Already Done">Already Done</option>
              <option value="To be done in NGO">To be done in NGO</option>
              <option value="Not Done">Not Done</option>
              <option value="Unsure">Unsure</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="dewormed" className="form-label">
              Animal Dewormed
            </label>
            <select
              id="dewormed"
              className="form-select"
              aria-label="Animal Dewormed"
              name="dewormed"
              onChange={(e) => setDewormed(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="Already Done">Already Done</option>
              <option value="To be done in NGO">To be done in NGO</option>
              <option value="Not Done">Not Done</option>
              <option value="Unsure">Unsure</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="fitForSurgery" className="form-label">
              Animal Fit for Surgery
            </label>
            <select
              id="fitForSurgery"
              className="form-select"
              aria-label="Animal Fit for Surgery"
              name="fitForSurgery"
              onChange={(e) => setFitForSurgery(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Unsure">Unsure</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="otherDetails" className="form-label">
              Other Details
            </label>
            <input
              type="text"
              className="form-control"
              id="otherDetails"
              aria-describedby="otherDetailsHelp"
              name="otherDetails"
              placeholder="Other Details"
              onChange={(e) => setOtherDetails(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label className="form-label" htmlFor="admissionDate">
              Admission Date
            </label>
            <input
              className="form-control"
              id="admissionDate"
              name="admissionDate"
              type="date"
              onChange={(e) => setAdmissionDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="bloodReportImage">
              Blood Report Pictures -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="bloodReportImage"
                accept="image/*"
                name="bloodReportImage"
                onChange={handleBloodReportImage}
              />
            </div>
          </div>
          {bloodReportImagePreview && (
            <div>
              <h6>Preview:</h6>
              <img
                src={bloodReportImagePreview}
                alt="Blood Report Preview"
                height="100px"
              />
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="feedingRecordImage">
              Feeding Record Pictures -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="feedingRecordImage"
                accept="image/*"
                name="feedingRecordImage"
                onChange={handleFeedingRecordImage}
              />
            </div>
          </div>
          {feedingRecordImagePreview && (
            <div>
              <h6>Preview:</h6>
              <img
                src={feedingRecordImagePreview}
                alt="Feeding Record Preview"
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
