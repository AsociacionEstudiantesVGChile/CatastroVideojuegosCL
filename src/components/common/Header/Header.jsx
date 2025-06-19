import { Link } from "react-router";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoHeader}>
        <img
          src="src/img/logo-asociacion.png"
          alt="Logo Asociación de Estudiantes de Videojuegos Chile"
          width="64"
          height="64"
        />
        <h1>Asociación de Estudiantes de Videojuegos Chile</h1>
      </div>
      <nav className={styles.navPrincipal}>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/about">Sobre Nosotros</Link>
          </li>
          <li>
            <Link to="/join">Cómo Unirse</Link>
          </li>
          <li>
            <Link to="/search">Buscar Videojuegos Chilenos</Link>
          </li>
          <li>
            <Link to="/volunteer">Oportunidades de Voluntariado</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
