import React, { useState, useEffect, useRef, useCallback } from "react";
import { padTo2Digits } from "../utils";
import times from "../assets/times.svg";

const TimeSelector = ({ setOpenTime, handleChange, appointment }) => {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const [fill, setFill] = useState(true);
  const [activePos, setActivePos] = useState(0);
  const [currentTime, setCurrentTime] = useState({
    hour: appointment.time.split(":")[0],
    minute: appointment.time.split(":")[1],
  });
  const hourTimer = useRef(null);
  const minuteTimer = useRef(null);

  function fillNumericContainer(length, destinationContainer) {
    destinationContainer.innerHTML += `<div></div><div></div>`;
    for (let i = 0; i < length; ++i) {
      destinationContainer.innerHTML += `<div index="${i}">${padTo2Digits(
        i
      )}</div>`;
    }
    destinationContainer.innerHTML += `<div></div><div></div>`;
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
            element.classList.add("active");
          } else {
            element.classList.remove("active");
          }
          if (element.classList.value === "active") {
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
            element.classList.add("active");
            node.scrollTop = element.getAttribute("index") * 50;
          }
        });
      }
    },
    [activePos]
  );

  const setTimeScrollbarsPosition = useCallback(() => {
    const setMinScrollPos = 50 * currentTime.minute;
    const setHourScrollPos = 50 * currentTime.hour;

    minuteRef.current.scrollTop = setMinScrollPos;
    hourRef.current.scrollTop = setHourScrollPos;
  }, [currentTime]);

  function getActive(parentNode) {
    let activeElement = null;
    Array.from(parentNode.childNodes).forEach((element) => {
      if (element.classList.value === "active") {
        activeElement = element;
      }
    });
    return activeElement;
  }

  const saveTime = () => {
    const hour = getActive(hourRef.current).textContent;
    const minute = getActive(minuteRef.current).textContent;

    handleChange("time", `${padTo2Digits(hour)}:${padTo2Digits(minute)}`);
    setOpenTime(false);
  };

  const hourScrollEventListener = useCallback(() => {
    clearTimeout(hourTimer.current);

    hourTimer.current = setTimeout(function () {
      calculateActive(hourRef.current);
    }, 100);
  }, [calculateActive]);
  const minuteScrollEventListener = useCallback(() => {
    clearTimeout(minuteTimer.current);

    minuteTimer.current = setTimeout(function () {
      calculateActive(minuteRef.current);
    }, 100);
  }, [calculateActive]);

  useEffect(() => {
    const hourContainer = hourRef.current;
    const minuteContainer = minuteRef.current;
    setActivePos(
      Math.round(minuteContainer.getBoundingClientRect().top) + 2 * 50 - 1
    );
    if (fill) {
      setFill(false);
      fillNumericContainer(24, hourContainer);
      fillNumericContainer(60, minuteContainer);
    }
    calculateActive(hourContainer);
    calculateActive(minuteContainer);
    setTimeScrollbarsPosition();

    hourContainer.addEventListener("scroll", hourScrollEventListener);
    minuteContainer.addEventListener("scroll", minuteScrollEventListener);

    return (_) => {
      hourContainer.removeEventListener("scroll", hourScrollEventListener);
      minuteContainer.removeEventListener("scroll", minuteScrollEventListener);
    };
  }, [
    fill,
    appointment.time,
    calculateActive,
    setTimeScrollbarsPosition,
    hourScrollEventListener,
    minuteScrollEventListener,
  ]);

  return (
    <div className="overlay">
      <div className="overlay-container datetime-overlay time-selector-overlay">
        <button className="close-overlay" onClick={() => setOpenTime(false)}>
          <img src={times} alt="close" />
        </button>
        <div className="header">
          <h2>select time</h2>
        </div>
        <div className="overlay-body">
          <div className="inner-box">
            <div className="fade-hour fade-top fade"></div>
            <div className="fade-hour fade-bottom fade"></div>
            <div className="hour-container scroll" ref={hourRef}></div>
            <div className="minute-container scroll" ref={minuteRef}></div>
            <div className="fade-minute fade-top fade"></div>
            <div className="fade-minute fade-bottom fade"></div>
            <div className="divider">:</div>
          </div>
        </div>
        <div className="overlay-footer">
          <button className="btn-overlay" onClick={() => setOpenTime(false)}>
            cancel
          </button>
          <button className="btn-overlay" onClick={() => saveTime()}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
