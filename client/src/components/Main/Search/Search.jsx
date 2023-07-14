import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from './Card';

const Search = () => {

  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);

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

  // Paginación
  
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredFavorites.slice(indexOfFirstResult, indexOfLastResult);

  const totalPages = Math.ceil(filteredFavorites.length / resultsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        {currentResults.map(favorite => (
          <Card key={favorite.id} character={favorite} />
        ))}
      </div>

      {/* Paginación */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
};

export default Search;