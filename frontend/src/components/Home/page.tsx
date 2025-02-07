"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Home.module.css";
import { GenresI } from "@/types/GenresI";
import { GamesI } from "@/types/GamesI";
import GameService from "@/API/GameService";
import Loader from "@/UI/Loader/Loader";
import Image from "next/image";

const MainPage = () => {
  const [genres, setGenres] = useState<GenresI[]>([]);
  const [games, setGames] = useState<GamesI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  //   {
  //     id: 1,
  //     title: "Cyber Revolution",
  //     genre: "Экшен",
  //     price: 2999,
  //     rating: 4.9,
  //   },
  //   { id: 2, title: "Neon Warriors", genre: "RPG", price: 2599, rating: 4.8 },
  //   {
  //     id: 3,
  //     title: "Synthwave Drift",
  //     genre: "Гонки",
  //     price: 1999,
  //     rating: 4.7,
  //   },
  //   {
  //     id: 4,
  //     title: "Cyber Revolution",
  //     genre: "Экшен",
  //     price: 2999,
  //     rating: 4.9,
  //   },
  //   { id: 5, title: "Neon Warriors", genre: "RPG", price: 2599, rating: 4.8 },
  //   {
  //     id: 6,
  //     title: "Synthwave Drift",
  //     genre: "Гонки",
  //     price: 1999,
  //     rating: 4.7,
  //   },
  // ];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await GameService.getGames();
        setGames(data);
      } catch (error) {
        console.error("Ошибка при получении игр", error);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await GameService.getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Ошибка при получении жанров:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.mainContent}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Окунитесь в мир <span>неоновых</span> приключений
          </h1>
          <p>Самые горячие новинки игровой индустрии</p>
          <button className={styles.ctaButton}>Исследовать сейчас</button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Популярные игры</h2>
        <div className={styles.gamesGrid}>
          {games.slice(0, 6).map((game) => (
            <Link 
            key={game.id}
            href={`/games/${game.id}`} 
            className={styles.gameCard}>
              <div className={styles.gameImage}>
                <Image
                  src={game.img}
                  width={275}
                  height={200}
                  alt={game.name}
                />
              </div>
              <h3>{game.name}</h3>
              <div className={styles.gameFooter}>
                <span className={styles.price}>{game.price} ₽</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* <section className={styles.previewSection}>
        <div className={styles.previewContent}>
          <h2 className={styles.sectionTitle}>Скоро выйдут</h2>
          <div className={styles.previewScroller}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={styles.previewItem}></div>
            ))}
          </div>
        </div>
      </section> */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Игровые жанры</h2>
        <div className={styles.genresGrid}>
          {genres.slice(0, 12).map((genre) => (
            <Link
              key={genre.id}
              href={`/genres/${genre.id}`}
              className={styles.genreCard}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={genre.genresImg}
                  width={305}
                  height={200}
                  alt={genre.name}
                  className={styles.genreImage}
                />
                <div className={styles.genreOverlay} />
              </div>
              <h3 className={styles.genreTitle}>{genre.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
