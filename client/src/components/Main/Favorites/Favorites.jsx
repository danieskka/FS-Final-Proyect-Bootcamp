import React, { useEffect, useState } from "react";
import axios from 'axios';

const Favorites = () => {
  
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchDDBB = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/favorites');
        const data = response.data;
        setFavorites(data);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    fetchDDBB();
  }, []);

  return (
    <div>
      {favorites.map((favorite, index) => (
        <div key={index}>
          <h1>{favorite.character_name}</h1>
          <img src={favorite.character_img} alt={favorite.character_name} />
        </div>
      ))}
    </div>
  )
};

export default Favorites;