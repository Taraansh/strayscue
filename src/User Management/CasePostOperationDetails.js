import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CasePostOperationDetails() {
  const { case_id } = useContext(AuthContext);
  const [popComment, setPopComment] = useState(null);
  const [popFacility, setPopFacility] = useState(null);
  const [popExpectedDays, setPopExpectedDays] = useState(null);
  const [popStartDate, setPopStartDate] = useState(null);
  const [popEndDate, setPopEndDate] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [euthanized, setEuthanized] = useState(null);
  const [comments, setComments] = useState(null);
  const [popPictures, setPopPictures] = useState(null);
  const [popPicturesPreview, setPopPicturesPreview] = useState(null);
  const [releasePictures, setReleasePictures] = useState(null);
  const [releasePicturesPreview, setReleasePicturesPreview] = useState(null);
  const navigate = useNavigate();

  const handlePopPictures = (event) => {
    const file = event.target.files[0];
    setPopPictures(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPopPicturesPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPopPicturesPreview("");
    }
  };

  const handleReleasePictures = (event) => {
    const file = event.target.files[0];
    setReleasePictures(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReleasePicturesPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setReleasePicturesPreview("");
    }
  };

  const handlePostOperationDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("popPictures", popPictures);
    formData.append("releasePictures", releasePictures);
    formData.append("popComment", popComment ? popComment : "");
    formData.append("popFacility", popFacility ? popFacility : "");
    formData.append("popExpectedDays", popExpectedDays ? popExpectedDays : "");
    formData.append("popStartDate", popStartDate ? popStartDate : "1111-11-11");
    formData.append("popEndDate", popEndDate ? popEndDate : "1111-11-11");
    formData.append("releaseDate", releaseDate ? releaseDate : "1111-11-11");
    formData.append("euthanized", euthanized ? euthanized : "");
    formData.append("comments", comments ? comments : "");
    formData.append("case_linked", case_id);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/cases/addpostop/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Post Operation Details Added Successfully");
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
    handlePostOperationDetails(e);
    navigate("/Dashboard");
  };

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
              onChange={(e) => setPopComment(e.target.value)}
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
              onChange={(e) => setPopFacility(e.target.value)}
            >
              <option value="">Choose Facility</option>
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
              onChange={(e) => setPopExpectedDays(e.target.value)}
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
            type="date"
            onChange={(e) => setPopStartDate(e.target.value)}
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
            type="date"
            onChange={(e) => setPopEndDate(e.target.value)}
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
            type="date"
            onChange={(e) => setReleaseDate(e.target.value)}
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
              onChange={(e) => setEuthanized(e.target.value)}
            >
              <option value="">Choose</option>
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
              onChange={(e) => setComments(e.target.value)}
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
                onChange={handlePopPictures}
              />
            </div>
          </div>
          {popPicturesPreview && (
            <div>
              <h6>Preview:</h6>
              <img
                src={popPicturesPreview}
                alt="Post Operation Pictures Preview"
                height="100px"
              />
            </div>
          )}
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
                onChange={handleReleasePictures}
              />
            </div>
          </div>
          {releasePicturesPreview && (
            <div>
              <h6>Preview:</h6>
              <img
                src={releasePicturesPreview}
                alt="Release Pictures Preview"
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
          onClick={handleSaveExit}
        >
          Save & Exit
        </button>
      </div>
    </div>
  );
}
