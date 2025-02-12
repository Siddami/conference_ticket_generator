import React from "react";

const Heading = ({ title, subtitle, icon }) => {
  return (
    <div className="heading">
      <span className="heading-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </span>
      <img src={icon} alt="progress icon" className="progress-icon" />
    </div>
  );
};

export default Heading;
