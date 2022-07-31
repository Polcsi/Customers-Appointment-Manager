import React, { useState, useRef, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // states
  const [activeDay, setActiveDay] = useState(null);
  const [today, setToday] = useState(new Date());
  const [date, setDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  // refs
  const daysContainerRef = useRef(null);

  const getSelectedDate = () => {
    if (activeDay) {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        parseInt(activeDay.textContent)
      );
    } else {
      return today;
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeDay,
        setActiveDay,
        today,
        date,
        setDate,
        getSelectedDate,
        daysContainerRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
