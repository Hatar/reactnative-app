import { StatusBar, StyleSheet, TouchableOpacity,View,Text,Image } from 'react-native';
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
import AdminScreen from './screens/AdminScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from './screens/Settings';
import arrowBack from './assets/arrow_back.png'
import settingsIcon from './assets/settings.png'
import aboutIcon from './assets/information-button.png'
import SignOutIcon from './assets/logout.png'
import MealIcon from './assets/meal.png'
import CombosIcon from './assets/combos.png'

export default function App() {
  
  const [fontLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });
  if (!fontLoaded) return null;

  // Navigation Setup
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const CustomDrawerContent = ({ navigation }) => {
    const menuItems = [
      { label: 'Meals', navigateTo: 'Meals', icon: MealIcon }, 
      { label: 'Combos', navigateTo: 'Combos',icon: CombosIcon },
      { label: 'Settings', navigateTo: 'Settings',icon: settingsIcon },
      { label: 'About Us', navigateTo: 'About Us',icon: aboutIcon },
    ];

    const userMenuItems = [
      { label: 'Sign Out', navigateTo: 'Signin',icon:SignOutIcon }, // Assuming you have a 'SignOut' route
    ];

    const renderMenuItems = (items) => {
      return items.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate(item.navigateTo)} style={styles.menuItem}>
          {item.icon && <Image style={styles.icons} source={item.icon} />}
          <Text style={styles.item_slider}>{item.label}</Text>
        </TouchableOpacity>
      ));
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AdminScreen/>
        <View style={styles.content_slider}>
          <View>{renderMenuItems(menuItems)}</View>
          <View>{renderMenuItems(userMenuItems)}</View>
        </View>
      </SafeAreaView>
    );
  };


  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={() => ({
          headerShown: true,
          headerTitle: 'Menu',
          drawerStyle: {
            backgroundColor: COLORS.white,
            width: 300,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                console.log('Right icon pressed');
              }}
              style={{ marginRight: 15 }}
            >
              <CartIcon />
            </TouchableOpacity>
          ),
        })}
        drawerContent={props => <CustomDrawerContent {...props} />} // Use custom drawer content
      >
        <Drawer.Screen name="Meals" component={Home} initialParams={{ title: 'Meals' }} />
        <Drawer.Screen name="Combos" component={Home} initialParams={{ title: 'Combos' }} />
        <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Drawer.Screen name="About Us" component={AboutUs} options={{ headerShown: false }} />
      </Drawer.Navigator>
    );
  };

  return (
    <>
      <StatusBar style="light" animated={true} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="InfoFood" component={InfoFood} />
          <Stack.Screen name="Home" component={DrawerNavigator} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Cart" component={Cart} />
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
  content_slider:{
    flex: 1,
    flexDirection:"column",
    justifyContent:"space-between",
    marginVertical:30 
  },
  item_slider:{
    padding: 15,
    fontSize: 18,
    color: COLORS.cardBg
  },
  icons: {
    width: 24,
    height: 24,
  },
  menuItem: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically center the icon and text
    padding: 15,
  }
});
