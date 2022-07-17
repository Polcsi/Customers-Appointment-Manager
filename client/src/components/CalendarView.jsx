import React, { useState, useEffect, useRef, useCallback } from "react";
import { formatDate, padTo2Digits } from "../utils";
// components
import Spinner from "./Spinner";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getAppointments,
  getAllAppointments,
  reset,
  resetAppointments,
  setQueryObject,
} from "../features/appointments/appointmentSlice";
// icons
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import AppointmentItem from "./AppointmentItem";

const CalendarView = () => {
  const dispatch = useDispatch();
  const { appointments, allAppointments, isLoading } = useSelector(
    (state) => state.appointment
  );
  // refs
  const currentMonthRef = useRef(null);
  const currentFullDateRef = useRef(null);
  const daysContainerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  // states
  const [activeDay, setActiveDay] = useState(null);
  const [date, setDate] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [eventDays, setEventDays] = useState([]);

  const [options, setOptions] = useState({
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const firstWeekDayInMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getLastDayIndex = (month, year) => {
    return new Date(year, month, 0).getDay();
  };

  const stepNextMonth = useCallback(() => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  }, [date]);

  const stepPreviousMonth = useCallback(() => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  }, [date]);

  function jumpCurrent() {
    setDate(new Date());
  }

  const selectStep = useCallback(
    (e) => {
      e.target.classList.forEach((classes) => {
        if (classes === "next-date") stepNextMonth();
        if (classes === "prev-date") stepPreviousMonth();
      });
    },
    [stepNextMonth, stepPreviousMonth]
  );

  const addSelect = useCallback((e) => {
    setActiveDay((prev) => {
      if (prev !== null) {
        prev.classList.remove("selected");
      }
      e.target.classList.add("selected");
      return e.target;
    });
  }, []);

  const removeSelectedDiv = useCallback((e) => {
    e.target.classList.forEach((classes) => {
      if (classes === "selected") {
        e.target.classList.remove("selected");
        setActiveDay(null);
      }
    });
  }, []);

  const addListenerNext = useCallback(() => {
    nextBtnRef.current.addEventListener("click", stepNextMonth, false);
  }, [stepNextMonth]);

  const removeListenerNext = useCallback(() => {
    if (nextBtnRef.current)
      nextBtnRef.current.removeEventListener("click", stepNextMonth, false);
  }, [stepNextMonth]);

  const addListenerPrev = useCallback(() => {
    prevBtnRef.current.addEventListener("click", stepPreviousMonth, false);
  }, [stepPreviousMonth]);

  const removeListenerPrev = useCallback(() => {
    if (prevBtnRef.current)
      prevBtnRef.current.removeEventListener("click", stepPreviousMonth, false);
  }, [stepPreviousMonth]);

  const renderDayListeners = useCallback(() => {
    const daysInCalendar = document.querySelectorAll(".days div");
    daysInCalendar.forEach((item) => {
      item.addEventListener("click", selectStep, false);
    });
  }, [selectStep]);

  const removeDayListeners = useCallback(() => {
    if (daysContainerRef.current) {
      daysContainerRef.current.childNodes.forEach((item) => {
        item.removeEventListener("click", selectStep, false);
      });
    }
  }, [selectStep]);

  const addSelectedDay = useCallback(() => {
    daysContainerRef.current.childNodes.forEach((item) => {
      item.addEventListener("click", addSelect, false);
    });
  }, [addSelect]);

  const removeSelectedDay = useCallback(() => {
    if (daysContainerRef.current) {
      daysContainerRef.current.childNodes.forEach((item) => {
        item.removeEventListener("click", addSelect, false);
      });
    }
  }, [addSelect]);

  const addDoubleClickToRemoveSelectedDiv = useCallback(() => {
    daysContainerRef.current.childNodes.forEach((item) => {
      item.addEventListener("dblclick", removeSelectedDiv, false);
    });
  }, [removeSelectedDiv]);

  const removeDoubleClickToRemoveSelectedDiv = useCallback(() => {
    if (daysContainerRef.current) {
      daysContainerRef.current.childNodes.forEach((item) => {
        item.removeEventListener("dblclick", removeSelectedDiv, false);
      });
    }
  }, [removeSelectedDiv]);

  const renderCalendar = useCallback(async () => {
    const currentMonth = date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
    });

    const currentDate = today.toLocaleDateString("en-us", options);

    currentMonthRef.current.textContent = `${currentMonth}`;
    currentFullDateRef.current.textContent = `${currentDate}`;

    let days = "";

    console.table(eventDays);
    for (
      let i = firstWeekDayInMonth(date.getMonth(), date.getFullYear());
      i > 0;
      --i
    ) {
      days += `<div class="prev-date">${
        daysInMonth(date.getMonth(), date.getFullYear()) - i + 1
      }</div>`;
    }
    for (
      let i = 1;
      i <= daysInMonth(date.getMonth() + 1, date.getFullYear());
      ++i
    ) {
      if (
        i === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        days += `<div class="calendar-today selected">${i}</div>`;
      } else if (
        i === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear() &&
        eventDays.includes(i)
      ) {
        days += `<div class="calendar-today event selected">${i}</div>`;
      } else if (eventDays.includes(i)) {
        days += `<div class="event">${i}</div>`;
      } else {
        days += `<div>${i}</div>`;
      }
    }
    for (
      let i = 1;
      i <= 7 - getLastDayIndex(date.getMonth() + 1, date.getFullYear()) - 1;
      ++i
    ) {
      days += `<div class="next-date">${i}</div>`;
    }

    daysContainerRef.current.innerHTML = days;
  }, [date, options, today]);

  useEffect(() => {
    dispatch(
      getAllAppointments({
        date: `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}`,
      })
    );
    allAppointments.forEach((appointment) => {
      eventDays.push(parseInt(appointment.date.split("-")[2]));
    });
    renderCalendar();
    setActiveDay((prev) => {
      let selectedItem = null;
      daysContainerRef.current.childNodes.forEach((divs) => {
        divs.classList.forEach((classes) => {
          if (classes === "selected") {
            selectedItem = divs;
          }
        });
      });
      return selectedItem;
    });
    renderDayListeners();
    addDoubleClickToRemoveSelectedDiv();
    addListenerPrev();
    addListenerNext();
    addSelectedDay();

    return (_) => {
      removeDayListeners();
      removeDoubleClickToRemoveSelectedDiv();
      removeListenerPrev();
      removeListenerNext();
      removeSelectedDay();
    };
  }, [
    addSelectedDay,
    stepNextMonth,
    stepPreviousMonth,
    renderCalendar,
    renderDayListeners,
    addDoubleClickToRemoveSelectedDiv,
    removeDayListeners,
    removeDoubleClickToRemoveSelectedDiv,
    addListenerPrev,
    addListenerNext,
    removeListenerPrev,
    removeListenerNext,
    removeSelectedDay,
    dispatch,
    date,
  ]);

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
          <div className="days" ref={daysContainerRef}></div>
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
};

export default CalendarView;
