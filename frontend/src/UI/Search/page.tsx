import styles from "./Search.module.css";

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <form action="/submit-form" method="post" className={styles.form}>
        <input
          type="text"
          placeholder="Введите название игры"
          className={styles.input}
        />
      </form>
    </div>
  );
};

export default Search;
