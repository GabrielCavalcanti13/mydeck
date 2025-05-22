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
      <div className="card-image-wrapper">
        <img src={image} alt={name} />
        <h2 className="card-name">{name}</h2>
        <div className="attributes-overlay">
          {attributes.map((attr, index) => (
            <label key={index}>
              {attr}:
              {isEditable ? (
                <input
                  type="number"
                  value={values[index] === undefined ? "" : values[index]}
                  onChange={(e) => onChange(index, e.target.value)}
                  placeholder={`${attr}`}
                />
              ) : (
                <span>{values[index]}</span>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
