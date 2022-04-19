import React, { useState, useEffect, useCallback } from "react";
import times from "../assets/times.svg";
import { MdDone, MdOutlineKeyboardArrowRight } from "react-icons/md";
import InputModal from "./InputModal";
import Spinner from "./Spinner";
// Redux Elements
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { update, getAdmin, reset } from "../features/administrators/adminSlice";

const UpdateAdministrator = ({
  openModal,
  setOpenModal,
  openedOverlay = null,
  setOpenedOverlay = null,
  _id,
  fullname,
  username,
  privilege,
}) => {
  /* React */

  const [adminData, setAdminData] = useState({
    username: username,
    fullname: fullname,
    password: "",
    privilege: privilege,
    id: _id,
  });
  const [placeholders, setPlacehoders] = useState({
    username: username,
    fullname: fullname,
    password: "•••••••••••",
    privilege: privilege,
  });
  const [openFullname, setOpenFullName] = useState(false);
  const [openUsername, setOpenUsername] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openPrivilege, setOpenPrivilege] = useState(false);

  const handleChange = (name, value) => {
    setAdminData({ ...adminData, [name]: value });
  };

  const changePlaceholder = useCallback(
    (name, value) => {
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
    },
    [placeholders, setPlacehoders]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  /* Redux Things */

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, isSuccessUpdate, message } =
    useSelector((state) => state.admin);

  const close = useCallback(() => {
    if (openedOverlay || setOpenedOverlay) {
      setOpenedOverlay(!openedOverlay);
    }
    setOpenModal(!openModal);
  }, [openModal, setOpenModal, setOpenedOverlay, openedOverlay]);

  /* Submit Data */
  const updateAdmin = () => {
    if (adminData.password === "") {
      delete adminData.password;
    }
    dispatch(update(adminData));
  };

  useEffect(() => {
    if (isSuccessUpdate) {
      toast.success("Administrator Updated");
      close();
    }
  }, [isSuccessUpdate, dispatch, close]);

  useEffect(() => {
    dispatch(getAdmin(_id));

    return (_) => {
      dispatch(reset());
    };
  }, [_id, dispatch, isError, message]);

  if (isSuccess) {
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
            placeholderValue={adminData.privilege}
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
          <h1>Update Administrator</h1>
          <button type="button" onClick={() => updateAdmin()}>
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
  } else {
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
          <h1>Update Administrator</h1>
          <button type="button" onClick={() => updateAdmin()}>
            <MdDone />
          </button>
        </div>
        {isLoading && <Spinner color="white" top={0} />}
        <div className="modal-inputs"></div>
      </div>
    );
  }
};

export default UpdateAdministrator;
