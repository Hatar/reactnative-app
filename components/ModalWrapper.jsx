import React, { useCallback } from "react";
import { ModalContent, BottomModal } from "react-native-modals";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCart, setTypePayment } from "../redux/slices/cart/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { actDeleteCategory } from "../redux/slices/category/categorySlice";
import { actDeleteFood } from "../redux/slices/food/foodSlice";
import actDeleteSubAdmin from "../redux/slices/admin/act/actDeleteSubAdmin";
import { toggleModalWrapper } from "../redux/slices/General/generalSlice";
import Buttons from "./Buttons";
import { COLORS, FONTS,SIZES } from "../constants";

const ModalWrapper = () => {
  const {isModalVisible,typeModal,itemModal,changedBehaviorModalWrapper} = useSelector((state) => state.generals)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleDelete = useCallback(() => {
    if (!typeModal || !itemModal) return;
    switch (typeModal) {
      case "DELETE_ITEM_FROM_CART":
        dispatch(deleteItemFromCart(itemModal))
        if(countItems === 1)navigation.navigate('Home')
        break;
      case "DELETE_CATEGORY":
        dispatch(actDeleteCategory(itemModal.categoryId));
        break;
      case "DELETE_FOOD":
        dispatch(actDeleteFood({foodId:itemModal.foodId,categoryId:itemModal.categoryId}));
        break;
      case "DELETE_SUB_ADMIN":
        dispatch(actDeleteSubAdmin(itemModal.userId))
        break;
      default:
        break;
    }
    dispatch(toggleModalWrapper(false))
  }, []);


  const handleCloseModal = useCallback(() => {
    dispatch(toggleModalWrapper(false))
  },[])


  const handleMethodPayment = useCallback((typeMethod) => {
    dispatch(setTypePayment(typeMethod))
    dispatch(toggleModalWrapper(false))
  },[])

  return (
    <BottomModal
      visible={isModalVisible}
      onTouchOutside={handleCloseModal}
      height={changedBehaviorModalWrapper ? .40 :0.25}
      width={1}
    >
      <View style={styles.modalTitleContainer}>
        <Text style={styles.modalTitleText}>{ changedBehaviorModalWrapper ? "Select Method Payment" :  "Are you sure?"}</Text>
      </View>

      <ModalContent style={styles.modalContent}>
        {
          changedBehaviorModalWrapper ?(
            <View style={styles.content_cart}>
                <Buttons
                    title="Stripe"
                    pressHandler={() => handleMethodPayment("stripe")}
                    stylesText={styles.textButton}
                    stylesButton={[styles.button, { backgroundColor: COLORS.black }]}
                />
                <Buttons
                    title="Paypal"
                    pressHandler={() =>handleMethodPayment("Paypal")}
                    stylesText={styles.textButton}
                    stylesButton={[styles.button, { backgroundColor: COLORS.errors }]}
                />
                <Buttons
                    title="Cash"
                    pressHandler={() =>handleMethodPayment("Cash")}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
            </View>
          )  :(
            <>
              <Text style={styles.contentModal}>
                You are about to delete <Text style={styles.itemDeleted}>{itemModal?.title || itemModal?.name || itemModal?.nameCategory || `${itemModal?.firstName}-${itemModal?.lastName}`}</Text>. This action
                cannot be undone.
              </Text>
              <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, styles.cancelButton]} onPress={()=> handleCloseModal()}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.deleteButton]} onPress={()=> handleDelete()}>
                  <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
                </Pressable>
              </View>
            </>
          )
        }
        
      </ModalContent>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  modalTitleContainer: {
    width: "100%",
    backgroundColor: "#f0f0f0", 
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "flex-start",
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: "bold", 
    color: "#333",
    textAlign: "left",
  },
  modalContent: {
    flex: 1,
  },
  contentModal: {
    fontSize: 16,
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  header_title:{
    color:COLORS.bg,
    fontFamily:FONTS.bold,
    fontWeight:500,
    fontSize:SIZES.large + 10,
  },
  itemDeleted: {
    fontWeight: "bold",
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#DDD",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  deleteText: {
    color: "#FFF",
  },
  textButton: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
},
});

export default ModalWrapper;
