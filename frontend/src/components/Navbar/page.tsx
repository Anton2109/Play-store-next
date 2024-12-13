import Search from "@/UI/Search/page";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>

      <h1 className={styles.logo}>
        Play<span>Store</span>
      </h1>

      <div className={styles.navWrapper}>

        <nav className={styles.nav}>

          <ul className={styles.navList}>
            <li className={styles.navItem}>Главная</li>
            <li className={styles.navItem}>Скидки</li>
            <li className={styles.navItem}>Популярные</li>
            <li className={styles.navItem}>
              <Search />
            </li>
            <li className={styles.navItem}>Избранное</li>
            <li className={styles.navItem}>Мои покупки</li>
          </ul>

        </nav>
        
      </div>
    </div>
  );
};

export default Navbar;
