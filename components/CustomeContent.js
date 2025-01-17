import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native'

const CustomeContent = ({item,isLastItem}) => {
  const navigation = useNavigation()
  return (
      <TouchableOpacity style={[styles.itemContainer,isLastItem && styles.lastItem]} onPress={() => {
            console.log("moooove")
            navigation.navigate('InfoFood')
          }}>
          <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
          <View style={styles.infoSection}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
      </TouchableOpacity>
  )
}


export const styles = StyleSheet.create({
  itemContainer: {
    flex:1, 
    margin: 5,
    backgroundColor: COLORS.cardBg,
    borderColor:COLORS.gray,
    borderWidth:5,
    borderRadius: 20,
    padding: 10,
    position:'relative',
    height:170
  },
  lastItem:{ 
   flex:0,
   width:145,
  },
  infoSection:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    margin: 'auto',
  },
  itemTitle: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  itemPrice: {
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  button: {
      backgroundColor: COLORS.second,
      width: 25,
      height: 25,
      justifyContent:'center',
      alignItems: "center",
      borderRadius: 20,
      position:'absolute',
      right:-3,
      top:-118
  },
  textButton: {
      color: COLORS.white,
      fontFamily: FONTS.bold + 10,
      fontSize: SIZES.large,
  },
})

export default CustomeContent