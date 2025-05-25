import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export const checkAuthStatus = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('userEmail');
    
    if (!token) {
      return { isAuthenticated: false, role: null, email: null };
    }
    
    // Verify token expiration
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      // Token expired
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userEmail');
      return { isAuthenticated: false, role: null, email: null };
    }
    
    return { 
      isAuthenticated: true, 
      token,
      email,
      role: decoded.role 
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return { isAuthenticated: false, role: null, email: null };
  }
}; 