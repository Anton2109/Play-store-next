import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import styles from "./Search.module.css";
import Link from "next/link";
import { GamesI } from "@/types/GamesI";
import GameService from "@/API/GameService";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [results, setResults] = useState<GamesI[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const searchGames = async () => {
      if (debouncedSearchTerm.length < 2) {
        if (isMounted) setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await GameService.searchGames(debouncedSearchTerm);
        if (isMounted) setResults(data);
      } catch (error) {
        console.error("Ошибка поиска:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    searchGames();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearchTerm]);

  return (
    <div className={styles.searchContainer}>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Введите название игры"
          className={styles.input}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxLength={20}
        />
        {searchTerm.length >= 2 && (
          <div className={styles.dropdown}>
            {isLoading ? (
              <div className={styles.loading}>Загрузка...</div>
            ) : results.length > 0 ? (
              results.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className={styles.dropdownItem}
                  onClick={() => setSearchTerm("")}
                >
                  {game.name}
                  {game.img}
                </Link>
              ))
            ) : (
              <div className={styles.noResults}>Ничего не найдено</div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;
