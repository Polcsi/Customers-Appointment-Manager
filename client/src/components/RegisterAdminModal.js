import React from "react";
import times from "../assets/times.svg";
import { MdDone, MdOutlineKeyboardArrowRight } from "react-icons/md";

const RegisterAdminModal = ({ openModal, setOpenModal }) => {
  return (
    <div className="addModal">
      <div className="modal-header">
        <button>
          <img
            src={times}
            alt="times"
            onClick={() => {
              document.body.style.overflow = "auto";
              setOpenModal(!openModal);
            }}
          />
        </button>
        <h1>Add Administrator</h1>
        <button>
          <MdDone />
        </button>
      </div>
      <div className="modal-inputs">
        <div className="input">
          <div className="title">full name</div>
          <div>
            <span>No Name</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="input">
          <div className="title">username</div>
          <div>
            <span>no username</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="input">
          <div className="title">privilige</div>
          <div>
            <span>not selected</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className="input">
          <div className="title">password</div>
          <div>
            <span>•••••••••••</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdminModal;
