import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  validateConfirmPassword,
  validationOtherFields,
  validationPassword,
  validationEmail,
} from "../helpers";
import Checkbox from "expo-checkbox";
import TextInput from "../components/TextInput";
import Buttons from "../components/Buttons";
import { COLORS, FONTS, SIZES } from "../constants";
import { actSignUp } from "../redux/slices/auth/authSlice";
import { actEditSubAdmin } from "../redux/slices/admin/adminSlice";

const FormSignUp = ({ role ,adminData,clearForm,tabName,setToggleForm, onFeedback }) => {
  
    const { error, loading } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState({ value: "", error: "" });
  const [lastname, setLastname] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({value: "",error: ""});
  const [gender, setGender] = useState("Male");

  // Handlers
  const onSignUpPressed = async () => {
    let isValid = true;
    // Validate input fields
    const firstNameError = validationOtherFields("firstname", firstname.value);
    const lastNameError = validationOtherFields("lastname", lastname.value);
    const emailError = validationEmail(email.value);
    const passwordError = validationPassword(password.value);
    const confirmPasswordError = validateConfirmPassword(
      password.value,
      confirmPassword.value
    );

    // Validation
    if (firstNameError) {
      setFirstname((prev) => ({ ...prev, error: firstNameError }));
      isValid = false;
    }

    if (lastNameError) {
      setLastname((prev) => ({ ...prev, error: lastNameError }));
      isValid = false;
    }

    if (emailError) {
      setEmail((prev) => ({ ...prev, error: emailError }));
      isValid = false;
    }

    if(tabName !== "updateTab") {
      if (passwordError) {
        setPassword((prev) => ({ ...prev, error: passwordError }));
        isValid = false;
      }
  
      if (confirmPasswordError) {
        setConfirmPassword((prev) => ({ ...prev, error: confirmPasswordError }));
        isValid = false;
      }
    }

    // If all validations pass, proceed with Firebase authentication
    if (isValid) {
      let sendPayload = null;
      let response = null;
      
      if(tabName !== "updateTab") {
        sendPayload = {
          role,
          email: email.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
          firstName: firstname.value,
          lastName: lastname.value,
          gender,
        }
        response = await dispatch(actSignUp(sendPayload));
        
        if (response?.payload?.message === "user ajouté avec succès") {
          if(role === "Admin") {
            dispatch(actGetListAdmin());
            setToggleForm("listTab");
            if (onFeedback) onFeedback('success', 'Admin created successfully!');
            await navigation.navigate("Home");
          } else {
            if (onFeedback) onFeedback('success', 'User created successfully!');
            await navigation.navigate("Signin");
          }
        } else {
          if (onFeedback) {
            onFeedback('error', response?.payload?.message || 'Failed to create user');
          }
        }

      } else if (tabName === "updateTab") {
        sendPayload = {
          userId: adminData.userId,
          firstName: firstname.value,
          lastName: lastname.value,
          email: email.value
        }
        response = await dispatch(actEditSubAdmin(sendPayload));
        
        if (response?.payload?.message === "User updated successfully") {
          dispatch(actGetListAdmin());
          setToggleForm("listTab");
          if (onFeedback) onFeedback('success', 'Admin updated successfully!');
        } else {
          if (onFeedback) {
            onFeedback('error', response?.payload?.message || 'Failed to update admin');
          }
        }
      }
    }
  };


  useEffect(()=>{
    if(adminData){
      setFirstname({ value: adminData.firstName, error: "" })
      setLastname({ value: adminData.lastName, error: "" })
      setEmail({ value: adminData.email, error: "" })
    } else if (clearForm && adminData === null) {
      setFirstname({ value: "", error: "" })
      setLastname({ value: "", error: "" })
      setEmail({ value: "", error: "" })
    }
  },[adminData,clearForm])
  
  return (
    <>
      <Text className="text-xl font-medium text-red-600">
        {error}
      </Text>
      <TextInput
        placeholder={"Enter First Name"}
        value={firstname.value}
        errortext={firstname.error}
        autoCapitalize="words"
        returnKeyType="next"
        onChangeText={(text) => setFirstname({ value: text, error: "" })}
      />
      <TextInput
        placeholder={"Enter Last Name"}
        value={lastname.value}
        errortext={lastname.error}
        autoCapitalize="words"
        returnKeyType="next"
        onChangeText={(text) => setLastname({ value: text, error: "" })}
      />
      <TextInput
        placeholder={"Enter Your Email"}
        value={email.value}
        errortext={email.error}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        returnKeyType="next"
        onChangeText={(text) => setEmail({ value: text, error: "" })}
      />


      {
        tabName && tabName !== "updateTab" && (
          <>
            <TextInput
              placeholder={"Enter Your Password"}
              value={password.value}
              errortext={password.error}
              secureTextEntry
              textContentType="oneTimeCode"
              onChangeText={(text) => setPassword({ value: text, error: "" })}
            />
            <TextInput
              placeholder={"Confirm Password"}
              value={confirmPassword.value}
              errortext={confirmPassword.error}
              secureTextEntry
              textContentType="oneTimeCode"
              onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "flex-start", gap: 10 }}
            >
              <View style={styles.section_checkbox}>
                <Checkbox
                  style={styles.checkbox}
                  color={COLORS.cardBg}
                  value={gender === "Male"}
                  onValueChange={() => setGender("Male")}
                />
                <Text style={styles.paragraph}>Male</Text>
              </View>
              <View style={styles.section_checkbox}>
                <Checkbox
                  style={styles.checkbox}
                  color={COLORS.cardBg}
                  value={gender === "Female"}
                  onValueChange={() => setGender("Female")}
                />
                <Text style={styles.paragraph}>Famale</Text>
              </View>
            </View>
          </>
        )
      }

      

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.bg} />
      ) : (
        <Buttons
          title={role === "Admin" && tabName == "updateTab" ? "Update" : role !== "Admin" ? "Sign Up" : "Add" }
          pressHandler={onSignUpPressed}
          stylesButton="w-full h-14 bg-primary rounded-lg justify-center items-center"
          stylesText="text-xl text-black font-bold"
        />
      )}
    </>
  );
};


const styles = StyleSheet.create({
    section_checkbox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 5,
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        marginVertical: 15,
        marginHorizontal: 2,
    },
})

export default FormSignUp;
