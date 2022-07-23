import React from "react";
import "../css/spinner.css";

const Spinner = ({ color, top, left = 0, position, transform = null }) => {
  if (!position) {
    position = "relative";
  }
  return (
    <div
      className={`spinner spinner-${color} spinner-${position}`}
      style={{ top: `${top}px`, left: left, transform }}
    ></div>
  );
};

export default Spinner;
