import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDecks, updateDeck, addCardToDeck } from "../../services/deckService";
import Card from "../Card/Card";

const DeckEditor = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [newCard, setNewCard] = useState({ name: "", image: "", values: [] });

  // Carregar o deck ao inicializar
  useEffect(() => {
    const fetchDeck = async () => {
      const decks = await getDecks();
      const selectedDeck = decks.find((d) => d.id === deckId);
      if (selectedDeck) {
        setDeck(selectedDeck);
        setNewCard({
          name: "",
          image: "",
          values: new Array(selectedDeck?.attributes?.length || 3).fill("")  // Preencher os valores com base nos atributos do deck
        });
      }
    };

    if (deckId) fetchDeck();
  }, [deckId]);

  // Função para atualizar o nome do deck
  const handleNameChange = (e) => {
    setDeck((prevDeck) => ({ ...prevDeck, name: e.target.value }));
  };

  const handleSaveName = async () => {
    if (deck) {
      await updateDeck(deck.id, { name: deck.name });
      alert("Nome do deck atualizado!");
    }
  };

  // Função para adicionar uma nova carta ao deck
  const handleAddCard = async () => {
    if (!newCard.name.trim() || !newCard.image.trim()) return;

    const card = {
      name: newCard.name,
      image: newCard.image,
      values: newCard.values.map(v => parseInt(v) || 0) // Garantir que os valores sejam numéricos
    };

    await addCardToDeck(deck.id, card);

    setDeck((prevDeck) => ({
      ...prevDeck,
      cards: [...(prevDeck?.cards || []), card],
    }));

    // Resetar o estado da nova carta
    setNewCard({
      name: "",
      image: "",
      values: new Array(deck?.attributes?.length || 3).fill("")  // Resetar os valores dos atributos ao adicionar uma nova carta
    });
  };

  // Função para lidar com a mudança nos valores dos atributos
  const handleAttributeChange = (index, value) => {
    const updatedValues = [...newCard.values];
    updatedValues[index] = value;
    setNewCard({ ...newCard, values: updatedValues });
  };

  // Mostrar uma mensagem de carregamento se o deck ainda não estiver carregado
  if (!deck) return <p>Carregando deck...</p>;

  return (
    <div>
      <button onClick={() => navigate("/decks/show")}>Voltar</button>
      <h2>Editor de Deck</h2>

      <label>
        Nome do Deck:
        <input type="text" value={deck.name} onChange={handleNameChange} />
        <button onClick={handleSaveName}>Salvar</button>
      </label>

      <h3>Atributos do Deck</h3>
      <ul>
        {deck?.attributes?.map((attr, index) => (
          <li key={index}>{attr}</li>
        ))}
      </ul>

      <h3>Cartas</h3>
      <div className="cards-container">
        {deck?.cards?.map((card, index) => (
          <Card key={index} name={card.name} image={card.image} attributes={deck.attributes} values={card.values} />
        ))}
      </div>

      <h3>Adicionar Nova Carta</h3>
      <input type="text" value={newCard.name} onChange={(e) => setNewCard({ ...newCard, name: e.target.value })} placeholder="Nome da carta" />
      <input type="text" value={newCard.image} onChange={(e) => setNewCard({ ...newCard, image: e.target.value })} placeholder="URL da imagem" />

      <h4>Atributos</h4>
      {deck?.attributes?.map((attr, index) => (
        <div key={index}>
          <label>{attr}</label>
          <input
            type="number"
            value={newCard.values[index] || ""}
            onChange={(e) => handleAttributeChange(index, e.target.value)}  // Atualiza o valor do atributo
          />
        </div>
      ))}

      <button onClick={handleAddCard}>Adicionar Carta</button>
    </div>
  );
};

export default DeckEditor;
