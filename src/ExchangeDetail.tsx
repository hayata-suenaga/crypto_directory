import { Link, useParams } from "react-router-dom";
import { useApi } from "./hooks";
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
      <DetailCard exchange={exchange} />
      <Link to="/">
        <button>Back to Dashboard</button>
      </Link>
    </main>
  );
};

export default ExchangeDetail;

interface DetailCardProps {
  exchange: DetailedExchange;
}

// name, country, trust rank, logo, year of establishment, social media links, description, and a back-to-main-page button.
const DetailCard = ({ exchange }: DetailCardProps) => {
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
      <p>{`country: ${country ? country : "N/A"}`}</p>
      <p>{`url: ${url}`}</p>
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
