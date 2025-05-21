import React, { useState } from 'react';
import { TextInput as RNTextInput, Image, View, Text, TouchableOpacity } from 'react-native';
import { ICONS } from '../constants';

const TextInput = ({
  errorText,
  secureTextEntry,
  className,
  ...props
}) => {
  const [secureText, setSecureText] = useState(secureTextEntry);
  
  return (
    <View className="w-full mb-4">
      <View className="relative">
        <RNTextInput
          className={` ${
            errorText ? 'border-red-400' : 'border-gray-300',
            className ? className : 'w-full px-4 py-5 text-gray-800 border rounded-lg focus:border-primary'
          }`}
          secureTextEntry={secureText}
          {...props}
        />
        
        {secureTextEntry ? (
          <TouchableOpacity 
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2"
            onPress={() => setSecureText(!secureText)}
          >
            <Image 
              source={secureText ? ICONS.eyeClose : ICONS.eye}  
              className="w-5 h-5"
            />
          </TouchableOpacity>
        ): null}
      </View>
      
      {errorText ? (
        <Text className="mt-1 text-sm text-red-500">
          {errorText}
        </Text>
      ): null}
    </View>
  );
};

export default TextInput;