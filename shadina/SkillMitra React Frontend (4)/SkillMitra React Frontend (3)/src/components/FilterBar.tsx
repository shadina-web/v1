import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search, X } from 'lucide-react';
import { FilterOptions } from '../lib/types';
import { VILLAGES, SKILLS } from '../lib/api';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  placeholder?: string;
}

export function FilterBar({ onFilterChange, placeholder = 'Search...' }: FilterBarProps) {
  const [search, setSearch] = useState('');
  const [village, setVillage] = useState<string>('');
  const [skill, setSkill] = useState<string>('');

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        search: search || undefined,
        village: village || undefined,
        skill: skill || undefined
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, village, skill, onFilterChange]);

  const handleClear = () => {
    setSearch('');
    setVillage('');
    setSkill('');
  };

  const hasFilters = search || village || skill;

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Village Filter */}
        <Select value={village} onValueChange={setVillage}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Villages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All Villages</SelectItem>
            {VILLAGES.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Skill Filter */}
        <Select value={skill} onValueChange={setSkill}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Skills" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All Skills</SelectItem>
            {SKILLS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Button */}
        {hasFilters && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleClear}
            className="shrink-0"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
