import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentItem from "../components/AppointmentItem";
import AddAppointmentModal from "../components/AddAppointmentModal";
import PullToRefresh from "../components/PullToRefresh";
import { checkCookieExists } from "../vaidateSession";
// Redux
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const page = useRef(null);

  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!checkCookieExists()) {
      navigate("/login");
    }

    const validateSession = setInterval(() => {
      console.log("check Dashboard Page");
      if (!checkCookieExists()) {
        navigate("/login");
        toast.error("Your Session Expired");
      }
    }, 1000);

    return (_) => {
      clearInterval(validateSession);
    };
  }, [navigate]);

  return (
    <>
      <PullToRefresh page={page} />
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
          <h1>Up Comming</h1>
          <div className="btns">
            <button className="filter">
              <FiFilter />
            </button>
            <button className="add">
              <IoIosAdd onClick={() => setShowModal(!showModal)} />
            </button>
          </div>
        </div>
        <div className="underline"></div>
        <div className="appointments-container">
          <div className="today day-section">
            <h2>today</h2>
            <AppointmentItem showDate={false} />
            <AppointmentItem showDate={false} />
            <AppointmentItem showDate={false} />
          </div>
          <div className="tomorrow day-section">
            <h2>tomorrow</h2>
            <AppointmentItem showDate={false} />
            <AppointmentItem showDate={false} />
          </div>
          <div className="dat-after-tomorrow day-section">
            <h2>day after tomorrow</h2>
            <AppointmentItem showDate={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
