import Todo from "./ExchangeCard";
import React from "react";
import { useApi } from "./hooks";

// const exampleExchanges = require("./exampleData.json");
const endpoint =
  "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=2";

const Directory = () => {
  const { data: exchanges, loading, errored } = useApi(endpoint);

  if (loading) return <div>Loading...</div>;

  if (errored)
    return (
      <div>Something went wrong... Please refresh your browser again :)</div>
    );

  return (
    <main>
      <h1>Exchange List</h1>
      {exchanges.map((exchange: Exchange) => (
        <Todo key={exchange.id} exchange={exchange} />
      ))}
    </main>
  );
};

export default Directory;
