import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDecks, updateDeck, addCardToDeck } from "../../services/deckService";
import Card from "../Card/Card";
import "./DeckEditor.css";


const DeckEditor = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [editedCards, setEditedCards] = useState([]);
  const [newCard, setNewCard] = useState({ name: "", imageFile: null, values: [] });
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      const decks = await getDecks();
      const selectedDeck = decks.find((d) => d.id === deckId);
      if (selectedDeck) {
        setEditedCards(selectedDeck.cards || []);
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

  const handleCardAttributeChange = (cardIndex, attrIndex, value) => {
    const updated = [...editedCards];
    updated[cardIndex].values[attrIndex] = value === "" ? "" : parseInt(value) || 0;
    setEditedCards(updated);
  };  
  
  const handleSaveDeck = async () => {
    await updateDeck(deck.id, {
      attributes: deck.attributes,
      cards: editedCards,
    });
  
    alert("Deck atualizado com sucesso!");
  };

  const handleRemoveAttribute = (attrIndexToRemove) => {
    const newAttributes = deck.attributes.filter((_, i) => i !== attrIndexToRemove);
  
    const updatedCards = (deck.cards || []).map((card) => ({
      ...card,
      values: card.values.filter((_, i) => i !== attrIndexToRemove),
    }));
  
    setDeck((prevDeck) => ({
      ...prevDeck,
      attributes: newAttributes,
      cards: updatedCards,
    }));
  
    setEditedCards(updatedCards);
  };
    

  const handleAddCard = async (event) => {
    event.preventDefault();

    if (!newCard.name.trim() || !newCard.imageFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(newCard.imageFile);
    reader.onloadend = async () => {
      const base64String = reader.result; 

      const card = {
        name: newCard.name,
        image: base64String, 
        values: newCard.values.map((v) => parseInt(v) || 0),
      };

      await addCardToDeck(deck.id, card);

      setDeck((prevDeck) => ({
        ...prevDeck,
        cards: [...(prevDeck?.cards || []), card],
      }));

      setEditedCards((prevCards) => [...prevCards, card]);

      setNewCard({
        name: "",
        imageFile: null,
        values: new Array(deck?.attributes?.length || 3).fill(""),
      });
    };
  };

  const handleAttributeChange = (index, value) => {
    const updatedValues = [...newCard.values];
    updatedValues[index] = value === "" ? "" : value;
    setNewCard({ ...newCard, values: updatedValues });
  };

  const handleDeleteCard = async (indexToDelete) => {
    const updatedCards = deck.cards.filter((_, i) => i !== indexToDelete);
  
    await updateDeck(deck.id, { cards: updatedCards });
  
    setDeck((prevDeck) => ({
      ...prevDeck,
      cards: updatedCards,
    }));

    setEditedCards(updatedCards);
  };

  const handleSaveNameAndExit = async () => {
    if (deck) {
      await updateDeck(deck.id, { name: deck.name });
      setIsEditingName(false);
    }
  };
  
  

  if (!deck) return <p>Carregando deck...</p>;

  return (
    <div className="deck-editor-container">
      <div className="menu">
        <button onClick={() => navigate("/decks/show")}>Voltar</button>
        <button onClick={handleSaveDeck}>Salvar Deck</button>
      </div>
      <h2>Editor de Deck</h2>

      <div>
        {isEditingName ? (
          <div>
            <input
              type="text"
              value={deck.name}
              onChange={handleNameChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveNameAndExit();
              }}
              autoFocus
            />
            <button onClick={handleSaveNameAndExit}>Salvar</button>
          </div>
        ) : (
          <h1
            className="editable-title"
            onClick={() => setIsEditingName(true)}
          >
            {deck.name}
          </h1>
        )}
      </div>


      <h3>Atributos do Deck</h3>
      <div className="attributes-list">
        {deck.attributes.map((attr, index) => (
          <div className="attribute-item" key={index}>
            <input
              type="text"
              value={attr}
              onChange={(e) => {
                const newAttributes = [...deck.attributes];
                newAttributes[index] = e.target.value;
                setDeck((prevDeck) => ({ ...prevDeck, attributes: newAttributes }));
              }}
            />
            {deck.attributes.length > 3 && (
              <button
                type="button"
                onClick={() => { handleRemoveAttribute(index); }}
              >
                Remover
              </button>
            )}
          </div>
        ))}
      </div>


      {deck.attributes.length < 5 && (
        <button
          type="button"
          onClick={() => {
            const newAttributes = [...deck.attributes, "Novo Atributo"];
            const newCards = editedCards.map((card) => ({
              ...card,
              values: [...card.values, 0],
            }));
            setDeck((prevDeck) => ({ ...prevDeck, attributes: newAttributes }));
            setEditedCards(newCards);
          }}
        >
          Adicionar Atributo
        </button>
      )}
      
      <h3>Cartas</h3>
      <div className="cards-container">
      {editedCards.map((card, index) => (
        <Card
          key={index}
          name={card.name}
          image={card.image}
          attributes={deck.attributes}
          values={card.values}
          onDelete={() => handleDeleteCard(index)}
          isEditable={true}
          onChange={(attrIndex, value) => handleCardAttributeChange(index, attrIndex, value)}
        />
      ))}

      </div>

      <div className="add-new-card">
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
        <div className="attribute-inputs-row">
          {deck.attributes.map((attr, index) => (
            <div className="attribute-input" key={index}>
              <label>{attr}</label>
              <input
                type="number"
                value={newCard.values[index]}
                onChange={(e) => handleAttributeChange(index, e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          ))}
        </div>
        <button onClick={handleAddCard}>Adicionar Carta</button>
      </div>
    </div>
  );
};

export default DeckEditor;
