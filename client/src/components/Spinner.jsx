import React from "react";
import "../css/spinner.css";

const Spinner = ({ color, top }) => {
  return (
    <div
      className={`spinner spinner-${color}`}
      style={{ top: `${top}px` }}
    ></div>
  );
};

export default Spinner;
