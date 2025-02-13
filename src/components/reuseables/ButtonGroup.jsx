import React from "react";

const ButtonGroup = ({ onCancel, onNext, disabled, btnOneText, btnTwoText }) => {
  return (
    <div className="btn-container">
      <button className="cancel-btn btn" onClick={onCancel} disabled={disabled}>
        {btnOneText}
      </button>
      <button className="next-btn btn" onClick={onNext} disabled={disabled}>
         {btnTwoText}
      </button>
    </div>
  );
};

export default ButtonGroup;
