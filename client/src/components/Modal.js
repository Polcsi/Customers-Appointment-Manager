import React from "react";
import times from "../assets/times.svg";

const Modal = ({ Component }) => {
  return (
    <section className="overlay">
      <div className="overlay-container">
        <button className="close-overlay">
          <img src={times} alt="close" />
        </button>
        <Component />
      </div>
    </section>
  );
};

export default Modal;
