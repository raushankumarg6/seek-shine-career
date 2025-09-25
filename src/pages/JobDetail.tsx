import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { JobService } from "@/services/mockData";
import { ArrowLeft, MapPin, Clock, Building, DollarSign, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: ""
  });

  const { data: job, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: () => JobService.getJobById(id!),
    enabled: !!id,
  });

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setIsApplying(true);
    try {
      const result = await JobService.submitApplication(job.id, applicationData);
      
      if (result.success) {
        toast({
          title: "Application Submitted!",
          description: result.message,
        });
        setApplicationData({ fullName: "", email: "", phone: "", coverLetter: "" });
      } else {
        toast({
          title: "Application Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading job details...</span>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-destructive">Job not found or error loading job details.</p>
            <Button asChild className="mt-4">
              <Link to="/jobs">Back to Jobs</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          asChild
          variant="ghost"
          className="mb-6 hover:shadow-soft transition-bounce"
        >
          <Link to="/jobs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 shadow-medium border-border/50">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 gradient-secondary rounded-xl flex items-center justify-center shadow-soft">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{job.company}</p>
                  
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
                      <Calendar className="h-4 w-4" />
                      <span>Posted {timeAgo(job.postedDate)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {job.type}
                    </Badge>
                    <Badge variant="outline">{job.experience}</Badge>
                    <Badge variant="outline">{job.industry}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 shadow-soft border-border/50">
              <h2 className="text-xl font-semibold text-foreground mb-4">Job Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{job.description}</p>
              
              <h3 className="text-lg font-semibold text-foreground mb-4">Requirements</h3>
              <ul className="space-y-2 mb-6">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-4">Benefits</h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 shadow-soft border-border/50 sticky top-24">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full gradient-primary hover:shadow-glow transition-smooth mb-4">
                    Apply for this Position
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Apply for {job.title}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleApplicationSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={applicationData.fullName}
                        onChange={(e) => setApplicationData({ ...applicationData, fullName: e.target.value })}
                        required
                        className="border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={applicationData.email}
                        onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                        required
                        className="border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                        required
                        className="border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">Cover Letter</Label>
                      <Textarea
                        id="coverLetter"
                        value={applicationData.coverLetter}
                        onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                        placeholder="Tell us why you're perfect for this role..."
                        className="border-border/50 focus:border-primary/50 min-h-[100px]"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isApplying}
                      className="w-full gradient-primary hover:shadow-glow transition-smooth"
                    >
                      {isApplying ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Button variant="outline" size="lg" className="w-full hover:shadow-soft transition-bounce">
                Save Job
              </Button>
            </Card>

            <Card className="p-6 shadow-soft border-border/50">
              <h3 className="font-semibold text-foreground mb-4">Job Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience Level:</span>
                  <span className="text-foreground font-medium">{job.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="text-foreground font-medium">{job.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job Type:</span>
                  <span className="text-foreground font-medium">{job.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posted:</span>
                  <span className="text-foreground font-medium">{timeAgo(job.postedDate)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetail;