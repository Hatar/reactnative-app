import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "../screens/Splash";
import WelcomeScreen from "../screens/Welcome";
import SigninScreen from "../screens/Signin";
import SignupScreen from "../screens/Signup";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import HomeScren from "../screens/Home";
import AboutUsScreen from "../screens/AboutUs";
import ProfileScreen from "../screens/Profile";
import InfoFoodScreen from "../screens/InfoFood";
import FoodsScreen from "../screens/Foods";
import CheckoutScreen from "../screens/Checkout";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { View,Text } from 'react-native';

//Screen names
const Splash = "Splash";
const Home = "Home";
const Profile = "Profile";
const AboutUs = "AboutUs";
const MainTabs = "MainTabs";
const Checkout = "Checkout";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const {items} = useSelector((state)=>state.carts)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === Home) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === Profile) {
            iconName = iconName = focused ? 'people-circle' : 'people-circle-outline'
          } else if (rn === AboutUs) {
            iconName = iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (rn === Checkout) {
            iconName = iconName = focused ? 'bag-check' : 'bag-check-outline';
          }
          return (
            <View className="relative">
              <Ionicons name={iconName} size={31} color={color} />
              { rn === Checkout && items.length ? <View className="absolute bottom-3 left-5 w-6 h-6 rounded-full bg-red-500 text-center d-flex justify-center items-center self-center">
                <Text className="text-white">{items.length}</Text>
                </View> : null
              }
              {focused ? <View className="w-8 border-b-2 border-primary mt-1" />: null}
            </View>
          )
        },
        headerShown: false,
        tabBarStyle: {
          paddingTop: 10,
          height:90,
          backgroundColor: '#f6f5ff',
        },
        tabBarLabelStyle: {
          fontSize: 18, 
          fontWeight: '500',
          display: 'none',
        },
        tabBarActiveTintColor: '#f9c32d',
        tabBarInactiveTintColor: '#100c09'
      })}
    >
      <Tab.Screen name={Home} component={HomeScren} />
      <Tab.Screen name={Checkout} component={CheckoutScreen} /> 
      <Tab.Screen name={Profile} component={ProfileScreen} />
      <Tab.Screen name={AboutUs} component={AboutUsScreen} />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Splash} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Splash} component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Foods" component={FoodsScreen} />
        <Stack.Screen name="InfoFood" component={InfoFoodScreen} />
        <Stack.Screen name={MainTabs} component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;