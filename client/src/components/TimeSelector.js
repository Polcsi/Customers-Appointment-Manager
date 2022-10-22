import React, { useState, useEffect, useRef } from "react";
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
  var hourTimer = null;
  var minuteTimer = null;

  function fillNumericContainer(length, destinationContainer) {
    destinationContainer.innerHTML += `<div></div><div></div>`;
    for (let i = 0; i < length; ++i) {
      destinationContainer.innerHTML += `<div index="${i}">${padTo2Digits(
        i
      )}</div>`;
    }
    destinationContainer.innerHTML += `<div></div><div></div>`;
  }

  function calculateActive(node) {
    const divs = Array.from(node.childNodes);
    let hasActive = false;
    divs.forEach(function (element) {
      try {
        /* console.log(
        Math.round(element.getBoundingClientRect().y) +
          " " +
          element.textContent
      ); */
        if (
          Math.round(element.getBoundingClientRect().y) === activePos ||
          Math.round(element.getBoundingClientRect().y) === activePos + 1
        ) {
          element.classList.add("active");
          /* console.log("set active"); */
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
        /* console.log(
        Math.round(element.getBoundingClientRect().y) +
          " " +
          element.textContent +
          " " +
          activePos +
          " " +
          hourContainer.scrollTop
      ); */
        let elementPos = Math.round(element.getBoundingClientRect().y);
        if (elementPos >= activePos - 25 && elementPos <= activePos + 25) {
          element.classList.add("active");
          node.scrollTop = element.getAttribute("index") * 50;
        }
      });
    }
  }

  function setTimeScrollbarsPosition() {
    const setMinScrollPos = 50 * currentTime.minute;
    const setHourScrollPos = 50 * currentTime.hour;

    minuteRef.current.scrollTop = setMinScrollPos;
    hourRef.current.scrollTop = setHourScrollPos;
  }

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

  const hourScrollEventListener = () => {
    clearTimeout(hourTimer);

    hourTimer = setTimeout(function () {
      calculateActive(hourRef.current);
    }, 100);
  };
  const minuteScrollEventListener = () => {
    clearTimeout(minuteTimer);

    minuteTimer = setTimeout(function () {
      calculateActive(minuteRef.current);
    }, 100);
  };

  useEffect(() => {
    const time = appointment.time.split(":");
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
  }, [fill, appointment.time]);

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
