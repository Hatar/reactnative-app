import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Background from "../components/Background";
import { COLORS, FONTS, SIZES } from "../constants";
import logo from "../assets/logo.png";
import BackButton from "../components/BackButton";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { clearStateAuth } from "../redux/slices/auth/authSlice";
import FormSignUp from "../components/FormSignUp";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  return (
    <Background>
      <BackButton
        goBack={navigation.goBack}
        styleBackButton={styles.styleBackButton}
      />
      <View style={styles.imageContainer}>
        <View style={styles.imageCard}>
          <Image style={styles.image} source={logo} />
        </View>
      </View>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Join us and start exploring today!</Text>

      <FormSignUp role={"User"} />

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(clearStateAuth());
            navigation.replace("Signin");
          }}
        >
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    top: -SIZES.small,
    flexDirection: "row",
    gap: SIZES.small,
  },
  imageCard: {
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    backgroundColor: COLORS.cardBg,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: SIZES.medium,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.cardBg,
    textAlign: "center",
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
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: COLORS.errors,
  },
  styleBackButton: {
    position: "absolute",
    top: 50 + getStatusBarHeight(),
    left: 4,
  },
  
});

export default Signup;
