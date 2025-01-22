import React from "react";
import { Image } from "react-bootstrap";

const Dice = ({ icon, onClick }) => {
  return (
    <div onClick={onClick} className="dice">
      <Image src={icon} alt="dice" fluid />
    </div>
  );
};

export default Dice;
