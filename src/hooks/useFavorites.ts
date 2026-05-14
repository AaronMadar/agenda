import { useState } from 'react';

export const useFavorites = (key: string) => {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    const saved = localStorage.getItem(`favorites_${key}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      localStorage.setItem(`favorites_${key}`, JSON.stringify([...newSet]));

      return newSet;
    });
  };

  return { favorites, toggleFavorite };
};
