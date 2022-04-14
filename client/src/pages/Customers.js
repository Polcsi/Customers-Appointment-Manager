import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "../components/PullToRefresh";
//Redux
import { useSelector } from "react-redux";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const Customers = () => {
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);
  const page = useRef(null);

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin, navigate]);

  return (
    <>
      <PullToRefresh page={page} />
      <div className="dashboard" ref={page}>
        <div className="header">
          <h1>Customers</h1>
          <div className="btns">
            <button className="filter">
              <FiFilter />
            </button>
            <button className="add">
              <IoIosAdd />
            </button>
          </div>
        </div>
        <div className="underline"></div>
        <div className="appointments-container"></div>
      </div>
    </>
  );
};

export default Customers;
