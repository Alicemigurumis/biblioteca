import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, Plus } from 'lucide-react';
import { searchMedia } from '../../services/api';
import { Media } from '../../types';

interface AddMediaDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMediaDialog: React.FC<AddMediaDialogProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'movies' | 'tv-shows' | 'books'>('movies');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const mediaType = activeTab === 'tv-shows' ? 'tv' : activeTab === 'books' ? 'book' : 'movie';
      const response = await searchMedia(mediaType, searchQuery);
      setSearchResults(response.results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedia = (media: Media) => {
    navigate(`/add-review/${media.type}/${media.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background-secondary rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-background-tertiary flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Media</h2>
          <button onClick={onClose} className="p-1 hover:bg-background-tertiary rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-4 mb-6">
            {(['movies', 'tv-shows', 'books'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchResults([]);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-full ${
                  activeTab === tab
                    ? 'bg-primary-500 text-white'
                    : 'bg-background-tertiary hover:bg-background-primary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab.replace('-', ' ')}...`}
                className="w-full px-4 py-2 pl-10 bg-background-tertiary rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={18} />
            </div>
          </form>

          <div className="overflow-y-auto max-h-[50vh]">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {searchResults.map((media) => (
                  <div
                    key={media.id}
                    className="flex gap-4 p-3 rounded-lg hover:bg-background-tertiary cursor-pointer"
                    onClick={() => handleAddMedia(media)}
                  >
                    <img
                      src={media.coverImage || 'https://via.placeholder.com/150'}
                      alt={media.title}
                      className="w-20 h-30 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{media.title}</h3>
                      <p className="text-sm text-text-secondary">{media.year}</p>
                      <button className="mt-2 flex items-center gap-1 text-sm text-primary-500">
                        <Plus size={16} />
                        Add to Library
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <p className="text-center text-text-secondary py-8">No results found</p>
            ) : (
              <p className="text-center text-text-secondary py-8">
                Search for {activeTab.replace('-', ' ')} to add to your library
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMediaDialog;