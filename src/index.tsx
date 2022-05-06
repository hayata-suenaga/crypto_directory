import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Normalize css for all browsers
import "normalize.css";
import "./styles.css";

// This project uses React 18
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
