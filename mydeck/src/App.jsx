import React from "react";
import Login from "./components/Login/Login";
import DeckCreator from "./components/DeckCreator/DeckCreator";

function App() {
  return (
    <div className="App">
      <h1>Trunfo Game</h1>
      <Login />
      <DeckCreator />
    </div>
  );
}

export default App;
