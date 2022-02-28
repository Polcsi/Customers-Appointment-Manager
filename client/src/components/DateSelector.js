import React from "react";
import times from "../assets/times.svg";

const DateSelector = ({ setOpenDate, handleChange }) => {
  return (
    <div className="overlay">
      <div className="overlay-container datetime-overlay">
        <button className="close-overlay" onClick={() => setOpenDate(false)}>
          <img src={times} alt="close" />
        </button>
        <div className="header">
          <h2>select date</h2>
        </div>
        <div className="overlay-body"></div>
        <div className="overlay-footer">
          <button className="btn-overlay" onClick={() => setOpenDate(false)}>
            cancel
          </button>
          <button className="btn-overlay">save</button>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
