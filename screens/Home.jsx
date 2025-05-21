import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actGetCategories } from "../redux/slices/category/categorySlice";
import { actGetFoods } from "../redux/slices/food/foodSlice";
import TextInput from "../components/TextInput";
import Buttons from "../components/Buttons";
import { ICONS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { truncateText } from "../helpers";

const Home = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Redux state
  const { categories } = useSelector((state) => state.categories);
  const { foods } = useSelector((state) => state.foods);

  const onPress = () => {
    console.log("Search button pressed");
  };

  const handleFilterFoodByCategory = (id) => {
    if (activeCategory === id) {
      setActiveCategory(null);
    } else {
      setActiveCategory(id);
    }
  };

  useEffect(() => {
    dispatch(actGetCategories());
    dispatch(actGetFoods());
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      {/* Header */}
      <View className="flex-row justify-between items-center mx-4 mb-10 mt-5">
        <View>
          <Ionicons name="menu" size={35} />;
        </View>
        <Pressable className="bg-primary w-12 h-12 rounded-md justify-center items-center" onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={30} />;
        </Pressable>
      </View>

      {/* Title */}
      <View className="w-80 mx-4 mb-10">
        <Text className="font-bold text-3xl text-black">Order Fresh &</Text>
        <View className="flex-row items-center">
          <Text className="font-bold text-3xl text-black mr-2">
            Tasty Food Now!
          </Text>
          <Image className="w-8 h-8" source={ICONS.fire} />
        </View>
      </View>

      {/* Search */}
      <View className="px-4 flex-row w-full gap-3 mb-6">
        <View className="flex-1 max-h-20">
          <TextInput
            placeholder={"Search for food"}
            value={search}
            autoCapitalize="none"
            onChangeText={(text) => setSearch(text)}
            className="w-full h-full px-4 bg-white rounded-lg shadow-sm shadow-black/10 text-gray-800"
          />
        </View>
        <Buttons
          Icon={<Ionicons name={"filter-outline"} size={25} color={"white"} /> }
          pressHandler={onPress}
          stylesButton="w-16 h-16 bg-primary rounded-lg justify-center items-center"
          stylesText="text-xl text-black font-bold"
        />
      </View>

      {/* Categories */}
      <View className="mx-4 mt-4">
        <Text className="font-bold text-2xl text-black mb-4">Categories</Text>
        <FlatList
          data={categories || []}
          horizontal
          keyExtractor={(item) => item?.categoryId}
          renderItem={({ item }) => (
            <Buttons
              title={item.nameCategory}
              pressHandler={() => handleFilterFoodByCategory(item.id)}
              stylesButton={
                "w-24 h-10 bg-primary rounded-lg justify-center items-center"
              }
              stylesText="text-xl text-black font-semibold"
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        />
      </View>

      {/* Foods */}
      <View className="mx-4 mt-4 flex-1">
        <FlatList
          data={foods || []}
          keyExtractor={(item) => item.foodId.toString()}
          numColumns={2}
          columnWrapperStyle={{ gap: 10 }}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-1 bg-white justify-between rounded-lg p-4 min-h-72"
              style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3}}
              onPress={() => navigation.navigate("InfoFood", { item })}
              // disabled={!item.inStock}
            >
              <View className="items-center">
                <View className="relative">
                  <Image
                    source={{ uri: item.imageUrl }}
                    className="w-36 h-36 rounded-full border-6 border-primary bg-slate-400 shadow-lg"
                  />
                  {!item.inStock ? (
                    <View className="absolute inset-0 bg-black/50 rounded-full justify-center items-center">
                      <Text className="text-white font-bold">Out of Stock</Text>
                    </View>
                  ): null}
                </View>
              </View>

              {/* Centered Text Content */}
              <View className="items-center gap-2">
                <Text className="text-xl font-bold text-center text-darkText">
                  {item.title}
                </Text>
                <Text className="text-md text-center text-darkText">
                  {truncateText(item.description,15) }
                </Text>
                <Text className="text-2xl text-primary font-medium">
                  $ {Math.trunc(item.price)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  categoryContainer: {
    gap: 10,
    paddingBottom: 10,
  },
});

export default Home;
