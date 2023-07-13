import React from "react";

const Card = ({ character }) => {
  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
    </div>
  );
};

export default Card;
