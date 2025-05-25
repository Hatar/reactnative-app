
import{ View,Image } from 'react-native'
import { ICONS } from '../constants'
const Logo = () => {
  return (
    <View className="items-center py-8">
        <View className="w-40 h-40 rounded-full border-4 border-primary bg-white shadow-lg justify-center items-center">
            <Image 
                source={ICONS.logo} 
                className="w-32 h-32 rounded-full" 
                resizeMode="contain"
            />
        </View>
    </View>
  )
}

export default Logo