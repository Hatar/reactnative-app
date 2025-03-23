import { SafeAreaView, Text, View,StyleSheet, FlatList } from "react-native";
import FormSignUp from "../components/FormSignUp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actGetListAdmin } from "../redux/slices/admin/adminSlice.js";
import Buttons from "../components/Buttons.jsx";
import { COLORS,SIZES,FONTS,ICONS } from "../constants/theme.js";
import ModalWrapper from "../components/ModalWrapper.jsx";

const Profile = () => {

  const [toggleForm,setToggleForm] = useState("listTab")
  const [adminData,setAdminData] = useState(null)
  const [clearForm,setClearForm] = useState(false)
  const [isModalVisible,setModalVisible] = useState(false)
  const dispatch = useDispatch();
  const {admins} = useSelector((state)=> state.admin)
  
  useEffect(()=>{
    dispatch(actGetListAdmin())
  },[])


  const handleAdmin = (type,data) =>{
    if(type === "delete") {
      setModalVisible(true)
      setAdminData(data)
    } else if (type === "edit") {
      setAdminData(data)
      setToggleForm("updateTab")
    }
  }


  const handleToggleTabSelected = (type) =>{
    if(type == "createTab" || type == "updateTab") {
      setToggleForm(type)
      setAdminData(null)
    } else {
      setToggleForm("listTab")
      setAdminData(null)
      setClearForm(true)
    }
  }


  const renderListAdmin = ({ item }) => (
      <View key={item.userId} style={styles.categoryWrapper}>
          <Text style={styles.category_name}>{item.gender}, {`${item.firstName}-${item.lastName}` }</Text>
          <View style={styles.btns}>
              <Buttons
                  Icon={ICONS.EditIcon}
                  pressHandler={() => handleAdmin("edit",item)}
                  stylesText={styles.textButton}
                  stylesButton={styles.btn_action}
              />
              <Buttons
                  Icon={ICONS.deleteIcon}
                  pressHandler={() => handleAdmin("delete",item)}
                  stylesText={styles.textButton}
                  stylesButton={styles.btn_action}
              />
          </View>
      </View>
  );

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

        <View className="flex-row justify-start">
          <Buttons
            Icon={ICONS.AddIcon}
            pressHandler={()=> handleToggleTabSelected("createTab")}
            stylesText={styles.textButton}
            stylesButton={styles.button}
          />
          <Buttons
            Icon={ICONS.listIcon}
            pressHandler={()=> handleToggleTabSelected("listTab")}
            stylesText={styles.textButton}
            stylesButton={styles.button}
          />
        </View>

        {
          toggleForm == "createTab" || toggleForm == "updateTab" ? (
            <FormSignUp 
              role={"Admin"} 
              adminData={adminData} 
              clearForm={clearForm}
              tabName={toggleForm}
              setToggleForm={setToggleForm}
            />
          ) :admins.length > 0 && (
              <FlatList
                  data={admins}
                  renderItem={renderListAdmin}
                  keyExtractor={(item) =>  String(item.userId) }
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ overflow: "auto" }}
              />
          ) 
        }
        
      </View>
      <ModalWrapper 
          isModalVisible={isModalVisible}
          disableModalConfirm={()=> setModalVisible(false)}
          item={adminData}
          typeModal={"DELETE_SUB_ADMIN"}
          countItems={admins.length}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: COLORS.second,
      padding: SIZES.small + 4,
      alignItems: "center",
      borderRadius: SIZES.medium,
      marginVertical: 10,
      marginRight:5
    },
    btn_action: {
      backgroundColor: COLORS.white,
      padding: SIZES.small + 5,
      alignItems: "center",
      borderRadius: SIZES.medium,
    },
    textButton: {
        color: COLORS.white,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
    },
    listIcon: {
      width: 24,
      height: 24,
      tintColor: COLORS.red,
    },
    categoryWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.white,
    },
    btns: {
      flexDirection: "row",
      gap: 5,
    },
})

export default Profile;
