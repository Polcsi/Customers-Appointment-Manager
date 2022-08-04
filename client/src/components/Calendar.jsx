import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDate } from "../features/appointments/appointmentSlice";
import { padTo2Digits } from "../utils";
import { useGlobalContext } from "../context";

const Calendar = ({ allAppointments, prevBtnRef, nextBtnRef }) => {
  const { date, today, setDate, setActiveDay, daysContainerRef } =
    useGlobalContext();
  const [eventDays, setEventDays] = useState(
    allAppointments.map((appointment) => {
      return parseInt(appointment.date.split("-")[2]);
    })
  );

  const dispatch = useDispatch();

  const stepNextMonth = useCallback(() => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  }, [setDate, date]);

  const stepPreviousMonth = useCallback(() => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  }, [setDate, date]);

  const addListenerNext = useCallback(() => {
    nextBtnRef.current.addEventListener("click", stepNextMonth, false);
  }, [stepNextMonth, nextBtnRef]);

  const removeListenerNext = useCallback(() => {
    if (nextBtnRef.current)
      nextBtnRef.current.removeEventListener("click", stepNextMonth, false);
  }, [stepNextMonth, nextBtnRef]);

  const addListenerPrev = useCallback(() => {
    prevBtnRef.current.addEventListener("click", stepPreviousMonth, false);
  }, [stepPreviousMonth, prevBtnRef]);

  const removeListenerPrev = useCallback(() => {
    if (prevBtnRef.current)
      prevBtnRef.current.removeEventListener("click", stepPreviousMonth, false);
  }, [stepPreviousMonth, prevBtnRef]);

  const selectStep = useCallback(
    (e) => {
      e.target.classList.forEach((classes) => {
        if (classes === "next-date") stepNextMonth();
        if (classes === "prev-date") stepPreviousMonth();
      });
    },
    [stepNextMonth, stepPreviousMonth]
  );

  const addSelect = useCallback(
    (e) => {
      setActiveDay((prev) => {
        if (prev !== null) {
          prev.classList.remove("selected");
        }
        e.target.classList.add("selected");
        return e.target;
      });
    },
    [setActiveDay]
  );

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

  const removeSelectedDiv = useCallback(
    (e) => {
      e.target.classList.forEach((classes) => {
        if (classes === "selected") {
          e.target.classList.remove("selected");
          setActiveDay(null);
        }
      });
    },
    [setActiveDay]
  );

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
    setEventDays((current) => {
      return [];
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
      if (selectedItem) {
        return selectedItem;
      } else {
        for (let i = 0; i < 7; ++i) {
          if (daysContainerRef.current.childNodes[i].textContent === "1") {
            daysContainerRef.current.childNodes[i].classList.add("selected");
            return daysContainerRef.current.childNodes[i];
          }
        }
      }
    });
    renderDayListeners();
    addDoubleClickToRemoveSelectedDiv();
    addListenerPrev();
    addListenerNext();
    addSelectedDay();

    //console.log("render calendar ");

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
    setActiveDay,
    dispatch,
    date,
  ]);

  return (
    <>
      <div className="days" ref={daysContainerRef}></div>
    </>
  );
};

export default Calendar;
