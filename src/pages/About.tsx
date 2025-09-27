import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/ui/navbar";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Briefcase,
  TrendingUp,
  Award,
  CheckCircle,
  Globe,
  Heart,
  Target,
  Lightbulb
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "500K+", label: "Job Seekers", icon: Users },
    { number: "50K+", label: "Active Jobs", icon: Briefcase },
    { number: "25K+", label: "Companies", icon: TrendingUp },
    { number: "95%", label: "Success Rate", icon: Award }
  ];

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We're committed to connecting talented individuals with opportunities that align with their career goals and aspirations."
    },
    {
      icon: Heart,
      title: "People-First",
      description: "Every feature we build, every decision we make, is centered around creating the best experience for job seekers and employers."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously innovate to make job searching and hiring more efficient, transparent, and successful for everyone."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "From local opportunities to remote positions worldwide, we're building bridges between talent and opportunity everywhere."
    }
  ];

  const team = [{
    name: "Saurabh Gupta",
    role: "Engineering",
    bio: "Engineering leader with expertise in building high-performance systems for millions of users."
  },
  {
    name: "Ram Verma",
    role: "Head of Product",
    bio: "Product strategist focused on creating intuitive experiences that simplify the job search process."
  },
  {
    name: "Rahul Jha",
    role: "Engineer Manager",
    bio: "Full-stack engineer passionate about building scalable platforms that connect people with opportunities."
  },
  {
    name: "Rahul Jha",
    role: "Full Stack Engineer",
    bio: "Full-stack engineer passionate about building scalable platforms that connect people with opportunities."
  },

  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a simple mission: make job searching better for everyone."
    },
    {
      year: "2021",
      title: "100K Users",
      description: "Reached our first major milestone with job seekers across 50+ industries."
    },
    {
      year: "2022",
      title: "AI-Powered Matching",
      description: "Launched intelligent job matching using machine learning algorithms."
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Extended our platform to serve job markets in 15+ countries."
    },
    {
      year: "2024",
      title: "500K+ Community",
      description: "Built a thriving community of professionals and industry leaders."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 px-3 py-1">
              About JobPortal
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Connecting Talent with
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                Opportunity
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We believe that finding the right job shouldn't be a job itself. That's why we've built
              a platform that makes job searching intuitive, efficient, and successful for both
              job seekers and employers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary hover:shadow-glow transition-smooth">
                <Link to="/jobs">
                  Explore Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="hover:shadow-soft transition-smooth">
                Join Our Team
              </Button>
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
                <div className="gradient-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
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

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                JobPortal was born from a simple observation: the job search process was broken.
                Job seekers were spending countless hours on applications that went nowhere, while
                employers struggled to find qualified candidates in an ocean of resumes.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We set out to change this by creating a platform that leverages technology to make
                meaningful connections between talent and opportunity. Our intelligent matching system,
                comprehensive company insights, and streamlined application process have helped hundreds
                of thousands of professionals find their dream jobs.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-foreground">AI-powered job matching</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Comprehensive company profiles</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Streamlined application process</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Real-time application tracking</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-2xl blur-3xl opacity-20"></div>
              <Card className="relative border-border/50 shadow-strong">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="gradient-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Target className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Our Mission
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To democratize access to career opportunities by creating the most
                      efficient, transparent, and user-friendly job platform in the world.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-smooth border-border/50">
                <CardContent className="p-6">
                  <div className="gradient-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to transform job searching
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <Card className="hover:shadow-medium transition-smooth border-border/50">
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-2">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background z-10"></div>
                  </div>

                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind JobPortal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-smooth border-border/50">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of thousands of professionals who have found their dream careers
            through JobPortal. Your next opportunity is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary hover:shadow-glow transition-smooth">
              <Link to="/jobs">
                Find Your Dream Job
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="hover:shadow-soft transition-smooth">
              For Employers
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;