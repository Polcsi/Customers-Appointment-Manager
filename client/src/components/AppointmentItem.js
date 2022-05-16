import React, { useState, useEffect } from "react";
import { formatFullDate } from "../utils";
// Redux
import { useDispatch, useSelector } from "react-redux";
// components
import DeleteAppointment from "./DeleteAppointment";
// icons
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline, MdDoneOutline } from "react-icons/md";
import { FaRegTimesCircle } from "react-icons/fa";

const AppointmentItem = ({
  showDate,
  date,
  time,
  emailIsSent,
  sendReminder,
  _id,
  customer,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const dispatch = useDispatch();
  return (
    <>
      {openDeleteModal && (
        <DeleteAppointment
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          id={_id}
          date={date}
          time={time}
          fullname={customer.fullname}
        />
      )}
      <article>
        <div className="appointment-header">
          {showDate ? (
            <h1 className="time">{formatFullDate(new Date(date))}</h1>
          ) : (
            ""
          )}
          <h1 className="time">{time}</h1>
          <h2 className="customer">{customer.fullname}</h2>
        </div>
        <div className="indicators">
          {sendReminder ? (
            emailIsSent ? (
              <div className="emailSent true">
                <MdDoneOutline />
              </div>
            ) : (
              <div className="emailSent false">
                <FaRegTimesCircle />
              </div>
            )
          ) : (
            ""
          )}
          <div className="line"></div>
          <button className="edit operation">
            <FiEdit2 />
          </button>
          <button
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

export default AppointmentItem;
