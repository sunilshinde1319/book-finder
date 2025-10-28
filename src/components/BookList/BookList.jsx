import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import BookCard from '../BookCard/BookCard';
import BookCardSkeleton from '../BookCard/BookCardSkeleton';
import BookModal from '../BookModal/BookModal';
import styles from './BookList.module.css';


const BookList = ({ books, loading, onLoadMore, hasMore }) => {
  const [selectedBook, setSelectedBook] = useState(null);

 
  const { ref, inView } = useInView({
    threshold: 0, 
    rootMargin: '200px',
  });

  
  useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore();
    }
  }, [inView, hasMore, loading, onLoadMore]);
  
  // UPDATED: Show skeletons only on the very first load
  const showSkeleton = loading && books.length === 0;

  if (showSkeleton) {
    return (
      <div className={styles.grid}>
        {Array(20).fill(0).map((_, index) => <BookCardSkeleton key={index} />)}
      </div>
    );
  }

  if (books.length === 0 && !loading) {
    return <div className={styles.emptyState}>No books found. Try another search!</div>;
  }
  
  // Stagger animation variants (optional but nice)
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <>
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {books.map((book) => (
          <motion.div key={`${book.key}-${Math.random()}`} variants={itemVariants}>
            <BookCard book={book} onCardClick={() => setSelectedBook(book)} />
          </motion.div>
        ))}
      </motion.div>
      
     
      {hasMore && (
        <div ref={ref} className={styles.sentinel}>
          {loading && <div className={styles.spinner}></div>}
        </div>
      )}

      <AnimatePresence>
        {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
      </AnimatePresence>
    </>
  );
};

export default BookList;