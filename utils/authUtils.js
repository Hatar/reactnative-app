import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export const checkAuthStatus = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return { isAuthenticated: false, role: null };
    }
    
    // Verify token expiration
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      // Token expired
      await AsyncStorage.removeItem('token');
      return { isAuthenticated: false, role: null };
    }
    
    return { 
      isAuthenticated: true, 
      token,
      role: decoded.role 
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return { isAuthenticated: false, role: null };
  }
}; 