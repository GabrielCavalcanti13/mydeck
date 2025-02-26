import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeckCreator from "./components/DeckCreator/DeckCreator";
import Login from "./components/Login/Login";
import ShowDecks from "./components/ShowDecks/ShowDecks";
import DeckEditor from "./components/DeckEditor/DeckEditor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/decks/create" element={<DeckCreator />} />
        <Route path="/decks/show" element={<ShowDecks />} />
        <Route path="/edit/:deckId" element={<DeckEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
