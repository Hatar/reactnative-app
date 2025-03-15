import React, { useCallback } from "react";
import { ModalContent, BottomModal } from "react-native-modals";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { deleteItemFromCart } from "../redux/slices/cart/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { actDeleteCategory } from "../redux/slices/category/categorySlice";
import { actDeleteFood } from "../redux/slices/food/foodSlice";

const ModalWrapper = ({ item,countItems,typeModal, isModalVisible, disableModalConfirm }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleCancel = useCallback(() => {
    disableModalConfirm();
  }, [disableModalConfirm]);

  const handleDelete = useCallback(() => {
    switch (typeModal) {
      case "DELETE_ITEM_FROM_CART":
        dispatch(deleteItemFromCart(item))
        if(countItems === 1)navigation.navigate('Home')
        break;
      case "DELETE_CATEGORY":
        dispatch(actDeleteCategory(item.categoryId));
        break;
      case "DELETE_FOOD":
        dispatch(actDeleteFood(item.id))
        break;
      default:
        break;
    }
    disableModalConfirm();
  }, [disableModalConfirm]);

  return (
    <BottomModal
      visible={isModalVisible}
      onTouchOutside={disableModalConfirm}
      height={0.25}
      width={1}
      onSwipeOut={disableModalConfirm}
    >
      <View style={styles.modalTitleContainer}>
        <Text style={styles.modalTitleText}>Are you sure?</Text>
      </View>

      <ModalContent style={styles.modalContent}>
        <Text style={styles.contentModal}>
          You are about to delete <Text style={styles.itemDeleted}>{item?.title || item?.name || item?.nameCategory}</Text>. This action
          cannot be undone.
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.deleteButton]} onPress={()=> handleDelete()}>
            <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
          </Pressable>
        </View>
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
    backgroundColor: "#FFF",
    padding: 20,
    justifyContent: "center",
  },
  contentModal: {
    fontSize: 16,
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 20,
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
});

export default ModalWrapper;
