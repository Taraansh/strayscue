import React, {useState} from "react";

export default function CaseAnimalDetails() {
  const [activeButton, setActiveButton] = useState(null);
  const buttonStyle = {
    border:"1px solid black",
    fontSize:"16px",
    fontWeight:"bold",
    borderRadius:"2px"
  };
  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  return (
    <div>
      <div className="container p-4 case-lists">
      <div className="btn-group py-4 mb-2" role="group" aria-label="Basic outlined example">
          <button
          style={buttonStyle}
            type="button"
            className={`btn btn-outline-secondary ${activeButton === 0 ? "active" : ""
              }`}
            onClick={() => handleClick(0)}
          >
            Reporter Details
          </button>
          <button
          style={buttonStyle}
            type="button"
            className={`btn btn-outline-secondary ${activeButton === 1 ? "active" : ""
              }`}
            onClick={() => handleClick(1)}
          >
            Animal Details
          </button>
          <button
            style={buttonStyle}
            type="button"
            className={`btn btn-outline-secondary ${activeButton === 2 ? "active" : ""
              }`}
            onClick={() => handleClick(2)}
          >
            Medical Details
          </button>
          <button
            style={buttonStyle}
            type="button"
            className={`btn btn-outline-secondary ${activeButton === 3 ? "active" : ""
              }`}
            onClick={() => handleClick(3)}
          >
           Operation Details
          </button>
          <button
            style={buttonStyle}
            type="button"
            className={`btn btn-outline-secondary ${activeButton === 4 ? "active" : ""
              }`}
            onClick={() => handleClick(4)}
          >
           Post Operation Details
          </button>
        </div>
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
                >
                  {/* <option value="ChooseSpecies">Choose Species</option> */}
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
                >
                  {/* <option value="ChooseBreed">Choose Breed</option>*/}
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
                >
                  {/* <option value="ChooseBreed">Choose Breed</option>*/}
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
                >
                  {/* <option value="ChooseBreed">Choose Breed</option>*/}
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
                >
                  {/* <option value="ChooseBreed">Choose Breed</option>*/}
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
                >
                  {/* <option value="ChooseBreed">Choose Breed</option>*/}
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
              >
                {/* <option value="ChooseBreed">Choose Breed</option>*/}
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
                  //   onChange={(event) => setConsentFormImageFile(event.target.files[0])}
                />
              </div>
            </div>
          </div>

          <div className="my-2">
            <button type="button" className="btn btn-primary">
              Previous
            </button>
            <button type="button" className="btn btn-primary mx-2">
              Exit
            </button>
            <button type="submit" className="btn btn-primary float-end mx-1">
              Save & Next
            </button>
            <button type="submit" className="btn btn-primary float-end mx-1">
              Save & Exit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
