import React from "react";
import PersonItem from "../components/PersonItem";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const Customers = () => {
  return (
    <div className="dashboard">
      <div className="header">
        <h1>Customers</h1>
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
      <div className="appointments-container">
        <PersonItem />
        <PersonItem />
        <PersonItem />
      </div>
    </div>
  );
};

export default Customers;
