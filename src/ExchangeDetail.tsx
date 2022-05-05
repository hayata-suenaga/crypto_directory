import { useParams } from "react-router-dom";

const ExchangeDetail = () => {
  const params = useParams();
  return <p>{params.id}</p>;
};

export default ExchangeDetail;
