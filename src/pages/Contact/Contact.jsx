import { useState, useRef, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { validate as isDisposableEmail } from '@dahoom/disposable-email';
import { emailSeemsValid } from 'email-seems-valid';
import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import styles from "./contact.module.css";

const EMAILJS_CONFIG = {
  blockHeadless: true,
  limitRate: { id: 'contact-form', throttle: 10000 },
  blockList: {
    list: ['@test.com', 'spam', 'test@test.com', 'noreply'],
    watchVariable: 'user_email',
  },
};

const ERROR_MESSAGES = {
  400: 'Error: Verifica que los IDs de servicio y template sean correctos.',
  402: 'Error: Has excedido el límite de emails gratuitos de EmailJS.',
  403: 'Error: Problema con las credenciales. Verifica tu Public Key.',
  404: 'Error: Service ID o Template ID no encontrados.',
  429: 'Error: Demasiadas solicitudes. Por favor, espera unos segundos antes de intentar de nuevo.',
  451: 'Error: No se puede enviar desde este navegador por motivos de seguridad.',
  default: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.',
  config: 'Error de configuración: Las credenciales de EmailJS no están configuradas correctamente.',
};

const VALIDATION_MESSAGES = {
  invalidFormat: 'Por favor, ingresa un email válido (ej: usuario@gmail.com)',
  disposableEmail: 'No se permiten emails temporales o desechables. Usa tu email personal.',
};

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const initializeEmailJS = useCallback(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init({ publicKey, ...EMAILJS_CONFIG });
    }
  }, []);

  useEffect(() => {
    initializeEmailJS();
  }, [initializeEmailJS]);

  const validateEmail = useCallback((email) => {
    if (!email) {
      setEmailError('');
      return false;
    }

    if (!emailSeemsValid(email)) {
      setEmailError(VALIDATION_MESSAGES.invalidFormat);
      return false;
    }

    if (!isDisposableEmail(email)) {
      setEmailError(VALIDATION_MESSAGES.disposableEmail);
      return false;
    }

    setEmailError('');
    return true;
  }, []);

  const handleEmailChange = useCallback((e) => {
    const email = e.target.value;
    if (email) {
      validateEmail(email);
    } else {
      setEmailError('');
    }
  }, [validateEmail]);

  const getErrorMessage = (status) => {
    return ERROR_MESSAGES[status] || ERROR_MESSAGES.default;
  };

  const resetForm = () => {
    form.current.reset();
    setEmailError('');
    setSubmitStatus('');
    setErrorMessage('');
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setErrorMessage('');

    const formData = new FormData(form.current);
    const email = formData.get('user_email');

    if (!validateEmail(email)) {
      setIsSubmitting(false);
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus('error');
      setErrorMessage(ERROR_MESSAGES.config);
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
      setSubmitStatus('success');
      resetForm();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(getErrorMessage(error.status));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = isSubmitting || emailError;

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
                  onChange={handleEmailChange}
                  onBlur={handleEmailChange}
                  className={emailError ? styles.error : ''}
                />
                {emailError && (
                  <p className={styles.emailError}>
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject">Tema:</label>
                <select id="subject" name="subject" required>
                  <option value="">Selecciona un tema</option>
                  <option value="Solicitud para ser socio">Solicitud para ser socio</option>
                  <option value="Propuesta charla">Propuesta charla</option>
                  <option value="Propuesta taller">Propuesta taller</option>
                  <option value="Propuesta evento">Propuesta evento</option>
                  <option value="Dudas Generales">Dudas Generales</option>
                  <option value="Dudas Catastro">Dudas Catastro</option>
                  <option value="Dudas Equipo">Dudas Equipo</option>
                  <option value="Solicitud para ser voluntario">Solicitud para ser voluntario</option>
                  <option value="Ideas o sugerencias">Ideas o sugerencias</option>
                </select>
              </div>

              <div>
                <label htmlFor="message">Contenido:</label>
                <textarea 
                  id="message"
                  name="message" 
                  required 
                  rows="5"
                  placeholder="Cuéntanos más sobre tu consulta o interés..."
                />
              </div>

              <button type="submit" disabled={isFormDisabled}>
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