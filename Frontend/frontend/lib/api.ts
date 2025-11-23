import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface Document {
  id: string;
  originalName: string;
  objectName: string;
  url: string;
  type: 'legal' | 'financial' | 'other';
  status: 'pending' | 'processing' | 'processed' | 'error';
  size: number;
  mimeType: string;
  extractedText?: string;
  uploadedAt: string;
  processedAt?: string;
  error?: string;
}

export interface Report {
  id: string;
  type: 'synthesis' | 'competitive_analysis' | 'business_plan';
  status: 'ready' | 'in_progress' | 'completed' | 'error';
  documentIds: string[];
  content?: string;
  createdAt: string;
  completedAt?: string;
  error?: string;
}

// Documents API
export const documentsApi = {
  upload: async (file: File, type?: 'legal' | 'financial' | 'other'): Promise<Document> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<Document>('/documents/upload', formData, {
      params: { type },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  process: async (documentId: string): Promise<Document> => {
    const response = await api.post<Document>(`/documents/${documentId}/process`);
    return response.data;
  },

  getAll: async (): Promise<Document[]> => {
    const response = await api.get<Document[]>('/documents');
    return response.data;
  },

  getById: async (documentId: string): Promise<Document> => {
    const response = await api.get<Document>(`/documents/${documentId}`);
    return response.data;
  },

  delete: async (documentId: string): Promise<void> => {
    await api.delete(`/documents/${documentId}`);
  },
};

// Reports API
export const reportsApi = {
  create: async (
    type: 'synthesis' | 'competitive_analysis' | 'business_plan',
    documentIds: string[],
  ): Promise<Report> => {
    const response = await api.post<Report>('/reports', { type, documentIds });
    return response.data;
  },

  generate: async (reportId: string): Promise<Report> => {
    const response = await api.post<Report>(`/reports/${reportId}/generate`);
    return response.data;
  },

  getAll: async (): Promise<Report[]> => {
    const response = await api.get<Report[]>('/reports');
    return response.data;
  },

  getById: async (reportId: string): Promise<Report> => {
    const response = await api.get<Report>(`/reports/${reportId}`);
    return response.data;
  },

  delete: async (reportId: string): Promise<void> => {
    await api.delete(`/reports/${reportId}`);
  },
};

export default api;
