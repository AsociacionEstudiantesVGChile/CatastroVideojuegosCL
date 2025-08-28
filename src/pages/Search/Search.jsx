
import { useState } from "react";

import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

import styles from "./search.module.css";

import games_data from "../../data/videojuegos.json"
import devs_data from "../../data/desarrolladores.json"
import regions_data from "../../data/regions.json"
import CardGame from "../../components/Search/CardGame";
import { useFilter } from "../../hooks/useFilter";
import FilterSection from "../../components/Search/FilterSection";

const Search = () => {

  //Custom Hook
  const { filters, handleCheckboxChange, isChecked, clearCategory } = useFilter(['year', 'region', 'genre', 'language', 'platform']);

  //States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("az");
  const [activeSection, setActiveSection] = useState("year");

  //Props to be passed to FilterSection Component
  const filterProps = { filters, isChecked, handleCheckboxChange, activeSection, setActiveSection, clearCategory }


  const game_years = Array.from(new Set(games_data.map(game => game.year)));

  //Filter options lists 
  const years = Array.from(new Set([...game_years, ...devs_data.map(dev => dev.year)].filter(item => item != null))).sort((a, b) => b - a);
  const genres = Array.from(new Set(games_data.map(game => game.tags.genre).flat())).sort();
  const languages = Array.from(new Set(games_data.map(game => game.tags.language).flat()));
  const platforms = Array.from(new Set(games_data.map(game => game.tags.platforms).flat()));

  //Object to map a game name with its developer name
  const dev_info = {};
  devs_data.forEach(dev => {
    dev.games.forEach(game => {
      dev_info[`${game}/${dev.name}`] = dev;
    })
  })

  //Games to show as a result of applied filters
  const displayedItems = games_data.filter(game => (
    filters.year.length === 0 || filters.year.includes(game.year) ||
    filters.year.includes(dev_info[`${game.title}/${game.developer}`].year)) &&
    (filters.region.length === 0 || dev_info[`${game.title}/${game.developer}`].region.some(region => filters.region.includes(region))) &&
    (filters.genre.length === 0 || game.tags.genre.some(genre => filters.genre.includes(genre))) &&
    (filters.language.length === 0 || game.tags.language.some(language => filters.language.includes(language))) &&
    (filters.platform.length === 0 || game.tags.platforms.some(platform => filters.platform.includes(platform))) &&
    (searchTerm === "" || matchesSearch(game, searchTerm))).sort((a, b) => {
      switch (sortOrder) {
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        case 'recent':
          return dev_info[`${b.title}/${b.developer}`].year - dev_info[`${a.title}/${a.developer}`].year;
        case 'old':
          return dev_info[`${a.title}/${a.developer}`].year - dev_info[`${b.title}/${b.developer}`].year;
        default:
          return 0;
      }
    });


  function matchesSearch(game, term) {
    const lowerTerm = term.toLowerCase();
    return (
      game.title.toLowerCase().includes(lowerTerm) ||
      game.developer.toLowerCase().includes(lowerTerm)
    );
  }


  return (
    <>
      <Header />
      <section id="search">
        <div className={styles.topContainer}>
          <h1>Buscar Videojuegos Chilenos</h1>
          <a target="blank" className={styles.formButton} href="https://forms.gle/FzJGmLpAr7zrnb2x5">Sube tu juego!</a>
        </div>

        <div className={styles.buscadorContainer}>
          <aside className={styles.sidebarFiltros}>
            <h3>Filtrar por:</h3>
            <FilterSection title="Año" options={years} category="year" filterProps={filterProps} />
            <FilterSection title="Regiones" options={regions_data.map(region => region.value)}
              category="region" names={regions_data.map(region => region.name)} filterProps={filterProps} />
            <FilterSection title="Géneros" options={genres} category="genre" filterProps={filterProps} />
            <FilterSection title="Idiomas" options={languages} category="language" filterProps={filterProps} />
            <FilterSection title="Plataformas" options={platforms} category="platform" filterProps={filterProps} />
          </aside>

          <div className={styles.resultadosBuscador}>
            <div className={styles.ordenarBuscador}>
              <label htmlFor="sort-select">Ordenar:</label>
              <select value={sortOrder} id="sort-select" onChange={e => setSortOrder(e.target.value)}>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="recent">Más nuevos</option>
                <option value="old">Más antiguos</option>
              </select>
              <input
                type="text"
                id="search-input"
                placeholder="Buscar por título o palabra clave"
                style={{ marginLeft: "1rem" }}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>


            <div id="search-results" className={styles.resultsContainer}>
              {displayedItems.map(gameData =>
                <a className={styles.cardGame} href={`#/game/${games_data.findIndex(item => item === gameData)}`}>
                  <CardGame info={gameData} dev_id={devs_data.findIndex(item => item === dev_info[`${gameData.title}/${gameData.developer}`])}/>
                </a>
              )}
            </div>
          </div>
        </div>
      </section >
      <Footer />
    </>
  )
}

export default Search;