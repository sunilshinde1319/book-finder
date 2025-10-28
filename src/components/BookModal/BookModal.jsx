import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './BookModal.module.css';

const BookModal = ({ book, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://openlibrary.org${book.key}.json`);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [book.key]);

  const description = details?.description?.value || details?.description || 'No description available.';
  const subjects = book.subject?.slice(0, 7).join(', ') || 'No subjects listed.';

  return (
    <motion.div 
      className={styles.backdrop} 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "-50px", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "50px", opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {loading ? (
            <div className={styles.spinner}></div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2>{book.title}</h2>
              <h4 className={styles.author}>By: {book.author_name?.join(', ')}</h4>
            </div>

            <div className={styles.modalContent}>
              <p className={styles.subjects}><strong>Subjects:</strong> {subjects}</p>
              <p className={styles.description}>{description}</p>
            </div>
            
            {/* --- UPDATED: New Actions Footer with Explicit Close Button --- */}
            <div className={styles.modalActions}>
                <button onClick={onClose} className={styles.closeButton}>
                    Close
                </button>
                <a 
                    href={`https://openlibrary.org${book.key}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.openLibraryLink}
                >
                    View on Open Library
                </a>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookModal;