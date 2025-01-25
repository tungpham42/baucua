import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameBoard from "./components/GameBoard";
import LuckyGameBoard from "./components/LuckyGameBoard";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Container className="text-center col-12 p-0">
        <Routes>
          <Route path="/" element={<GameBoard />} />
          <Route path="/lucky" element={<LuckyGameBoard />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
