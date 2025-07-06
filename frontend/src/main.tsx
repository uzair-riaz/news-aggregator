import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        autoHideDuration={2000}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
