import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoCard = ({
  title,
  icon,
  data,
}: {
  title: string;
  icon: IconProp;
  data: any;
}) => {
  return (
    <article className="info-card">
      <div className="title">
        <FontAwesomeIcon icon={icon} />
        <h3>{title}</h3>
      </div>
      <p>{data}</p>
    </article>
  );
};

export default InfoCard;
