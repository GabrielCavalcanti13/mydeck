import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDecks } from "../../services/deckService";

const Deck = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      const decks = await getDecks();
      const selectedDeck = decks.find((d) => d.id === deckId);
      if (selectedDeck) {
        setDeck(selectedDeck);
      }
    };

    if (deckId) fetchDeck();
  }, [deckId]);

  return (
    <div>
      <h2>{deck?.name.name || deck?.name}</h2>
      <button onClick={() => navigate(-1)}>Voltar</button>
      {deck?.cards?.map((card, index) => (
        <div key={index} className="card-container">
          <img src={card.image} alt={card.name} />
          <h3>{card.name}</h3>
          <div className="attributes-container">
            {deck?.attributes?.map((attr, attrIndex) => (
              <div key={attrIndex}>
                <label>{attr}: </label>
                <span>{card.values[attrIndex]}</span> {/* Exibe o valor sem edição */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Deck;
