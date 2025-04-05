import { StatusBar } from 'react-native';
import Navigation from './navigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import config from './config';
import ModalWrapper from './components/ModalWrapper';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
export default function App() {
  const {isModalVisible} = useSelector((state) => state.generals);
  return (
    <NavigationContainer>
      <StatusBar style="light" animated={true} />
      <StripeProvider publishableKey={config.PUBLISH_KEY}>
        <Navigation />
      </StripeProvider>
      {isModalVisible && <ModalWrapper/>}
    </NavigationContainer>
  );
}
