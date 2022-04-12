import React, { useState, useEffect } from "react";
import RegisterAdminModal from "../components/RegisterAdminModal";
import Admin from "../components/Admin";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// Redux Elements
import { useSelector, useDispatch } from "react-redux";
import { getAdmins, reset } from "../features/administrators/adminSlice";
// Icons
import { IoIosAdd } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

const Administrators = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admins, singleAdmin, isLoadingGetAll, isError, message } =
    useSelector((state) => state.admin);
  const { admin } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
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
        {isLoadingGetAll && singleAdmin === null ? (
          <Spinner color="white" top={0} />
        ) : (
          ""
        )}

        {admins.map((admin) => {
          const { _id, fullname, privilege } = admin;
          return (
            <Admin
              key={_id}
              fullname={fullname}
              detail={privilege}
              admin={admin}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Administrators;
