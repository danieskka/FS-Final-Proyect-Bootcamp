import React, { useEffect, useState } from "react";
import axios from 'axios';

const Favorites = () => {
  
  const [favorites, setFavorites] = useState([]);

  const handleRemoveFav = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`api/favorites/${id}`, {
        withCredentials: true
      });
      console.log("Character removed succesfully:", response);

      // Para filtrar los favoritos cuando se borran y no tener que actualizar la pag
      setFavorites((updateFav) => updateFav.filter((favorites) => favorites[0].id !== id));

    } catch (error) {
      console.log("Error removing character from favorites;", error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/favorites');
        const data = response.data;
        console.log(data);

        // Obtener los character_ids del objeto data
        const characterIds = data.character_ids;

        // Consultar la API para obtener la información de los personajes
        const charactersData = await Promise.all(characterIds.map(async (characterId) => {
          const characterResponse = await axios.get(`https://hp-api.onrender.com/api/character/${characterId}`);
          return characterResponse.data;
        }));

        setFavorites(charactersData);
        console.log(charactersData);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    fetchFavorites();
  }, []);

  return (
    <section className="card-section">
      {favorites.map((favorite, index) => (
        <article key={index} className="favorite-card">
          <h1>{favorite[0].name}</h1>
          <img src={favorite[0].image} alt={favorite[0].name} />
          <button onClick={() => handleRemoveFav(favorite[0].id)}> Remove Favorite</button>
        </article>
      ))}
    </section>
  )
};

export default Favorites;