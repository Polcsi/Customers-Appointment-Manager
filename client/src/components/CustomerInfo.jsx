import React, { useState, useEffect, useRef } from "react";
import defaultProfilePicture from "../assets/profile-default.svg";
// components
import Spinner from "./Spinner";
import DeleteCustomer from "./DeleteCustomer";
// icons
import { RiSmartphoneLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleCustomer,
  resetGet,
} from "../features/customers/customerSlice";
import { toast } from "react-toastify";

const CustomerInfo = ({ open, setOpen, id }) => {
  const [askForDelete, setAskForDelete] = useState(false);
  const overlayRef = useRef(null);
  const { singleCustomer, isLoadingGet, isErrorGet, isSuccessGet, messageGet } =
    useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const close = (e) => {
    if (e.target === overlayRef.current) {
      setOpen(!open);
    }
  };

  useEffect(() => {
    if (isErrorGet) {
      toast.error(messageGet);
    }
    dispatch(getSingleCustomer(id));
    return (_) => {
      dispatch(resetGet());
    };
  }, [dispatch, id, isErrorGet, messageGet]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return (_) => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isSuccessGet) {
    return (
      <>
        <div className="overlay" onClick={(e) => close(e)}>
          <Spinner color="black" top={15} />
          <div ref={overlayRef} className="admin-profile-container"></div>
        </div>
      </>
    );
  } else {
    const { _id, fullname, email, phone, town, createdAt, updatedAt } =
      singleCustomer;
    return (
      <>
        <div className="overlay" onClick={(e) => close(e)}>
          {askForDelete && (
            <DeleteCustomer
              id={_id}
              fullname={fullname}
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
                  <h1>{fullname}</h1>
                  <h2>{town}</h2>
                  <div className="admin-information-ui-line"></div>
                </div>
                <div className="date-informations">
                  <div className="person-details">
                    <div className="info-flex">
                      <MdOutlineMail /> <span>{email}</span>
                    </div>
                    <div className="info-flex">
                      <RiSmartphoneLine /> <span>{phone}</span>
                    </div>
                    <div className="admin-information-ui-line bottom-zero"></div>
                  </div>
                  <div className="date-flex-information added">
                    <h3>Added</h3>
                    <p>{createdAt}</p>
                  </div>
                  <div className="date-flex-information last-update">
                    <h3>modified</h3>
                    <p>{updatedAt}</p>
                  </div>
                </div>
              </div>
              <div className="admin-profile-operations">
                <button type="button" className="admin-profile-edit-btn">
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
  }
};

export default CustomerInfo;
