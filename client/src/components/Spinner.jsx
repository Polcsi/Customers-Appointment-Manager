import React from "react";
import "../css/spinner.css";

const Spinner = ({ color, top, position }) => {
  if (!position) {
    position = "relative";
  }
  return (
    <div
      className={`spinner spinner-${color} spinner-${position}`}
      style={{ top: `${top}px` }}
    ></div>
  );
};

export default Spinner;
