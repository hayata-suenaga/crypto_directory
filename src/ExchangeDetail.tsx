import { Link, useParams } from "react-router-dom";

const ExchangeDetail = () => {
  const params = useParams();
  return (
    <main>
      <Link to="/">
        <button>Back to Dashboard</button>
      </Link>
    </main>
  );
};

export default ExchangeDetail;
