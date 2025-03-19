import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../../services/deckService";

const DeckCreator = () => {
  const [deckName, setDeckName] = useState("");
  const [attributeCount, setAttributeCount] = useState(3);
  const [attributes, setAttributes] = useState(["", "", ""]);
  const navigate = useNavigate();

  const handleCreateDeck = async () => {
    if (!deckName || attributes.some(attr => attr.trim() === "")) return;

    const newDeck = await createDeck({ name: deckName, attributes });

    if (newDeck?.id) {
      navigate(`/edit/${newDeck.id}`);
    }
  };

  const handleAttributeChange = (index, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index] = value;
    setAttributes(updatedAttributes);
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

      <label>Quantidade de Atributos:</label>
      <select
        value={attributeCount}
        onChange={(e) => {
          const count = parseInt(e.target.value, 10);
          setAttributeCount(count);
          setAttributes(new Array(count).fill(""));
        }}
      >
        {[3, 4, 5].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <h3>Definir Atributos</h3>
      {attributes.map((attr, index) => (
        <input
          key={index}
          type="text"
          value={attr}
          onChange={(e) => handleAttributeChange(index, e.target.value)}
          placeholder={`Atributo ${index + 1}`}
        />
      ))}

      <button onClick={handleCreateDeck}>Criar Deck</button>
    </div>
  );
};

export default DeckCreator;
