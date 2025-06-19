import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";

import styles from "./home.module.css";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <h2>Bienvenido a la Asociación de Estudiantes de Videojuegos Chile</h2>
        <p>
          Tu espacio para todo lo relacionado con los videojuegos en Chile.
          Explora nuestras secciones para conocer más sobre la asociación,
          participar y descubrir juegos locales.
        </p>
        <section>
          <h3>Sobre Nosotros</h3>
          <img
            src="src/img/placeholder-sobre-nosotros.jpg"
            alt="Imagen sobre nosotros"
            width="300"
            height="180"
          />
          <p>
            Somos una Asociación que conecta a representantes de diferentes
            carreras de videojuegos en Chile, con participación de estudiantes
            de la UBO, UGM, UNIACC, USEK, UTAL, UST, UNAB y UFT.
          </p>
          <p>
            <strong>Historia:</strong> Iniciamos en 2023 gracias a la motivación
            de estudiantes de la USEK y la UNAB, con el objetivo de generar
            alianzas y actividades entre estudiantes. Hoy, la asociación está
            abierta a cualquier persona interesada en el desarrollo de
            videojuegos, sumando ya 22 miembros generales y representantes de
            cada institución, además de la directiva.
          </p>
          <a href="sections/about.html">Leer más</a>
        </section>
      </main>
      <section id="noticias-recientes" className={styles.noticiasRecientes}>
        <h2>Noticias Recientes</h2>
        <div className={styles.carruselNoticias}>
          <button className={styles.carruselFlecha} id="prevNoticia">
            &#8592;
          </button>
          <div className={styles.carruselPaneles}>
            <article className={styles.noticiaPanel}>
              <img
                src="src/img/placeholder-noticia1.jpg"
                alt="Imagen noticia 1"
                width="300"
                height="180"
              />
              <h3>Lanzamiento de la nueva GameJam Chile 2025</h3>
              <p>
                ¡Ya están abiertas las inscripciones para la GameJam Chile 2025!
                Participa y demuestra tu talento junto a otros desarrolladores
                nacionales.
              </p>
              <a href="#">Leer más</a>
            </article>
            <article className={styles.noticiaPanel}>
              <img
                src="src/img/placeholder-noticia2.jpg"
                alt="Imagen noticia 2"
                width="300"
                height="180"
              />
              <h3>Charla: Mujeres en la industria de videojuegos</h3>
              <p>
                No te pierdas nuestra próxima charla enfocada en el rol de las
                mujeres en el desarrollo de videojuegos en Chile.
              </p>
              <a href="#">Leer más</a>
            </article>
            <article className={styles.noticiaPanel}>
              <img
                src="img/placeholder-noticia3.jpg"
                alt="Imagen noticia 3"
                width="300"
                height="180"
              />
              <h3>Nuevo convenio con universidades</h3>
              <p>
                La asociación ha firmado un convenio con universidades para
                impulsar la formación y empleabilidad en el sector.
              </p>
              <a href="#">Leer más</a>
            </article>
          </div>
          <button className={styles.carruselFlecha} id="nextNoticia">
            &#8594;
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
