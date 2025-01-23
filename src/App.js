import React from "react";
import LuckyGameBoard from "./components/LuckyGameBoard";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="text-center col-12 p-0">
      <LuckyGameBoard />
    </Container>
  );
}

export default App;
