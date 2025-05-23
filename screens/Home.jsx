import { useState, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  ScrollView,
  RefreshControl
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
import CategoryIcon from "../components/CategoryIcon";

const Home = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Redux state
  const { categories } = useSelector((state) => state.categories);
  const { foods } = useSelector((state) => state.foods);

  // Filter foods based on search and category
  const filteredFoods = useMemo(() => {
    let result = foods;

    // Filter by search term
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(food => 
        food.title.toLowerCase().includes(searchLower) ||
        food.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (activeCategory) {
      result = result.filter(food => food.categoryId === activeCategory);
    }

    return result;
  }, [foods, search, activeCategory]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      dispatch(actGetCategories()),
      dispatch(actGetFoods())
    ]);
    setRefreshing(false);
  };

  const handleSearch = (text) => {
    setSearch(text);
    setActiveCategory(null); // Reset category filter when searching
  };

  const handleFilterFoodByCategory = (id) => {
    setActiveCategory(activeCategory === id ? null : id);
    setSearch(""); // Reset search when changing category
  };

  useEffect(() => {
    dispatch(actGetCategories());
    dispatch(actGetFoods());
  }, [dispatch]);

  const renderCategoryItem = ({ item }) => {
    const isActive = activeCategory === item.categoryId;
    
    return (
      <TouchableOpacity
        className={`flex-row items-center px-5 py-3 rounded-2xl mr-3 ${
          isActive ? 'bg-primary' : 'bg-white'
        }`}
        onPress={() => handleFilterFoodByCategory(item.categoryId)}
        style={{ 
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          transform: [{ scale: isActive ? 1.05 : 1 }]
        }}
      >
        <CategoryIcon title={item.nameCategory} isActive={isActive} />
        <Text className={`ml-2 font-semibold ${
          isActive ? 'text-white' : 'text-black'
        }`}>
          {item.nameCategory}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyFoodList = () => (
    <View className="flex-1 items-center justify-center py-8">
      <Ionicons name="search-outline" size={48} color="#9ca3af" />
      <Text className="text-gray-400 text-lg mt-4 text-center">
        {search.trim() 
          ? "No foods found matching your search"
          : activeCategory 
            ? "No foods in this category"
            : "No foods available"}
      </Text>
    </View>
  );

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      className="flex-1 bg-white rounded-2xl p-4 min-h-[200px]"
      style={{ 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
      }}
      onPress={() => navigation.navigate("InfoFood", { item })}
    >
      <View className="items-center">
        <View className="relative">
          <Image
            source={{ uri: item.imageUrl }}
            className="w-32 h-32 rounded-full"
            style={{ borderWidth: 6, borderColor: '#f9c32d' }}
          />
          {!item.inStock && (
            <View className="absolute inset-0 bg-black/50 rounded-full justify-center items-center">
              <Text className="text-white font-bold">Out of Stock</Text>
            </View>
          )}
        </View>
      </View>

      <View className="items-center gap-2 mt-3">
        <Text className="text-lg font-bold text-center text-darkText">
          {truncateText(item.title, 20)}
        </Text>
        <Text className="text-sm text-center text-gray-500">
          {truncateText(item.description, 40)}
        </Text>
        <Text className="text-xl text-primary font-bold">
          ${item.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      {/* Header */}
      <View className="flex-row justify-between items-center mx-4 mb-6 mt-5">
        <View className="flex-row items-center">
          <Ionicons name="menu" size={28} color="#333" />
          <Text className="ml-3 text-xl font-bold text-darkText">EggsXpress</Text>
        </View>
        <Pressable 
          className="bg-primary w-12 h-12 rounded-full justify-center items-center"
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person" size={24} color="#333" />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Section */}
        <View className="mx-4 mb-6">
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
          <View className="flex-1">
            <TextInput
              placeholder="Search for food..."
              value={search}
              autoCapitalize="none"
              onChangeText={handleSearch}
              className="w-full h-14 px-4 bg-white rounded-xl shadow-sm shadow-black/10 text-gray-800"
            />
          </View>
          <Buttons
            Icon={<Ionicons name="filter-outline" size={24} color="#333" />}
            pressHandler={() => {}}
            stylesButton="w-14 h-14 bg-primary rounded-xl justify-center items-center"
          />
        </View>

        {/* Categories */}
        <View className="mb-6 py-2">
          <View className="flex-row justify-between items-center mx-4 mb-4">
            <Text className="font-bold text-2xl text-black">Categories</Text>
          </View>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item?.categoryId}
            renderItem={renderCategoryItem}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              gap: 12
            }}
            className="min-h-[80px]"
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-400">No categories found</Text>
              </View>
            }
          />
        </View>

        {/* Popular Foods */}
        <View className="mx-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-2xl text-black">
              {activeCategory ? 'Category Foods' : 'Popular Foods'}
            </Text>
            <TouchableOpacity onPress={() => {
              setActiveCategory(null);
              setSearch('');
            }}>
              <Text className="text-primary font-semibold">
                {(activeCategory || search) ? 'Clear Filters' : 'See All'}
              </Text>
            </TouchableOpacity>
          </View>
          {filteredFoods.length > 0 ? (
            <View className="flex-row flex-wrap gap-4">
              {filteredFoods.map((item) => (
                <View key={item.foodId} style={{ width: '47%' }}>
                  {renderFoodItem({ item })}
                </View>
              ))}
            </View>
          ) : renderEmptyFoodList()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
