import { useNavigate } from "react-router-dom";

/* Component used to display high-level info of each exchange on the directory */
const ExchangeCard = ({ exchange }: { exchange: Exchange }) => {
  const { name, image } = exchange;
  const navigate = useNavigate();
  const goToExchangeDetailPage = () => navigate(`/exchanges/${exchange.id}`);

  return (
    <article onClick={goToExchangeDetailPage} className="card">
      <div className="headline">
        <img src={image} alt="exchange logo" />
        <h2>{name}</h2>
      </div>
      <InfoTable exchange={exchange} />
    </article>
  );
};

export default ExchangeCard;

const InfoTable = ({ exchange }: { exchange: Exchange }) => {
  const { country, url, trust_score_rank } = exchange;

  return (
    <table>
      <tbody>
        <tr>
          <td>Country</td>
          {/* Country can be null */}
          <td>{country ? country : "N/A"}</td>
        </tr>
        <tr>
          <td>Trust Rank</td>
          <td>{trust_score_rank}</td>
        </tr>
        <tr>
          <td>URL</td>
          <td>
            <a href={url}>{url}</a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
