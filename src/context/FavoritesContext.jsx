import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const localData = localStorage.getItem('favorites');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book) => {
    if (!favorites.find(fav => fav.key === book.key)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFavorite = (bookKey) => {
    setFavorites(favorites.filter(book => book.key !== bookKey));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};