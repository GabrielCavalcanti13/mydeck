import React, { useState } from "react";
import { createDeck } from "../../services/deckService";

const DeckCreator = () => {
  const [deckName, setDeckName] = useState("");

  const handleCreateDeck = async () => {
    if (!deckName) return;
    await createDeck(deckName);
    setDeckName("");
    alert("Deck criado com sucesso!");
  };

  return (
    <div>
      <h2>Criar Novo Deck</h2>
      <input
        type="text"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        placeholder="Nome do Deck"
      />
      <button
        onClick={handleCreateDeck}
      >
        Criar Deck
      </button>
    </div>
  );
};

export default DeckCreator;
