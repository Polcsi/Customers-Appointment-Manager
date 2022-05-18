import React, { useState, useEffect, useRef } from "react";
import { checkCookieExists } from "../vaidateSession";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// Components
import Spinner from "../components/Spinner";
import AppointmentItem from "../components/AppointmentItem";
import AddAppointmentModal from "../components/AddAppointmentModal";
import PullToRefresh from "../components/PullToRefresh";
import CalendarView from "../components/CalendarView";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getAppointments,
  reset,
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
  const [isChangeView, setIsChangeView] = useState(false);
  const page = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.auth);
  const {
    appointments,
    isError,
    isSuccess,
    isLoading,
    message,
    isSuccessDelete,
    isErrorDelete,
    messageDelete,
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

    dispatch(getAppointments());

    const validateSession = setInterval(() => {
      console.log("check Appointment Page");
      if (!checkCookieExists()) {
        navigate("/login");
        toast.error("Your Session Expired");
      }
    }, 1000);

    return (_) => {
      clearInterval(validateSession);
      dispatch(resetAppointments());
      dispatch(reset());
      dispatch(resetAppointmentDelete());
    };
  }, [navigate, dispatch, isError, message]);

  if (isSuccess) {
    return (
      <>
        <PullToRefresh
          page={page}
          updatedArray={getAppointments}
          resetArray={resetAppointments}
        />
        <div className="dashboard" ref={page}>
          {showModal ? (
            <AddAppointmentModal
              showModal={showModal}
              setShowModal={setShowModal}
            />
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
            {isLoading && <Spinner color="white" top={0} position="relative" />}
            {isChangeView ? (
              <CalendarView />
            ) : (
              <div className="today day-section">
                {appointments.map((appointment) => {
                  return (
                    <AppointmentItem
                      key={appointment._id}
                      showDate={true}
                      {...appointment}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <PullToRefresh page={page} />
        <div className="dashboard" ref={page}>
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
                <IoIosAdd />
              </button>
            </div>
          </div>
          <div className="underline"></div>
          <div className="appointments-container">
            {isLoading && <Spinner color="white" top={0} position="relative" />}
          </div>
        </div>
      </>
    );
  }
};

export default Appointments;
