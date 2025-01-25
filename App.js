import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import { COLORS } from './constants';
import AboutUs from './screens/AboutUs';
import CartIcon from './components/CartIcon';
import InfoFood from './screens/InfoFood';
import Checkout from './screens/Checkout';
import Cart from './screens/Cart';

export default function App() {
  // load Fonts App
  const [fontLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });
  if (!fontLoaded) return null;


  // initial Rooting App
  const Stack = createNativeStackNavigator()
  const Drawer = createDrawerNavigator();
  

  // Drawer Navigation Component
  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={() => ({
          headerShown: true,
          headerTitle: 'Menu',
          drawerStyle: {
            backgroundColor: COLORS.gray,
            width: 230,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                console.log('Right icon pressed');
              }}
              style={{ marginRight: 15 }}
            >
              <CartIcon/>
            </TouchableOpacity>
          ),
        })}
      >
        <Drawer.Screen name="Home" component={Home} initialParams={{ title: 'Meals' }}  options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="Meals" component={Home} initialParams={{ title: 'Meals' }} />
        <Drawer.Screen name="Combos" component={Home} initialParams={{ title: 'Combos' }} />
        <Drawer.Screen name="About Us" component={AboutUs} options={{ headerShown: false }}  />
      </Drawer.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="light" animated={true} />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Welcome' 
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name='InfoFood' component={InfoFood} />
          <Stack.Screen name="Home" component={DrawerNavigator} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name='Checkout' component={Checkout} />
          <Stack.Screen name='Cart' component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
