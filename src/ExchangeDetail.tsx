import { Link, useParams } from "react-router-dom";
import { useApi } from "./hooks/hooks";
import React from "react";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faReddit } from "@fortawesome/free-brands-svg-icons/faReddit";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faSlack } from "@fortawesome/free-brands-svg-icons/faSlack";
import IconButton from "./components/IconButton";

const endpoint = "https://api.coingecko.com/api/v3/exchanges/";
const twitterBaseUrl = "https://twitter.com/";

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

  /* Show each social media link if available using icon */
  return (
    <>
      <div id="social-media-list">
        {facebook_url && <IconButton icon={faFacebook} link={facebook_url} />}
        {twitter_handle && (
          <IconButton icon={faTwitter} link={twitterBaseUrl + twitter_handle} />
        )}
        {reddit_url && <IconButton icon={faReddit} link={reddit_url} />}
        {telegram_url && <IconButton icon={faTelegram} link={telegram_url} />}
        {slack_url && <IconButton icon={faSlack} link={slack_url} />}
      </div>
    </>
  );
};
