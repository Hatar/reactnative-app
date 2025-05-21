import { View } from 'react-native';
import Logo from './Logo';

const Circle = ({ background }) => {
  return (
    <View className={`w-80 h-80 bg-${background} rounded-full justify-center items-center relative`}>
      <Logo />
      {/* Decorative circles */}
      <View className={`w-20 h-20 bg-${background} rounded-full absolute -top-0 -right-[-20]`}></View>
      <View className={`w-14 h-14 bg-${background} rounded-full absolute -top-[-20] -left-[-20]`}></View>
    </View>
  );
};

export default Circle;