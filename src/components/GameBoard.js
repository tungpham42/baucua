import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Dice3D from "./Dice3D";

const texts = ["Bầu", "Cua", "Tôm", "Cá", "Gà", "Nai"];

const GameBoard = () => {
  const [dice, setDice] = useState([0, 0, 0]);
  const [result, setResult] = useState("");
  const [isResultVisible, setIsResultVisible] = useState(false); // State to trigger result animation

  const rollDice = () => {
    const audio = new Audio("/sounds/dice.mp3");
    audio.play();

    // Roll dice
    const newDice = [0, 1, 2].map(() => Math.floor(Math.random() * 6));
    setDice(newDice);

    setIsResultVisible(false);
    setResult(""); // Reset result text
    // Delay the result display with animation trigger
    setTimeout(() => {
      const rolledResult = newDice.map((idx) => texts[idx]).join(", ");
      setResult(rolledResult);
      setIsResultVisible(true); // Trigger result visibility and animation
    }, 2000); // 2-second delay
  };

  return (
    <div className="game-board text-center position-relative">
      <h1>Bầu Cua</h1>
      <Row>
        {dice.map((value, idx) => (
          <Col key={idx} className="dice-col">
            <Dice3D value={value} />
          </Col>
        ))}
      </Row>
      <Button variant="primary" onClick={rollDice} className="my-4">
        Lắc Xúc Xắc
      </Button>
      <p className={`mt-3 ${isResultVisible ? "slide-up" : ""}`}>
        Kết quả: {result}
      </p>
    </div>
  );
};

export default GameBoard;
