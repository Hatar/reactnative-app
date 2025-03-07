import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { COLORS, ICONS, SIZES } from "../constants";
import Buttons from "./Buttons";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../redux/slices/cart/cartSlice";
import { useNavigation } from '@react-navigation/native'
import ModalWrapper from "./ModalWrapper.jsx"
const CartItems = ({ orderList,total }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [food,setFood] = useState(null)

  const {width} = useWindowDimensions()

  const styles = getStyles(width)

  const deleteItem = (item) =>{
    setModalVisible(!isModalVisible);
    setFood(item)
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
            style={[styles.qtyButton, item.quantity <= 1 && styles.disabledButton]}
            onPress={() => decreaseQty(item)}
            disabled={item.quantity <= 1}
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
      <ModalWrapper 
        isModalVisible={isModalVisible} 
        disableModalConfirm={()=> setModalVisible(false)} 
        item={food}
        typeModal={"DELETE_ITEM_FROM_CART"}
        countItems={orderList.length}
      />
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

const getStyles = (width) => StyleSheet.create({
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
    height: width === 576 ? 130 : 100,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  disabledButton: {
    backgroundColor: 'gray',
    opacity: 0.5
  },
});

export default CartItems;
