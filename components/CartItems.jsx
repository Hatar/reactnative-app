import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { COLORS, ICONS, SIZES } from "../constants";
import Buttons from "./Buttons";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, deleteItemFromCart, increaseQuantity } from "../redux/slices/cart/cartSlice";

const CartItems = ({ orderList, navigation }) => {
  const {total} = useSelector((state) =>state.carts)
  const dispatch = useDispatch();

  const deleteItem = (item) =>{
    dispatch(deleteItemFromCart(item))
  }

  const increaseQty = useCallback((item) => {
    dispatch(increaseQuantity(item));
  },[dispatch])

  const decreaseQty = useCallback((item) => {
    dispatch(decreaseQuantity(item));
  },[dispatch])

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Pressable
        style={styles.deleteButton}
        onPress={() => deleteItem(item)}
      >
        <Image source={ICONS.deleteIcon} style={styles.deleteIcon} />
      </Pressable>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.actionsContainer}>
          <Pressable
            style={styles.qtyButton}
            onPress={() => decreaseQty(item)}
          >
            <Text style={styles.qtyText}>-</Text>
          </Pressable>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Pressable
            style={styles.qtyButton}
            onPress={() => increaseQty(item)}
          >
            <Text style={styles.qtyText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FlatList
          data={orderList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>${total}</Text>
        </View>
        <Buttons
          title="Confirm Order"
          pressHandler={() => navigation.navigate("Cart")}
          stylesText={styles.buttonText}
          stylesButton={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  listContent: {
    paddingBottom: 120,
  },
  card: {
    flexDirection: "row",
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: COLORS.cardBg,
    marginHorizontal: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    padding: SIZES.base,
  },
  deleteIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.red,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: SIZES.radius,
    marginRight: SIZES.padding,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.black,
  },
  price: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginBottom: SIZES.base,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.cardBg,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  qtyText: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.white,
  },
  quantity: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  totalText: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: COLORS.cardBg,
  },
  totalAmount: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: COLORS.yellow,
  },
  button: {
    marginTop: SIZES.padding,
    backgroundColor: COLORS.cardBg,
    padding: SIZES.medium,
    borderRadius: SIZES.radius,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});

export default CartItems;
