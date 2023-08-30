import React from "react";

export default function Footer() {
  return (
    <div>
      <hr style={{ padding: "0", margin: "0" }} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "0.9rem",
          padding: "0.5rem",
          textAlign: "center",
          color: "black",
          bottom: "0px",
        }}
      >
        Copyright&copy; <span style={{ fontWeight: "bold" }}> Strayscue </span>{" "}
        2023
      </div>
    </div>
  );
}
