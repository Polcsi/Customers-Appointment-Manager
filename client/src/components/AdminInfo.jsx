import React from "react";
import { FaTimes } from "react-icons/fa";
import { defaultProfilePicture } from "../assets/profile-default.svg";

const AdminInfo = ({ opened, setOpened }) => {
  return (
    <>
      <div className="overlay">
        <button
          className="admin-profile-close"
          type="button"
          onClick={() => setOpened(!opened)}
        >
          <FaTimes />
        </button>
        <div className="admin-profile-container"></div>
      </div>
    </>
  );
};

export default AdminInfo;
