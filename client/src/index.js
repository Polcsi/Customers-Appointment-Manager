import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { AppProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
