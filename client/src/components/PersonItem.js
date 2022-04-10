import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const PersonItem = ({ id, fullname, detail }) => {
  return (
    <article>
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
        <button className="delete operation">
          <MdDeleteOutline />
        </button>
      </div>
    </article>
  );
};

export default PersonItem;
