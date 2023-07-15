import React, { useState } from "react";
import axios from 'axios';

const Card = ({ character }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post("/api/favorites", {
        character_id: character.id
      }, {
        withCredentials: true  // Incluir la configuración para enviar cookies
      });
      console.log("Character added to favorites:", response.data);
    } catch (error) {
      console.log("Error adding character to favorites:", error);
    }
  };

  return (
    <article className="card">
      <h1>{character.name}</h1>
      {character.image && <img src={character.image} alt={character.name} />}
      <p>{character.description}</p>
      <button onClick={handleShowMore}>{showMore ? "Hide" : "Show"} More</button>
      
      <button onClick={handleAddToFavorites}>
        Add to Favorites
      </button>
      {showMore && (
        <div className="additional-info">
          <h2>Additional Information:</h2>
          {character.alternate_names.length > 0 && (
            <p>Alternate Names: {character.alternate_names.join(", ")}</p>
          )}
          {character.house && <p>House: {character.house}</p>}
          {character.ancestry && <p>Ancestry: {character.ancestry}</p>}
          {character.wand && (
            <p>
              Wand: {character.wand.wood}, {character.wand.core}, Length: {character.wand.length}"
            </p>
          )}
          {character.patronus && <p>Patronus: {character.patronus}</p>}
          {character.actor && <p>Actor: {character.actor}</p>}
        </div>
      )}
    </article>
  );
};

export default Card;


