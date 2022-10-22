import React, { useState, useRef, useEffect, useCallback } from "react";
import times from "../assets/times.svg";
import { monthsArr, yearsArr } from "../data";
import { padTo2Digits, daysInMonth, getActive } from "../utils";

const DateSelector = ({
  setOpenDate,
  handleChange,
  appointment,
  today,
  setToday,
}) => {
  const monthRefContainer = useRef(null);
  const dayRefContainer = useRef(null);
  const yearRefContainer = useRef(null);
  const [activePos, setActivePos] = useState(0);
  const yearTimer = useRef(null);
  const monthTimer = useRef(null);
  const dayTimer = useRef(null);
  const [fill, setFill] = useState(true);
  const daysArr = useRef(
    generateDaysArray(
      parseInt(daysInMonth(today.getFullYear(), today.getMonth() + 1)) + 1
    )
  );

  const saveDate = () => {
    const year = getActive(yearRefContainer.current).textContent;
    const month = getActive(monthRefContainer.current).getAttribute("index");
    const day = getActive(dayRefContainer.current).textContent;

    setToday(new Date(year, month, day));
    handleChange(
      "date",
      `${parseInt(year)}-${padTo2Digits(parseInt(month) + 1)}-${padTo2Digits(
        day
      )}`
    );
    setOpenDate(false);
  };

  function generateDaysArray(length) {
    let resultArray = [];
    for (let i = 1; i < length; ++i) {
      resultArray = [...resultArray, padTo2Digits(i)];
    }
    return resultArray;
  }

  function fillContainer(destinationContainer, array) {
    destinationContainer.innerHTML += `<div></div><div></div>`;
    array.forEach((element, index) => {
      destinationContainer.innerHTML += `<div index="${index}">${element}</div>`;
    });
    destinationContainer.innerHTML += `<div></div><div></div>`;
  }

  const setScrollbarsPositionDate = useCallback(() => {
    let yearIndex = yearsArr.findIndex((x) => x === today.getFullYear());
    let monthIndex = monthsArr.findIndex(
      (x) => x === monthsArr[today.getMonth()]
    );
    let dayIndex = daysArr.current.findIndex(
      (x) => padTo2Digits(x) === `${today.getDate()}`
    );
    yearRefContainer.current.scrollTop = yearIndex * 50;
    monthRefContainer.current.scrollTop = monthIndex * 50;
    dayRefContainer.current.scrollTop = dayIndex * 50;
  }, [today]);

  const setDayScrollbarPosition = useCallback(() => {
    let dayIndex = daysArr.current.findIndex(
      (x) => padTo2Digits(x) === `${today.getDate()}`
    );

    dayRefContainer.current.scrollTop = dayIndex * 50;
  }, [today]);

  function clearContainer(container) {
    container.innerHTML = "";
  }

  const calculateActive = useCallback(
    (node) => {
      const divs = Array.from(node.childNodes);
      let hasActive = false;
      divs.forEach(function (element) {
        try {
          if (
            Math.round(element.getBoundingClientRect().y) === activePos ||
            Math.round(element.getBoundingClientRect().y) === activePos + 1
          ) {
            element.classList.add("active-selector");
          } else {
            element.classList.remove("active-selector");
          }
          if (element.classList.value === "active-selector") {
            hasActive = true;
          }
        } catch (err) {
          console.log(err);
        }
      });
      if (!hasActive) {
        divs.forEach(function (element) {
          let elementPos = Math.round(element.getBoundingClientRect().y);
          if (elementPos >= activePos - 25 && elementPos <= activePos + 25) {
            element.classList.add("active-selector");
            node.scrollTop = element.getAttribute("index") * 50;
          }
        });
      }
    },
    [activePos]
  );

  const yearScrollListener = useCallback(() => {
    clearTimeout(yearTimer.current);

    yearTimer.current = setTimeout(() => {
      calculateActive(yearRefContainer.current);
      try {
        daysArr.current = generateDaysArray(
          daysInMonth(
            getActive(yearRefContainer.current).textContent,
            parseInt(
              getActive(monthRefContainer.current).getAttribute("index")
            ) + 1
          ) + 1
        );
        clearContainer(dayRefContainer.current);
        fillContainer(dayRefContainer.current, daysArr.current);
        calculateActive(dayRefContainer.current);
        setDayScrollbarPosition();
      } catch {}
    }, 100);
  }, [calculateActive, setDayScrollbarPosition]);

  const monthScrollListener = useCallback(() => {
    clearTimeout(monthTimer.current);

    monthTimer.current = setTimeout(() => {
      calculateActive(monthRefContainer.current);
      try {
        daysArr.current = generateDaysArray(
          daysInMonth(
            parseInt(getActive(yearRefContainer.current).textContent),
            parseInt(
              getActive(monthRefContainer.current).getAttribute("index")
            ) + 1
          ) + 1
        );
        clearContainer(dayRefContainer.current);
        fillContainer(dayRefContainer.current, daysArr.current);
        calculateActive(dayRefContainer.current);
        setDayScrollbarPosition();
      } catch {}
    }, 100);
  }, [calculateActive, setDayScrollbarPosition]);

  const dayScrollListener = useCallback(() => {
    clearTimeout(dayTimer.current);

    dayTimer.current = setTimeout(() => {
      calculateActive(dayRefContainer.current);
    }, 100);
  }, [calculateActive]);

  useEffect(() => {
    const yearContainer = yearRefContainer.current;
    const monthContainer = monthRefContainer.current;
    const dayContainer = dayRefContainer.current;

    if (fill) {
      setFill(false);
      fillContainer(yearContainer, yearsArr);
      fillContainer(monthContainer, monthsArr);
      fillContainer(dayContainer, daysArr.current);
      setActivePos(
        Math.round(monthContainer.getBoundingClientRect().top) + 2 * 50 - 1
      );
    }
    setScrollbarsPositionDate();
    calculateActive(yearContainer);
    calculateActive(monthContainer);
    calculateActive(dayContainer);

    yearContainer.addEventListener("scroll", yearScrollListener);
    monthContainer.addEventListener("scroll", monthScrollListener);
    dayContainer.addEventListener("scroll", dayScrollListener);

    return (_) => {
      yearContainer.removeEventListener("scroll", yearScrollListener);
      monthContainer.removeEventListener("scroll", monthScrollListener);
      dayContainer.removeEventListener("scroll", dayScrollListener);
    };
  }, [
    fill,
    appointment.date,
    dayScrollListener,
    yearScrollListener,
    monthScrollListener,
    calculateActive,
    setScrollbarsPositionDate,
  ]);

  return (
    <div className="overlay">
      <div className="overlay-container datetime-overlay date-selector-overlay">
        <button className="close-overlay" onClick={() => setOpenDate(false)}>
          <img src={times} alt="close" />
        </button>
        <div className="header">
          <h2>select date</h2>
        </div>
        <div className="overlay-body">
          <div className="date-inner-box">
            <div className="fade-year fade-top fade"></div>
            <div className="fade-year fade-bottom fade"></div>
            <div className="year-container scroll" ref={yearRefContainer}></div>
            <div className="fade-month fade-top fade"></div>
            <div className="fade-month fade-bottom fade"></div>
            <div
              className="month-container scroll scroll-month"
              ref={monthRefContainer}
            ></div>
            <div className="fade-day fade-top fade"></div>
            <div className="fade-day fade-bottom fade"></div>
            <div className="day-container scroll" ref={dayRefContainer}></div>
          </div>
        </div>
        <div className="overlay-footer">
          <button className="btn-overlay" onClick={() => setOpenDate(false)}>
            cancel
          </button>
          <button className="btn-overlay" onClick={() => saveDate()}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
