import React, { useState, useRef } from "react";
import CustomerSelector from "./CustomerSelector";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import { monthsArr } from "../data";
// Icons
import { MdDone, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GrTextAlignFull } from "react-icons/gr";
import times from "../assets/times.svg";

const AddAppointmentModal = ({ showModal, setShowModal }) => {
  const today = new Date();
  const [appointment, setAppointment] = useState({
    customer: "",
    date: `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`,
    time: `${today.getHours()}:${today.getMinutes()}`,
    sendReminder: true,
    description: "",
  });
  const [reminderValue, setReminderValue] = useState(true);
  const [name, setName] = useState("Not Selected");
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const desc = useRef(null);

  const handleChange = (name, value) => {
    setAppointment({ ...appointment, [name]: value });
  };

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="addAppointment">
      {openCustomer ? (
        <CustomerSelector
          setOpenCustomer={setOpenCustomer}
          handleChange={handleChange}
          setName={setName}
        />
      ) : (
        ""
      )}
      {openDate ? (
        <DateSelector
          setOpenDate={setOpenDate}
          handleChange={handleChange}
          appointment={appointment}
          today={today}
        />
      ) : (
        ""
      )}
      {openTime ? (
        <TimeSelector
          setOpenTime={setOpenTime}
          handleChange={handleChange}
          appointment={appointment}
        />
      ) : (
        ""
      )}
      <div className="modal-header">
        <button>
          <img
            src={times}
            alt="times"
            onClick={() => {
              document.body.style.overflow = "auto";
              setShowModal(!showModal);
            }}
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
            <span>{name}</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="input" onClick={() => setOpenDate(!openDate)}>
          <div className="title">Date</div>
          <div>
            <span>
              {`${appointment.date.split("-")[0]} ${
                monthsArr[parseInt(appointment.date.split("-")[1]) - 1]
              } ${appointment.date.split("-")[2]}`}
            </span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="input" onClick={() => setOpenTime(!openTime)}>
          <div className="title">Time</div>
          <div>
            <span>{appointment.time}</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div
          className="input"
          onClick={() => {
            setReminderValue(!reminderValue);
            handleChange("sendReminder", `${!reminderValue}`);
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
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
