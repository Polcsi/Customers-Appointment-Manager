import React, { useState, useEffect, useRef } from "react";
// icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CalendarView = () => {
  const currentMonth = useRef(null);
  const currentFullDateRef = useRef(null);
  const daysContainerRef = useRef(null);

  return (
    <>
      <div className="calendar-container">
        <div className="calendar">
          <div className="month">
            <MdKeyboardArrowLeft className="prev" />
            <div className="date">
              <h1 ref={currentMonth}>Unknown</h1>
              <p ref={currentFullDateRef}></p>
            </div>
            <MdKeyboardArrowRight className="next" />
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
