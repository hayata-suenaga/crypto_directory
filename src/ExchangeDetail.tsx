import { Link, useParams } from "react-router-dom";
import { useApi } from "./hooks";
import ExchangeCard from "./ExchangeCard";
import React from "react";

const endpoint = "https://api.coingecko.com/api/v3/exchanges/";

const ExchangeDetail = () => {
  const params = useParams();
  const { data: exchange, loading, errored } = useApi(endpoint + params.id);

  if (loading) return <div>Loading...</div>;

  if (errored)
    return (
      <div>Something went wrong... Please refresh your browser again :)</div>
    );

  return (
    <main>
      <ExchangeCard exchange={exchange} />
      <Link to="/">
        <button>Back to Dashboard</button>
      </Link>
    </main>
  );
};

export default ExchangeDetail;
