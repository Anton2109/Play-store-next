"use client"

import Link from "next/link";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { GenresI } from "@/types/GenresI";
import GameService from "@/API/GameService";
import Loader from "@/UI/Loader/Loader";

const HomePage = () => {
  const [genres, setGneres] = useState<GenresI[]>([])

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await GameService.getGenres();
        setGneres(data)
      } catch (error) {
        console.log('Ошибка при получении жанров:', error)
      }
    };

    fetchGenres();
  }, [])

  if (!genres.length) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      {genres.slice(0, 12).map((genre) => (
        <Link key={genre.id} href={`/genres/${genre.id}`}>
          <div className={styles.card}>
            <img src={genre.genresImg} alt={genre.name} className={styles.image} />
            <h2 className={styles.title}>{genre.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
