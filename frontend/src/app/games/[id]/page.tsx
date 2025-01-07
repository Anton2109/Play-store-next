"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { GameCardI } from "@/types/GamesI";
import GameService from "@/API/GameService";
import styles from "./Games.module.css";

const GamePage = () => {
  const [game, setGame] = useState<GameCardI>();
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

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.gameTitle}>{game?.name}</h1>

      <div className={styles.gameContent}>
        <div className={styles.imageSection}>
          <img
            className={styles.gameImage}
            src={game?.info.img}
            alt={game?.name}
          />
        </div>

        <div className={styles.infoSection}>
          <p className={styles.description}>{game?.info.description}</p>
          <div className={styles.price}>{game?.price} ₽</div>

          <div className={styles.requirementsSection}>
            <h2 className={styles.requirementsTitle}>Системные требования</h2>
            <div className={styles.requirementsList}>
              <div className={styles.requirementItem}>
                <span className={styles.requirementLabel}>Windows</span>
                <span className={styles.requirementValue}>{game?.windows}</span>
              </div>
              <div className={styles.requirementItem}>
                <span className={styles.requirementLabel}>Процессор</span>
                <span className={styles.requirementValue}>
                  {game?.processor}
                </span>
              </div>
              <div className={styles.requirementItem}>
                <span className={styles.requirementLabel}>
                  Оперативная память
                </span>
                <span className={styles.requirementValue}>{game?.RAM} GB</span>
              </div>
              <div className={styles.requirementItem}>
                <span className={styles.requirementLabel}>Видеокарта</span>
                <span className={styles.requirementValue}>
                  {game?.graphicsCard}
                </span>
              </div>
              <div className={styles.requirementItem}>
                <span className={styles.requirementLabel}>DirectX</span>
                <span className={styles.requirementValue}>{game?.DirectX}</span>
              </div>
              <div className={styles.requirementItem}>
                <span className={styles.requirementLabel}>Место на диске</span>
                <span className={styles.requirementValue}>
                  {game?.diskSpace}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
