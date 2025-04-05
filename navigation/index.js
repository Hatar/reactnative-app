import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Welcome from "../screens/Welcome";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import { COLORS, ICONS } from "../constants";
import AboutUs from "../screens/AboutUs";
import CartIcon from "../components/CartIcon";
import InfoFood from "../screens/InfoFood";
import Checkout from "../screens/Checkout";
import Cart from "../screens/Cart";
import AdminScreen from "../screens/AdminScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import aboutIcon from "../assets/information-button.png";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../screens/Categories";
import Foods from "../screens/Foods";
import Profile from "../screens/Profile";
import { signOut } from "../redux/slices/auth/authSlice";
const Navigation = () => {
  const menuItems = [
    { 
      label: "Home",
      navigateTo: "Home",
      icon: ICONS.logo
    },
    {
      label: "Profile",
      navigateTo: "Profile",
      icon: ICONS.profileIcon,
    },
    {
      label: "Categories",
      navigateTo: "Categories",
      icon: ICONS.combosIcon,
    },
    {
      label: "Foods",
      navigateTo: "Foods",
      icon: ICONS.mealIcon,
    },
    { label: "About Us", navigateTo: "About Us", icon: aboutIcon },
  ]

  const dispatch = useDispatch();


  const {role} = useSelector((state) => state.auth);
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const CustomDrawerContent = ({ navigation }) => {
    const filteredMenuItems = role === "admin"
      ? menuItems
      : menuItems.filter(item => item.label !== "Categories" && item.label !== "Foods");
    const userMenuItems = [
      { label: "Sign Out", navigateTo: "Signin", icon: ICONS.SignOutIcon },
    ];

    const renderMenuItems = (items) => {
      const uniqueItems = [
        ...new Map(items.map((item) => [item.label, item])).values(),
      ];
      return uniqueItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>{
            if(item.label === "Sign Out") {
              dispatch(signOut())
              navigation.navigate("Signin")
            } else {
              navigation.navigate(item.navigateTo, {
                params: { menuId: item.id },
              })
            }
          }}
          style={styles.menuItem}
        >
          {item.icon && <Image style={styles.icons} source={item.icon} />}
          <Text style={styles.item_slider}>{item.label}</Text>
        </TouchableOpacity>
      ));
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AdminScreen />
        <View style={styles.content_slider}>
          <View>{renderMenuItems(filteredMenuItems)}</View>
          <View>{renderMenuItems(userMenuItems)}</View>
        </View>
      </SafeAreaView>
    );
  };

  const DrawerNavigator = () => {
    const uniqueMenuItems = Array.from(
      new Map(menuItems.map((item) => [item.label, item])).values()
    );
    const getComponentForMenu = (label) => {
      switch (label) {
        case "Profile":
          return Profile
        case "Foods":
          return Foods
        case "Categories":
          return Categories
        case "About Us":
          return AboutUs;
        default:
          return Home;
      }
    };
    return (
      <Drawer.Navigator
        screenOptions={() => ({
          headerShown: true,
          headerTitle: "Menu",
          drawerStyle: {
            backgroundColor: COLORS.white,
            width: 300,
          },
          headerRight: () => 
            role !=="admin" ? (
              <TouchableOpacity
                onPress={() => {
                }}
                style={{ marginRight: 15 }}
              >
                <CartIcon />
              </TouchableOpacity>
            ) : null
        })
    }
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {uniqueMenuItems &&
          uniqueMenuItems.length > 0 &&
          uniqueMenuItems.map((menu, index) => {
            const Component = getComponentForMenu(menu.label);
            return (
              <Drawer.Screen
                key={index}
                name={menu.label}
                component={Component}
                initialParams={{ title: menu.label, menuId: menu.id }}
                options={{
                  headerShown:menu.label !== "About Us",
                }}
              />
            );
          })}
      </Drawer.Navigator>
    );
  };
  return (
    <>
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
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Foods" component={Foods} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content_slider: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  item_slider: {
    padding: 15,
    fontSize: 18,
    color: COLORS.cardBg,
  },
  icons: {
    width: 24,
    height: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center", // Vertically center the icon and text
    padding: 15,
  },
});

export default Navigation;
