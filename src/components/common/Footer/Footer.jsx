import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 Asociación de Estudiantes de Videojuegos Chile</p>
      <div className={styles.redesSociales}>
        <a
          href="https://discord.gg/tu-invitacion"
          target="_blank"
          title="Discord"
        >
          <img
            src="src/img/icon-discord.png"
            alt="Discord"
            width="32"
            height="32"
          />
        </a>
        <a
          href="https://instagram.com/tuusuario"
          target="_blank"
          title="Instagram"
        >
          <img
            src="src/img/icon-instagram.png"
            alt="Instagram"
            width="32"
            height="32"
          />
        </a>
        <a href="https://youtube.com/tuusuario" target="_blank" title="YouTube">
          <img
            src="src/img/icon-youtube.png"
            alt="YouTube"
            width="32"
            height="32"
          />
        </a>
        <a
          href="https://chat.whatsapp.com/tu-grupo"
          target="_blank"
          title="WhatsApp"
        >
          <img
            src="src/img/icon-whatsapp.png"
            alt="WhatsApp"
            width="32"
            height="32"
          />
        </a>
        <a href="https://tiktok.com/@tuusuario" target="_blank" title="TikTok">
          <img
            src="src/img/icon-tiktok.png"
            alt="TikTok"
            width="32"
            height="32"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
