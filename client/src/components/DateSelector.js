import React, { useState, useRef, useEffect } from "react";
import times from "../assets/times.svg";
import { monthsArr } from "../data";

const DateSelector = ({ setOpenDate, handleChange, appointment, today }) => {
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const yearRef = useRef(null);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [fill, setFill] = useState(true);

  const yearsArr = [
    `${today.getFullYear()}`,
    `${today.getFullYear() + 1}`,
    `${today.getFullYear() + 2}`,
  ];

  const handleSliderChange = (e) => {
    let classes = e.target.className;
    let className = classes.split(" ")[0].split("-")[0];
    let value = e.target.value;

    if (className === "month") {
      monthRef.current.style.marginTop = `${(value / 1) * -35}px`;
      setMonth(value);
    }
    if (className === "day") {
      dayRef.current.style.marginTop = `${(value / 1) * -36}px`;
      setDay(value);
    }
    if (className === "year") {
      yearRef.current.style.marginTop = `${(value / 1) * -35}px`;
      setYear(value);
    }
  };

  const saveDate = () => {
    handleChange(
      "date",
      `${parseInt(today.getFullYear()) + parseInt(year)}-${
        parseInt(month) + 1 < 10
          ? `0${parseInt(month) + 1}`
          : parseInt(month) + 1
      }-${day < 10 ? `0${day}` : day}`
    );
    setOpenDate(false);
  };

  useEffect(() => {
    const date = appointment.date.split("-");
    monthRef.current.style.marginTop = `${((date[1] - 1) / 1) * -35}px`;
    dayRef.current.style.marginTop = `${(date[2] / 1) * -36}px`;
    yearRef.current.style.marginTop = `${
      (yearsArr.indexOf(`${date[0]}`) / 1) * -35
    }px`;
    setMonth(date[1] - 1);
    setDay(date[2]);
    setYear(yearsArr.indexOf(date[0]));
    if (fill) {
      setFill(false);
      for (let i = 0; i < 32; i++) {
        dayRef.current.innerHTML += `<div>${i}</div>`;
      }
    }
  }, [fill, appointment.date]);

  return (
    <div className="overlay">
      <div className="overlay-container datetime-overlay">
        <button className="close-overlay" onClick={() => setOpenDate(false)}>
          <img src={times} alt="close" />
        </button>
        <div className="header">
          <h2>select date</h2>
        </div>
        <div className="overlay-body">
          <div className="year input-time">
            <input
              className="year-slider time-slider"
              type="range"
              min="0"
              max={yearsArr.length - 1}
              step="1"
              onChange={handleSliderChange}
              value={year}
            />
            <div className="year-slider-value slider-value">
              <div ref={yearRef}>
                {yearsArr.map((month, index) => {
                  return <div key={index}>{month}</div>;
                })}
              </div>
            </div>
          </div>
          <div className="month input-time">
            <input
              className="month-slider time-slider"
              type="range"
              min="0"
              max="11"
              step="1"
              onChange={handleSliderChange}
              value={month}
            />
            <div className="month-slider-value slider-value">
              <div ref={monthRef}>
                {monthsArr.map((month, index) => {
                  return <div key={index}>{month}</div>;
                })}
              </div>
            </div>
          </div>
          <div className="box"></div>
          <div className="fade-selector"></div>
          <div className="day input-time">
            <input
              className="day-slider time-slider"
              type="range"
              min="1"
              max="31"
              step="1"
              onChange={handleSliderChange}
              value={day}
            />
            <div className="day-slider-value slider-value">
              <div ref={dayRef}></div>
            </div>
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
