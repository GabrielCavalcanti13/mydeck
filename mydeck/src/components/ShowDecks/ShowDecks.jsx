import React, { useEffect, useState } from "react";
import { getDecks } from "../../services/deckService";

const ShowDecks = () => {
  const [decks, setDecks] = useState([]);

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
          <li key={deck.id}>{deck.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShowDecks;
