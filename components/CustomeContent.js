import { Image, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { COLORS } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Buttons from './Buttons'
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9; // 90% of screen width

const CustomeContent = ({item, isLastItem, isEnableChangeContent, isHome, isArticle, handleDelete, handleEditFood}) => {
  const navigation = useNavigation()
  const {categories} = useSelector((state)=> state.categories)
  const role = useSelector((state) => state.auth.role);
  
  let getNameOFCategory = "";
  if (item && item.categoryId !== undefined && categories.length > 0) {
    const category = categories.find((category) => category.categoryId === item?.categoryId);
    if (category) {
      getNameOFCategory = category.nameCategory
    }
  }

  const renderContentArticle = () => {
    return (
      <View className="w-full overflow-hidden">
        {/* Image Container with Gradient Overlay */}
        <View className="relative">
          <Image 
            source={{ uri: item?.image || item?.imageUrl }} 
            className="w-full h-48 rounded-t-3xl"
          />
          
          {/* Admin Actions */}
          {role === "admin" && !isArticle && (
            <View className="absolute top-4 right-4 z-10 flex-row gap-2">
              <Buttons
                Icon={<Ionicons name="pencil-outline" size={24} color="#1a1a1a" />} 
                pressHandler={handleEditFood}
                stylesButton="bg-white/90 p-3 rounded-full shadow-lg"
              />
              <Buttons
                Icon={<Ionicons name="trash-outline" size={24} color="#ef4444" />}
                pressHandler={handleDelete}
                stylesButton="bg-white/90 p-3 rounded-full shadow-lg"
              />
            </View>
          )}

          {/* Category Badge */}
          {getNameOFCategory && (
            <View className="absolute bottom-4 left-4 bg-black/30 px-4 py-2 rounded-full">
              <Text className="text-white font-medium">{getNameOFCategory}</Text>
            </View>
          )}
        </View>
        
        {/* Content Section */}
        <View className="p-6 bg-white">
          {/* Title */}
          <Text className="text-xl font-bold text-gray-900 mb-3">
            {item?.title}
          </Text>
          
          {/* Description */}
          {isHome && (
            <Text numberOfLines={2} ellipsizeMode='tail' className="text-base text-gray-600 mb-4">
              {item?.author || item?.description}
            </Text>
          )}
          
          {/* Info Grid */}
          <View className="flex-row flex-wrap gap-4">
            {/* Date/Price */}
            <View className="flex-row items-center bg-gray-50 px-4 py-2 rounded-xl">
              <Ionicons 
                name={item?.price ? "pricetag-outline" : "calendar-outline"} 
                size={20} 
                color="#4b5563"
                style={{marginRight: 8}}
              />
              <Text className="text-gray-700 font-medium">
                {item?.date || `$${item?.price}`}
              </Text>
            </View>

            {/* Stock Status */}
            {!isArticle && (
              <View className={`flex-row items-center px-4 py-2 rounded-xl ${
                item?.inStock ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <Ionicons 
                  name={item?.inStock ? "checkmark-circle-outline" : "close-circle-outline"} 
                  size={20} 
                  color={item?.inStock ? "#059669" : "#dc2626"}
                  style={{marginRight: 8}}
                />
                <Text className={`font-medium ${
                  item?.inStock ? 'text-green-700' : 'text-red-700'
                }`}>
                  {item?.inStock ? "In Stock" : "Out of Stock"}
                </Text>
              </View>
            )}
          </View>

          {/* Recipes Section */}
          {item.recepies && item.recepies.length > 0 && (
            <View className="mt-4 pt-4 border-t border-gray-100">
              <Text className="text-sm font-semibold text-gray-500 mb-2">
                Recipes Included
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {item.recepies.map((recipe, index) => (
                  <View key={index} className="bg-primary/10 px-3 py-1 rounded-full">
                    <Text className="text-primary font-medium">{recipe}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }

  const renderContentItemFood = () => {
    return (
      <View className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">
        <Image 
          source={{uri: item?.imageUrl}} 
          className="w-full h-32 rounded-t-2xl"
          resizeMode="cover" 
        />
        <View className="p-4">
          <Text numberOfLines={1} ellipsizeMode='tail' className="text-lg font-bold text-gray-900 mb-2">
            {item?.title}
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-primary">${item?.price}</Text>
            <TouchableOpacity className="bg-primary px-4 py-2 rounded-full">
              <Text className="text-white font-medium">View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity 
      className={
        isEnableChangeContent 
          ? 'bg-white rounded-3xl shadow-lg mb-6 mx-4 overflow-hidden'
          : `w-[${Math.floor(cardWidth/2-20)}px] mx-2 mb-4`
      }
      onPress={() => {
        if(!isArticle) {
          navigation.navigate('InfoFood',{item})
        }
      }}
      activeOpacity={0.95}
    >
      {!isEnableChangeContent ? renderContentItemFood() : renderContentArticle()}
    </TouchableOpacity>
  )
}

export default CustomeContent