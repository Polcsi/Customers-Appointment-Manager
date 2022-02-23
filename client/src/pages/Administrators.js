import React from "react";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const Administrators = () => {
  return (
    <div className="dashboard">
      <div className="header">
        <h1>Administrators</h1>
        <div className="btns">
          <button className="filter">
            <FiFilter />
          </button>
          <button className="add">
            <IoIosAdd />
          </button>
        </div>
      </div>
      <div className="underline"></div>
      <div className="appointments-container"></div>
    </div>
  );
};

export default Administrators;
