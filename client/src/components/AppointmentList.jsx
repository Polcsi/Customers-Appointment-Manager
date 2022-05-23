import React, { useEffect } from "react";
// components
import AppointmentItem from "./AppointmentItem";
import Spinner from "./Spinner";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getAppointments,
  reset,
  resetAppointments,
} from "../features/appointments/appointmentSlice";

const AppointmentList = () => {
  const dispatch = useDispatch();
  const { appointments, isLoading } = useSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(getAppointments());

    return (_) => {
      dispatch(reset());
      dispatch(resetAppointments);
    };
  }, [dispatch]);

  return (
    <div className="today day-section">
      {isLoading && <Spinner color="white" top={0} position="relative" />}
      {appointments.map((appointment) => {
        return (
          <AppointmentItem
            key={appointment._id}
            showDate={true}
            {...appointment}
          />
        );
      })}
    </div>
  );
};

export default AppointmentList;
