import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Building, DollarSign } from "lucide-react";
import { Job } from "@/services/mockData";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <Card className="p-6 hover:shadow-medium transition-smooth border-border/50 hover:border-primary/20 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-smooth">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                {job.title}
              </h3>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-smooth">
          {job.type}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{timeAgo(job.postedDate)}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <Badge variant="outline" className="text-xs">
          {job.experience}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {job.industry}
        </Badge>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex gap-2">
        <Button 
          asChild 
          variant="outline" 
          size="sm" 
          className="flex-1 hover:shadow-soft transition-bounce"
        >
          <Link to={`/jobs/${job.id}`}>View Details</Link>
        </Button>
        <Button 
          size="sm" 
          className="gradient-primary hover:shadow-glow transition-smooth px-6"
        >
          Apply Now
        </Button>
      </div>
    </Card>
  );
};

export default JobCard;