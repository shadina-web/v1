import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Clock,
  CheckCircle,
  DollarSign,
  Star,
  Users,
  Award,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalOffers: number;
  activeOffers: number;
  completedOffers: number;
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
  profileViews: number;
}

interface Activity {
  id: string;
  type: 'offer' | 'request' | 'review' | 'match' | 'payment';
  title: string;
  description: string;
  date: string;
  icon: any;
  color: string;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOffers: 8,
    activeOffers: 5,
    completedOffers: 3,
    totalRequests: 12,
    pendingRequests: 4,
    completedRequests: 8,
    totalEarnings: 45000,
    averageRating: 4.5,
    totalReviews: 23,
    profileViews: 156
  });

  const [recentActivity] = useState<Activity[]>([
    {
      id: '1',
      type: 'offer',
      title: 'New job application',
      description: 'Someone applied for your Plumbing service offer',
      date: '2 hours ago',
      icon: Briefcase,
      color: 'text-rustic-brown'
    },
    {
      id: '2',
      type: 'review',
      title: 'New review received',
      description: 'Rajesh Kumar gave you 5 stars for Carpentry',
      date: '5 hours ago',
      icon: Star,
      color: 'text-rustic-sienna'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment received',
      description: '₹2,500 received for Electrical work',
      date: '1 day ago',
      icon: DollarSign,
      color: 'text-rustic-green'
    },
    {
      id: '4',
      type: 'match',
      title: 'New match found',
      description: 'Your skills match with a new service request',
      date: '2 days ago',
      icon: Users,
      color: 'text-rustic-sky-blue'
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rustic-brown to-rustic-sienna bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-rustic-brown-medium">Track your activity and performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-rustic-tan hover:border-rustic-brown transition-all bg-rustic-linen shadow-rustic-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Total Offers
              </CardTitle>
              <Briefcase className="size-4 text-rustic-brown" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-brown-dark">{stats.totalOffers}</div>
            <p className="text-xs text-rustic-brown-medium mt-1">
              <span className="text-rustic-green font-semibold">{stats.activeOffers} active</span>
              {' • '}
              <span>{stats.completedOffers} completed</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-rustic-tan hover:border-rustic-green-medium transition-all bg-rustic-linen shadow-rustic-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Total Requests
              </CardTitle>
              <FileText className="size-4 text-rustic-green" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-brown-dark">{stats.totalRequests}</div>
            <p className="text-xs text-rustic-brown-medium mt-1">
              <span className="text-rustic-sienna font-semibold">{stats.pendingRequests} pending</span>
              {' • '}
              <span>{stats.completedRequests} completed</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-rustic-tan hover:border-rustic-green-dark transition-all bg-rustic-linen shadow-rustic-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Total Earnings
              </CardTitle>
              <DollarSign className="size-4 text-rustic-green-dark" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-brown-dark">₹{stats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-rustic-green-dark mt-1 flex items-center gap-1 font-semibold">
              <TrendingUp className="size-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-rustic-tan hover:border-rustic-sienna transition-all bg-rustic-linen shadow-rustic-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-rustic-brown-medium">
                Avg. Rating
              </CardTitle>
              <Star className="size-4 text-rustic-sienna fill-rustic-sienna" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rustic-brown-dark">{stats.averageRating.toFixed(1)}</div>
            <p className="text-xs text-rustic-brown-medium mt-1">
              From {stats.totalReviews} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-rustic-brown-dark">Recent Activity</CardTitle>
                <CardDescription className="text-rustic-brown-medium">Your latest updates and notifications</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-rustic-green hover:bg-rustic-green/10">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex gap-4 items-start">
                    <div className={`size-10 rounded-lg bg-rustic-wheat flex items-center justify-center ${activity.color}`}>
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm text-rustic-brown-dark">{activity.title}</p>
                      <p className="text-sm text-rustic-brown-medium">{activity.description}</p>
                      <p className="text-xs text-rustic-brown-medium/70 flex items-center gap-1">
                        <Clock className="size-3" />
                        {activity.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
          <CardHeader>
            <CardTitle className="text-rustic-brown-dark">Quick Actions</CardTitle>
            <CardDescription className="text-rustic-brown-medium">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/offers">
              <Button variant="outline" className="w-full justify-start gap-2 border-rustic-tan text-rustic-brown hover:bg-rustic-brown/10 hover:border-rustic-brown">
                <Briefcase className="size-4" />
                Post New Offer
                <ArrowUpRight className="size-4 ml-auto" />
              </Button>
            </Link>
            <Link to="/requests">
              <Button variant="outline" className="w-full justify-start gap-2 border-rustic-tan text-rustic-brown hover:bg-rustic-green/10 hover:border-rustic-green">
                <FileText className="size-4" />
                Create Request
                <ArrowUpRight className="size-4 ml-auto" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full justify-start gap-2 border-rustic-tan text-rustic-brown hover:bg-rustic-sienna/10 hover:border-rustic-sienna">
                <Users className="size-4" />
                Edit Profile
                <ArrowUpRight className="size-4 ml-auto" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start gap-2 border-rustic-tan text-rustic-brown hover:bg-rustic-sky-blue/10 hover:border-rustic-sky-blue">
              <Calendar className="size-4" />
              Manage Schedule
              <ArrowUpRight className="size-4 ml-auto" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="border-2 border-rustic-tan bg-rustic-linen shadow-rustic-md">
        <CardHeader>
          <CardTitle className="text-rustic-brown-dark">Performance Metrics</CardTitle>
          <CardDescription className="text-rustic-brown-medium">Your profile statistics this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-rustic-brown-medium">
                <Users className="size-4" />
                <span className="text-sm">Profile Views</span>
              </div>
              <p className="text-2xl font-bold text-rustic-brown-dark">{stats.profileViews}</p>
              <div className="h-2 bg-rustic-wheat rounded-full overflow-hidden">
                <div className="h-full bg-rustic-brown" style={{ width: '75%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-rustic-brown-medium">
                <CheckCircle className="size-4" />
                <span className="text-sm">Completion Rate</span>
              </div>
              <p className="text-2xl font-bold text-rustic-brown-dark">92%</p>
              <div className="h-2 bg-rustic-wheat rounded-full overflow-hidden">
                <div className="h-full bg-rustic-green" style={{ width: '92%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-rustic-brown-medium">
                <Clock className="size-4" />
                <span className="text-sm">Avg. Response Time</span>
              </div>
              <p className="text-2xl font-bold text-rustic-brown-dark">2.5h</p>
              <div className="h-2 bg-rustic-wheat rounded-full overflow-hidden">
                <div className="h-full bg-rustic-sky-blue" style={{ width: '60%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-rustic-brown-medium">
                <Award className="size-4" />
                <span className="text-sm">Success Score</span>
              </div>
              <p className="text-2xl font-bold text-rustic-brown-dark">88%</p>
              <div className="h-2 bg-rustic-wheat rounded-full overflow-hidden">
                <div className="h-full bg-rustic-sienna" style={{ width: '88%' }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
