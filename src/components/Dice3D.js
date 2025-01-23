import React from "react";
import "./Dice3D.css"; // Include CSS for dice styling

const Dice3D = ({ value }) => {
  // Define rotations for each dice face corresponding to each animal
  const rotations = [
    "rotateX(0deg) rotateY(0deg)", // Bầu
    "rotateX(0deg) rotateY(90deg)", // Cua
    "rotateX(0deg) rotateY(180deg)", // Tôm
    "rotateX(0deg) rotateY(-90deg)", // Cá
    "rotateX(90deg) rotateY(0deg)", // Gà
    "rotateX(-90deg) rotateY(0deg)", // Nai
  ];

  const animals = ["bau", "cua", "tom", "ca", "ga", "nai"];

  return (
    <div className="dice-container">
      <div className="dice" style={{ transform: rotations[value] }}>
        {animals.map((animal, index) => (
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
