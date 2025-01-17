"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { GameCardI } from "@/types/GamesI";
import GameService from "@/API/GameService";
import styles from "./Games.module.css";
import RequirementsList from "@/components/Requirements/RequirementsList";

const GamePage = () => {
  const [game, setGame] = useState<GameCardI>();
  const [showRecommended, setShowRecommended] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await GameService.getGameById(Number(id));
        setGame(data);
      } catch (error) {
        console.log("Ошибка при получении игр:", error);
      }
    };

    if (id) {
      fetchGame();
    }
  }, [id]);

  if (!game) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.gameTitle}>{game.name}</h1>

      <div className={styles.gameContent}>
        <div className={styles.imageSection}>
          <img className={styles.gameImage} src={game.img} alt={game.name} />
        </div>

        <div className={styles.infoSection}>
          <p className={styles.description}>{game.info.description}</p>
          <button className={styles.price}>Купить за {game.price} ₽</button>

          <div className={styles.requirementsToggle}>
            <button
              className={`${styles.toggleButton} ${
                !showRecommended ? styles.active : ""
              }`}
              onClick={() => setShowRecommended(false)}
            >
              Минимальные
            </button>
            <button
              className={`${styles.toggleButton} ${
                showRecommended ? styles.active : ""
              }`}
              onClick={() => setShowRecommended(true)}
            >
              Рекомендованные
            </button>
          </div>

          {showRecommended ? (
            <RequirementsList
              requirements={game.systemRequirements.recommended}
              title="Рекомендованные системные требования"
            />
          ) : (
            <RequirementsList
              requirements={game.systemRequirements.minimum}
              title="Минимальные системные требования"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;