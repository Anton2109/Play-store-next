"use client";

import Link from "next/link";
import styles from "./GameCard.module.css"; // Перенесите стили сюда
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { GamesI } from "@/types/GamesI";
import { useFavorites } from "@/hooks/useFavorites";

interface GameCardProps {
  game: GamesI;
}

const GameCard = ({ game }: GameCardProps) => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className={styles.cardWrapper}>
      <Link href={`/games/${game.id}`}>
        <div className={styles.card}>
          <h2 className={styles.title}>{game.name}</h2>
          <img src={game.img} alt={game.name} className={styles.image} />
          <h2 className={styles.price}>{game.price}</h2>
          <button
            className={styles.favoriteBtn}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(game.id);
            }}
          >
            {favorites.includes(game.id) ? (
              <FaHeart
                className={`${styles.heartIcon} ${styles.heartFilled}`}
              />
            ) : (
              <FaRegHeart className={styles.heartIcon} />
            )}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
