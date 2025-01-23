import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import Dice3D from "./Dice3D";
import RulesModal from "./RulesModal";

const texts = ["Bầu", "Cua", "Tôm", "Cá", "Gà", "Nai"];

const GameBoard = () => {
  const [dice, setDice] = useState([0, 0, 0]);
  const [result, setResult] = useState("");
  const [showRulesModal, setShowRulesModal] = useState(false);

  const rollDice = () => {
    const audio = new Audio("/sounds/dice.mp3");
    audio.play();
    const newDice = [0, 1, 2].map(() => Math.floor(Math.random() * 6));
    setDice(newDice);
    setResult(newDice.map((idx) => texts[idx]).join(", "));
  };

  const openRulesModal = () => {
    setShowRulesModal(true);
  };

  const closeRulesModal = () => {
    setShowRulesModal(false);
  };

  return (
    <div className="game-board text-center position-relative">
      <h1>Bầu Cua</h1>
      <Button
        variant="primary"
        onClick={openRulesModal}
        className="position-absolute rulesBtn"
        style={{
          top: "25px",
          right: "25px",
          fontSize: "1rem",
          padding: "0.5rem 1rem !important",
        }}
      >
        Xem Luật Chơi
      </Button>
      <Row>
        {dice.map((value, idx) => (
          <Col key={idx}>
            <Dice3D value={value} />
          </Col>
        ))}
      </Row>
      <Button variant="primary" onClick={rollDice} className="my-3">
        Lắc Xúc Xắc
      </Button>
      <p className="mt-3">Kết quả: {result}</p>
      <RulesModal show={showRulesModal} handleClose={closeRulesModal} />
    </div>
  );
};

export default GameBoard;
