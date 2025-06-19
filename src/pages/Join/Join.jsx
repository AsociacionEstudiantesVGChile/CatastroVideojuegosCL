import React from "react";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";

const Join = () => {
  return (
    <>
      <Header />
      <main>
        <section>
          <h2>Requisitos para ser Miembro</h2>
          <p>
            Para ser miembro de la Asociación de Estudiantes de Videojuegos
            Chile, debes cumplir con los siguientes requisitos:
          </p>
          <ul>
            <li>Ser estudiante o recién egresado de un área relacionada.</li>
            <li>Tener pasión por los videojuegos y el desarrollo de juegos.</li>
            <li>
              Estar dispuesto a participar en actividades y eventos de la
              asociación.
            </li>
          </ul>
        </section>
        <section>
          <h2>Proceso de Postulación</h2>
          <p>Sigue estos pasos para postularte como miembro:</p>
          <ol>
            <li>Completa el formulario de postulación en línea.</li>
            <li>
              Envía una breve declaración de interés explicando por qué quieres
              unirte.
            </li>
            <li>Asiste a una reunión introductoria con miembros actuales.</li>
          </ol>
        </section>
        <section>
          <h2>Contáctanos</h2>
          <p>
            Si tienes preguntas sobre cómo unirte, no dudes en contactarnos:
          </p>
          <p>
            Email:{" "}
            <a href="mailto:info@estudiantesvideojuegos.cl">
              info@estudiantesvideojuegos.cl
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Join;
