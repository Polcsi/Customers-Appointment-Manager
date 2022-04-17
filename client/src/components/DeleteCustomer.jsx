import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteCustomer,
  resetDelete,
} from "../features/customers/customerSlice";

const DeleteCustomer = ({ open, setOpen, fullname, id }) => {
  const dispatch = useDispatch();

  const removeCustomer = () => {
    dispatch(deleteCustomer(id));
    dispatch(resetDelete());
    close();
  };

  const close = () => {
    setOpen(!open);
  };

  return (
    <>
      <section className="overlay">
        <div className="overlay-container overlay-operation">
          <div className="header header-smaller">
            <h2>
              Delete
              <span> {fullname}</span>
            </h2>
          </div>
          <div className="overlay-footer">
            <button
              type="button"
              className="btn-overlay btn-blue-text"
              onClick={() => close()}
            >
              cancel
            </button>
            <button
              type="button"
              className="btn-overlay btn-red-text"
              onClick={() => removeCustomer()}
            >
              delete
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeleteCustomer;
