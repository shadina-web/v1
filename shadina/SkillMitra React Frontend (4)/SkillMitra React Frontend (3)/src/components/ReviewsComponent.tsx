import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { StarRating } from './StarRating';
import { ThumbsUp, Flag, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  isVerified?: boolean;
}

interface ReviewsComponentProps {
  reviews: Review[];
  onSubmitReview?: (rating: number, comment: string) => void;
  allowSubmit?: boolean;
  entityName?: string;
}

export function ReviewsComponent({ 
  reviews, 
  onSubmitReview, 
  allowSubmit = false,
  entityName = 'service'
}: ReviewsComponentProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100 
      : 0
  }));

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write a review');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmitReview?.(rating, comment);
      setRating(0);
      setComment('');
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="border-rustic-tan bg-rustic-linen shadow-rustic-md">
        <CardHeader>
          <CardTitle className="text-rustic-brown-dark">Reviews & Ratings</CardTitle>
          <CardDescription className="text-rustic-brown-medium">{reviews.length} reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-rustic-wheat rounded-lg">
              <div className="text-4xl  font-bold text-rustic-brown-dark">{averageRating.toFixed(1)}</div>
              <StarRating rating={averageRating} readonly size="lg" />
              <p className="text-sm text-rustic-brown-medium">{reviews.length} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ stars, count, percentage }) => (
                <div key={stars} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm text-rustic-brown-dark">{stars}</span>
                    <StarRating rating={1} readonly size="sm" />
                  </div>
                  <div className="flex-1 h-2 bg-rustic-wheat rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rustic-sienna transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-rustic-brown-medium w-12 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Review */}
      {allowSubmit && (
        <Card className="border-rustic-tan bg-rustic-linen shadow-rustic-md">
          <CardHeader>
            <CardTitle className="text-rustic-brown-dark">Write a Review</CardTitle>
            <CardDescription className="text-rustic-brown-medium">Share your experience with this {entityName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-rustic-brown-dark">Your Rating *</label>
              <StarRating 
                rating={rating} 
                onRatingChange={setRating} 
                size="lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-rustic-brown-dark">Your Review *</label>
              <Textarea
                placeholder="Tell others about your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                maxLength={500}
                className="border-rustic-tan"
              />
              <p className="text-xs text-rustic-brown-medium text-right">
                {comment.length}/500 characters
              </p>
            </div>
            <Button 
              onClick={handleSubmit} 
              disabled={submitting || rating === 0 || !comment.trim()}
              className="w-full bg-rustic-green hover:bg-rustic-green-dark"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Alert className="border-rustic-tan bg-rustic-linen">
            <MessageSquare className="size-4 text-rustic-brown" />
            <AlertDescription className="text-rustic-brown-medium">
              No reviews yet. Be the first to review this {entityName}!
            </AlertDescription>
          </Alert>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="border-rustic-tan bg-rustic-linen shadow-rustic-md">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar className="border-2 border-rustic-tan">
                    <AvatarFallback className="bg-rustic-wheat text-rustic-brown-dark">
                      {review.userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-rustic-brown-dark">{review.userName}</p>
                          {review.isVerified && (
                            <span className="text-xs bg-rustic-green/10 text-rustic-green px-2 py-0.5 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-rustic-brown-medium">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <StarRating rating={review.rating} readonly />
                    </div>
                    <p className="text-sm text-rustic-brown-dark">{review.comment}</p>
                    <div className="flex items-center gap-4 text-sm text-rustic-brown-medium">
                      <button className="flex items-center gap-1 hover:text-rustic-brown-dark transition">
                        <ThumbsUp className="size-4" />
                        Helpful ({review.helpful})
                      </button>
                      <button className="flex items-center gap-1 hover:text-rustic-brown-dark transition">
                        <Flag className="size-4" />
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
