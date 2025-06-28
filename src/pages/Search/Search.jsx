import { useState } from "react";

import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

import styles from "./search.module.css";

import data from "../../data/videojuegos.json"
import CardGame from "../../components/Search/CardGame";



const Search = () => {
  const [filterYear, setFilterYear] = useState("All");
  const [filterDev, setFilterDev] = useState("All");
  const [sortOrder, setSortOrder] = useState("az");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState([]);


  function matchesSearch(game, term){
    const lowerTerm = term.toLowerCase();
    return (
      game.title.toLowerCase().includes(lowerTerm) ||
      game.developer.toLowerCase().includes(lowerTerm) ||
      game.year.toString().includes(lowerTerm) ||
      game.tags.some(tag => tag.toLowerCase().includes(lowerTerm))
    );
  }

  function toggleTag(tag){
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  }


  const devs = Array.from(new Set(data.map(game => game.developer)));
  const years = Array.from(new Set(data.map(game => game.year))).sort((a, b) => b - a);
  const allTags = Array.from(new Set(data.flatMap(game => game.tags)));

  const displayedItems = data.filter(game => (filterDev === "All" || game.developer == filterDev) && (filterYear === "All" || game.year == filterYear) && (searchTerm === '' || matchesSearch(game, searchTerm)) && (activeTags.length === 0 || activeTags.every(tag => game.tags.includes(tag)))).sort((a,b) => {
    switch(sortOrder){
      case 'az':
        return a.title.localeCompare(b.title);
      case 'za':
        return b.title.localeCompare(a.title);
      case 'recent':
        return b.year - a.year;
      case 'old':
        return a.year - b.year;
      default:
        return 0;
    }
  });

  return (
    <>
      <Header />
      <section id="search">
        <h1>Buscar Videojuegos Chilenos</h1>
        <div className={styles.buscadorContainer}>
          <aside className={styles.sidebarFiltros}>
            <form id="filtros-form">
              <h3>Filtrar por:</h3>
              <div>
                <label htmlFor="filtro-anio">Año:</label>
                <select value={filterYear} id="filtro-anio" name="anio" onChange={e => setFilterYear(e.target.value)}>
                  <option value="All">Todos</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="filtro-desarrollador">Desarrollador:</label>
                <select value={filterDev} id="filtro-desarrollador" name="desarrollador" onChange={e => setFilterDev(e.target.value)}>
                  <option value="All">Todos</option>
                  {devs.map(dev => (
                    <option key={dev} value={dev}>{dev}</option>
                  ))}
                </select>
              </div>
              <div>
                <strong>Etiquetas:</strong>
                <div id="filtros-etiquetas">
                  {allTags.map(tag => (
                    <button type="button" key={tag} onClick={() => toggleTag(tag)}
                    style={{
                      backgroundColor: activeTags.includes(tag) ? "var(--amarillo)" : "var(--naranjo)"
                    }}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </aside>
          <div className={styles.resultadosBuscador}>
            <div className={styles.ordenarBuscador}>
              <label htmlFor="ordenar-select">Ordenar:</label>
              <select value={sortOrder} id="ordenar-select" onChange={e => setSortOrder(e.target.value)}>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="recent">Más nuevos</option>
                <option value="old">Más antiguos</option>
              </select>
              <input
                type="text"
                id="search-input"
                value={searchTerm}
                placeholder="Buscar por título o palabra clave"
                style={{ marginLeft: "1rem" }}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div id="search-results">
              {displayedItems.map(gameData =>
                <CardGame title={gameData.title} devName={gameData.developer} year={gameData.year}
                  description={gameData.description} imgUrl={gameData.img_url} tags={gameData.tags} />
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Search;
