import { useNavigate } from "react-router-dom";

interface Props {
  exchange: Exchange;
}

const ExchangeCard = ({ exchange }: Props) => {
  const { name, country, url, image, trust_score, trust_score_rank } = exchange;
  const navigate = useNavigate();

  return (
    <article onClick={() => navigate(`/exchanges/${exchange.id}`)}>
      <img src={image} alt="exchange logo" />
      <h2>{exchange.name}</h2>
      <p>{`name: ${name}`}</p>
      <p>{`country: ${country}`}</p>
      <p>{`url: ${url}`}</p>
      <p>{`trust: ${trust_score}`}</p>
      <p>{`rank: ${trust_score_rank}`}</p>
    </article>
  );
};

export default ExchangeCard;
