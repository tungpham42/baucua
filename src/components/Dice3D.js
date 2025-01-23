import React from "react";
import "./Dice3D.css"; // Include CSS for dice styling

const Dice3D = ({ value }) => {
  const rotations = [
    "rotateX(0deg) rotateY(0deg)", // Side 1
    "rotateX(-90deg) rotateY(0deg)", // Side 2
    "rotateX(0deg) rotateY(90deg)", // Side 3
    "rotateX(90deg) rotateY(0deg)", // Side 4
    "rotateX(0deg) rotateY(-90deg)", // Side 5
    "rotateX(180deg) rotateY(0deg)", // Side 6
  ];

  return (
    <div className="dice-container">
      <div className="dice" style={{ transform: rotations[value] }}>
        {["bau", "cua", "tom", "ca", "ga", "nai"].map((animal, index) => (
          <div key={index} className={`face face-${index + 1}`}>
            <img
              src={`/images/${animal}.png`}
              alt={animal}
              className="dice-face-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dice3D;
