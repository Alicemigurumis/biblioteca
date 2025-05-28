import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getRecentlyAddedMedia, getTopRatedMedia } from '../data/mockData';
import MediaCard from '../components/common/MediaCard';

const Dashboard: React.FC = () => {
  const recentlyAddedMedia = getRecentlyAddedMedia(6);
  const topRatedMedia = getTopRatedMedia(6);

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
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Welcome to MediaVault</h2>
        <p className="text-text-secondary max-w-3xl">
          Track, rate, and review your favorite movies, TV shows, and books all in one place.
          Use the sidebar to navigate between different media types or view your tagged collections.
        </p>
      </motion.div>

      <motion.section 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recently Added</h2>
          <Link to="/recent" className="text-primary-500 hover:text-primary-400 flex items-center gap-1 text-sm">
            View all
            <ChevronRight size={16} />
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recentlyAddedMedia.map(media => (
            <MediaCard key={media.id} media={media} />
          ))}
        </motion.div>
      </motion.section>

      <motion.section 
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Top Rated</h2>
          <Link to="/top-rated" className="text-primary-500 hover:text-primary-400 flex items-center gap-1 text-sm">
            View all
            <ChevronRight size={16} />
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {topRatedMedia.map(media => (
            <MediaCard key={media.id} media={media} />
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-6">Media Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/movies" className="block">
            <div className="bg-background-secondary p-6 rounded-lg hover:bg-background-tertiary transition-colors">
              <h3 className="font-semibold text-lg mb-2">Movies</h3>
              <p className="text-4xl font-bold text-primary-500">6</p>
              <p className="text-text-secondary text-sm mt-1">in your collection</p>
            </div>
          </Link>
          
          <Link to="/tv-shows" className="block">
            <div className="bg-background-secondary p-6 rounded-lg hover:bg-background-tertiary transition-colors">
              <h3 className="font-semibold text-lg mb-2">TV Shows</h3>
              <p className="text-4xl font-bold text-primary-500">4</p>
              <p className="text-text-secondary text-sm mt-1">in your collection</p>
            </div>
          </Link>
          
          <Link to="/books" className="block">
            <div className="bg-background-secondary p-6 rounded-lg hover:bg-background-tertiary transition-colors">
              <h3 className="font-semibold text-lg mb-2">Books</h3>
              <p className="text-4xl font-bold text-primary-500">5</p>
              <p className="text-text-secondary text-sm mt-1">in your collection</p>
            </div>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Dashboard;