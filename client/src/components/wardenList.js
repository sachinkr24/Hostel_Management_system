import React from "react";
import { useNavigate } from "react-router-dom";

const WardenList = ({ warden }) => {
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "60px", // Adjust as needed
  };

  const cardStyle = {
    cursor: "pointer",
    width: "300px", 
    textAlign: "center", 
  };

  return (
    <div style={containerStyle}>
      <h6>Select Hostel to register complaint</h6>
      <div
        className="card m-2"
        style={cardStyle}
        onClick={() => navigate(`/warden/book-appointment/${warden._id}`)}
      >
        <div className="card-header">
          Mr/Mrs {warden.firstName} {warden.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {warden.specialization}
          </p>
          <p>
            <b>Experience</b> {warden.experience}
          </p>
          <p>
            <b>Hostel</b> {warden.fees}
          </p>
          <p>
            <b>Office Timings</b> {warden.timings[0]} - {warden.timings[1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WardenList;
