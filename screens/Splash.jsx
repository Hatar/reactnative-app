import { SafeAreaView } from 'react-native';
import Circle from '../components/Circle';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => { 
    const timeOut = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 2000);
    return () => clearTimeout(timeOut); 
  }, []);

  return (
    <SafeAreaView className="bg-primary flex-1 justify-center items-center relative">
      <Circle background={'white'} />
    </SafeAreaView>
  );
}

export default Splash; 
