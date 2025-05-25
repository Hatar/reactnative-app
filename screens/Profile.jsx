import { SafeAreaView, Text, View, FlatList, TouchableOpacity, ScrollView, Alert } from "react-native";
import FormSignUp from "../components/FormSignUp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetListAdmin } from "../redux/slices/admin/adminSlice.js";
import Buttons from "../components/Buttons.jsx";
import { COLORS, SIZES, FONTS } from "../constants/theme.js";
import ModalWrapper from "../components/ModalWrapper.jsx";
import { setItemModalWrapper, toggleModalWrapper } from "../redux/slices/General/generalSlice";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signOut } from "../redux/slices/auth/authSlice";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [toggleForm, setToggleForm] = useState("listTab");
  const [adminData, setAdminData] = useState(null);
  const [clearForm, setClearForm] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, message: "" });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { admins } = useSelector((state) => state.admin);
  const { role, email } = useSelector((state) => state.auth);

  useEffect(() => {
    if (role === "admin") {
      dispatch(actGetListAdmin());
    }
  }, [role]);

  const handleAdmin = async (type, data) => {
    if (type === "delete") {
      dispatch(toggleModalWrapper(true));
      dispatch(setItemModalWrapper({ typeModal: "DELETE_SUB_ADMIN", itemModal: data }));
      handleFormFeedback('success', 'Admin deleted successfully!');
    } else if (type === "edit") {
      setAdminData(data);
      setToggleForm("updateTab");
      handleFormFeedback('success', 'Admin ready to edit');
    } else {
      handleFormFeedback('error', 'Operation failed');
    }
  };

  const handleToggleTabSelected = (type) => {
    if (type === "createTab" || type === "updateTab") {
      setToggleForm(type);
      setAdminData(null);
    } else {
      setToggleForm("listTab");
      setAdminData(null);
      setClearForm(true);
    }
    setFeedback({ type: null, message: "" });
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigation.replace("Signin");
  };

  const handleFormFeedback = (type, message) => {
    setFeedback({ type, message });
    Alert.alert(type === "success" ? "Success" : "Error", message);
  };

  const renderListAdmin = ({ item }) => (
    <View key={item.userId} className="flex-row justify-between items-center gap-2 py-3 border-b border-gray-100 bg-white rounded-xl mb-2 px-3 shadow-sm">
      <Text className="text-darkText text-base font-semibold">{item.gender}, {`${item.firstName}-${item.lastName}`}</Text>
      <View className="flex-row gap-2">
        <Buttons
          Icon={<Ionicons name={"pencil-outline"} size={28} color="#f9c32d" />}
          pressHandler={() => handleAdmin("edit", item)}
          stylesButton="bg-primary/10 p-2 rounded-lg"
        />
        <Buttons
          Icon={<Ionicons name={"trash-outline"} size={28} color="#ef4444" />}
          pressHandler={() => handleAdmin("delete", item)}
          stylesButton="bg-red-100 p-2 rounded-lg"
        />
      </View>
    </View>
  );

  const renderUserProfile = () => (
    <ScrollView className="flex-1 px-4">
      {/* User Info Section */}
      <View className="bg-white rounded-2xl p-6 mt-4 shadow-sm">
        <View className="items-center mb-6">
          <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="#f9c32d" />
          </View>
          <Text className="text-lg text-grayText text-center">{email}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="mt-8">
        <Text className="text-lg font-semibold mb-4 text-darkText">Quick Actions</Text>
        <View className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
          <TouchableOpacity className="flex-row items-center p-4">
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
              <Ionicons name="heart-outline" size={22} color="#f9c32d" />
            </View>
            <Text className="ml-3 flex-1 text-darkText text-base font-medium">Favorite Orders</Text>
            <Ionicons name="chevron-forward" size={22} color="#b4b4b7" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center p-4">
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
              <Ionicons name="time-outline" size={22} color="#f9c32d" />
            </View>
            <Text className="ml-3 flex-1 text-darkText text-base font-medium">Order History</Text>
            <Ionicons name="chevron-forward" size={22} color="#b4b4b7" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4">
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
              <Ionicons name="notifications-outline" size={22} color="#f9c32d" />
            </View>
            <Text className="ml-3 flex-1 text-darkText text-base font-medium">Notifications</Text>
            <View className="bg-primary/10 px-2 py-1 rounded-full">
              <Text className="text-primary text-xs font-medium">2 New</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#b4b4b7" className="ml-2" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4">
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
              <Ionicons name="language-outline" size={22} color="#f9c32d" />
            </View>
            <Text className="ml-3 flex-1 text-darkText text-base font-medium">Language</Text>
            <Text className="text-grayText mr-2">English</Text>
            <Ionicons name="chevron-forward" size={22} color="#b4b4b7" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Actions */}
      <View className="mt-8 mb-8">
        <Text className="text-lg font-semibold mb-4 text-darkText">Account</Text>
        <View className="bg-white rounded-2xl shadow-sm">
          <TouchableOpacity className="flex-row items-center p-4">
            <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
              <Ionicons name="settings-outline" size={22} color="#f9c32d" />
            </View>
            <Text className="ml-3 flex-1 text-darkText text-base font-medium">Settings</Text>
            <Ionicons name="chevron-forward" size={22} color="#b4b4b7" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={() => handleSignOut()}
          className="mt-8 mb-8 w-full bg-[#f9c32d] py-4 rounded-2xl active:opacity-90 flex-row items-center justify-center"
        >
          <Ionicons name="log-out-outline" size={22} color="black" />
          <Text className="text-center text-darkText font-bold text-lg ml-2">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderAdminDashboard = () => (
    <View className="flex-1 p-4 mt-5">
      <Text className="text-3xl font-bold text-darkText mb-2">Manage Sub Admins</Text>
      <Text className="text-base text-grayText mb-6">Create and manage sub-admin accounts</Text>

      <View className="flex-row gap-2 mb-4">
        <Buttons
          Icon={<Ionicons name={"add-circle-outline"} size={28} />}
          pressHandler={() => handleToggleTabSelected("createTab")}
          stylesButton="bg-primary/90 px-4 py-2 rounded-xl flex-row items-center"
          stylesText="text-black font-semibold text-base ml-2"
          title="Add New Admin"
        />
        <Buttons
          pressHandler={() => handleToggleTabSelected("listTab")}
          stylesButton="bg-gray-200 px-4 py-2 rounded-xl flex-row items-center"
          stylesText="text-darkText font-semibold text-base"
          title="Show List"
        />
      </View>

      {(toggleForm === "createTab" || toggleForm === "updateTab") ? (
        <View className="bg-white rounded-2xl p-4 shadow-md">
          <FormSignUp
            role={"Admin"}
            adminData={adminData}
            clearForm={clearForm}
            tabName={toggleForm}
            setToggleForm={setToggleForm}
            onFeedback={handleFormFeedback}
          />
        </View>
      ) : admins.length > 0 ? (
        <FlatList
          data={admins}
          renderItem={renderListAdmin}
          keyExtractor={(item) => String(item.userId)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      ) : (
        <View className="flex-1 items-center justify-center mt-10">
          <Text className="text-gray-400 text-lg">No sub-admins found.</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      {role === "admin" ? renderAdminDashboard() : renderUserProfile()}
      <ModalWrapper
        isModalVisible={isModalVisible}
        disableModalConfirm={() => setModalVisible(false)}
        item={adminData}
        typeModal={"DELETE_SUB_ADMIN"}
        countItems={admins.length}
      />
    </SafeAreaView>
  );
};

export default Profile;
