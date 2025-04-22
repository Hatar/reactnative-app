import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Alert } from "react-native";
import * as FileSystem from 'expo-file-system';

export function validationOtherFields(key, name) {
  if (!name.trim()) return key + " can't be empty.";
  return "";
}

export function validationEmail(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";
  return "";
}

export function validationPassword(password) {
  if (!password) return "Password can't be empty.";
  if (password.length < 5)
    return "Password must be at least 5 characters long.";
  return "";
}

// Validation for confirm password
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Confirm password can't be empty.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return "";
}

export const capitalize = (string) => {
  const [firstLetter, ...restOfWord] = string;
  return firstLetter.toUpperCase() + restOfWord.join("");
};

export const isIncludeInCart = (dataStored, item) => {
  return dataStored.some((el) => el.foodId === item.foodId);
};

export const isPureBase64 = (str) => {
  const base64Regex =
    /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=)?$/i;
  return base64Regex.test(str);
};

export const pickImage = async ({
  resizeWidth = 100,
  resizeHeight = 100,
  compression = 0.2,
  format = ImageManipulator.SaveFormat.JPEG,
  returnBase64 = true,
  onImagePicked = () => {},
}) => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Permission to access media library is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];

      const manipulated = await ImageManipulator.manipulateAsync(
        asset.uri,
        [{ resize: { width: resizeWidth, height: resizeHeight } }],
        {
          compress: compression,
          base64: returnBase64,
          format,
        }
      );

      // Callback to handle the image
      onImagePicked({
        uri: manipulated.uri,
        base64: manipulated.base64 || null,
      });
    }
  } catch (error) {
    console.error("Image picking error:", error);
    Alert.alert("Error", "Something went wrong while picking the image.");
  }
};


export const convertImageToBase64 = async (imageUrl) => {
  try {

    // Fetch the image data as an ArrayBuffer
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer(); // Get image as an ArrayBuffer

    // Convert the ArrayBuffer to base64
    return  arrayBufferToBase64(arrayBuffer);

  } catch (error) {
    console.error("Error fetching or converting image: ", error);
  }
};


// Helper function to convert ArrayBuffer to base64
const arrayBufferToBase64 = (buffer) => {
  const uint8Array = new Uint8Array(buffer);
  const binary = String.fromCharCode(...uint8Array);
  return Buffer.from(binary, 'binary').toString('base64');
};

export const handleFloatTotal = (num, decimals = 2) => {
  return parseFloat(num.toFixed(decimals));
};
