import { SafeAreaView } from 'react-native';
import Circle from '../components/Circle';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from '../utils/authUtils';
import { restoreAuthState } from '../redux/slices/auth/authSlice';

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const authStatus = await checkAuthStatus();
        
        if (authStatus.isAuthenticated) {
          dispatch(restoreAuthState({
            token: authStatus.token,
            role: authStatus.role
          }));
          navigation.replace('MainTabs');
        } else {
          navigation.replace('Welcome');
        }
      } catch (error) {
        console.error('Initialization error:', error);
        navigation.replace('Welcome');
      }
    };

    const timeOut = setTimeout(initializeApp, 2000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <SafeAreaView className="bg-primary flex-1 justify-center items-center relative">
      <Circle background={'white'} />
    </SafeAreaView>
  );
}

export default Splash; 
