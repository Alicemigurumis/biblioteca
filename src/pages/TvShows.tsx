import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { tvShows } from '../data/mockData';
import MediaCard from '../components/common/MediaCard';
import MediaFilters from '../components/filters/MediaFilters';
import { Media } from '../types';

const TvShows: React.FC = () => {
  const [filteredShows, setFilteredShows] = useState<Media[]>(tvShows);
  const [filters, setFilters] = useState({
    tags: [] as string[],
    rating: 0,
    year: ''
  });
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    let result = [...tvShows];
    
    // Apply filters
    if (filters.tags.length > 0) {
      result = result.filter(show => 
        filters.tags.some(tag => show.tags.includes(tag))
      );
    }
    
    if (filters.rating > 0) {
      result = result.filter(show => show.rating >= filters.rating);
    }
    
    if (filters.year) {
      // Handle complex year ranges for TV shows (e.g., "2010-2015")
      result = result.filter(show => {
        const yearString = show.year;
        if (yearString.includes('-')) {
          const [startYear, endYear] = yearString.split('-').map(y => parseInt(y));
          
          if (filters.year.includes('-')) {
            const [filterStart, filterEnd] = filters.year.split('-').map(y => parseInt(y.trim()));
            // Check if there's any overlap in the year ranges
            return !(startYear > filterEnd || endYear < filterStart);
          } else {
            const year = parseInt(filters.year.trim());
            return year >= startYear && year <= endYear;
          }
        } else {
          // Single year for show
          const showYear = parseInt(yearString);
          if (filters.year.includes('-')) {
            const [filterStart, filterEnd] = filters.year.split('-').map(y => parseInt(y.trim()));
            return showYear >= filterStart && showYear <= filterEnd;
          } else {
            return showYear === parseInt(filters.year.trim());
          }
        }
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortField === 'year') {
        // For year sorting, use the start year for comparison
        const aYear = parseInt(a.year.split('-')[0]);
        const bYear = parseInt(b.year.split('-')[0]);
        comparison = aYear - bYear;
      } else if (sortField === 'rating') {
        comparison = a.rating - b.rating;
      } else if (sortField === 'dateAdded') {
        comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredShows(result);
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
        <h1 className="text-3xl font-bold mb-2">TV Shows</h1>
        <p className="text-text-secondary">
          Browse and manage your TV show collection. Filter by tags, rating, or year.
        </p>
      </div>
      
      <MediaFilters 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        mediaType="tv-shows"
      />
      
      {filteredShows.length > 0 ? (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredShows.map(show => (
            <MediaCard key={show.id} media={show} />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-text-secondary text-lg mb-4">No TV shows match your filters</p>
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

export default TvShows;