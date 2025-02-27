import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDecks, updateDeck, addCardToDeck } from "../../services/deckService";

const DeckEditor = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [newCard, setNewCard] = useState("");

  useEffect(() => {
    const fetchDeck = async () => {
      const decks = await getDecks();
      const selectedDeck = decks.find((d) => d.id === deckId);
      if (selectedDeck) {
        setDeck({ ...selectedDeck, cards: selectedDeck.cards || [] });
      }
    };
  
    if (deckId) fetchDeck();
  }, [deckId]);
  

  const handleNameChange = (e) => {
    setDeck({ ...deck, name: e.target.value });
  };

  const handleSaveName = async () => {
    if (deck) {
      await updateDeck(deck.id, { name: deck.name });
      alert("Nome do deck atualizado!");
    }
  };

  const handleAddCard = async () => {
    if (newCard.trim() === "") return;
    await addCardToDeck(deck.id, newCard);
    setDeck((prevDeck) => ({
      ...prevDeck,
      cards: [...prevDeck.cards, newCard],
    }));
    setNewCard("");
  };

  if (!deck) return <p>Nenhum deck encontrado.</p>;

  return (
    <div>
      <button onClick={() => navigate("/")}>Voltar</button>
      <h2>Editor de Deck</h2>
      <label>
        Nome do Deck:
        <input type="text" value={deck.name} onChange={handleNameChange} />
        <button onClick={handleSaveName}>Salvar</button>
      </label>
      <h3>Cartas</h3>
      <ul>
        {(deck.cards || []).map((card, index) => (
            <li key={index}>{card}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newCard}
        onChange={(e) => setNewCard(e.target.value)}
        placeholder="Nova carta"
      />
      <button onClick={handleAddCard}>Adicionar Carta</button>
    </div>
  );
};

export default DeckEditor;
