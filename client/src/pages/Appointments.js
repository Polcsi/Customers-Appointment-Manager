import React, { useState, useEffect, useRef } from "react";
import { checkCookieExists } from "../vaidateSession";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// Components
import AddAppointmentModal from "../components/AddAppointmentModal";
import PullToRefresh from "../components/PullToRefresh";
import CalendarView from "../components/CalendarView";
import AppointmentList from "../components/AppointmentList";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAppointments,
  resetAll,
  getAppointments,
  resetAppointmentDelete,
  resetAppointments,
} from "../features/appointments/appointmentSlice";
// Icons
import { IoIosAdd } from "react-icons/io";
import { BsCalendarWeek } from "react-icons/bs";
import { MdOutlineViewAgenda } from "react-icons/md";
// css
import "../css/calendar.css";

const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [isChangeView, setIsChangeView] = useState(true);
  const page = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isError,
    message,
    isSuccessDelete,
    isErrorDelete,
    messageDelete,
    currentDate,
  } = useSelector((state) => state.appointment);

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success("Appointment Deleted");
    }
    if (isErrorDelete) {
      toast.error(messageDelete);
    }
  }, [isSuccessDelete, isErrorDelete, messageDelete]);

  useEffect(() => {
    if (!checkCookieExists()) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }

    const validateSession = setInterval(() => {
      console.log("check Appointment Page");
      if (!checkCookieExists()) {
        navigate("/login");
        toast.error("Your Session Expired");
      }
    }, 1000);

    return (_) => {
      clearInterval(validateSession);
      dispatch(resetAppointmentDelete());
    };
  }, [navigate, dispatch, isError, message]);

  return (
    <>
      {isChangeView ? (
        <PullToRefresh
          page={page}
          queryObject={{ date: currentDate }}
          updatedArray={getAllAppointments}
          resetArray={resetAll}
        />
      ) : (
        <PullToRefresh
          page={page}
          updatedArray={getAppointments}
          resetArray={resetAppointments}
        />
      )}

      <div className="dashboard" ref={page}>
        {showModal ? (
          isChangeView ? (
            <AddAppointmentModal
              showModal={showModal}
              setShowModal={setShowModal}
              isCalendar={isChangeView}
            />
          ) : (
            <AddAppointmentModal
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )
        ) : (
          ""
        )}
        <div className="header">
          <h1>Appointments</h1>
          <div className="btns">
            <button
              type="button"
              onClick={() => setIsChangeView(!isChangeView)}
            >
              {isChangeView ? <MdOutlineViewAgenda /> : <BsCalendarWeek />}
            </button>
            <button className="add">
              <IoIosAdd onClick={() => setShowModal(!showModal)} />
            </button>
          </div>
        </div>
        <div className="underline"></div>
        <div className="appointments-container">
          {isChangeView ? <CalendarView /> : <AppointmentList />}
        </div>
      </div>
    </>
  );
};

export default Appointments;
