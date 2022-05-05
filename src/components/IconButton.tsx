import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const IconButton = ({ icon, link }: { icon: IconProp; link: string }) => {
  return (
    <a className="icon-button" href={link}>
      <FontAwesomeIcon icon={icon} />
    </a>
  );
};

export default IconButton;
