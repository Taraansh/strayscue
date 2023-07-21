import { React, useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CaseData() {
  const { allCases, getAllCases } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState(0);
  const navigate = useNavigate();

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

  const getCaseType = (index) => {
    switch (index) {
      case 1:
        return "Sterilization";
      case 2:
        return "OPD";
      case 3:
        return "IPD";
      case 4:
        return "Vaccination";
      default:
        return "";
    }
  };

  const filteredCases = allCases.filter((data) => {
    if (activeButton === 0) {
      return true; // Show all cases when activeButton is 0 (All button clicked)
    } else {
      // Show cases based on the type of case when other buttons are clicked
      return data.type_of_case === getCaseType(activeButton);
    }
  });
  
  const handleEditCaseButton = (data) => {
    navigate('/Editcase',{state:{data: data}});
  }

  const handleStatusChange = async (case_id, newStatus) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/cases/update/${case_id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status_of_case: newStatus }),
        }
      );
      if (response.ok) {
        // Status successfully updated, perform any necessary actions
        console.log("Status updated successfully!");
        window.location.reload();
         // Refresh the cases list after updating status
      } else {
        // Handle the case when the PUT request fails
        console.log("Failed to update status:", case_id);
      }
    } catch (error) {
      // Handle any errors that occur during the PUT request
      console.error("Error updating status:", error);
    }
  };

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
    <div className="container-fluid" style={{overflow:"scroll"}} >
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
          {filteredCases.map((data, index) => {

            return (
              <tr key={index}>
                <th scope="row">
                  {/* {index + 1} */}
                  <button className="btn btn-primary" onClick={()=>{handleEditCaseButton(data)}}>Edit Case</button>
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
                <td><select
                id="status_of_case"
                className="form-select my-1"
                aria-label="Status of case"
                name="status_of_case"
                defaultValue={data.status_of_case}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  handleStatusChange(data.case_id, newStatus);
                }}
              >
                <option value="Reported">Reported</option>
                <option value="Admitted">Admitted</option>
                <option value="Blood Test">Blood Test</option>
                <option value="Operation">Operation</option>
                <option value="Post Operation">Post Operation</option>
                <option value="Released">Released</option>
              </select>
                      </td>
                <td>{data.reportingdetail?.reporterName}</td>
                <td>{data.reportingdetail?.location}</td>
                <td>{data.reportingdetail?.landmark}</td>
                <td>{data.reportingdetail?.pincode}</td>
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
