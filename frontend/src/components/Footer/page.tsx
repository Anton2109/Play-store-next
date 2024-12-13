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
              <a
                href="https://facebook.com/playstore"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/playstore"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/playstore"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
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
