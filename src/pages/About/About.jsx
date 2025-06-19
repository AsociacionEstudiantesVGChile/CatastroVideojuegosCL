import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";

const About = () => {
  return (
    <>
      <Header />
      <main>
        <h2>Sobre Nosotros</h2>
        <img
          src="../img/placeholder-sobre-nosotros.jpg"
          alt="Imagen sobre nosotros"
          width="300"
          height="180"
        />
        <p>
          Somos una Asociación que conecta a representantes de diferentes
          carreras de videojuegos en Chile, con participación de estudiantes de
          la UBO, UGM, UNIACC, USEK, UTAL, UST, UNAB y UFT.
        </p>
        <p>
          <strong>Historia:</strong> Iniciamos en 2023 gracias a la motivación
          de estudiantes de la USEK y la UNAB, con el objetivo de generar
          alianzas y actividades entre estudiantes. Hoy, la asociación está
          abierta a cualquier persona interesada en el desarrollo de
          videojuegos, sumando ya 22 miembros generales y representantes de cada
          institución, además de la directiva.
        </p>
        <section>
          <h2>Misión</h2>
          <img
            src="../img/placeholder-mision-vision.jpg"
            alt="Imagen misión"
            width="300"
            height="180"
          />
          <p>
            Generar oportunidades educativas y de networking para estudiantes,
            interesados y profesionales del desarrollo de videojuegos en Chile,
            mediante la organización de charlas, workshops y eventos que
            promuevan el trabajo en equipo, la inclusión y el respeto,
            fortaleciendo la comunidad y la colaboración en el sector.
          </p>
        </section>
        <section>
          <h2>Visión</h2>
          <img
            src="../img/placeholder-vision.jpg"
            alt="Imagen visión"
            width="300"
            height="180"
          />
          <p>
            Ser la plataforma líder en Chile que une a estudiantes, interesados
            y profesionales del desarrollo de videojuegos, fomentando un espacio
            inclusivo y colaborativo que impulse la innovación y el crecimiento
            conjunto en la industria local.
          </p>
        </section>
        <section>
          <h2>Valores</h2>
          <ul>
            <li>
              <strong>Colaboración:</strong> Trabajo en equipo y cooperación
              para potenciar la industria.
            </li>
            <li>
              <strong>Inclusión:</strong> Espacio accesible y diverso para
              todos.
            </li>
            <li>
              <strong>Respeto:</strong> Ambiente de respeto mutuo y valoración
              de opiniones.
            </li>
            <li>
              <strong>Educación continua:</strong> Aprendizaje constante
              mediante eventos y talleres.
            </li>
            <li>
              <strong>Innovación:</strong> Apoyo a nuevas ideas y creatividad.
            </li>
            <li>
              <strong>Compromiso:</strong> Trabajo activo por el desarrollo de
              la industria nacional.
            </li>
            <li>
              <strong>Solidaridad:</strong> Apoyo y ayuda mutua entre miembros.
            </li>
            <li>
              <strong>Accesibilidad:</strong> Recursos y oportunidades para
              todos.
            </li>
            <li>
              <strong>Transparencia:</strong> Honestidad y comunicación clara.
            </li>
            <li>
              <strong>Diversidad:</strong> Fomento de ideas y culturas diversas.
            </li>
          </ul>
        </section>
        <section>
          <h2>Principales Proyectos y Actividades</h2>
          <ul>
            <li>
              <strong>Game Jams:</strong> Eventos creativos de desarrollo
              colaborativo.
            </li>
            <li>
              <strong>Voluntariado Discord:</strong> Comunidad activa y
              entretenida en Discord.
            </li>
            <li>
              <strong>Voluntariado de Videos Educativos:</strong> Cápsulas
              educativas sobre desarrollo de videojuegos.
            </li>
            <li>
              <strong>Voluntariado de Twitch:</strong> Entrevistas en vivo con
              profesionales de la industria.
            </li>
            <li>
              <strong>Workshops y Charlas Educativas:</strong> Talleres y
              charlas sobre programación, arte y narrativa.
            </li>
            <li>
              <strong>Eventos de Networking:</strong> Encuentros para establecer
              contactos y colaboraciones.
            </li>
            <li>
              <strong>Concursos y Retos de Desarrollo:</strong> Competencias
              para mostrar habilidades y aprender.
            </li>
            <li>
              <strong>Espacios de Feedback:</strong> Revisión y
              retroalimentación de proyectos.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
