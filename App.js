import { StatusBar } from 'react-native';
import Navigation from './navigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import config from './config';
export default function App() {
  return (
    <>
      <StatusBar style="light" animated={true} />
      <StripeProvider publishableKey={config.PUBLISH_KEY}>
        <Navigation />
      </StripeProvider>
    </>
  );
}
