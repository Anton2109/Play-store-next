"use client";

import { useEffect, useState } from "react";
import styles from "./Genre.module.css";
import GameService from "@/API/GameService";
import { GamesI } from "@/types/GamesI";
import { useParams } from "next/navigation";
import GameCard from "@/components/GameCard/GameCard";

const GamesByGenreId = () => {
  const [games, setGames] = useState<GamesI[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await GameService.getGamesByGenreID(Number(id));
        setGames(data);
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
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GamesByGenreId;
