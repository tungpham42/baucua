import React from "react";
import GameBoard from "./components/GameBoard";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="text-center col-12 my-lg-5 my-md-5 my-sm-0 p-0">
      <GameBoard />
    </Container>
  );
}

export default App;
