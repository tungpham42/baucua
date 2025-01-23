import React from "react";
import GameBoard from "./components/GameBoard";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="text-center col-12 p-0">
      <GameBoard />
    </Container>
  );
}

export default App;
