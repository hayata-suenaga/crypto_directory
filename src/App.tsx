import React from 'react';
import Todo from "./Todo";

const exampleExchanges = require("./exampleData.json");

function App() {
  return (
    <Todo exchange={exampleExchanges[0]} />
  );
}

export default App;
