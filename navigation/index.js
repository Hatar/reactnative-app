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
import CategoryScreen from "../screens/Categories";
import CheckoutScreen from "../screens/Checkout";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import ModalWrapper from '../components/ModalWrapper';

//Screen names
const Splash = "Splash";
const Home = "Home";
const Profile = "Profile";
const Foods = "Foods";
const Category = "Category";
const AboutUs = "AboutUs";
const MainTabs = "MainTabs";
const Checkout = "Checkout";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const {items} = useSelector((state)=>state.carts)
  const {role} = useSelector((state)=>state.auth)
  const isAdmin = role === "admin"

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let rn = route.name;
          
          if (rn === Home) {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (rn === Profile) {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (rn === Foods) {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (rn === Category) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === AboutUs) {
            iconName = focused ? 'layers' : 'layers-outline';
          } else if (rn === Checkout) {
            iconName = focused ? 'bag-handle' : 'bag-handle-outline';
          }
          
          return (
            <View className={`items-center justify-center w-16 h-16 ${focused ? 'bg-primary/10 rounded-2xl' : ''}`}>
              <View className="relative">
                <Ionicons 
                  name={iconName} 
                  size={28} 
                  color={color}
                />
                {rn === Checkout && items.length > 0 && (
                  <View className="absolute -top-1 -right-2 min-w-[20px] h-[20px] rounded-full bg-red-500 justify-center items-center px-1">
                    <Text className="text-[11px] font-bold text-white">{items.length}</Text>
                  </View>
                )}
              </View>
            </View>
          );
        },
        tabBarStyle: {
          height: 75,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#f1f1f1',
          paddingVertical: 12,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#f9c32d',
        tabBarInactiveTintColor: '#757575',
      })}
    >
      {isAdmin ? (
        <>
          <Tab.Screen name={Foods} component={FoodsScreen} />
          <Tab.Screen name={Category} component={CategoryScreen} />
          <Tab.Screen name={Profile} component={ProfileScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name={Home} component={HomeScren} />
          <Tab.Screen name={Checkout} component={CheckoutScreen} />
          <Tab.Screen name={Profile} component={ProfileScreen} />
          <Tab.Screen name={AboutUs} component={AboutUsScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}

const Navigation = () => {
  const {isModalVisible} = useSelector((state) => state.generals);
  
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
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="InfoFood" component={InfoFoodScreen} />
        <Stack.Screen name={MainTabs} component={TabNavigator} />
      </Stack.Navigator>
      {isModalVisible && <ModalWrapper/>}
    </NavigationContainer>
  )
}

export default Navigation;