import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkCookieExists } from "../vaidateSession";
//components
import AppointmentItem from "../components/AppointmentItem";
import AddAppointmentModal from "../components/AddAppointmentModal";
import PullToRefresh from "../components/PullToRefresh";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getToday,
  getTomorrow,
  getDayAfterTomorrow,
  resetAppointmentDelete,
} from "../features/appointments/appointmentSlice";
// Icons
import { IoIosAdd, IoIosHourglass } from "react-icons/io";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const page = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    todayAppointments,
    tomorrowAppointments,
    dayAfterTomorrowAppointments,
  } = useSelector((state) => state.appointment);

  useEffect(() => {
    if (!checkCookieExists()) {
      navigate("/login");
    }

    dispatch(getToday());
    dispatch(getTomorrow());
    dispatch(getDayAfterTomorrow());

    const validateSession = setInterval(() => {
      console.log("check Dashboard Page");
      if (!checkCookieExists()) {
        navigate("/login");
        toast.error("Your Session Expired");
      }
    }, 1000);

    return (_) => {
      clearInterval(validateSession);
      dispatch(resetAppointmentDelete());
    };
  }, [navigate, dispatch]);

  return (
    <>
      <PullToRefresh
        page={page}
        updatedArray={[getToday, getTomorrow, getDayAfterTomorrow]}
      />
      <div className="dashboard" ref={page}>
        {showModal ? (
          <AddAppointmentModal
            showModal={showModal}
            setShowModal={setShowModal}
            updatedArray={[getToday, getTomorrow, getDayAfterTomorrow]}
          />
        ) : (
          ""
        )}
        <div className="header">
          <h1>Up Comming</h1>
          <div className="btns">
            <button className="add">
              <IoIosAdd onClick={() => setShowModal(!showModal)} />
            </button>
          </div>
        </div>
        <div className="underline"></div>
        <div className="appointments-container">
          {todayAppointments.length !== 0 && (
            <div className="today day-section">
              <h2>today</h2>
              {todayAppointments.map((appointment) => {
                return (
                  <AppointmentItem
                    key={appointment._id}
                    {...appointment}
                    showDate={false}
                  />
                );
              })}
            </div>
          )}
          {tomorrowAppointments.length !== 0 && (
            <div className="tomorrow day-section">
              <h2>tomorrow</h2>
              {tomorrowAppointments.map((appointment) => {
                return (
                  <AppointmentItem
                    key={appointment._id}
                    {...appointment}
                    showDate={false}
                  />
                );
              })}
            </div>
          )}
          {dayAfterTomorrowAppointments.length !== 0 && (
            <div className="dat-after-tomorrow day-section">
              <h2>day after tomorrow</h2>
              {dayAfterTomorrowAppointments.map((appointment) => {
                return (
                  <AppointmentItem
                    key={appointment._id}
                    {...appointment}
                    showDate={false}
                  />
                );
              })}
            </div>
          )}
          {todayAppointments.length === 0 &&
          tomorrowAppointments.length === 0 &&
          dayAfterTomorrowAppointments.length === 0 ? (
            <div className="empty-upcoming">
              <IoIosHourglass />
              <p>No Upcomming Appointments</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
