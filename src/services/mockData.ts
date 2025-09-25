// Mock data service for job portal
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  industry: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  companyLogo?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  location: string;
  size: string;
  industry: string;
}

const companies: Company[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    description: "Leading technology company specializing in AI and cloud solutions",
    location: "San Francisco, CA",
    size: "500-1000",
    industry: "Technology"
  },
  {
    id: "2", 
    name: "Digital Marketing Pro",
    description: "Full-service digital marketing agency helping brands grow online",
    location: "New York, NY",
    size: "50-100",
    industry: "Marketing"
  },
  {
    id: "3",
    name: "FinanceFirst Bank",
    description: "Premier financial institution offering comprehensive banking services",
    location: "Chicago, IL",
    size: "1000+",
    industry: "Finance"
  },
  {
    id: "4",
    name: "HealthTech Innovations",
    description: "Revolutionary healthcare technology solutions for better patient care",
    location: "Boston, MA",
    size: "200-500",
    industry: "Healthcare"
  }
];

const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Senior",
    industry: "Technology",
    salary: "$120,000 - $160,000",
    description: "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building scalable web applications using React, TypeScript, and modern development practices.",
    requirements: [
      "5+ years of experience in frontend development",
      "Expert knowledge of React, TypeScript, and JavaScript",
      "Experience with modern CSS frameworks",
      "Strong understanding of web performance optimization",
      "Experience with testing frameworks"
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Flexible working hours",
      "Professional development budget",
      "Remote work options"
    ],
    postedDate: "2024-01-15"
  },
  {
    id: "2",
    title: "Digital Marketing Manager",
    company: "Digital Marketing Pro",
    location: "New York, NY",
    type: "Full-time",
    experience: "Mid-level",
    industry: "Marketing",
    salary: "$70,000 - $90,000",
    description: "Join our creative team as a Digital Marketing Manager. Lead multi-channel campaigns, analyze performance metrics, and drive customer acquisition strategies.",
    requirements: [
      "3+ years of digital marketing experience",
      "Proficiency in Google Analytics, AdWords, and social media platforms",
      "Strong analytical and communication skills",
      "Experience with marketing automation tools",
      "Bachelor's degree in Marketing or related field"
    ],
    benefits: [
      "Competitive salary",
      "Health and wellness benefits",
      "Creative work environment",
      "Career growth opportunities",
      "Team building activities"
    ],
    postedDate: "2024-01-10"
  },
  {
    id: "3",
    title: "Financial Analyst",
    company: "FinanceFirst Bank",
    location: "Chicago, IL",
    type: "Full-time",
    experience: "Entry-level",
    industry: "Finance",
    salary: "$55,000 - $70,000",
    description: "Seeking a detail-oriented Financial Analyst to support our investment team. Analyze financial data, create reports, and assist in investment decision-making processes.",
    requirements: [
      "Bachelor's degree in Finance, Economics, or related field",
      "Strong analytical and quantitative skills",
      "Proficiency in Excel and financial modeling",
      "Knowledge of financial markets and instruments",
      "CFA Level 1 preferred but not required"
    ],
    benefits: [
      "Comprehensive benefits package",
      "401(k) with company match",
      "Professional development opportunities",
      "Tuition reimbursement",
      "Work-life balance"
    ],
    postedDate: "2024-01-08"
  },
  {
    id: "4",
    title: "Product Manager",
    company: "HealthTech Innovations",
    location: "Boston, MA",
    type: "Full-time",
    experience: "Senior",
    industry: "Healthcare",
    salary: "$110,000 - $140,000",
    description: "Lead product strategy and development for our healthcare technology platform. Work closely with engineering, design, and clinical teams to deliver innovative solutions.",
    requirements: [
      "5+ years of product management experience",
      "Healthcare or medical device experience preferred",
      "Strong technical background",
      "Excellent communication and leadership skills",
      "Experience with agile development methodologies"
    ],
    benefits: [
      "Competitive compensation package",
      "Stock options",
      "Premium healthcare benefits",
      "Flexible PTO policy",
      "Innovation time for personal projects"
    ],
    postedDate: "2024-01-12"
  },
  {
    id: "5",
    title: "UX/UI Designer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Mid-level",
    industry: "Technology",
    salary: "$85,000 - $110,000",
    description: "Create intuitive and engaging user experiences for our software products. Collaborate with product managers and developers to bring designs to life.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma, Sketch, or similar design tools",
      "Strong portfolio demonstrating design process",
      "Understanding of user research methodologies",
      "Knowledge of frontend development principles"
    ],
    benefits: [
      "Creative and collaborative environment",
      "Latest design tools and equipment",
      "Conference and workshop attendance",
      "Flexible work arrangements",
      "Design mentorship program"
    ],
    postedDate: "2024-01-14"
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "TechCorp Solutions",
    location: "Remote",
    type: "Full-time",
    experience: "Senior",
    industry: "Technology",
    salary: "$130,000 - $170,000",
    description: "Apply machine learning and statistical analysis to solve complex business problems. Work with large datasets to extract insights and build predictive models.",
    requirements: [
      "PhD or Master's in Data Science, Statistics, or related field",
      "5+ years of experience in data science",
      "Proficiency in Python, R, and SQL",
      "Experience with machine learning frameworks",
      "Strong communication skills for presenting findings"
    ],
    benefits: [
      "Top-tier compensation",
      "Cutting-edge technology stack",
      "Research publication opportunities",
      "Conference speaking opportunities",
      "Fully remote work option"
    ],
    postedDate: "2024-01-16"
  }
];

export class JobService {
  static async getAllJobs(): Promise<Job[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return jobs;
  }

  static async getJobById(id: string): Promise<Job | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return jobs.find(job => job.id === id) || null;
  }

  static async searchJobs(filters: {
    query?: string;
    location?: string;
    experience?: string;
    industry?: string;
    type?: string;
  }): Promise<Job[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    let filteredJobs = jobs;

    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }

    if (filters.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.experience && filters.experience !== 'All') {
      filteredJobs = filteredJobs.filter(job => job.experience === filters.experience);
    }

    if (filters.industry && filters.industry !== 'All') {
      filteredJobs = filteredJobs.filter(job => job.industry === filters.industry);
    }

    if (filters.type && filters.type !== 'All') {
      filteredJobs = filteredJobs.filter(job => job.type === filters.type);
    }

    return filteredJobs;
  }

  static async getCompanies(): Promise<Company[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return companies;
  }

  // Mock application submission
  static async submitApplication(jobId: string, applicationData: {
    fullName: string;
    email: string;
    phone: string;
    resume?: File;
    coverLetter?: string;
  }): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success/failure
    if (Math.random() > 0.1) {
      return {
        success: true,
        message: "Application submitted successfully! We'll be in touch soon."
      };
    } else {
      return {
        success: false,
        message: "There was an error submitting your application. Please try again."
      };
    }
  }
}

export const FILTER_OPTIONS = {
  experience: ['All', 'Entry-level', 'Mid-level', 'Senior'],
  industry: ['All', 'Technology', 'Marketing', 'Finance', 'Healthcare'],
  type: ['All', 'Full-time', 'Part-time', 'Contract', 'Remote']
};