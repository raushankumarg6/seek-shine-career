// Authentication service using localStorage and JSON Server
export interface User {
  id: string;
  email: string;
  role: 'jobseeker' | 'employer';
  profile: {
    name: string;
    phone?: string;
    location?: string;
    experience?: string;
    skills?: string[];
    company?: string;
    industry?: string;
  };
  savedJobs?: string[];
  applications?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role: 'jobseeker' | 'employer';
  profile: {
    name: string;
    phone?: string;
    location?: string;
    experience?: string;
    company?: string;
    industry?: string;
  };
}

const API_BASE = 'http://localhost:3001';

class AuthService {
  private currentUser: User | null = null;

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  private saveUserToStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  private clearUserFromStorage() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; message: string }> {
    try {
      // Fetch users from JSON Server
      const response = await fetch(`${API_BASE}/users`);
      const users: (User & { password: string })[] = await response.json();
      
      const user = users.find(u => 
        u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        this.saveUserToStorage(userWithoutPassword);
        return { success: true, user: userWithoutPassword, message: 'Login successful!' };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  async register(data: RegisterData): Promise<{ success: boolean; user?: User; message: string }> {
    try {
      // Check if user already exists
      const response = await fetch(`${API_BASE}/users`);
      const users: User[] = await response.json();
      
      if (users.some(u => u.email === data.email)) {
        return { success: false, message: 'User with this email already exists' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: data.email,
        password: data.password,
        role: data.role,
        profile: data.profile,
        savedJobs: [],
        applications: []
      };

      const createResponse = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      if (createResponse.ok) {
        const { password, ...userWithoutPassword } = newUser;
        this.saveUserToStorage(userWithoutPassword);
        return { success: true, user: userWithoutPassword, message: 'Registration successful!' };
      } else {
        return { success: false, message: 'Registration failed. Please try again.' };
      }
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  }

  logout() {
    this.clearUserFromStorage();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isEmployer(): boolean {
    return this.currentUser?.role === 'employer';
  }

  isJobSeeker(): boolean {
    return this.currentUser?.role === 'jobseeker';
  }

  async updateProfile(profileData: Partial<User['profile']>): Promise<{ success: boolean; message: string }> {
    if (!this.currentUser) {
      return { success: false, message: 'User not logged in' };
    }

    try {
      const updatedUser = {
        ...this.currentUser,
        profile: { ...this.currentUser.profile, ...profileData }
      };

      const response = await fetch(`${API_BASE}/users/${this.currentUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: updatedUser.profile })
      });

      if (response.ok) {
        this.saveUserToStorage(updatedUser);
        return { success: true, message: 'Profile updated successfully!' };
      } else {
        return { success: false, message: 'Failed to update profile' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to update profile' };
    }
  }

  async saveJob(jobId: string): Promise<{ success: boolean; message: string }> {
    if (!this.currentUser) {
      return { success: false, message: 'User not logged in' };
    }

    try {
      const savedJobs = [...(this.currentUser.savedJobs || [])];
      if (!savedJobs.includes(jobId)) {
        savedJobs.push(jobId);
      }

      const response = await fetch(`${API_BASE}/users/${this.currentUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedJobs })
      });

      if (response.ok) {
        this.currentUser.savedJobs = savedJobs;
        this.saveUserToStorage(this.currentUser);
        return { success: true, message: 'Job saved successfully!' };
      } else {
        return { success: false, message: 'Failed to save job' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to save job' };
    }
  }

  async unsaveJob(jobId: string): Promise<{ success: boolean; message: string }> {
    if (!this.currentUser) {
      return { success: false, message: 'User not logged in' };
    }

    try {
      const savedJobs = (this.currentUser.savedJobs || []).filter(id => id !== jobId);

      const response = await fetch(`${API_BASE}/users/${this.currentUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedJobs })
      });

      if (response.ok) {
        this.currentUser.savedJobs = savedJobs;
        this.saveUserToStorage(this.currentUser);
        return { success: true, message: 'Job removed from saved!' };
      } else {
        return { success: false, message: 'Failed to remove job' };
      }
    } catch (error) {
      return { success: false, message: 'Failed to remove job' };
    }
  }
}

export const authService = new AuthService();