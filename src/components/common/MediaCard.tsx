import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Media } from '../../types';
import StarRating from './StarRating';

interface MediaCardProps {
  media: Media;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  return (
    <motion.div 
      className="media-card"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/${media.type}/${media.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-md">
          <img 
            src={media.coverImage} 
            alt={media.title} 
            className="w-full h-full object-cover"
          />
          {media.rating > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <div className="flex items-center">
                <StarRating rating={media.rating} size="sm" />
              </div>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-1">{media.title}</h3>
          <p className="text-text-secondary text-xs">{media.year}</p>
          
          {media.tags && media.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {media.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="tag-badge">{tag}</span>
              ))}
              {media.tags.length > 2 && (
                <span className="tag-badge">+{media.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default MediaCard;