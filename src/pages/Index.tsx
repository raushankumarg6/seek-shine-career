import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import { Search, MapPin, TrendingUp, Users, Award, ArrowRight, CheckCircle, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Job Search",
      description: "Advanced filters help you find jobs that match your skills, location, and career goals."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Track your applications and get insights to accelerate your professional development."
    },
    {
      icon: Users,
      title: "Company Insights",
      description: "Learn about company culture, benefits, and employee reviews before applying."
    },
    {
      icon: Award,
      title: "Premium Opportunities",
      description: "Access exclusive job postings from top employers looking for exceptional talent."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Jobs" },
    { number: "25,000+", label: "Companies" },
    { number: "1M+", label: "Job Seekers" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Find Your Dream
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                  Career Today
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Connect with top employers and discover opportunities that match your skills, 
                experience, and career aspirations. Your next big opportunity is just a search away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Job title or keywords..."
                    className="pl-10 h-14 text-lg border-border/50 focus:border-primary/50 transition-smooth"
                  />
                </div>
                <div className="flex-1 relative sm:flex-none sm:w-48">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Location..."
                    className="pl-10 h-14 text-lg border-border/50 focus:border-primary/50 transition-smooth"
                  />
                </div>
                <Button 
                  asChild
                  size="lg" 
                  className="h-14 px-8 gradient-primary hover:shadow-glow transition-smooth text-lg"
                >
                  <Link to="/jobs">
                    Search Jobs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1">Remote Work</Badge>
                <Badge variant="secondary" className="px-3 py-1">Technology</Badge>
                <Badge variant="secondary" className="px-3 py-1">Marketing</Badge>
                <Badge variant="secondary" className="px-3 py-1">Finance</Badge>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-2xl blur-3xl opacity-20 animate-pulse"></div>
              <img
                src={heroImage}
                alt="Professional team working together"
                className="relative rounded-2xl shadow-strong w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose JobPortal?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the tools and connections you need to take your career to the next level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-smooth border-border/50 group">
                <div className="gradient-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-smooth">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="gradient-secondary inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 shadow-soft">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through our platform. 
            Your perfect career opportunity is waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="gradient-primary hover:shadow-glow transition-smooth"
            >
              <Link to="/jobs">
                Browse All Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="hover:shadow-soft transition-bounce"
            >
              For Employers
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="gradient-primary h-8 w-8 rounded-lg flex items-center justify-center mr-3">
                  <Search className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  JobPortal
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Connecting talented professionals with exceptional opportunities. 
                Find your next career move with confidence.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Job Seekers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/jobs" className="hover:text-primary transition-smooth">Browse Jobs</Link></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Career Advice</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Resume Builder</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Salary Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Employers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">Post Jobs</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Find Candidates</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Resources</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
