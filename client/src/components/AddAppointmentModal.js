import React, { useState, useRef } from "react";
import CustomerSelector from "./CustomerSelector";
// Icons
import { MdDone, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GrTextAlignFull } from "react-icons/gr";
import times from "../assets/times.svg";

const AddAppointmentModal = ({ showModal, setShowModal }) => {
  const [appointment, setAppointment] = useState({
    customer: "",
    name: "Not Selected",
    date: "",
    time: "",
    sendReminder: true,
    description: "",
  });
  const [reminderValue, setReminderValue] = useState(true);
  const [openCustomer, setOpenCustomer] = useState(false);
  const desc = useRef(null);

  const handleChange = (name, value) => {
    setAppointment({ ...appointment, [name]: value });
  };

  return (
    <div className="addAppointment">
      {openCustomer ? (
        <CustomerSelector
          setOpenCustomer={setOpenCustomer}
          handleChange={handleChange}
        />
      ) : (
        ""
      )}
      <div className="modal-header">
        <button>
          <img
            src={times}
            alt="times"
            onClick={() => setShowModal(!showModal)}
          />
        </button>
        <h1>Add Appointment</h1>
        <button>
          <MdDone />
        </button>
      </div>
      <div className="modal-inputs">
        <div className="input" onClick={() => setOpenCustomer(!openCustomer)}>
          <div className="title">Customer</div>
          <div>
            <span>{appointment.name}</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="input">
          <div className="title">Date</div>
          <div>
            <span>February 12</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="input">
          <div className="title">Time</div>
          <div>
            <span>10:00</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div
          className="input"
          onClick={() => {
            setReminderValue(!reminderValue);
          }}
        >
          <div className="title">SendReminder</div>
          <input
            checked={reminderValue}
            onChange={() => console.log("change")}
            type="checkbox"
            className="switch"
          />
        </div>
        <div
          className="input input-desc"
          onClick={() => {
            desc.current.focus();
          }}
        >
          <GrTextAlignFull />
          <input
            ref={desc}
            className="desc"
            type="text"
            placeholder="Description"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
