import { useState, useEffect } from 'react';
import { ReviewsComponent, Review } from '../components/ReviewsComponent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Star, TrendingUp, Users, Award } from 'lucide-react';

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: '101',
      userName: 'Rahul Sharma',
      rating: 5,
      comment: 'Excellent plumbing service! Very professional and completed the work on time. Highly recommended for any plumbing needs.',
      date: '2024-10-15',
      helpful: 12,
      isVerified: true
    },
    {
      id: '2',
      userId: '102',
      userName: 'Priya Patel',
      rating: 4,
      comment: 'Good electrical work. The electrician was skilled and friendly. Only minor delay in starting the work.',
      date: '2024-10-14',
      helpful: 8,
      isVerified: true
    },
    {
      id: '3',
      userId: '103',
      userName: 'Amit Kumar',
      rating: 5,
      comment: 'Outstanding carpentry skills! Transformed our furniture beautifully. Will definitely hire again.',
      date: '2024-10-13',
      helpful: 15,
      isVerified: false
    },
    {
      id: '4',
      userId: '104',
      userName: 'Sneha Reddy',
      rating: 4,
      comment: 'Very satisfied with the masonry work. Strong and clean construction. Professional approach.',
      date: '2024-10-12',
      helpful: 6,
      isVerified: true
    },
    {
      id: '5',
      userId: '105',
      userName: 'Vikram Singh',
      rating: 5,
      comment: 'Best painting service in the area! Attention to detail and neat finishing. Highly recommended!',
      date: '2024-10-10',
      helpful: 20,
      isVerified: true
    },
    {
      id: '6',
      userId: '106',
      userName: 'Anjali Mehta',
      rating: 3,
      comment: 'Decent work but took longer than expected. Quality was good though.',
      date: '2024-10-09',
      helpful: 4,
      isVerified: false
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'received' | 'given'>('all');

  // Mock stats - in real app, fetch from API
  const stats = {
    totalReviews: reviews.length,
    averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
    totalHelpful: reviews.reduce((sum, r) => sum + r.helpful, 0),
    verifiedReviews: reviews.filter(r => r.isVerified).length
  };

  const handleSubmitReview = async (rating: number, comment: string) => {
    // In real app, submit to API
    const newReview: Review = {
      id: (reviews.length + 1).toString(),
      userId: 'current-user',
      userName: 'You',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      isVerified: false
    };
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rustic-brown-dark via-rustic-sienna to-rustic-brown-dark bg-clip-text text-transparent">
          Reviews & Ratings
        </h1>
        <p className="text-rustic-brown-medium">
          See what others are saying and share your experiences
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Total Reviews
              </CardTitle>
              <Users className="size-4 text-rustic-sienna" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-brown-dark">{stats.totalReviews}</div>
            <p className="text-xs text-rustic-brown-medium mt-1">All platforms</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Average Rating
              </CardTitle>
              <Star className="size-4 text-rustic-sienna fill-rustic-sienna" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-brown-dark">
              {stats.averageRating.toFixed(1)}
            </div>
            <p className="text-xs text-rustic-brown-medium mt-1">Out of 5.0</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Helpful Votes
              </CardTitle>
              <TrendingUp className="size-4 text-rustic-green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-brown-dark">{stats.totalHelpful}</div>
            <p className="text-xs text-rustic-brown-medium mt-1">Community engagement</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Verified Reviews
              </CardTitle>
              <Award className="size-4 text-rustic-green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-brown-dark">{stats.verifiedReviews}</div>
            <p className="text-xs text-rustic-brown-medium mt-1">
              {((stats.verifiedReviews / stats.totalReviews) * 100).toFixed(0)}% verified
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-rustic-wheat">
          <TabsTrigger 
            value="all" 
            onClick={() => setFilter('all')}
            className="data-[state=active]:bg-rustic-tan data-[state=active]:text-rustic-brown-dark"
          >
            All Reviews
          </TabsTrigger>
          <TabsTrigger 
            value="received"
            onClick={() => setFilter('received')}
            className="data-[state=active]:bg-rustic-tan data-[state=active]:text-rustic-brown-dark"
          >
            Received
          </TabsTrigger>
          <TabsTrigger 
            value="given"
            onClick={() => setFilter('given')}
            className="data-[state=active]:bg-rustic-tan data-[state=active]:text-rustic-brown-dark"
          >
            Given
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <ReviewsComponent
            reviews={reviews}
            onSubmitReview={handleSubmitReview}
            allowSubmit={true}
            entityName="worker"
          />
        </TabsContent>

        <TabsContent value="received" className="space-y-6">
          <Card className="border-rustic-tan bg-rustic-linen shadow-rustic-md">
            <CardHeader>
              <CardTitle className="text-rustic-brown-dark">Reviews You've Received</CardTitle>
              <CardDescription className="text-rustic-brown-medium">
                Feedback from clients about your services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewsComponent
                reviews={reviews.filter(r => r.userId !== 'current-user')}
                allowSubmit={false}
                entityName="service"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="given" className="space-y-6">
          <Card className="border-rustic-tan bg-rustic-linen shadow-rustic-md">
            <CardHeader>
              <CardTitle className="text-rustic-brown-dark">Reviews You've Given</CardTitle>
              <CardDescription className="text-rustic-brown-medium">
                Your feedback about other workers and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewsComponent
                reviews={reviews.filter(r => r.userId === 'current-user')}
                onSubmitReview={handleSubmitReview}
                allowSubmit={true}
                entityName="worker"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
