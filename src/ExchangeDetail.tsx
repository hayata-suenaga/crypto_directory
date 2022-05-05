import { Link, useParams } from "react-router-dom";
import { useApi } from "./hooks/hooks";
import React from "react";

const endpoint = "https://api.coingecko.com/api/v3/exchanges/";

const ExchangeDetail = () => {
  // Get id of exchange from the url
  const { id } = useParams();
  const { data: exchange, loading, errored } = useApi(endpoint + id);

  if (loading) return <div>Loading...</div>;
  if (errored)
    return (
      <div>Something went wrong... Please refresh your browser again :)</div>
    );

  return (
    <main className="container">
      <DetailCard exchange={exchange} />
      <Link to="/">
        <button>Back to Dashboard</button>
      </Link>
    </main>
  );
};

export default ExchangeDetail;

const DetailCard = ({ exchange }: { exchange: DetailedExchange }) => {
  const {
    image,
    name,
    country,
    url,
    trust_score_rank,
    year_established,
    description,
  } = exchange;

  return (
    <article>
      <img src={image} alt="exchange logo" />
      <h2>{name}</h2>
      {/* Country can be null */}
      <p>{`country: ${country ? country : "N/A"}`}</p> <p>{`url: ${url}`}</p>
      <p>{`rank: ${trust_score_rank}`}</p>
      <p>{`Established in: ${year_established}`}</p>
      <p>{description ? "Description not available" : description}</p>
      <SocialMediaList exchange={exchange} />
    </article>
  );
};

const SocialMediaList = ({ exchange }: { exchange: DetailedExchange }) => {
  const { facebook_url, reddit_url, telegram_url, slack_url, twitter_handle } =
    exchange;

  /* Show each social media link if available */
  return (
    <ul>
      {facebook_url && <li>{`Facebook: ${facebook_url}`}</li>}
      {reddit_url && <li>{`Reddit: ${reddit_url}`}</li>}
      {telegram_url && <li>{`Telegram: ${telegram_url}`}</li>}
      {slack_url && <li>{`Slack: ${slack_url}`}</li>}
      {twitter_handle && <li>{`Twitter: ${twitter_handle}`}</li>}
    </ul>
  );
};
