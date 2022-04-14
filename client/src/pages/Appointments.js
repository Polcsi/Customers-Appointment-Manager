import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentItem from "../components/AppointmentItem";
import AddAppointmentModal from "../components/AddAppointmentModal";
import PullToRefresh from "../components/PullToRefresh";
// Redux
import { useSelector } from "react-redux";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const page = useRef(null);

  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin, navigate]);

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
          <h1>Appointments</h1>
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
            <h2>2022</h2>
            <AppointmentItem showDate={true} />
            <AppointmentItem showDate={true} />
            <AppointmentItem showDate={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
