import { useNavigate } from "react-router-dom";

/* Component used to display high-level info of each exchange on the directory */
const ExchangeCard = ({ exchange }: { exchange: Exchange }) => {
  const { name, country, url, image, trust_score, trust_score_rank } = exchange;
  const navigate = useNavigate();
  const goToExchangeDetailPage = () => navigate(`/exchanges/${exchange.id}`);

  return (
    <article onClick={goToExchangeDetailPage}>
      <img src={image} alt="exchange logo" />
      <h2>{exchange.name}</h2>
      <p>{`name: ${name}`}</p>
      {/* Country can be null */}
      <p>{`country: ${country ? country : "N/A"}`}</p>
      <p>{`url: ${url}`}</p>
      <p>{`trust: ${trust_score}`}</p>
      <p>{`rank: ${trust_score_rank}`}</p>
    </article>
  );
};

export default ExchangeCard;
