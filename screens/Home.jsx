import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actGetCategories } from "../redux/slices/category/categorySlice";
import Buttons from "../components/Buttons";
import { actGetFoods } from "../redux/slices/food/foodSlice";
import { COLORS } from "../constants";
import Dashboard from "./dashboard";
import { useNavigation } from "@react-navigation/native";
import { addItemToCart } from "../redux/slices/cart/cartSlice";
import { isIncludeInCart } from "../helpers";

function Home() {
  const navigation = useNavigation()
  const { categories } = useSelector((state) => state.categories);
  const { foods } = useSelector((state) => state.foods)
  const {items} = useSelector((state)=>state.carts)
  const isAdmin = useSelector((state) => state.auth.isAdminAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetCategories());
    dispatch(actGetFoods());
  }, [dispatch]);

  const moveToDetailFood = (item) =>{
    navigation.navigate('InfoFood',{item})
  }

  const handleAddToCart = (item) =>{
    if(!isIncludeInCart(items,item)) {
      dispatch(addItemToCart(item))
    }
  }

  

  return (
    <SafeAreaView style={styles.container}>
      {!isAdmin ? (
        <>

          {/* Category Section */}
          <Text style={styles.title}>Categories</Text>
          <View>
            <FlatList
              data={categories}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Buttons
                  title={item.name}
                  pressHandler={null}
                  stylesText={styles.textButton}
                  stylesButton={styles.categoryButton}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryContainer}
            />
          </View>
          
          {/* Foods Section */}
            <Text style={styles.title}>Foods</Text>
            <FlatList
              data={foods}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.foodCard} onPress={()=> moveToDetailFood(item)}>
                    <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName} numberOfLines={1} ellipsizeMode="tail">
                        {item.title}
                      </Text>
                      <Text style={styles.foodPrice}>{item.price}$</Text>
                      <View style={styles.addToCartContainer}>
                        <Buttons
                          title="Add to Cart"
                          pressHandler={() => handleAddToCart(item)}
                          stylesText={styles.textButton}
                          stylesButton={styles.addToCartButton}
                        />
                      </View>
                    </View>
                </TouchableOpacity>
              )}
              numColumns={2}
              columnWrapperStyle={styles.row}
              showsVerticalScrollIndicator={false}
            />
        </>
      ) : (
        <Dashboard />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex:1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
    marginBottom: 10,
  },
  categoryContainer: {
    gap: 10,
    paddingBottom: 10,
  },
  categoryButton: {
    backgroundColor: COLORS.cardBg,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  textButton: {
    color: "#333",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  foodCard: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 5,
    overflow: "hidden",
  },
  foodImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    aspectRatio: 1.5,
  },
  foodInfo: {
    padding: 10,
    alignItems: "center",
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  foodDesc: {
    fontSize: 12,
    color: "#666",
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: COLORS.cardBg,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: "center",
    elevation: 5,
    shadowColor: "#000", 
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  addToCartContainer: {
    marginTop: 10,
  },
  textButton: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Home;
