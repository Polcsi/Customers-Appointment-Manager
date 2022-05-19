import React, { useState, useEffect, useRef, useCallback } from "react";
// icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CalendarView = () => {
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

  const addSelect = useCallback(
    (e) => {
      if (activeDay !== null) {
        activeDay.classList.remove("selected");
      }
      setActiveDay(e.target);
      e.target.classList.add("selected");
    },
    [activeDay]
  );
  const removeSelectedDiv = useCallback(
    (e) => {
      e.target.classList.forEach((classes) => {
        if (classes === "selected") {
          activeDay.classList.remove("selected");
          setActiveDay(null);
        }
      });
    },
    [activeDay]
  );

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
    const daysInCalendar = document.querySelectorAll(".days div");
    daysInCalendar.forEach((item) => {
      item.removeEventListener("click", selectStep, false);
    });
  }, [selectStep]);

  const addSelectedDay = useCallback(() => {
    const daysInCalendar = document.querySelectorAll(".days div");
    daysInCalendar.forEach((item) => {
      item.addEventListener("click", addSelect, false);
    });
  }, [addSelect]);

  const removeSelectedDay = useCallback(() => {
    const daysInCalendar = document.querySelectorAll(".days div");
    daysInCalendar.forEach((item) => {
      item.removeEventListener("click", addSelect, false);
    });
  }, [addSelect]);

  const addDoubleClickToRemoveSelectedDiv = useCallback(() => {
    const daysInCalendar = document.querySelectorAll(".days div");
    daysInCalendar.forEach((item) => {
      item.addEventListener("dblclick", removeSelectedDiv, false);
    });
  }, [removeSelectedDiv]);

  const removeDoubleClickToRemoveSelectedDiv = useCallback(() => {
    const daysInCalendar = document.querySelectorAll(".days div");
    daysInCalendar.forEach((item) => {
      item.removeEventListener("dblclick", removeSelectedDiv, false);
    });
  }, [removeSelectedDiv]);

  const renderCalendar = useCallback(() => {
    const currentMonth = date.toLocaleDateString("en-us", { month: "long" });
    const currentDate = today.toLocaleDateString("en-us", options);

    currentMonthRef.current.textContent = `${currentMonth}`;
    currentFullDateRef.current.textContent = `${currentDate}`;

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
      if (i === today.getDate() && date.getMonth() === today.getMonth()) {
        days += `<div class="calendar-today">${i}</div>`;
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
    renderCalendar();
    renderDayListeners();
    addSelectedDay();
    addDoubleClickToRemoveSelectedDiv();
    addListenerPrev();
    addListenerNext();

    return (_) => {
      removeDayListeners();
      removeSelectedDay();
      removeDoubleClickToRemoveSelectedDiv();
      removeListenerPrev();
      removeListenerNext();
    };
  }, [
    stepNextMonth,
    stepPreviousMonth,
    renderCalendar,
    renderDayListeners,
    addSelectedDay,
    addDoubleClickToRemoveSelectedDiv,
    removeDayListeners,
    removeSelectedDay,
    removeDoubleClickToRemoveSelectedDiv,
    addListenerPrev,
    addListenerNext,
    removeListenerPrev,
    removeListenerNext,
  ]);

  return (
    <>
      <div className="calendar-container">
        <div className="calendar">
          <div className="month">
            <button className="prev" type="button" ref={prevBtnRef}>
              <MdKeyboardArrowLeft />
            </button>

            <div className="date">
              <h1 ref={currentMonthRef}>Unknown</h1>
              <p ref={currentFullDateRef} onClick={() => jumpCurrent()}></p>
            </div>
            <button className="next" type="button" ref={nextBtnRef}>
              <MdKeyboardArrowRight />
            </button>
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
    </>
  );
};

export default CalendarView;
