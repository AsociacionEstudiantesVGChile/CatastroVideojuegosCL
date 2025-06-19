import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

const Volunteer = () => {
  return (
    <>
      <Header />
      <main>
        <h2>¡Involúcrate!</h2>
        <p>
          La Asociación de Estudiantes de Videojuegos Chile siempre está
          buscando personas apasionadas para unirse a nuestro equipo como
          voluntarios. Ya seas estudiante, profesional o simplemente alguien que
          ama los videojuegos, hay muchas formas en las que puedes contribuir.
        </p>

        <section>
          <h2>Beneficios de ser Voluntario</h2>
          <ul>
            <li>
              Adquiere experiencia valiosa en la industria de los videojuegos.
            </li>
            <li>Conéctate con profesionales y otros entusiastas.</li>
            <li>Participa en eventos y proyectos emocionantes.</li>
            <li>Mejora tu currículum y portafolio.</li>
          </ul>
        </section>
        <section>
          <h2>¿Cómo ser Voluntario?</h2>
          <p>
            Si te interesa ser voluntario, por favor completa nuestro formulario
            de postulación. Revisaremos tu solicitud y te contactaremos con
            oportunidades que se ajusten a tus habilidades e intereses.
          </p>
          <a href="join.html">Postula Ahora</a>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Volunteer;
