import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Plus, X } from 'lucide-react';
import AddMediaDialog from '../dialogs/AddMediaDialog';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/movies') return 'Movies';
    if (path === '/tv-shows') return 'TV Shows';
    if (path === '/books') return 'Books';
    if (path.includes('/tags/')) {
      const tag = path.split('/tags/')[1];
      return `Tag: ${tag.charAt(0).toUpperCase() + tag.slice(1)}`;
    }
    return '';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement global search functionality
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-background-secondary py-4 px-6 border-b border-background-tertiary sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{getPageTitle()}</h1>
        
        <div className="flex items-center gap-4">
          {isSearching ? (
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-background-tertiary rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" 
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearching(false);
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-primary"
              >
                <X size={16} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearching(true)}
              className="p-2 rounded-full hover:bg-background-tertiary transition-colors text-text-secondary hover:text-text-primary"
            >
              <Search size={20} />
            </button>
          )}
          
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-2 transition-colors flex items-center justify-center"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <AddMediaDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </header>
  );
};

export default Header;