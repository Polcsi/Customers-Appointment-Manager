import React, { useState, useEffect, useCallback } from "react";
import times from "../assets/times.svg";
import { MdDone, MdOutlineKeyboardArrowRight } from "react-icons/md";
import InputModal from "./InputModal";
import Spinner from "./Spinner";
// Redux Elements
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/administrators/adminSlice";

const RegisterAdminModal = ({ openModal, setOpenModal }) => {
  /* Redux Things */
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.admin
  );

  const close = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal, setOpenModal]);

  /* Submit Data */
  const registerAdmin = () => {
    dispatch(register(adminData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Administrator Created");
      close();
    }
    dispatch(reset());
  }, [isError, close, isLoading, isSuccess, message, dispatch]);

  /* React */
  const [adminData, setAdminData] = useState({
    username: "",
    fullname: "",
    password: "",
    privilege: "",
  });
  const [placeholders, setPlacehoders] = useState({
    fullname: "No Name",
    username: "No Username",
    privilege: "Not Selected",
    password: "•••••••••••",
  });
  const [openFullname, setOpenFullName] = useState(false);
  const [openUsername, setOpenUsername] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openPrivilege, setOpenPrivilege] = useState(false);

  const handleChange = (name, value) => {
    setAdminData({ ...adminData, [name]: value });
  };
  const changePlaceholder = (name, value) => {
    if (name === "password") {
      let length = value.length;
      let swap = "";
      for (let i = 0; i < length; i++) {
        swap += "•";
      }
      value = swap;
    }
    if (value.length === 0) {
      value = "REQUIRED";
    }
    setPlacehoders({ ...placeholders, [name]: value });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="addModal">
      {openFullname ? (
        <InputModal
          type={"fullname"}
          close={setOpenFullName}
          handleChange={handleChange}
          placeholderValue={adminData.fullname}
          changePlaceholder={changePlaceholder}
        />
      ) : (
        ""
      )}
      {openUsername ? (
        <InputModal
          type={"username"}
          close={setOpenUsername}
          handleChange={handleChange}
          placeholderValue={adminData.username}
          changePlaceholder={changePlaceholder}
        />
      ) : (
        ""
      )}
      {openPassword ? (
        <InputModal
          type={"password"}
          close={setOpenPassword}
          handleChange={handleChange}
          placeholderValue={adminData.password}
          changePlaceholder={changePlaceholder}
        />
      ) : (
        ""
      )}
      {openPrivilege ? (
        <InputModal
          type={"privilege"}
          close={setOpenPrivilege}
          handleChange={handleChange}
          placeholderValue={placeholders.privilege}
          changePlaceholder={changePlaceholder}
        />
      ) : (
        ""
      )}
      <div className="modal-header">
        <button type="button">
          <img
            src={times}
            alt="times"
            onClick={() => {
              document.body.style.overflow = "auto";
              close();
            }}
          />
        </button>
        <h1>Add Administrator</h1>
        <button type="button" onClick={() => registerAdmin()}>
          <MdDone />
        </button>
      </div>
      {isLoading && <Spinner color="white" top={0} />}
      <div className="modal-inputs">
        <div className="input" onClick={() => setOpenFullName(true)}>
          <div className="title">full name</div>
          <div>
            <span>{placeholders.fullname}</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="input" onClick={() => setOpenUsername(true)}>
          <div className="title">username</div>
          <div>
            <span>{placeholders.username}</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="input" onClick={() => setOpenPrivilege(true)}>
          <div className="title">privilege</div>
          <div>
            <span>{placeholders.privilege}</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="input" onClick={() => setOpenPassword(true)}>
          <div className="title">password</div>
          <div>
            <span>{placeholders.password}</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdminModal;
