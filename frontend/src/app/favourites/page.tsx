"use client";

import { useEffect, useState } from "react";
import styles from "./Favourites.module.css";
import Loader from "@/UI/Loader/Loader";
import { GamesI } from "@/types/GamesI";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import GameService from "@/API/GameService";
import GameCard from "@/components/GameCard/GameCard";

const Favourites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { favorites } = useFavorites();
  const [favouriteGames, setFavouriteGames] = useState<GamesI[]>([]);

  useEffect(() => {
    const fetchFavoriteGames = async () => {
      try {
        const games = await Promise.all(
          favorites.map((id) => GameService.getGameById(id))
        );
        setFavouriteGames(games.filter((game) => game));
      } catch (error) {
        console.log("Ошибка при получении избранных игр:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteGames();
  }, [favorites]);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      {favouriteGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
      {favouriteGames.length === 0 && (
        <div className={styles.emptyState}>
          <h2>Список избранного пуст</h2>
          <Link href="/" className={styles.backLink}>
            Вернуться к играм
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favourites;
