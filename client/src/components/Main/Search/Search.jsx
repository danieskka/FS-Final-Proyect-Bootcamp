import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from './Card';

const Search = () => {

  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('https://hp-api.onrender.com/api/characters');
        const data = response.data;
        setFavorites(data);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    fetchFavorites();
  }, []);

  useEffect(() => {
    const filtered = favorites.filter(favorite => favorite.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredFavorites(filtered);
  }, [favorites, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredFavorites(favorites.filter(favorite => favorite.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const handleFilter = async (filter) => {
    try {
      let url = `https://hp-api.onrender.com/api/characters`;

      if (filter === "students") {
        url += "/students";
      } else if (filter === "staff") {
        url += "/staff";
      } else if (filter.startsWith("house/")) {
        const house = filter.split("/")[1];
        url += `/house/${house}`;
      }

      const response = await axios.get(url);
      const data = response.data;
      setFilteredFavorites(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <button onClick={() => handleFilter("students")}>Hogwarts Students</button>
      <button onClick={() => handleFilter("staff")}>Hogwarts Staff</button>
      <button onClick={() => handleFilter("house/gryffindor")}>Gryffindor</button>
      <button onClick={() => handleFilter("house/slytherin")}>Slytherin</button>
      <button onClick={() => handleFilter("house/ravenclaw")}>Ravenclaw</button>
      <button onClick={() => handleFilter("house/hufflepuff")}>Hufflepuff</button>

      <div>
        {filteredFavorites.map(favorite => (
          <Card key={favorite.id} character={favorite} />
        ))}
      </div>
    </div>
  )
};

export default Search;