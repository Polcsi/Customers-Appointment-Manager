import React, { useState, useEffect, useRef } from "react";
import { formatDate, padTo2Digits } from "../utils";
// components
import Spinner from "./Spinner";
import Calendar from "./Calendar";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getAppointments,
  getAllAppointments,
  reset,
  resetAppointments,
  setQueryObject,
  resetAll,
} from "../features/appointments/appointmentSlice";
// icons
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import AppointmentItem from "./AppointmentItem";

const CalendarView = () => {
  const dispatch = useDispatch();
  const {
    appointments,
    allAppointments,
    isLoading,
    isLoadingAll,
    isSuccessAll,
    isErrorAll,
  } = useSelector((state) => state.appointment);
  // refs
  const currentMonthRef = useRef(null);
  const currentFullDateRef = useRef(null);

  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  // states
  const [activeDay, setActiveDay] = useState(null);
  const [date, setDate] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [options, setOptions] = useState({
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function jumpCurrent() {
    setDate(new Date());
  }

  useEffect(() => {
    const currentMonth = date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
    });

    const currentDate = today.toLocaleDateString("en-us", options);

    currentMonthRef.current.textContent = `${currentMonth}`;
    currentFullDateRef.current.textContent = `${currentDate}`;
  }, [date, today, options]);

  useEffect(() => {
    dispatch(
      getAllAppointments({
        date: `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}`,
      })
    );

    return (_) => {
      dispatch(resetAll());
    };
  }, [date, dispatch]);

  useEffect(() => {
    try {
      const selectedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        activeDay.textContent
      );
      dispatch(setQueryObject({ date: formatDate(selectedDate) }));
      dispatch(getAppointments({ date: formatDate(selectedDate) }));
    } catch {}

    return (_) => {
      dispatch(resetAppointments());
      dispatch(reset());
      dispatch(setQueryObject({}));
    };
  }, [activeDay, dispatch, date]);

  if (isSuccessAll) {
    return (
      <>
        <div className="calendar-container">
          <div className="calendar">
            <div className="calendar-month">
              <div className="date">
                <p ref={currentFullDateRef} onClick={() => jumpCurrent()}></p>
                <h1 ref={currentMonthRef}>Unknown</h1>
              </div>
              <div className="action-btns">
                <button className="prev" type="button" ref={prevBtnRef}>
                  <RiArrowUpSLine />
                </button>
                <button className="next" type="button" ref={nextBtnRef}>
                  <RiArrowDownSLine />
                </button>
              </div>
            </div>
            <div className="weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <Calendar
              allAppointments={allAppointments}
              setActiveDay={setActiveDay}
              date={date}
              setDate={setDate}
              prevBtnRef={prevBtnRef}
              nextBtnRef={nextBtnRef}
              options={options}
              today={today}
            />
          </div>
        </div>
        <div className="calendar-appointments">
          {isLoading && <Spinner color="white" top={0} position="relative" />}
          {appointments.map((appointment) => {
            return (
              <AppointmentItem
                key={appointment._id}
                showDate={false}
                {...appointment}
              />
            );
          })}
          {appointments.length === 0 && !isLoading ? (
            <p className="no-event">no events</p>
          ) : (
            ""
          )}
        </div>
      </>
    );
  } else if (isLoadingAll || !isSuccessAll) {
    return (
      <>
        <div className="calendar-container">
          <div className="calendar">
            <div className="calendar-month">
              <div className="date">
                <p ref={currentFullDateRef}></p>
                <h1 ref={currentMonthRef}>Unknown</h1>
              </div>
              <div className="action-btns">
                <button className="prev" type="button" ref={prevBtnRef}>
                  <RiArrowUpSLine />
                </button>
                <button className="next" type="button" ref={nextBtnRef}>
                  <RiArrowDownSLine />
                </button>
              </div>
            </div>
            <div className="weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <Spinner
              color="white"
              top={20}
              left={"50%"}
              position="relative"
              transform={"translate(-50%, -50%)"}
            />
          </div>
        </div>
      </>
    );
  } else if (isErrorAll) {
    return (
      <>
        <div className="calendar-container">
          <div className="calendar">
            <div className="calendar-month">
              <div className="date">
                <p ref={currentFullDateRef}></p>
                <h1 ref={currentMonthRef}>Unknown</h1>
              </div>
              <div className="action-btns">
                <button className="prev" type="button" ref={prevBtnRef}>
                  <RiArrowUpSLine />
                </button>
                <button className="next" type="button" ref={nextBtnRef}>
                  <RiArrowDownSLine />
                </button>
              </div>
            </div>
            <div className="weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <p>Couldn't load the calendar!</p>
          </div>
        </div>
      </>
    );
  }
};

export default CalendarView;
