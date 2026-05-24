// Dummy implementation for decoding JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export const setToken = (accessToken, refreshToken) => {
  if (typeof window !== 'undefined') {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken); // Though backend uses httpOnly cookies, sometimes we store it if sent in body
  }
};

export const clearToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  const decoded = parseJwt(token);
  if (!decoded) return false;
  
  // Check expiry
  if (decoded.exp * 1000 < Date.now()) {
    clearToken();
    return false;
  }
  
  return true;
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  
  const decoded = parseJwt(token);
  return decoded ? decoded.role : null;
};

export const getUserId = () => {
  const token = getToken();
  if (!token) return null;
  
  const decoded = parseJwt(token);
  return decoded ? decoded.id : null;
};
