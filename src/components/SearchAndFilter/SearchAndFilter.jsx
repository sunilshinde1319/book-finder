import { motion } from 'framer-motion';
import styles from './SearchAndFilter.module.css';

const SearchAndFilter = ({ searchQuery, setSearchQuery, filters, setFilters, sort, setSort }) => {
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  
  const languages = ['eng', 'fre', 'ger', 'spa', 'hin', 'rus', 'ita']; // Added more languages

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* --- NEW: Prominent Main Search Bar --- */}
      <div className={styles.searchBarWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Search by Title or Author (e.g., The Lord of the Rings)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.mainSearchInput}
        />
      </div>

      {/* --- NEW: Structured Filter Panel --- */}
      <div className={styles.filterPanel}>
        <div className={styles.filterGroup}>
          <label htmlFor="fromYear">Publication Year</label>
          <div className={styles.yearInputs}>
            <input type="number" id="fromYear" name="fromYear" placeholder="From (e.g., 1954)" value={filters.fromYear} onChange={handleFilterChange} />
            <input type="number" name="toYear" placeholder="To (e.g., 2023)" value={filters.toYear} onChange={handleFilterChange} />
          </div>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="language">Language</label>
          <select id="language" name="language" value={filters.language} onChange={handleFilterChange}>
            <option value="">Any</option>
            {languages.map(lang => <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>)}
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="subject">Subject / Genre</label>
          <input type="text" id="subject" name="subject" placeholder="e.g., Fantasy" value={filters.subject} onChange={handleFilterChange} />
        </div>
        
        <div className={styles.filterGroup}>
          <label htmlFor="publisher">Publisher</label>
          <input type="text" id="publisher" name="publisher" placeholder="e.g., Allen & Unwin" value={filters.publisher} onChange={handleFilterChange} />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="sort">Sort By</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="publish_year_desc">Year (Newest First)</option>
            <option value="publish_year_asc">Year (Oldest First)</option>
            <option value="edition_count">Most Editions</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchAndFilter;