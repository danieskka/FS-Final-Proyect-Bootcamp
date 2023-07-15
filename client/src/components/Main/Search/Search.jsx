import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from './Card';

const Search = () => {

  // Estado de todos los personajes
  const [characters, setCharacters] = useState([]);

  // Estados para filtros de busqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCh, setFiltered] = useState([]);

  // Estados para Paginacion: Pag Actual y resultados por Pag
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(6);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('https://hp-api.onrender.com/api/characters');
        const data = response.data;
        setCharacters(data);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    fetchFavorites();
  }, []);

  // Filtrar los personajes cada vez que cambia el estado Characters o SearchTerm (los 2 filtros) y los establece en estado filterCh
  useEffect(() => {
    const filtered = characters.filter(favorite => favorite.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFiltered(filtered);
  }, [characters, searchTerm]);

  // Filtro para formulario de busqueda por nombre y lo establece en estado filteredCh
  const handleSearch = (e) => {
    e.preventDefault();
    setFiltered(characters.filter(favorite => favorite.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  // Filtro para botones, se construye una URL y hace una peticion http GET a la API, se establece en estado filteredCh
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
      setFiltered(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Paginación
  const indexOfLastResult = currentPage * resultsPerPage; // Indice del ultimo resultado de la pag actual
  const indexOfFirstResult = indexOfLastResult - resultsPerPage; // Indice del primer resultado de la pag actual
  const currentResults = filteredCh.slice(indexOfFirstResult, indexOfLastResult); // Lista de Characters de la pag actual

  // Nº total de Pags dividiendo la longitud de filteredCh / resultsPerPage -> Y redondeamos hacia arriba
  const totalPages = Math.ceil(filteredCh.length / resultsPerPage);

  // Cambia el Nº de pagina al hacer click en boton, por defecto pagina 1 en parametro
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
      <>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <article className="article-buttons">
        <button className="students" onClick={() => handleFilter("students")}>Hogwarts Students</button>
        <button className="staff" onClick={() => handleFilter("staff")}>Hogwarts Staff</button>
        <button className="gryffindor" onClick={() => handleFilter("house/gryffindor")}>Gryffindor</button>
        <button className="slytherin" onClick={() => handleFilter("house/slytherin")}>Slytherin</button>
        <button className="ravenclaw" onClick={() => handleFilter("house/ravenclaw")}>Ravenclaw</button>
        <button className="hufflepuff" onClick={() => handleFilter("house/hufflepuff")}>Hufflepuff</button>
      </article>


      <section className="card-section">
        {currentResults.map(characters => (
          <Card key={characters.id} character={characters} />
        ))}
      </section>


      {/* Mostrar la paginacion */}
      <article>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </article>
      </>
  )
};

export default Search;