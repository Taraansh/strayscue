import { React, useState } from "react";

function CaseData() {
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
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@fat</td>
            <td>@fat</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CaseData;
