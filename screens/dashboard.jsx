import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity,SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

const Dashboard =  () => {  
  const navigation = useNavigation()
  const {foods} = useSelector((state)=> state.foods)
  const {categories} = useSelector((state)=> state.categories)
  const {admins} = useSelector((state)=>state.admin)
  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-1 bg-gray-100 p-3">
      <Text className="text-2xl font-bold text-gray-800 mb-3">Dashboard</Text>

      {/* Users Count */}
      <TouchableOpacity className="bg-white p-5 rounded-xl shadow-md w-full items-center my-4" onPress={()=> navigation.navigate('Profile')}>
        <Text className="text-lg font-semibold text-gray-700">Total Admin</Text>
        <Text className="text-xl font-bold text-red-600">{admins.length}</Text>
      </TouchableOpacity>

      {/* Categories Count */}
      <TouchableOpacity className="bg-white p-5 rounded-xl shadow-md w-full items-center my-4" onPress={()=> navigation.navigate('Categories')}>
        <Text className="text-lg font-semibold text-gray-700">Total Categories</Text>
        <Text className="text-xl font-bold text-green-600">{categories.length}</Text>
      </TouchableOpacity>

      {/* Statistics Section */}
      <TouchableOpacity className="space-y-6">
        {/* Foods Count */}
        <View className="bg-white p-5 rounded-xl shadow-md w-full items-center my-3" onPress={()=> navigation.navigate('Foods')}>
          <Text className="text-lg font-semibold text-gray-700">Total Foods</Text>
          <Text className="text-xl font-bold text-blue-600">{foods.length}</Text>
        </View>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export const  styles = StyleSheet.create({
  container:{
    flex:1,
  },
})

export default Dashboard