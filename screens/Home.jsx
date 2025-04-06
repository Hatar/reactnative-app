import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actGetCategories } from "../redux/slices/category/categorySlice";
import Buttons from "../components/Buttons";
import { actGetFoods } from "../redux/slices/food/foodSlice";
import { COLORS, ICONS } from "../constants";
import Dashboard from "./dashboard";
import { useNavigation } from "@react-navigation/native";
import { addItemToCart } from "../redux/slices/cart/cartSlice";
import { isIncludeInCart } from "../helpers";
import EmptyContent from "../components/EmptyContent";
import useIsAdmin from "../hooks/useIsAdmin";
import { actGetListAdmin } from "../redux/slices/admin/adminSlice";

function Home() {
  const navigation = useNavigation();
  const { categories } = useSelector((state) => state.categories);
  const { foods } = useSelector((state) => state.foods);
  const { items } = useSelector((state) => state.carts);
  const [filterFoods,setFilterFoods] = useState([])
  const [activeCategory, setActiveCategory] = useState(null);


  const dispatch = useDispatch();
  const isAdmin = useIsAdmin()
  const {width} = useWindowDimensions()


  useEffect (() => {
    dispatch(actGetListAdmin())
    dispatch(actGetCategories());
    dispatch(actGetFoods());
  }, [dispatch]);


  useEffect(()=>{
    setFilterFoods(foods)
  },[foods])



  const handleAddToCart = (item) => {
    if (!isIncludeInCart(items, item)) {
      dispatch(addItemToCart(item));
    }
  };


  const handleFilterFoodByCategory = (idCategory) => {
    if (activeCategory === idCategory) {
      setActiveCategory(null)
      setFilterFoods(foods)
    } else {
      setActiveCategory(idCategory);
      setFilterFoods(foods.filter(food => food.categoryId === idCategory));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      { isAdmin ? (
        <Dashboard />
      ) : (
        <>
        {categories.length > 0 && <Text style={styles.title}>Categories</Text> } 
        <View>
          <FlatList
            data={categories}
            horizontal
            keyExtractor={(item) => item.categoryId}
            renderItem={({ item }) => (
              <Buttons
                title={item.nameCategory}
                stylesText={styles.textButton}
                stylesButton={[styles.categoryButton,activeCategory === item.categoryId && styles.activeCategoryBtn]}
                pressHandler={()=> handleFilterFoodByCategory(item.id)}
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          />
        </View>
        {filterFoods.length > 0 && <Text style={styles.title}>Foods</Text>}
        <View style={{flex:1}}>
            {
              filterFoods && filterFoods.length > 0 ? 
                (
                  <FlatList
                    data={filterFoods}
                    keyExtractor={(item) => item.foodId.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity 
                        style={[styles.foodCard, !item.inStock && styles.disabledCard]} 
                        onPress={() => navigation.navigate("InfoFood", { item })}
                        disabled={!item.inStock}
                      >
                        <View style={styles.imageContainer}>
                          <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
                          {!item.inStock && (
                            <View style={styles.outStockOverlay}>
                              <Text style={styles.outStockText}>Out of Stock</Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.foodInfo}>
                          <Text style={styles.foodName} numberOfLines={1} ellipsizeMode="tail">
                            {item.title}
                          </Text>
                          <Text style={styles.foodPrice}>{item.price}$</Text>
                          <View style={styles.addToCartContainer}>
                            <Buttons
                              title="Add to Cart"
                              pressHandler={() => item.inStock && handleAddToCart(item)}
                              stylesText={styles.textButton}
                              stylesButton={[styles.addToCartButton, !item.inStock && styles.disabledButton]}
                              disabled={!item.inStock}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                    numColumns={width === 576 ? 3 : 2}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                  />
                )
              : <EmptyContent title={"Foods"} image={ICONS.NoFood} />
            }
        </View>
      </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
    marginBottom: 10,
  },
  disabledCard: {
    backgroundColor: "#d3d3d3",
  },
  imageContainer: {
    position: "relative",
  },
  outStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  outStockText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
  activeCategoryBtn:{
    backgroundColor: COLORS.errors,
  },
  textButton: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
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
  disabledButton: {
    backgroundColor: "#999",
  },
  addToCartContainer: {
    marginTop: 10,
  },
  noCategoriesContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default Home;