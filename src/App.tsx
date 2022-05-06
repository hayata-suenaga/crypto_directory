import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Directory from "./pages/Directory";
import ExchangeDetail from "./pages/ExchangeDetail";

const App = () => {
  /* This project uses react-router-dom for routing */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Directory />} />
        <Route path="/exchanges/:id" element={<ExchangeDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
