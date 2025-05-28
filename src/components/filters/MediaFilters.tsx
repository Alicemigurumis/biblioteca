import React, { useState } from 'react';
import { Filter, SortDesc, SortAsc, X } from 'lucide-react';

interface MediaFiltersProps {
  onFilterChange: (filters: any) => void;
  onSortChange: (sort: string, order: 'asc' | 'desc') => void;
  mediaType: 'movies' | 'tv-shows' | 'books';
}

const MediaFilters: React.FC<MediaFiltersProps> = ({ 
  onFilterChange, 
  onSortChange,
  mediaType
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    tags: [],
    rating: 0,
    year: ''
  });

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    const newFilters = { ...filters, tags: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    const newFilters = { ...filters, rating: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newFilters = { ...filters, year: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
    onSortChange(e.target.value, sortOrder);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    onSortChange(sortField, newOrder);
  };

  // Mock data for tags - in a real app this would come from the backend
  const availableTags = [
    'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Fantasy', 'Mystery', 
    'Thriller', 'Romance', 'Animation', 'Horror'
  ];

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <Filter size={18} />
          <span>Filters</span>
        </button>
        
        <div className="flex items-center gap-4">
          <select
            value={sortField}
            onChange={handleSortChange}
            className="select-input text-sm py-1"
          >
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
            <option value="dateAdded">Date Added</option>
          </select>
          
          <button
            onClick={toggleSortOrder}
            className="p-1 rounded hover:bg-background-tertiary transition-colors"
          >
            {sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="bg-background-secondary p-4 rounded-md mb-6 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filter {mediaType}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-tertiary hover:text-text-primary"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">Tags</label>
              <select
                multiple
                value={filters.tags as string[]}
                onChange={handleTagChange}
                className="select-input text-sm"
                size={4}
              >
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-text-secondary mb-1">Minimum Rating</label>
              <select
                value={filters.rating}
                onChange={handleRatingChange}
                className="select-input text-sm"
              >
                <option value={0}>Any Rating</option>
                <option value={1}>1+ Star</option>
                <option value={2}>2+ Stars</option>
                <option value={3}>3+ Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-text-secondary mb-1">Year</label>
              <input
                type="text"
                value={filters.year}
                onChange={handleYearChange}
                placeholder="e.g. 2023 or 2020-2023"
                className="text-input text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaFilters;