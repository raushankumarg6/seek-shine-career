// API service using JSON Server
const API_BASE = 'http://localhost:3001';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  type: string;
  experience: string;
  industry: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  status: 'active' | 'closed';
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  coverLetter?: string;
  resume?: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  size: string;
  industry: string;
  website?: string;
  logo?: string;
}

export interface SearchFilters {
  query?: string;
  location?: string;
  experience?: string;
  industry?: string;
  type?: string;
}

export interface JobPostData {
  title: string;
  location: string;
  type: string;
  experience: string;
  industry: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

class ApiService {
  // Jobs
  async getAllJobs(): Promise<Job[]> {
    const response = await fetch(`${API_BASE}/jobs?status=active`);
    return response.json();
  }

  async getJobById(id: string): Promise<Job | null> {
    const response = await fetch(`${API_BASE}/jobs/${id}`);
    if (response.ok) {
      return response.json();
    }
    return null;
  }

  async searchJobs(filters: SearchFilters): Promise<Job[]> {
    const params = new URLSearchParams();
    params.append('status', 'active');
    
    const response = await fetch(`${API_BASE}/jobs?${params}`);
    let jobs: Job[] = await response.json();

    // Enhanced search - includes description, requirements, and benefits
    if (filters.query) {
      const query = filters.query.toLowerCase();
      jobs = jobs.filter(job => {
        const searchText = `
          ${job.title} 
          ${job.company} 
          ${job.description} 
          ${job.requirements.join(' ')} 
          ${job.benefits.join(' ')}
        `.toLowerCase();
        
        return searchText.includes(query);
      });
    }

    if (filters.location) {
      jobs = jobs.filter(job => 
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.experience && filters.experience !== 'All') {
      jobs = jobs.filter(job => job.experience === filters.experience);
    }

    if (filters.industry && filters.industry !== 'All') {
      jobs = jobs.filter(job => job.industry === filters.industry);
    }

    if (filters.type && filters.type !== 'All') {
      jobs = jobs.filter(job => job.type === filters.type);
    }

    return jobs;
  }

  async postJob(companyId: string, jobData: JobPostData): Promise<{ success: boolean; job?: Job; message: string }> {
    try {
      // Get company info
      const companyResponse = await fetch(`${API_BASE}/companies/${companyId}`);
      const company: Company = await companyResponse.json();

      const newJob: Job = {
        id: Date.now().toString(),
        ...jobData,
        company: company.name,
        companyId,
        postedDate: new Date().toISOString().split('T')[0],
        status: 'active'
      };

      const response = await fetch(`${API_BASE}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });

      if (response.ok) {
        const job = await response.json();
        return { success: true, job, message: 'Job posted successfully!' };
      } else {
        return { success: false, message: 'Failed to post job' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to post job' };
    }
  }

  async getJobsByCompany(companyId: string): Promise<Job[]> {
    const response = await fetch(`${API_BASE}/jobs?companyId=${companyId}`);
    return response.json();
  }

  // Applications
  async submitApplication(applicationData: {
    jobId: string;
    userId: string;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    coverLetter?: string;
    resume?: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const newApplication: Application = {
        id: Date.now().toString(),
        ...applicationData,
        status: 'pending',
        appliedDate: new Date().toISOString().split('T')[0]
      };

      const response = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApplication)
      });

      if (response.ok) {
        return { success: true, message: 'Application submitted successfully!' };
      } else {
        return { success: false, message: 'Failed to submit application' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to submit application' };
    }
  }

  async getApplicationsByJob(jobId: string): Promise<Application[]> {
    const response = await fetch(`${API_BASE}/applications?jobId=${jobId}`);
    return response.json();
  }

  async getApplicationsByUser(userId: string): Promise<Application[]> {
    const response = await fetch(`${API_BASE}/applications?userId=${userId}`);
    return response.json();
  }

  // Companies
  async getAllCompanies(): Promise<Company[]> {
    const response = await fetch(`${API_BASE}/companies`);
    return response.json();
  }

  async getCompanyById(id: string): Promise<Company | null> {
    const response = await fetch(`${API_BASE}/companies/${id}`);
    if (response.ok) {
      return response.json();
    }
    return null;
  }

  // Candidates (for employers)
  async getCandidates(filters?: {
    experience?: string;
    location?: string;
    skills?: string;
  }): Promise<any[]> {
    const response = await fetch(`${API_BASE}/users?role=jobseeker`);
    let candidates = await response.json();

    if (filters?.experience && filters.experience !== 'All') {
      candidates = candidates.filter((c: any) => 
        c.profile.experience === filters.experience
      );
    }

    if (filters?.location) {
      candidates = candidates.filter((c: any) => 
        c.profile.location?.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters?.skills) {
      const skillQuery = filters.skills.toLowerCase();
      candidates = candidates.filter((c: any) => 
        c.profile.skills?.some((skill: string) => 
          skill.toLowerCase().includes(skillQuery)
        )
      );
    }

    return candidates.map((c: any) => ({
      id: c.id,
      name: c.profile.name,
      email: c.email,
      location: c.profile.location,
      experience: c.profile.experience,
      skills: c.profile.skills || [],
      phone: c.profile.phone
    }));
  }
}

export const apiService = new ApiService();

export const FILTER_OPTIONS = {
  experience: ['All', 'Entry-level', 'Mid-level', 'Senior'],
  industry: ['All', 'Technology', 'Marketing', 'Finance', 'Healthcare'],
  type: ['All', 'Full-time', 'Part-time', 'Contract', 'Remote']
};