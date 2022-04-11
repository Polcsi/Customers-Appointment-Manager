import React from "react";

const DeleteAdministrator = ({ open, setOpen, id, fullname }) => {
  return (
    <>
      <section className="overlay">
        <div className="overlay-container overlay-operation">
          <div className="header">
            <h2>Are you sure to delete {fullname}?</h2>
          </div>
          <div className="overlay-footer">
            <button
              type="button"
              className="btn-overlay"
              onClick={() => setOpen(!open)}
            >
              cancel
            </button>
            <button type="button" className="btn-overlay">
              delete
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeleteAdministrator;
