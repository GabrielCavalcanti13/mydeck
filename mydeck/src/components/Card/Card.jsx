import React from "react";
import "./Card.css";

const Card = ({ name, image, attributes, values, onDelete, onChange, isEditable = false }) => {
  return (
    <div className="card-container">
      {onDelete && (
        <button className="delete-button" onClick={onDelete}>
          ×
        </button>
      )}
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className="attributes-container">
        {attributes.map((attr, index) => (
          <div key={index}>
            <label>
              {attr}:{" "}
              {isEditable ? (
                <input
                  type="number"
                  value={values[index] === undefined ? "" : values[index]}
                  onChange={(e) => onChange(index, e.target.value)}
                  placeholder={`${attr}`}
                />
              ) : (
                <span>{values[index]}</span> // Apenas exibe o valor sem permitir edição
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
