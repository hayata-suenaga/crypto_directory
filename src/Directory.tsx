import Todo from "./ExchangeCard";
import React from "react";

const exampleExchanges = require("./exampleData.json");

const Directory = () => {
  return (
    <main>
      <h1>Exchange List</h1>
      {exampleExchanges.map((exchange: Exchange) => (
        <Todo key={exchange.id} exchange={exchange} />
      ))}
    </main>
  );
};

export default Directory;
