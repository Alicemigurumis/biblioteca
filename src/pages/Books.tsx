import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { books } from '../data/mockData';
import MediaCard from '../components/common/MediaCard';
import MediaFilters from '../components/filters/MediaFilters';
import { Media } from '../types';

const Books: React.FC = () => {
  const [filteredBooks, setFilteredBooks] = useState<Media[]>(books);
  const [filters, setFilters] = useState({
    tags: [] as string[],
    rating: 0,
    year: ''
  });
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    let result = [...books];
    
    // Apply filters
    if (filters.tags.length > 0) {
      result = result.filter(book => 
        filters.tags.some(tag => book.tags.includes(tag))
      );
    }
    
    if (filters.rating > 0) {
      result = result.filter(book => book.rating >= filters.rating);
    }
    
    if (filters.year) {
      // Handle range like "2010-2020" or single year "2015"
      if (filters.year.includes('-')) {
        const [startYear, endYear] = filters.year.split('-').map(y => parseInt(y.trim()));
        result = result.filter(book => {
          const bookYear = parseInt(book.year);
          return bookYear >= startYear && bookYear <= endYear;
        });
      } else {
        const year = parseInt(filters.year.trim());
        result = result.filter(book => parseInt(book.year) === year);
      }
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortField === 'year') {
        comparison = parseInt(a.year) - parseInt(b.year);
      } else if (sortField === 'rating') {
        comparison = a.rating - b.rating;
      } else if (sortField === 'dateAdded') {
        comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredBooks(result);
  }, [filters, sortField, sortOrder]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Books</h1>
        <p className="text-text-secondary">
          Browse and manage your book collection. Filter by tags, rating, or year.
        </p>
      </div>
      
      <MediaFilters 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        mediaType="books"
      />
      
      {filteredBooks.length > 0 ? (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBooks.map(book => (
            <MediaCard key={book.id} media={book} />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-text-secondary text-lg mb-4">No books match your filters</p>
          <button 
            onClick={() => setFilters({ tags: [], rating: 0, year: '' })}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Books;