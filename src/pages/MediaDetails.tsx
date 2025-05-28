import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { getMediaById } from '../data/mockData';
import StarRating from '../components/common/StarRating';
import { ArrowLeft, Edit, Film, Tv, BookOpen } from 'lucide-react';

const MediaDetails: React.FC = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const navigate = useNavigate();
  
  const media = getMediaById(id || '');
  
  if (!media) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-text-secondary text-lg mb-4">Media not found</p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const getMediaTypeIcon = () => {
    switch (media.type) {
      case 'movies':
        return <Film size={18} />;
      case 'tv-shows':
        return <Tv size={18} />;
      case 'books':
        return <BookOpen size={18} />;
      default:
        return null;
    }
  };

  const getMediaTypeLabel = () => {
    switch (media.type) {
      case 'movies':
        return 'Movie';
      case 'tv-shows':
        return 'TV Show';
      case 'books':
        return 'Book';
      default:
        return 'Media';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const getAdditionalInfo = () => {
    if (!media.additionalInfo) return null;

    switch (media.type) {
      case 'movies':
        return (
          <>
            {media.additionalInfo.runtime && (
              <div>
                <span className="text-text-tertiary">Runtime:</span> {media.additionalInfo.runtime}
              </div>
            )}
            {media.additionalInfo.cast && (
              <div>
                <span className="text-text-tertiary">Cast:</span> {media.additionalInfo.cast.join(', ')}
              </div>
            )}
          </>
        );
      case 'tv-shows':
        return (
          <>
            {media.additionalInfo.seasons && (
              <div>
                <span className="text-text-tertiary">Seasons:</span> {media.additionalInfo.seasons}
              </div>
            )}
            {media.additionalInfo.episodes && (
              <div>
                <span className="text-text-tertiary">Episodes:</span> {media.additionalInfo.episodes}
              </div>
            )}
          </>
        );
      case 'books':
        return (
          <>
            {media.additionalInfo.pages && (
              <div>
                <span className="text-text-tertiary">Pages:</span> {media.additionalInfo.pages}
              </div>
            )}
            {media.additionalInfo.publisher && (
              <div>
                <span className="text-text-tertiary">Publisher:</span> {media.additionalInfo.publisher}
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <motion.div 
              className="rounded-lg overflow-hidden shadow-lg"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src={media.coverImage} 
                alt={media.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
            
            <div className="mt-6 flex flex-col gap-4">
              <Link
                to={`/add-review/${media.type}/${media.id}`}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Edit size={18} />
                <span>Edit Review</span>
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1 text-text-secondary bg-background-tertiary px-2 py-1 rounded text-xs">
                  {getMediaTypeIcon()}
                  {getMediaTypeLabel()}
                </span>
                <span className="text-text-secondary">{media.year}</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-3">{media.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <StarRating rating={media.rating} size="lg" />
                <span className="text-text-secondary">{media.rating.toFixed(1)}/5</span>
              </div>
              
              <div className="mb-6">
                <h2 className="font-semibold mb-2">Details</h2>
                <div className="bg-background-secondary p-4 rounded-lg space-y-2 text-sm">
                  <div>
                    <span className="text-text-tertiary">Creator:</span> {media.creator}
                  </div>
                  <div>
                    <span className="text-text-tertiary">Added on:</span> {formatDate(media.dateAdded)}
                  </div>
                  {getAdditionalInfo()}
                </div>
              </div>
              
              {media.description && (
                <div className="mb-6">
                  <h2 className="font-semibold mb-2">Description</h2>
                  <p className="text-text-secondary leading-relaxed">
                    {media.description}
                  </p>
                </div>
              )}
              
              {media.tags && media.tags.length > 0 && (
                <div className="mb-6">
                  <h2 className="font-semibold mb-2">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {media.tags.map((tag, index) => (
                      <Link
                        key={index}
                        to={`/tags/${tag.toLowerCase()}`}
                        className="tag-badge hover:bg-background-primary transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {media.reviewText && (
                <div className="mb-6">
                  <h2 className="font-semibold mb-2">Your Review</h2>
                  <div className="bg-background-secondary p-4 rounded-lg">
                    <p className="text-text-secondary leading-relaxed italic">
                      "{media.reviewText}"
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MediaDetails;