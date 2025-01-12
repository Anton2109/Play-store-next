"use client";

import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (gameId: number) => {
    setFavorites((prev: number[]) => {
      const newFavorites = prev.includes(gameId)
        ? prev.filter((id: number) => id !== gameId)
        : [...prev, gameId];
      return newFavorites;
    });
  };

  return { favorites, toggleFavorite };
};
