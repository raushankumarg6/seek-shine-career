import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, Filter, MapPin, Briefcase, Building, Clock } from "lucide-react";
import { FILTER_OPTIONS } from "@/services/api";

interface SearchFiltersProps {
  onSearch: (filters: {
    query: string;
    location: string;
    experience: string;
    industry: string;
    type: string;
  }) => void;
  isLoading?: boolean;
}

const SearchFilters = ({ onSearch, isLoading }: SearchFiltersProps) => {
  const [filters, setFilters] = useState({
    query: "",
    location: "",
    experience: "All",
    industry: "All",
    type: "All"
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  return (
    <Card className="p-6 mb-8 shadow-soft border-border/50">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Job title, keywords, or company..."
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              className="pl-10 h-12 border-border/50 focus:border-primary/50 transition-smooth"
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Location (city, state, or remote)"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="pl-10 h-12 border-border/50 focus:border-primary/50 transition-smooth"
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isLoading}
            className="h-12 px-8 gradient-primary hover:shadow-glow transition-smooth"
          >
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? "Searching..." : "Search Jobs"}
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Filter className="h-4 w-4" />
          <span>Refine your search:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Experience Level
            </label>
            <Select
              value={filters.experience}
              onValueChange={(value) => handleFilterChange("experience", value)}
            >
              <SelectTrigger className="border-border/50 focus:border-primary/50 transition-smooth">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FILTER_OPTIONS.experience.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Building className="h-4 w-4" />
              Industry
            </label>
            <Select
              value={filters.industry}
              onValueChange={(value) => handleFilterChange("industry", value)}
            >
              <SelectTrigger className="border-border/50 focus:border-primary/50 transition-smooth">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FILTER_OPTIONS.industry.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Job Type
            </label>
            <Select
              value={filters.type}
              onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger className="border-border/50 focus:border-primary/50 transition-smooth">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FILTER_OPTIONS.type.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SearchFilters;