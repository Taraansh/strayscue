import { React, useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";

function CaseData() {
  const { allCases, getAllCases } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState(0);

  const buttonStyle = {
    border: "1px solid black",
    fontSize: "16px",
    width: "100%",
    fontWeight: "bold",
    /* padding: 0px 0px 0px 26px; */
    borderRadius: "2px",
  };

  const handleClick = (index) => {
    setActiveButton(index);
  };

  useEffect(() => {
    getAllCases();
  }, [getAllCases]);

  return (
    <div className="container-fluid">
      <div
        className="btn-group my-2 mb-4"
        style={{ width: "100%" }}
        role="group"
        aria-label="Basic outlined example"
      >
        <button
          style={buttonStyle}
          type="button"
          className={`btn btn-outline-secondary ${
            activeButton === 0 ? "active" : ""
          }`}
          onClick={() => handleClick(0)}
        >
          All
        </button>
        <button
          style={buttonStyle}
          type="button"
          className={`btn btn-outline-secondary ${
            activeButton === 1 ? "active" : ""
          }`}
          onClick={() => handleClick(1)}
        >
          Sterilization
        </button>
        <button
          style={buttonStyle}
          type="button"
          className={`btn btn-outline-secondary ${
            activeButton === 2 ? "active" : ""
          }`}
          onClick={() => handleClick(2)}
        >
          OPD
        </button>
        <button
          style={buttonStyle}
          type="button"
          className={`btn btn-outline-secondary ${
            activeButton === 3 ? "active" : ""
          }`}
          onClick={() => handleClick(3)}
        >
          IPD
        </button>
        <button
          style={buttonStyle}
          type="button"
          className={`btn btn-outline-secondary ${
            activeButton === 4 ? "active" : ""
          }`}
          onClick={() => handleClick(4)}
        >
          Vaccination
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ACTION</th>
            <th scope="col">STATUS</th>
            <th scope="col">REPORTER NAME</th>
            <th scope="col">LOCATION</th>
            <th scope="col">LANDMARK</th>
            <th scope="col">PINCODE</th>
            <th scope="col">CREATED BY</th>
          </tr>
        </thead>
        <tbody>
          {allCases.map((data, index) => {
            // Preprocess the user_profile data to fix the JSON format

            const handleCaseDeleteButton = async (case_id) => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete this order?"
              );
              if (confirmDelete) {
                try {
                  // Delete the specific order by making an API call
                  const response = await fetch(
                    `http://127.0.0.1:8000/cases/delete/${case_id}/`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (response.ok) {
                    // Order successfully deleted, perform any necessary actions (e.g., refresh the order list)
                    getAllCases(); // Refresh the order list after deletion
                  } else {
                    // Handle the case when the delete request fails
                    console.log("Failed to delete order:", case_id);
                  }
                } catch (error) {
                  // Handle any errors that occur during the delete operation
                  console.error("Error deleting order:", error);
                }
              }
            };

            return (
              <tr key={index}>
                <th scope="row">
                  {/* {index + 1} */}
                  <button className="btn btn-primary">Edit Case</button>
                  <div
                    className="btn btn-primary mx-1"
                    onClick={() => {
                      handleCaseDeleteButton(data.case_id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </div>
                </th>
                <td>{data.status_of_case}</td>
                <td>{data.reportingdetail_set[0]?.reporterName}</td>
                <td>{data.reportingdetail_set[0]?.location}</td>
                <td>{data.reportingdetail_set[0]?.landmark}</td>
                <td>{data.reportingdetail_set[0]?.pincode}</td>
                <td>{data.user_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CaseData;
