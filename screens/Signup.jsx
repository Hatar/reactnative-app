import { Image,Text, TouchableOpacity, View } from "react-native";
import Background from "../components/Background";
import { clearStateAuth } from "../redux/slices/auth/authSlice";
import FormSignUp from "../components/FormSignUp";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Logo from "../components/Logo";

const Signup = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  return (
    <Background>
      <Logo />
      <Text className="text-xl font-bold text-primary text-center mt-2">Create Your Account</Text>
      <Text className="text-black font-normal tracking-tighter text-center">Join us and start exploring today!</Text>

      <FormSignUp role={"User"} />
      
      <View className="flex-row items-center justify-center mt-4">
        <Text>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(clearStateAuth());
            navigation.replace("Signin");
          }}
        >
          <Text className="font-bold text-red-500">Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};
export default Signup;
