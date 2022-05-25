import React, { useState, useEffect, useRef } from "react";
import { padTo2Digits } from "../utils";
import times from "../assets/times.svg";

const TimeSelector = ({ setOpenTime, handleChange, appointment }) => {
  const hourRef = useRef(null);
  const hourTouchRef = useRef(null);
  const minuteRef = useRef(null);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [fill, setFill] = useState(true);

  const handleSliderChange = (e) => {
    let classes = e.target.className;
    let className = classes.split(" ")[0].split("-")[0];
    let value = e.target.value;

    if (className === "hour") {
      hourRef.current.style.marginTop = `${(value / 1) * -35}px`;
      setHour(value);
    }
    if (className === "minute") {
      minuteRef.current.style.marginTop = `${(value / 1) * -36}px`;
      setMinute(value);
    }
  };

  const saveTime = () => {
    handleChange(
      "time",
      `${parseInt(hour) < 10 ? `0${parseInt(hour)}` : parseInt(hour)}:${
        parseInt(minute) < 10 ? `0${parseInt(minute)}` : parseInt(minute)
      }`
    );
    setOpenTime(false);
  };

  const onPointerEvent = (e) => {
    let isTouchEvent = e.type === "touchstart" ? true : false;
    let offset = 0;
    let initalY = isTouchEvent ? e.touches[0].clientY : e.clientY;
    let start = 0;

    if (isTouchEvent) {
      document.ontouchstart = startTouch;
      document.ontouchmove = onPointerMove;
      document.ontouchend = onPointerEnd;
    } else {
      document.onmousemove = onPointerMove;
      document.onmouseup = onPointerEnd;
    }

    function startTouch() {
      let value = hourRef.current.style.marginTop;
      start = parseFloat(value.split("p")[0]);
      console.log(start);
    }

    function onPointerMove(e) {
      console.log("move " + initalY);
      offset =
        start + ((isTouchEvent ? e.touches[0].clientY : e.clientY) - initalY);

      /* console.log(start);
      console.log(offset); */
      if (offset >= 32) {
        offset = 32;
      }
      if (offset <= -775) {
        offset = -775;
      }

      hourRef.current.style.marginTop = offset + "px";
    }

    function onPointerEnd() {
      setHour(
        Math.round(
          Math.floor(parseFloat(hourRef.current.style.marginTop)) / -35
        ) + 1
      );
      if (isTouchEvent) {
        document.ontouchmove = null;
        document.ontouchend = null;
      } else {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }
  };

  useEffect(() => {
    const time = appointment.time.split(":");
    hourRef.current.style.marginTop = `${(time[0] / 1) * -33}px`;
    minuteRef.current.style.marginTop = `${(time[1] / 1) * -36}px`;
    setHour(time[0]);
    setMinute(time[1]);
    if (fill) {
      setFill(false);
      for (let i = 0; i < 24; i++) {
        hourRef.current.innerHTML += `<div>${padTo2Digits(i)}</div>`;
      }
      for (let i = 0; i < 60; i++) {
        minuteRef.current.innerHTML += `<div>${padTo2Digits(i)}</div>`;
      }
    }
  }, [fill, appointment.time]);

  return (
    <div className="overlay">
      <div className="overlay-container datetime-overlay">
        <button className="close-overlay" onClick={() => setOpenTime(false)}>
          <img src={times} alt="close" />
        </button>
        <div className="header">
          <h2>select time</h2>
        </div>
        <div className="overlay-body">
          <div
            ref={hourTouchRef}
            className="hour input-time"
            onTouchStart={onPointerEvent}
            onMouseDown={onPointerEvent}
          >
            {/* <input
              className="hour-slider time-slider"
              type="range"
              min="0"
              max="23"
              step="1"
              onChange={handleSliderChange}
              value={hour}
            /> */}
            <div className="hour-slider-value slider-value">
              <div ref={hourRef}></div>
            </div>
          </div>
          <div className="divider">:</div>
          <div className="box"></div>
          <div className="fade-selector"></div>
          <div className="minute input-time">
            <input
              className="minute-slider time-slider"
              type="range"
              min="0"
              max="59"
              step="1"
              onChange={handleSliderChange}
              value={minute}
            />
            <div className="minute-slider-value slider-value">
              <div ref={minuteRef}></div>
            </div>
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
