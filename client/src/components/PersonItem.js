import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import DeleteAdministrator from "./DeleteAdministrator";

const PersonItem = ({ _id, fullname, detail, privilege }) => {
  const [open, setOpen] = useState(false);

  return (
    <article>
      {open && (
        <DeleteAdministrator id={_id} fullname={fullname} privilege={privilege} open={open} setOpen={setOpen}/>
      )}
      <div className="person-header">
        <div className="img-person">
          <BsFillPersonFill />
        </div>
        <h1 className="name-person">{fullname}</h1>
        <h2 className="detail-person">{detail}</h2>
      </div>
      <div className="indicators">
        <div className="line"></div>
        <button className="edit operation">
          <FiEdit2 />
        </button>
        <button className="delete operation" onClick={() => setOpen(!open)}>
          <MdDeleteOutline />
        </button>
      </div>
    </article>
  );
};

export default PersonItem;
