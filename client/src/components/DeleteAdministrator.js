import React from "react";
import { useDispatch } from "react-redux";
import { deleteAdmin, reset } from "../features/administrators/adminSlice";

const DeleteAdministrator = ({ open, setOpen, id, privilege, fullname }) => {
  const dispatch = useDispatch();

  const removeAdmin = () => {
    dispatch(deleteAdmin(id));
    dispatch(reset());
    setOpen(!open);
  };

  return (
    <>
      <section className="overlay">
        <div className="overlay-container overlay-operation">
          <div className="header header-smaller">
            <h2>
              Delete {privilege}
              <span> {fullname}</span>
            </h2>
          </div>
          <div className="overlay-footer">
            <button
              type="button"
              className="btn-overlay btn-blue-text"
              onClick={() => setOpen(!open)}
            >
              cancel
            </button>
            <button
              type="button"
              className="btn-overlay btn-red-text"
              onClick={() => removeAdmin()}
            >
              delete
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeleteAdministrator;
