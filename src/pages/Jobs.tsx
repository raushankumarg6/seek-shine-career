import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/ui/navbar";
import SearchFilters from "@/components/SearchFilters";
import JobCard from "@/components/JobCard";
import { apiService } from "@/services/api";
import { Loader2 } from "lucide-react";

const Jobs = () => {
  const [searchFilters, setSearchFilters] = useState({
    query: "",
    location: "",
    experience: "All",
    industry: "All",
    type: "All"
  });

  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ["jobs", searchFilters],
    queryFn: () => apiService.searchJobs(searchFilters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = (filters: typeof searchFilters) => {
    setSearchFilters(filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Find Your Perfect Job
          </h1>
          <p className="text-muted-foreground">
            Discover opportunities that match your skills and aspirations
          </p>
        </div>

        <SearchFilters onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Error loading jobs. Please try again.</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading jobs...</span>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No jobs found matching your criteria.
                </p>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search filters or keywords.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Jobs;