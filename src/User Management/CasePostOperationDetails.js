import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function CasePostOperationDetails() {
  const { date } = useContext(AuthContext);

  return (
    <div className="my-3">

      <h2>Post Operation Details :</h2>

      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="popComment" className="form-label">
              Post-Operation Comments
            </label>
            <input
              type="text"
              className="form-control"
              id="popComment"
              aria-describedby="popCommentHelp"
              name="popComment"
              placeholder="Comments"
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="popFacility" className="form-label">
              Post-Operation facility
            </label>
            <select
              id="popFacility"
              className="form-select"
              aria-label="Post-Operation facility"
              name="popFacility"
            >
              {/* <option value="ChooseBreed">Choose Breed</option>*/}
              <option value="In Shelter">In Shelter</option>
              <option value="Not in shelter">Not in shelter</option>
              <option value="On Street">On Street</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="popExpectedDays" className="form-label">
              Post-Operation Expected Days
            </label>
            <input
              type="text"
              className="form-control"
              id="popExpectedDays"
              aria-describedby="popExpectedDaysHelp"
              name="popExpectedDays"
              placeholder="Expected Days"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <label className="form-label" htmlFor="popStartDate">
            Post-Operation Start Date
          </label>
          <input
            className="form-control"
            id="popStartDate"
            name="popStartDate"
            value={date}
            type="date"
          />
        </div>
        <div className="col mb-3">
          <label className="form-label" htmlFor="popEndDate">
            Post-Operation End Date
          </label>
          <input
            className="form-control"
            id="popEndDate"
            name="popEndDate"
            value={date}
            type="date"
          />
        </div>
        <div className="col mb-3">
          <label className="form-label" htmlFor="releaseDate">
            Release Date
          </label>
          <input
            className="form-control"
            id="releaseDate"
            name="releaseDate"
            value={date}
            type="date"
          />
        </div>
      </div>

      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
      </div>

      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="euthanized" className="form-label">
              Euthanized
            </label>
            <select
              id="euthanized"
              className="form-select"
              aria-label="Euthanized"
              name="euthanized"
            >
              {/* <option value="ChooseBreed">Choose Breed</option>*/}
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Other Comments
            </label>
            <input
              type="text"
              className="form-control"
              id="comments"
              aria-describedby="commentsHelp"
              name="comments"
              placeholder="Other Comments"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="form-label" htmlFor="popPictures">
              Post-Operation Pictures -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="popPictures"
                accept="image/*"
                name="popPictures"
                //   onChange={(event) => setFrontImageFile(event.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group mb-2">
            <label className="form-label" htmlFor="releasePictures">
              Release Pictures -
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="btn custom-file-input"
                id="releasePictures"
                accept="image/*"
                name="releasePictures"
                //   onChange={(event) => setFrontImageFile(event.target.files[0])}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-1">
        <button type="button" className="btn btn-primary">
          Previous
        </button>
        <button type="button" className="btn btn-primary mx-2">
          Exit
        </button>
        <button type="submit" className="btn btn-primary float-end mx-1">
          Save & Exit
        </button>
      </div>
    </div>
  );
}
