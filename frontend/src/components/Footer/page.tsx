import { FaTelegram, FaVk, FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3>Контакты</h3>
          <p>Email: info@playstore.com</p>
          <p>Телефон: +7 (123) 456-78-90</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Социальные сети</h3>
          <ul>
            <li>
              <a href="!#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                Vkontakte
                <FaVk className={styles.icon} />
              </a>
            </li>
            <li>
              <a href="!#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                Telegram
                <FaTelegram className={styles.icon} />
              </a>
            </li>
            <li>
              <a href="!#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                Instagram
                <FaInstagram className={styles.icon} />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Полезные ссылки</h3>
          <ul>
            <li>
              <a href="/privacy-policy">Политика конфиденциальности</a>
            </li>
            <li>
              <a href="/terms-of-service">Условия использования</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} PlayStore.</p>
      </div>
    </footer>
  );
};

export default Footer;
