import React, { useState } from "react";
import { Button, Row, Col, Table, Form } from "react-bootstrap";
import Dice from "./Dice";
import EditPlayerModal from "./EditPlayerModal"; // Import the component

const icons = [
  "/images/bau.png",
  "/images/cua.png",
  "/images/tom.png",
  "/images/ca.png",
  "/images/ga.png",
  "/images/nai.png",
];

const texts = ["Bầu", "Cua", "Tôm", "Cá", "Gà", "Nai"];

const GameBoard = () => {
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
  const [error, setError] = useState("");
  const [editModal, setEditModal] = useState({
    show: false,
    playerId: null,
    name: "",
    balance: 0,
  });

  const rollDice = () => {
    const newDice = [0, 1, 2].map(() => Math.floor(Math.random() * 6));
    setDice(newDice);
    setResult(newDice.map((idx) => texts[idx]).join(", "));
    setTimeout(() => {
      document.querySelectorAll(".dice").forEach((diceElement) => {
        diceElement.classList.add("shake");
        setTimeout(() => {
          diceElement.classList.remove("shake");
        }, 500); // Sau khi hiệu ứng shake xong, loại bỏ lớp shake
      });
    }, 100);
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
  };

  const deletePlayer = (playerId) => {
    const updatedPlayers = players.filter((player) => player.id !== playerId);
    setPlayers(updatedPlayers);
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

  const savePlayerDetails = () => {
    const updatedPlayers = players.map((player) =>
      player.id === editModal.playerId
        ? { ...player, name: editModal.name, balance: editModal.balance }
        : player
    );
    setPlayers(updatedPlayers);
    closeEditModal();
  };

  return (
    <div className="game-board text-center">
      <h1>Bầu Cua</h1>
      <Row>
        {dice.map((num, idx) => (
          <Col key={idx}>
            <Dice icon={icons[num]} />
          </Col>
        ))}
      </Row>
      <Button variant="primary" onClick={rollDice} className="my-3">
        Lắc Xúc Xắc
      </Button>
      <p className="mt-3">Kết quả: {result}</p>
      <hr />
      <div className="mb-3 col-md-8 mx-auto">
        <Form.Group>
          <Form.Label>Tên người chơi mới</Form.Label>
          <Form.Control
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Nhập tên người chơi"
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" onClick={addPlayer} className="mt-3">
          Thêm người chơi
        </Button>
      </div>
      {players.map((player) => (
        <div key={player.id}>
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
          <Table bordered className="mt-3">
            <thead>
              <tr>
                <th>Con Vật</th>
                <th>Cược</th>
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
                    />
                    {texts[index]}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={player.betting[animal]}
                      onChange={(e) =>
                        handleBetChange(player.id, animal, e.target.value)
                      }
                      min="0"
                      style={{ width: "80px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Số tiền còn lại: {player.balance} đồng</p>
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
    </div>
  );
};

export default GameBoard;
