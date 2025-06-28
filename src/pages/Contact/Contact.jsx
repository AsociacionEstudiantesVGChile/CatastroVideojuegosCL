import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import styles from "./contact.module.css";

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setErrorMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus('error');
      setErrorMessage('Error de configuración: Las credenciales de EmailJS no están configuradas correctamente.');
      setIsSubmitting(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
    .then((result) => {
      setSubmitStatus('success');
      form.current.reset();
    })
    .catch((error) => {
      setSubmitStatus('error');
      
      if (error.status === 400) {
        setErrorMessage('Error: Verifica que los IDs de servicio y template sean correctos.');
      } else if (error.status === 402) {
        setErrorMessage('Error: Has excedido el límite de emails gratuitos de EmailJS.');
      } else if (error.status === 403) {
        setErrorMessage('Error: Problema con las credenciales. Verifica tu Public Key.');
      } else if (error.status === 404) {
        setErrorMessage('Error: Service ID o Template ID no encontrados.');
      } else {
        setErrorMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.');
      }
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <>
      <Header />
      <main>
        <section>
          <h2>Contacto</h2>
          <p>¿Tienes alguna pregunta o quieres unirte a nuestra comunidad? Contáctanos.</p>
        </section>

        <section>
          <h2>Información de Contacto</h2>
          <p><strong>Email:</strong> info@estudiantesvideojuegos.cl</p>
          <p><strong>Discord:</strong> <a href="https://discord.gg/tu-invitacion" target="_blank" rel="noopener noreferrer">Únete aquí</a></p>
        </section>

        <section className={styles.formularioContacto}>
          <h2>Envíanos un Mensaje</h2>
          <div className={styles.formularioContainer}>
            <form ref={form} onSubmit={sendEmail}>
              <div>
                <label htmlFor="user_name">Nombre:</label>
                <input 
                  type="text" 
                  id="user_name"
                  name="user_name" 
                  required 
                />
              </div>

              <div>
                <label htmlFor="user_email">Email:</label>
                <input 
                  type="email" 
                  id="user_email"
                  name="user_email" 
                  required 
                />
              </div>

              <div>
                <label htmlFor="subject">Asunto:</label>
                <select id="subject" name="subject" required>
                  <option value="">Selecciona un asunto</option>
                  <option value="Quiero unirme a la asociación">Quiero unirme</option>
                  <option value="Consulta sobre voluntariado">Voluntariado</option>
                  <option value="Consulta sobre eventos">Consulta sobre eventos</option>
                  <option value="Otra consulta">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="message">Mensaje:</label>
                <textarea 
                  id="message"
                  name="message" 
                  required 
                  rows="5"
                  placeholder="Cuéntanos más sobre tu consulta o interés..."
                ></textarea>
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>

              {submitStatus === 'success' && (
                <p style={{color: 'green', marginTop: '1rem'}}>
                  ¡Mensaje enviado correctamente! Te responderemos pronto.
                </p>
              )}

              {submitStatus === 'error' && (
                <div style={{color: 'red', marginTop: '1rem', padding: '1rem', background: '#fee', border: '1px solid #fcc', borderRadius: '4px'}}>
                  <strong>Error al enviar:</strong><br />
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact; 