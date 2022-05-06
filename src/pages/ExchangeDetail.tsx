import { Link, useParams } from "react-router-dom";
import { useApi, useUpdateDocTitle } from "../hooks/hooks";
import React from "react";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faReddit } from "@fortawesome/free-brands-svg-icons/faReddit";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faSlack } from "@fortawesome/free-brands-svg-icons/faSlack";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons/faRankingStar";
import IconButton from "../components/IconButton";
import InfoCard from "../components/InfoCard";
import Header from "../components/Header";

const endpoint = "https://api.coingecko.com/api/v3/exchanges/";
const twitterBaseUrl = "https://twitter.com/";

const ExchangeDetail = () => {
  // Get id of exchange from the url
  const { id } = useParams();
  const { data: exchange, loading, errored } = useApi(endpoint + id);

  useUpdateDocTitle(id?.toString());

  if (loading) return <div className="loading-indicator">Loading...</div>;
  if (errored)
    return (
      <div className="error-msg">
        Something went wrong... Please refresh your browser again :)
      </div>
    );

  return (
    <>
      <Header title={exchange.name} />
      <main className="container">
        <PageBody exchange={exchange} />
      </main>
    </>
  );
};

export default ExchangeDetail;

const PageBody = ({ exchange }: { exchange: DetailedExchange }) => {
  const { image, name, url, description } = exchange;

  return (
    <div id="exchange-detail">
      <Link to="/">
        <a>{"<- Back to Home"}</a>
      </Link>
      <div className="main-info">
        <a className="headline" href={url}>
          <img src={image} alt="exchange logo" />
          <h2>{name}</h2>
        </a>
        <SocialMediaList exchange={exchange} />
      </div>
      <p>{description ? description : "Description not available"}</p>
      <InfoCardList exchange={exchange} />
    </div>
  );
};

const InfoCardList = ({ exchange }: { exchange: DetailedExchange }) => {
  const { country, trust_score_rank, year_established } = exchange;

  return (
    <div id="info-card-list">
      <InfoCard
        title="country"
        icon={faGlobe}
        data={country ? country : "N/A"}
      />
      <InfoCard title="rank" icon={faRankingStar} data={trust_score_rank} />
      <InfoCard
        title="established at"
        icon={faCalendar}
        data={year_established}
      />
    </div>
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
