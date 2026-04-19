import { useState } from "react";

export const useFavorites = (key: string) => {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    const saved = localStorage.getItem(`favorites_${key}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);

      localStorage.setItem(
        `favorites_${key}`,
        JSON.stringify([...newSet])
      );

      return newSet;
    });
  };

  return { favorites, toggleFavorite };
};