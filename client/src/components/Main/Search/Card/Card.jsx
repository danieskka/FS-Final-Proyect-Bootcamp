import React from "react";

const Card = ({ character }) => {
  return (
    <div>
      <h1>{character.name}</h1>
      {character.image && <img src={character.image} alt={character.name} />}
      <p>{character.description}</p>
    </div>
  );
};

export default Card;