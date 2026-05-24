import { getToken, clearToken } from './auth';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000')
  .replace(/\/api\/?$/, '')
  .replace(/\/$/, '');

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
  getAddresses: () => fetchWithAuth('/api/users/me/addresses', { method: 'GET' }),
  addAddress: (data) => fetchWithAuth('/api/users/me/addresses', { method: 'POST', body: JSON.stringify(data) }),

  // Products
  getProducts: async (query = '') => {
    const res = await fetchWithAuth(`/api/products${query ? '?' + query : ''}`, { method: 'GET' });
    
    // Inject mock products for UI testing if the database is empty
    if (res.success && (!res.data || res.data.length === 0)) {
      let mockProducts = [
        {
          id: '1', slug: 'w1', name: 'Midnight Velvet Gown', price: 129900, 
          images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2071&auto=format&fit=crop'], 
          is_new: true, category: 'Western'
        },
        {
          id: '2', slug: 'w2', name: 'Silk Draped Corset', price: 54900, compare_price: 64900, 
          images: ['https://images.unsplash.com/photo-1550639524-a6f58345a587?q=80&w=2070&auto=format&fit=crop'], 
          category: 'Western'
        },
        {
          id: '3', slug: 'w3', name: 'Asymmetric Blazer Dress', price: 89900, 
          images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop'], 
          category: 'Western'
        },
        {
          id: '4', slug: 'b1', name: 'Royal Zardosi Lehenga', price: 450000, 
          images: ['https://images.unsplash.com/photo-1583391733958-d65293405781?q=80&w=1999&auto=format&fit=crop'], 
          is_new: true, category: 'Bridal'
        },
        {
          id: '5', slug: 'i1', name: 'Embroidered Anarkali', price: 125000, 
          images: ['https://images.unsplash.com/photo-1610030469983-98e550d615ef?q=80&w=1974&auto=format&fit=crop'], 
          category: 'Indo Western'
        },
        {
          id: '6', slug: 'k1', name: 'Little Princess Gown', price: 45000, 
          images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=2026&auto=format&fit=crop'], 
          category: 'Kids'
        }
      ];

      // Apply basic filters to mock data if query params exist
      if (query.includes('category=')) {
        const urlParams = new URLSearchParams(query);
        const cats = urlParams.get('category')?.split(',').map(c => c.toLowerCase().replace('-', ' ')) || [];
        if (cats.length > 0) {
          mockProducts = mockProducts.filter(p => cats.includes(p.category.toLowerCase()));
        }
      }

      res.data = mockProducts;
    }
    return res;
  },
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
