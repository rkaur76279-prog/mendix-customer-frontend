// API Service for Mendx Platform
const BASE_URL = import.meta.env.VITE_API_URL || 'https://mendix-backend.onrender.com/api';

const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    const token = localStorage.getItem('mendx_auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

const handleResponse = async (res) => {
  let data;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await res.json().catch(() => ({}));
  } else {
    const text = await res.text();
    data = { error: text || `Request failed with status ${res.status}` };
  }
  if (import.meta.env.DEV) {
    console.log(`[Backend API] Received ${res.status} from ${res.url}`, data);
  }
  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
  }
  return data;
};

export const api = {
  // Auth
  auth: {
    register: async (userData) => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(userData),
      });
      return handleResponse(res);
    },
    login: async (credentials) => {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(credentials),
      });
      return handleResponse(res);
    },
    loginWithOtp: async (email) => {
      const res = await fetch(`${BASE_URL}/auth/login-with-otp`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ email }),
      });
      return handleResponse(res);
    },
    verifyOtp: async ({ challengeId, otp }) => {
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ challengeId, otp }),
      });
      return handleResponse(res);
    },
    resendOtp: async ({ challengeId }) => {
      const res = await fetch(`${BASE_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ challengeId }),
      });
      return handleResponse(res);
    },
    getMe: async () => {
      const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: getHeaders(true),
      });
      return handleResponse(res);
    },
    logout: async () => {
      localStorage.removeItem('mendx_auth_token');
      localStorage.removeItem('mendx_user');
      try {
        await fetch(`${BASE_URL}/auth/logout`, { method: 'POST' });
      } catch (e) {
        // Ignored
      }
    },
  },

  // Categories (5 Primary Home Services Categories)
  categories: {
    getAll: async () => {
      const res = await fetch(`${BASE_URL}/categories`, {
        headers: getHeaders(false),
      });
      return handleResponse(res);
    },
    getBySlug: async (slug) => {
      const res = await fetch(`${BASE_URL}/categories/${encodeURIComponent(slug)}/services`, {
        headers: getHeaders(false),
      });
      return handleResponse(res);
    },
  },

  // Services
  services: {
    search: async (q) => {
      const res = await fetch(`${BASE_URL}/services/search?q=${encodeURIComponent(q)}`, {
        headers: getHeaders(false),
      });
      return handleResponse(res);
    },
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${BASE_URL}/services${query ? `?${query}` : ''}`, {
        headers: getHeaders(false),
      });
      return handleResponse(res);
    },
    getById: async (id) => {
      const res = await fetch(`${BASE_URL}/services/${id}`, {
        headers: getHeaders(false),
      });
      return handleResponse(res);
    },
    getByCategory: async (category) => {
      const res = await fetch(`${BASE_URL}/services/category/${encodeURIComponent(category)}`, {
        headers: getHeaders(false),
      });
      return handleResponse(res);
    },
    create: async (data) => {
      const res = await fetch(`${BASE_URL}/services`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    update: async (id, data) => {
      const res = await fetch(`${BASE_URL}/services/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    delete: async (id) => {
      const res = await fetch(`${BASE_URL}/services/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true),
      });
      return handleResponse(res);
    },
  },

  // Bookings
  bookings: {
    create: async (bookingData) => {
      const res = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(bookingData),
      });
      return handleResponse(res);
    },
    getMyBookings: async (email = '') => {
      const query = email ? `?email=${encodeURIComponent(email)}` : '';
      const res = await fetch(`${BASE_URL}/bookings/my-bookings${query}`, {
        headers: getHeaders(true),
      });
      return handleResponse(res);
    },
    getById: async (id) => {
      const res = await fetch(`${BASE_URL}/bookings/${id}`, {
        headers: getHeaders(true),
      });
      return handleResponse(res);
    },
    cancel: async (id, reason = '') => {
      const res = await fetch(`${BASE_URL}/bookings/${id}/cancel`, {
        method: 'PATCH',
        headers: getHeaders(true),
        body: JSON.stringify({ reason }),
      });
      return handleResponse(res);
    },
    reschedule: async (id, bookingDate, timeSlot) => {
      const res = await fetch(`${BASE_URL}/bookings/${id}/reschedule`, {
        method: 'PATCH',
        headers: getHeaders(true),
        body: JSON.stringify({ bookingDate, timeSlot }),
      });
      return handleResponse(res);
    },
    updateStatus: async (id, status, assignedWorkerId = null) => {
      const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: getHeaders(true),
        body: JSON.stringify({ status, assignedWorkerId }),
      });
      return handleResponse(res);
    },
    getAllAdmin: async () => {
      const res = await fetch(`${BASE_URL}/bookings`, {
        headers: getHeaders(true),
      });
      return handleResponse(res);
    },
  },

  // Reviews
  reviews: {
    submit: async (reviewData) => {
      const res = await fetch(`${BASE_URL}/reviews`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(reviewData),
      });
      return handleResponse(res);
    },
    getByService: async (serviceId) => {
      const res = await fetch(`${BASE_URL}/reviews/service/${encodeURIComponent(serviceId)}`, {
        headers: getHeaders(false),
      });
      return handleResponse(res);
    },
    getMyReviews: async () => {
      const res = await fetch(`${BASE_URL}/reviews/my-reviews`, {
        headers: getHeaders(true),
      });
      return handleResponse(res);
    },
  },

  // Coupons
  coupons: {
    validate: async (code, orderAmount) => {
      const res = await fetch(`${BASE_URL}/coupons/validate`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ code, orderAmount }),
      });
      return handleResponse(res);
    },
    getAll: async () => {
      const res = await fetch(`${BASE_URL}/coupons`, {
        headers: getHeaders(true),
      });
      return handleResponse(res);
    },
    create: async (data) => {
      const res = await fetch(`${BASE_URL}/coupons`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
    toggleActive: async (id, isActive) => {
      const res = await fetch(`${BASE_URL}/coupons/${id}`, {
        method: 'PATCH',
        headers: getHeaders(true),
        body: JSON.stringify({ isActive }),
      });
      return handleResponse(res);
    },
  },

  // Platform Stats
  stats: {
    get: async () => {
      const res = await fetch(`${BASE_URL}/stats`, {
        headers: getHeaders(false),
      });
      return handleResponse(res);
    },
  },

  // Waitlist
  waitlist: {
    join: async (email, role, city) => {
      const res = await fetch(`${BASE_URL}/waitlist`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ email, role, city }),
      });
      return handleResponse(res);
    },
  },

  // Contact
  contact: {
    submit: async (data) => {
      const res = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    },
  },
};

export default api;
