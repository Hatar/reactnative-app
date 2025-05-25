import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { addItemToCart } from "../redux/slices/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Buttons from "../components/Buttons";
const InfoFood = ({ route }) => {
  const { item } = route.params;
  const { items } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const navigation = useNavigation();



  // Get current item from cart if exists
  const cartItem = items.find((cartItem) => cartItem.foodId === item.foodId);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const addToCart = () => {
    dispatch(addItemToCart(item));
    Alert.alert(
      "Added to Cart! 🛒",
      `${item.title} has been added to your cart.`,
      [
        {
          text: "Continue Shopping",
          onPress: () => navigation.goBack(),
          style: "default",
        },
        {
          text: "View Cart",
          onPress: () => navigation.navigate("Checkout"),
          style: "default",
        }
      ],
      {
        cancelable: true,
        titleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#000"
        },
        messageStyle: {
          fontSize: 16,
          color: "#666",
          textAlign: "center",
          paddingVertical: 10
        }
      }
    );
  };

  const renderFoodInformation = () => {
    return (
      <>
        <View className="relative items-center justify-center pt-8">
          <Image
            source={{ uri: item.imageUrl }}
            className="w-72 h-72 rounded-full"
            resizeMode="cover"
          />
        </View>

        <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] min-h-[65%] shadow-xl">
          <ScrollView className="px-6 pt-8 pb-28">
            {/* Title and Price Section */}
            <View className="flex-row justify-between items-start mb-8">
              <View className="flex-1">
                <Text className="text-3xl font-bold text-gray-900 mb-3">
                  {item.title}
                </Text>
                <View className="flex-row items-center gap-2">
                  <Ionicons name="star" size={20} color="#f9c32d" />
                  <Text className="text-gray-600 font-semibold">4.8</Text>
                  <Text className="text-gray-400">(2.5k reviews)</Text>
                </View>
              </View>
              <View className="bg-primary/10 px-4 py-3 rounded-xl">
                <Text className="font-bold text-2xl text-primary">
                  ${currentQuantity > 1 ? (currentQuantity * item.price).toFixed(2) : item.price.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Ingredients Section */}
            <View className="mb-8">
              <Text className="text-2xl font-bold text-gray-900 mb-4">
                Ingredients
              </Text>
              <FlatList
                data={item.recepies}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                ItemSeparatorComponent={() => <View className="w-4" />}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: receip }) => {
                  // Map ingredients to appropriate icons
                  let iconName = "nutrition-outline";
                  if (receip.toLowerCase().includes("egg")) {
                    iconName = "egg-outline";
                  } else if (receip.toLowerCase().includes("meat")) {
                    iconName = "restaurant-outline";
                  } else if (receip.toLowerCase().includes("cheese")) {
                    iconName = "pizza-outline";
                  } else if (receip.toLowerCase().includes("vegetable")) {
                    iconName = "leaf-outline";
                  } else if (receip.toLowerCase().includes("spice")) {
                    iconName = "flame-outline";
                  } else if (receip.toLowerCase().includes("sauce")) {
                    iconName = "water-outline";
                  }
                  
                  return (
                    <View className="bg-primary/5 px-6 py-5 rounded-2xl items-center">
                      <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-3 shadow-sm">
                        <Ionicons name={iconName} size={24} color="#f9c32d" />
                      </View>
                      <Text className="font-medium text-gray-700">{receip}</Text>
                    </View>
                  );
                }}
              />
            </View>

            {/* Description Section */}
            <View className="mb-8">
              <Text className="text-2xl font-bold text-gray-900 mb-3">
                Description
              </Text>
              <Text className="text-gray-600 leading-7">
                {item.description}
              </Text>
            </View>
          </ScrollView>

          {/* Fixed Bottom Button */}
          <View className="absolute bottom-8 left-0 right-0 px-6">
            <Buttons
              title="Add to Cart"
              pressHandler={addToCart}
              stylesButton="w-full h-16 bg-primary rounded-2xl justify-center items-center shadow-lg shadow-yellow-400/30"
              stylesText="text-xl text-black font-bold"
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Header */}
      <View className="relative z-50 px-4">
        <View className="flex-row justify-between items-center">
          <BackButton goBack={() => navigation.goBack()} color="white" />
          <TouchableOpacity className="w-10 h-10 items-center justify-center absolute right-0 top-3">
            <Ionicons name="heart-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {renderFoodInformation()}
    </SafeAreaView>
  );
};

export default InfoFood;
