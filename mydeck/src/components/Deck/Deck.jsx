import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDecks} from "../../services/deckService";
import Card from "../Card/Card";
import "./Deck.css";

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
					<Card
					key={index}
					name={card.name}
					image={card.image}
					attributes={deck.attributes}
					values={card.values}
					/>
        ))}
        </div>
    );
};

export default Deck;
