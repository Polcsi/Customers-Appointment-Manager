import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [activeDay, setActiveDay] = useState(null);
  const [today, setToday] = useState(new Date());
  const [date, setDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  return (
    <AppContext.Provider
      value={{ activeDay, setActiveDay, today, date, setDate }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
