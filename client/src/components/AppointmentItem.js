import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline, MdDoneOutline } from "react-icons/md";

const AppointmentItem = ({ showDate }) => {
  return (
    <article>
      <div className="appointment-header">
        <h1 className="time">{showDate ? "04.12. - 10:00" : "10:00"}</h1>
        <h2 className="customer">Pollák Bence</h2>
      </div>
      <div className="indicators">
        <div className="emailSent true">
          <MdDoneOutline />
        </div>
        <div className="line"></div>
        <button className="edit operation">
          <FiEdit2 />
        </button>
        <button className="delete operation">
          <MdDeleteOutline />
        </button>
      </div>
    </article>
  );
};

export default AppointmentItem;
