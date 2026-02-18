// API Service for connecting admin dashboard with main homepage

const API_BASE = '/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Generic API functions
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Events API
export const eventsApi = {
  getAll: () => apiRequest<any[]>('/events'),
  create: (event: any) => apiRequest<any>('/events', {
    method: 'POST',
    body: JSON.stringify(event),
  }),
  update: (id: string, event: any) => apiRequest<any>('/events', {
    method: 'PUT',
    body: JSON.stringify({ id, ...event }),
  }),
  delete: (id: string) => apiRequest<any>(`/events?id=${id}`, {
    method: 'DELETE',
  }),
};

// Members API
export const membersApi = {
  getAll: () => apiRequest<any[]>('/members'),
  create: (member: any) => apiRequest<any>('/members', {
    method: 'POST',
    body: JSON.stringify(member),
  }),
  update: (id: string, member: any) => apiRequest<any>('/members', {
    method: 'PUT',
    body: JSON.stringify({ id, ...member }),
  }),
  delete: (id: string) => apiRequest<any>(`/members?id=${id}`, {
    method: 'DELETE',
  }),
};

// Donations API
export const donationsApi = {
  getAll: () => apiRequest<any[]>('/donations'),
  create: (donation: any) => apiRequest<any>('/donations', {
    method: 'POST',
    body: JSON.stringify(donation),
  }),
  update: (id: string, donation: any) => apiRequest<any>('/donations', {
    method: 'PUT',
    body: JSON.stringify({ id, ...donation }),
  }),
  delete: (id: string) => apiRequest<any>(`/donations?id=${id}`, {
    method: 'DELETE',
  }),
};

// Content API
export const contentApi = {
  getAll: () => apiRequest<any[]>('/content'),
  create: (content: any) => apiRequest<any>('/content', {
    method: 'POST',
    body: JSON.stringify(content),
  }),
  update: (id: string, content: any) => apiRequest<any>('/content', {
    method: 'PUT',
    body: JSON.stringify({ id, ...content }),
  }),
  delete: (id: string) => apiRequest<any>(`/content?id=${id}`, {
    method: 'DELETE',
  }),
};
