import {
  Image,
  SafeAreaView,
  Text,
  View,
  FlatList
} from "react-native";
import { addItemToCart } from "../redux/slices/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { isIncludeInCart } from "../helpers";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ButtonHandleQuantity from "../components/ButtonHandleQuantity";
import Buttons from "../components/Buttons";

const InfoFood = ({ route }) => {


  // REDUX STATE
  const { item } = route.params;
  const { items } = useSelector((state) => state.carts);
  

  // ACTION
  const dispatch = useDispatch();
  const navigation = useNavigation();


  // HANDLERS
  const addToCart = () => {
    if (!isIncludeInCart(items, item)) {
      dispatch(addItemToCart(item));
    }
  };

  const renderFoodInformation = () => {
    const height = 550;
    return (
      <>
        <Image
          source={{ uri: item.imageUrl }}
          className="w-72 h-72 rounded-full justify-center items-center self-center mt-8"
        />

        <View className="absolute bottom-0 left-0 right-0 bg-white rounded-tr-[50px] rounded-tl-[50px] shadow-lg h-[550px] px-9">
          {/* Title */}
          <Text className="text-3xl text-center font-bold mt-8 mb-3">
            {item.title}
          </Text>

          {/* <View className="d-flex flex-row justify-center items-center self-center gap-12 mb-10">
            <View className="flex-row justify-center items-center gap-2 mt-4">
              <Ionicons name="timer-outline" size={25} color={"#3288e7"} />
              <Text className="font-semibold text-md text-darkText">
                10 - 20 min
              </Text>
            </View>
            <View className="flex-row justify-center items-center gap-2 mt-4">
              <Ionicons name="star-outline" size={25} color={"#f9c32d"} />;
              <Text className="font-semibold text-md text-darkText">4.5</Text>
            </View>
            <View className="flex-row justify-center items-center gap-2 mt-4">
              <Ionicons name="flame-outline" size={25} color={"red"} />;
              <Text className="font-semibold text-md text-darkText">
                {item.price}$
              </Text>
            </View>
          </View> */}

          <View className="d-flex flex-row justify-center items-center self-center gap-28 mb-5">
            <View className="flex-row justify-center items-center">
              <Text className="font-bold text-4xl text-darkText">
                ${item.price}
              </Text>
            </View>
            <ButtonHandleQuantity item={item} />
          </View>

          <View className="mb-4">
            <Text className="font-semibold text-2xl text-darkText mb-5">
              Ingredients
            </Text>
            <FlatList
              data={item.recepies}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              ItemSeparatorComponent={() => <View className="w-4 mb-5" />}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item: receip }) => (
                <View className="bg-bgLight h-24 w-24 p-5 rounded-t-3xl rounded-b-3xl justify-center items-center">
                  <Ionicons name="egg-outline" size={25} color="red" />
                  <Text className="font-semibold text-md text-darkText mt-2">
                    {receip}
                  </Text>
                </View>
              )}
            />
          </View>


          <View className="mb-20">
            <Text className="font-semibold text-2xl text-darkText mb-2">Description</Text>
            <Text className="font-normal text-md text-darkText">{item.description}</Text>
          </View>

          <Buttons
            title="Add to Cart"
            pressHandler={() =>addToCart()}
            stylesButton="w-full h-14 bg-primary rounded-lg justify-center items-center"
            stylesText="text-xl text-black font-bold"
          />
        </View>
      </>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex flex-row justify-between items-center w-full  gap-2">
        <View className="-top-8">
          <BackButton goBack={() => navigation.goBack()} color="white" />
        </View>
        <View className="mr-3">
          <Ionicons name="heart-outline" size={35} color="white" />
        </View>
      </View>
      {renderFoodInformation()}
    </SafeAreaView>
  );
};
export default InfoFood;
