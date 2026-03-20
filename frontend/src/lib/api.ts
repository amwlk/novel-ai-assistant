import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  personalStyle?: string;
}

export interface Novel {
  id: string;
  userId: string;
  title: string;
  category: string;
  penName?: string;
  status: string;
  totalChapters: number;
  totalWords: number;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

export interface Setting {
  id: string;
  novelId: string;
  type: string;
  name: string;
  content: string;
  tags: string[];
  metadata?: Record<string, any>;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  novelId: string;
  chapterNumber: number;
  title: string;
  content?: string;
  wordCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export const authApi = {
  register: (data: { email: string; password: string; username: string }) =>
    api.post<ApiResponse<{ accessToken: string; user: User }>>("/auth/register", data),
  
  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<{ accessToken: string; user: User }>>("/auth/login", data),
  
  getMe: () => api.get<ApiResponse<User>>("/auth/me"),
};

export const novelApi = {
  create: (data: { title: string; category: string; penName?: string }) =>
    api.post<ApiResponse<Novel>>("/novels", data),
  
  getAll: (params?: { page?: number; pageSize?: number; status?: string }) =>
    api.get<PaginatedResponse<Novel>>("/novels", { params }),
  
  getById: (id: string) => api.get<ApiResponse<Novel>>(`/novels/${id}`),
  
  update: (id: string, data: Partial<Novel>) =>
    api.put<ApiResponse<Novel>>(`/novels/${id}`, data),
  
  delete: (id: string) => api.delete<ApiResponse<{ message: string }>>(`/novels/${id}`),
  
  getStats: (id: string) =>
    api.get<ApiResponse<{ chapterCount: number; totalWords: number; settingCount: number }>>(`/novels/${id}/stats`),
};

export const settingApi = {
  create: (data: { novelId: string; type: string; name: string; content: string; tags?: string[] }) =>
    api.post<ApiResponse<Setting>>("/settings", data),
  
  getAll: (params: { novelId: string; type?: string; page?: number; pageSize?: number }) =>
    api.get<PaginatedResponse<Setting>>("/settings", { params }),
  
  getById: (id: string) => api.get<ApiResponse<Setting>>(`/settings/${id}`),
  
  update: (id: string, data: Partial<Setting>) =>
    api.put<ApiResponse<Setting>>(`/settings/${id}`, data),
  
  delete: (id: string) => api.delete<ApiResponse<{ message: string }>>(`/settings/${id}`),
};

export const chapterApi = {
  create: (data: { novelId: string; chapterNumber: number; title: string; content?: string }) =>
    api.post<ApiResponse<Chapter>>("/chapters", data),
  
  getAll: (params: { novelId: string; page?: number; pageSize?: number; status?: string }) =>
    api.get<PaginatedResponse<Chapter>>("/chapters", { params }),
  
  getById: (id: string) => api.get<ApiResponse<Chapter>>(`/chapters/${id}`),
  
  update: (id: string, data: Partial<Chapter>) =>
    api.put<ApiResponse<Chapter>>(`/chapters/${id}`, data),
  
  delete: (id: string) => api.delete<ApiResponse<{ message: string }>>(`/chapters/${id}`),
  
  publish: (id: string) => api.put<ApiResponse<Chapter>>(`/chapters/${id}/publish`),
};

export const aiApi = {
  generate: (data: { novelId: string; prompt: string; model?: string; temperature?: number }) =>
    api.post<ApiResponse<{ content: string; model: string; wordCount: number }>>("/ai/generate", data),
  
  polish: (data: { text: string; removeAI?: boolean; unifyStyle?: boolean }) =>
    api.post<ApiResponse<{ original: string; polished: string; wordCount: number }>>("/ai/polish", data),
  
  continue: (data: { chapterId: string; prompt: string; suggestions?: number }) =>
    api.post<ApiResponse<{ suggestions: string[]; chapterId: string }>>("/ai/continue", data),
};
