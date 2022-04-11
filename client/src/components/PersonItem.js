import React, { useState, useRef } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import DeleteAdministrator from "./DeleteAdministrator";
import AdminInfo from "./AdminInfo";

const PersonItem = ({ admin, detail }) => {
  const { _id, fullname, privilege } = admin;
  const deleteBtnRef = useRef(null);
  const editBtnRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openedAdminInfo, setOpenedAdminInfo] = useState(false);

  const openAdminInfo = (e) => {
    if (
      e.target !== editBtnRef.current &&
      e.target !== editBtnRef.current.childNodes[0] &&
      e.target !== editBtnRef.current.childNodes[0].childNodes[0] &&
      e.target !== deleteBtnRef.current &&
      e.target !== deleteBtnRef.current.childNodes[0] &&
      e.target !== deleteBtnRef.current.childNodes[0].childNodes[0] &&
      e.target !== deleteBtnRef.current.childNodes[0].childNodes[1]
    ) {
      setOpenedAdminInfo(!openedAdminInfo);
    }
  };

  return (
    <>
      {openedAdminInfo && (
        <AdminInfo
          opened={openedAdminInfo}
          setOpened={setOpenedAdminInfo}
          {...admin}
        />
      )}
      {open && (
        <DeleteAdministrator
          id={_id}
          fullname={fullname}
          privilege={privilege}
          open={open}
          setOpen={setOpen}
        />
      )}
      <article onClick={(e) => openAdminInfo(e)}>
        <div className="person-header">
          <div className="img-person">
            <BsFillPersonFill />
          </div>
          <h1 className="name-person">{fullname}</h1>
          <h2 className="detail-person">{detail}</h2>
        </div>
        <div className="indicators">
          <div className="line"></div>
          <button ref={editBtnRef} className="edit operation">
            <FiEdit2 />
          </button>
          <button
            ref={deleteBtnRef}
            className="delete operation"
            onClick={() => setOpen(!open)}
          >
            <MdDeleteOutline />
          </button>
        </div>
      </article>
    </>
  );
};

export default PersonItem;
