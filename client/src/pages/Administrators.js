import React, { useState } from "react";
import RegisterAdminModal from "../components/RegisterAdminModal";
import PersonItem from "../components/PersonItem";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const Administrators = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="dashboard">
      {openModal ? (
        <RegisterAdminModal openModal={openModal} setOpenModal={setOpenModal} />
      ) : (
        ""
      )}
      <div className="header">
        <h1>Administrators</h1>
        <div className="btns">
          <button className="filter">
            <FiFilter />
          </button>
          <button className="add" onClick={() => setOpenModal(!openModal)}>
            <IoIosAdd />
          </button>
        </div>
      </div>
      <div className="underline"></div>
      <div className="appointments-container">
        <PersonItem id="1" fullname="Pollák Bence" detail="admin" />
      </div>
    </div>
  );
};

export default Administrators;
