import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteAdmin, reset } from "../features/administrators/adminSlice";

const DeleteAdministrator = ({ open, setOpen, id, privilege, fullname }) => {
  const dispatch = useDispatch();

  const removeAdmin = () => {
    dispatch(deleteAdmin(id));
    setOpen(!open);
  };

  useEffect(() => {
    return (_) => {
      dispatch(reset());
    };
  });

  return (
    <>
      <section className="overlay">
        <div className="overlay-container overlay-operation">
          <div className="header header-smaller">
            <h2>
              Delete {privilege} {fullname}
            </h2>
          </div>
          <div className="overlay-footer">
            <button
              type="button"
              className="btn-overlay"
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
