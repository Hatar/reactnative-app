import { StatusBar } from 'react-native';
import Navigation from './navigation';
export default function App() {
  return (
    <>
      <StatusBar style="light" animated={true} />
      <Navigation/>
    </>
  );
}
