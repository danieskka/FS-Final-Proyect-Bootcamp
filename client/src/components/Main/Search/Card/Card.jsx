import React, { useState } from "react";
// import FavoriteIcon from '@mui/icons-material/Favorite';

const Card = ({ character }) => {

  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <article className="card">
      <h1>{character.name}</h1>
      {character.image && <img src={character.image} alt={character.name} />}
      <p>{character.description}</p>
      <button onClick={handleShowMore}>{showMore ? "Hide" : "Show"} More</button>
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
