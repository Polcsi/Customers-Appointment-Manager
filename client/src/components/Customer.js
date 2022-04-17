import React, { useState, useRef } from "react";
// icons
import { BsFillPersonFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
// components
import DeleteCustomer from "./DeleteCustomer";

const Customer = ({ fullname, phone, _id }) => {
  const deleteBtnRef = useRef(null);
  const editBtnRef = useRef(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const openCustomerInfo = (e) => {
    if (
      e.target !== editBtnRef.current &&
      e.target !== editBtnRef.current.childNodes[0] &&
      e.target !== editBtnRef.current.childNodes[0].childNodes[0] &&
      e.target !== deleteBtnRef.current &&
      e.target !== deleteBtnRef.current.childNodes[0] &&
      e.target !== deleteBtnRef.current.childNodes[0].childNodes[0] &&
      e.target !== deleteBtnRef.current.childNodes[0].childNodes[1]
    ) {
      console.log("open customer info");
    }
  };

  return (
    <>
      {openDeleteModal && (
        <DeleteCustomer
          open={openCustomerInfo}
          setOpen={setOpenDeleteModal}
          fullname={fullname}
          id={_id}
        />
      )}
      <article onClick={(e) => openCustomerInfo(e)}>
        <div className="person-header">
          <div className="img-person">
            <BsFillPersonFill />
          </div>
          <h1 className="name-person">{fullname}</h1>
          <h2 className="detail-person">{phone}</h2>
        </div>
        <div className="indicators">
          <div className="line"></div>
          <button
            type="button"
            ref={editBtnRef}
            className="edit operation"
            /* onClick={() => setOpenedUpdateModal(!openedUpdateModal)} */
          >
            <FiEdit2 />
          </button>
          <button
            type="button"
            ref={deleteBtnRef}
            className="delete operation"
            onClick={() => setOpenDeleteModal(!openDeleteModal)}
          >
            <MdDeleteOutline />
          </button>
        </div>
      </article>
    </>
  );
};

export default Customer;
