import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDecks, deleteDeck } from "../../services/deckService";

const ShowDecks = () => {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

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
            <button onClick={() => handleDeleteDeck(deck.id)}>Delete</button>
            <button onClick={() => navigate(`/edit/${deck.id}`)}>Edit</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(`/decks/create`)}>New Deck</button>
    </div>
  );
};

export default ShowDecks;
