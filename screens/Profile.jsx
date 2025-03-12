import { SafeAreaView, Text, View } from "react-native";
import FormSignUp from "../components/FormSignUp";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-3 mt-5">
        {/* Title Section */}
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Create Sub Admin
        </Text>
        <Text className="text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, inventore.
        </Text>

        {/* Form */}
        <FormSignUp role={"Admin"} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
