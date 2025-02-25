import React, { useEffect, useState } from "react";
import { getDecks, deleteDeck } from "../../services/deckService";

const ShowDecks = () => {
  const [decks, setDecks] = useState([]);

  const handleDeleteDeck = async (deckId) => {
    await deleteDeck(deckId);
    setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
  };
  
  useEffect(() => {
    const fetchDecks = async () => {
      const decksData = await getDecks();
      setDecks(decksData);
    };
    fetchDecks();
  }, []);

  return (
    <div>
      <h2>Lista de Decks</h2>
      <ul>
        {decks.map((deck) => (
          <li 
            key={deck.id}>{deck.name}
            <button onClick={() => handleDeleteDeck(deck.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowDecks;
