import React, { useState } from "react";
import AppointmentItem from "../components/AppointmentItem";
import AddAppointmentModal from "../components/AddAppointmentModal";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="dashboard">
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
  );
};

export default Dashboard;
