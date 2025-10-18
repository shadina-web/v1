import { useState, useEffect } from 'react';
import { Offer, FilterOptions } from '../lib/types';
import { getAllWorkers } from '../services/user.service';
import { api } from '../lib/api';
import { OfferCard } from '../components/OfferCard';
import { FilterBar } from '../components/FilterBar';
import { DetailDialog } from '../components/DetailDialog';
import { Skeleton } from '../components/ui/skeleton';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadOffers();
  }, [filters]);

  const loadOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch BOTH mock data AND real workers
      const mockOffers = await api.getOffers(); // Get mock data
      const workers = await getAllWorkers(); // Get real workers from backend
      
      // Transform real workers into offers (one offer per skill)
      const realOffers: Offer[] = [];
      workers.forEach((worker: any) => {
        if (worker.skills && worker.skills.length > 0) {
          worker.skills.forEach((skill: string) => {
            realOffers.push({
              id: `real-${worker.id}-${skill}`,
              userId: worker.id.toString(),
              userName: worker.name,
              village: worker.location || 'Location not set',
              skill: skill,
              description: worker.bio || `Offering ${skill} services`,
              phone: worker.phone,
              rating: 4.5,
              createdAt: new Date().toISOString()
            });
          });
        }
      });
      
      // Combine mock data and real offers
      const allOffers = [...mockOffers, ...realOffers];
      
      // Apply filters
      let filtered = allOffers;
      if (filters?.village) {
        filtered = filtered.filter(o => o.village.toLowerCase().includes(filters.village!.toLowerCase()));
      }
      if (filters?.skill) {
        filtered = filtered.filter(o => o.skill.toLowerCase().includes(filters.skill!.toLowerCase()));
      }
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(o => 
          o.skill.toLowerCase().includes(search) ||
          o.description.toLowerCase().includes(search) ||
          o.userName.toLowerCase().includes(search)
        );
      }
      
      setOffers(filtered);
    } catch (err) {
      console.error('Error loading offers:', err);
      setError('Failed to load offers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOfferClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 rounded-2xl blur-2xl" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Available Skills & Services</h1>
        <p className="text-slate-600 mt-2">
          Browse skilled professionals offering their services in your area
        </p>
      </div>

      {/* Filters */}
      <FilterBar
        onFilterChange={setFilters}
        placeholder="Search by skill, name, or description..."
      />

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="border-red-300 bg-red-50">
          <AlertCircle className="size-4" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Offers Grid */}
      {!loading && offers.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onClick={() => handleOfferClick(offer)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && offers.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-slate-100 mb-4">
            <AlertCircle className="size-8 text-slate-500" />
          </div>
          <h3 className="text-slate-900 font-semibold text-lg">No offers found</h3>
          <p className="text-slate-600 mt-2">
            Try adjusting your filters or check back later for new offers
          </p>
        </div>
      )}

      {/* Detail Dialog */}
      <DetailDialog
        item={selectedOffer}
        type="offer"
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}