import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDate } from "../features/appointments/appointmentSlice";
import { padTo2Digits } from "../utils";

const Calendar = ({
  allAppointments,
  setActiveDay,
  date,
  setDate,
  prevBtnRef,
  nextBtnRef,
  options,
  today,
}) => {
  // states
  const [eventDays, setEventDays] = useState([]);
  // refs
  const daysContainerRef = useRef(null);

  const dispatch = useDispatch();

  const stepNextMonth = useCallback(() => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  }, [date]);

  const stepPreviousMonth = useCallback(() => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  }, [date]);

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

  const removeSelectedDiv = useCallback((e) => {
    e.target.classList.forEach((classes) => {
      if (classes === "selected") {
        e.target.classList.remove("selected");
        setActiveDay(null);
      }
    });
  }, []);

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

  const firstWeekDayInMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getLastDayIndex = (month, year) => {
    return new Date(year, month, 0).getDay();
  };

  const renderCalendar = useCallback(async () => {
    let days = "";

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
        date.getFullYear() === today.getFullYear() &&
        eventDays.includes(i)
      ) {
        days += `<div class="calendar-today event selected">${i}</div>`;
      } else if (
        i === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        days += `<div class="calendar-today selected">${i}</div>`;
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
  }, [date, today, eventDays]);

  useEffect(() => {
    dispatch(
      setCurrentDate(
        `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}`
      )
    );
    setEventDays((prev) => {
      return [];
    });
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
    renderDayListeners,
    addDoubleClickToRemoveSelectedDiv,
    addListenerNext,
    addListenerPrev,
    addSelectedDay,
    removeDayListeners,
    removeDoubleClickToRemoveSelectedDiv,
    removeListenerNext,
    removeListenerPrev,
    removeSelectedDay,
  ]);

  return (
    <>
      <div className="days" ref={daysContainerRef}></div>
    </>
  );
};

export default Calendar;
