import { SafeAreaView, View, Text, Image } from "react-native";
import BackButton from "../components/BackButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import ButtonHandleQuantity from "../components/ButtonHandleQuantity";

const Checkout = () => {
  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <View className="mb-10 mt-5">
        <BackButton goBack={() => navigation.goBack()} color="black" />
      </View>

      <View className="mx-3 mt-8 mb-8">
        <Text className="text-2xl font-semiBold text-darkText">Checkout</Text>
      </View>

      <View className="ml-5 d-flex flex-row justify-start items-center gap-5 mb-7">
        <View className="w-16 h-16 rounded-full bg-white justify-center items-center self-center">
          <Ionicons name="navigate-outline" size={35} color="#f9c32d" />;
        </View>
        <View className="d-flex gap-2 w-full">
          <Text className="text-md font-semiBold text-darkText">
            Delivery Adress
          </Text>
          <Text className="text-md font-bold text-darkText">
            Downtown City,California USA
          </Text>
        </View>
      </View>

      {/* <View className="mx-4 bg-white h-40 rounded-3xl p-5">
            <View className="d-flex flex-row gap-8">
              <View>
                <Text>image</Text>
              </View>
              <View>
                <Text>title foood</Text>
                <Text>description foods </Text>
                <View className="d-flex flex-row justify-between gap-3">
                    <Text>$30</Text>
                    <ButtonHandleQuantity/>
                </View>
              </View>
            </View>
        </View> */}

      <View className="mx-4 bg-white shadow-lg shadow-gray-300 rounded-l-full rounded-r-2xl rounded-br-2xl py-2">
        <View className="flex flex-row gap-4">
          {/* Image placeholder - replace with your Image component */}
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dWRvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
              }}
              className="w-48 h-48 rounded-full -left-1"
              resizeMode="cover"
            />

          <View className="flex-1">
            {/* Food title and description */}
            <Text className="text-lg font-bold text-gray-900">
              Beef Udon Soup
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Thai-style noodles in a spicy broth
            </Text>

            {/* Price and quantity selector */}
            <View className="flex flex-row justify-between items-center mt-3">
              <Text className="text-lg font-bold text-gray-900">$35.99</Text>
              <View className="flex-row items-center px-3 py-1">
                <ButtonHandleQuantity />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* <CartItems orderList={items} total={total}/> */}
    </SafeAreaView>
  );
};

export default Checkout;
