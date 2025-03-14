import React from "react";

const Card = ({ name, image, attributes, values }) => {
  return (
    <div className="card-container">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className="attributes-container">
        {attributes.map((attr, index) => (
          <div key={index}>
            <span className="font-semibold">{attr}:</span>
            <span>{values[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
