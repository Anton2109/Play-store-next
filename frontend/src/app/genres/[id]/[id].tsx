"use client";

import Link from "next/link";
import styles from "./Content.module.css";
import { useEffect, useState } from "react";
import GameService from "@/API/GameService";
import { GamesI } from "@/types/GamesI";
import { useParams } from "next/navigation";

const GamesByGenreId = () => {
  const [games, setGames] = useState<GamesI[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await GameService.getGamesByGenreID(Number(id));
        setGames(data.games);
      } catch (error) {
        console.log("Ошибка при получении игр:", error);
      }
    };

    if (id) {
      fetchGames();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      {games.slice(0, 12).map((game) => (
        <Link key={game.id} href={`/games/${game.id}`}>
          <div className={styles.card}>
            <h2 className={styles.title}>{game.name}</h2>
            <img src={game.img} alt={game.name} className={styles.image} />
            <h2 className={styles.price}>{game.price}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GamesByGenreId;
