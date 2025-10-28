import { AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import BookCard from '../BookCard/BookCard';
import BookModal from '../BookModal/BookModal';
import styles from './Favorites.module.css';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const [selectedBook, setSelectedBook] = useState(null); // ADDED: State for modal

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Your Favorites</h2>
        {favorites.length > 0 ? (
          <div className={styles.grid}>
            {favorites.map(book => (
              // UPDATED: Added a real onCardClick handler
              <BookCard 
                key={book.key} 
                book={book} 
                onCardClick={() => setSelectedBook(book)} 
              />
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>You haven't added any favorites yet.</p>
        )}
      </div>

      {/* ADDED: Modal logic, same as in BookList.jsx */}
      <AnimatePresence>
        {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
      </AnimatePresence>
    </>
  );
};

export default Favorites;