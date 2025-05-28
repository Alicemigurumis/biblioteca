import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMediaById } from '../data/mockData';
import StarRating from '../components/common/StarRating';
import { ArrowLeft, Save, X } from 'lucide-react';

const AddReview: React.FC = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const navigate = useNavigate();
  
  const media = getMediaById(id || '');
  
  const [review, setReview] = useState({
    rating: 0,
    reviewText: '',
    tags: [] as string[]
  });
  
  const [customTag, setCustomTag] = useState('');

  useEffect(() => {
    if (media) {
      setReview({
        rating: media.rating || 0,
        reviewText: media.reviewText || '',
        tags: media.tags || []
      });
    }
  }, [media]);

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

  const handleRatingChange = (rating: number) => {
    setReview(prev => ({ ...prev, rating }));
  };

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(prev => ({ ...prev, reviewText: e.target.value }));
  };

  const handleAddTag = () => {
    if (customTag.trim() && !review.tags.includes(customTag.trim())) {
      setReview(prev => ({
        ...prev,
        tags: [...prev.tags, customTag.trim()]
      }));
      setCustomTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setReview(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSaveReview = () => {
    // In a real app, this would save to the backend
    // For now, just show an alert and navigate back
    alert(`Review saved for ${media.title}`);
    navigate(`/${media.type}/${media.id}`);
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
            
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{media.title}</h2>
              <p className="text-text-secondary">{media.year}</p>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-background-secondary p-6 rounded-lg"
            >
              <h1 className="text-2xl font-bold mb-6">Review</h1>
              
              <div className="mb-8">
                <label className="block text-sm text-text-secondary mb-2">Your Rating</label>
                <StarRating 
                  rating={review.rating} 
                  size="lg" 
                  interactive={true}
                  onChange={handleRatingChange}
                />
              </div>
              
              <div className="mb-8">
                <label className="block text-sm text-text-secondary mb-2">Your Review</label>
                <textarea
                  value={review.reviewText}
                  onChange={handleReviewTextChange}
                  placeholder="Write your thoughts about this media..."
                  className="text-area"
                  rows={6}
                ></textarea>
              </div>
              
              <div className="mb-8">
                <label className="block text-sm text-text-secondary mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-background-tertiary rounded-full px-3 py-1"
                    >
                      <span className="text-sm">{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-text-tertiary hover:text-error-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    placeholder="Add a tag..."
                    className="text-input rounded-r-none flex-1"
                  />
                  <button
                    onClick={handleAddTag}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-4 rounded-r"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleSaveReview}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Save size={18} />
                <span>Save Review</span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddReview;