import React from 'react';
import Todo from "./Todo";

const exampleExchanges = require("./exampleData.json");

function App() {
  return (
      <main>
        <h1>Exchange List</h1>
        {exampleExchanges.map((exchange: Exchange) => <Todo key={exchange.id} exchange={exchange} />)}
      </main>
  );
}

export default App;
