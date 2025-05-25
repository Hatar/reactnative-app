import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { actGetListAdmin } from '../redux/slices/admin/adminSlice'
import { actGetFoods } from '../redux/slices/food/foodSlice'
import { actGetCategories } from '../redux/slices/category/categorySlice'

const Dashboard =  () => {  
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {foods} = useSelector((state)=> state.foods)
  const {categories} = useSelector((state)=> state.categories)
  const {admins} = useSelector((state)=>state.admin)

  useEffect(() => {
    dispatch(actGetListAdmin())
    dispatch(actGetFoods())
    dispatch(actGetCategories())
  }, [dispatch])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Dashboard</Text>

        {/* Users Count */}
        <TouchableOpacity style={[styles.card, styles.cardAdmin]} onPress={()=> navigation.navigate('Profile')} activeOpacity={0.85}>
          <View style={styles.cardContent}>
            <View style={[styles.iconWrapper, {backgroundColor: '#fdecea'}]}>
              <Ionicons name="person-circle-outline" size={38} color="#e53935" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardLabel}>Total Admin</Text>
              <Text style={[styles.cardValue, {color: '#e53935'}]}>{admins.length}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Categories Count */}
        <TouchableOpacity style={[styles.card, styles.cardCategory]} onPress={()=> navigation.navigate('Categories')} activeOpacity={0.85}>
          <View style={styles.cardContent}>
            <View style={[styles.iconWrapper, {backgroundColor: '#e8f5e9'}]}>
              <Ionicons name="list-circle-outline" size={38} color="#43a047" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardLabel}>Total Categories</Text>
              <Text style={[styles.cardValue, {color: '#43a047'}]}>{categories.length}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Foods Count */}
        <TouchableOpacity style={[styles.card, styles.cardFood]} onPress={()=> navigation.navigate('Foods')} activeOpacity={0.85}>
          <View style={styles.cardContent}>
            <View style={[styles.iconWrapper, {backgroundColor: '#e3f2fd'}]}>
              <Ionicons name="fast-food-outline" size={38} color="#1e88e5" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardLabel}>Total Foods</Text>
              <Text style={[styles.cardValue, {color: '#1e88e5'}]}>{foods.length}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Orders Count */}
        <TouchableOpacity style={[styles.card, styles.cardOrder]} onPress={()=> navigation.navigate('Orders')} activeOpacity={0.85}>
          <View style={styles.cardContent}>
            <View style={[styles.iconWrapper, {backgroundColor: '#fff3e0'}]}>
              <Ionicons name="receipt-outline" size={38} color="#fb8c00" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardLabel}>Total Orders</Text>
              <Text style={[styles.cardValue, {color: '#fb8c00'}]}>0</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export const  styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 32,
    letterSpacing: 1,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 6,
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
      },
    }),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 16,
    marginRight: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#636e72',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardAdmin: {
    borderLeftWidth: 6,
    borderLeftColor: '#e53935',
  },
  cardCategory: {
    borderLeftWidth: 6,
    borderLeftColor: '#43a047',
  },
  cardFood: {
    borderLeftWidth: 6,
    borderLeftColor: '#1e88e5',
  },
  cardOrder: {
    borderLeftWidth: 6,
    borderLeftColor: '#fb8c00',
  },
})

export default Dashboard