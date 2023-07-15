import React, { useEffect, useState } from "react";
import axios from 'axios';

const Favorites = () => {
  
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchDDBB = async () => {
      try {
        const response = await axios.get('/api/favorites');
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
          <h1>{favorite.name}</h1>
          <img src={favorite.image} alt={favorite.name} />
        </div>
      ))}
    </div>
  )
};

export default Favorites;