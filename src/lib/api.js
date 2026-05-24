import { getToken, clearToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetchWithAuth(url, options = {}) {
  let token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    let response;
    try {
      response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers
      });
    } catch (networkError) {
      // Catch network errors (like server down) so we don't crash
      return { success: false, message: 'Could not connect to the server. Please ensure the backend is running.' };
    }

    // Handle 401 Unauthorized (Token expiry)
    if (response.status === 401) {
      // Try to refresh token
      // Note: We are relying on httpOnly cookie for refresh token to be sent automatically if we implemented it that way
      // But we can also call a refresh endpoint
      try {
        const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, { method: 'POST', credentials: 'include' });
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          if (data.success && data.data.accessToken) {
            // Update token and retry
            localStorage.setItem('accessToken', data.data.accessToken);
            headers['Authorization'] = `Bearer ${data.data.accessToken}`;
            response = await fetch(`${API_URL}${url}`, { ...options, headers });
          }
        } else {
          clearToken();
          if (typeof window !== 'undefined') window.location.href = '/auth/login';
          throw new Error('Session expired');
        }
      } catch (e) {
        clearToken();
        if (typeof window !== 'undefined') window.location.href = '/auth/login';
        throw new Error('Session expired');
      }
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export const api = {
  // Auth
  login: (data) => fetchWithAuth('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => fetchWithAuth('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => fetchWithAuth('/api/auth/logout', { method: 'POST' }),
  getMe: () => fetchWithAuth('/api/users/me', { method: 'GET' }),

  // Products
  getProducts: (query = '') => fetchWithAuth(`/api/products${query ? '?' + query : ''}`, { method: 'GET' }),
  getProduct: (slug) => fetchWithAuth(`/api/products/${slug}`, { method: 'GET' }),

  // Cart
  getCart: () => fetchWithAuth('/api/cart', { method: 'GET' }),
  addToCart: (data) => fetchWithAuth('/api/cart', { method: 'POST', body: JSON.stringify(data) }),
  updateCartItem: (id, quantity) => fetchWithAuth(`/api/cart/${id}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
  removeFromCart: (id) => fetchWithAuth(`/api/cart/${id}`, { method: 'DELETE' }),
  clearCart: () => fetchWithAuth('/api/cart', { method: 'DELETE' }),

  // Wishlist
  getWishlist: () => fetchWithAuth('/api/wishlist', { method: 'GET' }),
  addToWishlist: (productId) => fetchWithAuth('/api/wishlist', { method: 'POST', body: JSON.stringify({ product_id: productId }) }),
  removeFromWishlist: (productId) => fetchWithAuth(`/api/wishlist/${productId}`, { method: 'DELETE' }),

  // Orders
  createOrder: (data) => fetchWithAuth('/api/orders', { method: 'POST', body: JSON.stringify(data) }),
  getOrders: () => fetchWithAuth('/api/orders', { method: 'GET' }),
  getOrder: (id) => fetchWithAuth(`/api/orders/${id}`, { method: 'GET' }),

  // Consultations
  bookConsultation: (data) => fetchWithAuth('/api/consultations/book', { method: 'POST', body: JSON.stringify(data) }),
  getConsultations: () => fetchWithAuth('/api/consultations', { method: 'GET' }),
  getExperts: () => fetchWithAuth('/api/experts', { method: 'GET' }),
  getBranches: () => fetchWithAuth('/api/branches', { method: 'GET' }),

  // Academy
  getCourses: (query = '') => fetchWithAuth(`/api/courses${query ? '?' + query : ''}`, { method: 'GET' }),
  getCourse: (slug) => fetchWithAuth(`/api/courses/${slug}`, { method: 'GET' }),
  enrollCourse: (id) => fetchWithAuth(`/api/enrollments/courses/${id}/enroll`, { method: 'POST' }),
  
  // Analytics
  getRevenue: (period) => fetchWithAuth(`/api/analytics/revenue?period=${period}`, { method: 'GET' }),
  getOrderStats: () => fetchWithAuth('/api/analytics/orders', { method: 'GET' }),
  getBestSellingProducts: () => fetchWithAuth('/api/analytics/products', { method: 'GET' }),
};
