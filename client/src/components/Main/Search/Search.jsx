import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from './Card';

const Search = () => {

  // Estado de todos los personajes
  const [characters, setCharacters] = useState([]);

  // Estados para filtros de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCh, setFiltered] = useState([]);

  // Estados para paginación: Página actual y resultados por página
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
    const filtered = characters.filter(character => character.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFiltered(filtered);
  }, [characters, searchTerm]);

  // Filtro para formulario de búsqueda por nombre y lo establece en estado filteredCh
  const handleSearch = (e) => {
    e.preventDefault();
    setFiltered(characters.filter(favorite => favorite.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  // Filtro para botones, se construye una URL y hace una petición HTTP GET a la API, se establece en estado filteredCh
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
  const indexOfLastResult = currentPage * resultsPerPage; // Índice del último resultado de la página actual
  const indexOfFirstResult = indexOfLastResult - resultsPerPage; // Índice del primer resultado de la página actual
  const currentResults = filteredCh.slice(indexOfFirstResult, indexOfLastResult); // Lista de personajes de la página actual

  // Número total de páginas dividiendo la longitud de filteredCh / resultsPerPage y redondeando hacia arriba
  const totalPages = Math.ceil(filteredCh.length / resultsPerPage);

  // Cálculo del rango de páginas para mostrar
  const range = 2; // Número de páginas a mostrar antes y después de la página actual
  const startPage = Math.max(1, currentPage - range); // Nos aseguramos que la pagina inicial no sea menor que 1
  const endPage = Math.min(totalPages, currentPage + range); // Asegurarnos de que la pagina final no supere el nº total de pags

  // Cambia el número de página al hacer clic en el botón
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Enter a name ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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

      {/* Mostrar la paginación */}
      <article className="pagination-article">
        {startPage > 1 && ( // Comprobacion -> de la pagina de inicio es > 1, si lo es, muestra la paginacion
          <>
            <button onClick={() => paginate(1)}>1</button> {/* Mostrar boton para la pag 1 que esta fijo */}
            {startPage > 2 && <span>...</span>} {/* Aqui mostramos [...] para indicar que hay mas pags que no se ven */}
          </>
        )}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          if (pageNumber >= startPage && pageNumber <= endPage) { {/* Verificacion -> nº Pag dentro del rango a mostrar */}
            return (
              <button key={index} onClick={() => paginate(pageNumber)}>
                {pageNumber}
              </button>
            );
          }
          return null;
        })}
        {endPage < totalPages && ( // Comprobacion -> de la pagina de final sea < que el nº total de paginas
          <>
            {endPage < totalPages - 1 && <span>...</span>} {/* Aqui mostramos [...] para indicar que hay mas pags que no se ven */}
            <button onClick={() => paginate(totalPages)}>{totalPages}</button>
          </>
        )}
      </article>
    </>
  );
};

export default Search;