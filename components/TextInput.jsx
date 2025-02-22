import React, { useState } from 'react';
import { StyleSheet, TextInput as RNTextInput,Image, View, Text, TouchableOpacity } from 'react-native';
import { COLORS, ICONS, SIZES } from '../constants';

const TextInput = ({
  errorText,
  customWrapperInput,
  customInput,
  secureTextEntry,
  ...props
}) => {
  
  const [secureText, setSecureText] = useState(secureTextEntry);
  return (
    <View style={StyleSheet.flatten([styles.container, customWrapperInput])}>
      <RNTextInput
        style={StyleSheet.flatten([styles.input, customInput])}
        placeholderTextColor={COLORS.gray}
        secureTextEntry={secureText ? secureTextEntry : false}
        {...props}
      />
      {
        secureTextEntry && (
            <TouchableOpacity style={styles.iconContainer} onPress={() => setSecureText(!secureText)}>
                <Image source={ secureText ? ICONS.eyeClose : ICONS.eye} style={styles.icon}  />
            </TouchableOpacity>
        )
      }
      
      {errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      position: 'relative',
    },
    input: {
      backgroundColor: COLORS.white,
      paddingHorizontal: 16,
      paddingVertical: 20,
      borderRadius: 10,
      marginTop: 5,
      paddingRight: 50,
    },
    iconContainer: {
      position: 'absolute',
      right: 16,
      top: '50%',
      transform: [{ translateY: -10 }],
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: COLORS.cardBg
    },
    error: {
      fontSize: SIZES.small,
      color: COLORS.error,
      paddingTop: 4,
    },
  });

export default TextInput;
