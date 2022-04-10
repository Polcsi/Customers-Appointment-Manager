import React, { useState, useEffect } from "react";
import RegisterAdminModal from "../components/RegisterAdminModal";
import PersonItem from "../components/PersonItem";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
// Redux Elements
import { useSelector, useDispatch } from "react-redux";
import { getAdmins, reset } from "../features/administrators/adminSlice";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const Administrators = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admins, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );
  const { admin } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!admin) {
      navigate("/login");
    }
    dispatch(getAdmins());
    return () => {
      dispatch(reset());
    };
  }, [admin, navigate, isError, message, dispatch]);

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
        {isLoading && <Spinner />}

        {admins.map((admin) => {
          const { _id, fullname, privilege } = admin;
          return (
            <PersonItem key={_id} fullname={fullname} detail={privilege} />
          );
        })}
      </div>
    </div>
  );
};

export default Administrators;
