import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteAppointment,
  resetAppointmentDelete,
} from "../features/appointments/appointmentSlice";

const DeleteAppointment = ({ date, time, open, setOpen, id, fullname }) => {
  const dispatch = useDispatch();

  const removeAppointment = () => {
    dispatch(deleteAppointment(id));
    dispatch(resetAppointmentDelete());
    setOpen(!open);
  };

  return (
    <>
      <section className="overlay">
        <div className="overlay-container overlay-operation">
          <div className="header header-smaller">
            <h2>
              Delete <span>{fullname}</span> Appointment at
              <span>
                {" "}
                {date} - {time}
              </span>
            </h2>
          </div>
          <div className="overlay-footer">
            <button
              type="button"
              className="btn-overlay btn-blue-text"
              onClick={() => setOpen(!open)}
            >
              cancel
            </button>
            <button
              type="button"
              className="btn-overlay btn-red-text"
              onClick={() => removeAppointment()}
            >
              delete
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeleteAppointment;
