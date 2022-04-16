import React, { useState, useRef } from "react";
// icons
import { BsFillPersonFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
// components

const Customer = ({ fullname, phone, _id }) => {
  return (
    <>
      <article>
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
            /* ref={editBtnRef} */
            className="edit operation"
            /* onClick={() => setOpenedUpdateModal(!openedUpdateModal)} */
          >
            <FiEdit2 />
          </button>
          <button
            type="button"
            /* ref={deleteBtnRef} */
            className="delete operation"
            /* onClick={() => setOpen(!open)} */
          >
            <MdDeleteOutline />
          </button>
        </div>
      </article>
    </>
  );
};

export default Customer;
