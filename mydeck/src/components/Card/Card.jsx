import React from "react";

const Card = ({name, image, attributes}) => {
    return (
        <div className="card-container">
            <img src={image} alt={name}/>
            <h2>{name}</h2>
            <div className="atributes-container">
                {attributes.map((attr, index) => (
                    <div key={index}>
                    <span className="font-semibold">{attr.label}:</span>
                    <span>{attr.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;