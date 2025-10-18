import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { 
  MapPin, 
  Star, 
  Briefcase, 
  TrendingUp, 
  Target,
  CheckCircle,
  ArrowRight,
  Users,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Match {
  id: string;
  userId: string;
  userName: string;
  userType: 'worker' | 'client';
  title: string;
  skills: string[];
  location: string;
  distance: number; // in km
  rating: number;
  completedJobs: number;
  matchScore: number;
  availability: string;
  priceRange?: string;
  description: string;
}

interface MatchingCriteria {
  skillMatch: number;
  locationMatch: number;
  ratingMatch: number;
  availabilityMatch: number;
  priceMatch: number;
}

export function MatchingSystem() {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: '1',
      userId: 'u101',
      userName: 'Rajesh Kumar',
      userType: 'worker',
      title: 'Expert Plumber',
      skills: ['Plumbing', 'Pipe Fitting', 'Water Heater Repair'],
      location: 'Pune, Maharashtra',
      distance: 2.5,
      rating: 4.8,
      completedJobs: 125,
      matchScore: 95,
      availability: 'Available Now',
      priceRange: '₹500-1000/hr',
      description: '10+ years experience in residential and commercial plumbing'
    },
    {
      id: '2',
      userId: 'u102',
      userName: 'Priya Singh',
      userType: 'worker',
      title: 'Professional Electrician',
      skills: ['Electrical Wiring', 'Circuit Repair', 'Home Automation'],
      location: 'Mumbai, Maharashtra',
      distance: 5.2,
      rating: 4.9,
      completedJobs: 98,
      matchScore: 88,
      availability: 'Available in 2 days',
      priceRange: '₹600-1200/hr',
      description: 'Certified electrician with expertise in modern electrical systems'
    },
    {
      id: '3',
      userId: 'u103',
      userName: 'Amit Patel',
      userType: 'client',
      title: 'Need Carpentry Work',
      skills: ['Carpentry', 'Furniture Making', 'Wood Polishing'],
      location: 'Pune, Maharashtra',
      distance: 1.8,
      rating: 4.5,
      completedJobs: 45,
      matchScore: 92,
      availability: 'Urgent',
      priceRange: '₹800-1500',
      description: 'Looking for skilled carpenter for custom furniture project'
    },
    {
      id: '4',
      userId: 'u104',
      userName: 'Sneha Reddy',
      userType: 'worker',
      title: 'Home Cleaning Expert',
      skills: ['Deep Cleaning', 'Sanitization', 'Organizing'],
      location: 'Bangalore, Karnataka',
      distance: 3.7,
      rating: 4.7,
      completedJobs: 156,
      matchScore: 85,
      availability: 'Available Tomorrow',
      priceRange: '₹300-600/hr',
      description: 'Professional cleaning service with eco-friendly products'
    }
  ]);

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getMatchLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 75) return 'Great Match';
    if (score >= 60) return 'Good Match';
    return 'Fair Match';
  };

  const matchingCriteria: MatchingCriteria = {
    skillMatch: 95,
    locationMatch: 85,
    ratingMatch: 90,
    availabilityMatch: 80,
    priceMatch: 75
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Smart Matching System
        </h1>
        <p className="text-muted-foreground">AI-powered recommendations based on your profile and preferences</p>
      </div>

      {/* Matching Algorithm Explanation */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="size-5 text-primary" />
            <CardTitle>How Matching Works</CardTitle>
          </div>
          <CardDescription>
            Our intelligent algorithm considers multiple factors to find the best matches for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Skill Match</span>
                <span className="font-semibold">{matchingCriteria.skillMatch}%</span>
              </div>
              <Progress value={matchingCriteria.skillMatch} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <span className="font-semibold">{matchingCriteria.locationMatch}%</span>
              </div>
              <Progress value={matchingCriteria.locationMatch} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-semibold">{matchingCriteria.ratingMatch}%</span>
              </div>
              <Progress value={matchingCriteria.ratingMatch} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Availability</span>
                <span className="font-semibold">{matchingCriteria.availabilityMatch}%</span>
              </div>
              <Progress value={matchingCriteria.availabilityMatch} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price</span>
                <span className="font-semibold">{matchingCriteria.priceMatch}%</span>
              </div>
              <Progress value={matchingCriteria.priceMatch} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match Statistics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 hover:border-primary/50 transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Matches</p>
                <p className="text-2xl font-bold">{matches.length}</p>
              </div>
              <Users className="size-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-green-500/50 transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Excellent Matches</p>
                <p className="text-2xl font-bold text-green-600">
                  {matches.filter(m => m.matchScore >= 90).length}
                </p>
              </div>
              <Target className="size-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-blue-500/50 transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Match Score</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(matches.reduce((sum, m) => sum + m.matchScore, 0) / matches.length)}%
                </p>
              </div>
              <TrendingUp className="size-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-accent/50 transition-all">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Nearby Matches</p>
                <p className="text-2xl font-bold text-accent">
                  {matches.filter(m => m.distance <= 5).length}
                </p>
              </div>
              <MapPin className="size-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Matches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended For You</h2>
          <Button variant="outline" size="sm">
            Refine Preferences
          </Button>
        </div>

        <div className="grid gap-4">
          {matches.sort((a, b) => b.matchScore - a.matchScore).map((match) => (
            <Card key={match.id} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <Avatar className="size-16 flex-shrink-0">
                    <AvatarFallback className="text-lg">
                      {match.userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Main Content */}
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{match.userName}</h3>
                          <Badge variant={match.userType === 'worker' ? 'default' : 'secondary'}>
                            {match.userType === 'worker' ? 'Service Provider' : 'Client'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{match.title}</p>
                      </div>

                      {/* Match Score */}
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getMatchColor(match.matchScore)}`}>
                          {match.matchScore}%
                        </div>
                        <p className="text-xs text-muted-foreground">{getMatchLabel(match.matchScore)}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="size-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{match.rating}</span>
                        <span className="text-muted-foreground">({match.completedJobs} jobs)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="size-4" />
                        {match.location} • {match.distance}km away
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="size-4 text-green-500" />
                        <span className="text-green-600 font-medium">{match.availability}</span>
                      </div>
                      {match.priceRange && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Briefcase className="size-4" />
                          {match.priceRange}
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {match.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">{match.description}</p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Link to={`/profile/${match.userId}`} className="flex-1">
                        <Button variant="default" className="w-full gap-2">
                          View Profile
                          <ArrowRight className="size-4" />
                        </Button>
                      </Link>
                      <Link to="/messages" className="flex-1">
                        <Button variant="outline" className="w-full">
                          Send Message
                        </Button>
                      </Link>
                      <Link to="/booking" className="flex-1">
                        <Button variant="outline" className="w-full">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-8 text-center space-y-4">
          <Target className="size-12 mx-auto text-primary" />
          <h3 className="text-xl font-semibold">Want Better Matches?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete your profile, add more skills, and enable location services to get more accurate and relevant matches.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/profile">
              <Button className="gap-2">
                Complete Profile
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Button variant="outline">
              Update Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
