import React from "react";
import times from "../assets/times.svg";

const CustomerSelector = ({ setOpenCustomer, handleChange, setName }) => {
  return (
    <div className="overlay">
      <div className="overlay-container customer-selector">
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
          <article
            onClick={() => {
              handleChange("customer", "123fsd10");
              setName("Pollák Bence");
              setOpenCustomer(false);
            }}
          >
            Pollák bence
          </article>
          <article
            onClick={() => {
              handleChange("customer", "10000sd10");
              setName("Pollák Péter");
              setOpenCustomer(false);
            }}
          >
            Pollák péter
          </article>
          <article
            onClick={() => {
              handleChange("customer", "123fsd10");
              setName("Pollák Bence");
              setOpenCustomer(false);
            }}
          >
            Pollák bence
          </article>
          <article
            onClick={() => {
              handleChange("customer", "10000sd10");
              setName("Pollák Péter");
              setOpenCustomer(false);
            }}
          >
            Pollák péter
          </article>
          <article
            onClick={() => {
              handleChange("customer", "123fsd10");
              setName("Pollák Bence");
              setOpenCustomer(false);
            }}
          >
            Pollák bence
          </article>
          <article
            onClick={() => {
              handleChange("customer", "10000sd10");
              setName("Pollák Péter");
              setOpenCustomer(false);
            }}
          >
            Pollák péter
          </article>
          <article
            onClick={() => {
              handleChange("customer", "123fsd10");
              setName("Pollák Bence");
              setOpenCustomer(false);
            }}
          >
            Pollák bence
          </article>
          <article
            onClick={() => {
              handleChange("customer", "10000sd10");
              setName("Pollák Péter");
              setOpenCustomer(false);
            }}
          >
            Pollák péter
          </article>
        </div>
      </div>
    </div>
  );
};

export default CustomerSelector;
