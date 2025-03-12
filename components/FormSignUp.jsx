import { useState } from "react";
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

const FormSignUp = ({ role }) => {
  
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

    if (passwordError) {
      setPassword((prev) => ({ ...prev, error: passwordError }));
      isValid = false;
    }

    if (confirmPasswordError) {
      setConfirmPassword((prev) => ({ ...prev, error: confirmPasswordError }));
      isValid = false;
    }
    // If all validations pass, proceed with Firebase authentication
    if (isValid) {
      const response = await dispatch(
        actSignUp({
          role,
          email: email.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
          firstName: firstname.value,
          lastName: lastname.value,
          gender,
        })
      );
      if (response?.payload?.message === "user ajouté avec succès") {
        if(role ==="Admin"){
            await navigation.navigate("Home");
        } else {
            await navigation.navigate("Signin");
        }
      }
    }
  };
  
  return (
    <>
      <Text className="text-xl font-medium text-red-600 my-1">
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

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.bg} />
      ) : (
        <Buttons
          title={role === "Admin" ? "Create" : "Sign Up"}
          pressHandler={onSignUpPressed}
          stylesText={styles.textButton}
          stylesButton={styles.button}
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
    button: {
        backgroundColor: COLORS.second,
        padding: SIZES.small + 4,
        width: "100%",
        alignItems: "center",
        borderRadius: SIZES.medium,
        marginVertical: 10,
    },
    textButton: {
        color: COLORS.white,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
    },
})

export default FormSignUp;
