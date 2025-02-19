import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeckCreator from "./components/DeckCreator/DeckCreator";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/decks/create" element={<DeckCreator />} />
      </Routes>
    </Router>
  );
};

export default App;
