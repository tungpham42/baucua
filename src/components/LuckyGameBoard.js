import React, { useState, useRef } from "react";
import { Button, Row, Col, Table, Form } from "react-bootstrap";
import Dice3D from "./Dice3D";
import EditPlayerModal from "./EditPlayerModal";
import RulesModal from "./RulesModal";

const icons = [
  "/images/bau.png",
  "/images/cua.png",
  "/images/tom.png",
  "/images/ca.png",
  "/images/ga.png",
  "/images/nai.png",
];

const texts = ["Bầu", "Cua", "Tôm", "Cá", "Gà", "Nai"];

const LuckyGameBoard = () => {
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "Người chơi 1",
      balance: 0,
      betting: { bau: 0, cua: 0, tom: 0, ca: 0, ga: 0, nai: 0 },
    },
    {
      id: 2,
      name: "Người chơi 2",
      balance: 0,
      betting: { bau: 0, cua: 0, tom: 0, ca: 0, ga: 0, nai: 0 },
    },
  ]);

  const [dice, setDice] = useState([0, 0, 0]);
  const [result, setResult] = useState("");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [isResultVisible, setIsResultVisible] = useState(false); // State to trigger result animation
  const [error, setError] = useState("");
  const [editModal, setEditModal] = useState({
    show: false,
    playerId: null,
    name: "",
    balance: 0,
  });
  const [showRulesModal, setShowRulesModal] = useState(false);

  const playerRefs = useRef(players.map(() => React.createRef()));

  const topBarRef = useRef(null);

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

    const updatedPlayers = players.map((player) => {
      let winnings = 0;
      newDice.forEach((idx) => {
        const animal = icons[idx].split("/images/")[1].split(".")[0];
        winnings +=
          player.betting[animal] * newDice.filter((val) => val === idx).length;
      });

      return { ...player, balance: player.balance + winnings };
    });

    setPlayers(updatedPlayers);
  };

  const handleBetChange = (playerId, animal, amount) => {
    const updatedPlayers = players.map((player) =>
      player.id === playerId
        ? {
            ...player,
            betting: { ...player.betting, [animal]: parseInt(amount, 10) || 0 },
          }
        : player
    );
    setPlayers(updatedPlayers);
  };

  const addPlayer = () => {
    if (!newPlayerName.trim()) {
      setError("Tên người chơi không được để trống!");
      return;
    }

    const newPlayer = {
      id: players.length + 1,
      name: newPlayerName,
      balance: 0,
      betting: { bau: 0, cua: 0, tom: 0, ca: 0, ga: 0, nai: 0 },
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
    setError("");
    playerRefs.current.push(React.createRef());
  };

  const deletePlayer = (playerId) => {
    const updatedPlayers = players.filter((player) => player.id !== playerId);
    setPlayers(updatedPlayers);
    playerRefs.current = playerRefs.current.filter(
      (_, index) => players[index].id !== playerId
    );
  };

  const openEditModal = (playerId, name, balance) => {
    setEditModal({ show: true, playerId, name, balance });
  };

  const closeEditModal = () => {
    setEditModal({ show: false, playerId: null, name: "", balance: 0 });
  };

  const handleEditNameChange = (e) => {
    setEditModal({ ...editModal, name: e.target.value });
  };

  const handleEditBalanceChange = (e) => {
    setEditModal({ ...editModal, balance: parseInt(e.target.value, 10) || 0 });
  };

  const openRulesModal = () => {
    setShowRulesModal(true);
  };

  const closeRulesModal = () => {
    setShowRulesModal(false);
  };

  const savePlayerDetails = () => {
    const updatedPlayers = players.map((player) =>
      player.id === editModal.playerId
        ? { ...player, name: editModal.name, balance: editModal.balance }
        : player
    );
    setPlayers(updatedPlayers);
    closeEditModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addPlayer();
    }
  };

  const scrollToPlayer = (index) => {
    playerRefs.current[index].current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToTopBar = () => {
    topBarRef.current.scrollIntoView({ behavior: "smooth" });
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
      <p className={`mt-3 ${isResultVisible ? "slide-up" : ""}`}>
        Kết quả: {result}
      </p>
      <hr />
      <div ref={topBarRef} className="top-bar">
        {players.map((player, index) => (
          <Button
            key={player.id}
            variant="primary"
            onClick={() => scrollToPlayer(index)}
            className="mx-2 my-3"
          >
            {player.name}
          </Button>
        ))}
      </div>
      <hr />
      <div className="mb-3 col-8 mx-auto">
        <Form.Group>
          <Form.Label>Tên người chơi mới</Form.Label>
          <Form.Control
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tên người chơi"
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" onClick={addPlayer} className="mt-3">
          Thêm người chơi
        </Button>
      </div>
      {players.map((player, index) => (
        <div key={player.id} ref={playerRefs.current[index]}>
          <hr />
          <h3>
            {player.name}{" "}
            <Button
              variant="primary"
              onClick={() =>
                openEditModal(player.id, player.name, player.balance)
              }
              className="ms-3"
            >
              Sửa
            </Button>
            <Button
              variant="danger"
              onClick={() => deletePlayer(player.id)}
              className="ms-3"
            >
              Xóa
            </Button>
          </h3>
          <Table bordered striped hover className="mt-3">
            <thead>
              <tr>
                <th>Con Vật</th>
                <th>Cược (mồi/bia)</th>
              </tr>
            </thead>
            <tbody>
              {["bau", "cua", "tom", "ca", "ga", "nai"].map((animal, index) => (
                <tr key={animal}>
                  <td>
                    <img
                      src={icons[index]}
                      alt={animal}
                      style={{ width: "40px" }}
                    />{" "}
                    {texts[index]}
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={player.betting[animal]}
                      onChange={(e) =>
                        handleBetChange(player.id, animal, e.target.value)
                      }
                      min="0"
                      style={{ width: "80px" }}
                      className="mx-auto"
                    ></Form.Control>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Số lượng còn lại: {player.balance} mồi/bia</p>
        </div>
      ))}

      <EditPlayerModal
        show={editModal.show}
        onHide={closeEditModal}
        name={editModal.name}
        balance={editModal.balance}
        onNameChange={handleEditNameChange}
        onBalanceChange={handleEditBalanceChange}
        onSave={savePlayerDetails}
      />
      <RulesModal show={showRulesModal} handleClose={closeRulesModal} />
      <Button
        variant="primary"
        onClick={scrollToTopBar}
        className="scrollTopBtn"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
        }}
      >
        Người chơi
      </Button>
    </div>
  );
};

export default LuckyGameBoard;
