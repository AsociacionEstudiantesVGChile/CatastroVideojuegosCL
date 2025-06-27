import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

import styles from "./search.module.css";

import data from "../../data/videojuegos.json"
import CardGame from "../../components/Search/CardGame";

const Search = () => {
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
                <select id="filtro-anio" name="anio">
                  <option value="">Todos</option>
                </select>
              </div>
              <div>
                <label htmlFor="filtro-desarrollador">Desarrollador:</label>
                <select id="filtro-desarrollador" name="desarrollador">
                  <option value="">Todos</option>
                </select>
              </div>
              <div>
                <strong>Etiquetas:</strong>
                <div id="filtros-etiquetas"></div>
              </div>
            </form>
          </aside>
          <div className={styles.resultadosBuscador}>
            <div className={styles.ordenarBuscador}>
              <label htmlFor="ordenar-select">Ordenar:</label>
              <select id="ordenar-select">
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="anio-desc">Más nuevos</option>
                <option value="anio-asc">Más antiguos</option>
              </select>
              <input
                type="text"
                id="search-input"
                placeholder="Buscar por título o palabra clave"
                style={{ marginLeft: "1rem" }}
              />
            </div>
            <div id="search-results">
              {data.map(gameData =>
                <CardGame title={gameData.title} devName={gameData.developer} year={gameData.year}
                          description={gameData.description} imgUrl={gameData.img_url} tags={gameData.tags}/>
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
