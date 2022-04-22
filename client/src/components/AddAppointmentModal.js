import React, { useState, useEffect, useRef } from "react";
import { monthsArr } from "../data";
import { toast } from "react-toastify";
// Components
import CustomerSelector from "./CustomerSelector";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import Spinner from "./Spinner";
// Icons
import { MdDone, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GrTextAlignFull } from "react-icons/gr";
import times from "../assets/times.svg";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addAppointment,
  getAppointments,
  resetAdd,
  resetAppointments,
} from "../features/appointments/appointmentSlice";

const AddAppointmentModal = ({ showModal, setShowModal }) => {
  const today = new Date();
  const [appointment, setAppointment] = useState({
    date: `${today.getFullYear()}-${
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1
    }-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`,
    time: `${
      today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
    }:${
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
    }`,
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

  const dispatch = useDispatch();
  const { isErrorAdd, isLoadingAdd, isSuccessAdd, messageAdd } = useSelector(
    (state) => state.appointment
  );

  const createAppointment = () => {
    dispatch(addAppointment(appointment));
  };

  useEffect(() => {
    if (isErrorAdd) {
      toast.error(messageAdd);
    }
    if (isSuccessAdd) {
      toast.success("Appointment Added");
      setShowModal(!showModal);
    }

    return () => {
      dispatch(resetAdd());
      dispatch(resetAppointments());
      dispatch(getAppointments());
    };
  }, [dispatch, isErrorAdd, messageAdd, isSuccessAdd, setShowModal, showModal]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="addModal">
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
        <button type="button">
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
        <button type="button" onClick={() => createAppointment()}>
          <MdDone />
        </button>
      </div>
      <div className="modal-inputs">
        {isLoadingAdd && <Spinner color="white" top={0} position="relative" />}
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
            <span className="date-without-time">
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
