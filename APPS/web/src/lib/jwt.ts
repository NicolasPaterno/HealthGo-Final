// APPS/web/src/lib/jwt.ts

export interface DecodedToken {
  name: string;
  email: string;
  nameid: string;
  role: string;
  exp: number;
  [key: string]: any;
}
  
  export function decodeJwt(token: string): DecodedToken | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to decode JWT:", e);
      return null;
    }
  }
  
  export function getAuthUser(): DecodedToken | null {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return null;
    }
    const decoded = decodeJwt(token);
    // Optional: check token expiry here
    if (decoded && decoded.exp * 1000 < Date.now()) {
      console.warn("Auth token expired.");
      localStorage.removeItem('authToken'); // Clear expired token
      return null;
    }
    return decoded;
  }