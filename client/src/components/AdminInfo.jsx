import React, { useEffect, useRef } from "react";
import defaultProfilePicture from "../assets/profile-default.svg";

const AdminInfo = ({ opened, setOpened, fullname, username, privilege }) => {
  const overlayRef = useRef(null);

  const close = (e) => {
    if (e.target === overlayRef.current) {
      setOpened(!opened);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return (_) => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="overlay" onClick={(e) => close(e)}>
        <div ref={overlayRef} className="admin-profile-container">
          <div className="container">
            <div className="admin-details">
              <div className="top-border-item"></div>
              <div className="profile-image">
                <img src={defaultProfilePicture} alt="user-profil" />
              </div>
              <h1>
                {fullname} <span>#{username}</span>
              </h1>
              <h2>{privilege}</h2>
            </div>
            <div className="admin-profile-operations">
              <button type="button" className="admin-profile-edit-btn">
                edit
              </button>
              <button type="button" className="admin-profile-delete-btn">
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminInfo;
