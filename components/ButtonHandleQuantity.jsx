
import {Text,Pressable,View} from "react-native";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../redux/slices/cart/cartSlice";
const ButtonHandleQuantity = ({item}) => {
    const dispatch = useDispatch();
  return (
    <View className="d-flex flex-row bg-primary justify-between items-center self-center w-32 h-12 rounded-full px-4">        
        <Pressable
            className="text-darkText text-base"
            onPress={() => dispatch(decreaseQuantity(item))}
            disabled={item?.quantity <= 1}
        >
            <Text className="text-darkText text-2xl">-</Text>
        </Pressable>
        <View className="w-8 h-8 bg-white rounded-full text-center justify-center items-center self-center">
            <Text className=" text-darkText font-semibold text-center">{item?.quantity || 1}</Text>
        </View>
        <Pressable 
            onPress={() => dispatch(increaseQuantity(item))}
        >
            <Text className="text-darkText text-2xl">+</Text>
        </Pressable>
    </View>
  )
}

export default ButtonHandleQuantity