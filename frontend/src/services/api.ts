import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('career_ai_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('career_ai_refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        // Assuming refresh endpoint exists
        const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });
        
        localStorage.setItem('career_ai_token', data.token);
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        
        processQueue(null, data.token);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('career_ai_token');
        localStorage.removeItem('career_ai_refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Format errors to ApiResponse standard format (mocked here)
    const formattedError = {
      message: (error.response?.data as any)?.message || error.message,
      status: error.response?.status,
    };
    return Promise.reject(formattedError);
  }
);

export const apiHelper = {
  get: <T>(url: string, config = {}) => api.get<T>(url, config).then(res => res.data),
  post: <T>(url: string, data: any, config = {}) => api.post<T>(url, data, config).then(res => res.data),
  put: <T>(url: string, data: any, config = {}) => api.put<T>(url, data, config).then(res => res.data),
  patch: <T>(url: string, data: any, config = {}) => api.patch<T>(url, data, config).then(res => res.data),
  delete: <T>(url: string, config = {}) => api.delete<T>(url, config).then(res => res.data),
  upload: <T>(url: string, formData: FormData, config = {}) => 
    api.post<T>(url, formData, {
      ...config,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => res.data),
};

export default api;
