import React, { useState } from "react";
import { Button, Row, Col, Table, Form } from "react-bootstrap";
import Dice from "./Dice";

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
  // State để lưu trữ nhiều người chơi, mỗi người chơi có tên, số dư và các cược
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

  // Lắc xúc xắc và tính toán kết quả
  const rollDice = () => {
    const newDice = [0, 1, 2].map(() => Math.floor(Math.random() * 6));
    setDice(newDice);
    const rolledIcons = newDice.map((idx) => texts[idx]);
    setResult(rolledIcons.join(", "));
    setTimeout(() => {
      document.querySelectorAll(".dice").forEach((diceElement) => {
        diceElement.classList.add("shake");
        setTimeout(() => {
          diceElement.classList.remove("shake");
        }, 500); // Sau khi hiệu ứng shake xong, loại bỏ lớp shake
      });
    }, 100);
    // Cập nhật số dư của mỗi người chơi
    const newPlayers = players.map((player) => {
      let winnings = 0;
      newDice.forEach((idx) => {
        const animal = icons[idx].split("/images/")[1].split(".")[0];
        winnings +=
          player.betting[animal] * newDice.filter((val) => val === idx).length; // Tính tiền thắng
      });

      return {
        ...player,
        balance: player.balance + winnings,
      };
    });

    setPlayers(newPlayers);
  };

  // Cập nhật số tiền cược của người chơi
  const handleBetChange = (playerId, animal, amount) => {
    const newPlayers = players.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          betting: {
            ...player.betting,
            [animal]: parseInt(amount, 10) || 0,
          },
        };
      }
      return player;
    });
    setPlayers(newPlayers);
  };

  // Tạo người chơi mới
  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        id: players.length + 1,
        name: newPlayerName,
        balance: 0,
        betting: { bau: 0, cua: 0, tom: 0, ca: 0, ga: 0, nai: 0 },
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName("");
    }
  };

  // Xóa người chơi
  const deletePlayer = (playerId) => {
    const newPlayers = players.filter((player) => player.id !== playerId);
    setPlayers(newPlayers);
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
      {/* Form tạo người chơi mới */}
      <div className="mb-3 col-md-8 mx-auto">
        <Form.Group>
          <Form.Label>Tên người chơi mới</Form.Label>
          <Form.Control
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Nhập tên người chơi"
          />
        </Form.Group>
        <Button variant="primary" onClick={addPlayer} className="mt-3">
          Thêm người chơi
        </Button>
      </div>

      {/* Hiển thị thông tin người chơi */}
      {players.map((player, playerIndex) => (
        <div key={player.id}>
          <h3>{player.name}</h3>

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

          {/* Nút xóa người chơi */}
          <Button variant="danger" onClick={() => deletePlayer(player.id)}>
            Xóa người chơi
          </Button>
        </div>
      ))}

      <p className="mt-3">Kết quả: {result}</p>
    </div>
  );
};

export default GameBoard;
