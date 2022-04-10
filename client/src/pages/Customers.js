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
        <PersonItem id="1" fullname="Pollák Bence" detail="+36 30 793 8220" />
        <PersonItem id="2" fullname="Pollák Bence" detail="+36 30 793 8220" />
        <PersonItem id="3" fullname="Pollák Bence" detail="+36 30 793 8220" />
        <PersonItem id="4" fullname="Pollák Bence" detail="+36 30 793 8220" />
      </div>
    </div>
  );
};

export default Customers;
