import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Directory from "./Directory";
import ExchangeDetail from "./ExchangeDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Directory />} />
        <Route path="/exchanges/:id" element={<ExchangeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
