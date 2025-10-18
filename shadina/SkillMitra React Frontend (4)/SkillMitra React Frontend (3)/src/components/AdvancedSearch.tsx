import { Search, SlidersHorizontal, MapPin, DollarSign, Star, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { SKILLS, VILLAGES } from '../lib/api';
import { useState } from 'react';

interface AdvancedSearchProps {
  onFilterChange: (filters: SearchFilters) => void;
  currentFilters: SearchFilters;
}

export interface SearchFilters {
  searchTerm: string;
  skill: string;
  village: string;
  priceRange: [number, number];
  minRating: number;
}

export function AdvancedSearch({ onFilterChange, currentFilters }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>(currentFilters);
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters: SearchFilters = {
      searchTerm: '',
      skill: '',
      village: '',
      priceRange: [0, 10000],
      minRating: 0
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFilterCount = [
    filters.skill,
    filters.village,
    filters.minRating > 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 10000
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 size-4 text-rustic-brown-medium" />
          <Input
            placeholder="Search skills, services, or people..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onFilterChange(filters)}
            className="pl-10 border-rustic-tan"
          />
        </div>
        <Button onClick={() => onFilterChange(filters)} className="bg-rustic-green hover:bg-rustic-green-dark">
          <Search className="size-4" />
        </Button>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 relative border-rustic-tan hover:bg-rustic-wheat">
              <SlidersHorizontal className="size-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 size-5 p-0 flex items-center justify-center bg-rustic-sienna"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto border-l-rustic-tan bg-rustic-linen">
            <SheetHeader>
              <SheetTitle className="text-rustic-brown-dark">Advanced Filters</SheetTitle>
              <SheetDescription className="text-rustic-brown-medium">
                Refine your search with detailed filters
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              {/* Skill Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-rustic-brown-dark">
                  <Search className="size-4" />
                  Skill/Service
                </Label>
                <Select
                  value={filters.skill}
                  onValueChange={(value: string) => updateFilter('skill', value)}
                >
                  <SelectTrigger className="border-rustic-tan">
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent className="border-rustic-tan bg-rustic-linen">
                    <SelectItem value="">All Skills</SelectItem>
                    {SKILLS.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-rustic-brown-dark">
                  <MapPin className="size-4" />
                  Location
                </Label>
                <Select
                  value={filters.village}
                  onValueChange={(value: string) => updateFilter('village', value)}
                >
                  <SelectTrigger className="border-rustic-tan">
                    <SelectValue placeholder="Select a village" />
                  </SelectTrigger>
                  <SelectContent className="border-rustic-tan bg-rustic-linen">
                    <SelectItem value="">All Locations</SelectItem>
                    {VILLAGES.map((village) => (
                      <SelectItem key={village} value={village}>
                        {village}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-rustic-brown-dark">
                  <DollarSign className="size-4" />
                  Price Range
                </Label>
                <div className="pt-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value: number[]) => updateFilter('priceRange', value as [number, number])}
                    min={0}
                    max={10000}
                    step={100}
                    className="mb-3"
                  />
                  <div className="flex items-center justify-between text-sm text-rustic-brown-medium">
                    <span>₹{filters.priceRange[0]}</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-rustic-brown-dark">
                  <Star className="size-4" />
                  Minimum Rating
                </Label>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={filters.minRating === rating ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateFilter('minRating', rating)}
                      className={`flex-1 ${filters.minRating === rating ? 'bg-rustic-green hover:bg-rustic-green-dark' : 'border-rustic-tan hover:bg-rustic-wheat'}`}
                    >
                      {rating === 0 ? 'Any' : `${rating}+`}
                      {rating > 0 && <Star className="size-3 ml-1 fill-current" />}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button onClick={applyFilters} className="flex-1 bg-rustic-green hover:bg-rustic-green-dark">
                  Apply Filters
                </Button>
                <Button onClick={resetFilters} variant="outline" className="border-rustic-tan hover:bg-rustic-wheat">
                  <X className="size-4" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.skill && (
            <Badge variant="secondary" className="gap-1 bg-rustic-green text-white">
              Skill: {filters.skill}
              <button
                onClick={() => updateFilter('skill', '')}
                className="ml-1 hover:bg-rustic-green-dark rounded-full"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {filters.village && (
            <Badge variant="secondary" className="gap-1 bg-rustic-brown text-white">
              Location: {filters.village}
              <button
                onClick={() => updateFilter('village', '')}
                className="ml-1 hover:bg-rustic-brown-dark rounded-full"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {filters.minRating > 0 && (
            <Badge variant="secondary" className="gap-1 bg-rustic-sienna text-white">
              Rating: {filters.minRating}+ ⭐
              <button
                onClick={() => updateFilter('minRating', 0)}
                className="ml-1 hover:bg-rustic-sienna/80 rounded-full"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) && (
            <Badge variant="secondary" className="gap-1 bg-rustic-sky-blue text-white">
              Price: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              <button
                onClick={() => updateFilter('priceRange', [0, 10000])}
                className="ml-1 hover:bg-rustic-sky-blue/80 rounded-full"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
