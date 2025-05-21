import { View, Text, TouchableOpacity } from 'react-native';

const Buttons = ({ 
  pressHandler, 
  title, 
  stylesText = '', 
  Icon, 
  stylesButton = '',
  disabled = false,
  testID = 'button',
  iconPosition = 'left'
}) => {
  return (
    <TouchableOpacity 
      className={`flex-row justify-center items-center ${stylesButton}`}
      onPress={pressHandler}
      disabled={disabled}
      activeOpacity={0.7}
      testID={testID}
    >
      {iconPosition === 'left' && Icon ? (
        <View className="text-center">
          {typeof Icon === 'function' ? <Icon /> : Icon}
        </View>
      ): null}
      
      {title ? (
        <Text className={stylesText}>
          {title}
        </Text>
      ) : null}
      
      {iconPosition === 'right' && Icon ? (
        <View className="text-center">
          {typeof Icon === 'function' ? <Icon /> : Icon}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default Buttons;