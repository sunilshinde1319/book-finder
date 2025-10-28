import { motion } from 'framer-motion';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { FavoritesContext } from '../../context/FavoritesContext';
import styles from './BookCard.module.css';


const BookCard = ({ book, onCardClick }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some(fav => fav.key === book.key);

   const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(book.key);
      toast.error('Removed from favorites'); // Firing a toast
    } else {
      addFavorite(book);
      toast.success('Added to favorites!'); // Firing a toast
    }
  };

  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/150';

  return (
    <motion.div 
      className={styles.card} 
      onClick={onCardClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img src={coverUrl} alt={book.title} className={styles.cover} loading="lazy" />
      <div className={styles.info}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author_name?.join(', ')}</p>
        <p className={styles.meta}>First Published: {book.first_publish_year}</p>
        <p className={styles.meta}>Editions: {book.edition_count}</p>
      </div>
      <button onClick={handleFavoriteClick} className={styles.favButton}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </motion.div>
  );
};

export default BookCard;