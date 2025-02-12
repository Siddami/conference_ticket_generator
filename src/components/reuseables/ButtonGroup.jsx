import React from "react";

const ButtonGroup = ({ onCancel, onNext, disabled }) => {
  return (
    <div className="btn-container">
      <button className="cancel-btn btn" onClick={onCancel} disabled={disabled}>
        Cancel
      </button>
      <button className="next-btn btn" onClick={onNext} disabled={disabled}>
        Next
      </button>
    </div>
  );
};

export default ButtonGroup;
