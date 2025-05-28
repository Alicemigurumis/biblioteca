import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  size = 'md', 
  interactive = false,
  onChange
}) => {
  const maxRating = 5;
  const starSizes = {
    sm: 14,
    md: 20,
    lg: 24
  };
  
  const starSize = starSizes[size];
  
  // Generate an array of 10 positions (for half-star precision)
  const positions = Array.from({ length: maxRating * 2 });
  
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      // Convert index to rating (0.5 increments)
      const newRating = (index + 1) / 2;
      onChange(newRating);
    }
  };

  return (
    <div className="flex">
      {positions.map((_, index) => {
        const value = (index + 1) / 2;
        const isHalfStar = index % 2 === 0;
        const isFilled = rating >= value;
        const isHalfFilled = !isFilled && rating > value - 0.5 && !isHalfStar;
        
        return (
          <div 
            key={index}
            className={`${interactive ? 'cursor-pointer' : ''}`}
            onClick={() => handleClick(index)}
            style={{ 
              width: isHalfStar ? starSize / 2 : starSize,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {isFilled ? (
              <Star 
                size={starSize} 
                className="text-warning-500" 
                fill="#FFC107"
              />
            ) : isHalfFilled ? (
              <StarHalf 
                size={starSize} 
                className="text-warning-500" 
                fill="#FFC107"
              />
            ) : (
              <Star 
                size={starSize} 
                className="text-background-tertiary"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;