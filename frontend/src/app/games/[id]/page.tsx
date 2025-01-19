"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { GameCardI } from "@/types/GamesI";
import Image from "next/image";
import GameService from "@/API/GameService";
import styles from "./Games.module.css";
import RequirementsList from "@/components/Requirements/RequirementsList";
import Loader from "@/UI/Loader/Loader";

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
    return <Loader />;
  }

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.gameTitle}>{game.name}</h1>

      <div className={styles.gameContent}>
        {/* <div className={styles.imageSection}>
          <img className={styles.gameImage} src={game.img} alt={game.name} />
        </div> */}

        <div className={styles.imageSection}>
          {game?.img ? (
            <Image
              src={game.img}
              width={565}
              height={565}
              alt={game.name || "Изображение"}
            />
          ) : (
            <div className={styles.placeholder}>Изображение отсутствует</div>
          )}
        </div>

        <div className={styles.infoSection}>
          <p className={styles.description}>{game.info.description}</p>
          <div className={styles.buttonContainer}>
            <button className={styles.priceButton}>
              Купить за {game.price} ₽
            </button>

            <button className={styles.priceButton}>Добавить в корзину</button>
          </div>

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
