import { useState, useEffect } from "react";
import { Request, FilterOptions } from "../lib/types";
import { api } from "../lib/api";
import { RequestCard } from "../components/RequestCard";
import { FilterBar } from "../components/FilterBar";
import { DetailDialog } from "../components/DetailDialog";
import { Skeleton } from "../components/ui/skeleton";
import {
  Alert,
  AlertDescription,
} from "../components/ui/alert";
import { AlertCircle } from "lucide-react";

export function Requests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedRequest, setSelectedRequest] =
    useState<Request | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadRequests();
  }, [filters]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getRequests(filters);
      setRequests(data);
    } catch (err) {
      setError("Failed to load requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestClick = (request: Request) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/5 via-secondary/5 to-primary/5 rounded-2xl blur-2xl" />
        <h1 className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
          Service Requests
        </h1>
        <p className="text-muted-foreground mt-2">
          Find people looking for services you can provide
        </p>
      </div>

      {/* Filters */}
      <FilterBar
        onFilterChange={setFilters}
        placeholder="Search by service, name, or description..."
      />

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Requests Grid */}
      {!loading && requests.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onClick={() => handleRequestClick(request)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && requests.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-muted mb-4">
            <AlertCircle className="size-8 text-muted-foreground" />
          </div>
          <h3>No requests found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or check back later for
            new requests
          </p>
        </div>
      )}

      {/* Detail Dialog */}
      <DetailDialog
        item={selectedRequest}
        type="request"
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}