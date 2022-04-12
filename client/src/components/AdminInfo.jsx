import React, { useState, useEffect, useRef } from "react";
import defaultProfilePicture from "../assets/profile-default.svg";
import { useSelector, useDispatch } from "react-redux";
import { getAdmin, reset } from "../features/administrators/adminSlice";
import Spinner from "./Spinner";
import DeleteAdministrator from "./DeleteAdministrator";
import UpdateAdministrator from "./UpdateAdministrator";

const AdminInfo = ({ opened, setOpened, _id }) => {
  const { singleAdmin, isSuccess } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const overlayRef = useRef(null);
  const [askForDelete, setAskForDelete] = useState(false);
  const [askForUpdate, setAskForUpdate] = useState(false);

  const close = (e) => {
    if (e.target === overlayRef.current) {
      setOpened(!opened);
    }
  };

  useEffect(() => {
    dispatch(getAdmin(_id));
    return (_) => {
      dispatch(reset());
    };
  }, [dispatch, _id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return (_) => {
      document.body.style.overflow = "auto";
    };
  }, []);
  if (isSuccess) {
    const { fullname, username, privilege, createdAt, updatedAt } =
      singleAdmin.admin;

    return (
      <>
        <div className="overlay" onClick={(e) => close(e)}>
          {askForUpdate && (
            <UpdateAdministrator
              {...singleAdmin.admin}
              openModal={askForUpdate}
              setOpenModal={setAskForUpdate}
              openedOverlay={opened}
              setOpenedOverlay={setOpened}
            />
          )}
          {askForDelete && (
            <DeleteAdministrator
              id={_id}
              fullname={fullname}
              privilege={privilege}
              open={askForDelete}
              setOpen={setAskForDelete}
            />
          )}
          <div ref={overlayRef} className="admin-profile-container">
            <div className="container">
              <div className="admin-details">
                <div className="top-border-item"></div>
                <div className="profile-image">
                  <img src={defaultProfilePicture} alt="user-profil" />
                </div>
                <div className="basic-information">
                  <h1>
                    {fullname} <span>#{username}</span>
                  </h1>
                  <h2>{privilege}</h2>
                  <div className="admin-information-ui-line"></div>
                </div>
                <div className="date-informations">
                  <div className="added">
                    <h3>Added</h3>
                    <p>{createdAt}</p>
                  </div>
                  <div className="last-update">
                    <h3>modified</h3>
                    <p>{updatedAt}</p>
                  </div>
                </div>
              </div>
              <div className="admin-profile-operations">
                <button
                  type="button"
                  className="admin-profile-edit-btn"
                  onClick={() => setAskForUpdate(!askForUpdate)}
                >
                  edit
                </button>
                <button
                  type="button"
                  className="admin-profile-delete-btn"
                  onClick={() => setAskForDelete(!askForDelete)}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="overlay" onClick={(e) => close(e)}>
          <Spinner color="black" top={15} />
          <div ref={overlayRef} className="admin-profile-container"></div>
        </div>
      </>
    );
  }
};

export default AdminInfo;
