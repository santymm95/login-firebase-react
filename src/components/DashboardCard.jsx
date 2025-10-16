// DashboardCard.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardCard = ({ icon, title, description, bgColor, color, href }) => {
  return (
    <div className="dashboard-card" onClick={() => window.location.href = href}>
      <div className="card-icon" style={{ backgroundColor: bgColor, color }}>
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
