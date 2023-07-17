import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CaseAnimalDetails() {
  const { case_id } = useContext(AuthContext);
  const navigate = useNavigate();
  const [animalSpecies, setAnimalSpecies] = useState(null);
  const [animalBreed, setAnimalBreed] = useState(null);
  const [animalAge, setAnimalAge] = useState(null);
  const [animalTemperament, setAnimalTemperament] = useState(null);
  const [animalGender, setAnimalGender] = useState(null);
  const [animalPregnant, setAnimalPregnant] = useState(null);
  const [animalMarking, setAnimalMarking] = useState(null);
  const [animalColor, setAnimalColor] = useState(null);
  const [animalCatchable, setAnimalCatchable] = useState(null);
  const [animalWeight, setAnimalWeight] = useState(null);
  const [admissionReason, setAdmissionReason] = useState(null);
  const [animalPictures, setAnimalPictures] = useState(null);
  const [animalPicturesPreview, setAnimalPicturesPreview] = useState("");

  const handleAnimalPictursChange = (event) => {
    const file = event.target.files[0];
    setAnimalPictures(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAnimalPicturesPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAnimalPicturesPreview("");
    }
  };

  const handleAnimalDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("animalSpecies", animalSpecies ? animalSpecies : "");
    formData.append("animalBreed", animalBreed ? animalBreed : "");
    formData.append("animalAge", animalAge ? animalAge : "");
    formData.append("animalTemperament",animalTemperament ? animalTemperament : "");
    formData.append("animalGender", animalGender ? animalGender : "");
    formData.append("animalPregnant", animalPregnant ? animalPregnant : "");
    formData.append("animalMarking", animalMarking ? animalMarking : "");
    formData.append("animalColor", animalColor ? animalColor : "");
    formData.append("animalCatchable", animalCatchable ? animalCatchable : "");
    formData.append("animalWeight", animalWeight ? animalWeight : "");
    formData.append("admissionReason", admissionReason ? admissionReason : "");
    formData.append("animalPictures", animalPictures ? animalPictures : "");
    formData.append("case_linked", case_id);

    console.log(formData.get("animalSpecies"));
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cases/addanimal/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Animal Details Added Successfully");
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
    handleAnimalDetails(e);
    navigate("/Dashboard");
  };

  const handleSaveNext = (e) => {
    handleAnimalDetails(e);
  };

  return (
    <div>
      <div className="my-3">
        <h2>Further Animal Details :</h2>
        <h5>Animal ID:</h5>
        <form>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="animalSpecies" className="form-label">
                  Animal Species
                </label>
                <select
                  id="animalSpecies"
                  className="form-select"
                  aria-label="Animal Species"
                  name="animalSpecies"
                  onChange={(e) => {
                    setAnimalSpecies(e.target.value);
                  }}
                >
                  <option value="">Choose Species</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="animalBreed" className="form-label">
                  Animal Breed
                </label>
                <select
                  id="animalBreed"
                  className="form-select"
                  aria-label="Animal Breed"
                  name="animalBreed"
                  onChange={(e) => {
                    setAnimalBreed(e.target.value);
                  }}
                >
                  <option value="">Choose Breed</option>
                  <option value="Indie">Indie</option>
                  <option value="Pet">Pet</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="animalAge" className="form-label">
                  Animal Age
                </label>
                <select
                  id="animalAge"
                  className="form-select"
                  aria-label="Animal Age"
                  name="animalAge"
                  onChange={(e) => {
                    setAnimalAge(e.target.value);
                  }}
                >
                  <option value="">Age</option>
                  <option value="0-1">0-1 Yrs</option>
                  <option value="1-5">1-5 Yrs</option>
                  <option value="5-10">5-10 Yrs</option>
                  <option value="10+">10+ Yrs</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="animalTemperament" className="form-label">
                  Animal Temperament
                </label>
                <select
                  id="animalTemperament"
                  className="form-select"
                  aria-label="Animal Temperament"
                  name="animalTemperament"
                  onChange={(e) => {
                    setAnimalTemperament(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  <option value="Friendly">Friendly</option>
                  <option value="Aggressive">Aggressive</option>
                  <option value="Scared">Scared</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="animalGender" className="form-label">
                  Animal Gender
                </label>
                <select
                  id="animalGender"
                  className="form-select"
                  aria-label="Animal Gender"
                  name="animalGender"
                  onChange={(e) => {
                    setAnimalGender(e.target.value);
                  }}
                >
                  <option value="">Choose Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="animalPregnant" className="form-label">
                  Animal Pregnant
                </label>
                <select
                  id="animalPregnant"
                  className="form-select"
                  aria-label="Animal Pregnant"
                  name="animalPregnant"
                  onChange={(e) => {
                    setAnimalPregnant(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Not Sure">Not Sure</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group col mb-3">
              <label htmlFor="animalMarking" className="form-label">
                Animal Marking
              </label>
              <input
                type="text"
                className="form-control"
                id="animalMarking"
                aria-describedby="animalMarkingHelp"
                name="animalMarking"
                placeholder="Animal Marking"
                aria-label="Animal Marking"
                onChange={(e) => {
                  setAnimalMarking(e.target.value);
                }}
              />
            </div>
            <div className="form-group col mb-3">
              <label htmlFor="animalColor" className="form-label">
                Animal Color
              </label>
              <input
                type="text"
                className="form-control"
                id="animalColor"
                aria-describedby="animalColorHelp"
                name="animalColor"
                placeholder="Animal Color"
                aria-label="Animal Color"
                onChange={(e) => {
                  setAnimalColor(e.target.value);
                }}
              />
            </div>
            <div className="form-group col mb-3">
              <label htmlFor="animalCatchable" className="form-label">
                Animal Catchable
              </label>
              <select
                id="animalCatchable"
                className="form-select"
                aria-label="Animal Catchable"
                name="animalCatchable"
                onChange={(e) => {
                  setAnimalCatchable(e.target.value);
                }}
              >
                <option value="">Choose</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col mb-3">
              <label htmlFor="animalWeight" className="form-label">
                Animal Weight (kgs)
              </label>
              <input
                type="text"
                className="form-control"
                id="animalWeight"
                aria-describedby="animalWeightHelp"
                name="animalWeight"
                placeholder="Animal Weight"
                aria-label="Animal Weight (kgs)"
                onChange={(e) => {
                  setAnimalWeight(e.target.value);
                }}
              />
            </div>
            <div className="form-group col mb-3">
              <label htmlFor="admissionReason" className="form-label">
                Reason for Admission
              </label>
              <input
                type="text"
                className="form-control"
                id="admissionReason"
                aria-describedby="admissionReasonHelp"
                name="admissionReason"
                placeholder="Reason for Admission"
                aria-label="Reason for Admission"
                onChange={(e) => {
                  setAdmissionReason(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group mb-3">
              <label className="form-label h5" htmlFor="animalPictures">
                Animal Pictures -
              </label>
              <div className="custom-file">
                <input
                  type="file"
                  className="btn custom-file-input"
                  id="animalPictures"
                  name="animalPictures"
                  accept="image/*"
                  onChange={handleAnimalPictursChange}
                />
              </div>
            </div>
            {animalPicturesPreview && (
              <div>
                <h6>
                  <img
                    src={animalPicturesPreview}
                    alt="Animal Picture Preview"
                    height="100px"
                  />
                </h6>
              </div>
            )}
          </div>

          <div className="my-2">
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
        </form>
      </div>
    </div>
  );
}
