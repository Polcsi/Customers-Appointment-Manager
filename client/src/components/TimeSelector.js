import React, { useState, useEffect, useRef } from "react";
import times from "../assets/times.svg";

const TimeSelector = ({ setOpenTime, handleChange, appointment }) => {
  const hourRef = useRef(null);
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
      hourRef.current.ontouchstart = startTouch;
      hourRef.current.ontouchmove = onPointerMove;
      hourRef.current.ontouchend = onPointerEnd;
    } else {
      hourRef.current.onmousemove = onPointerMove;
      hourRef.current.onmouseup = onPointerEnd;
    }

    function startTouch() {
      let value = hourRef.current.style.marginTop;
      start = parseFloat(value.split("p")[0]);
    }

    function onPointerMove(e) {
      offset =
        start + ((isTouchEvent ? e.touches[0].clientY : e.clientY) - initalY);

      hourRef.current.style.marginTop = offset + "px";
    }

    function onPointerEnd() {
      if (isTouchEvent) {
        hourRef.current.ontouchmove = null;
        hourRef.current.ontouchend = null;
      } else {
        hourRef.current.onmousemove = null;
        hourRef.current.onmouseup = null;
      }
    }
  };

  useEffect(() => {
    const time = appointment.time.split(":");
    hourRef.current.style.marginTop = `${(time[0] / 1) * -35}px`;
    minuteRef.current.style.marginTop = `${(time[1] / 1) * -36}px`;
    setHour(time[0]);
    setMinute(time[1]);
    if (fill) {
      setFill(false);
      for (let i = 0; i < 24; i++) {
        if (i < 10) {
          hourRef.current.innerHTML += `<div>0${i}</div>`;
        } else {
          hourRef.current.innerHTML += `<div>${i}</div>`;
        }
      }
      for (let i = 0; i < 60; i++) {
        if (i < 10) {
          minuteRef.current.innerHTML += `<div>0${i}</div>`;
        } else {
          minuteRef.current.innerHTML += `<div>${i}</div>`;
        }
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
          <div className="hour input-time">
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
              <div
                ref={hourRef}
                onTouchStart={onPointerEvent}
                onMouseDown={onPointerEvent}
              ></div>
            </div>
          </div>
          <div className="divider">:</div>
          <div className="box"></div>
          <div className="fade-selector"></div>
          <div className="minute input-time">
            {/* <input
              className="minute-slider time-slider"
              type="range"
              min="0"
              max="59"
              step="1"
              onChange={handleSliderChange}
              value={minute}
            /> */}
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
