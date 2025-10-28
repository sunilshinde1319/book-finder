import styles from './BookCardSkeleton.module.css';

const BookCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
      <div className={styles.skeletonInfo}>
        <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonText} ${styles.short}`}></div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;