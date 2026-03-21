import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('aileraner_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('aileraner_token');
      localStorage.removeItem('aileraner_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
};

export const userApi = {
  getMe: () => api.get('/users/me'),
  updateMe: (data) => api.put('/users/me', data),
  updatePassword: (data) => api.put('/users/password', data)
};

export const courseApi = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  enroll: (id) => api.post(`/courses/${id}/enroll`)
};

export const progressApi = {
  getByCourse: (courseId) => api.get(`/progress/${courseId}`),
  update: (courseId, data) => api.put(`/progress/${courseId}`, data),
  getAll: () => api.get('/progress')
};

export const sessionApi = {
  getAll: (params) => api.get('/sessions', { params }),
  getById: (id) => api.get(`/sessions/${id}`),
  join: (id) => api.post(`/sessions/${id}/join`)
};

export const quizApi = {
  getByCourse: (courseId) => api.get(`/quizzes/${courseId}`),
  submit: (id, answers) => api.post(`/quizzes/${id}/submit`, { answers })
};

export const aiApi = {
  chat: (messages, context) => api.post('/ai/chat', { messages, context }),
  roadmap: (topic, level) => api.post('/ai/roadmap', { topic, currentLevel: level }),
  analyzeNotes: (notes) => api.post('/ai/analyze-notes', { notes }),
  analyze: (data) => api.post('/ai/analyze', data),
  careerAnalysis: (skills, role) => api.post('/ai/career-analysis', { skills, targetRole: role })
};

export default api;
