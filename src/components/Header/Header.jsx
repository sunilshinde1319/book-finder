import { motion } from 'framer-motion';
import styles from './Header.module.css';


const Header = ({ setView }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerSection}></div>

      <motion.div
        className={styles.titleContainer}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className={styles.title}>
          <span className={styles.titleIcon}>📚</span> Book Finder
        </h1>
      </motion.div>
      
      <nav className={`${styles.nav} ${styles.headerSection}`}>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setView('search')}>Search</motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setView('favorites')}>Favorites</motion.button>
   
      </nav>
    </header>
  );
};

export default Header;