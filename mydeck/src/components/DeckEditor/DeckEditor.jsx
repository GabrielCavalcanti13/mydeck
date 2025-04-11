import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDecks, updateDeck, addCardToDeck } from "../../services/deckService";
import Card from "../Card/Card";
import "./DeckEditor.css";


const DeckEditor = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [newCard, setNewCard] = useState({ name: "", imageFile: null, values: [] });

  useEffect(() => {
    const fetchDeck = async () => {
      const decks = await getDecks();
      const selectedDeck = decks.find((d) => d.id === deckId);
      if (selectedDeck) {
        setDeck(selectedDeck);
        setNewCard({
          name: "",
          image: "",
          values: new Array(selectedDeck?.attributes?.length || 3).fill("")
        });
      }
    };

    if (deckId) fetchDeck();
  }, [deckId]);

  const handleNameChange = (e) => {
    setDeck((prevDeck) => ({ ...prevDeck, name: e.target.value }));
  };

  const handleSaveName = async () => {
    if (deck) {
      await updateDeck(deck.id, { name: deck.name });
      alert("Nome do deck atualizado!");
    }
  };

  const handleAddCard = async (event) => {
    event.preventDefault();

    if (!newCard.name.trim() || !newCard.imageFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(newCard.imageFile);
    reader.onloadend = async () => {
      const base64String = reader.result; // Converte a imagem para Base64

      const card = {
        name: newCard.name,
        image: base64String, // Armazena a imagem em Base64 no Firestore
        values: newCard.values.map((v) => parseInt(v) || 0),
      };

      await addCardToDeck(deck.id, card);

      setDeck((prevDeck) => ({
        ...prevDeck,
        cards: [...(prevDeck?.cards || []), card],
      }));

      setNewCard({
        name: "",
        imageFile: null, // Resetando a imagem
        values: new Array(deck?.attributes?.length || 3).fill(""),
      });
    };
  };

  const handleAttributeChange = (index, value) => {
    const updatedValues = [...newCard.values];
    updatedValues[index] = value;
    setNewCard({ ...newCard, values: updatedValues });
  };

  const handleDeleteCard = async (indexToDelete) => {
    const updatedCards = deck.cards.filter((_, i) => i !== indexToDelete);
  
    await updateDeck(deck.id, { cards: updatedCards });
  
    setDeck((prevDeck) => ({
      ...prevDeck,
      cards: updatedCards,
    }));
  };
  

  if (!deck) return <p>Carregando deck...</p>;

  return (
    <div className="deck-editor-container">
      <button onClick={() => navigate("/decks/show")}>Voltar</button>
      <h2>Editor de Deck</h2>

      <label>
        Nome do Deck:
        <input type="text" value={deck.name} onChange={handleNameChange} />
        <button onClick={handleSaveName}>Salvar</button>
      </label>

      <h3>Atributos do Deck</h3>
      <ul>
        {Array.isArray(deck.attributes) ? (
          deck.attributes.map((attr, index) => <li key={index}>{attr}</li>)
        ) : (
          <p>Nenhum atributo encontrado</p>
        )}
      </ul>

      <h3>Cartas</h3>
      <div className="cards-container">
      {deck?.cards?.map((card, index) => (
        <Card
          key={index}
          name={card.name}
          image={card.image}
          attributes={deck.attributes}
          values={card.values}
          onDelete={() => handleDeleteCard(index)}
        />
      ))}

      </div>

      <h3>Adicionar Nova Carta</h3>
      <input
        type="text"
        value={newCard.name}
        onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
        placeholder="Nome da carta"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setNewCard({ ...newCard, imageFile: e.target.files[0] })}
      />
      {deck.attributes.map((attr, index) => (
        <div key={index}>
          <label>
            {attr}:{" "}
            <input
              type="number"
              value={newCard.values[index]}
              onChange={(e) => handleAttributeChange(index, e.target.value)}
              placeholder={`${attr}`}
            />
          </label>
        </div>
        ))}
      <button onClick={handleAddCard}>Adicionar Carta</button>
    </div>
  );
};

export default DeckEditor;
