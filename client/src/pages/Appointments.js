import React, { useState } from "react";
import AppointmentItem from "../components/AppointmentItem";
import AddAppointmentModal from "../components/AddAppointmentModal";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const Appointments = () => {
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
  );
};

export default Appointments;
