import React, { useCallback } from "react";
import { ModalContent, BottomModal } from "react-native-modals";
import { Text, View, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCart, setTypePayment } from "../redux/slices/cart/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { actDeleteCategory } from "../redux/slices/category/categorySlice";
import { actDeleteFood } from "../redux/slices/food/foodSlice";
import actDeleteSubAdmin from "../redux/slices/admin/act/actDeleteSubAdmin";
import { toggleModalWrapper,setChangedBehaviorModalWrapper } from "../redux/slices/General/generalSlice";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Buttons from "./Buttons";

const ModalWrapper = () => {
  const {isModalVisible,typeModal,itemModal,changedBehaviorModalWrapper} = useSelector((state) => state.generals)
  const items  = useSelector((state) => state.carts.items)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleDelete = useCallback(() => {
    if (!typeModal || !itemModal) return;
    switch (typeModal) {
      case "DELETE_ITEM_FROM_CART":
        dispatch(deleteItemFromCart(itemModal))
        console.log("checkkkkk",items.length)
        if (items.length == 1) {
          navigation.navigate('MainTabs')
        }
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
    dispatch(setChangedBehaviorModalWrapper(false))
  },[])

  const handleMethodPayment = useCallback((typeMethod) => {
    dispatch(setTypePayment(typeMethod));
    dispatch(toggleModalWrapper(false));
    dispatch(setChangedBehaviorModalWrapper(false));
  }, [dispatch]);

  return (
    <BottomModal
      visible={isModalVisible}
      onTouchOutside={handleCloseModal}
      height={changedBehaviorModalWrapper ? .32 :0.25}
      width={1}
    >
      <View className="w-full bg-white px-5 py-4 items-start border-b border-gray-100">
        <Text className="text-lg font-bold text-black">
          {changedBehaviorModalWrapper ? "Select Method Payment" : "Are you sure?"}
        </Text>
      </View>

      <ModalContent className="flex-1 p-5">
        {
          changedBehaviorModalWrapper ? (
            <View className="flex flex-col justify-center items-center mt-10 gap-5 ">
                <Buttons
                    title="Stripe"
                    pressHandler={() => handleMethodPayment("stripe")}
                    stylesText="text-lg font-semibold text-black"
                    stylesButton="w-full py-3 px-6 rounded-lg bg-primary justify-center items-center flex-row gap-2"
                    Icon={<Ionicons name="card-outline" size={24} color="black" />}
                />
                <Buttons
                    title="Paypal"
                    pressHandler={() => handleMethodPayment("Paypal")}
                    stylesText="text-lg font-semibold text-black"
                    stylesButton="w-full py-3 px-6 rounded-lg bg-primary justify-center items-center flex-row gap-2"
                    Icon={<Ionicons name="logo-paypal" size={24} color="black" />}
                />
                <Buttons
                    title="Cash"
                    pressHandler={() => handleMethodPayment("Cash")}
                    stylesText="text-lg font-semibold text-black"
                    stylesButton="w-full py-3 px-6 rounded-lg bg-primary justify-center items-center flex-row gap-2"
                    Icon={<Ionicons name="cash-outline" size={24} color="black" />}
                />
            </View>
          ) : (
            <>
              <Text className="text-base text-black leading-6 mb-5">
                You are about to delete{" "}
                <Text className="font-bold text-red-500">
                  {itemModal?.title || itemModal?.name || itemModal?.nameCategory || `${itemModal?.firstName}-${itemModal?.lastName}`}
                </Text>
                . This action cannot be undone.
              </Text>
              <View className="flex-row justify-end items-center gap-3">
                <Pressable 
                  className="py-3 px-6 rounded-lg bg-gray-100 justify-center items-center"
                  onPress={handleCloseModal}
                >
                  <Text className="text-base font-semibold text-gray-700">Cancel</Text>
                </Pressable>
                <Pressable 
                  className="py-3 px-6 rounded-lg bg-primary justify-center items-center"
                  onPress={handleDelete}
                >
                  <Text className="text-base font-semibold text-black">Delete</Text>
                </Pressable>
              </View>
            </>
          )
        }
      </ModalContent>
    </BottomModal>
  );
};

export default ModalWrapper;
