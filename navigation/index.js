import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Welcome from "../screens/Welcome";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import { COLORS } from "../constants";
import AboutUs from "../screens/AboutUs";
import CartIcon from "../components/CartIcon";
import InfoFood from "../screens/InfoFood";
import Checkout from "../screens/Checkout";
import Cart from "../screens/Cart";
import AdminScreen from "../screens/AdminScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import settingsIcon from "../assets/settings.png";
import aboutIcon from "../assets/information-button.png";
import SignOutIcon from "../assets/logout.png";
import MealIcon from "../assets/meal.png";
import CombosIcon from "../assets/combos.png";
import { useSelector } from "react-redux";
import { FIREBASE_DB } from "../firebase";
import { useEffect, useState } from "react";
import { capitalize } from "../helpers";
import { collection, onSnapshot } from "firebase/firestore";

const Navigation = () => {
  const [menuItems, setMenuItems] = useState([
    { label: "About Us", navigateTo: "About Us", icon: aboutIcon },
  ]);
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const isAdmin = useSelector((state) => state.auth.isAdminAuthenticated);
  
  useEffect(() => {
    if (isAdmin) {
      setMenuItems((prevMenuItems) => {
        const alreadyExists = prevMenuItems.some(
          (item) => item.label === "Admin"
        );
        if (alreadyExists) return prevMenuItems;

        return [
          {
            id: prevMenuItems.length + 1,
            label: "Admin",
            navigateTo: "Admin",
            icon: settingsIcon,
          },
          ...prevMenuItems,
        ];
      });
    }
  }, [isAdmin]);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesColl = collection(FIREBASE_DB, "categories");
      const unsubscribe = onSnapshot(categoriesColl, (snapshot) => {
        const categoriesData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMenuItems((prevMenuItems) => [
          ...categoriesData.map((category) => ({
            label: capitalize(category.name),
            navigateTo: capitalize(category.name),
            id: category.id,
            icon: category.name === "meals" ? MealIcon : CombosIcon,
          })),
          ...prevMenuItems,
        ]);

        console.log("Fetched categories:", categoriesData);
      });

      return () => unsubscribe();
    };

    getCategories();
  }, []);

  const CustomDrawerContent = ({ navigation }) => {
    const userMenuItems = [
      { label: "Sign Out", navigateTo: "Signin", icon: SignOutIcon },
    ];

    const renderMenuItems = (items) => {
      const uniqueItems = [
        ...new Map(items.map((item) => [item.label, item])).values(),
      ];
      return uniqueItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate(item.navigateTo, {
              params: { menuId: item.id },
            })
          }
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
          <View>{renderMenuItems(menuItems)}</View>
          <View>{renderMenuItems(userMenuItems)}</View>
        </View>
      </SafeAreaView>
    );
  };

  const DrawerNavigator = () => {
    const uniqueMenuItems = Array.from(
      new Map(menuItems.map((item) => [item.label, item])).values()
    );
    const isAdmin = useSelector((state) => state.auth.isAdminAuthenticated);
    const getComponentForMenu = (label) => {
      switch (label) {
        case "Meals":
        case "Combos":
        case "Juice":
          return Home;
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
            !isAdmin ? (
              <TouchableOpacity
                onPress={() => {
                  console.log("Right icon pressed");
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
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
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
