import React from "react";
import "animate.css"; // Import the Animate.css library

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center spinner animate__animated animate__bounce animate__rotateIn animate__spin">
      <div className="spinner-border" role="status" style={{ color: "#ff5733" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
