import Todo from "./components/ExchangeCard";
import React from "react";
import { useApi } from "./hooks/hooks";
import Header from "./components/Header";

const endpoint =
  "https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1";

const Directory = () => {
  const { data: exchanges, loading, errored } = useApi(endpoint);

  if (loading) return <div>Loading...</div>;

  if (errored)
    return (
      <div>Something went wrong... Please refresh your browser again :)</div>
    );

  return (
    <>
      <Header title="Dashboard" />
      <main className="container">
        <div id="exchange-list">
          {exchanges.map((exchange: Exchange) => (
            <Todo key={exchange.id} exchange={exchange} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Directory;
