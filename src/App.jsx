import { useCallback, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import BookList from './components/BookList/BookList';
import Favorites from './components/Favorites/Favorites';
import Header from './components/Header/Header';

import SearchAndFilter from './components/SearchAndFilter/SearchAndFilter';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    fromYear: '',
    toYear: '',
    language: '',
    subject: '',
    publisher: ''
  });
  const [sort, setSort] = useState('publish_year_desc');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState('search');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);


  const fetchBooks = useCallback(async (page, query) => {
    if (!query) {
      setBooks([]);
      setTotalPages(0);
      return;
    }

    setLoading(true);
    let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=20`;

    if (filters.language) url += `&language=${filters.language}`;
    if (filters.subject) url += `&subject=${encodeURIComponent(filters.subject)}`;
    if (filters.publisher) url += `&publisher=${encodeURIComponent(filters.publisher)}`;

    try {
      const response = await fetch(url); 
      const data = await response.json();
      
      let filteredDocs = data.docs;
     
      if(filters.fromYear) filteredDocs = filteredDocs.filter(doc => doc.first_publish_year >= parseInt(filters.fromYear));
      if(filters.toYear) filteredDocs = filteredDocs.filter(doc => doc.first_publish_year <= parseInt(filters.toYear));
      if (sort === 'publish_year_desc') filteredDocs.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
      if (sort === 'publish_year_asc') filteredDocs.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
      if (sort === 'edition_count') filteredDocs.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0));

      // This is the key: append new results to the existing list
      setBooks(prevBooks => [...prevBooks, ...filteredDocs]);
      setTotalPages(Math.ceil(data.numFound / 20));
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, sort]);

  useEffect(() => {
    // Don't fetch on initial render with an empty query
    if (debouncedSearchQuery) {
      fetchBooks(currentPage, debouncedSearchQuery);
    }
  }, [currentPage, debouncedSearchQuery, fetchBooks]);



  useEffect(() => {
    setBooks([]); // Clear existing books
    setCurrentPage(1); // Reset to page 1
    setTotalPages(0); // Reset total pages
  }, [debouncedSearchQuery, filters, sort]);


  
  const loadMoreBooks = () => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="app-wrapper">
      <Toaster position="bottom-center" />
      <Header setView={setView} />
      {view === 'search' ? (
        <main>
          <SearchAndFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            setFilters={setFilters}
            sort={sort}
            setSort={setSort}
          />
          <BookList
            books={books}
            loading={loading}
            onLoadMore={loadMoreBooks}
            hasMore={currentPage < totalPages}
          />
    
        </main>
      ) : (
        <Favorites />
      )}
    </div>
  );
}

export default App;