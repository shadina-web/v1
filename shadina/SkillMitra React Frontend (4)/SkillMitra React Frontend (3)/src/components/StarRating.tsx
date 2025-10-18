import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
}

export function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = 'md',
  showCount = false,
  count = 0
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'size-3',
    md: 'size-4',
    lg: 'size-6'
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onRatingChange?.(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= displayRating
                ? 'fill-rustic-sienna text-rustic-sienna'
                : 'fill-none text-rustic-brown-medium'
            }`}
          />
        </button>
      ))}
      {showCount && count > 0 && (
        <span className="text-sm text-rustic-brown-medium ml-1">({count})</span>
      )}
    </div>
  );
}
