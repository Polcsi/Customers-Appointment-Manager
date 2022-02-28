import React from "react";
import times from "../assets/times.svg";

const CustomerSelector = ({ setOpenCustomer, handleChange }) => {
  return (
    <div className="overlay">
      <div className="overlay-container">
        <button
          className="close-overlay"
          onClick={() => setOpenCustomer(false)}
        >
          <img src={times} alt="close" />
        </button>
        <div className="header">
          <h2>select customer</h2>
        </div>
        <div className="customer-list">
          <h3
            onClick={() => {
              handleChange("customer", "123fsd10");
              handleChange("name", "Pollák Bence");
              setOpenCustomer(false);
            }}
          >
            Pollák bence
          </h3>
          <h3
            onClick={() => {
              handleChange("customer", "10000sd10");
              setOpenCustomer(false);
              handleChange("name", "Pollák péter");
            }}
          >
            Pollák péter
          </h3>
          <h3
            onClick={() => {
              handleChange("customer", "123fsd10");
              setOpenCustomer(false);
              handleChange("name", "Pollák Bence");
            }}
          >
            Pollák bence
          </h3>
          <h3
            onClick={() => {
              handleChange("customer", "10000sd10");
              setOpenCustomer(false);
              handleChange("name", "Pollák péter");
            }}
          >
            Pollák péter
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CustomerSelector;
